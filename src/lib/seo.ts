import type { Metadata } from "next";
import { APP_NAME, OG_IMAGE, SITE_URL, SUPPORT_EMAIL } from "./site";

/** Metadata for an inner page: its own title, description, canonical and social tags. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  hreflang,
  alternates,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** hreflang code for a page written for one market, e.g. "en-GB". Leave out for the default pages. */
  hreflang?: string;
  /** The same page in other markets, by hreflang code, e.g. { "en-US": "/en-US/..." }. */
  alternates?: Record<string, string>;
}): Metadata {
  const fullTitle = `${title} | ${APP_NAME}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path, ...(hreflang && { languages: { [hreflang]: path, ...alternates } }) },
    openGraph: {
      type,
      url: path,
      siteName: APP_NAME,
      title: fullTitle,
      description,
      locale: hreflang ? hreflang.replace("-", "_") : "en_GB",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${APP_NAME} Overview screen showing disk usage on a Mac` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE] },
  };
}

/** Plain YYYY-MM-DD date as a full ISO 8601 datetime with a time zone, as schema.org dates expect. */
export function isoDateTime(date: string) {
  return `${date}T00:00:00+00:00`;
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
  language = "en",
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
  language?: string;
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
      inLanguage: language,
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

/** Article and FAQPage nodes for a guide, linked to the WebPage node that innerPageGraph adds. */
export function articleGraph({
  path,
  headline,
  description,
  published,
  updated,
  language,
  faqs,
}: {
  path: string;
  headline: string;
  description: string;
  published: string;
  updated: string;
  language: string;
  faqs: { q: string; a: string }[];
}) {
  const url = `${SITE_URL}${path}`;
  return [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline,
      description,
      image: OG_IMAGE,
      datePublished: isoDateTime(published),
      dateModified: isoDateTime(updated),
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      inLanguage: language,
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      isPartOf: { "@id": `${url}#webpage` },
      mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];
}
