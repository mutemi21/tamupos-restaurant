# CLAUDE.md

Notes for working with Claude Code on this repo.

## Context

This is a restaurant POS prototype for Kenyan context. The goal is prototype fidelity — code that reads like something that could become real, not a hello-world. Favor clarity, realistic data, and plausible product decisions over clever abstractions.

## Style conventions Claude should follow here

- **JSX + hooks only.** No class components. No TypeScript in this repo — keep it readable for product folks who might fork it.
- **Components are single-file and self-contained.** No prop-drilling beyond 2 levels. If it gets deeper, extract a context.
- **Tailwind-only styling.** No CSS modules, no styled-components. Custom animations go in `index.css`.
- **KES everywhere.** Money is always `kes(amount)` from `utils/format.js`. Never hardcode "$" or "KES " in a template literal.
- **Kenyan context, not generic.** Menu items are real dishes (Ugali, Nyama Choma, Pilau, Mukimo). Phone numbers use +254. M-Pesa references Safaricom Daraja by name.

## Things Claude should NOT do

- Don't add a backend, auth, or real API calls. This is a prototype.
- Don't add TypeScript. Deliberate choice.
- Don't replace `lucide-react` with heroicons or a different icon set.
- Don't generalize "restaurant" into a generic POS. The restaurant-ness is the point.
- Don't add test setup. This is a prototype, not a production codebase.

## Extensions worth doing

- Wire the AI order parser (`parseAiOrder` in `App.jsx`) to a real Claude call. The prompt would include the full menu + user input + a system prompt asking for structured JSON.
- Add split-bill support (by item, by percentage, by person count).
- Add table merging for large parties.
- Add a real print-receipt flow (browser `window.print` with a clean receipt template).
- Wire to the Safaricom Daraja sandbox for real STK push testing.
