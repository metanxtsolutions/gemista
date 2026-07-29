import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Jewellery Care Guide",
  description:
    "How to keep your Gemista jewellery looking new: storage, cleaning and everyday wear tips.",
  alternates: { canonical: "/jewellery-care" },
};

const tips = [
  { title: "Keep it dry", body: "Remove jewellery before showering, swimming or intense workouts to protect the plating." },
  { title: "Last on, first off", body: "Apply perfume, lotion and hairspray before putting your jewellery on. Chemicals dull the finish over time." },
  { title: "Store it separately", body: "Keep pieces in the pouch provided, away from direct sunlight and other jewellery to avoid scratches." },
  { title: "Wipe, don't scrub", body: "Gently wipe with a soft, dry cloth after wear. Avoid abrasive cloths or jewellery cleaning solutions." },
  { title: "Avoid extreme temperatures", body: "Don't leave jewellery in a hot car or direct sun for extended periods. Heat can affect plating and stone settings." },
  { title: "Give it a rest", body: "Rotating pieces rather than wearing one continuously extends the life of the plating." },
];

export default function JewelleryCarePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Guide"
        title="Jewellery Care"
        description="Simple habits that keep your Gemista pieces looking new for years."
        crumbs={[{ label: "Home", href: "/" }, { label: "Jewellery Care" }]}
      />

      <div className="container-gem py-10">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((t) => (
            <RevealItem key={t.title} className="rounded-lg border border-beige p-6">
              <h3 className="font-medium text-ink-900">{t.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{t.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 rounded-lg bg-ivory p-8">
          <h2 className="font-display text-xl text-ink-900">A note on plating</h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-600">
            All plated jewellery will naturally wear over time with contact, moisture and
            friction. This is true of every plated jewellery brand, not just Gemista. Following
            the care tips above will significantly extend the life of your pieces.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
