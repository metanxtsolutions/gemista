import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { photos } from "@/lib/data/photos";
import { Photo } from "@/components/media/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function ShopByCategory() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-gem">
        <SectionHeading
          eyebrow="Explore"
          title="Shop by Category"
          description="From everyday studs to statement rings, find your next favourite piece."
          align="center"
        />

        <RevealGroup className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-6 sm:grid-cols-5 sm:gap-8">
          {categories.map((cat) => (
            <RevealItem key={cat.slug} className="flex flex-col items-center">
              <Link href={`/collections/${cat.slug}`} className="group flex flex-col items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 sm:h-28 sm:w-28">
                  <Photo photo={photos[cat.photo]} className="absolute inset-0 rounded-full" sizes="112px" />
                </div>
                <span className="mt-3 text-center text-xs font-medium text-ink-800 sm:text-sm">
                  {cat.name}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
