import { InstagramIcon } from "@/components/icons/social";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { photos, PhotoKey } from "@/lib/data/photos";

const tiles: PhotoKey[] = [
  "earringsModel",
  "necklaceProduct",
  "ringsHands",
  "braceletModel",
  "earringsSilver",
  "ringsNecklace",
];

export function InstagramFeed() {
  return (
    <section className="pt-20 pb-12 sm:pt-28 sm:pb-16">
      <div className="container-gem">
        <SectionHeading
          eyebrow="@wearegemista"
          title="Styled by you"
          description="Tag @wearegemista to be featured — real people, real everyday styling."
          align="center"
        />

        <RevealGroup className="mt-12 grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {tiles.map((key) => (
            <RevealItem key={key}>
              <a
                href="#"
                className="group relative block aspect-square overflow-hidden rounded-md"
                aria-label="View on Instagram"
              >
                <Photo photo={photos[key]} className="absolute inset-0" sizes="180px" />
                <div className="absolute inset-0 flex items-center justify-center bg-ink-950/0 text-cream opacity-0 transition-all duration-300 group-hover:bg-ink-950/40 group-hover:opacity-100">
                  <InstagramIcon width={20} height={20} />
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
