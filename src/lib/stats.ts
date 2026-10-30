import { collection } from "@/lib/db";

/** Traffic and sales summary for the last `days` days. Used by the admin panel and `/api/admin/stats`. */
export async function getStats(days: number) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const visits = await collection("visits");
  const orders = await collection("orders");

  const [traffic, topBots, topPages, perDay, orderStatuses, revenue] = await Promise.all([
    visits
      .aggregate<{ _id: boolean; requests: number; visitors: string[] }>([
        { $match: { at: { $gte: since } } },
        { $group: { _id: "$isBot", requests: { $sum: 1 }, visitors: { $addToSet: "$visitorId" } } },
      ])
      .toArray(),
    visits
      .aggregate<{ bot: string; requests: number }>([
        { $match: { at: { $gte: since }, isBot: true } },
        { $group: { _id: "$botName", requests: { $sum: 1 } } },
        { $sort: { requests: -1 } },
        { $limit: 20 },
        { $project: { _id: 0, bot: "$_id", requests: 1 } },
      ])
      .toArray(),
    visits
      .aggregate<{ path: string; views: number; visitors: number }>([
        { $match: { at: { $gte: since }, isBot: false, method: "GET", path: { $not: /^\/api\// } } },
        { $group: { _id: "$path", views: { $sum: 1 }, visitors: { $addToSet: "$visitorId" } } },
        { $project: { _id: 0, path: "$_id", views: 1, visitors: { $size: "$visitors" } } },
        { $sort: { views: -1 } },
        { $limit: 20 },
      ])
      .toArray(),
    visits
      .aggregate<{ day: string; isBot: boolean; requests: number }>([
        { $match: { at: { $gte: since } } },
        {
          $group: {
            _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$at" } }, isBot: "$isBot" },
            requests: { $sum: 1 },
          },
        },
        { $sort: { "_id.day": 1 } },
        { $project: { _id: 0, day: "$_id.day", isBot: "$_id.isBot", requests: 1 } },
      ])
      .toArray(),
    orders
      .aggregate<{ status: string; count: number; revenue: number }>([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: "$status", count: { $sum: 1 }, revenue: { $sum: { $ifNull: ["$amount", 0] } } } },
        { $project: { _id: 0, status: "$_id", count: 1, revenue: 1 } },
      ])
      .toArray(),
    // Per currency, since adaptive pricing can charge in more than one and amounts can't be summed across them.
    orders
      .aggregate<{ currency: string; amount: number; orders: number }>([
        { $match: { createdAt: { $gte: since }, status: { $in: ["paid", "fulfilled"] } } },
        { $group: { _id: "$currency", amount: { $sum: "$amount" }, orders: { $sum: 1 } } },
        { $project: { _id: 0, currency: "$_id", amount: 1, orders: 1 } },
        { $sort: { amount: -1 } },
      ])
      .toArray(),
  ]);

  const humans = traffic.find((t) => !t._id);
  const bots = traffic.find((t) => t._id);

  return {
    since,
    days,
    humans: { requests: humans?.requests ?? 0, visitors: humans?.visitors.filter(Boolean).length ?? 0 },
    bots: { requests: bots?.requests ?? 0 },
    topBots,
    topPages,
    perDay,
    // Amounts are in the currency's smallest unit, e.g. cents.
    orders: orderStatuses,
    revenue,
  };
}

export type Stats = Awaited<ReturnType<typeof getStats>>;
