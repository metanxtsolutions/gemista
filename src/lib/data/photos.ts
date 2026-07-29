// Curated free-license editorial photography (Unsplash License, free for commercial
// use, no attribution required). Sourced for the Gemista concept site to stand in for
// real product photography. Credits kept here for reference / future attribution.

export interface Photo {
  id: string;
  url: string;
  alt: string;
  credit: string;
}

function unsplash(id: string, params = "q=80&w=1600&auto=format&fit=crop") {
  return `https://images.unsplash.com/${id}?${params}&ixlib=rb-4.1.0`;
}

export const photos = {
  heroPortrait: {
    id: "hero-portrait",
    url: unsplash("photo-1594465919760-441fe5908ab0", "q=80&w=2000&auto=format&fit=crop"),
    alt: "Woman wearing gold hoop earrings",
    credit: "Amir Seilsepour",
  },
  neckJewelry: {
    id: "neck-jewelry",
    url: unsplash("photo-1632325707710-2bce161b7642", "q=80&w=1600&auto=format&fit=crop"),
    alt: "Woman wearing a necklace and earrings",
    credit: "Majid Akbari",
  },
  earringsModel: {
    id: "earrings-model",
    url: unsplash("photo-1605035184674-1ee3fa430b7e", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Model wearing a gold hoop earring",
    credit: "Adrian Swancar",
  },
  earringsProduct: {
    id: "earrings-product",
    url: unsplash("photo-1680968921717-4abbbe793bb3", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Pair of gold hoop earrings on a white background",
    credit: "Ian Talmacs",
  },
  earringsSilver: {
    id: "earrings-silver",
    url: unsplash("photo-1677913842001-3941986ca979", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Pair of silver hoop earrings on a white background",
    credit: "COPPERTIST WU",
  },
  earringsCloseup: {
    id: "earrings-closeup",
    url: unsplash("photo-1708389828173-5a48bedeb62f", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Close-up of a person wearing earrings",
    credit: "Oscar Ramirez",
  },
  necklaceProduct: {
    id: "necklace-product",
    url: unsplash("photo-1611012525567-90be7e060d92", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Gold chain necklace laid flat",
    credit: "Laura Ohlman",
  },
  necklaceModel: {
    id: "necklace-model",
    url: unsplash("photo-1551458695-b7765a26923c", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Woman wearing a necklace",
    credit: "Matteo Vistocco",
  },
  braceletModel: {
    id: "bracelet-model",
    url: unsplash("photo-1633810543462-77c4a3b13f07", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Close-up of a person wearing a bracelet",
    credit: "Sama Hosseini",
  },
  ringsHands: {
    id: "rings-hands",
    url: unsplash("photo-1762342672674-bc14e52572f4", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Close-up of hands wearing rings",
    credit: "Zulfugar Karimov",
  },
  ringsNecklace: {
    id: "rings-necklace",
    url: unsplash("photo-1633934542430-0905ccb5f050", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Close-up of rings and a necklace",
    credit: "Segal Jewelry",
  },
  jewelryBox: {
    id: "jewelry-box",
    url: unsplash("photo-1769116416641-e714b71851e8", "q=80&w=1600&auto=format&fit=crop"),
    alt: "Jewelry box filled with necklaces, rings and earrings",
    credit: "Nellie Adamyan",
  },
  handsGold: {
    id: "hands-gold",
    url: unsplash("photo-1731441326210-bfcb6595e93a", "q=80&w=1400&auto=format&fit=crop"),
    alt: "Close-up of hands with gold jewelry",
    credit: "Naeem Ad",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const categoryGallery: Record<string, PhotoKey[]> = {
  earrings: ["earringsModel", "earringsCloseup", "earringsProduct", "earringsSilver"],
  necklaces: ["necklaceModel", "neckJewelry", "necklaceProduct"],
  bracelets: ["braceletModel", "handsGold"],
  rings: ["ringsHands", "ringsNecklace"],
  "jewellery-sets": ["jewelryBox", "necklaceProduct", "ringsHands"],
};

