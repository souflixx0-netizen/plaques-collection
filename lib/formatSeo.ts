import { PLATE_FORMATS, canRotate, formatPrice } from "./formats";
import type { PlateFormat } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Contenu des pages SEO /plaques/[format].
//
// Chaque page est générée depuis les données réelles du format (dimensions,
// catégorie, homologation, orientation, usage) : le texte varie réellement
// d'une page à l'autre, pas seulement les variables.
// ─────────────────────────────────────────────────────────────────────────────

export function getFormatBySlug(slug: string): PlateFormat | undefined {
  return PLATE_FORMATS.find((f) => f.id === slug);
}

export function formatUrl(f: PlateFormat): string {
  return `/plaques/${f.id}`;
}

const CAT_NOUN: Record<string, string> = {
  auto: "voiture",
  moto: "moto",
  us: "véhicule américain",
};

const CAT_TITLE: Record<string, string> = {
  auto: "auto",
  moto: "moto",
  us: "US",
};

export function catNoun(f: PlateFormat): string {
  return CAT_NOUN[f.category] ?? f.category;
}

// Titre absolu (sans le suffixe "| Plaques Collection" du template) pour
// rester sous ~60 caractères en gardant le mot-clé complet ; Google affiche
// le nom du site séparément dans les résultats.
export function seoTitle(f: PlateFormat): string {
  return `Plaque d'immatriculation collection ${f.label} ${CAT_TITLE[f.category] ?? ""}`.trim();
}

export function seoDescription(f: PlateFormat): string {
  const homolog = f.homologated
    ? "dimensions homologuées route"
    : "format collection";
  return (
    `Plaque d'immatriculation collection ${f.label} pour ${catNoun(f)} : ` +
    `aluminium brossé, écriture pochoir, fond noir, ${homolog}. ` +
    `Personnalisable en ligne, fabriquée en Alsace, dès ${formatPrice(f.price)}.`
  );
}

/** Intro unique : construite à partir des caractéristiques réelles du format. */
export function intro(f: PlateFormat): string[] {
  const [w, h] = [f.width, f.height];
  const ratio = w / h;

  const p1 =
    `La plaque ${f.label} est un format ${
      ratio > 3 ? "long et fin, taillé pour les faces avant et arrière basses" :
      ratio > 1.8 ? "rectangulaire équilibré" :
      ratio > 1.05 ? "compact, presque carré" :
      "carré"
    } destiné aux ${catNoun(f)}s de collection. ` +
    (f.usage ? `On la retrouve typiquement sur : ${f.usage.toLowerCase()}.` : "");

  const p2 =
    f.category === "auto"
      ? "Comme toutes nos plaques auto, elle est réalisée en aluminium brossé avec une écriture en pochoir, fidèle aux plaques d'époque. Le fond noir et les caractères métal donnent à votre ancienne le visage qu'elle avait à sa sortie d'usine."
      : f.category === "moto"
        ? "Comme toutes nos plaques moto, elle est réalisée en aluminium brossé avec une écriture en pochoir. Sur une moto, la plaque se voit encore plus que sur une voiture : c'est souvent le détail qui finit une restauration."
        : "Nos formats US reprennent les dimensions des plaques américaines, pour les muscle cars, pickups et imports qui gardent leur support d'origine. Aluminium brossé, écriture pochoir, fond noir.";

  const p3 = f.homologated
    ? `Le ${f.label} reprend des dimensions homologuées pour la route : sur un véhicule immatriculé en collection (carte grise collection), cette plaque à fond noir peut être posée sur la voie publique. Vérifiez votre situation au regard de la réglementation en vigueur.`
    : `Le ${f.label} est un format collection : il est destiné aux véhicules immatriculés en collection, à l'exposition ou à la décoration. Pour un usage route standard, choisissez un de nos formats homologués.`;

  return [p1, p2, p3];
}

export interface SpecRow {
  label: string;
  value: string;
}

export function specs(f: PlateFormat): SpecRow[] {
  const rows: SpecRow[] = [
    { label: "Dimensions", value: `${f.label} (${f.width} × ${f.height} cm)` },
    { label: "Matière", value: "Aluminium brossé, écriture pochoir" },
    { label: "Fond", value: "Noir, caractères aluminium" },
    { label: "Catégorie", value: f.category === "us" ? "Format US" : f.category === "moto" ? "Moto" : "Automobile" },
    { label: "Texte", value: f.lines === 1 ? "1 ligne" : `${f.lines} lignes` },
    { label: "Statut", value: f.homologated ? "Dimensions homologuées route" : "Format collection / décoratif" },
    { label: "Fixation", value: "Livrée sans trous, rivets noirs en option (1,50 € le lot de 2)" },
    { label: "Fabrication", value: "À la commande, en Alsace, expédiée sous 24-48 h" },
  ];
  if (canRotate(f)) {
    rows.splice(5, 0, {
      label: "Orientation",
      value: "Paysage ou portrait (plaque pivotée, texte sur 3 lignes)",
    });
  }
  return rows;
}

export function faq(f: PlateFormat): { q: string; a: string }[] {
  const items: { q: string; a: string }[] = [];

  items.push({
    q: `Puis-je rouler avec une plaque ${f.label} ?`,
    a: f.homologated
      ? "Sur la voie publique, le fond noir est réservé aux véhicules immatriculés en collection (carte grise collection). Ce format reprend des dimensions homologuées ; il vous appartient de vérifier votre situation au regard de la réglementation."
      : "Ce format est destiné aux véhicules immatriculés en collection, à l'exposition ou à la décoration. Pour un usage route standard, préférez un format homologué (52×11, 45,5×10, 27,5×20 ou 21×13).",
  });

  items.push({
    q: "Comment est fabriquée cette plaque ?",
    a: "En aluminium brossé haute qualité, avec votre immatriculation en écriture pochoir. Elle ne s'altère pas, en intérieur comme en extérieur, et tient toute la vie du véhicule. Chaque plaque est fabriquée à la commande dans notre atelier alsacien.",
  });

  if (canRotate(f)) {
    items.push({
      q: "Peut-on la commander en pose verticale ?",
      a: `Oui. Le ${f.label} se commande en paysage ou en portrait : la plaque est alors pivotée et votre immatriculation passe sur 3 lignes, un groupe de caractères par ligne.`,
    });
  }

  items.push({
    q: "Et si elle ne me convient pas ?",
    a: "Satisfait ou remboursé pendant 14 jours après réception, même sur un produit personnalisé : nous refabriquons ou nous remboursons. C'est notre engagement depuis 2005.",
  });

  return items;
}

/** Formats proches : même sous-catégorie d'abord, puis même catégorie. */
export function relatedFormats(f: PlateFormat, max = 6): PlateFormat[] {
  const sameSub = PLATE_FORMATS.filter(
    (o) => o.id !== f.id && o.category === f.category && o.subcategory === f.subcategory
  );
  const sameCat = PLATE_FORMATS.filter(
    (o) => o.id !== f.id && o.category === f.category && o.subcategory !== f.subcategory
  );
  const others = PLATE_FORMATS.filter((o) => o.id !== f.id && o.category !== f.category);
  return [...sameSub, ...sameCat, ...others].slice(0, max);
}
