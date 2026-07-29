# Gemista — Brand Voice

Grounded in copy that's actually shipped on the site (`src/components/home/hero.tsx`, `src/app/about/page.tsx`, `src/lib/data/products.ts`, `src/lib/data/misc.ts`). This is a description of the voice already in use, not a new invention — treat drift from it as a bug to fix, and treat this doc as due for an update if the shipped copy moves on without it.

## Positioning
"Affordable Luxury Fashion Jewellery" for women 18-35. Tagline: **"Jewellery That Celebrates You."** The core promise, stated directly in the about page: *"Because confidence isn't reserved for special moments. It belongs to every day."*

## Tone
Warm, direct, quietly confident. Talks to one person ("you"), not a crowd. Never shouty, never apologetic about price or positioning.

**Reference examples already live on the site:**
- Hero: *"Elegant jewellery for every moment, every outfit, every version of you. Made to be worn daily, priced so you actually will."*
- About: *"We saw a world where beautiful jewellery often came with a steep price tag, or was reserved only for celebrations. We wanted to change that."*
- Product (Marbella Shell Studs): *"A soft shell-flower silhouette on a sterling silver post. Understated enough for every day, pretty enough that you'll reach for it first."*
- Product (Verona Circle Hoops): *"A bold, oversized hoop built for the nights that call for a little more presence. Light enough to wear all evening."*

## Sentence rhythm
Short, concrete sentence first (what it is). Second sentence adds a feeling or a use-case, often with a small twist or contrast ("understated enough for X, pretty enough that Y"). Avoid stacking more than two sentences in a product description — the existing catalog holds to this discipline.

## Hard rules
- **No em dashes ("—"), ever.** Use a period, comma, colon, or restructure the sentence instead. This was enforced across 73 instances sitewide already; don't reintroduce it in new copy.
- **No emoji bullets or decorative emoji** in body copy or UI.
- **No invented specs.** Materials, prices, and claims must trace back to `src/lib/data/products.ts`. If a product's real photo shows something the copy doesn't mention (or contradicts), fix the copy to match the photo, not the other way around.
- **No overclaiming.** Avoid superlatives without backing ("world's finest," "unmatched") — the brand's edge is honest pricing and everyday wearability, not superiority claims.
- **Avoid generic AI-writing tells**: no forced center-alignment in prose sections, no accent-bar decorations without a real design reason, no "Unlock your potential"-style filler openers.

## Vocabulary that fits
everyday, wear, elegant, considered, honest(ly priced), effortless, layer(ed), stack(able), gift-ready, tarnish-resistant, hypoallergenic, nickel-free, made to be worn daily.

## Vocabulary to avoid
"luxury" as a standalone flex (it's always paired with "affordable" or "accessible" to keep the brand's actual promise), "exclusive," "elite," "world-class," anything that implies scarcity Gemista doesn't actually have.

## Caution: placeholder content
`src/lib/data/misc.ts` → `press` is explicitly marked in-code as **placeholder editorial quotes**, not real press coverage. If used in copy or marketing material, it must be clearly framed as illustrative/example content, or removed once real press exists. Do not present it as genuine third-party validation.

## Occasions vocabulary (use consistently)
Daily Wear, Office, Date Night, Wedding Guest, Valentine's Day, Birthday, Anniversary, Festive, Self Gift — this is the fixed taxonomy in `src/lib/data/misc.ts`. Don't invent new occasion labels ad hoc; add to this list deliberately if a real gap exists.
