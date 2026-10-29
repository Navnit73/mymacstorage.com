import type { Metadata } from "next";
import { APP_NAME, OG_IMAGE, SITE_URL, SUPPORT_EMAIL } from "./site";

/** Metadata for an inner page: its own title, description, canonical and social tags. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = `${title} | ${APP_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: APP_NAME,
      title: fullTitle,
      description,
      locale: "en_GB",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${APP_NAME} Overview screen showing disk usage on a Mac` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE] },
  };
}

export const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: APP_NAME,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const organizationNode = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: APP_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: SUPPORT_EMAIL,
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SUPPORT_EMAIL },
};

/** WebPage plus BreadcrumbList for an inner page, linked to the site-wide nodes. */
export function innerPageGraph({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  const url = `${SITE_URL}${path}`;
  return [
    websiteNode,
    organizationNode,
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
  ];
}
