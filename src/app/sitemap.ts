import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { allCollectionSlugs } from "@/lib/collection-resolver";
import { journalPosts } from "@/lib/data/journal";

const siteUrl = "https://www.gemista.com";

const staticRoutes = [
  "",
  "/collections",
  "/about",
  "/craftsmanship",
  "/jewellery-care",
  "/gift-guide",
  "/gift-guide/quiz",
  "/journal",
  "/press",
  "/faq",
  "/contact",
  "/track-order",
  "/shipping-policy",
  "/refund-policy",
  "/privacy-policy",
  "/terms",
  "/size-guide",
  "/affiliate",
  "/rewards",
  "/wishlist",
  "/search",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.6,
    })),
    ...allCollectionSlugs().map((slug) => ({
      url: `${siteUrl}/collections/${slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${siteUrl}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...journalPosts.map((p) => ({
      url: `${siteUrl}/journal/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
