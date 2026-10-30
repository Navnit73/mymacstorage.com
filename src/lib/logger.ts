import { collection, type LogEntry } from "@/lib/db";

type Data = Record<string, unknown>;

/**
 * Structured logger for backend events. Each entry goes to the console as one JSON line (what the host's log viewer
 * shows) and into the `logs` collection. The returned promise never rejects, so a database outage can't break the
 * request that logged; await it only where the function might exit before the write lands.
 */
export function logger(scope: string) {
  return {
    info: (message: string, data?: Data) => write("info", scope, message, data),
    warn: (message: string, data?: Data) => write("warn", scope, message, data),
    error: (message: string, data?: Data) => write("error", scope, message, data),
  };
}

async function write(level: LogEntry["level"], scope: string, message: string, data?: Data) {
  try {
    const entry: LogEntry = { at: new Date(), level, scope, message, ...(data && { data: serialize(data) }) };
    const line = JSON.stringify(entry);
    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.log(line);
    await (await collection("logs")).insertOne(entry);
  } catch (error) {
    console.error(JSON.stringify({ at: new Date(), level: "error", scope: "logger", message: String(error) }));
  }
}

/** Errors don't survive JSON or BSON as-is, so they're flattened to their message and stack. */
function serialize(data: Data): Data {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value instanceof Error ? { name: value.name, message: value.message, stack: value.stack } : value,
    ]),
  );
}
