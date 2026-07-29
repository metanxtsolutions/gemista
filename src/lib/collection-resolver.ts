import { categories } from "./data/categories";
import { collections } from "./data/collections";
import { products } from "./data/products";
import { PhotoKey } from "./data/photos";
import { Product } from "./data/types";

export interface ResolvedCollection {
  slug: string;
  title: string;
  description: string;
  photo: PhotoKey;
  products: Product[];
}

export function resolveCollection(slug: string): ResolvedCollection | null {
  if (slug === "all") {
    return {
      slug,
      title: "All Jewellery",
      description: "Every piece, in one place — earrings, necklaces, bracelets, rings and sets.",
      photo: "jewelryBox",
      products,
    };
  }

  if (slug === "new-arrivals") {
    return {
      slug,
      title: "New Arrivals",
      description: "The latest pieces to join the edit — updated every few weeks.",
      photo: "ringsNecklace",
      products: products.filter((p) => p.isNew),
    };
  }

  if (slug === "best-sellers") {
    return {
      slug,
      title: "Best Sellers",
      description: "The pieces our community reorders again and again.",
      photo: "handsGold",
      products: products.filter((p) => p.isBestSeller),
    };
  }

  if (slug === "sale") {
    return {
      slug,
      title: "Sale",
      description: "Affordable luxury, now even more affordable.",
      photo: "earringsProduct",
      products: products.filter((p) => p.compareAtPrice),
    };
  }

  const category = categories.find((c) => c.slug === slug);
  if (category) {
    return {
      slug,
      title: category.name,
      description: category.tagline,
      photo: category.photo,
      products: products.filter((p) => p.category === category.slug),
    };
  }

  const collection = collections.find((c) => c.slug === slug);
  if (collection) {
    return {
      slug,
      title: collection.name,
      description: collection.description,
      photo: collection.photo,
      products: products.filter((p) => p.collections.includes(collection.slug)),
    };
  }

  return null;
}

export function allCollectionSlugs(): string[] {
  return [
    "all",
    "new-arrivals",
    "best-sellers",
    "sale",
    ...categories.map((c) => c.slug),
    ...collections.map((c) => c.slug),
  ];
}
