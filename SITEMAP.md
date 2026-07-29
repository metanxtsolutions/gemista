# Gemista: Information Architecture & Sitemap

This document maps the full site structure as implemented in this codebase, plus the design system reference. It is the companion deliverable to the running Next.js app.

## 1. Sitemap

```
/                               Homepage
/collections                    All collections index (categories + signature collections)
/collections/[slug]              Category or collection listing (filters, sort, grid)
    earrings · necklaces · bracelets · rings · jewellery-sets
    everyday-elegance · butterfly · crystal · date-night
    valentine · office · party-glam · wedding-guest
    all · new-arrivals · best-sellers · sale
/products/[slug]                 Product detail page (22 seed products)
/search                          Search results (?q=)
/wishlist                        Saved products
/cart                            Full-page bag (mirrors cart drawer)
/checkout                        One-page checkout
/account                         Sign in / create account

/about                           Our Story / Mission / Vision / Why Gemista
/craftsmanship                   Materials & Craftsmanship
/jewellery-care                  Care guide
/gift-guide                      Gift guide (by occasion / budget)
/gift-guide/quiz                 Jewellery Style Quiz (interactive)
/journal                         Journal / blog index
/journal/[slug]                  Journal post
/press                           Press mentions

/faq                             FAQ (with FAQPage schema)
/contact                         Contact form
/track-order                     Order tracking form
/size-guide                      Ring / bracelet / necklace sizing
/shipping-policy                 Shipping policy
/refund-policy                   Refund & returns policy
/privacy-policy                  Privacy policy
/terms                           Terms of service
/affiliate                       Affiliate & influencer program
/rewards                         Rewards & referrals

/sitemap.xml                     Auto-generated (next/sitemap)
/robots.txt                      Auto-generated
```

### Global, persistent UI (present on every route)
- **Announcement bar**: rotating promo messages
- **Header**: logo, primary nav with mega menu (Earrings / Necklaces / Bracelets / Rings / Sets / Gift Guide / Sale), search trigger, account, wishlist (with count), cart (with count)
- **Mobile nav**: slide-over with accordion categories
- **Cart drawer**: slide-over, free-shipping progress bar, qty controls
- **Search overlay**: full-screen, trending searches
- **Footer**: newsletter capture, 4 link columns, social, payment badges

## 2. Homepage section order

1. Hero (full-bleed editorial photo, parallax, dual CTA)
2. Press strip ("As Seen In")
3. Featured Collections (4-up)
4. Shop by Category (5 circular tiles)
5. New Arrivals (carousel)
6. Best Sellers (carousel)
7. Jewellery for Every Occasion (scroll row)
8. Why Gemista (4 USP tiles, dark section)
9. Reviews (rating breakdown + cards)
10. Instagram Feed (6-tile grid)
11. Gift Guide banner (quiz + gift guide CTA)
12. Newsletter (dark, full-width)

## 3. Product page anatomy

Breadcrumbs, then Gallery (thumbnails + zoom-on-hover), Info panel (badges, rating, price, variant swatches, qty, Add to Bag, wishlist, gift-wrap checkbox, trust badges), Accordion (Details & Materials / Care / Shipping / Returns / Gift Wrapping), Reviews (rating breakdown + list, `#reviews` anchor), Complete The Look, You May Also Like, Recently Viewed, and a sticky mobile Add-to-Bag bar.

JSON-LD: `Product` (with `AggregateRating`/`Offer`) + `FAQPage` per product page. `BreadcrumbList` on every page using `<Breadcrumbs>`. `Organization` schema in the root layout.

## 4. Data layer (mock, swappable)

All content lives in `src/lib/data/*.ts`, typed and framework-agnostic, structured so it can be swapped for a real CMS/headless-commerce backend (Shopify, Medusa, Sanity, etc.) without touching UI components:

- `products.ts`: 22 seed SKUs across all 5 categories
- `categories.ts`, `collections.ts`: nav + landing taxonomy
- `reviews.ts`, `misc.ts` (press, occasions, USPs), `journal.ts`
- `photos.ts`: curated free-license (Unsplash License) editorial photography used for marketing surfaces (hero, category tiles, collections, occasions, gift guide, Instagram grid, journal). Credits are recorded in-file.
- Individual **product cards and the product gallery** use an original abstract art-direction system (`components/media/product-art.tsx`, gradient + line-art per shape/tone) rather than photography, since 22 distinct SKUs don't have real studio photography yet. Swap `ProductArt` for real product photos per SKU before launch.

State: `src/lib/store.ts` (Zustand + persist) handles cart, wishlist, recently-viewed, and drawer/search open state. Hydration-safe via a `hasHydrated` flag to avoid SSR/client mismatches.

## 5. Design system reference

**Typography**: `Fraunces` (display/serif, headlines) + `Inter` (sans, UI/body), loaded via `next/font`.

**Color tokens** (`src/app/globals.css`, Tailwind v4 `@theme`):
| Token | Use |
|---|---|
| `paper` `cream` `ivory` `beige` | primary warm neutrals |
| `ink-950…200` | charcoal/black scale, body text & dark sections |
| `gold-300…700` | brand gold accent (`#c8a55a` = `gold-500`) |
| `rose-200…500` | soft rose-gold accent |

**Radii**: `xs..xl` (4px–32px) + `full`. **Shadows**: `soft` / `card` / `lifted`. **Easing**: `--ease-luxury` (`cubic-bezier(0.22,1,0.36,1)`) used across Framer Motion transitions.

**Motion system** (`components/motion/reveal.tsx`): `Reveal` / `RevealGroup` / `RevealItem` provide scroll-triggered fade-up-blur, `viewport={{ once: true }}`, shared across every section for a consistent "soft, luxury, never overused" feel.

## 6. Not implemented (explicitly out of scope for this static/demo build)

These require a real backend and were intentionally left as UI-only or omitted, since they need infrastructure this repo doesn't have:
- Payment processing, real order placement, transactional email
- Authentication / real user accounts
- CMS-backed blog, live inventory, real search indexing
- AI search / AI product recommendations, referral & loyalty ledgers, abandoned-cart automation, live chat
- Multi-currency/multi-language runtime switching (structure supports it; not wired)

The checkout, account, contact, and track-order forms are fully designed and interactive on the front end (with mock success states) so the experience can be evaluated end-to-end, but they don't call a real API.
