import type { Filter } from "mongodb";
import { intParam, rejectUnlessAdmin } from "@/lib/admin";
import { collection, type Order, type OrderStatus } from "@/lib/db";

/** Orders newest first, optionally filtered by `status` or buyer `email`. `limit` defaults to 50, max 500. */
export async function GET(request: Request) {
  const rejected = rejectUnlessAdmin(request);
  if (rejected) return rejected;

  const url = new URL(request.url);
  const filter: Filter<Order> = {};
  const status = url.searchParams.get("status");
  const email = url.searchParams.get("email");
  if (status) filter.status = status as OrderStatus;
  if (email) filter.email = email;

  const orders = await (await collection("orders"))
    .find(filter)
    .sort({ createdAt: -1 })
    .limit(intParam(url, "limit", 50, 1, 500))
    .toArray();
  return Response.json({ orders });
}
