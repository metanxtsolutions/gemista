export type JewelryShape =
  | "ring"
  | "necklace"
  | "pendant"
  | "stud"
  | "hoop"
  | "drop"
  | "bracelet"
  | "set";

export type Tone = "gold" | "rose" | "silver" | "ivory";

export interface ProductArt {
  shape: JewelryShape;
  tone: Tone;
}

export type CategorySlug =
  | "earrings"
  | "necklaces"
  | "bracelets"
  | "rings"
  | "jewellery-sets";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  art: ProductArt;
  photo: import("./photos").PhotoKey;
  subcategories: string[];
}

export type CollectionSlug =
  | "everyday-elegance"
  | "butterfly"
  | "crystal"
  | "date-night"
  | "valentine"
  | "office"
  | "party-glam"
  | "wedding-guest";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  description: string;
  art: ProductArt;
  photo: import("./photos").PhotoKey;
}

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  productSlug?: string;
  verified: boolean;
  date: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  collections: CollectionSlug[];
  price: number;
  compareAtPrice?: number;
  materials: string[];
  occasions: string[];
  art: ProductArt;
  variants: { label: string; tone: Tone }[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  lowStock?: number;
  description: string;
  highlights: string[];
}
