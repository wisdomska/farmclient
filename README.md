# FarmClient

**Live:** https://farmclient.vercel.app — auto-deployed from `main` via Vercel.

A fairer market for every farmer — a marketplace prototype connecting Ghana's farmers with trusted
buyers. Farmers list crops from any phone (smartphone app **or** a `*789#` USSD flow), buyers order
and pay into escrow, and farmers are paid the same day. This repo is a faithful React + Tailwind
implementation of the FarmClient design.

Implemented from the Claude Design component `FarmClient.dc.html`.

## Screens

A sticky prototype toolbar (top of the page) switches between every screen:

| Screen | What it shows |
| --- | --- |
| **Landing** | Marketing page — hero, how-it-works, trust band, footer |
| **Auth** | Sign in / sign up with Google or email |
| **Dashboard** | Buyer home — live price ticker, quick stats, recommended listings, active orders |
| **Marketplace** | Browse listings with crop / price / delivery / verified filters and grid · list · map views |
| **Listing detail** | Produce details, fair-price guide chart, farmer trust score, order panel |
| **Checkout** | Mobile-money payment + escrow, with a MoMo-approval modal |
| **Orders** | On-the-way and past orders |
| **Tracking** | Order status stepper + delivery-confirmation rating |
| **Farmer app** | A phone mockup: wallet, trust score, add-crop, listings, prices |
| **USSD** | A feature-phone `*789#` flow for farmers without smartphones |
| **Admin** | Platform overview, SMS broadcast, users, listings, orders, payments, settings |

Dark and light themes are supported and toggle live (persisted to `localStorage`).

## Tech stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev) build tooling
- [Tailwind CSS v4](https://tailwindcss.com) — the design tokens from the source are mapped to semantic
  utilities (`bg-surface`, `text-ink`, `bg-primary`, …) that re-resolve on theme switch via CSS variables.

## Project layout

```
src/
  store.tsx            # global state (theme, screen, filters, …) via React context
  lib/
    types.ts           # shared types
    data.ts            # static data: listings, USSD flow, formatters, design helpers
    derive.tsx         # useFarm() — derived/display state + action callbacks
  components/
    primitives.tsx     # SVG primitives: Ring, Spark, TrendArrow, CropGlyph, icons, Logo
    shared.tsx         # TopBar, ListingCard, ThemeToggle, PinIcon
    Toolbar.tsx        # the screen-switcher toolbar
    Toast.tsx          # toast notifications
  screens/             # one component per screen
  App.tsx              # theme container + screen router
```

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Notes

This is a front-end prototype: data is mocked in `src/lib`, and actions (payments, broadcasts, sign-in)
are simulated with toasts and timers. No backend is required.
