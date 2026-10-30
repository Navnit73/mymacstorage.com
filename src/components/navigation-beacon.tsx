"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Reports in-app navigations to /api/track. The first page load is skipped: it reached the server as a normal
 * request and the proxy already logged it.
 */
export function NavigationBeacon() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    const from = previous.current;
    previous.current = pathname;
    if (from === null || from === pathname || pathname.startsWith("/navnit_admin")) return;

    const body = JSON.stringify({
      path: pathname,
      query: window.location.search,
      referrer: `${window.location.origin}${from}`,
    });
    if (!navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) {
      fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
    }
  }, [pathname]);

  return null;
}
