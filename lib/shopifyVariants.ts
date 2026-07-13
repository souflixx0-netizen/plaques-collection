// ─────────────────────────────────────────────────────────────────────────────
// Correspondance format de plaque → variante Shopify
//
// La boutique PLAQUES COLLECTION a UN produit Shopify par format (1 variante
// "Default Title" chacun). Cette table associe chaque id de format
// (voir lib/formats.ts) au GID de sa variante Shopify, utilisé au checkout.
//
// Généré automatiquement par matching sur les dimensions des titres produits
// (le 2026-06-21). À régénérer si des formats sont ajoutés/retirés côté Shopify.
// ─────────────────────────────────────────────────────────────────────────────

export const VARIANT_BY_FORMAT: Record<string, string> = {
  // ── AUTO ──
  "auto-52x11":  "gid://shopify/ProductVariant/54598286147910",
  "auto-455x10": "gid://shopify/ProductVariant/54598287884614",
  "auto-275x20": "gid://shopify/ProductVariant/54598289916230",

  // ── MOTO — Homologués ──
  "moto-21x13": "gid://shopify/ProductVariant/54980011098438",
  "moto-17x13": "gid://shopify/ProductVariant/54980170711366",
  "moto-14x13": "gid://shopify/ProductVariant/54980238967110",
  "moto-14x12": "gid://shopify/ProductVariant/54980204855622",

  // ── MOTO — Allongés ──
  "moto-17x10":  "gid://shopify/ProductVariant/54980257317190",
  "moto-175x10": "gid://shopify/ProductVariant/54980266852678",
  "moto-17x105": "gid://shopify/ProductVariant/54980268392774",

  // ── MOTO — Carrés ──
  "moto-85x85": "gid://shopify/ProductVariant/54982039929158",
  "moto-10x10": "gid://shopify/ProductVariant/54982046875974",
  "moto-12x12": "gid://shopify/ProductVariant/54982060507462",
  "moto-17x17": "gid://shopify/ProductVariant/54982065029446",

  // ── MOTO — Étroits ──
  "moto-13x5":  "gid://shopify/ProductVariant/54982086885702",
  "moto-14x4":  "gid://shopify/ProductVariant/54982087934278",
  "moto-18x5":  "gid://shopify/ProductVariant/54982088425798",
  "moto-20x5":  "gid://shopify/ProductVariant/54982088917318",
  "moto-22x6":  "gid://shopify/ProductVariant/54982089736518",
  "moto-24x75": "gid://shopify/ProductVariant/54982090293574",
  "moto-275x7": "gid://shopify/ProductVariant/54982090522950",

  // ── US ──
  "us-30x15": "gid://shopify/ProductVariant/54982107726150",
  "us-30x17": "gid://shopify/ProductVariant/54982110085446",

  // ── ACCESSOIRES ──
  // "Lot 2 Rivets noirs pour plaques d'immatriculation collection" (1,50 €)
  "acc-rivets-noirs": "gid://shopify/ProductVariant/55732385055046",
};

export function getVariantId(formatId: string): string | undefined {
  return VARIANT_BY_FORMAT[formatId];
}
