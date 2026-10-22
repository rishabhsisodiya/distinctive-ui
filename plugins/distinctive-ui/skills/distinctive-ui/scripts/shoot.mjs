#!/usr/bin/env node
// Headless Chrome over the DevTools protocol: load a page, run scripted steps, collect console
// errors, save screenshots. No dependencies (Node 22+: global WebSocket + fetch).
// Usage: node shoot.mjs <url> <out-dir> '<steps-json>'   (see references/verification.md)
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const [URL0, OUT, STEPS] = process.argv.slice(2);
if (!URL0 || !OUT || !STEPS) { console.error("usage: node shoot.mjs <url> <out-dir> '<steps-json>'"); process.exit(2); }
const steps = JSON.parse(STEPS);
mkdirSync(OUT, { recursive: true });

function findChrome() {
  const c = [process.env.CHROME,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean);
  for (const p of c) if (existsSync(p)) return p;
  const pw = join(homedir(), 'Library/Caches/ms-playwright');
  if (existsSync(pw)) for (const d of readdirSync(pw).filter(d => d.startsWith('chromium-')).sort().reverse()) {
    for (const sub of ['chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium', 'chrome-linux/chrome']) {
      const p = join(pw, d, sub); if (existsSync(p)) return p;
    }
  }
  throw new Error('Chrome not found. Set CHROME=/path/to/chrome');
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const port = 9300 + Math.floor(Math.random() * 600);
const chrome = spawn(findChrome(), ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${join(OUT, '.profile')}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });

let tgt;
for (let i = 0; i < 60 && !tgt; i++) {
  try { tgt = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page'); } catch { }
  if (!tgt) await sleep(200);
}
if (!tgt) { chrome.kill(); throw new Error('Could not connect to Chrome'); }

const ws = new WebSocket(tgt.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pending = {}; const errors = [];
ws.onmessage = m => {
  const d = JSON.parse(m.data);
  if (d.id && pending[d.id]) { pending[d.id](d); delete pending[d.id]; }
  if (d.method === 'Runtime.exceptionThrown') errors.push('EXC ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text));
  if (d.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(d.params.type)) errors.push(d.params.type + ' ' + d.params.args.map(a => a.value ?? a.description).join(' '));
  if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') errors.push('LOG ' + d.params.entry.text);
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');

const base = URL0.split('#')[0];
const results = [];
let first = true;
for (const s of steps) {
  if (s.w) await send('Emulation.setDeviceMetricsOverride', { width: s.w, height: s.h || 900, deviceScaleFactor: 1, mobile: s.w < 600 });
  if (s.reload || first) {
    await send('Page.navigate', { url: base + (s.hash || (URL0.includes('#') ? '#' + URL0.split('#')[1] : '')) }); await sleep(1500);
    if (first && s.clearStorage !== false) { await send('Runtime.evaluate', { expression: 'try{localStorage.clear();sessionStorage.clear()}catch(e){}' }); await send('Page.reload'); await sleep(1500); }
    first = false;
  } else if (s.path) {
    await send('Page.navigate', { url: new URL(s.path, base).href }); await sleep(1500);
  } else if (s.hash) {
    await send('Runtime.evaluate', { expression: `location.hash=${JSON.stringify(s.hash)}` }); await sleep(400);
  }
  if (s.js) {
    const r = await send('Runtime.evaluate', { expression: s.js, returnByValue: true, awaitPromise: true });
    const res = r.result;
    results.push([s.shot || s.js.slice(0, 60), res?.exceptionDetails ? 'THROWN: ' + (res.exceptionDetails.exception?.description || res.exceptionDetails.text) : res?.result?.value]);
    await sleep(s.wait ?? 300);
  }
  if (s.shot) {
    const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!s.full });
    writeFileSync(join(OUT, `${s.shot}.png`), Buffer.from(r.result.data, 'base64'));
  }
}
console.log(JSON.stringify({ errors, results }, null, 1));
ws.close(); chrome.kill();
