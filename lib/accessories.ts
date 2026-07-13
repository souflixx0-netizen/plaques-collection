import type { PlateFormat } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Accessoires vendus en plus des plaques (rivets aujourd'hui, autres à venir).
//
// Chaque accessoire est modélisé comme un PlateFormat de catégorie "accessoire"
// pour circuler tel quel dans le panier et le checkout (mapping variante dans
// lib/shopifyVariants.ts, prix live via PriceProvider comme les plaques).
// ─────────────────────────────────────────────────────────────────────────────

export interface Accessory {
  format: PlateFormat;
  /** Description courte affichée sur la carte catalogue */
  description: string;
  /** Image produit (CDN Shopify) */
  image: string;
}

export const RIVET_KIT: Accessory = {
  format: {
    id: "acc-rivets-noirs",
    label: "Lot de 2 rivets noirs",
    width: 0,
    height: 0,
    category: "accessoire",
    price: 1.5, // fallback, prix live tiré de Shopify
    lines: 1,
  },
  description:
    "Fixation discrète assortie à la plaque. Pose simple avec une pince à riveter.",
  image: "https://cdn.shopify.com/s/files/1/0943/9979/1430/files/rivet.jpg?v=1767366200",
};

export const ACCESSORIES: Accessory[] = [RIVET_KIT];

export function isAccessory(format: PlateFormat): boolean {
  return format.category === "accessoire";
}

export function getAccessoryByFormatId(id: string): Accessory | undefined {
  return ACCESSORIES.find((a) => a.format.id === id);
}
