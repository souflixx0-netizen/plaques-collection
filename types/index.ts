import type { PlateMode } from "@/lib/plateInput";

export type { PlateMode };

/** Sens de pose de la plaque (portrait = format pivoté de 90°) */
export type PlateOrientation = "paysage" | "portrait";

export interface PlateFormat {
  id: string;
  label: string;
  width: number;
  height: number;
  category: "auto" | "moto" | "us" | "accessoire";
  subcategory?: string;
  homologated?: boolean;
  price: number;
  lines: 1 | 2;
  /** Courte ligne de contexte d'usage affichée sur la carte catalogue */
  usage?: string;
  /** Badge de mise en avant facultatif (ex. "Le plus populaire"), max 1 par carte */
  badge?: string;
}

export interface CartItem {
  id: string;
  format: PlateFormat;
  text: string;
  fontId: string;
  plateMode: PlateMode;
  quantity: number;
  price: number;
  variantId?: string;
  orientation?: PlateOrientation;
}

export interface ConfiguratorState {
  step: 1 | 2 | 3;
  selectedFormat: PlateFormat | null;
  plateText: string;
  plateMode: PlateMode;
  quantity: number;
  selectedFontId: string;
  orientation: PlateOrientation;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
      };
    }>;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: { totalAmount: { amount: string; currencyCode: string } };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { title: string };
          price: { amount: string; currencyCode: string };
        };
      };
    }>;
  };
}
