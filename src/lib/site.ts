export const SITE_URL = "https://mymacstorage.com";
export const APP_NAME = "MyMacStorage";
/** The USD price, used wherever it must be static text (metadata, structured data). Pages show <Price /> instead. */
export const PRICE = "$14.99";
/** Price without the currency symbol, for structured data. */
export const PRICE_VALUE = PRICE.replace("$", "");
export const SUPPORT_EMAIL = "support@mymacstorage.com";
export const REFUND_DAYS = 7;
/** The fixed GBP price shown on the UK pages in src/app/en-GB. */
export const UK_PRICE = "£14.99";
/** Every Buy and Download button reads this. The route starts a Dodo checkout session. */
export const CHECKOUT_URL = "/api/checkout";

export const SITE_TITLE = "Mac Disk Cleanup: Free Up Storage Space Safely | MyMacStorage";
export const SITE_DESCRIPTION =
  "Mac storage full? Free up gigabytes in minutes. One scan finds caches, duplicates and app leftovers, and everything goes to the Trash, so it's undoable.";

export const OG_IMAGE =
  "https://res.cloudinary.com/dipzpwbbk/image/upload/c_crop,x_0,y_0,w_2460,h_1633/c_fill,g_north,w_1200,h_630/v1793287028/overview_lfyfha.jpg";

export const GUIDE_PATH = "/guides/how-to-free-up-space-on-mac";
export const SYSTEM_DATA_GUIDE_PATH = "/guides/how-to-reduce-system-data-on-mac";
export const LARGE_FILES_GUIDE_PATH = "/guides/how-to-find-large-files-on-mac";
export const DUPLICATES_GUIDE_PATH = "/guides/how-to-find-duplicate-files-on-mac";
export const CACHE_GUIDE_PATH = "/guides/how-to-clear-cache-on-mac";
export const SAFARI_CACHE_GUIDE_PATH = "/guides/how-to-clear-safari-cache-on-mac";
export const COOKIES_GUIDE_PATH = "/guides/how-to-clear-cookies-on-mac";
export const AIR_CACHE_GUIDE_PATH = "/guides/how-to-clear-cache-on-macbook-air";
export const PRO_CACHE_GUIDE_PATH = "/guides/how-to-clear-cache-on-macbook-pro";

/** UK-only pages live under /en-GB. Each one is its own folder in src/app/en-GB. */
export const UK_CLEANER_PATH = "/en-GB/mac-disk-space-cleaner";
export const UK_SYSTEM_DATA_PATH = "/en-GB/macbook-system-data-too-large";
/** US pages live under /en-US, one folder each in src/app/en-US. */
export const US_CLEANER_APP_PATH = "/en-US/mac-cleaner-for-mac";

/** The two English markets. Each guide below exists once per market, as its own page in src/app/en-US or src/app/en-GB. */
export type MarketKey = "us" | "uk";
export const MARKETS = {
  us: { hreflang: "en-US", dir: "en-US", price: PRICE, cleanerPath: US_CLEANER_APP_PATH, cleanerLabel: "How to choose the best Mac cleaner app" },
  uk: { hreflang: "en-GB", dir: "en-GB", price: UK_PRICE, cleanerPath: UK_CLEANER_PATH, cleanerLabel: "How to free up space on Mac" },
};

/** The market guides: one folder per market, so a slug may differ by spelling. `label` is the sitemap and link text. */
export const GUIDES = {
  appCleaner: { us: "app-cleaner-for-mac", uk: "app-cleaner-for-mac", label: "App cleaner for Mac" },
  cleanMyMacAlternative: { us: "cleanmymac-alternative", uk: "cleanmymac-alternative", label: "CleanMyMac alternatives" },
  clearRam: { us: "how-to-clear-ram-on-mac", uk: "how-to-clear-ram-on-mac", label: "How to clear RAM on Mac" },
  diskAnalyzer: { us: "mac-disk-space-analyzer", uk: "mac-disk-space-analyser", label: "Mac disk space analyzer" },
} as const;
export type GuideKey = keyof typeof GUIDES;

export const guidePath = (market: MarketKey, key: GuideKey) => `/${MARKETS[market].dir}/${GUIDES[key][market]}`;

/** hreflang entries for the same guide in the other market, plus x-default (the US page). The page itself is added by pageMetadata. */
export function guideAlternates(market: MarketKey, key: GuideKey) {
  const other: MarketKey = market === "us" ? "uk" : "us";
  return { [MARKETS[other].hreflang]: guidePath(other, key), "x-default": guidePath("us", key) };
}

/** The four market guides as page entries. The footer column is "US guides" or "UK guides". */
function marketGuides(market: MarketKey) {
  return (Object.keys(GUIDES) as GuideKey[]).map((key) => ({
    path: guidePath(market, key),
    label: market === "uk" ? GUIDES[key].label.replace("analyzer", "analyser") : GUIDES[key].label,
    group: `${market.toUpperCase()} guides`,
    updated: "2026-11-01",
  }));
}

/** Public pages other than the home page, in sitemap and footer order. `group` is the footer column. */
export const pages: { path: string; label: string; group: string; updated: string }[] = [
  { path: GUIDE_PATH, label: "Free up space", group: "Guides", updated: "2026-10-30" },
  { path: SYSTEM_DATA_GUIDE_PATH, label: "Reduce System Data", group: "Guides", updated: "2026-10-30" },
  { path: LARGE_FILES_GUIDE_PATH, label: "Find large files", group: "Guides", updated: "2026-10-30" },
  { path: DUPLICATES_GUIDE_PATH, label: "Find duplicate files", group: "Guides", updated: "2026-10-30" },
  { path: CACHE_GUIDE_PATH, label: "Clear cache", group: "Guides", updated: "2026-10-30" },
  { path: SAFARI_CACHE_GUIDE_PATH, label: "Clear Safari cache", group: "Guides", updated: "2026-10-30" },
  { path: COOKIES_GUIDE_PATH, label: "Clear cookies", group: "Guides", updated: "2026-10-30" },
  { path: AIR_CACHE_GUIDE_PATH, label: "Clear cache on MacBook Air", group: "Guides", updated: "2026-10-30" },
  { path: PRO_CACHE_GUIDE_PATH, label: "Clear cache on MacBook Pro", group: "Guides", updated: "2026-10-30" },
  { path: US_CLEANER_APP_PATH, label: "Best Mac cleaner app", group: "US guides", updated: "2026-11-01" },
  ...marketGuides("us"),
  { path: UK_CLEANER_PATH, label: "Free up space on Mac", group: "UK guides", updated: "2026-11-01" },
  { path: UK_SYSTEM_DATA_PATH, label: "System Data on MacBook", group: "UK guides", updated: "2026-11-01" },
  ...marketGuides("uk"),
  { path: "/about", label: "About", group: "Company", updated: "2026-10-29" },
  { path: "/contact", label: "Contact", group: "Company", updated: "2026-10-29" },
  { path: "/privacy", label: "Privacy", group: "Legal", updated: "2026-10-30" },
  { path: "/terms", label: "Terms", group: "Legal", updated: "2026-10-29" },
  { path: "/refund-policy", label: "Refunds", group: "Legal", updated: "2026-10-29" },
];
