import { Product } from "@/lib/data/types";
import { ProductCard } from "./product-card";

export function RelatedProducts({ title, products }: { title: string; products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="border-t border-beige py-14">
      <h2 className="font-display text-2xl text-ink-900">{title}</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
