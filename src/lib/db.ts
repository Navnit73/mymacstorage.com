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

/** A purchase, from the moment the buyer is sent to Dodo until their licence key is issued. */
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

/** One install of the Mac app, keyed by the random device ID the app generates on first launch and keeps. */
export type AppDevice = {
  _id: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  appVersion: string;
  build: number;
  channel: ReleaseChannel;
  // The rest are set once the app reports them, and keep their last value when a heartbeat leaves them out.
  /** The app session (one launch) of the latest heartbeat. */
  sessionId?: string;
  osVersion?: string;
  model?: string;
  arch?: string;
  locale?: string;
  country?: string;
  licensed?: boolean;
  launches: number;
};

/** One device seen on one UTC day. Counted for daily, weekly and monthly active users. */
export type AppActivity = {
  _id: string;
  day: string;
  deviceId: string;
  appVersion: string;
  at: Date;
};

/** One feature use or other event the app reports, e.g. `scan.completed`. */
export type AppEvent = {
  /** When it happened on the device. */
  at: Date;
  receivedAt: Date;
  deviceId: string;
  sessionId: string | null;
  appVersion: string;
  name: string;
  props?: Record<string, string | number | boolean | null>;
};

export type ReleaseChannel = "stable" | "beta";

/** A build of the Mac app offered as an update. The app compares `build` (CFBundleVersion) to its own. */
export type AppRelease = {
  version: string;
  build: number;
  channel: ReleaseChannel;
  title: string;
  /** Release notes, Markdown or plain text. */
  notes: string;
  downloadUrl: string;
  /** Byte length of the download; Sparkle wants it. */
  size: number | null;
  /** Sparkle EdDSA signature of the download (`sparkle:edSignature`). */
  edSignature: string | null;
  minimumSystemVersion: string | null;
  /** The app should not let the user skip this one. */
  critical: boolean;
  /** Builds below this must update before they can be used. */
  minimumSupportedBuild: number | null;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
};

type Collections = {
  visits: Visit;
  orders: Order;
  webhook_events: WebhookEvent;
  logs: LogEntry;
  admins: Admin;
  admin_sessions: AdminSession;
  login_failures: LoginFailure;
  app_devices: AppDevice;
  app_activity: AppActivity;
  app_events: AppEvent;
  app_releases: AppRelease;
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
    database.collection("orders").createIndex({ grantId: 1 }, { sparse: true }),
    database.collection("webhook_events").createIndex({ "payload.data.customer_id": 1, receivedAt: -1 }),
    database.collection("logs").createIndex({ at: 1 }, { expireAfterSeconds: ninetyDays }),
    database.collection("admins").createIndex({ email: 1 }, { unique: true }),
    database.collection("admin_sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    database.collection("login_failures").createIndex({ at: 1 }, { expireAfterSeconds: 60 * 15 }),
    database.collection("login_failures").createIndex({ ip: 1, at: -1 }),
    database.collection("login_failures").createIndex({ email: 1, at: -1 }),
    database.collection("app_devices").createIndex({ lastSeenAt: -1 }),
    database.collection("app_activity").createIndex({ at: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 400 }),
    database.collection("app_activity").createIndex({ day: 1 }),
    database.collection("app_events").createIndex({ receivedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 }),
    database.collection("app_events").createIndex({ at: -1 }),
    database.collection("app_events").createIndex({ name: 1, at: -1 }),
    database.collection("app_events").createIndex({ deviceId: 1, at: -1 }),
    database.collection("app_releases").createIndex({ channel: 1, published: 1, build: -1 }),
    database.collection("app_releases").createIndex({ channel: 1, build: 1 }, { unique: true }),
  ]);
}
