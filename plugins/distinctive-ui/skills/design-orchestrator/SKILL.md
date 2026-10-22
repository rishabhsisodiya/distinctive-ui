---
name: design-orchestrator
description: >
  Routes any UI/UX design, styling, or design-review task to the right design skill and sets which
  one has final say. Load this FIRST, before ui-ux-pro-max or apple-design, whenever the task
  involves designing, building, styling, reviewing, or auditing an interface — web apps, SaaS
  dashboards, landing pages, React Native, Flutter, iOS, macOS, Tauri, or Electron.
---

# Design Orchestrator

Two design skills overlap, so this skill decides which one leads.

- **ui-ux-pro-max** — web/product design system: styles, palettes, font pairings, UX guidelines,
  charts, stack-specific implementation.
- **apple-design** — Apple Human Interface Guidelines reviewer plus a design-craft lens.

When installed through the `distinctive-ui` plugin they may appear namespaced
(`ui-ux-pro-max:ui-ux-pro-max`, `apple-design:apple-design`); a copy in `~/.claude/skills/` appears
without a prefix. Use whichever is in your skill list.

## Step 0 — Check what is available

Look at the available skills. If one or both are missing, say so in one line, suggest
`/distinctive-ui:setup` (it detects what you already have and installs only what's missing), and carry on: use the one that is present for its own part of the table
below, and for the missing part fall back to `references/fallback-rules.md` in the
`distinctive-ui` skill. Do not stop the user's task just because a helper skill is absent.

## Step 1 — Identify the target platform

Decide from the codebase (e.g. `package.json`, `app.json`, `*.xcodeproj`, `pubspec.yaml`,
`tauri.conf.json`) or from the request. If it is genuinely unclear, ask.

## Step 2 — Route

| Target | Primary (decides) | Secondary (supports) |
|---|---|---|
| Web / SaaS / dashboards / landing pages (Next.js, React, Vue, etc.) | `ui-ux-pro-max` — design system, layout, components, tokens | `apple-design` — review/audit layer only: accessibility, clarity, hierarchy, craft critique |
| React Native / Flutter mobile / iOS (SwiftUI, UIKit) | `apple-design` — platform guidelines: navigation, controls, gestures, safe areas, typography | `ui-ux-pro-max` — visual/style exploration: palettes, fonts, mood |
| macOS native (AppKit, SwiftUI) | `apple-design` | `ui-ux-pro-max` for visual exploration |
| Tauri / Electron desktop | `apple-design` for window chrome, menus, keyboard shortcuts, and OS conventions on macOS | `ui-ux-pro-max` for the in-app content surface (it is web tech) |

Load the primary skill first, then the secondary only for the part it supports.

## Step 3 — Conflict rule

When the two skills disagree, the **primary** wins.

**Never let Apple HIG override web-specific design patterns** — e.g. web navigation (top nav,
sidebars, breadcrumbs), hover states, dense data tables, web form conventions, responsive
breakpoints, browser/URL behavior — **unless the user explicitly asks for Apple-style UI**
(e.g. "make it look like a Mac app", "Apple-style", "iOS feel").

On web, use apple-design findings only where they are platform-neutral (accessibility, contrast,
touch-target size, clarity, consistency, motion restraint). Drop findings that only make sense on
Apple platforms (tab bars, Liquid Glass, SF Symbols, iOS navigation stacks) and do not report them
as issues.

## Step 4 — Respect the project

Project instructions (CLAUDE.md / AGENTS.md) and an existing design system in the codebase
(tokens, component library, Tailwind config) take precedence over both skills. Extend what exists;
do not restyle it to match a skill's defaults.

When reporting, say briefly which skill led and why, e.g. "Web SaaS → ui-ux-pro-max primary,
apple-design for accessibility audit."
