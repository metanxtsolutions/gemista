"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/data/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGemista } from "@/lib/store";

export function StickyAddToCart({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const addToCart = useGemista((s) => s.addToCart);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 620);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-beige bg-paper/95 backdrop-blur transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container-gem flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink-900">{product.name}</p>
          <p className="text-sm text-ink-500">{formatPrice(product.price)}</p>
        </div>
        <Button
          onClick={() =>
            addToCart({
              slug: product.slug,
              name: product.name,
              price: product.price,
              variant: product.variants[0]?.label ?? "Default",
            })
          }
          className="shrink-0"
        >
          Add to Bag
        </Button>
      </div>
    </div>
  );
}
