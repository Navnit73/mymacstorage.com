import type { MetadataRoute } from "next";
import { SITE_URL, pages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...pages.map(({ path, updated }) => ({ url: `${SITE_URL}${path}`, lastModified: updated })),
  ];
}
