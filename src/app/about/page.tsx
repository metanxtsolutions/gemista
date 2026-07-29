import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Photo } from "@/components/media/photo";
import { photos } from "@/lib/data/photos";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { whyGemista } from "@/lib/data/misc";
import { Newsletter } from "@/components/home/newsletter";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Gemista makes beautiful, affordable jewellery for everyday life. Learn about our mission, materials and why we believe jewellery shouldn't wait for a special occasion.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About Gemista"
        title="Wear Your Story"
        description="Jewellery shouldn't wait for a special occasion. We believe confidence belongs to every day."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <div className="container-gem py-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold-600">Our Story</p>
            <h2 className="mt-2 font-display text-3xl text-ink-900">
              Gemista was born from a simple belief
            </h2>
            <div className="mt-4 space-y-4 text-ink-600">
              <p>
                We saw a world where beautiful jewellery often came with a steep price tag, or
                was reserved only for celebrations. We wanted to change that.
              </p>
              <p>
                Gemista brings together modern design, premium craftsmanship and accessible
                pricing to make elegant jewellery part of everyday life, for the woman
                dressing for a Tuesday meeting just as much as the one dressing for a wedding.
              </p>
              <p>
                Whether you&apos;re celebrating a milestone, expressing your individuality,
                gifting someone special, or simply treating yourself, every Gemista piece is
                designed to become part of your story.
              </p>
              <p className="font-medium text-ink-900">
                Because confidence isn&apos;t reserved for special moments. It belongs to every
                day.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Photo photo={photos.neckJewelry} className="aspect-[4/5] rounded-xl" sizes="(min-width:1024px) 45vw, 100vw" />
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <Reveal>
            <p className="eyebrow text-gold-600">Our Mission</p>
            <p className="mt-2 text-ink-700">
              To offer beautifully designed, affordable jewellery that empowers people to
              express themselves every day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-gold-600">Our Vision</p>
            <p className="mt-2 text-ink-700">
              To become India&apos;s most-loved modern jewellery brand, and in time, a
              globally recognised jewellery lifestyle label.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="eyebrow text-gold-600">Our Promise</p>
            <p className="mt-2 text-ink-700">
              Every piece is thoughtfully selected to help you look beautiful, feel confident,
              and celebrate yourself, every single day.
            </p>
          </Reveal>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-display text-3xl text-ink-900">Why Gemista</h2>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyGemista.map((item) => (
              <RevealItem key={item.title} className="rounded-lg border border-beige p-6">
                <h3 className="font-medium text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
