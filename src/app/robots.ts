import type { MetadataRoute } from "next";

const siteUrl = "https://www.gemista.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/account", "/cart", "/internal"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
