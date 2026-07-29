import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { journalPosts } from "@/lib/data/journal";
import { photos } from "@/lib/data/photos";
import { Photo } from "@/components/media/photo";
import { PageHeader } from "@/components/ui/page-header";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${slug}` },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div>
      <PageHeader
        eyebrow={post.readTime}
        title={post.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: post.title },
        ]}
      />
      <div className="container-gem max-w-2xl py-6">
        <Photo photo={photos[post.photo]} className="aspect-[16/9] rounded-xl" priority sizes="800px" />
        <div className="mt-8 space-y-5 text-ink-700">
          {post.body.map((para, i) => (
            <p key={i} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
