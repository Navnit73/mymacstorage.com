import { LIVE_WINDOW_MS } from "@/lib/app-api";
import { collection } from "@/lib/db";

const DAY_MS = 86_400_000;
const dayString = (msAgo: number) => new Date(Date.now() - msAgo).toISOString().slice(0, 10);

/** Mac app usage for the last `days` days. Used by the admin panel and `/api/admin/app/stats`. */
export async function getAppStats(days: number) {
  const now = Date.now();
  const since = new Date(now - days * DAY_MS);
  const sinceDay = dayString((days - 1) * DAY_MS);
  const liveSince = new Date(now - LIVE_WINDOW_MS);

  const devices = await collection("app_devices");
  const activity = await collection("app_activity");
  const events = await collection("app_events");

  // Distinct devices active on or after a day, counted in two passes so no single array holds every device ID.
  const activeSince = async (day: string) =>
    (
      await activity
        .aggregate<{ n: number }>([
          { $match: { day: { $gte: day } } },
          { $group: { _id: "$deviceId" } },
          { $count: "n" },
        ])
        .toArray()
    )[0]?.n ?? 0;

  const [live, liveDevices, dau, wau, mau, totalDevices, newDevices, perDay, versions, topEvents] = await Promise.all([
    devices.countDocuments({ lastSeenAt: { $gte: liveSince } }),
    devices.find({ lastSeenAt: { $gte: liveSince } }).sort({ lastSeenAt: -1 }).limit(50).toArray(),
    activeSince(dayString(0)),
    activeSince(dayString(6 * DAY_MS)),
    activeSince(dayString(29 * DAY_MS)),
    devices.estimatedDocumentCount(),
    devices.countDocuments({ firstSeenAt: { $gte: since } }),
    activity
      .aggregate<{ day: string; devices: number }>([
        { $match: { day: { $gte: sinceDay } } },
        { $group: { _id: "$day", devices: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, day: "$_id", devices: 1 } },
      ])
      .toArray(),
    devices
      .aggregate<{ version: string; devices: number }>([
        { $match: { lastSeenAt: { $gte: since } } },
        { $group: { _id: "$appVersion", devices: { $sum: 1 } } },
        { $sort: { devices: -1 } },
        { $limit: 20 },
        { $project: { _id: 0, version: "$_id", devices: 1 } },
      ])
      .toArray(),
    events
      .aggregate<{ name: string; count: number; devices: number }>([
        { $match: { at: { $gte: since } } },
        { $group: { _id: { name: "$name", deviceId: "$deviceId" }, count: { $sum: 1 } } },
        { $group: { _id: "$_id.name", count: { $sum: "$count" }, devices: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 50 },
        { $project: { _id: 0, name: "$_id", count: 1, devices: 1 } },
      ])
      .toArray(),
  ]);

  return {
    asOf: new Date(now),
    since,
    days,
    live,
    liveDevices: liveDevices.map((d) => ({
      deviceId: d._id,
      appVersion: d.appVersion,
      osVersion: d.osVersion ?? null,
      model: d.model ?? null,
      country: d.country ?? null,
      licensed: d.licensed ?? false,
      lastSeenAt: d.lastSeenAt,
    })),
    dau,
    wau,
    mau,
    totalDevices,
    newDevices,
    perDay,
    versions,
    topEvents,
  };
}

export type AppStats = Awaited<ReturnType<typeof getAppStats>>;
