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

// ── Paragraphe signature par format ──────────────────────────────────────────
// Rédigé à la main, un texte réellement distinct par page : c'est ce qui
// différencie les 23 pages entre elles (l'audit SEO 2026-07-14 mesurait
// 90-98% de similarité entre pages proches quand tout était généré).
const STORIES: Record<string, string> = {
  // AUTO
  "auto-52x11":
    "C'est le format que tout le monde a en tête quand on pense plaque ancienne : long, fin, parfaitement proportionné pour les malles arrière des berlines françaises, des DS aux 504, et pour les coupés qui leur ont succédé. Si votre voiture est immatriculée en collection et que vous ne voulez qu'une seule référence pour l'avant et l'arrière, c'est celle-ci. C'est aussi, sans surprise, la plaque la plus demandée de l'atelier.",
  "auto-455x10":
    "Quarante-cinq centimètres et demi au lieu de cinquante-deux : la différence paraît mince, elle change tout sur une face avant étroite. Ce format court est né pour les pare-chocs fins et les calandres serrées des voitures des années 50 à 70, où une plaque pleine longueur déborderait. On le retrouve souvent à l'avant, associé à un 52 × 11 cm à l'arrière ; les petites italiennes et anglaises l'adoptent volontiers aux deux extrémités.",
  "auto-275x20":
    "Presque carrée, cette plaque appartient aux emplacements hauts : la porte de malle d'une 2CV, l'arrière d'une 4L, le hayon d'un vieux break ou le support arrière d'un cabriolet anglais. Le texte s'y écrit sur deux lignes, comme à l'époque. Si l'emplacement de votre ancienne est plus haut que large, c'est ce format qu'il vous faut, en dimensions homologuées de surcroît.",

  // MOTO — classiques
  "moto-21x13":
    "Le 21 × 13 cm est l'unique format moto homologué par la réglementation actuelle : c'est lui que portent toutes les motos modernes, et c'est le choix de raison pour une grosse cylindrée de collection qui roule régulièrement. Sur une routière des années 70 ou 80, il reste discret tout en offrant deux lignes bien lisibles. Il se commande aussi en pose verticale pour les supports étroits.",
  "moto-17x13":
    "Quatre centimètres de moins qu'un format moderne, et toute l'allure d'époque : ce 17 × 13 cm est le format que portaient la plupart des motos et cyclomoteurs français avant l'uniformisation des dimensions. Sur une restauration des années 60 ou 70, il remet la silhouette d'origine à sa place, là où une plaque moderne paraît toujours trop grande. C'est le choix le plus naturel pour une moto immatriculée en collection.",
  "moto-14x13":
    "Taillé pour les petites cylindrées : 50 cm³, 125 et cyclomoteurs des années 60 à 80. Sur un petit garde-boue, un format plus grand mangerait la ligne de la machine ; celui-ci s'y pose comme une évidence. Deux lignes de texte, hauteur généreuse, largeur contenue : les proportions exactes des plaques que montaient les concessionnaires de l'époque.",
  "moto-14x12":
    "Le format des mobylettes et des cyclos, celui qu'on revissait sur le garde-boue arrière d'une bleue après l'avoir repeinte. Un centimètre de moins en hauteur que le 14 × 13 cm, pour les supports les plus compacts. De quoi redonner un état civil à une mobylette sortie de grange.",

  // MOTO — allongés
  "moto-17x10":
    "Le format custom par excellence : bas, large, taillé pour les supports horizontaux des Harley et des préparations américaines. Sur un garde-boue plat ou un support latéral, il allonge la ligne au lieu de la casser. Deux lignes de texte compactes, une présence discrète : exactement ce qu'on attend à l'arrière d'un custom.",
  "moto-175x10":
    "Un demi-centimètre de plus que le 17 × 10 cm : la différence ne se voit pas à l'œil nu, mais quand le support existant fait 17,5 cm, elle évite un débord ou un jour disgracieux. Même esprit custom, mêmes proportions basses et larges. Mesurez votre emplacement avant de choisir entre les deux : la bonne plaque est celle qui tombe au millimètre.",
  "moto-17x105":
    "La variante haute du 17 × 10 cm : le demi-centimètre gagné en hauteur aère les deux lignes de texte, utile pour les immatriculations longues ou les supports un peu plus hauts. Sur un custom dont l'emplacement le permet, c'est le compromis entre l'allongé pur et le format classique.",

  // MOTO — carrés
  "moto-85x85":
    "La plus petite plaque du catalogue : 8,5 cm de côté, le format des enduros, des trials et des machines de franchissement où chaque centimètre compte. Sur un garde-boue effilé, elle se fait oublier sans disparaître. Petit format, deux lignes, aucun compromis sur la fabrication.",
  "moto-10x10":
    "Le carré de 10 : l'équilibre des petits deux-roues. Assez compact pour un garde-boue d'enduro ou de scooter vintage, assez grand pour rester lisible sur deux lignes. Si le 8,5 × 8,5 cm vous paraît trop juste pour votre immatriculation, c'est le cran au-dessus qui préserve la même silhouette carrée.",
  "moto-12x12":
    "Un carré généreux, pour les enduros plus routiers et les motos anciennes dont le support accepte un peu plus de surface. Les caractères y respirent, la lecture est franche même sur deux lignes complètes. C'est le carré à choisir quand la lisibilité prime sur la discrétion.",
  "moto-17x17":
    "Le grand carré : 17 cm de côté, pour les gros trails, les side-cars et les machines dont l'arrière porte un vrai support. Il donne à l'immatriculation la même présence qu'une plaque classique, dans une géométrie carrée qu'on ne voit plus sur les véhicules modernes. Un choix de caractère.",

  // MOTO — étroits
  "moto-13x5":
    "Un bandeau de 13 cm, une seule ligne : c'est la plaque réduite à l'essentiel. Sur un café racer ou une préparation épurée, elle souligne la boucle arrière sans rien ajouter. Le texte y court d'un seul tenant, net et sans fioriture.",
  "moto-14x4":
    "Quatre centimètres de haut : le plus fin du catalogue. Ce bandeau est fait pour les machines où la plaque doit presque disparaître : préparations légères, boucles arrière courtes, esprit compétition. Une ligne unique, des caractères compacts, et rien d'autre.",
  "moto-18x5":
    "Le bandeau des customs et des café racers qui veulent une plaque présente mais horizontale, dans le prolongement de la ligne. Les 18 cm laissent l'immatriculation complète s'exprimer sur une ligne sans tasser les caractères. Un classique des préparations soignées.",
  "moto-20x5":
    "Deux centimètres de plus que le 18 × 5 cm : ce bandeau accueille confortablement les immatriculations longues sur une seule ligne. Sur un custom au garde-boue large ou une machine au support horizontal généreux, il garde l'esprit épuré du bandeau sans sacrifier la lisibilité.",
  "moto-22x6":
    "Le bandeau des grands gabarits : 22 cm de long, 6 de haut, pour les gros customs et les motos dont l'arrière réclame une plaque qui s'étire. Le centimètre de hauteur supplémentaire donne aux caractères une vraie assise ; le format reste une ligne, l'allure reste basse.",
  "moto-24x75":
    "Entre le bandeau et la petite plaque auto : 24 cm de long pour 7,5 de haut, une immatriculation parfaitement lisible d'un seul tenant. C'est le format long des grands deux-roues, quand le support autorise une plaque qui a de l'envergure.",
  "moto-275x7":
    "Le plus long des formats moto : 27,5 cm, presque la largeur d'une plaque auto courte, pour 7 cm de haut. Sur un gros custom, il étire l'immatriculation sur une seule ligne, sans rupture. C'est le bandeau ultime, celui qu'on choisit quand la machine peut se le permettre.",

  // US
  "us-30x15":
    "Trente centimètres sur quinze : les proportions des plaques américaines, fidèles au standard 12 × 6 pouces que portent les véhicules US depuis des décennies. Mustang, Camaro, pickups : le support d'origine accueille ce format sans adaptateur ni perçage supplémentaire, avec un fond noir qui remplace élégamment la plaque d'État.",
  "us-30x17":
    "La variante haute du format américain : deux centimètres de plus pour les supports qui les acceptent, et une immatriculation sur deux lignes qui gagne en présence. Sur un pickup ou une caisse carrée des seventies, ce supplément de hauteur assoit la plaque dans l'esprit Route 66.",
};

export function story(f: PlateFormat): string | undefined {
  return STORIES[f.id];
}

/** Bloc réglementaire auto-suffisant (~140 mots) : quoi, pour qui, légalité,
 *  nuance. Fusionne l'ancienne intro légale et la FAQ homologation en un seul
 *  passage citable (recommandation GEO : passage autonome de 134-167 mots). */
function legalBlock(f: PlateFormat): string {
  if (f.homologated) {
    const dimension =
      f.category === "moto"
        ? `Le ${f.label} est aujourd'hui l'unique dimension homologuée pour les motos, fixée par l'arrêté du 9 février 2009.`
        : `Le ${f.label} reprend l'une des dimensions homologuées fixées par l'arrêté du 9 février 2009.`;
    return (
      `Côté réglementation : ${dimension} ` +
      "Sur la voie publique, la plaque à fond noir est réservée aux véhicules dont la carte grise porte la mention « véhicule de collection » ; cette mention s'obtient auprès de l'ANTS, avec une attestation de la FFVE, pour un véhicule de plus de 30 ans conservé dans son état d'origine. " +
      `Sur un véhicule immatriculé en collection, cette plaque ${f.label} se pose donc sans difficulté. ` +
      "Pour un véhicule resté en carte grise normale, elle est destinée à l'exposition, au garage ou aux rassemblements. En cas de doute, vérifiez votre situation au regard de la réglementation en vigueur : notre guide de la plaque de collection détaille chaque cas."
    );
  }
  return (
    `Côté réglementation : le ${f.label} est un format d'époque, antérieur à l'uniformisation des dimensions. ` +
    "La réglementation admet, sur un véhicule immatriculé en collection (mention « véhicule de collection » sur la carte grise, obtenue auprès de l'ANTS avec une attestation FFVE pour un véhicule de plus de 30 ans conservé d'origine), une plaque conforme aux règles applicables à sa date de première mise en circulation : c'est ce qui permet de retrouver le format d'origine " +
    `de votre ${catNoun(f)}. ` +
    "Pour tout autre véhicule, cette plaque est destinée à l'exposition et à la décoration. Pour rouler sans se poser de questions, choisissez l'une de nos dimensions homologuées (52 × 11, 45,5 × 10, 27,5 × 20 ou 21 × 13 cm). En cas de doute, vérifiez votre situation au regard de la réglementation en vigueur."
  );
}

/** Intro : accroche générée depuis les données du format, paragraphe signature
 *  rédigé par format, matière, puis bloc réglementaire citable. */
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

  const matiere =
    f.category === "auto"
      ? "Comme toutes nos plaques auto, elle est réalisée en aluminium brossé avec une écriture en pochoir, fidèle aux plaques d'époque. Le fond noir et les caractères métal donnent à votre ancienne le visage qu'elle avait à sa sortie d'usine."
      : f.category === "moto"
        ? "Comme toutes nos plaques moto, elle est réalisée en aluminium brossé avec une écriture en pochoir. Sur une moto, la plaque se voit encore plus que sur une voiture : c'est souvent le détail qui finit une restauration."
        : "Nos formats US reprennent les dimensions des plaques américaines, pour les muscle cars, pickups et imports qui gardent leur support d'origine. Aluminium brossé, écriture pochoir, fond noir.";

  const signature = STORIES[f.id];
  return signature
    ? [p1, signature, matiere, legalBlock(f)]
    : [p1, matiere, legalBlock(f)];
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
    a:
      "En aluminium brossé haute qualité, avec votre immatriculation en écriture pochoir. Chaque plaque est fabriquée à la commande dans notre atelier alsacien. " +
      (f.category === "auto"
        ? "Le brossé métal et le fond noir profond ne s'altèrent ni au soleil ni au lavage : la plaque tient toute la vie de la voiture."
        : f.category === "moto"
          ? "Exposée aux projections et aux vibrations, une plaque moto vit plus durement qu'une plaque auto : l'aluminium garde son aspect là où d'autres matières marquent."
          : "Le fond noir et les caractères métal remplacent la plaque d'État d'origine sans dénoter sur une carrosserie américaine, et tiennent toute la vie du véhicule."),
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
