import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/icons/social";
import { Newsletter } from "@/components/home/newsletter";

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "Earrings", href: "/collections/earrings" },
      { label: "Necklaces", href: "/collections/necklaces" },
      { label: "Bracelets", href: "/collections/bracelets" },
      { label: "Rings", href: "/collections/rings" },
      { label: "Jewellery Sets", href: "/collections/jewellery-sets" },
      { label: "Sale", href: "/collections/sale" },
    ],
  },
  {
    heading: "Gemista",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Materials & Craftsmanship", href: "/craftsmanship" },
      { label: "Jewellery Care", href: "/jewellery-care" },
      { label: "Gift Guide", href: "/gift-guide" },
      { label: "Journal", href: "/journal" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Track Order", href: "/track-order" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Refund & Returns", href: "/refund-policy" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "Rewards & Referrals", href: "/rewards" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-beige bg-ivory">
      <div className="container-gem py-16">
        <Newsletter compact />

        <div className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="eyebrow text-ink-900">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-beige-dark pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="font-display text-xl text-ink-900">Gemista</span>
            <span className="hidden text-xs text-ink-400 sm:inline">
              Jewellery That Celebrates You.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-ink-500 hover:text-ink-900">
              <InstagramIcon width={18} height={18} />
            </a>
            <a href="#" aria-label="Facebook" className="text-ink-500 hover:text-ink-900">
              <FacebookIcon width={18} height={18} />
            </a>
            <a href="#" aria-label="YouTube" className="text-ink-500 hover:text-ink-900">
              <YoutubeIcon width={18} height={18} />
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium text-ink-400">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>COD</span>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-ink-400">
          © {new Date().getFullYear()} Gemista. All rights reserved. Worldwide shipping available.
        </p>
      </div>
    </footer>
  );
}
