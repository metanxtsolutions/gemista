# Gemista — Target Keywords

**Status: first-draft targets, not validated against real search-volume/competition data.** These are derived from the site's actual structure (categories, materials, occasions) and current metadata (`src/app/layout.tsx`), not from a keyword-research tool. Treat as a starting point for `seo-strategist` to validate and prioritize, not as settled truth.

## Currently live in metadata (`src/app/layout.tsx`)
`Gemista`, `fashion jewellery`, `affordable luxury jewellery`, `gold plated earrings`, `necklaces online India`, `jewellery gift sets`

## Category × intent matrix
Built from the 5 live categories and their subcategories (`src/lib/data/categories.ts`). Pattern: `[subcategory] + [category] + [modifier]`.

**Earrings** (stud, hoops, drop, butterfly, pearl, crystal)
- gold plated stud earrings, hoop earrings online India, drop earrings for women, butterfly earrings, pearl earrings India, crystal earrings party wear, hypoallergenic earrings, nickel-free earrings

**Necklaces** (pendant, chains, layered, butterfly, heart, crystal)
- pendant necklace gold plated, layered necklace set, heart necklace gift, chain necklace women, crystal necklace party

**Bracelets** (charm, chain, crystal, tennis)
- charm bracelet gold, tennis bracelet affordable, chain bracelet women, crystal bracelet

**Rings** (minimal, adjustable, stackable, statement)
- stackable rings set, adjustable ring one size, statement ring gold, minimal rings everyday

**Jewellery Sets**
- jewellery gift set for her, necklace and earring set, coordinated jewellery set

## Material-driven keywords
Pulled from real `materials[]` values in `products.ts`: sterling silver jewellery, 18K gold plated jewellery, cubic zirconia jewellery, freshwater pearl jewellery, rhodium plated jewellery, hypoallergenic jewellery, nickel-free jewellery, tarnish-resistant jewellery.

## Occasion-driven keywords
From the fixed taxonomy in `src/lib/data/misc.ts`: daily wear jewellery, office-appropriate jewellery, date night jewellery, wedding guest jewellery, Valentine's Day jewellery gift, birthday gift jewellery, anniversary jewellery gift, festive jewellery India, self-gift jewellery.

## Brand-positioning keywords
affordable luxury jewellery India, fashion jewellery for women 18-35, everyday fine jewellery alternative, gold plated jewellery vs real gold.

## Competitive landscape (context, not copy targets)
Gemista's positioning was informed by studying Mejuri, Ana Luisa, Pandora, GIVA, Swarovski, Missoma, BlueStone, CaratLane, and Outhouse Jewellery. Do not build "Gemista vs [Brand]" comparison pages or copy that could read as trademark-adjacent; use these only as category/positioning reference points for `seo-strategist` and `listing-copywriter`.

## Open questions for seo-strategist to resolve with real tooling
- Actual monthly search volume and difficulty for the above terms (India market)
- Whether "necklaces online India" (already live) is the right head term vs. a more specific long-tail set
- Local/regional modifiers worth targeting (city-level intent, if relevant to shipping/marketing)
- Whether product-level long-tail keywords (e.g. from `listing-copywriter` output) should feed back into this file
