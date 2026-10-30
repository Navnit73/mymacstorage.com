// Creates an admin who can sign in at /navnit_admin, or resets an existing admin's password.
//
//   ADMIN_PASSWORD='...' npm run seed:admin -- you@example.com
//
// The password comes from the environment, not an argument, so it stays out of `ps` output.
// The hash format must match hashPassword() in src/lib/admin-auth.ts.
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { MongoClient } from "mongodb";

const email = process.argv[2]?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) {
  console.error("Usage: ADMIN_PASSWORD='...' npm run seed:admin -- you@example.com");
  process.exit(1);
}
if (password.length < 8) {
  console.error("Use a password of at least 8 characters.");
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set. Put it in .env.local.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = await promisify(scrypt)(password, salt, 64);
const passwordHash = `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;

const client = await new MongoClient(process.env.MONGODB_URI).connect();
try {
  const admins = client.db().collection("admins");
  await admins.createIndex({ email: 1 }, { unique: true });
  const result = await admins.updateOne(
    { email },
    { $set: { passwordHash }, $setOnInsert: { email, createdAt: new Date() } },
    { upsert: true },
  );
  // A new password should end every session signed in with the old one.
  const admin = await admins.findOne({ email });
  const { deletedCount } = await client.db().collection("admin_sessions").deleteMany({ adminId: admin._id.toString() });
  console.log(`${result.upsertedCount ? "Created" : "Updated password for"} ${email}. Signed out ${deletedCount} session(s).`);
} finally {
  await client.close();
}
