import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveCollection, allCollectionSlugs } from "@/lib/collection-resolver";
import { photos } from "@/lib/data/photos";
import { Photo } from "@/components/media/photo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CollectionGrid } from "@/components/collection/collection-grid";

export function generateStaticParams() {
  return allCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = resolveCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: {
      title: `${collection.title} | Gemista`,
      description: collection.description,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = resolveCollection(slug);
  if (!collection) notFound();

  return (
    <div>
      <section className="relative flex h-[38vh] min-h-[280px] items-end overflow-hidden bg-ink-900">
        <Photo
          photo={photos[collection.photo]}
          className="absolute inset-0"
          imgClassName="opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />
        <div className="container-gem relative z-10 pb-8">
          <Breadcrumbs
            invert
            items={[
              { label: "Home", href: "/" },
              { label: "Collections", href: "/collections" },
              { label: collection.title },
            ]}
          />
          <h1 className="mt-3 font-display text-3xl text-cream sm:text-5xl">{collection.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-200 sm:text-base">{collection.description}</p>
        </div>
      </section>

      <div className="container-gem py-12 sm:py-16">
        <CollectionGrid products={collection.products} />
      </div>
    </div>
  );
}
