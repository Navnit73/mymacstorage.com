import type { MetadataRoute } from "next";
import { SITE_URL, pages } from "@/lib/site";

const abs = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  // The home page and the guide hub change whenever a page they link to does, so they take the newest date.
  const latest = pages.map((p) => p.updated).sort().at(-1);
  return [
    { url: SITE_URL, lastModified: latest },
    { url: abs("/guides"), lastModified: latest },
    ...pages.map(({ path, updated }) => ({ url: abs(path), lastModified: updated })),
  ];
}
