import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Gemista team for order support, wholesale enquiries or press.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="We'd Love To Hear From You"
        title="Contact Us"
        description="Have a question about your order, a product, or a partnership? Reach out."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <div className="container-gem grid grid-cols-1 gap-14 py-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-8">
          <div className="flex gap-4">
            <Mail size={20} className="mt-0.5 shrink-0 text-gold-600" />
            <div>
              <h3 className="font-medium text-ink-900">Email</h3>
              <p className="mt-1 text-sm text-ink-500">hello@gemista.com</p>
              <p className="text-sm text-ink-500">We reply within 24 hours.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone size={20} className="mt-0.5 shrink-0 text-gold-600" />
            <div>
              <h3 className="font-medium text-ink-900">Phone</h3>
              <p className="mt-1 text-sm text-ink-500">+91 98765 43210</p>
              <p className="text-sm text-ink-500">Mon–Sat, 10am–7pm IST</p>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin size={20} className="mt-0.5 shrink-0 text-gold-600" />
            <div>
              <h3 className="font-medium text-ink-900">Studio</h3>
              <p className="mt-1 text-sm text-ink-500">Gemista House, Mumbai, India</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
