import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { press } from "@/lib/data/misc";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Press",
  description: "Gemista in the press, plus media and partnership enquiries.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Media"
        title="Press"
        description="Editorial mentions and media resources for Gemista."
        crumbs={[{ label: "Home", href: "/" }, { label: "Press" }]}
      />

      <div className="container-gem py-10">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {press.map((p) => (
            <RevealItem key={p.name} className="rounded-lg border border-beige p-6">
              <p className="font-display text-lg italic text-ink-900">&ldquo;{p.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-medium text-gold-600">{p.name}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 flex flex-col items-start gap-3 rounded-lg bg-ivory p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gold-600" />
            <div>
              <p className="font-medium text-ink-900">For media & press enquiries</p>
              <p className="text-sm text-ink-500">press@gemista.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
