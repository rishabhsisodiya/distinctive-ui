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

It routes design decisions through two well-known skills, which it **detects first** and only offers to
install if you don't already have them:

| Skill | Role | Author |
|---|---|---|
| [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | design-system data: styles, palettes, font pairings, UX rules, stack guides. Leads on web | nextlevelbuilder (MIT) |
| [apple-design](https://github.com/dickwu/apple-design-skill) | Apple HIG reviewer and craft lens. Leads on iOS/macOS, reviews on web | dickwu |
| design-orchestrator | decides which of the two leads, and settles conflicts. Bundled here | this repo |

The two third-party skills are never copied into this repo. If you want them, they're installed from
their own repositories. Note: the `ui-ux-pro-max` plugin also adds its companion skills: `brand`,
`design`, `design-system`, `ui-styling`, `banner-design` and `slides`.

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

Then run the setup check once:

```
/distinctive-ui:setup
```

It looks for `ui-ux-pro-max` and `apple-design` in your personal skills folder, your project, and your
installed plugins. **Anything you already have is left alone.** It offers to install only what's
missing, one at a time, and asks first. (If you skip setup, the skill runs the same check the first
time you ask for a design and asks then.)

### Requirements

| Needed for | Requirement |
|---|---|
| The plugin | Claude Code with plugin support (run `claude update` if `/plugin` is missing) |
| Browser review (Phase 5) | Node.js 22+ and Google Chrome or Chromium (or set `CHROME=/path/to/chrome`) |
| ui-ux-pro-max search scripts | Python 3 |

Missing pieces don't block you. If you decline a helper skill, the workflow uses built-in fallback rules.
Without a browser, it reviews the code and asks you for screenshots.

## Use

Just describe what you want. The skill triggers on design requests, even if you don't name it. Or call
it directly: `/distinctive-ui:distinctive-ui`.

### Example prompts

**Start a new design**

- "Redesign our clinic booking dashboard. It looks like every other template."
- "Design the first screen of a field-technician app for checking in at a site."
- "We're building an invoicing tool for small shops. I want it to feel like nothing else on the market."
- "Make our admin panel less generic. The people using it are warehouse supervisors on tablets."

**Redesign something that already exists**

- "Redesign the checkout page in this repo. Keep the existing React components, but give it a real identity."
- "Here's my prototype in `prototype/index.html`. Run the full design process on it and build a new version next to it."
- "Our dashboard works but looks like a template. Find what's generic about it and propose three alternatives."

**Skip straight to the part you need**

- "Skip the questions, I'll give you the brief: [paste]. Go to the three art directions."
- "Give me three art directions for our order-tracking screen: layout, type, colours and one signature interaction each."
- "We already picked direction B. Build the mobile screen for the delivery rider first."
- "Review what you built in a real browser at desktop and phone size and list the five worst visual problems."

**Control the pace**

- "You decide" — it picks an answer, marks it as an ASSUMPTION and tells you why.
- "Go with your suggestion" — accepts its recommendation and moves on.
- "Just build it, don't stop between phases" — runs the remaining build steps back to back and reports at the end.
- "Wait, change the brief: the installers also need to work offline" — it updates the brief and carries on from there.

**Longer, realistic prompt**

> I run a small chain of laundromats. Staff use a tablet at the counter all day: they take in a bag,
> tag it, quote a price by weight, and tell customers when it's ready. Customers get a WhatsApp
> message. Design the staff screen — it should feel like our shop's paper ticket book, not a
> dashboard. Prices are in ₹, names are mixed English and Hindi. Build it as a single HTML prototype
> I can click through.

### What happens next

1. It checks your project for context, then asks a short set of numbered questions (Round A) and
   stops for your answers. Then a second round (Round B), pre-filled with what it already knows.
2. It writes a brief of 10 lines or fewer and stops. Reply "confirmed" or send corrections.
3. It proposes three genuinely different art directions with a trade-off table and a recommendation.
   Reply with a letter, or a mix like "A with C's header".
4. It builds, in sessions of about one working step each, then checks the result in a real browser and
   fixes the five worst problems.
5. It finishes with an honest handover: what was tested, what wasn't, and what a backend must provide.

It stops after each phase for your answer. Say **"you decide"** and it chooses, labelling the choice
as an ASSUMPTION. Say **"just build it"** and it runs the remaining build steps without stopping.

### Not for

Quick code reviews of existing UI (use `apple-design` or `ui-ux-pro-max` directly), logos, banners,
slides, or video.

## What's inside

```
.claude-plugin/marketplace.json          catalogue: distinctive-ui + the two optional helper skills
plugins/distinctive-ui/
├── .claude-plugin/plugin.json           manifest
└── skills/
    ├── distinctive-ui/                  the workflow
    │   ├── SKILL.md
    │   ├── references/                  intake, directions, verification, fallback rules, worked example
    │   └── scripts/                     check-helpers.mjs (detect helpers), shoot.mjs (headless-Chrome review)
    ├── design-orchestrator/SKILL.md     routes between ui-ux-pro-max and apple-design
    └── setup/SKILL.md                   /distinctive-ui:setup
```

## Already have the helper skills?

You don't need to do anything. The check finds copies in `~/.claude/skills/`, in your project's
`.claude/skills/`, or installed as plugins, and won't install a second one. If you also have your own
`design-orchestrator`, yours is preferred.

Not using the plugin system at all? Copy the skills by hand:

```bash
git clone https://github.com/rishabhsisodiya/distinctive-ui.git
cp -r distinctive-ui/plugins/distinctive-ui/skills/distinctive-ui ~/.claude/skills/
cp -r distinctive-ui/plugins/distinctive-ui/skills/design-orchestrator ~/.claude/skills/
```

## Update and uninstall

```
/plugin marketplace update distinctive-ui
/plugin uninstall distinctive-ui@distinctive-ui
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
