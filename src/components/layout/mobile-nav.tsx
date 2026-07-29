"use client";

import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] transition-opacity duration-300 lg:hidden",
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div onClick={onClose} className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" />
      <aside
        className={cn(
          "absolute inset-y-0 left-0 flex w-full max-w-xs flex-col overflow-y-auto bg-paper shadow-lifted transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-beige px-5 py-5">
          <span className="font-display text-xl text-ink-900">Gemista</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center text-ink-500"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 px-5 py-4">
          {categories.map((cat) => (
            <div key={cat.slug} className="border-b border-beige py-3">
              <button
                onClick={() => setExpanded(expanded === cat.slug ? null : cat.slug)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-ink-900">{cat.name}</span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "text-ink-400 transition-transform duration-300",
                    expanded === cat.slug && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  expanded === cat.slug ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <ul className="overflow-hidden">
                  <li className="pt-3">
                    <Link
                      href={`/collections/${cat.slug}`}
                      onClick={onClose}
                      className="block py-1.5 text-sm text-gold-600"
                    >
                      Shop all {cat.name}
                    </Link>
                  </li>
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        href={`/collections/${cat.slug}?type=${encodeURIComponent(sub)}`}
                        onClick={onClose}
                        className="block py-1.5 text-sm text-ink-500"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-1 pt-3">
            <Link href="/gift-guide" onClick={onClose} className="py-2.5 text-sm font-medium text-ink-900">
              Gift Guide
            </Link>
            <Link href="/collections/sale" onClick={onClose} className="py-2.5 text-sm font-medium text-ink-900">
              Sale
            </Link>
            <Link href="/about" onClick={onClose} className="py-2.5 text-sm font-medium text-ink-900">
              Our Story
            </Link>
            <Link href="/contact" onClick={onClose} className="py-2.5 text-sm font-medium text-ink-900">
              Contact
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
}
