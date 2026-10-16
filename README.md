# Cardamom House: menu page

Single-page menu for a fictional Lisbon brunch café. Frontend trial task.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
```
Switch states with a query param: `/?state=open` (default), `/?state=closed`, `/?state=special-sold-out`.

## Stack
Next.js 15 (App Router), React 19, TypeScript (strict, no `any`), Tailwind CSS v4 (tokens in `globals.css` `@theme`).

## Decisions and trade-offs
- **Time is fixed per state** (Tuesday 11:30, or Monday for closed) so reviewers see each state reliably. `getStatus()` in `lib/status.ts` is pure and takes day + minutes, so swapping in real Lisbon time (`Intl.DateTimeFormat` with `timeZone: "Europe/Lisbon"`) is a small change.
- **Server components by default.** Only `CategoryNav` is a client component (IntersectionObserver for the active section).
- **Closed state** replaces the special callout with a banner right under the hero, so it is the first thing seen after the status pill.
- **Sold out**: item is dimmed with a "Sold out" pill and struck-through price; the callout turns into a quiet dashed card and suggests an alternative.
- **Type-led, no photos**: Fraunces for display, Plus Jakarta Sans for text. Amber `#B45309` carries buttons, accent rules, the active nav pill, today's row and the special.
- Accessibility: skip link, semantic landmarks, visible focus, 44px nav tap targets, table for hours, reduced-motion respected.
- Print styles hide the nav.

## Next
Real-time Lisbon clock, dietary filter, dark mode, tests for `getStatus`.
