import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/lib/data/collections";
import { photos } from "@/lib/data/photos";
import { Photo } from "@/components/media/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const featured = collections.filter((c) =>
  ["everyday-elegance", "butterfly", "crystal", "date-night"].includes(c.slug),
);

export function FeaturedCollections() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-gem">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Curated For You"
            title="Featured Collections"
            description="Signature edits, styled around how you actually live — every day, date night, and everything between."
          />
          <Link
            href="/collections"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink-900 link-underline sm:flex"
          >
            View All Collections <ArrowUpRight size={15} />
          </Link>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((col) => (
            <RevealItem key={col.slug}>
              <Link href={`/collections/${col.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Photo
                    photo={photos[col.photo]}
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3 className="font-display text-lg text-cream sm:text-xl">{col.name}</h3>
                    <p className="mt-1 hidden text-xs text-cream/80 sm:block">
                      {col.description}
                    </p>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Link
          href="/collections"
          className="mt-8 flex items-center justify-center gap-1.5 text-sm font-medium text-ink-900 sm:hidden"
        >
          View All Collections <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
