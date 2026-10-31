/**
 * Localised prices. These mirror the fixed per-country prices set on the product in Dodo Payments, so what the page
 * shows is what checkout charges. Change a price in Dodo and here together. Countries not listed pay USD.
 */
export type LocalPrice = {
  /** ISO 3166-1 alpha-2 country the price was picked for. */
  country: string;
  /** ISO 4217 currency code, for structured data. */
  currency: string;
  /** Amount in the major unit, for structured data. */
  amount: number;
  /** Ready to display, e.g. "₹599". */
  text: string;
};

const PRICES: Record<string, Omit<LocalPrice, "country">> = {
  IN: { currency: "INR", amount: 599, text: "₹599" },
  GB: { currency: "GBP", amount: 14.99, text: "£14.99" },
  AU: { currency: "AUD", amount: 14.99, text: "$14.99" },
  DE: { currency: "EUR", amount: 14.99, text: "€14.99" },
  FR: { currency: "EUR", amount: 14.99, text: "€14.99" },
  LU: { currency: "EUR", amount: 14.99, text: "€14.99" },
  CH: { currency: "CHF", amount: 14.99, text: "CHF 14.99" },
  SZ: { currency: "CHF", amount: 14.99, text: "CHF 14.99" },
  US: { currency: "USD", amount: 14.99, text: "$14.99" },
};

const DEFAULT_COUNTRY = "US";

/** The price shown before the visitor's country is known, and to every country without its own price. */
export const DEFAULT_PRICE: LocalPrice = { country: DEFAULT_COUNTRY, ...PRICES[DEFAULT_COUNTRY] };

/** IANA time zones that point to a priced country. Only used when the CDN sends no country. */
const TIME_ZONE_COUNTRY: Record<string, string> = {
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Europe/London": "GB",
  "Europe/Belfast": "GB",
  "Europe/Berlin": "DE",
  "Europe/Busingen": "DE",
  "Europe/Paris": "FR",
  "Europe/Luxembourg": "LU",
  "Europe/Zurich": "CH",
  "Africa/Mbabane": "SZ",
};

/** Cloudflare sends XX for an unknown country and T1 for Tor. Neither says where the visitor is. */
function cleanCountry(value: string | null | undefined) {
  const code = value?.trim().toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) && code !== "XX" && code !== "T1" ? code : null;
}

function countryFromTimeZone(timeZone: string | null | undefined) {
  if (!timeZone) return null;
  if (timeZone.startsWith("Australia/")) return "AU";
  return TIME_ZONE_COUNTRY[timeZone] ?? null;
}

/**
 * The visitor's country for pricing. The network country wins because it is what Dodo sees too; the time zone only
 * steps in when the request carries no country (local development, or a request that skipped the CDN).
 */
export function resolveCountry(headerCountry: string | null | undefined, timeZone?: string | null) {
  return cleanCountry(headerCountry) ?? countryFromTimeZone(timeZone) ?? DEFAULT_COUNTRY;
}

/** The price for a country, or the USD price when that country has none of its own. */
export function priceFor(country: string): LocalPrice {
  const price = PRICES[country];
  return price ? { country, ...price } : { ...DEFAULT_PRICE, country };
}

/** True when the country has its own fixed price in Dodo, so it is safe to hand to checkout as the billing country. */
export function hasOwnPrice(country: string | null) {
  return country !== null && country in PRICES;
}

/** The country from the CDN's request headers, or null. Cloudflare first, Vercel as a fallback. */
export function countryFromHeaders(headers: Headers) {
  return cleanCountry(headers.get("cf-ipcountry") ?? headers.get("x-vercel-ip-country"));
}
