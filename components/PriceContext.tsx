"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { VARIANT_BY_FORMAT } from "@/lib/shopifyVariants";
import { getVariantPrices, isShopifyConfigured } from "@/lib/shopify";

/** Map { formatId: prix Shopify live }. Vide tant que la requête n'a pas répondu. */
type PriceMap = Record<string, number>;

const PriceContext = createContext<PriceMap>({});

export function PriceProvider({ children }: { children: React.ReactNode }) {
  const [prices, setPrices] = useState<PriceMap>({});

  useEffect(() => {
    if (!isShopifyConfigured) return;
    const entries = Object.entries(VARIANT_BY_FORMAT);
    getVariantPrices(entries.map(([, vid]) => vid))
      .then((byVariant) => {
        const byFormat: PriceMap = {};
        for (const [formatId, variantId] of entries) {
          const p = byVariant[variantId];
          if (p != null) byFormat[formatId] = p;
        }
        setPrices(byFormat);
      })
      .catch(() => { /* on garde les prix de secours (fallback) */ });
  }, []);

  return <PriceContext.Provider value={prices}>{children}</PriceContext.Provider>;
}

/** Prix live d'un format, ou le fallback fourni tant que Shopify n'a pas répondu. */
export function usePrice(formatId: string, fallback: number): number {
  return useContext(PriceContext)[formatId] ?? fallback;
}

/** Map complet des prix live (pour calculer un total). */
export function usePrices(): PriceMap {
  return useContext(PriceContext);
}
