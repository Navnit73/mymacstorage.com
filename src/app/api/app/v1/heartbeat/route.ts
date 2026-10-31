import { badRequest, channel, HEARTBEAT_SECONDS, id, int, readJson, rejectUnlessApp, str, updateFor } from "@/lib/app-api";
import { MongoServerError } from "mongodb";
import { collection } from "@/lib/db";

/** Two heartbeats from a new device can race to insert it; the loser gets a duplicate-key error and should retry. */
async function retryOnDuplicate<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) return run();
    throw error;
  }
}

/**
 * The app calls this on launch (`"event": "launch"`) and then every `nextHeartbeatSeconds` while it runs. It keeps
 * the device's record current, counts it as active today, and answers with any update waiting for it.
 *
 * Body: `{ deviceId, sessionId, appVersion, build, channel?, event?, osVersion?, model?, arch?, locale?, licensed? }`.
 * Response: `{ serverTime, nextHeartbeatSeconds, update }`, where `update` is null or the release to offer.
 */
export async function POST(request: Request) {
  const rejected = rejectUnlessApp(request);
  if (rejected) return rejected;

  const body = await readJson(request, 8 * 1024);
  const deviceId = id(body?.deviceId);
  const appVersion = str(body?.appVersion, 32);
  const build = int(body?.build);
  if (!body || !deviceId || !appVersion || build === null) {
    return badRequest("deviceId, appVersion and build are required");
  }

  const now = new Date();
  const ch = channel(body.channel);
  const day = now.toISOString().slice(0, 10);
  // Fields the app may leave out of a routine heartbeat keep their last known value rather than being cleared.
  const optional = Object.fromEntries(
    Object.entries({
      sessionId: id(body.sessionId),
      osVersion: str(body.osVersion, 32),
      model: str(body.model, 64),
      arch: str(body.arch, 16),
      locale: str(body.locale, 32),
      country: request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry"),
      licensed: typeof body.licensed === "boolean" ? body.licensed : null,
    }).filter(([, value]) => value !== null),
  );
  const devices = await collection("app_devices");
  const activity = await collection("app_activity");

  const [, , update] = await Promise.all([
    retryOnDuplicate(() =>
      devices.updateOne(
        { _id: deviceId },
        {
          $set: { lastSeenAt: now, appVersion, build, channel: ch, ...optional },
          $setOnInsert: { firstSeenAt: now },
          $inc: { launches: body.event === "launch" ? 1 : 0 },
        },
        { upsert: true },
      ),
    ),
    retryOnDuplicate(() =>
      activity.updateOne(
        { _id: `${day}:${deviceId}` },
        { $set: { appVersion, at: now }, $setOnInsert: { day, deviceId } },
        { upsert: true },
      ),
    ),
    updateFor(build, ch),
  ]);

  return Response.json({ serverTime: now, nextHeartbeatSeconds: HEARTBEAT_SECONDS, update });
}
