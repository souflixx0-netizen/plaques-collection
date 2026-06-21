// ─────────────────────────────────────────────────────────────────────────────
// Correspondance format de plaque → variante Shopify
//
// La boutique a UN produit Shopify par format. Pour que le checkout fonctionne,
// chaque id de format (voir lib/formats.ts) doit pointer vers l'identifiant de
// la variante Shopify correspondante, au format GID :
//   "gid://shopify/ProductVariant/1234567890"
//
// Où trouver le GID : Shopify Admin → Produit → Variante. L'id apparaît dans
// l'URL (.../variants/1234567890) ; le GID complet est
// "gid://shopify/ProductVariant/1234567890".
// (On peut aussi les récupérer en masse via l'API Storefront.)
//
// Tant qu'un format n'a pas de variante ici, sa mise au panier reste possible
// mais le checkout signalera qu'il n'est pas encore disponible à la commande.
// ─────────────────────────────────────────────────────────────────────────────

export const VARIANT_BY_FORMAT: Record<string, string> = {
  // ── AUTO ──
  // "auto-52x11":  "gid://shopify/ProductVariant/...",
  // "auto-455x10": "gid://shopify/ProductVariant/...",
  // "auto-275x20": "gid://shopify/ProductVariant/...",

  // ── MOTO — Homologués ──
  // "moto-21x13": "gid://shopify/ProductVariant/...",
  // "moto-17x13": "gid://shopify/ProductVariant/...",
  // "moto-14x13": "gid://shopify/ProductVariant/...",
  // "moto-14x12": "gid://shopify/ProductVariant/...",

  // ── MOTO — Allongés ──
  // "moto-17x10":  "gid://shopify/ProductVariant/...",
  // "moto-175x10": "gid://shopify/ProductVariant/...",
  // "moto-17x105": "gid://shopify/ProductVariant/...",

  // ── MOTO — Carrés ──
  // "moto-85x85": "gid://shopify/ProductVariant/...",
  // "moto-10x10": "gid://shopify/ProductVariant/...",
  // "moto-12x12": "gid://shopify/ProductVariant/...",
  // "moto-17x17": "gid://shopify/ProductVariant/...",

  // ── MOTO — Étroits ──
  // "moto-13x5":  "gid://shopify/ProductVariant/...",
  // "moto-14x4":  "gid://shopify/ProductVariant/...",
  // "moto-18x5":  "gid://shopify/ProductVariant/...",
  // "moto-20x5":  "gid://shopify/ProductVariant/...",
  // "moto-22x6":  "gid://shopify/ProductVariant/...",
  // "moto-24x75": "gid://shopify/ProductVariant/...",
  // "moto-275x7": "gid://shopify/ProductVariant/...",

  // ── US ──
  // "us-30x15": "gid://shopify/ProductVariant/...",
  // "us-30x17": "gid://shopify/ProductVariant/...",
};

export function getVariantId(formatId: string): string | undefined {
  return VARIANT_BY_FORMAT[formatId];
}
