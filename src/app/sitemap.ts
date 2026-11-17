import type { MetadataRoute } from "next";
import { GUIDES, SITE_URL, guidePath, pages, type GuideKey } from "@/lib/site";

const abs = (path: string) => `${SITE_URL}${path}`;

// The US and UK versions of a guide, so the sitemap carries the same hreflang pairs as the pages.
const alternatesByPath = new Map<string, { languages: Record<string, string> }>();
for (const key of Object.keys(GUIDES) as GuideKey[]) {
  const languages = { "en-US": abs(guidePath("us", key)), "en-GB": abs(guidePath("uk", key)), "x-default": abs(guidePath("us", key)) };
  alternatesByPath.set(guidePath("us", key), { languages });
  alternatesByPath.set(guidePath("uk", key), { languages });
}

export default function sitemap(): MetadataRoute.Sitemap {
  // The home page changes whenever any other page does, so it takes the newest date.
  const latest = pages.map((p) => p.updated).sort().at(-1);
  return [
    { url: SITE_URL, lastModified: latest },
    { url: abs("/guides"), lastModified: pages.filter((p) => p.group === "Guides").map((p) => p.updated).sort().at(-1) },
    ...pages.map(({ path, updated }) => ({
      url: abs(path),
      lastModified: updated,
      alternates: alternatesByPath.get(path),
    })),
  ];
}
