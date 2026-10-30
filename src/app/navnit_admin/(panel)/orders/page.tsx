import type { Metadata } from "next";
import type { Filter } from "mongodb";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import { collection, type Order, type OrderStatus } from "@/lib/db";
import { ResendButton } from "../../_components/resend-button";
import { Badge, Card, FilterLinks, formatDate, formatMoney, PageTitle, PanelSkeleton, Table, Td } from "../../_components/ui";

export const metadata: Metadata = { title: "Orders" };

const STATUSES: OrderStatus[] = ["checkout_created", "paid", "fulfilled", "failed", "cancelled"];
const TONE: Record<OrderStatus, "gray" | "lime" | "dark"> = {
  checkout_created: "gray",
  paid: "dark",
  fulfilled: "lime",
  failed: "gray",
  cancelled: "gray",
};

export default function OrdersPage({ searchParams }: PageProps<"/navnit_admin/orders">) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <Orders searchParams={searchParams} />
    </Suspense>
  );
}

async function Orders({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin();
  const { status: statusParam, email: emailParam } = await searchParams;
  const status = STATUSES.find((s) => s === statusParam);
  const email = typeof emailParam === "string" && emailParam.trim() ? emailParam.trim() : undefined;

  // Case-insensitive exact match: Dodo keeps the email as the buyer typed it.
  const emailMatch = email && new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
  const filter: Filter<Order> = {};
  if (status) filter.status = status;
  if (emailMatch) filter.email = emailMatch;

  const [orders, emails] = await Promise.all([
    (await collection("orders")).find(filter).sort({ createdAt: -1 }).limit(200).toArray(),
    (await collection("emails")).find(emailMatch ? { to: emailMatch } : {}).sort({ at: -1 }).limit(50).toArray(),
  ]);

  return (
    <>
      <PageTitle
        aside={
          <FilterLinks
            current={status ?? "all"}
            options={[
              { value: "all", label: "All", href: "/navnit_admin/orders" },
              ...STATUSES.map((s) => ({ value: s, label: s.replace("_", " "), href: `/navnit_admin/orders?status=${s}` })),
            ]}
          />
        }
      >
        Orders
      </PageTitle>

      <form className="mb-4 flex max-w-md gap-2" action="/navnit_admin/orders">
        {status && <input type="hidden" name="status" value={status} />}
        <input
          name="email"
          type="search"
          defaultValue={email}
          placeholder="Find by buyer email"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-lime-600"
        />
        <button type="submit" className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">
          Search
        </button>
      </form>

      <Table head={["Created", "Status", "Buyer", "Amount", "Licence email", "IDs"]} empty={orders.length === 0}>
        {orders.map((o) => (
          <tr key={o._id.toString()} className="hover:bg-gray-50">
            <Td className="whitespace-nowrap text-gray-600">{formatDate(o.createdAt)}</Td>
            <Td>
              <Badge tone={TONE[o.status]}>{o.status.replace("_", " ")}</Badge>
            </Td>
            <Td>
              <div>{o.name ?? "—"}</div>
              <div className="text-xs text-gray-500">{o.email ?? ""}</div>
            </Td>
            <Td className="whitespace-nowrap tabular-nums">{formatMoney(o.amount, o.currency)}</Td>
            <Td>
              {o.emailSentAt ? (
                <div className="whitespace-nowrap text-xs text-gray-600">Sent {formatDate(o.emailSentAt)}</div>
              ) : (
                <div className="text-xs text-gray-500">Not sent</div>
              )}
              {o.email && o.licenseKeyId && (
                <div className="mt-1.5">
                  <ResendButton email={o.email} />
                </div>
              )}
            </Td>
            <Td className="font-mono text-xs text-gray-500">
              <div title="Checkout session">{o.checkoutSessionId}</div>
              {o.paymentId && <div title="Payment">{o.paymentId}</div>}
            </Td>
          </tr>
        ))}
      </Table>

      <Card title="Emails sent" className="mt-8">
        <Table head={["Time", "To", "Status", "Resend ID"]} empty={emails.length === 0}>
          {emails.map((e) => (
            <tr key={e._id.toString()}>
              <Td className="whitespace-nowrap text-gray-600">{formatDate(e.at)}</Td>
              <Td>{e.to}</Td>
              <Td>
                <Badge tone={e.status === "sent" ? "lime" : "dark"}>{e.status}</Badge>
                {e.error && <div className="mt-1 text-xs text-gray-700">{e.error}</div>}
              </Td>
              <Td className="font-mono text-xs text-gray-500">{e.resendId ?? "—"}</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
