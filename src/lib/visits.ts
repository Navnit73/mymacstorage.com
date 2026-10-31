import { userAgent, type NextRequest } from "next/server";
import { collection, type Visit } from "@/lib/db";

export const VISITOR_COOKIE = "mms_vid";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** The visitor cookie, or null if absent or not a UUID. The value is client-controlled, so anything else is dropped. */
export function readVisitorId(request: NextRequest) {
  const value = request.cookies.get(VISITOR_COOKIE)?.value;
  return value && UUID.test(value) ? value : null;
}

// Checked in order, so specific names come before the generic patterns that would also match them.
const NAMED_BOTS: [name: string, pattern: RegExp][] = [
  ["Googlebot", /googlebot|google-inspectiontool|storebot-google|googleother|adsbot-google|mediapartners-google/i],
  ["Google-Extended", /google-extended/i],
  ["Bingbot", /bingbot|bingpreview|msnbot|adidxbot/i],
  ["GPTBot", /gptbot/i],
  ["ChatGPT-User", /chatgpt-user/i],
  ["OAI-SearchBot", /oai-searchbot/i],
  ["ClaudeBot", /claudebot|claude-user|claude-searchbot|anthropic-ai/i],
  ["PerplexityBot", /perplexitybot|perplexity-user/i],
  ["Applebot", /applebot/i],
  ["DuckDuckBot", /duckduckbot|duckassistbot/i],
  ["YandexBot", /yandex/i],
  ["Baiduspider", /baiduspider/i],
  ["Bytespider", /bytespider/i],
  ["CCBot", /ccbot/i],
  ["Amazonbot", /amazonbot/i],
  ["Meta", /meta-externalagent|meta-externalfetcher|facebookexternalhit|facebookcatalog/i],
  ["AhrefsBot", /ahrefs/i],
  ["SemrushBot", /semrush/i],
  ["MJ12bot", /mj12bot/i],
  ["DotBot", /dotbot/i],
  ["PetalBot", /petalbot/i],
  ["Twitterbot", /twitterbot/i],
  ["LinkedInBot", /linkedinbot/i],
  ["Slackbot", /slackbot/i],
  ["Discordbot", /discordbot/i],
  ["TelegramBot", /telegrambot/i],
  ["WhatsApp", /whatsapp/i],
  ["HeadlessChrome", /headlesschrome|puppeteer|playwright|phantomjs/i],
  ["Script", /curl|wget|python-requests|python-urllib|aiohttp|httpx|go-http-client|node-fetch|axios|okhttp|java\//i],
  ["Uptime monitor", /uptimerobot|pingdom|statuscake|betteruptime|site24x7/i],
  ["Dodo webhook", /svix|standard-webhooks/i],
];
const GENERIC_BOT = /bot|crawl|spider|slurp|fetcher|scanner|preview|monitor/i;
// Real devices whose names contain "bot", stripped before the generic check.
const BOT_LOOKALIKES = /cubot/gi;
export const UNNAMED_BOT = "Other bot";

/** Names the crawler behind a user agent, or returns null for what looks like a person's browser. */
export function detectBot(ua: string | null, nextSaysBot: boolean): string | null {
  if (!ua) return "No user agent";
  for (const [name, pattern] of NAMED_BOTS) if (pattern.test(ua)) return name;
  if (nextSaysBot || GENERIC_BOT.test(ua.replace(BOT_LOOKALIKES, ""))) return UNNAMED_BOT;
  return null;
}

/** Builds the visit record for a request. `visitorId` is the cookie value the response will carry. */
export function visitFromRequest(request: NextRequest, visitorId: string | null): Visit {
  const ua = request.headers.get("user-agent");
  const parsed = userAgent(request);
  const botName = detectBot(ua, parsed.isBot);
  const { pathname, search } = request.nextUrl;

  return {
    at: new Date(),
    method: request.method,
    path: pathname,
    query: search || null,
    visitorId: botName ? null : visitorId,
    isBot: botName !== null,
    botName,
    userAgent: ua?.slice(0, 512) ?? null,
    ip: clientIp(request),
    country: request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry"),
    referrer: request.headers.get("referer")?.slice(0, 1024) ?? null,
    browser: parsed.browser.name ?? null,
    os: parsed.os.name ?? null,
    device: parsed.device.type ?? "desktop",
  };
}

/** Saves a visit. Never throws: losing a log line must not fail the page. */
export async function recordVisit(visit: Visit) {
  try {
    await (await collection("visits")).insertOne(visit);
  } catch (error) {
    console.error(JSON.stringify({ at: new Date(), level: "error", scope: "visits", message: String(error) }));
  }
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || null;
}
