# Fallback rules (when ui-ux-pro-max or apple-design is not installed)

A compact, platform-neutral baseline so the workflow still produces sound UI. It is not a
replacement for the helper skills — suggest `/distinctive-ui:setup` once, then use this.

## Accessibility (check first)
- Text contrast ≥ 4.5:1 (large text ≥ 3:1); meaningful icons and control borders ≥ 3:1.
- Visible focus ring on every interactive element; tab order follows visual order.
- Every input has a visible label; errors sit next to the field, say the cause and the fix, and are
  linked with `aria-describedby`; after a failed submit, focus an error summary.
- Icon-only buttons have an accessible name; decorative icons are `aria-hidden`.
- Never use colour alone for meaning — pair it with text, icon or shape.
- Respect `prefers-reduced-motion`; nothing auto-plays without a pause control.
- Headings in order (h1 → h2 → h3); a skip link on app shells.

## Touch and interaction
- Targets ≥ 44×44 px on touch (≥ 24×24 on pointer-only web), with ≥ 8 px between them.
- Visible feedback within ~100 ms of a press; disable and show progress on async buttons.
- Every drag or swipe has a button/keyboard alternative.
- Confirm destructive actions, or better, offer Undo.
- One primary action per screen; secondary actions visibly quieter.

## Layout
- Mobile first; breakpoints around 375 / 768 / 1024 / 1440; no horizontal page scroll at 360 px.
- 4/8 px spacing scale; consistent max content width on desktop.
- Inputs at 16 px so phones don't zoom; body line-height 1.5; lines 60–75 characters on desktop.
- Sticky bars reserve space so they never cover content or the focused control.
- Large screens (≥1024 px): sidebar navigation; small screens: bottom navigation (≤ 5 items, icon +
  label) or a top bar. Don't mix patterns at the same level.

## Type and colour
- One UI typeface plus at most one accent face; tabular figures for numbers, prices, timers.
- Semantic colour tokens (surface, text, muted, border, primary, danger, success, warning) — never
  raw hex inside components.
- Pick colours from the product's own world before reaching for a default blue/purple.

## Forms and feedback
- Validate on blur, not on every keystroke; keep the user's input on error.
- Helpful empty states with a next action; skeletons for waits over ~1 s; timeouts offer Retry.
- Toasts don't steal focus (`aria-live="polite"`), auto-dismiss in 3–6 s, and carry Undo where useful.

## Apple platforms (only when targeting iOS/macOS natively)
- Follow platform navigation (tab bar / navigation stack on iOS, menu bar and toolbars on macOS),
  respect safe areas and Dynamic Type, use system controls unless the brand truly needs custom ones.
