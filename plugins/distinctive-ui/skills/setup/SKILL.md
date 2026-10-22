---
name: setup
description: >
  Check and finish the distinctive-ui setup: detects whether the ui-ux-pro-max and apple-design skills
  are already available (personal, project or plugin), and that Node 22+, Python 3 and Chrome are available for the visual-review step.
  Offers to install only what is missing, with the user's permission. Run with /distinctive-ui:setup.
disable-model-invocation: true
---

# distinctive-ui setup

Goal: leave the user with everything `distinctive-ui` uses, and a clear table of what is ready.
Never install anything without asking first — each install changes the user's machine or settings.

## 1. Check the helper skills

Run `node <base directory of the distinctive-ui skill>/scripts/check-helpers.mjs` (read-only; the
distinctive-ui skill's folder sits next to this one, under `skills/distinctive-ui/scripts/`). It prints
where each helper was found: personal skills folder, project skills folder, or an enabled plugin.
Cross-check the session's skill list too — a listed helper counts as available.

| Skill | Used for | Where it comes from |
|---|---|---|
| `design-orchestrator` | decides which design skill leads | bundled in this plugin — always present |
| `ui-ux-pro-max` | design-system data: styles, palettes, fonts, UX rules (MIT, by nextlevelbuilder) | github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| `apple-design` | Apple HIG review + craft lens (by dickwu) | github.com/dickwu/apple-design-skill |

**Only offer to install what is genuinely missing.** A helper the user already has — in
`~/.claude/skills/`, in the project, or as a plugin — is ready; say so and leave it alone, so they
never end up with two copies.

For each missing helper, ask once and install only after a clear yes:

**Plugin route (recommended)** — run the script's `installCommand`, which is
`claude plugin install <name>@distinctive-ui` (it adds the marketplace first if needed), then ask the
user to type `/reload-plugins`. You may run these terminal commands once the user says yes;
slash commands like `/plugin install` must be typed by the user.

**Skills-folder route** — for users who keep skills in `~/.claude/skills/` instead of plugins:

```bash
git clone https://github.com/dickwu/apple-design-skill.git ~/.claude/skills/apple-design
npx ui-ux-pro-max-cli init --ai claude      # run inside the project; installs .claude/skills/ui-ux-pro-max
```

If the user declines a helper, that is fine: the workflow falls back to its built-in rules for that
part (`references/fallback-rules.md` in the distinctive-ui skill).

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
