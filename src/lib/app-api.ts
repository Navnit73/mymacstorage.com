import { timingSafeEqual } from "node:crypto";
import { collection, type AppRelease, type ReleaseChannel } from "@/lib/db";

/** How often the app should send a heartbeat. A device counts as live for a little over two of these. */
export const HEARTBEAT_SECONDS = 60;
export const LIVE_WINDOW_MS = 150_000;

/**
 * App API routes take `X-App-Key: <APP_API_KEY>`. The key ships inside the app, so it only keeps out casual noise,
 * not a determined caller; nothing behind it is secret. Returns a response to send back, or null to carry on.
 */
export function rejectUnlessApp(request: Request) {
  const key = process.env.APP_API_KEY;
  if (!key) return Response.json({ error: "App API is disabled" }, { status: 503 });

  const given = Buffer.from(request.headers.get("x-app-key") ?? "");
  const expected = Buffer.from(key);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/** Reads a JSON body, or null when it is missing, malformed, or larger than `maxBytes`. */
export async function readJson(request: Request, maxBytes = 64 * 1024): Promise<Record<string, unknown> | null> {
  const text = await request.text().catch(() => "");
  if (!text || text.length > maxBytes) return null;
  try {
    const value: unknown = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export const badRequest = (error: string) => Response.json({ error }, { status: 400 });

/** A trimmed string of at most `max` characters, or null. */
export function str(value: unknown, max = 128) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null;
}

/** A non-negative integer, or null. Accepts numeric strings, since CFBundleVersion is a string in Info.plist. */
export function int(value: unknown) {
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && Number.isInteger(n) && n >= 0 ? n : null;
}

/** Device and session IDs: UUIDs or similar opaque tokens. */
export function id(value: unknown) {
  const s = str(value, 64);
  return s && /^[A-Za-z0-9-]{8,64}$/.test(s) ? s : null;
}

export function channel(value: unknown): ReleaseChannel {
  return value === "beta" ? "beta" : "stable";
}

/** Beta testers get stable releases too, whichever is newer. */
export function channelsFor(ch: ReleaseChannel): ReleaseChannel[] {
  return ch === "beta" ? ["stable", "beta"] : ["stable"];
}

/**
 * The newest published release on the channel, if it is newer than `build`. `critical` and `required` look at every
 * release the device is missing, so skipping past a critical release doesn't hide it.
 */
export async function updateFor(build: number, ch: ReleaseChannel) {
  const newer = await (await collection("app_releases"))
    .find({ channel: { $in: channelsFor(ch) }, published: true, build: { $gt: build } })
    .sort({ build: -1 })
    .limit(500)
    .toArray();
  if (newer.length === 0) return null;
  return {
    ...publicRelease(newer[0]),
    critical: newer.some((r) => r.critical),
    /** This build is below a minimum: the app should block use until it updates. */
    required: newer.some((r) => (r.minimumSupportedBuild ?? 0) > build),
  };
}

/** The fields the app sees. */
export function publicRelease(r: AppRelease) {
  return {
    version: r.version,
    build: r.build,
    channel: r.channel,
    title: r.title,
    notes: r.notes,
    downloadUrl: r.downloadUrl,
    size: r.size,
    edSignature: r.edSignature,
    minimumSystemVersion: r.minimumSystemVersion,
    critical: r.critical,
    minimumSupportedBuild: r.minimumSupportedBuild,
    publishedAt: r.publishedAt,
  };
}

export type ReleaseInput = Omit<AppRelease, "createdAt" | "publishedAt" | "published"> & { published: boolean };

/** Validates a release from the admin API or panel. Returns the release or an error message. */
export function parseRelease(body: Record<string, unknown>): ReleaseInput | string {
  const version = str(body.version, 32);
  const build = int(body.build);
  const downloadUrl = str(body.downloadUrl, 2048);
  if (!version) return "version is required, e.g. 1.4.0";
  if (build === null || build < 1) return "build is required: the CFBundleVersion integer";
  if (!downloadUrl || !/^https:\/\//.test(downloadUrl)) return "downloadUrl must be an https URL";
  return {
    version,
    build,
    channel: channel(body.channel),
    title: str(body.title, 200) ?? `Version ${version}`,
    notes: typeof body.notes === "string" ? body.notes.slice(0, 20_000) : "",
    downloadUrl,
    size: int(body.size),
    edSignature: str(body.edSignature, 256),
    minimumSystemVersion: str(body.minimumSystemVersion, 16),
    critical: body.critical === true || body.critical === "true" || body.critical === "on",
    minimumSupportedBuild: int(body.minimumSupportedBuild) || null,
    published: body.published !== false && body.published !== "false",
  };
}
