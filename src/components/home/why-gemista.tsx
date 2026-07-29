import { Gem, Heart, Leaf, Gift } from "lucide-react";
import { whyGemista } from "@/lib/data/misc";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const icons = [Gem, Heart, Leaf, Gift];

export function WhyGemista() {
  return (
    <section className="bg-ink-900 py-20 sm:py-28">
      <div className="container-gem">
        <SectionHeading
          eyebrow="Why Gemista"
          title="Everyday luxury, done right"
          description="Every piece is designed to be worn, not saved for someday."
          align="center"
          className="[&_h2]:text-cream [&_p]:text-ink-300"
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyGemista.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <RevealItem key={item.title} className="text-center sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink-800 text-gold-400 sm:mx-0">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-base font-medium text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{item.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
