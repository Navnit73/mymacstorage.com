import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { ObjectId } from "mongodb";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { collection } from "@/lib/db";
import { logger } from "@/lib/logger";

export const ADMIN_PATH = "/navnit_admin";
export const ADMIN_LOGIN_PATH = `${ADMIN_PATH}/login`;

const COOKIE = "mms_admin";
const SESSION_DAYS = 7;
// Within the 15 minutes login_failures keeps them. The IP comes from X-Forwarded-For, which a client can forge
// unless the host overwrites it, so the per-account cap also stops guessing spread across many fake IPs.
const MAX_FAILURES_PER_IP = 10;
const MAX_FAILURES_PER_EMAIL = 30;
const KEY_LENGTH = 64;

const log = logger("admin-auth");
const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

/** Hashes a password as `scrypt$<salt>$<hash>`. scripts/seed-admin.mjs writes the same format. */
export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, KEY_LENGTH);
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64");
  const actual = await scryptAsync(password, Buffer.from(salt, "base64"), expected.length);
  return timingSafeEqual(actual, expected);
}

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

async function requestInfo() {
  const h = await headers();
  return {
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null,
    userAgent: h.get("user-agent")?.slice(0, 512) ?? null,
  };
}

export type SignInResult = { ok: true } | { ok: false; error: string };

/** Checks the credentials and, if they match, starts a session and sets its cookie. For use in a Server Action. */
export async function signIn(emailInput: string, password: string): Promise<SignInResult> {
  const email = emailInput.trim().toLowerCase();
  const { ip, userAgent } = await requestInfo();
  const failures = await collection("login_failures");

  const [byIp, byEmail] = await Promise.all([
    failures.countDocuments({ ip: ip ?? "unknown" }),
    failures.countDocuments({ email }),
  ]);
  if (byIp >= MAX_FAILURES_PER_IP || byEmail >= MAX_FAILURES_PER_EMAIL) {
    await log.warn("Admin sign-in blocked: too many failures", { ip, email });
    return { ok: false, error: "Too many failed attempts. Try again in 15 minutes." };
  }

  const admin = await (await collection("admins")).findOne({ email });
  // Hash even when there's no such admin, so the response time doesn't reveal which emails exist.
  const valid = admin
    ? await verifyPassword(password, admin.passwordHash)
    : (await verifyPassword(password, await hashPassword("x")), false);

  if (!admin || !valid) {
    await failures.insertOne({ ip: ip ?? "unknown", email, at: new Date() });
    await log.warn("Admin sign-in failed", { ip, email });
    return { ok: false, error: "Wrong email or password." };
  }

  const token = randomBytes(32).toString("base64url");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await (await collection("admin_sessions")).insertOne({
    _id: hashToken(token),
    adminId: admin._id.toString(),
    email,
    ip,
    userAgent,
    createdAt: now,
    expiresAt,
  });
  await (await collection("admins")).updateOne({ _id: admin._id }, { $set: { lastLoginAt: now } });
  await failures.deleteMany({ $or: [{ ip: ip ?? "unknown" }, { email }] });

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: ADMIN_PATH,
    expires: expiresAt,
  });
  await log.info("Admin signed in", { email, ip });
  return { ok: true };
}

/** Ends the current session, in the database and in the browser. For use in a Server Action. */
export async function signOut() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) await (await collection("admin_sessions")).deleteOne({ _id: hashToken(token) });
  store.delete({ name: COOKIE, path: ADMIN_PATH });
}

/** The signed-in admin, or null. Checked against the database on every request, so signing out is immediate. */
export const getAdmin = cache(async () => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = await (await collection("admin_sessions")).findOne({
    _id: hashToken(token),
    expiresAt: { $gt: new Date() },
  });
  if (!session) return null;
  const admin = await (await collection("admins")).findOne({ _id: new ObjectId(session.adminId) });
  return admin ? { id: admin._id.toString(), email: admin.email } : null;
});

/** The signed-in admin; sends anyone else to the sign-in page. Call at the top of every admin page and action. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect(ADMIN_LOGIN_PATH);
  return admin;
}
