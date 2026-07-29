import { Quote } from "lucide-react";
import { Product } from "@/lib/data/types";
import { reviews as allReviews } from "@/lib/data/reviews";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";

const breakdown = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export function ProductReviews({ product }: { product: Product }) {
  const productReviews = allReviews.filter((r) => r.productSlug === product.slug);
  const list = productReviews.length ? productReviews : allReviews.slice(0, 3);

  return (
    <section id="reviews" className="scroll-mt-24 border-t border-beige py-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
        <div>
          <h2 className="font-display text-2xl text-ink-900">Reviews</h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-3xl font-semibold text-ink-900">{product.rating.toFixed(1)}</span>
            <div>
              <Rating value={product.rating} size={15} />
              <p className="mt-0.5 text-xs text-ink-500">{product.reviewCount} reviews</p>
            </div>
          </div>

          <div className="mt-6 space-y-1.5">
            {breakdown.map((b) => (
              <div key={b.stars} className="flex items-center gap-2 text-xs text-ink-500">
                <span className="w-2.5">{b.stars}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-beige">
                  <div className="h-full rounded-full bg-gold-500" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="w-8 text-right">{b.pct}%</span>
              </div>
            ))}
          </div>

          <Button variant="secondary" size="sm" className="mt-6">
            Write a Review
          </Button>
        </div>

        <div className="space-y-5">
          {list.map((r) => (
            <div key={r.id} className="rounded-lg border border-beige p-5">
              <Quote size={16} className="text-gold-500" />
              <Rating value={r.rating} className="mt-3" />
              <h3 className="mt-2 text-sm font-semibold text-ink-900">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{r.body}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-ink-400">
                <span className="font-medium text-ink-700">{r.author}</span>
                {r.verified && <span>Verified Buyer</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
