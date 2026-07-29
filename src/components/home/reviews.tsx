import { Quote } from "lucide-react";
import { reviews } from "@/lib/data/reviews";
import { SectionHeading } from "@/components/ui/section-heading";
import { Rating } from "@/components/ui/rating";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Reviews() {
  return (
    <section className="pt-20 pb-12 sm:pt-28 sm:pb-16">
      <div className="container-gem">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="From Our Community"
            title="Loved, worn, reordered"
            description="15,000+ five-star reviews and counting."
          />
          <div className="flex items-center gap-3">
            <Rating value={4.9} size={18} />
            <span className="text-sm font-medium text-ink-700">4.9 out of 5</span>
          </div>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <RevealItem
              key={r.id}
              className="flex flex-col rounded-lg border border-beige bg-cream p-6"
            >
              <Quote size={20} className="text-gold-500" />
              <Rating value={r.rating} className="mt-4" />
              <h3 className="mt-3 text-sm font-semibold text-ink-900">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{r.body}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-ink-400">
                <span className="font-medium text-ink-700">{r.author}</span>
                {r.verified && <span>Verified Buyer</span>}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
