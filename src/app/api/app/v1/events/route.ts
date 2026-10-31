import { badRequest, id, readJson, rejectUnlessApp, str } from "@/lib/app-api";
import { collection, type AppEvent } from "@/lib/db";

const MAX_EVENTS = 100;
const MAX_PROPS = 20;
// Events stamped further from now than this have a wrong clock; they're kept, but dated when received.
const CLOCK_SKEW_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Feature use and other events, sent in batches. The app should queue events and flush them every minute or so,
 * on quit, and when the queue reaches 100.
 *
 * Body: `{ deviceId, sessionId?, appVersion, events: [{ name, at?, props? }] }`. `name` is a dotted identifier like
 * `scan.completed` or `feature.duplicates.opened`; `at` is an ISO date; `props` is a flat object of strings, numbers
 * and booleans. Response: `{ accepted }`, the number of events stored.
 */
export async function POST(request: Request) {
  const rejected = rejectUnlessApp(request);
  if (rejected) return rejected;

  const body = await readJson(request, 256 * 1024);
  const deviceId = id(body?.deviceId);
  const appVersion = str(body?.appVersion, 32);
  if (!body || !deviceId || !appVersion || !Array.isArray(body.events)) {
    return badRequest("deviceId, appVersion and events are required");
  }
  if (body.events.length > MAX_EVENTS) return badRequest(`At most ${MAX_EVENTS} events per request`);

  const now = new Date();
  const sessionId = id(body.sessionId);
  const events: AppEvent[] = [];
  for (const raw of body.events as unknown[]) {
    if (!raw || typeof raw !== "object") continue;
    const e = raw as Record<string, unknown>;
    const name = str(e.name, 100);
    if (!name || !/^[A-Za-z0-9_.:-]+$/.test(name)) continue;
    const at = typeof e.at === "string" ? new Date(e.at) : now;
    const props = flatProps(e.props);
    events.push({
      at: Number.isNaN(at.getTime()) || Math.abs(at.getTime() - now.getTime()) > CLOCK_SKEW_MS ? now : at,
      receivedAt: now,
      deviceId,
      sessionId,
      appVersion,
      name,
      ...(props && { props }),
    });
  }

  if (events.length > 0) await (await collection("app_events")).insertMany(events, { ordered: false });
  return Response.json({ accepted: events.length });
}

/** Keeps up to 20 string, number, boolean or null values; nested objects are dropped. */
function flatProps(value: unknown): AppEvent["props"] | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const props: NonNullable<AppEvent["props"]> = {};
  for (const [key, v] of Object.entries(value).slice(0, MAX_PROPS)) {
    const k = key.slice(0, 64).replace(/^\$/, "_").replaceAll(".", "_");
    if (typeof v === "string") props[k] = v.slice(0, 256);
    else if ((typeof v === "number" && Number.isFinite(v)) || typeof v === "boolean" || v === null) props[k] = v;
  }
  return Object.keys(props).length ? props : undefined;
}
