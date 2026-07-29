import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchOverlay } from "@/components/layout/search-overlay";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://www.gemista.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gemista — Jewellery That Celebrates You",
    template: "%s | Gemista",
  },
  description:
    "Affordable luxury jewellery for everyday wear. Discover earrings, necklaces, bracelets and rings designed to celebrate every version of you.",
  keywords: [
    "Gemista",
    "fashion jewellery",
    "affordable luxury jewellery",
    "gold plated earrings",
    "necklaces online India",
    "jewellery gift sets",
  ],
  openGraph: {
    title: "Gemista — Jewellery That Celebrates You",
    description:
      "Affordable luxury jewellery designed for every moment, every outfit and every version of you.",
    url: siteUrl,
    siteName: "Gemista",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemista — Jewellery That Celebrates You",
    description: "Affordable luxury jewellery designed for everyday wear.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gemista",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description: "Affordable luxury fashion jewellery brand.",
              sameAs: [
                "https://instagram.com/gemista",
                "https://facebook.com/gemista",
              ],
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
        <Analytics />
      </body>
    </html>
  );
}
