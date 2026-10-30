import type { Metadata } from "next";
import type { Filter } from "mongodb";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import { collection, type LogEntry } from "@/lib/db";
import { Badge, FilterLinks, formatDate, PageTitle, PanelSkeleton, Table, Td } from "../../_components/ui";

export const metadata: Metadata = { title: "Logs" };

const LEVELS: LogEntry["level"][] = ["info", "warn", "error"];

export default function LogsPage({ searchParams }: PageProps<"/navnit_admin/logs">) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <Logs searchParams={searchParams} />
    </Suspense>
  );
}

async function Logs({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const { level: levelParam } = await searchParams;
  const level = LEVELS.find((l) => l === levelParam);

  const filter: Filter<LogEntry> = level ? { level } : {};
  const logs = await (await collection("logs")).find(filter).sort({ at: -1 }).limit(200).toArray();

  return (
    <>
      <PageTitle
        aside={
          <FilterLinks
            current={level ?? "all"}
            options={[
              { value: "all", label: "All", href: "/navnit_admin/logs" },
              ...LEVELS.map((l) => ({ value: l, label: l, href: `/navnit_admin/logs?level=${l}` })),
            ]}
          />
        }
      >
        Logs
      </PageTitle>

      <Table head={["Time", "Level", "Scope", "Message"]} empty={logs.length === 0}>
        {logs.map((l) => (
          <tr key={l._id.toString()} className="hover:bg-gray-50">
            <Td className="whitespace-nowrap text-gray-600">{formatDate(l.at)}</Td>
            <Td>
              <Badge tone={l.level === "error" ? "dark" : l.level === "warn" ? "gray" : "lime"}>{l.level}</Badge>
            </Td>
            <Td className="font-mono text-xs">{l.scope}</Td>
            <Td>
              {l.message}
              {l.data && (
                <details className="mt-1">
                  <summary className="cursor-pointer text-xs text-gray-500">Details</summary>
                  <pre className="mt-1 max-w-2xl overflow-x-auto rounded-md bg-gray-50 p-2 text-xs text-gray-800">
                    {JSON.stringify(l.data, null, 2)}
                  </pre>
                </details>
              )}
            </Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
