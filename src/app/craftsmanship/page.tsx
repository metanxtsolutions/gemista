import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { photos } from "@/lib/data/photos";

export const metadata: Metadata = {
  title: "Materials & Craftsmanship",
  description:
    "Learn what Gemista jewellery is made from — titanium steel, gold and silver plating, cubic zirconia and freshwater pearls — and how each piece is finished.",
  alternates: { canonical: "/craftsmanship" },
};

const materials = [
  {
    name: "Titanium Steel",
    detail: "Our everyday-wear base metal — hypoallergenic, waterproof and virtually scratch-resistant.",
  },
  {
    name: "18K Gold & Rhodium Plating",
    detail: "A thick, tarnish-resistant plating layer bonded for long-lasting shine, even with daily wear.",
  },
  {
    name: "Sterling Silver & Brass",
    detail: "Used as the base for select pieces, chosen for weight, warmth and finish.",
  },
  {
    name: "Cubic Zirconia & Austrian Crystal",
    detail: "Hand-set, machine-cut stones chosen for maximum brilliance and light reflection.",
  },
  {
    name: "Freshwater Pearls",
    detail: "Genuine, ethically sourced pearls selected for their lustre and consistency.",
  },
];

export default function CraftsmanshipPage() {
  return (
    <div>
      <PageHeader
        eyebrow="How It's Made"
        title="Materials & Craftsmanship"
        description="Premium finishes and considered design, without the traditional jewellery markup."
        crumbs={[{ label: "Home", href: "/" }, { label: "Craftsmanship" }]}
      />

      <div className="container-gem py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Photo photo={photos.jewelryBox} className="aspect-[4/5] rounded-xl" sizes="(min-width:1024px) 45vw, 100vw" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl text-ink-900">Built for real, everyday life</h2>
            <p className="mt-4 text-ink-600">
              We design every piece to survive your actual routine — the gym, the shower, a
              humid commute. That means choosing hypoallergenic, nickel-free bases and
              tarnish-resistant plating over cheaper alternatives that fade within weeks.
            </p>
            <p className="mt-4 text-ink-600">
              Every design goes through multiple prototypes before production, and every batch
              is quality-checked for plating consistency, stone setting and finish before it
              reaches you.
            </p>
          </Reveal>
        </div>

        <h2 className="mt-20 font-display text-2xl text-ink-900">What we use, and why</h2>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {materials.map((m) => (
            <RevealItem key={m.name} className="rounded-lg border border-beige p-6">
              <h3 className="font-medium text-ink-900">{m.name}</h3>
              <p className="mt-2 text-sm text-ink-600">{m.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
