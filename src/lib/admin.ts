import { timingSafeEqual } from "node:crypto";

/**
 * Admin API routes take `Authorization: Bearer <ADMIN_API_TOKEN>`. Returns a 401/503 response to send back, or null
 * when the caller is allowed through. With no token configured the admin API stays shut.
 */
export function rejectUnlessAdmin(request: Request) {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) return Response.json({ error: "Admin API is disabled" }, { status: 503 });

  const given = Buffer.from(request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "");
  const expected = Buffer.from(token);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/** Reads an integer query parameter, clamped to [min, max]. */
export function intParam(url: URL, name: string, fallback: number, min: number, max: number) {
  const value = Number.parseInt(url.searchParams.get(name) ?? "", 10);
  return Number.isNaN(value) ? fallback : Math.min(max, Math.max(min, value));
}
