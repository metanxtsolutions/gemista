"use client";

import { useState } from "react";
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Product } from "@/lib/data/types";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { useGemista } from "@/lib/store";

const toneSwatch: Record<string, string> = {
  gold: "#c8a55a",
  rose: "#c98d78",
  silver: "#c7c2b6",
  ivory: "#ecdfc7",
};

export function ProductInfo({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);

  const addToCart = useGemista((s) => s.addToCart);
  const toggleWishlist = useGemista((s) => s.toggleWishlist);
  const hasHydrated = useGemista((s) => s.hasHydrated);
  const isWishlisted = useGemista((s) => s.isWishlisted(product.slug)) && hasHydrated;

  return (
    <div>
      <div className="flex items-center gap-2">
        {product.isNew && (
          <span className="rounded-full bg-ink-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-950">
            Best Seller
          </span>
        )}
      </div>

      <h1 className="mt-3 text-balance font-display text-3xl text-ink-900 sm:text-4xl">
        {product.name}
      </h1>

      {product.rating !== undefined ? (
        <a href="#reviews" className="mt-2 inline-block">
          <Rating value={product.rating} count={product.reviewCount} />
        </a>
      ) : (
        <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-gold-600">
          New Arrival
        </span>
      )}

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-ink-900">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <>
            <span className="text-base text-ink-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="text-sm font-medium text-error">
              Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
            </span>
          </>
        )}
      </div>

      {product.lowStock && (
        <p className="mt-3 text-sm font-medium text-error">
          Only {product.lowStock} left, order soon
        </p>
      )}

      <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-600">{product.description}</p>

      {product.variants.length > 1 && (
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-700">
            Finish: <span className="font-semibold text-ink-900">{variant.label}</span>
          </p>
          <div className="mt-2.5 flex gap-2.5">
            {product.variants.map((v) => (
              <button
                key={v.label}
                onClick={() => setVariant(v)}
                aria-label={v.label}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
                  variant.label === v.label ? "border-ink-900" : "border-transparent",
                )}
              >
                <span
                  className="block h-full w-full rounded-full border border-black/10"
                  style={{ background: toneSwatch[v.tone] }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-7 flex items-stretch gap-3">
        <div className="flex items-center rounded-full border border-beige-dark">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-12 w-11 items-center justify-center text-ink-600"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center text-sm font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-12 w-11 items-center justify-center text-ink-600"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1"
          onClick={() =>
            addToCart(
              {
                slug: product.slug,
                name: product.name,
                price: product.price,
                variant: variant.label,
              },
              qty,
            )
          }
        >
          Add to Bag · {formatPrice(product.price * qty)}
        </Button>

        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-label="Add to wishlist"
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-beige-dark text-ink-700 hover:border-ink-900"
        >
          <Heart size={18} className={isWishlisted ? "fill-error text-error" : ""} />
        </button>
      </div>

      <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
        <input
          type="checkbox"
          checked={giftWrap}
          onChange={(e) => setGiftWrap(e.target.checked)}
          className="h-4 w-4 accent-ink-900"
        />
        Add gift wrapping &amp; a handwritten note (free)
      </label>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-beige pt-6 text-xs text-ink-600 sm:grid-cols-4">
        <div className="flex flex-col items-start gap-1.5">
          <Truck size={17} className="text-gold-600" />
          Free shipping over ₹999
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <RotateCcw size={17} className="text-gold-600" />
          15-day easy returns
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <ShieldCheck size={17} className="text-gold-600" />
          Hypoallergenic
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <Sparkles size={17} className="text-gold-600" />
          Tarnish resistant
        </div>
      </div>
    </div>
  );
}
