# TamuPOS — Restaurant

A Kenya-ready restaurant point-of-sale prototype. Built as part of exploring what an AI-native POS could look like for Nairobi-area restaurants — the kind of place where the waiter knows half the regulars by name and the "cashier" is also the owner's cousin.

> **Not a production system.** This is a design/engineering prototype with in-memory + localStorage state. Payment flows are mocked. No backend.

---

## What it does

| Area | Behavior |
|---|---|
| **Floor view** | 12-table grid with four live states (free / open / reserved / paying). Tap a table to open or resume an order. |
| **Menu** | 25 authentic Kenyan items across 5 categories (Mains, Nyama Choma, Sides, Drinks, Hot). Prices in KES. |
| **AI order parser** | Natural-language order entry: type `2 pilau, 1 chapati, 2 tusker` and the parser matches menu items. A real version would hit Claude with the menu schema. |
| **Cart** | Add / remove / adjust qty. 16% VAT and 10% service calculated automatically. |
| **Send to kitchen** | Unsent items marked with an indicator; send batches kitchenward with one tap. |
| **Kitchen display** | Separate view showing active tickets with elapsed-time aging (tickets over 15 min turn red). Mark Ready to flip the table to Paying. |
| **M-Pesa** | STK-push flow against an entered phone number. Simulates the Daraja round-trip. |
| **Offline mode** | Toggle `Simulate offline` in the banner. Transactions queue locally and the UI reflects pending sync. Uses `navigator.onLine` in production. |
| **Persistence** | Tables, orders, and the sync queue survive a page reload via `localStorage`. |

---

## Design decisions worth flagging

- **Dark, warm theme.** Deep charcoal + ember accents. Restaurants are evening-heavy businesses; bright UIs fatigue eyes over an 8-hour shift. The grain overlay and Bricolage Grotesque display face are there to feel less like a generic SaaS dashboard.
- **Three-pane desktop layout.** Tables | Menu | Order. Waiters on a shared terminal don't want to navigate — they want everything visible.
- **The AI parser is the shape of the real thing.** The current matcher is dumb regex; the interface is built so swapping it for a Claude call is a one-file change in `App.jsx`'s `parseAiOrder`.
- **Offline is first-class.** Not a toggle buried in settings. It lives in the banner because on Safaricom lines in Kilimani, it will happen.

---

## Running it

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`. State persists in localStorage — clear site data to reset.

## Stack

- Vite 6 + React 18 (JSX, no TypeScript — intentional, keeps the repo easy to fork)
- Tailwind 3 for styling
- `lucide-react` for icons
- Google Fonts: Bricolage Grotesque (display) + Inter (body) + JetBrains Mono (numerics)

No backend, no auth, no test suite. This is a prototype.

---

## Built with Claude Code

This repo was built as a single-session prototype using [Claude Code](https://www.anthropic.com/claude-code) as the primary development workflow. See `CLAUDE.md` for notes on how the work was structured.

## License

MIT — fork it, ship it, improve it.
