import type { PlateFormat, PlateOrientation } from "@/types";

// Règle : 1 ligne = les formats larges et étroits
// 2 lignes = les formats carrés/rectangulaires plus "hauts"
const ONE_LINE_IDS = new Set([
  "auto-52x11", "auto-455x10",
  "moto-13x5", "moto-14x4", "moto-18x5", "moto-20x5",
  "moto-22x6", "moto-24x75", "moto-275x7",
]);

// NB : `price` est un PRIX DE SECOURS (fallback). Le prix réellement affiché et
// facturé vient de Shopify via le PriceProvider (composants/PriceContext).
// Ces valeurs sont alignées sur Shopify au 2026-06-21 pour rester correctes même
// avant la réponse réseau ou si Shopify est injoignable.
export const PLATE_FORMATS: PlateFormat[] = [
  // AUTO
  { id: "auto-52x11",  label: "52×11 cm",   width: 52,   height: 11,  category: "auto", homologated: true, price: 24.9, lines: 1, usage: "Berlines et coupés classiques", badge: "Le plus populaire" },
  { id: "auto-455x10", label: "45,5×10 cm", width: 45.5, height: 10,  category: "auto", homologated: true, price: 24.9, lines: 1, usage: "Format court, idéal à l'avant" },
  { id: "auto-275x20", label: "27,5×20 cm", width: 27.5, height: 20,  category: "auto", homologated: true, price: 24.9, lines: 2, usage: "Format carré pour véhicules anciens" },

  // MOTO — Classiques (seul le 21×13 est homologué route)
  { id: "moto-21x13",  label: "21×13 cm",   width: 21,   height: 13,  category: "moto", subcategory: "classique", homologated: true, price: 23.9, lines: 2, usage: "Grosses cylindrées routières", badge: "Recommandé" },
  { id: "moto-17x13",  label: "17×13 cm",   width: 17,   height: 13,  category: "moto", subcategory: "classique", price: 23.9, lines: 2, usage: "Motos et cyclomoteurs vintage", badge: "Format moto classique" },
  { id: "moto-14x13",  label: "14×13 cm",   width: 14,   height: 13,  category: "moto", subcategory: "classique", price: 23.9, lines: 2, usage: "Petites cylindrées et 50 cc" },
  { id: "moto-14x12",  label: "14×12 cm",   width: 14,   height: 12,  category: "moto", subcategory: "classique", price: 19.9, lines: 2, usage: "Mobylettes et cyclos" },

  // MOTO — Allongés
  { id: "moto-17x10",  label: "17×10 cm",   width: 17,   height: 10,  category: "moto", subcategory: "allongé", price: 23.9, lines: 2, usage: "Harley et customs US" },
  { id: "moto-175x10", label: "17,5×10 cm", width: 17.5, height: 10,  category: "moto", subcategory: "allongé", price: 23.9, lines: 2, usage: "Harley et customs US" },
  { id: "moto-17x105", label: "17×10,5 cm", width: 17,   height: 10.5,category: "moto", subcategory: "allongé", price: 23.9, lines: 2, usage: "Harley et customs US" },

  // MOTO — Carrés
  { id: "moto-85x85",  label: "8,5×8,5 cm", width: 8.5,  height: 8.5, category: "moto", subcategory: "carré", price: 23.9, lines: 2, usage: "Enduro, petits deux-roues" },
  { id: "moto-10x10",  label: "10×10 cm",   width: 10,   height: 10,  category: "moto", subcategory: "carré", price: 23.9, lines: 2, usage: "Enduro, cyclos et scooters" },
  { id: "moto-12x12",  label: "12×12 cm",   width: 12,   height: 12,  category: "moto", subcategory: "carré", price: 23.9, lines: 2, usage: "Enduro et motos anciennes" },
  { id: "moto-17x17",  label: "17×17 cm",   width: 17,   height: 17,  category: "moto", subcategory: "carré", price: 23.9, lines: 2, usage: "Enduro et gros trails" },

  // MOTO — Étroits (1 ligne)
  { id: "moto-13x5",   label: "13×5 cm",    width: 13,   height: 5,   category: "moto", subcategory: "étroit", price: 23.9, lines: 1, usage: "Bandeau étroit, look épuré" },
  { id: "moto-14x4",   label: "14×4 cm",    width: 14,   height: 4,   category: "moto", subcategory: "étroit", price: 23.9, lines: 1, usage: "Bandeau étroit, look épuré" },
  { id: "moto-18x5",   label: "18×5 cm",    width: 18,   height: 5,   category: "moto", subcategory: "étroit", price: 23.9, lines: 1, usage: "Customs et café racers" },
  { id: "moto-20x5",   label: "20×5 cm",    width: 20,   height: 5,   category: "moto", subcategory: "étroit", price: 23.9, lines: 1, usage: "Customs et café racers" },
  { id: "moto-22x6",   label: "22×6 cm",    width: 22,   height: 6,   category: "moto", subcategory: "étroit", price: 23.9, lines: 1, usage: "Grands deux-roues, format long" },
  { id: "moto-24x75",  label: "24×7,5 cm",  width: 24,   height: 7.5, category: "moto", subcategory: "étroit", price: 23.9, lines: 1, usage: "Grands deux-roues, format long" },
  { id: "moto-275x7",  label: "27,5×7 cm",  width: 27.5, height: 7,   category: "moto", subcategory: "étroit", price: 23.9, lines: 1, usage: "Grands deux-roues, format long" },

  // US
  { id: "us-30x15",    label: "30×15 cm",   width: 30,   height: 15,  category: "us", price: 24.9, lines: 2, usage: "Muscle cars et pickups US" },
  { id: "us-30x17",    label: "30×17 cm",   width: 30,   height: 17,  category: "us", price: 24.9, lines: 2, usage: "Format américain, esprit Route 66", badge: "Style Route 66" },
];

export const FORMAT_CATEGORIES = {
  auto: { label: "Automobile", description: "Formats homologués et collection pour voitures", icon: "🚗" },
  moto: { label: "Moto & Custom", description: "Tous formats deux-roues : classiques, allongés, carrés, étroits", icon: "🏍" },
  us:   { label: "Format US", description: "Dimensions américaines, esprit Route 66", icon: "🇺🇸" },
  accessoire: { label: "Accessoires", description: "Rivets et accessoires de pose", icon: "🔧" },
} as const;

// `tag` = étiquette d'ambiance affichée à côté du titre de la sous-catégorie
export const MOTO_SUBCATEGORIES = {
  classique: { label: "Classiques", tag: undefined },
  allongé:   { label: "Allongés", tag: "Esprit Harley" },
  carré:     { label: "Carrés", tag: "Enduro & trial" },
  étroit:    { label: "Étroits", tag: undefined },
} as const;

export function getFormatsByCategory(category: PlateFormat["category"]) {
  return PLATE_FORMATS.filter((f) => f.category === category);
}

export function getFormatById(id: string): PlateFormat | undefined {
  return PLATE_FORMATS.find((f) => f.id === id);
}

// ── Orientation portrait/paysage ───────────────────────────────────────────────
// Proposée uniquement sur les motos classiques et allongées : les carrés n'ont
// pas de sens de pose et les bandeaux étroits seraient illisibles en portrait.

export function canRotate(format: PlateFormat): boolean {
  return (
    format.category === "moto" &&
    (format.subcategory === "classique" || format.subcategory === "allongé")
  );
}

/** Le format tel qu'il sera fabriqué : dimensions et libellé pivotés en portrait,
 *  texte sur 3 lignes (une par groupe : "AB-" / "123-" / "CD"). */
export function orientFormat(format: PlateFormat, orientation: PlateOrientation): PlateFormat {
  if (orientation !== "portrait" || !canRotate(format)) return format;
  const [a, b] = format.label.replace(" cm", "").split("×");
  return {
    ...format,
    width: format.height,
    height: format.width,
    label: `${b}×${a} cm`,
    lines: 3,
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
}
