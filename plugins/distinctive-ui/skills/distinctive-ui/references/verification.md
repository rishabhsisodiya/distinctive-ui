# Verification (Phase 5) and handover (Phase 6)

## scripts/shoot.mjs

Headless Chrome driven over the DevTools protocol with Node's built-in `WebSocket` and `fetch`
(Node 22+). No npm install. Chrome is found via `$CHROME`, then the usual macOS/Linux paths, then
Playwright's cached Chromium.

```bash
node <this-skill's-base-directory>/scripts/shoot.mjs <url> <out-dir> '<steps-json>'
# the base directory is shown when the skill loads ("Base directory for this skill: …")
# url: file:///abs/path/index.html  or  http://localhost:3000
# put out-dir in a temp/scratch folder, not inside the user's project
```

`steps` is a JSON array; each step can have:

| key | meaning |
|---|---|
| `w`, `h` | set viewport (w < 600 is emulated as mobile) |
| `reload` | navigate to `url + hash` fresh (first step should reload) |
| `hash` | change `location.hash` without reload (SPA routes) |
| `path` | navigate to `url`'s origin + path (multi-page / server apps) |
| `js` | expression to evaluate; its value is printed; promises are awaited |
| `wait` | ms to wait after `js` (default 300) |
| `shot` | screenshot name (png) saved in out-dir |
| `full` | capture beyond the viewport |
| `clearStorage` | clear localStorage after the first load (default true) |

Output: JSON with `errors` (exceptions, console errors/warnings) and `results` (one per `js`).
Then **Read the PNGs** and judge them yourself.

### A good first pass

```json
[
 {"w":1440,"h":1000,"reload":true,"hash":"#/home","shot":"d-home"},
 {"hash":"#/detail/1","shot":"d-detail"},
 {"w":390,"h":844,"hash":"#/home","shot":"m-home","full":true},
 {"js":"document.documentElement.scrollWidth+'/'+innerWidth"},
 {"w":360,"h":780,"js":"document.documentElement.scrollWidth+'/'+innerWidth"}
]
```

### Gotchas learned the hard way

- Every `js` step runs in the same global scope: wrap it in an IIFE
  `(()=>{ const x=...; return ... })()` or the second `const x` throws a SyntaxError.
- Apps that re-render on click detach old nodes. Re-query inside loops
  (`document.querySelectorAll(sel)[i].click()` each time), never reuse a NodeList across clicks.
- `navigator.clipboard` rejects in an unfocused headless tab. If the app awaits it without a
  fallback, the action silently dies — that is a real bug worth fixing (fallback to a hidden
  textarea + `execCommand('copy')`, and never block the state change on the copy).
- `window.confirm` blocks headless runs: set `window.confirm=()=>true` in a `js` step first.
- Full-page captures paint `position: sticky` bars in the middle of the image. That is a capture
  artifact; check the real layout with a viewport-sized shot.
- When a step fails, decide honestly: app bug or test-script mistake? Say which.

## Five-problems review

After the first shots, list the five most important visual problems (e.g. read-only controls that
look broken, chips overflowing their column, numbers wrapping, misaligned columns between tables,
a mobile bottom bar that is too tall), fix them, re-shoot, and write one before/after line each.

## Handover template

**What's in it** — per role/screen, one line each, naming the signature pieces.

**Visual review** — the five fixes, plus any real bugs found by the flow tests.

**Tested** — browser, sizes, which flows were scripted end to end, console errors, scroll check.

**Not tested** — be specific: other browsers, real devices/touch, screen readers, printing,
real offline, camera, performance on low-end hardware.

**Open assumptions** — each ASSUMPTION still unconfirmed by the business.

**Backend must provide** — the entities, state transitions, rules engine (e.g. pricing),
permissions and integrations the UI relies on.

**Next** — the next build sub-phase, or what to change first.
