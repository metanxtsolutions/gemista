# Gemista — Project Spec

## What it is
A premium jewellery ecommerce storefront for **Gemista**, positioned as "Affordable Luxury Fashion Jewellery" for women 18-35. Prices in ₹ (INR), India market. Inspired by (not copying) Mejuri, Ana Luisa, Pandora, GIVA, Swarovski, Missoma, BlueStone, CaratLane, and Outhouse Jewellery.

Tagline: "Jewellery That Celebrates You."

## Business model
Gemista sources and dropships from **Nihaojewelry**, a wholesale jewellery supplier. The 17 live products are real physical items Gemista resells; their photos are Nihaojewelry's own product photography, used under the standard supplier-to-reseller arrangement for the exact items being sold. This is documented in the header comment of `src/lib/data/products.ts` — do not treat these as stock/placeholder images.

## Tech stack
- Next.js 16.2, App Router, Turbopack, React 19, TypeScript
- Tailwind CSS v4 (CSS-based `@theme`, see `src/app/globals.css`)
- Framer Motion for scroll/hover effects; plain CSS transition classes (not `AnimatePresence`) for mount/unmount UI (drawers, overlays, mega menu) — `AnimatePresence` was found to get stuck at its initial invisible state in this environment and was replaced everywhere it mattered
- Zustand + `persist` for cart/wishlist (`src/lib/store.ts`), persisted to `localStorage` under `gemista-store`
- Radix UI primitives (accordion, dialog, slot, tabs) as headless building blocks
- `@vercel/analytics` wired into `src/app/layout.tsx`
- Deployed on Vercel, custom domain `gemista.store` → `www.gemista.store`

No database, no real auth. Product/category/review data is static/build-time in `src/lib/data/*.ts`. The one exception is checkout payments: two Next.js Route Handlers (`src/app/api/razorpay/*`) run server-side on Vercel to create and verify Razorpay orders — see "Payments" below.

## Data model
- `Product` (`src/lib/data/types.ts`): slug, name, category, collections[], price, compareAtPrice?, materials[], occasions[], art (illustrated fallback shape/tone), `photo?` (real product photo path, preferred over `art` when present), variants[], rating, reviewCount, badges (isNew/isBestSeller/lowStock), description, highlights[]
- `Category`: slug, name, tagline, art, photo, subcategories[] — 5 categories: earrings, necklaces, bracelets, rings, jewellery-sets
- `Review`: id, author, rating, title, body, `productSlug` (must match a real product), verified, date
- Occasions taxonomy (`misc.ts`): Daily Wear, Office, Date Night, Wedding Guest, Valentine's Day, Birthday, Anniversary, Festive, Self Gift

## Site architecture
Full IA in `SITEMAP.md`. Key routes:
- `/` — homepage (12 sections: hero, categories, bestsellers, style quiz, editorial, etc.)
- `/collections/[slug]` — filterable product grid (price, material, occasion, sort) — includes `all`, `new-arrivals`, `best-sellers`, `sale`, and per-category slugs
- `/products/[slug]` — PDP: gallery, info, accordion (details/materials), reviews, related products (complete the look / you may also like), recently viewed, sticky add-to-cart, Product + FAQ JSON-LD schema
- `/cart`, `/checkout` (guards empty-cart state with a "Shop Now" CTA instead of a broken form)
- `/wishlist` (guards empty state similarly)
- `/search` — query param driven, substring match against name/category (note: "ring" also matches "earrings" as a substring — expected, not a bug)
- `/account` — real customer accounts via phone OTP login (see "Customer accounts" below)
- Brand/policy pages: `/about`, `/craftsmanship`, `/faq`, `/contact`, `/privacy-policy`, `/refund-policy`, `/shipping-policy`, `/terms`, `/size-guide`, `/jewellery-care`, `/track-order`, `/press`, `/affiliate`, `/rewards`
- `/journal` + `/journal/[slug]` — editorial content
- `/gift-guide` + `/gift-guide/quiz` — style quiz flow
- `/sitemap.xml`, `/robots.txt`

## Key UX patterns
- Cart drawer + wishlist: global Zustand state, real product photo thumbnails (falls back to illustrated `ProductArt` gradient/line-art only when `product.photo` is absent)
- Mega menu, mobile nav, search overlay, cart drawer: always-rendered + CSS opacity/transform transitions gated by conditional Tailwind classes (not conditional mount) — see "Tech stack" note above for why
- Free shipping progress bar at ₹999 threshold (cart drawer + cart page)
- Sticky add-to-cart bar on PDP scroll

## Payments
Checkout (`src/app/checkout/page.tsx`) collects full name, phone, and shipping address (no email field), and a payment method choice of UPI, Credit Card, or Debit Card. On submit:
1. `POST /api/razorpay/create-order` recomputes the cart total server-side from real `products.ts` prices (never trusts a client-sent amount), then creates a Razorpay order.
2. The client loads Razorpay's `checkout.js` and opens the widget, restricted to UPI or card entry based on the selected method, prefilled with name/phone.
3. On success, `POST /api/razorpay/verify` checks the HMAC-SHA256 payment signature server-side before the cart is cleared and the order is marked placed.

Requires `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` as environment variables (see `.env.local.example`) — get them from the Razorpay dashboard. Without them, `create-order` returns a clear "not configured" error instead of crashing, and the checkout UI surfaces it inline.

**Currently live on real Razorpay keys** — this is processing actual customer payments, not test transactions.

## Order storage & admin
Once `/api/razorpay/verify` confirms a payment's signature, it writes an order row (customer name, phone, address, cart items, amounts, Razorpay IDs, gift note) to Postgres via `src/lib/db.ts` (`@vercel/postgres`, table auto-created on first use). If the DB write fails, the customer still sees success — a captured payment must never be reported as failed over a storage error — but the failure is logged server-side for manual reconciliation.

`/internal/orders` (`src/app/internal/orders/page.tsx`) lists orders newest-first. It's gated by a single shared password (`ADMIN_PASSWORD` env var, see `src/lib/admin-auth.ts`): `POST /api/admin/login` checks it and sets an HMAC-signed, httpOnly session cookie (12h expiry) — this is intentionally lightweight (single-owner store, no multi-admin roles or real user accounts), not a full auth system. Requires `POSTGRES_URL` (auto-injected if you create a Postgres database from the Vercel dashboard's Storage tab) and `ADMIN_PASSWORD` as environment variables.

## Customer accounts
`/account` (`src/app/account/page.tsx`) is passwordless, phone-OTP-based — Amazon-India-style: enter a 10-digit mobile number, get a 6-digit SMS code, verify, done. First-time verification auto-creates a `customers` row (find-or-create by phone); there's no separate "sign up" step.

- `POST /api/auth/send-otp` — validates the number, checks a 30s resend cooldown (`src/lib/otp.ts`), generates and hashes (SHA-256) a 6-digit code, stores it in `otp_codes` with a 5-minute expiry, sends it via `src/lib/sms.ts` (MSG91's Flow API).
- `POST /api/auth/verify-otp` — checks expiry, a 5-attempt cap, and the hash; on match, finds-or-creates the customer, deletes the OTP row, and sets an HMAC-signed httpOnly session cookie (`src/lib/customer-auth.ts`, 30-day expiry, distinct from the admin session and its own `SESSION_SECRET`).
- Logged-in customers see `AccountDashboard`: profile (name/email), and their own order history (`listOrdersForCustomer`, filtered by `orders.customer_id`).
- **Checkout stays guest-first, unaffected** — no login is required to buy. If a customer happens to be logged in, checkout silently prefills name/phone (`GET /api/auth/me`) and the completed order links to their account (`verify` route reads the same cookie); logged-out checkout behaves exactly as before this feature existed.

Requires `SESSION_SECRET` (any random string, e.g. `openssl rand -hex 32`), `MSG91_AUTH_KEY`, and `MSG91_TEMPLATE_ID` as environment variables. **MSG91 needs a DLT-registered sender ID and an approved OTP template first** — this is an India regulatory requirement for transactional SMS, not optional, and can take real setup time before OTPs will actually send. Without these env vars, `send-otp` returns a clear "not configured" error instead of crashing.

## Known gaps / non-goals (documented, not silently papered over)
- `src/lib/data/misc.ts` → `press` array is explicitly placeholder ("Replace with real press coverage once secured") — never present as genuine
- Brand voice and keyword targets are documented separately (`docs/brand-voice.md`, `docs/keywords.md`) and are a first draft, not validated against real SEO tooling/search-volume data

## Standing conventions from past work
- No em dashes ("—") in any site copy, ever — all 73 prior instances were manually rewritten; this is a hard rule, not a preference
- Avoid generic AI-writing patterns in new copy: no emoji bullets, no forced center-alignment, no purple-blue gradients, no accent-bar decorations unless a real design reason exists
- When adding a new product, verify the photo actually matches the description/materials/variant tone before shipping — this was a real recurring bug during the Nihaojewelry catalog import (6 of 17 initial photos were mismatched to their descriptions)
