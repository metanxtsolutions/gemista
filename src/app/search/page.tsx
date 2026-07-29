"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { PageHeader } from "@/components/ui/page-header";

function SearchResults() {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      const haystack = [
        p.name,
        p.category,
        ...p.materials,
        ...p.occasions,
        ...p.collections,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <div>
      <PageHeader
        eyebrow="Search"
        title="Search Gemista"
        crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <div className="container-gem py-6">
        <div className="flex max-w-xl items-center gap-3 rounded-full border border-beige-dark px-5">
          <SearchIcon size={18} className="text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for earrings, necklaces, gifts..."
            className="h-12 flex-1 bg-transparent text-sm focus:outline-none"
            autoFocus
          />
        </div>

        {query && (
          <p className="mt-6 text-sm text-ink-500">
            {results.length} result{results.length !== 1 && "s"} for &ldquo;{query}&rdquo;
          </p>
        )}

        {query && results.length === 0 && (
          <p className="mt-10 text-ink-500">
            No products found. Try &ldquo;hoops&rdquo;, &ldquo;necklace&rdquo; or &ldquo;gift set&rdquo;.
          </p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}
