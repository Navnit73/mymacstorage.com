"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_PRICE, type LocalPrice } from "@/lib/pricing";

const PriceContext = createContext<LocalPrice>(DEFAULT_PRICE);

/**
 * Looks up the visitor's price once and shares it with every <Price /> on the page. The server-rendered HTML carries
 * the USD price; non-US visitors see it swap to their own as soon as /api/price answers.
 */
export function PriceProvider({ children }: { children: ReactNode }) {
  const [price, setPrice] = useState(DEFAULT_PRICE);

  useEffect(() => {
    const controller = new AbortController();
    let timeZone = "";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      // No time zone is fine: the country header alone decides.
    }
    fetch(`/api/price?tz=${encodeURIComponent(timeZone)}`, { signal: controller.signal, cache: "no-store" })
      .then((response) => (response.ok ? (response.json() as Promise<LocalPrice>) : null))
      .then((next) => next?.text && setPrice(next))
      .catch(() => {
        // Keep the USD price: a failed lookup must never leave the page without one.
      });
    return () => controller.abort();
  }, []);

  return <PriceContext value={price}>{children}</PriceContext>;
}

export function usePrice() {
  return useContext(PriceContext);
}

/** The visitor's price as text, e.g. "₹599". */
export function Price() {
  return <>{usePrice().text}</>;
}
