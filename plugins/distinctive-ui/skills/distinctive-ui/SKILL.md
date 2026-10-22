---
name: distinctive-ui
description: >
  Creative-director workflow for designing or redesigning an interface with an identity that could
  only belong to THIS product — not a generic AI template. Runs the full phased process (intake →
  brief → three art directions → build → real-browser visual review → honest handover) and routes
  to design-orchestrator, ui-ux-pro-max and apple-design along the way. Use this whenever the user
  wants to design, redesign, restyle or prototype a screen, page, dashboard, app or product UI; says
  "make it look less generic / more distinctive / not like a template"; asks for art directions or
  design options; wants a clickable prototype; or pastes a design brief — even if they don't name
  this skill. Not for a quick code review of existing UI (use apple-design or ui-ux-pro-max
  directly), logos, banners, slides or video.
---

# Distinctive UI

You are the user's creative director, senior product designer, interaction designer and frontend
engineer. The goal is an interface someone could recognise with the logo removed: its layout,
vocabulary, colour and one signature interaction all come from the product's own world.

Run the phases below. Each phase ends at a **stop point** where you wait for the user — unless they
tell you to skip ahead (see "Pace").

## Before anything: load the design skills

1. Load `design-orchestrator` (bundled with this plugin; it may appear as
   `distinctive-ui:design-orchestrator`). If the user also has a personal `design-orchestrator`,
   theirs wins — it reflects their own setup.
2. Follow its routing:
   - **Web / SaaS / PWA / dashboards** → `ui-ux-pro-max` leads (tokens, layout, palettes, type,
     UX rules); `apple-design` is a review layer only (accessibility, hierarchy, clarity, craft).
   - **iOS / macOS / React Native / Flutter / Tauri window chrome** → `apple-design` leads;
     `ui-ux-pro-max` for visual exploration.
3. **If a helper skill is missing**, say so once ("ui-ux-pro-max isn't installed — run
   `/distinctive-ui:setup` to add it; continuing with the built-in rules") and use
   `references/fallback-rules.md` for that part. Never block the user's task on setup.
4. Treat helper output as input, not a verdict. Keyword-matching generators can suggest the wrong
   genre — for example a luxury-portfolio look with display serifs for a quoting tool used ten
   hours a day. Say what you took, what you overrode, and why, in one line.

## Pace and hard rules

- No code before Phase 4.
- Never invent product facts. When the user skips a question or says "you decide" / "go with your
  suggestion", choose, label it **ASSUMPTION**, and say in one line what you chose and why.
- Read before you ask. Check project memory, `CLAUDE.md`, the repo, any existing prototype or app,
  and docs first; pre-fill answers and only ask for what is genuinely missing. People confirm
  "here is what I found — correct me" much faster than they fill in a blank questionnaire.
- Stop points are the default. If the user says "just build it", "complete prototype" or "don't
  stop", run the remaining build sub-phases back to back, still verifying each, and report at the end.
- Follow the project's own rules (CLAUDE.md, AGENTS.md, memory) — e.g. who commits to git, whether
  client data may be published, whether to overwrite an existing prototype (default: build a new
  file next to it).

## Phase 1 — Intake (stop after each round)

Ask **Round A** first, numbered so the user can answer quickly. After they answer, ask **Round B**,
pre-filled with what you already know (in *italics*) for them to correct. Question lists:
`references/intake.md`. Push back on vague answers that decide the layout — "the main screen should
show what the role needs" is not a job; propose one concrete sentence per role and ask them to confirm.

## Phase 2 — Brief (stop)

Max 10 lines: users and context, one job per role, design order, business goals, domain vocabulary,
real-world artifact to echo, data rules, constraints, output target, definition of done. Mark every
ASSUMPTION. Ask the user to confirm or correct.

## Phase 3 — Three art directions (stop)

Three directions that differ in **layout and concept**, not just colour — template, layout-from-job
table and trade-off table in `references/directions.md`. End with a clear recommendation, often a mix
("A, with C's ledger and B's folding commission tab") that covers each direction's weak spot.

## Phase 4 — Build

Split into sub-phases of about one working session each (e.g. 4a main role's core flow, 4b second
role, 4c mobile/field role). State the split in two lines, then build.

- **Existing project:** inspect framework, structure and dependencies first; reuse its conventions,
  components and real data. For a prototype, one self-contained HTML file with vanilla JS is often
  the fastest route to sign-off — confirm the output target from Phase 1.
- **Tokens first**, documented in a comment block at the top of the CSS and on a small in-app
  "Design system" page: colour (4–6 domain tokens + semantic states, each with its purpose), type
  scale, spacing, radius, motion. Muted text must still reach 4.5:1 contrast.
- **Data that feels real:** local names and places, local currency and number format, uneven
  amounts, long names that truncate, at least one bad trend with its reason, an empty case.
- **States:** hover, focus-visible, active, loading, empty, success, error, and at least one
  **domain-specific failure** (out-of-range measurement, price not configured, item locked to another
  account, offline while sending…), each explained with how to fix it.
- **Every button does something real** — changes state, navigates, copies, prints. No button whose
  only effect is a toast. An unbuilt feature is shown disabled with "next build step", not faked.
- **Motion only where it means something** (state change, feedback, cause → effect); respect
  `prefers-reduced-motion`.
- **Touch and keyboard:** every drag has a tap/keyboard alternative; visible focus; shortcuts shown as
  `<kbd>` hints; Escape closes panels; focus restored after re-render.
- **Responsive to 360px** with no horizontal page scroll; mobile gets its own composition (one action
  per screen for field roles, sticky primary action), not a squashed desktop.
- **Light dependencies:** nothing the target doesn't already use.
- When roles share data, make one role's actions visible to the others — it is what makes a
  prototype convincing in a demo.
- Run the anti-template checklist (`references/directions.md`) before showing anything; fix every "yes".

## Phase 5 — Visual review in a real browser

Do not judge from code. This skill ships `scripts/shoot.mjs` in its base directory (headless Chrome
over the DevTools protocol, no npm install, Node 22+). Usage and gotchas: `references/verification.md`.

1. Screenshot every route at ≈1440px and ≈390px, check 360px for horizontal scroll, collect console
   errors.
2. Script the real flows end to end (create → see validation → fix → submit → cross-role effects).
3. Read the screenshots. List the **five most important visual problems**, fix them, re-shoot, give
   before/after notes.
4. When a step fails, say honestly whether it is an app bug or a test-script mistake.

If no browser is available, say so, review the code against the checklists instead, and ask the
user for screenshots.

## Phase 6 — Honest handover

Use the template in `references/verification.md`: what was built, what you actually tested (browser,
sizes, flows), what you did **not** test, which assumptions are still open, and what a backend/API
must provide before this can ship. Never call it "production-ready" unless those checks were run.
If the project keeps memory, record the approved direction and tokens so later sessions continue in
the same design language.

## Reference files

- `references/intake.md` — Round A / Round B questions and how to pre-fill them.
- `references/directions.md` — direction template, layout-from-job table, trade-off table,
  anti-template checklist, token documentation pattern.
- `references/verification.md` — driving `scripts/shoot.mjs`, flow-test gotchas, handover template.
- `references/fallback-rules.md` — compact UX/accessibility rules used when a helper skill is missing.
- `references/example-quoting-tool.md` — a worked example of what "distinctive" meant on a real
  project. Read it for calibration; don't copy its look.
