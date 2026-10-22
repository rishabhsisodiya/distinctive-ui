# Intake questions

Ask Round A alone, numbered. Stop. Then Round B. Short answers and "you decide" are fine — say so.

## Before asking

Look for answers first: project memory, `CLAUDE.md`, the repo (`package.json`, routes, existing
pages), any existing prototype (grep its headings, data constants, pricing logic), docs folders.
If the user names a known product, load what you know about it and say what you found in one line.

## Round A — the product

1. What is it, in one sentence? (product / website / app / internal tool — and is it an existing
   project? name it)
2. Who uses it? Role, context and device (e.g. "dealer at a showroom counter on a laptop",
   "installer on a low-end Android at a customer's home").
3. How often and how long? (8 hours a day / 5 minutes a week / once)
4. What is the ONE job of the main screen? Finish: "After using it, the user can…"
5. Which screen or page should we design first?
6. What does success look like for the business? (sign-ups, fewer support calls, faster dispatch,
   sales, clearer commissions…)

If an answer to 4 is vague ("enough details for the role"), propose one concrete sentence per role
and ask them to confirm — the layout depends on it.

## Round B — the world (pre-fill in *italics* wherever you can)

7. 5–10 real words, objects or terms from this domain.
8. A real-world artifact the UI could echo (job card, measurement sheet, receipt, ledger/khata,
   boarding pass, menu card, catalogue…). Ask if they can photograph a real one.
9. Real or sample data — rows, or the shape: names, amounts, statuses, edge cases. Ask for the
   business rules you can't derive (e.g. how commission is calculated and when it is paid).
10. Brand assets (name, logo, colours, fonts, tone) — or free to create? Separate the *product's*
    brand from any *customer/tenant* branding that must stay configurable.
11. Competitors or references liked/disliked, and why.
12. Hard constraints: languages, currency and units, accessibility, light/dark, offline, low-end
    devices.
13. Output target: single HTML page | React + Vite | Next.js | existing repo (path/stack) |
    mockup only. When both a prototype and a real app exist, recommend: prototype first for sign-off,
    then port the approved design.
14. What does "done" mean? (clickable prototype with mock data / production front end / full stack)

## Brief format (Phase 2)

≤10 numbered lines:
users & context · one job per role · design order · business goals · vocabulary · artifact echo ·
data rules · brand · constraints · output target & definition of done.
Mark each ASSUMPTION inline. End with: reply "confirmed" or send corrections.
