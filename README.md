# Distinctive UI — a creative director for Claude Code

Most AI-generated interfaces look the same: four number cards, a line chart beside a donut,
indigo buttons, "Dashboard" as the heading. **Distinctive UI** is a Claude Code plugin that runs a
real design process instead, so the result could only belong to *your* product.

```
intake → brief → three art directions → build → real-browser review → honest handover
```

- **Asks the right questions, and reads first.** It checks your repo, existing prototype and project
  notes, fills in what it can, and asks only what's missing.
- **Three genuinely different directions**, each with layout, type, colour from your domain, and one
  *signature interaction*, plus a trade-off table and a recommendation.
- **Builds it with real-feeling data**: local names, currency and number format, empty states,
  domain-specific errors, keyboard and touch support, down to 360 px.
- **Checks its own work in a real browser.** A bundled headless-Chrome script takes desktop and
  mobile screenshots, runs your flows end to end, and catches console errors. It then fixes the five
  worst visual problems it found.
- **Tells you the truth at handover**: what was tested, what wasn't, which assumptions are open,
  and what your backend must provide.

It routes design decisions through two well-known skills, which install automatically:

| Skill | Role | Author |
|---|---|---|
| [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | design-system data: styles, palettes, font pairings, UX rules, stack guides. Leads on web | nextlevelbuilder (MIT) |
| [apple-design](https://github.com/dickwu/apple-design-skill) | Apple HIG reviewer and craft lens. Leads on iOS/macOS, reviews on web | dickwu |
| design-orchestrator | decides which of the two leads, and settles conflicts. Bundled here | this repo |

The two third-party skills are fetched from their own repositories, not copied into this one.
Note: the `ui-ux-pro-max` plugin also adds its companion skills: `brand`, `design`,
`design-system`, `ui-styling`, `banner-design` and `slides`.

## Install

In Claude Code:

```
/plugin marketplace add rishabhsisodiya/distinctive-ui
/plugin install distinctive-ui@distinctive-ui
```

Or from a terminal:

```bash
claude plugin marketplace add rishabhsisodiya/distinctive-ui
claude plugin install distinctive-ui@distinctive-ui
```

Installing `distinctive-ui` also installs its two dependencies, `ui-ux-pro-max` and `apple-design`,
from the same marketplace. Then check everything in one step:

```
/distinctive-ui:setup
```

It confirms the helper skills are present, checks Node 22+, Python 3 and Chrome, and offers to
install anything missing. It asks before installing anything.

### Requirements

| Needed for | Requirement |
|---|---|
| The plugin | Claude Code with plugin support (dependencies need a recent version; run `claude update`) |
| Browser review (Phase 5) | Node.js 22+ and Google Chrome or Chromium (or set `CHROME=/path/to/chrome`) |
| ui-ux-pro-max search scripts | Python 3 |

Missing pieces don't block you. Without a helper skill, the workflow uses built-in fallback rules.
Without a browser, it reviews the code and asks you for screenshots.

## Use

Just describe what you want. The skill triggers on design requests:

- "Redesign our clinic booking dashboard. It looks like every other template."
- "Design the first screen of a field-technician app for checking in at a site."
- "Give me three art directions for our invoicing tool's home page."

Or call it directly: `/distinctive-ui:distinctive-ui`.

It stops after each phase for your answer. Say **"you decide"** and it chooses, labelling the choice
as an ASSUMPTION. Say **"just build it"** and it runs the remaining build steps without stopping.

## What's inside

```
.claude-plugin/marketplace.json          catalogue: distinctive-ui + its two dependencies
plugins/distinctive-ui/
├── .claude-plugin/plugin.json           manifest, declares the dependencies
└── skills/
    ├── distinctive-ui/                  the workflow
    │   ├── SKILL.md
    │   ├── references/                  intake, directions, verification, fallback rules, worked example
    │   └── scripts/shoot.mjs            headless-Chrome screenshots + flow tests (no npm install)
    ├── design-orchestrator/SKILL.md     routes between ui-ux-pro-max and apple-design
    └── setup/SKILL.md                   /distinctive-ui:setup
```

## Already keep skills in `~/.claude/skills/`?

You can use the workflow without the plugin system:

```bash
git clone https://github.com/rishabhsisodiya/distinctive-ui.git
cp -r distinctive-ui/plugins/distinctive-ui/skills/distinctive-ui ~/.claude/skills/
cp -r distinctive-ui/plugins/distinctive-ui/skills/design-orchestrator ~/.claude/skills/
git clone https://github.com/dickwu/apple-design-skill.git ~/.claude/skills/apple-design
npx ui-ux-pro-max-cli init --ai claude   # inside your project
```

If you already have your own `design-orchestrator`, keep yours. The workflow prefers it.

## Update and uninstall

```
/plugin marketplace update distinctive-ui
/plugin uninstall distinctive-ui@distinctive-ui
claude plugin prune     # removes dependencies nothing else needs
```

## Contributing

Issues and pull requests are welcome. Before opening a PR, run:

```bash
claude plugin validate .
claude plugin validate ./plugins/distinctive-ui
```

To try a local checkout without installing it: `claude --plugin-dir ./plugins/distinctive-ui`.

## Credits and licence

The workflow, `design-orchestrator`, `setup` and `shoot.mjs` are MIT-licensed (see `LICENSE`).
`ui-ux-pro-max` and `apple-design` belong to their authors and keep their own terms. Apple's Human
Interface Guidelines text belongs to Apple Inc. This project isn't affiliated with Anthropic or Apple.
