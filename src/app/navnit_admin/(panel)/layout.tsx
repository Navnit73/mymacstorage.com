import { APP_NAME } from "@/lib/site";
import { logoutAction } from "../actions";
import { AdminNav } from "../_components/admin-nav";

// Holds no session read of its own: each page checks the session behind its own Suspense boundary.
export default function PanelLayout({ children }: LayoutProps<"/navnit_admin">) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <span className="font-semibold text-gray-950">
            {APP_NAME} <span className="font-normal text-gray-500">admin</span>
          </span>
          <div className="order-last w-full sm:order-none sm:w-auto sm:flex-1">
            <AdminNav />
          </div>
          <form action={logoutAction} className="ml-auto sm:ml-0">
            <button type="submit" className="rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">{children}</main>
    </>
  );
}
