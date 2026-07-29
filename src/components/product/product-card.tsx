"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/data/types";
import { ProductArt } from "@/components/media/product-art";
import { Rating } from "@/components/ui/rating";
import { formatPrice, cn } from "@/lib/utils";
import { useGemista } from "@/lib/store";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const toggleWishlist = useGemista((s) => s.toggleWishlist);
  const hasHydrated = useGemista((s) => s.hasHydrated);
  const isWishlisted = useGemista((s) => s.isWishlisted(product.slug)) && hasHydrated;
  const addToCart = useGemista((s) => s.addToCart);

  const secondaryArt = product.variants[1];

  return (
    <div className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-ivory">
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
            <ProductArt shape={product.art.shape} tone={product.art.tone} className="absolute inset-0" />
            {secondaryArt && (
              <ProductArt
                shape={product.art.shape}
                tone={secondaryArt.tone}
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </div>
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-ink-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-950">
              Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
            </span>
          )}
          {product.lowStock && (
            <span className="rounded-full bg-paper/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-error">
              Only {product.lowStock} left
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink-800 shadow-soft transition-transform hover:scale-110"
        >
          <Heart size={16} className={isWishlisted ? "fill-error text-error" : ""} />
        </button>

        <button
          onClick={() =>
            addToCart({
              slug: product.slug,
              name: product.name,
              price: product.price,
              variant: product.variants[0]?.label ?? "Default",
            })
          }
          className="absolute inset-x-3 bottom-3 translate-y-14 rounded-full bg-ink-900 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-cream opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick Add
        </button>
      </div>

      <Link href={`/products/${product.slug}`} className="mt-3.5 flex flex-1 flex-col">
        <h3 className="text-sm font-medium text-ink-900">{product.name}</h3>
        <Rating value={product.rating} count={product.reviewCount} className="mt-1.5" />
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-ink-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-ink-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
