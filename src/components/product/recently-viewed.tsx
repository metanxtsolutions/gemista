"use client";

import { useGemista } from "@/lib/store";
import { products } from "@/lib/data/products";
import { ProductCard } from "./product-card";

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const recentlyViewed = useGemista((s) => s.recentlyViewed);
  const mounted = useGemista((s) => s.hasHydrated);

  if (!mounted) return null;

  const items = recentlyViewed
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[number] => Boolean(p) && p!.slug !== excludeSlug)
    .slice(0, 4);

  if (!items.length) return null;

  return (
    <section className="border-t border-beige py-14">
      <h2 className="font-display text-2xl text-ink-900">Recently Viewed</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
