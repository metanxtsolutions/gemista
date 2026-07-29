import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { photos } from "@/lib/data/photos";
import { Photo } from "@/components/media/photo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "All Collections",
  description:
    "Browse every Gemista collection: Everyday Elegance, Butterfly, Crystal, Date Night, Valentine's, Office, Party Glam and Wedding Guest.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsIndexPage() {
  return (
    <div className="container-gem py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />

      <Reveal className="mt-4 max-w-2xl">
        <p className="eyebrow text-gold-600">Explore Gemista</p>
        <h1 className="mt-2 font-display text-4xl text-ink-900 sm:text-5xl">All Collections</h1>
        <p className="mt-3 text-ink-500">
          Shop by category or discover our signature collections, curated for every mood and
          occasion.
        </p>
      </Reveal>

      <h2 className="mt-14 font-display text-2xl text-ink-900">Shop by Category</h2>
      <RevealGroup className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <RevealItem key={cat.slug}>
            <Link href={`/collections/${cat.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Photo
                  photo={photos[cat.photo]}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width:1024px) 20vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-cream">
                  {cat.name}
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      <h2 className="mt-16 font-display text-2xl text-ink-900">Signature Collections</h2>
      <RevealGroup className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {collections.map((col) => (
          <RevealItem key={col.slug}>
            <Link href={`/collections/${col.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Photo
                  photo={photos[col.photo]}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width:1024px) 25vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-ink-950/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-cream">
                  {col.name}
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
