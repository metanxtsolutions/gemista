import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, invert = false }: { items: Crumb[]; invert?: boolean }) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-xs",
          invert ? "text-ink-200" : "text-ink-500",
        )}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight size={12} className={invert ? "text-ink-400" : "text-ink-300"} />
            )}
            {item.href ? (
              <Link href={item.href} className={invert ? "hover:text-cream" : "hover:text-ink-900"}>
                {item.label}
              </Link>
            ) : (
              <span className={invert ? "text-cream" : "text-ink-800"}>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              ...(item.href ? { item: item.href } : {}),
            })),
          }),
        }}
      />
    </>
  );
}
