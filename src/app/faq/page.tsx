import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { FaqAccordion } from "@/components/faq/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Gemista orders, shipping, returns, materials and sizing.",
  alternates: { canonical: "/faq" },
};

export const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery within India takes 3–5 business days. Express delivery is available at checkout. International orders take 7–12 business days." },
      { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available on orders under ₹5,000 across India." },
      { q: "Do you ship internationally?", a: "Yes, we ship worldwide. Shipping costs and delivery times are calculated at checkout based on your location." },
      { q: "How can I track my order?", a: "You'll receive a tracking link by email and SMS once your order ships. You can also check status on our Track Order page." },
    ],
  },
  {
    category: "Product & Materials",
    items: [
      { q: "Is Gemista jewellery hypoallergenic?", a: "Yes, every piece uses nickel-free, hypoallergenic materials such as titanium steel and tested plating, safe for sensitive skin." },
      { q: "Will the plating fade?", a: "Our plating is tarnish-resistant and built for daily wear, but like all plated jewellery it will wear over time with heavy use. Following our care guide extends its life significantly." },
      { q: "Do you sell real gold or diamonds?", a: "Gemista specialises in fashion jewellery: 18K gold plating, sterling silver, cubic zirconia and genuine freshwater pearls, not fine gold or diamonds." },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We offer 15-day free returns and exchanges on unworn items in original packaging." },
      { q: "How do refunds work?", a: "Refunds are processed within 5–7 business days of us receiving your returned item, to your original payment method." },
      { q: "Can I exchange for a different size or finish?", a: "Yes, exchanges are free within 15 days, subject to availability." },
    ],
  },
];

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHeader
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        description="Everything you need to know about shopping with Gemista."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <div className="container-gem max-w-3xl py-10">
        <FaqAccordion sections={faqs} />
      </div>
    </div>
  );
}
