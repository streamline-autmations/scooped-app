# Scooped — visual prototype

Mystery scoop box storefront + admin dashboard. **Frontend only** for now — no backend, no payments, no email. Orders + admin password are stored in `localStorage` and the dashboard is seeded with fake orders so the visual flow works end-to-end.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. Admin lives at `/admin` — default password is `scoop`.

## Stack

- React 18 + Vite + Tailwind + Framer Motion
- react-router-dom (`/` storefront, `/admin` dashboard)
- localStorage for orders + counter
- No Supabase / PayFast / Resend wired up yet (the checkout has a fake "PayFast" pay screen; clicking pay marks the order paid locally)

## Edit the brand / pricing

Everything sits in `src/lib/config.js` — change tier prices, shipping, brand name, copy.

## Build

```bash
npm run build
```
