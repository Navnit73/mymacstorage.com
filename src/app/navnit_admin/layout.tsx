import type { Metadata } from "next";
import { APP_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `Admin | ${APP_NAME}`, template: `%s | Admin | ${APP_NAME}` },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: LayoutProps<"/navnit_admin">) {
  return <div className="flex min-h-full flex-1 flex-col bg-gray-50">{children}</div>;
}
