"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/data/types";
import { ProductCard } from "./product-card";

export function ProductCarousel({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-6"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((p) => (
          <div key={p.slug} className="w-[62vw] shrink-0 snap-start sm:w-[280px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="absolute -left-4 top-1/3 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-beige bg-paper shadow-soft lg:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="absolute -right-4 top-1/3 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-beige bg-paper shadow-soft lg:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
