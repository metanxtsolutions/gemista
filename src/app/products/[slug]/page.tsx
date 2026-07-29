import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/data/products";
import { photos, categoryGallery } from "@/lib/data/photos";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { TrackView } from "@/components/product/track-view";
import { StickyAddToCart } from "@/components/product/sticky-add-to-cart";
import { categories } from "@/lib/data/categories";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${product.name} | Gemista`,
      description: product.description,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category);
  const gallery = (categoryGallery[product.category] ?? ["earringsModel"]).map((k) => photos[k]);

  const completeTheLook = products
    .filter(
      (p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)),
    )
    .slice(0, 4);

  const youMayAlsoLike = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: category?.name,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this piece skin-friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, every Gemista piece uses hypoallergenic, nickel-free materials safe for sensitive skin.",
        },
      },
      {
        "@type": "Question",
        name: "How long does delivery take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard delivery within India takes 3–5 business days. Cash on delivery is available on orders under ₹5,000.",
        },
      },
      {
        "@type": "Question",
        name: "Can I return this if it's not right for me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, unworn items in original packaging can be returned or exchanged within 15 days of delivery.",
        },
      },
    ],
  };

  return (
    <div className="container-gem py-8 sm:py-12">
      <TrackView slug={product.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: category?.name ?? "Shop", href: `/collections/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={gallery} name={product.name} />
        <div>
          <ProductInfo product={product} />
          <ProductAccordion product={product} />
        </div>
      </div>

      <ProductReviews product={product} />
      <RelatedProducts title="Complete The Look" products={completeTheLook} />
      <RelatedProducts title="You May Also Like" products={youMayAlsoLike} />
      <RecentlyViewed excludeSlug={product.slug} />

      <StickyAddToCart product={product} />

      <p className="sr-only">
        {product.name}, {formatPrice(product.price)}. {product.description}
      </p>
    </div>
  );
}
