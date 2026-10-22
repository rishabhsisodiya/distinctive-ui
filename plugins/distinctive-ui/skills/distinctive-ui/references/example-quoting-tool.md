# Worked example — a made-to-measure quoting tool ("Naap")

For calibration only. It shows how domain facts turned into a look; do not reuse the palette or
layout for an unrelated product.

**Product:** a multi-tenant SaaS for curtain and blind businesses in India. Roles: a dealer at a
showroom counter (all day, laptop or tablet), the business owner (approvals, money, dealers), and a
site engineer on a low-end Android phone at the customer's home. Pains: quotation mistakes and
unclear dealer commission.

**Directions offered:** A "Naap" (the quote *is* the installer's paper measurement sheet),
B "Counter" (showroom swatch board plus a till receipt), C "Bahi" (red-ruled shop ledger plus a
work queue).
**Approved mix:** A, plus C's ledger and stage thread, plus B's commission tab that folds away.

**What made it distinctive**
- Signature interaction: typing width × drop redraws a scale drawing of the window — panels, pleat
  folds, sheer fabric translucent, curtains pooling on the floor, and fabric seams drawn as red-pencil
  dashes. It catches the exact mistakes that cause rework.
- Domain failure states: a 412″ width circled in red with "re-measure"; a lining with no price set;
  a heading not offered hand-finished; a fabric exclusive to another dealer (locked); a discount
  above the dealer's cap; sending while offline.
- "Turn to customer" mode hides commission and workroom figures when the screen faces the customer.
- A commission ledger with a double red margin, page totals, and "Paid" / "Page closed" stamps that
  land when the owner settles.
- Sheet "stubs" with a punched left edge, and a tape-yellow bar when an item needs you.
- The home heading is a sentence about today — "3 sheets need you today" — not "Dashboard".
- On the phone, the site engineer gets one action per screen: measure one window, then fit:
  collect balance → tick each window → customer sign-off, with a "can't do this visit" path.

**Tokens:** paper #F7F4EC, sheet #FFFDF8, ink #1F2328, tape yellow #E8B931 (active field only,
never text), drafting blue #1E4FA8 (dimensions, links), red pencil #B42318 (errors, seams),
olive #4A6626 (money received). Archivo for UI, JetBrains Mono for every inch and rupee, Newsreader
only on the ledger. Paper corners 2 px, controls 6 px.

**Overrode the tool:** the design-system generator proposed "exaggerated minimalism" with display
serifs and a portfolio layout — rejected, because it suits a showcase site, not a ten-hour work tool.

**What browser verification caught:** read-only controls that looked struck through; status chips
overflowing their column; numbers wrapping; ledger columns misaligned between months; a mobile
footer that was too tall; a clipboard rejection that silently broke "Share"; and a business-rule bug
where a job completed on payment before it was fitted.
