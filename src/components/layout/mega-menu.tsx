"use client";

import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { photos } from "@/lib/data/photos";
import { Photo } from "@/components/media/photo";
import { cn } from "@/lib/utils";

export function MegaMenu({ open }: { open: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full border-t border-beige bg-paper shadow-lifted transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="container-gem grid grid-cols-12 gap-8 py-10">
        <div className="col-span-7 grid grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.slug}>
              <Link
                href={`/collections/${cat.slug}`}
                className="eyebrow text-ink-900 link-underline"
              >
                {cat.name}
              </Link>
              <ul className="mt-4 space-y-2.5">
                {cat.subcategories.map((sub) => (
                  <li key={sub}>
                    <Link
                      href={`/collections/${cat.slug}?type=${encodeURIComponent(sub)}`}
                      className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-5 grid grid-cols-2 gap-4 border-l border-beige pl-8">
          {collections.slice(0, 2).map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group relative overflow-hidden rounded-md"
            >
              <div className="relative aspect-[4/5]">
                <Photo
                  photo={photos[col.photo]}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                  sizes="220px"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/70 to-transparent p-4">
                <p className="text-sm font-medium text-cream">{col.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
