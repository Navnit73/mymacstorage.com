export const SITE_URL = "https://mymacstorage.com";
export const APP_NAME = "MyMacStorage";
/** The USD price, used wherever it must be static text (metadata, structured data). Pages show <Price /> instead. */
export const PRICE = "$14.99";
/** Price without the currency symbol, for structured data. */
export const PRICE_VALUE = PRICE.replace("$", "");
export const SUPPORT_EMAIL = "support@mymacstorage.com";
export const REFUND_DAYS = 7;
/** Every Buy and Download button reads this. The route starts a Dodo checkout session. */
export const CHECKOUT_URL = "/api/checkout";

export const SITE_TITLE = "Mac Storage Cleaner: Safe Disk Cleanup App | MyMacStorage";
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
export const PURGEABLE_GUIDE_PATH = "/guides/how-to-clear-purgeable-space-on-mac";
export const UPDATE_SPACE_GUIDE_PATH = "/guides/not-enough-space-to-update-mac";
export const IPHONE_BACKUPS_GUIDE_PATH = "/guides/how-to-delete-iphone-backups-on-mac";
export const XCODE_SPACE_GUIDE_PATH = "/guides/xcode-taking-up-too-much-space";

/** Commercial pages: one URL each, no locale prefix. The old /en-US and /en-GB copies 301 here (see next.config.ts). */
export const BEST_CLEANER_PATH = "/best-mac-cleaner";
export const APP_CLEANER_PATH = "/app-cleaner-for-mac";
export const CLEANMYMAC_ALT_PATH = "/cleanmymac-alternative";
export const DISK_ANALYZER_PATH = "/mac-disk-space-analyzer";
export const CLEAR_RAM_GUIDE_PATH = "/guides/how-to-clear-ram-on-mac";
export const DAISYDISK_ALT_PATH = "/daisydisk-alternative";
export const IS_CLEANMYMAC_SAFE_PATH = "/is-cleanmymac-safe";
export const IS_MACKEEPER_SAFE_PATH = "/is-mackeeper-safe";
export const VS_CLEANMYMAC_PATH = "/mymacstorage-vs-cleanmymac";

/** Guides added in November 2026. */
export const CHECK_STORAGE_GUIDE_PATH = "/guides/how-to-check-storage-on-mac";
export const MACOS_STORAGE_GUIDE_PATH = "/guides/macos-taking-up-too-much-storage";
export const SNAPSHOTS_GUIDE_PATH = "/guides/how-to-delete-time-machine-snapshots";
export const DOCKER_GUIDE_PATH = "/guides/docker-taking-up-space-on-mac";
export const CHROME_CACHE_GUIDE_PATH = "/guides/how-to-clear-chrome-cache-on-mac";
export const FIREFOX_CACHE_GUIDE_PATH = "/guides/how-to-clear-firefox-cache-on-mac";
export const PHOTOS_GUIDE_PATH = "/guides/how-to-reduce-photos-library-size-on-mac";
export const MESSAGES_GUIDE_PATH = "/guides/how-to-clear-messages-storage-on-mac";
export const MAIL_GUIDE_PATH = "/guides/how-to-reduce-mail-storage-on-mac";
export const EMPTY_TRASH_GUIDE_PATH = "/guides/how-to-empty-trash-on-mac";
export const INSTALLERS_GUIDE_PATH = "/guides/how-to-delete-old-macos-installers";
export const EXTERNAL_DRIVE_GUIDE_PATH = "/guides/how-to-move-files-to-external-drive-on-mac";
export const ICLOUD_GUIDE_PATH = "/guides/icloud-drive-taking-up-space-on-mac";
export const DOWNLOADS_GUIDE_PATH = "/guides/how-to-clear-downloads-on-mac";
export const HOMEBREW_GUIDE_PATH = "/guides/how-to-clear-homebrew-cache-on-mac";
export const SPOTIFY_CACHE_GUIDE_PATH = "/guides/how-to-clear-spotify-cache-on-mac";
export const TEAMS_CACHE_GUIDE_PATH = "/guides/how-to-clear-teams-cache-on-mac";
export const DNS_CACHE_GUIDE_PATH = "/guides/how-to-clear-dns-cache-on-mac";
export const SPEED_UP_GUIDE_PATH = "/guides/how-to-speed-up-a-slow-mac";
export const HOW_MUCH_STORAGE_GUIDE_PATH = "/guides/how-much-storage-do-i-need-on-a-mac";
export const DOCUMENTS_GUIDE_PATH = "/guides/how-to-reduce-documents-storage-on-mac";

/** Kept so older pages can still pass market="us". The site has one English version; there is no UK copy any more. */
export type MarketKey = "us";
export const MARKETS = {
  us: { hreflang: "en-US", price: PRICE, cleanerPath: BEST_CLEANER_PATH, cleanerLabel: "How to choose the best Mac cleaner app" },
};

/** The pages that used to exist once per market. `path` is now their only URL. */
export const GUIDES = {
  appCleaner: { path: APP_CLEANER_PATH, label: "App cleaner for Mac" },
  cleanMyMacAlternative: { path: CLEANMYMAC_ALT_PATH, label: "CleanMyMac alternatives" },
  clearRam: { path: CLEAR_RAM_GUIDE_PATH, label: "How to clear RAM on Mac" },
  diskAnalyzer: { path: DISK_ANALYZER_PATH, label: "Mac disk space analyzer" },
} as const;
export type GuideKey = keyof typeof GUIDES;

export const guidePath = (_market: MarketKey, key: GuideKey) => GUIDES[key].path;

/**
 * Public pages other than the home page, in sitemap and footer order. `group` is the footer column and the
 * section on /guides. `updated` drives sitemap lastmod, so only change it when the page content really changes.
 */
export const pages: { path: string; label: string; group: string; updated: string }[] = [
  { path: GUIDE_PATH, label: "Free up space", group: "Guides", updated: "2026-11-24" },
  { path: SYSTEM_DATA_GUIDE_PATH, label: "Reduce System Data", group: "Guides", updated: "2026-11-24" },
  { path: CHECK_STORAGE_GUIDE_PATH, label: "Check storage on Mac", group: "Guides", updated: "2026-11-24" },
  { path: MACOS_STORAGE_GUIDE_PATH, label: "macOS storage too big", group: "Guides", updated: "2026-11-24" },
  { path: LARGE_FILES_GUIDE_PATH, label: "Find large files", group: "Guides", updated: "2026-10-30" },
  { path: DUPLICATES_GUIDE_PATH, label: "Find duplicate files", group: "Guides", updated: "2026-10-30" },
  { path: PURGEABLE_GUIDE_PATH, label: "Clear purgeable space", group: "Guides", updated: "2026-11-13" },
  { path: SNAPSHOTS_GUIDE_PATH, label: "Delete Time Machine snapshots", group: "Guides", updated: "2026-11-24" },
  { path: UPDATE_SPACE_GUIDE_PATH, label: "Not enough space to update", group: "Guides", updated: "2026-11-13" },
  { path: INSTALLERS_GUIDE_PATH, label: "Delete old macOS installers", group: "Guides", updated: "2026-11-24" },
  { path: DOCUMENTS_GUIDE_PATH, label: "Reduce Documents storage", group: "Guides", updated: "2026-11-24" },
  { path: DOWNLOADS_GUIDE_PATH, label: "Clear Downloads", group: "Guides", updated: "2026-11-24" },
  { path: EMPTY_TRASH_GUIDE_PATH, label: "Empty the Trash", group: "Guides", updated: "2026-11-24" },
  { path: PHOTOS_GUIDE_PATH, label: "Shrink Photos library", group: "Guides", updated: "2026-11-24" },
  { path: MESSAGES_GUIDE_PATH, label: "Clear Messages storage", group: "Guides", updated: "2026-11-24" },
  { path: MAIL_GUIDE_PATH, label: "Reduce Mail storage", group: "Guides", updated: "2026-11-24" },
  { path: IPHONE_BACKUPS_GUIDE_PATH, label: "Delete iPhone backups", group: "Guides", updated: "2026-11-13" },
  { path: ICLOUD_GUIDE_PATH, label: "iCloud Drive using space", group: "Guides", updated: "2026-11-24" },
  { path: EXTERNAL_DRIVE_GUIDE_PATH, label: "Move files to an external drive", group: "Guides", updated: "2026-11-24" },
  { path: HOW_MUCH_STORAGE_GUIDE_PATH, label: "How much storage you need", group: "Guides", updated: "2026-11-24" },
  { path: SPEED_UP_GUIDE_PATH, label: "Speed up a slow Mac", group: "Guides", updated: "2026-11-24" },
  { path: CLEAR_RAM_GUIDE_PATH, label: "Clear RAM", group: "Guides", updated: "2026-11-24" },
  { path: CACHE_GUIDE_PATH, label: "Clear cache", group: "Caches", updated: "2026-11-24" },
  { path: SAFARI_CACHE_GUIDE_PATH, label: "Clear Safari cache", group: "Caches", updated: "2026-10-30" },
  { path: CHROME_CACHE_GUIDE_PATH, label: "Clear Chrome cache", group: "Caches", updated: "2026-11-24" },
  { path: FIREFOX_CACHE_GUIDE_PATH, label: "Clear Firefox cache", group: "Caches", updated: "2026-11-24" },
  { path: COOKIES_GUIDE_PATH, label: "Clear cookies", group: "Caches", updated: "2026-10-30" },
  { path: DNS_CACHE_GUIDE_PATH, label: "Flush DNS cache", group: "Caches", updated: "2026-11-24" },
  { path: SPOTIFY_CACHE_GUIDE_PATH, label: "Clear Spotify cache", group: "Caches", updated: "2026-11-24" },
  { path: TEAMS_CACHE_GUIDE_PATH, label: "Clear Teams cache", group: "Caches", updated: "2026-11-24" },
  { path: AIR_CACHE_GUIDE_PATH, label: "Clear cache on MacBook Air", group: "Caches", updated: "2026-10-30" },
  { path: PRO_CACHE_GUIDE_PATH, label: "Clear cache on MacBook Pro", group: "Caches", updated: "2026-10-30" },
  { path: XCODE_SPACE_GUIDE_PATH, label: "Xcode taking up space", group: "Developers", updated: "2026-11-13" },
  { path: DOCKER_GUIDE_PATH, label: "Docker taking up space", group: "Developers", updated: "2026-11-24" },
  { path: HOMEBREW_GUIDE_PATH, label: "Clear Homebrew cache", group: "Developers", updated: "2026-11-24" },
  { path: BEST_CLEANER_PATH, label: "Best Mac cleaner app", group: "Compare", updated: "2026-11-24" },
  { path: CLEANMYMAC_ALT_PATH, label: "CleanMyMac alternatives", group: "Compare", updated: "2026-11-24" },
  { path: VS_CLEANMYMAC_PATH, label: "MyMacStorage vs CleanMyMac", group: "Compare", updated: "2026-11-24" },
  { path: IS_CLEANMYMAC_SAFE_PATH, label: "Is CleanMyMac safe?", group: "Compare", updated: "2026-11-24" },
  { path: IS_MACKEEPER_SAFE_PATH, label: "Is MacKeeper safe?", group: "Compare", updated: "2026-11-24" },
  { path: DAISYDISK_ALT_PATH, label: "DaisyDisk alternatives", group: "Compare", updated: "2026-11-24" },
  { path: DISK_ANALYZER_PATH, label: "Mac disk space analyzer", group: "Compare", updated: "2026-11-24" },
  { path: APP_CLEANER_PATH, label: "App cleaner for Mac", group: "Compare", updated: "2026-11-24" },
  { path: "/about", label: "About", group: "Company", updated: "2026-10-29" },
  { path: "/contact", label: "Contact", group: "Company", updated: "2026-10-29" },
  { path: "/privacy", label: "Privacy", group: "Legal", updated: "2026-10-30" },
  { path: "/terms", label: "Terms", group: "Legal", updated: "2026-10-29" },
  { path: "/refund-policy", label: "Refunds", group: "Legal", updated: "2026-10-29" },
];
