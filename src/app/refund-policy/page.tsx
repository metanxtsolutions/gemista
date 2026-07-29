import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PolicySection } from "@/components/ui/policy-content";

export const metadata: Metadata = {
  title: "Refund & Returns Policy",
  description: "Gemista's 15-day return and exchange policy, and how refunds are processed.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <div>
      <PageHeader title="Refund & Returns Policy" crumbs={[{ label: "Home", href: "/" }, { label: "Refund Policy" }]} />
      <div className="container-gem max-w-2xl py-10">
        <PolicySection title="15-Day Returns">
          <p>We accept returns and exchanges within 15 days of delivery, provided the item is unworn, undamaged and in its original packaging with tags attached.</p>
        </PolicySection>
        <PolicySection title="How to Start a Return">
          <p>Email hello@gemista.com with your order number and reason for return. We&apos;ll send you a prepaid return label and pickup instructions.</p>
        </PolicySection>
        <PolicySection title="Refund Timeline">
          <p>Once we receive and inspect your return, refunds are processed within 5–7 business days to your original payment method. COD orders are refunded via bank transfer or store credit.</p>
        </PolicySection>
        <PolicySection title="Non-Returnable Items">
          <p>For hygiene reasons, earrings that have been worn cannot be returned unless defective. Gift cards and final-sale items are non-refundable.</p>
        </PolicySection>
        <PolicySection title="Damaged or Incorrect Items">
          <p>If your order arrives damaged or incorrect, contact us within 48 hours of delivery with photos, and we&apos;ll arrange a free replacement or full refund.</p>
        </PolicySection>
      </div>
    </div>
  );
}
