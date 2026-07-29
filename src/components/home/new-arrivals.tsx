import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data/products";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Reveal } from "@/components/motion/reveal";

export function NewArrivals() {
  const items = products.filter((p) => p.isNew);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-gem">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Just Landed"
            title="New Arrivals"
            description="The latest pieces to join the edit — updated every few weeks."
          />
          <Link
            href="/collections/new-arrivals"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink-900 link-underline sm:flex"
          >
            Shop New Arrivals <ArrowUpRight size={15} />
          </Link>
        </div>

        <Reveal className="mt-12">
          <ProductCarousel products={items} />
        </Reveal>
      </div>
    </section>
  );
}
