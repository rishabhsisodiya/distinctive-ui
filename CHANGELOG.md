# Changelog

## 1.1.0 — 2026-10-22

- Helper skills are no longer hard dependencies. `ui-ux-pro-max` and `apple-design` are detected first
  (personal skills folder, project, installed plugins, session skill list) and offered for install only
  when missing, so nobody gets duplicate copies, and any helper can be removed without breaking the plugin.
- New `scripts/check-helpers.mjs` (read-only detection), used by the main skill and `/distinctive-ui:setup`.
- README and setup rewritten to match.

## 1.0.0 — 2026-10-22

- First release: `distinctive-ui` workflow (intake → brief → three directions → build → browser review → handover).
- Bundled `design-orchestrator` routing between ui-ux-pro-max and apple-design, with fallback rules when either is missing.
- `/distinctive-ui:setup` checks and installs helper skills and tools, asking first.
- `scripts/shoot.mjs`: dependency-free headless-Chrome screenshots and flow tests.
