import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { journalPosts } from "@/lib/data/journal";
import { photos } from "@/lib/data/photos";
import { Photo } from "@/components/media/photo";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Styling guides, jewellery care tips and stories from Gemista.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Gemista Journal"
        title="Styling Stories"
        description="Guides, tips and inspiration for wearing jewellery every day."
        crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
      />

      <div className="container-gem py-10">
        <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {journalPosts.map((post) => (
            <RevealItem key={post.slug}>
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Photo
                    photo={photos[post.photo]}
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 30vw, 90vw"
                  />
                </div>
                <p className="mt-4 text-xs text-ink-400">{post.readTime}</p>
                <h2 className="mt-1 font-display text-lg text-ink-900">{post.title}</h2>
                <p className="mt-1.5 text-sm text-ink-500">{post.excerpt}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
