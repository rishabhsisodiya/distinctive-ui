# Art directions, tokens and the anti-template check

## Choose the composition from the job of the screen

| Job of the screen | Composition that fits |
|---|---|
| Work queue (what needs me today) | inbox / split view, items sorted by urgency, the action on the item |
| Monitoring | one big live status, everything else quiet |
| Comparison | dense table, sticky headers, aligned tabular numbers |
| Progress over time | timeline, calendar, stage thread |
| One record (quote, order, case) | document-style page that echoes the real paper artifact |
| Mobile / field work | one action per screen, big inputs, sticky primary button |
| Money owed / settled | ledger with ruled lines, page totals, stamps |

## Direction template (give all three in this shape)

**Letter + name in the domain's own language** — one-line idea.

- **Layout:** what is the hero, what is quiet; how each role's home screen looks; how mobile differs.
- **Type pairing** and the reason (e.g. narrow sans for dense columns; mono for every number so
  figures line up; a serif only where the real artifact is printed).
- **Colour:** 4–6 named tokens with hex, drawn from the domain's materials (paper, ink, tape,
  dye, stamp…). Not purple/indigo by default. Say what each colour is *for*.
- **Density.**
- **Imagery / illustration:** photos, line drawings, none — and why.
- **Signature interaction:** one thing only this product would have, which also solves a real
  problem (e.g. a live scale drawing that marks fabric seams in red, catching quote mistakes).

Then a trade-off table and a recommendation:

| | A | B | C |
|---|---|---|---|
| Daily usability | | | |
| Distinctiveness | | | |
| Solves the stated pain | | | |
| Mobile / field fit | | | |
| Build effort | | | |
| Risk | | | |

Recommend one, or a mix that covers each direction's weak spot, and say why in two sentences.

## Token documentation pattern

Top of the stylesheet:

```css
/* ==============================================================
   <PRODUCT> · "<DIRECTION>" DESIGN SYSTEM (approved <date>)
   Idea: <one line>
   Colour — <material metaphor>: token = purpose ...
   Type   — <font> for UI (why); <mono> for numbers (why); <accent font> only on <place>
   Shape  — radii and what they mean
   Motion — only on: <list>. Off under reduced motion.
   ============================================================== */
:root{ --paper:...; --ink:...; /* semantic states */ }
```

Plus a small in-app "Design system" page listing tokens with their purpose, the type scale,
spacing, and the signature pieces. Define dark mode only if it was asked for.

## Anti-template checklist (run before showing anything; fix every "yes")

- A row of 4 equal number cards with icons and a green "+12%"?
- A line chart next to a donut for no stated reason?
- The same radius, shadow and hover-lift on every card?
- Everything fades or blurs in on load?
- Placeholder names (John Doe, Acme), round numbers, every metric going up?
- Emoji as decoration, gradient hero or glassmorphism just because it's trendy?
- Buttons whose only effect is a popup message?
- Could you swap the product name and the screen would still make sense? If yes, it's a template —
  bring in the domain artifact, vocabulary and the signature interaction until it can't be swapped.

Also check: the heading on the home screen says something only this user would need today
("3 sheets need you today"), not "Dashboard"; numbers use tabular figures and local format;
status uses words and shape, not colour alone.
