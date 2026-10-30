import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers following Buy buttons would otherwise open a checkout session on every visit.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/checkout/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
