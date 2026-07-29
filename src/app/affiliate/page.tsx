import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Percent, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate & Influencer Program",
  description: "Partner with Gemista and earn commission sharing jewellery you love with your audience.",
  alternates: { canonical: "/affiliate" },
};

const perks = [
  { icon: Percent, title: "Up to 15% commission", body: "Earn on every sale generated through your unique link or code." },
  { icon: Zap, title: "Early access", body: "Be first to shop and share new collections, before they go public." },
  { icon: Users, title: "Dedicated support", body: "A partnerships team on hand for content, assets and campaign ideas." },
];

export default function AffiliatePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Partner With Us"
        title="Affiliate & Influencer Program"
        description="Love Gemista? Turn that into an income stream by sharing it with your audience."
        crumbs={[{ label: "Home", href: "/" }, { label: "Affiliate Program" }]}
      />
      <div className="container-gem py-10">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {perks.map((p) => (
            <RevealItem key={p.title} className="rounded-lg border border-beige p-6">
              <p.icon size={20} className="text-gold-600" />
              <h3 className="mt-4 font-medium text-ink-900">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12">
          <Button size="lg" asChild>
            <a href="mailto:partnerships@gemista.com">Apply to Join</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
