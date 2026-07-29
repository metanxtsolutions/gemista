import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PolicySection } from "@/components/ui/policy-content";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Ring sizing, bracelet and necklace length guide for Gemista jewellery.",
  alternates: { canonical: "/size-guide" },
};

export default function SizeGuidePage() {
  return (
    <div>
      <PageHeader title="Size Guide" crumbs={[{ label: "Home", href: "/" }, { label: "Size Guide" }]} />
      <div className="container-gem max-w-2xl py-10">
        <PolicySection title="Ring Sizing">
          <p>Wrap a strip of paper around the base of your finger, mark where it overlaps, and measure the length in millimetres. Compare against a standard ring size chart, or visit a local jeweller for an exact measurement.</p>
          <p>Most Gemista rings are available in sizes 5–9. Adjustable rings fit most sizes automatically.</p>
        </PolicySection>
        <PolicySection title="Bracelet Length">
          <p>Measure your wrist with a flexible tape measure, then add 1–2 cm for a comfortable fit. Our bracelets typically range from 6–7.5 inches with an extender chain.</p>
        </PolicySection>
        <PolicySection title="Necklace Length">
          <ul className="list-disc space-y-1 pl-4">
            <li>14–16 in.: sits at the collarbone (choker length)</li>
            <li>16–18 in.: sits just below the collarbone (princess length)</li>
            <li>18–20 in.: sits at the chest (matinee length)</li>
          </ul>
          <p>Most Gemista necklaces include a 2 in. extender for flexible sizing.</p>
        </PolicySection>
      </div>
    </div>
  );
}
