import { MongoClient, type Db } from "mongodb";

/** One request to the site, written by the proxy for every page and API hit. */
export type Visit = {
  at: Date;
  method: string;
  path: string;
  query: string | null;
  /** First-party cookie, so repeat visits by one browser group together. Bots rarely keep it. */
  visitorId: string | null;
  isBot: boolean;
  /** Which crawler, e.g. "Googlebot" or "GPTBot", when it could be named. */
  botName: string | null;
  userAgent: string | null;
  ip: string | null;
  country: string | null;
  referrer: string | null;
  browser: string | null;
  os: string | null;
  device: string;
};

export type OrderStatus = "checkout_created" | "paid" | "failed" | "cancelled" | "fulfilled";

/** A purchase, from the moment the buyer is sent to Dodo until their licence email goes out. */
export type Order = {
  checkoutSessionId: string;
  status: OrderStatus;
  visitorId: string | null;
  paymentId?: string;
  customerId?: string;
  email?: string;
  name?: string | null;
  amount?: number;
  currency?: string;
  grantId?: string;
  licenseKeyId?: string;
  emailId?: string;
  emailSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

/** Every verified Dodo webhook, keyed by its webhook-id so a retry is recognised. */
export type WebhookEvent = {
  _id: string;
  type: string;
  payload: unknown;
  receivedAt: Date;
  processedAt?: Date;
  error?: string;
};

export type EmailLog = {
  to: string;
  subject: string;
  kind: "purchase";
  resendId: string | null;
  orderId: string | null;
  grantId: string | null;
  /** Kept so an email sent before its payment.succeeded arrives can still be matched to the order later. */
  customerId?: string | null;
  licenseKeyId?: string | null;
  status: "sent" | "failed";
  error?: string;
  at: Date;
};

export type LogEntry = {
  at: Date;
  level: "info" | "warn" | "error";
  scope: string;
  message: string;
  data?: Record<string, unknown>;
};

/** Someone who can sign in to the admin panel. Created with `npm run seed:admin`. */
export type Admin = {
  email: string;
  /** `scrypt$<salt>$<hash>`, both base64. See src/lib/admin-auth.ts. */
  passwordHash: string;
  createdAt: Date;
  lastLoginAt?: Date;
};

/** A signed-in admin. The cookie holds a random token; only its SHA-256 is stored, as `_id`. */
export type AdminSession = {
  _id: string;
  adminId: string;
  email: string;
  ip: string | null;
  userAgent: string | null;
  createdAt: Date;
  expiresAt: Date;
};

/** A failed admin sign-in, counted per IP to slow down password guessing. */
export type LoginFailure = {
  ip: string;
  email: string;
  at: Date;
};

type Collections = {
  visits: Visit;
  orders: Order;
  webhook_events: WebhookEvent;
  emails: EmailLog;
  logs: LogEntry;
  admins: Admin;
  admin_sessions: AdminSession;
  login_failures: LoginFailure;
};

// Kept on globalThis so dev-mode hot reloads reuse one connection pool instead of opening a new one per edit.
const cache = globalThis as unknown as { mongo?: Promise<Db> };

/** The app database, connected on first use. Reads MONGODB_URI; the database name comes from the URI path. */
export function db() {
  return (cache.mongo ??= connect().catch((error) => {
    cache.mongo = undefined;
    throw error;
  }));
}

export async function collection<K extends keyof Collections>(name: K) {
  return (await db()).collection<Collections[K]>(name);
}

async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  const client = await new MongoClient(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 }).connect();
  const database = client.db();
  try {
    await ensureIndexes(database);
  } catch (error) {
    // db() retries on the next call, so close this pool rather than leak one per attempt.
    await client.close().catch(() => {});
    throw error;
  }
  return database;
}

async function ensureIndexes(database: Db) {
  const ninetyDays = 60 * 60 * 24 * 90;
  await Promise.all([
    // Visits pile up fast, so they expire after 90 days.
    database.collection("visits").createIndex({ at: 1 }, { expireAfterSeconds: ninetyDays }),
    database.collection("visits").createIndex({ isBot: 1, at: -1 }),
    database.collection("visits").createIndex({ path: 1, at: -1 }),
    database.collection("orders").createIndex({ checkoutSessionId: 1 }, { unique: true }),
    database.collection("orders").createIndex({ paymentId: 1 }, { sparse: true }),
    database.collection("orders").createIndex({ customerId: 1, createdAt: -1 }),
    database.collection("emails").createIndex({ at: -1 }),
    database.collection("emails").createIndex({ grantId: 1, status: 1 }),
    database.collection("logs").createIndex({ at: 1 }, { expireAfterSeconds: ninetyDays }),
    database.collection("admins").createIndex({ email: 1 }, { unique: true }),
    database.collection("admin_sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    database.collection("login_failures").createIndex({ at: 1 }, { expireAfterSeconds: 60 * 15 }),
    database.collection("login_failures").createIndex({ ip: 1, at: -1 }),
    database.collection("login_failures").createIndex({ email: 1, at: -1 }),
  ]);
}
