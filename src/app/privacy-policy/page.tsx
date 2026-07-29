import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PolicySection } from "@/components/ui/policy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Gemista collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader title="Privacy Policy" crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <div className="container-gem max-w-2xl py-10">
        <PolicySection title="Information We Collect">
          <p>We collect information you provide directly, such as name, email, shipping address, phone number and payment details, as well as browsing data such as pages visited and items viewed, to improve your shopping experience.</p>
        </PolicySection>
        <PolicySection title="How We Use Your Information">
          <p>We use your data to process orders, provide customer support, personalise recommendations, send marketing communications (with your consent), and improve our website and services.</p>
        </PolicySection>
        <PolicySection title="Payment Security">
          <p>All payments are processed through PCI-DSS compliant payment gateways. Gemista does not store your full card details on our servers.</p>
        </PolicySection>
        <PolicySection title="Cookies">
          <p>We use cookies to remember your cart, preferences and login state, and to understand how visitors use our site. You can control cookies through your browser settings.</p>
        </PolicySection>
        <PolicySection title="Your Rights">
          <p>You may request access to, correction of, or deletion of your personal data at any time by emailing privacy@gemista.com.</p>
        </PolicySection>
        <PolicySection title="Third-Party Sharing">
          <p>We share data only with trusted service providers (payment processors, shipping partners, analytics tools) necessary to operate our business, and never sell your personal information.</p>
        </PolicySection>
      </div>
    </div>
  );
}
