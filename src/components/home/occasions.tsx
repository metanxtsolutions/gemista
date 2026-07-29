import Link from "next/link";
import { occasions } from "@/lib/data/misc";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { photos, PhotoKey } from "@/lib/data/photos";

const photoMap: Record<string, PhotoKey> = {
  "daily-wear": "handsGold",
  office: "earringsSilver",
  "date-night": "ringsNecklace",
  "wedding-guest": "jewelryBox",
  "valentines-day": "necklaceModel",
  birthday: "earringsProduct",
  anniversary: "necklaceProduct",
  festive: "braceletModel",
  "self-gift": "ringsHands",
};

export function Occasions() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-gem">
        <SectionHeading
          eyebrow="Made For The Moment"
          title="Jewellery for Every Occasion"
          description="Whatever's on your calendar, we've got the piece for it."
        />

        <RevealGroup className="mt-12 flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {occasions.map((o) => {
            const key = photoMap[o.slug] ?? "handsGold";
            return (
              <RevealItem key={o.slug} className="w-40 shrink-0 sm:w-auto">
                <Link
                  href={`/collections/all?occasion=${o.slug}`}
                  className="group relative block aspect-square overflow-hidden rounded-lg"
                >
                  <Photo
                    photo={photos[key]}
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-ink-950/30 transition-colors group-hover:bg-ink-950/40" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-cream">
                    {o.name}
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
