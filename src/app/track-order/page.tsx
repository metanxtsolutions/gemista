import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { TrackOrderForm } from "@/components/forms/track-order-form";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Track the status and delivery estimate of your Gemista order.",
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Order Status"
        title="Track Your Order"
        description="Enter your order number and email to see the latest status."
        crumbs={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
      />
      <div className="container-gem max-w-md py-10">
        <TrackOrderForm />
      </div>
    </div>
  );
}
