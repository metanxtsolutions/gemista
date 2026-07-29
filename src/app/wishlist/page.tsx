"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useGemista } from "@/lib/store";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const wishlist = useGemista((s) => s.wishlist);
  const hasHydrated = useGemista((s) => s.hasHydrated);

  const items = hasHydrated ? products.filter((p) => wishlist.includes(p.slug)) : [];

  return (
    <div>
      <PageHeader
        eyebrow="Saved For Later"
        title="Your Wishlist"
        crumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />
      <div className="container-gem py-10">
        {hasHydrated && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart size={36} className="text-ink-300" />
            <p className="mt-4 font-display text-xl text-ink-900">Your wishlist is empty</p>
            <p className="mt-2 text-sm text-ink-500">Tap the heart on any product to save it here.</p>
            <Button className="mt-6" asChild>
              <Link href="/collections/all">Shop All Jewellery</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
