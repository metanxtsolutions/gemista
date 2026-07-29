"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const priceBands = [
  { label: "Under ₹1,000", test: (p: Product) => p.price < 1000 },
  { label: "₹1,000 – ₹2,000", test: (p: Product) => p.price >= 1000 && p.price <= 2000 },
  { label: "Above ₹2,000", test: (p: Product) => p.price > 2000 },
];

export function CollectionGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [materials, setMaterials] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [priceBand, setPriceBand] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allMaterials = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.materials))).sort(),
    [products],
  );
  const allOccasions = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.occasions))).sort(),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (materials.length && !materials.some((m) => p.materials.includes(m))) return false;
      if (occasions.length && !occasions.some((o) => p.occasions.includes(o))) return false;
      if (priceBand) {
        const band = priceBands.find((b) => b.label === priceBand);
        if (band && !band.test(p)) return false;
      }
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [products, sort, materials, occasions, priceBand]);

  const activeFilterCount = materials.length + occasions.length + (priceBand ? 1 : 0);

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function clearAll() {
    setMaterials([]);
    setOccasions([]);
    setPriceBand(null);
  }

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="eyebrow text-ink-900">Price</h3>
        <div className="mt-3 space-y-2">
          {priceBands.map((band) => (
            <label key={band.label} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
              <input
                type="radio"
                name="price"
                checked={priceBand === band.label}
                onChange={() => setPriceBand(priceBand === band.label ? null : band.label)}
                className="h-4 w-4 accent-ink-900"
              />
              {band.label}
            </label>
          ))}
        </div>
      </div>

      {allMaterials.length > 1 && (
        <div>
          <h3 className="eyebrow text-ink-900">Material</h3>
          <div className="mt-3 space-y-2">
            {allMaterials.map((m) => (
              <label key={m} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
                <input
                  type="checkbox"
                  checked={materials.includes(m)}
                  onChange={() => toggle(materials, m, setMaterials)}
                  className="h-4 w-4 accent-ink-900"
                />
                {m}
              </label>
            ))}
          </div>
        </div>
      )}

      {allOccasions.length > 1 && (
        <div>
          <h3 className="eyebrow text-ink-900">Occasion</h3>
          <div className="mt-3 space-y-2">
            {allOccasions.map((o) => (
              <label key={o} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
                <input
                  type="checkbox"
                  checked={occasions.includes(o)}
                  onChange={() => toggle(occasions, o, setOccasions)}
                  className="h-4 w-4 accent-ink-900"
                />
                {o}
              </label>
            ))}
          </div>
        </div>
      )}

      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="text-xs font-medium text-gold-600 underline">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">{filterPanel}</aside>

      <div>
        <div className="flex items-center justify-between border-b border-beige pb-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-ink-800 lg:hidden"
          >
            <SlidersHorizontal size={15} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <p className="text-sm text-ink-500">{filtered.length} products</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-beige bg-transparent px-3 py-1.5 text-sm text-ink-800 focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-display text-xl text-ink-900">No products match those filters</p>
            <button onClick={clearAll} className="mt-3 text-sm font-medium text-gold-600 underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[95] lg:hidden",
          filtersOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setFiltersOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink-950/40 transition-opacity",
            filtersOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-full max-w-xs overflow-y-auto bg-paper p-6 shadow-lifted transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            filtersOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink-900">Filters</h2>
            <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
              <X size={18} />
            </button>
          </div>
          {filterPanel}
          <button
            onClick={() => setFiltersOpen(false)}
            className="mt-8 w-full rounded-full bg-ink-900 py-3 text-sm font-semibold text-cream"
          >
            Show {filtered.length} results
          </button>
        </div>
      </div>
    </div>
  );
}
