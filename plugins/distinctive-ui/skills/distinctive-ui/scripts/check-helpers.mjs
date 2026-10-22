#!/usr/bin/env node
// Report whether the helper skills (ui-ux-pro-max, apple-design) are already available, and where.
// Read-only: it installs nothing. Output is JSON on stdout.
// Looks in: ~/.claude/skills, <cwd>/.claude/skills, and enabled Claude Code plugins.
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const MARKETPLACE = 'distinctive-ui';
const HELPERS = {
  'ui-ux-pro-max': { source: 'github.com/nextlevelbuilder/ui-ux-pro-max-skill', license: 'MIT' },
  'apple-design': { source: 'github.com/dickwu/apple-design-skill', license: 'see upstream repo' },
};

function claude(args) {
  const r = spawnSync('claude', args, { encoding: 'utf8', timeout: 30000 });
  return r.error || r.status !== 0 ? null : r.stdout;
}

const pluginText = claude(['plugin', 'list']);
const marketText = claude(['plugin', 'marketplace', 'list']);

// `claude plugin list` prints one block per plugin: "❯ name@marketplace" then Status: ✔ enabled
const plugins = pluginText === null ? null : pluginText.split(/\n\s*❯\s+/).slice(1).map(block => {
  const m = block.match(/^([A-Za-z0-9_.-]+)@([A-Za-z0-9_.-]+)/);
  return m ? { name: m[1], marketplace: m[2], enabled: /enabled/.test(block) && !/failed|disabled/.test(block) } : null;
}).filter(Boolean);

const marketplaceConfigured = marketText === null ? null : new RegExp(`❯\\s+${MARKETPLACE}\\b`).test(marketText);
const cwd = process.cwd();

const helpers = {};
for (const [name, info] of Object.entries(HELPERS)) {
  const where = [];
  if (existsSync(join(homedir(), '.claude', 'skills', name, 'SKILL.md'))) where.push('personal (~/.claude/skills)');
  if (existsSync(join(cwd, '.claude', 'skills', name, 'SKILL.md'))) where.push('project (.claude/skills)');
  for (const p of plugins ?? []) if (p.name === name && p.enabled) where.push(`plugin ${p.name}@${p.marketplace}`);
  helpers[name] = {
    found: where.length > 0,
    where,
    source: info.source,
    installCommand: marketplaceConfigured === false || marketplaceConfigured === null
      ? `claude plugin marketplace add rishabhsisodiya/distinctive-ui && claude plugin install ${name}@${MARKETPLACE}`
      : `claude plugin install ${name}@${MARKETPLACE}`,
  };
}

console.log(JSON.stringify({
  claudeCli: pluginText !== null,
  marketplaceConfigured,
  helpers,
  note: pluginText === null
    ? 'Could not run the claude CLI, so installed plugins were not checked. Also check the session skill list.'
    : 'Also check the session skill list: a helper listed there is available even if not found above.',
}, null, 2));
