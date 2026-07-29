import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { occasions } from "@/lib/data/misc";
import { products } from "@/lib/data/products";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Gift Guide",
  description:
    "Find the perfect jewellery gift by occasion or budget. Curated picks for birthdays, anniversaries, Valentine's Day and more.",
  alternates: { canonical: "/gift-guide" },
};

const budgets = [
  { label: "Under ₹1,000", test: (p: number) => p < 1000 },
  { label: "₹1,000 – ₹2,000", test: (p: number) => p >= 1000 && p <= 2000 },
  { label: "₹2,000+", test: (p: number) => p > 2000 },
];

export default function GiftGuidePage() {
  const giftSets = products.filter((p) => p.category === "jewellery-sets").slice(0, 4);

  return (
    <div>
      <PageHeader
        eyebrow="For Someone Special"
        title="Gift Guide"
        description="Not sure what to pick? Shop by occasion, budget, or take our 60-second style quiz."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gift Guide" }]}
      />

      <div className="container-gem py-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-xl bg-ink-900 p-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-800 text-gold-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-display text-xl text-cream">Not sure where to start?</h2>
              <p className="mt-1 text-sm text-ink-300">
                Take our 60-second Style Quiz and we&apos;ll recommend the perfect piece.
              </p>
            </div>
          </div>
          <Button variant="outline-light" asChild>
            <Link href="/gift-guide/quiz">Take the Quiz</Link>
          </Button>
        </Reveal>

        <h2 className="mt-16 font-display text-2xl text-ink-900">Shop by Occasion</h2>
        <RevealGroup className="mt-6 flex flex-wrap gap-2.5">
          {occasions.map((o) => (
            <RevealItem key={o.slug}>
              <Link
                href={`/collections/all?occasion=${o.slug}`}
                className="block rounded-full border border-beige px-4 py-2 text-sm text-ink-700 hover:border-ink-900 hover:text-ink-900"
              >
                {o.name}
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <h2 className="mt-14 font-display text-2xl text-ink-900">Shop by Budget</h2>
        <RevealGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {budgets.map((b) => (
            <RevealItem key={b.label}>
              <Link
                href="/collections/all"
                className="block rounded-lg border border-beige p-6 text-center hover:border-ink-900"
              >
                <span className="font-display text-lg text-ink-900">{b.label}</span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <h2 className="mt-14 font-display text-2xl text-ink-900">Gift Sets They&apos;ll Love</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
          {giftSets.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
