import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PolicySection } from "@/components/ui/policy-content";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Gemista shipping timelines, costs and Cash on Delivery availability for India and international orders.",
  alternates: { canonical: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <div>
      <PageHeader title="Shipping Policy" crumbs={[{ label: "Home", href: "/" }, { label: "Shipping Policy" }]} />
      <div className="container-gem max-w-2xl py-10">
        <PolicySection title="Domestic Shipping (India)">
          <p>Free shipping on all orders above ₹999. Orders below ₹999 incur a flat ₹79 shipping fee.</p>
          <p>Standard delivery: 3–5 business days. Express delivery (select cities): 1–2 business days, available at checkout for an additional fee.</p>
        </PolicySection>
        <PolicySection title="Cash on Delivery">
          <p>COD is available on orders under ₹5,000 across serviceable pin codes, with a nominal COD handling fee.</p>
        </PolicySection>
        <PolicySection title="International Shipping">
          <p>We ship worldwide. Delivery typically takes 7–12 business days depending on destination. Shipping costs, duties and taxes are calculated at checkout and may vary by country.</p>
        </PolicySection>
        <PolicySection title="Order Processing">
          <p>Orders are processed within 1–2 business days. You&apos;ll receive a shipping confirmation email with tracking details once your order leaves our facility.</p>
        </PolicySection>
        <PolicySection title="Delays">
          <p>Occasionally, deliveries may be delayed due to weather, courier constraints, or high-demand periods (festive sales, launches). We&apos;ll keep you updated by email if this happens.</p>
        </PolicySection>
      </div>
    </div>
  );
}
