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

No backend, no database, no real auth. Everything is static/build-time data in `src/lib/data/*.ts`.

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
- `/account` — static Sign In / Create Account UI, no backend wired up
- Brand/policy pages: `/about`, `/craftsmanship`, `/faq`, `/contact`, `/privacy-policy`, `/refund-policy`, `/shipping-policy`, `/terms`, `/size-guide`, `/jewellery-care`, `/track-order`, `/press`, `/affiliate`, `/rewards`
- `/journal` + `/journal/[slug]` — editorial content
- `/gift-guide` + `/gift-guide/quiz` — style quiz flow
- `/sitemap.xml`, `/robots.txt`

## Key UX patterns
- Cart drawer + wishlist: global Zustand state, real product photo thumbnails (falls back to illustrated `ProductArt` gradient/line-art only when `product.photo` is absent)
- Mega menu, mobile nav, search overlay, cart drawer: always-rendered + CSS opacity/transform transitions gated by conditional Tailwind classes (not conditional mount) — see "Tech stack" note above for why
- Free shipping progress bar at ₹999 threshold (cart drawer + cart page)
- Sticky add-to-cart bar on PDP scroll

## Known gaps / non-goals (documented, not silently papered over)
- `/account` has no real authentication — forms are inert by design, not a bug
- `src/lib/data/misc.ts` → `press` array is explicitly placeholder ("Replace with real press coverage once secured") — never present as genuine
- No payment processing — checkout form collects shipping info but does not integrate a real payment gateway
- Brand voice and keyword targets are documented separately (`docs/brand-voice.md`, `docs/keywords.md`) and are a first draft, not validated against real SEO tooling/search-volume data

## Standing conventions from past work
- No em dashes ("—") in any site copy, ever — all 73 prior instances were manually rewritten; this is a hard rule, not a preference
- Avoid generic AI-writing patterns in new copy: no emoji bullets, no forced center-alignment, no purple-blue gradients, no accent-bar decorations unless a real design reason exists
- When adding a new product, verify the photo actually matches the description/materials/variant tone before shipping — this was a real recurring bug during the Nihaojewelry catalog import (6 of 17 initial photos were mismatched to their descriptions)
