# E-Commerce Project — Shared Context

## Stack
Next.js 16.2 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 (`@theme` CSS-based config) · Framer Motion · Zustand (with `persist` middleware, `localStorage` key `gemista-store`) · Radix UI primitives (accordion, dialog, slot, tabs) · `@vercel/analytics`. Deployed on Vercel at [gemista.store](https://gemista.store) (redirects to `www.gemista.store`). Repo: `github.com/metanxtsolutions/gemista`, branch `main`.

Product/category content is static/build-time data. Two exceptions run server-side: Razorpay payment routes (`src/app/api/razorpay/*`, now on **live** keys — real money) and order storage in Postgres (`src/lib/db.ts`, `src/app/internal/orders`) behind a single-password admin gate. See "Payments" and "Order storage & admin" in `docs/project-spec.md`. The `/account` page is still a UI shell only — Sign In / Create Account forms exist but are not wired to any auth system.

## Single Source of Truth
- Product data lives in: [`src/lib/data/products.ts`](../src/lib/data/products.ts) — 22 products, sourced from Nihaojewelry (wholesale/dropship supplier). Photos are the supplier's own product photography for the exact physical items Gemista sources and resells, stored in [`public/products/`](../public/products/).
- Category data: [`src/lib/data/categories.ts`](../src/lib/data/categories.ts) (5 categories: earrings, necklaces, bracelets, rings, jewellery-sets)
- Reviews: [`src/lib/data/reviews.ts`](../src/lib/data/reviews.ts) — `productSlug` must reference a real slug in `products.ts`
- Site map / IA: [`SITEMAP.md`](../SITEMAP.md)
- Brand voice: [`docs/brand-voice.md`](brand-voice.md)
- Target keywords: [`docs/keywords.md`](keywords.md)
- Full project spec: [`docs/project-spec.md`](project-spec.md)

## Always
- Read this file and `/docs/project-spec.md` before starting any task.
- Never invent product specs, prices, or claims — pull from `src/lib/data/products.ts`. If a product's photo doesn't match its description/materials/variant, fix the data, don't paper over it.
- Keep changes scoped to your domain; flag cross-domain issues, don't fix them.
- No em dashes ("—") anywhere in site copy — an explicit, standing brand rule (see `docs/brand-voice.md`). Every instance was removed once already; don't reintroduce them.
- Treat `src/lib/data/misc.ts` → `press` as placeholder editorial quotes, not real citations. Don't present them as genuine press coverage.

## Never
- No keyword stuffing.
- No breaking existing user flows without noting it.
- No committing secrets or source credentials.
