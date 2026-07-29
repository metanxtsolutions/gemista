import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PolicySection } from "@/components/ui/policy-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using the Gemista website and purchasing Gemista products.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div>
      <PageHeader title="Terms of Service" crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <div className="container-gem max-w-2xl py-10">
        <PolicySection title="Use of Site">
          <p>By accessing gemista.com, you agree to use the site for lawful purposes only and not to engage in any activity that disrupts or interferes with its operation.</p>
        </PolicySection>
        <PolicySection title="Product Information">
          <p>We make every effort to display product colours and details accurately. Slight variations may occur due to screen settings and the handmade nature of some finishing processes.</p>
        </PolicySection>
        <PolicySection title="Pricing & Availability">
          <p>Prices are listed in INR (or your local currency where applicable) and are subject to change without notice. We reserve the right to limit quantities and refuse orders.</p>
        </PolicySection>
        <PolicySection title="Intellectual Property">
          <p>All content on this site, including designs, photography, logos and copy, is the property of Gemista and may not be reproduced without written permission.</p>
        </PolicySection>
        <PolicySection title="Limitation of Liability">
          <p>Gemista is not liable for indirect or incidental damages arising from the use of our products or website, to the extent permitted by law.</p>
        </PolicySection>
        <PolicySection title="Governing Law">
          <p>These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts of Mumbai.</p>
        </PolicySection>
      </div>
    </div>
  );
}
