---
name: setup
description: >
  Check and finish the distinctive-ui setup: confirms the ui-ux-pro-max and apple-design skills are
  installed, and that Node 22+, Python 3 and Chrome are available for the visual-review step.
  Offers to install anything missing, with the user's permission. Run with /distinctive-ui:setup.
disable-model-invocation: true
---

# distinctive-ui setup

Goal: leave the user with everything `distinctive-ui` uses, and a clear table of what is ready.
Never install anything without asking first — each install changes the user's machine or settings.

## 1. Check the helper skills

Look at the skills available in this session for each of these (with or without a plugin prefix):

| Skill | Used for | Where it comes from |
|---|---|---|
| `design-orchestrator` | decides which design skill leads | bundled in this plugin — always present |
| `ui-ux-pro-max` | design-system data: styles, palettes, fonts, UX rules (MIT, by nextlevelbuilder) | github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| `apple-design` | Apple HIG review + craft lens (by dickwu) | github.com/dickwu/apple-design-skill |

If the user installed `distinctive-ui` from its marketplace, Claude Code normally installs the two
third-party plugins automatically as dependencies. If they are missing anyway (older Claude Code,
install interrupted, plugin disabled), offer the fix that matches how the user works:

**Plugin route (recommended)** — the user types these in Claude Code:

```
/plugin install ui-ux-pro-max@distinctive-ui
/plugin install apple-design@distinctive-ui
/reload-plugins
```

or, from a terminal: `claude plugin install ui-ux-pro-max@distinctive-ui` and
`claude plugin install apple-design@distinctive-ui`.

**Skills-folder route** — for users who keep skills in `~/.claude/skills/` instead of plugins:

```bash
git clone https://github.com/dickwu/apple-design-skill.git ~/.claude/skills/apple-design
npx ui-ux-pro-max-cli init --ai claude      # run inside the project; installs .claude/skills/ui-ux-pro-max
```

You may run the terminal commands yourself only after the user says yes. Slash commands such as
`/plugin install` must be typed by the user.

## 2. Check the tools

Run these and report the result (read-only checks, safe to run):

```bash
node --version          # need v22+ (scripts/shoot.mjs uses built-in WebSocket and fetch)
python3 --version       # ui-ux-pro-max's search scripts need Python 3
ls "/Applications/Google Chrome.app" 2>/dev/null || which google-chrome chromium chromium-browser 2>/dev/null
```

- Missing Node 22+ or Python 3: tell the user how to install it for their OS; do not install
  system packages yourself (no `brew`, `apt`, `sudo`, `winget`).
- Missing Chrome: the visual review can use any Chromium; set `CHROME=/path/to/chrome`. Without
  any browser, Phase 5 falls back to reviewing code and asking the user for screenshots — say so.

## 3. Report

End with a short table — item, status (ready / missing / installed now), and the one next action
for anything still missing. Then tell the user how to start:

> Describe the screen or product you want designed, e.g. "redesign our booking dashboard so it
> doesn't look like a template", or run `/distinctive-ui:distinctive-ui`.
