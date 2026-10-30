export const SITE_URL = "https://mymacstorage.com";
export const APP_NAME = "MyMacStorage";
export const PRICE = "$19.99";
/** Price without the currency symbol, for structured data. */
export const PRICE_VALUE = PRICE.replace("$", "");
export const SUPPORT_EMAIL = "support@mymacstorage.com";
export const REFUND_DAYS = 14;
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

/** Public pages other than the home page, in sitemap and footer order. `group` is the footer column. */
export const pages = [
  { path: GUIDE_PATH, label: "Free up space", group: "Guides", updated: "2026-10-30" },
  { path: SYSTEM_DATA_GUIDE_PATH, label: "Reduce System Data", group: "Guides", updated: "2026-10-30" },
  { path: LARGE_FILES_GUIDE_PATH, label: "Find large files", group: "Guides", updated: "2026-10-30" },
  { path: DUPLICATES_GUIDE_PATH, label: "Find duplicate files", group: "Guides", updated: "2026-10-30" },
  { path: CACHE_GUIDE_PATH, label: "Clear cache", group: "Guides", updated: "2026-10-30" },
  { path: SAFARI_CACHE_GUIDE_PATH, label: "Clear Safari cache", group: "Guides", updated: "2026-10-30" },
  { path: COOKIES_GUIDE_PATH, label: "Clear cookies", group: "Guides", updated: "2026-10-30" },
  { path: AIR_CACHE_GUIDE_PATH, label: "Clear cache on MacBook Air", group: "Guides", updated: "2026-10-30" },
  { path: PRO_CACHE_GUIDE_PATH, label: "Clear cache on MacBook Pro", group: "Guides", updated: "2026-10-30" },
  { path: "/about", label: "About", group: "Company", updated: "2026-10-29" },
  { path: "/contact", label: "Contact", group: "Company", updated: "2026-10-29" },
  { path: "/privacy", label: "Privacy", group: "Legal", updated: "2026-10-30" },
  { path: "/terms", label: "Terms", group: "Legal", updated: "2026-10-29" },
  { path: "/refund-policy", label: "Refunds", group: "Legal", updated: "2026-10-29" },
];
