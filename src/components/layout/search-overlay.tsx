"use client";

import { Search, X } from "lucide-react";
import { useGemista } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const trending = [
  "Gold hoops",
  "Butterfly necklace",
  "Stacking rings",
  "Pearl earrings",
  "Gift sets under ₹1500",
];

export function SearchOverlay() {
  const isOpen = useGemista((s) => s.isSearchOpen);
  const closeSearch = useGemista((s) => s.closeSearch);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function go(term: string) {
    closeSearch();
    setQuery("");
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeSearch}
        className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
      />
      <div
        className={cn(
          "absolute inset-x-0 top-0 bg-paper shadow-lifted transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-y-0" : "-translate-y-4",
        )}
      >
        <div className="container-gem flex items-center gap-4 border-b border-beige py-6">
          <Search size={20} className="text-ink-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && query && go(query)}
            placeholder="Search for earrings, necklaces, gifts..."
            className="flex-1 bg-transparent font-display text-xl text-ink-900 placeholder:text-ink-300 focus:outline-none sm:text-2xl"
          />
          <button
            onClick={closeSearch}
            aria-label="Close search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ivory"
          >
            <X size={18} />
          </button>
        </div>
        <div className="container-gem py-8">
          <p className="eyebrow text-ink-400">Trending Searches</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {trending.map((t) => (
              <button
                key={t}
                onClick={() => go(t)}
                className="rounded-full border border-beige px-4 py-2 text-sm text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
