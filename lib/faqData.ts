import { PLATE_FORMATS } from "@/lib/formats";

// Questions/réponses de la FAQ — partagées entre la page (accordéons)
// et les données structurées FAQPage (JSON-LD, SEO).
export const FAQ_SECTIONS = [
  {
    category: "Commande & personnalisation",
    items: [
      {
        q: "Puis-je mettre n'importe quel texte sur ma plaque ?",
        a: "Oui, vous pouvez saisir librement votre texte jusqu'à 10 caractères (lettres, chiffres, tirets, espaces). Nous ne reproduisons pas les logos, drapeaux ou symboles officiels — uniquement le texte que vous saisissez.",
      },
      {
        q: "Les plaques sont-elles homologuées pour circuler ?",
        a: "Ce sont des plaques de collection. Sur la voie publique, le fond noir est réservé aux véhicules immatriculés en collection (carte grise collection) ; pour tout autre véhicule, nos plaques sont destinées à un usage décoratif ou d'exposition. Les formats marqués 'Homologué' reprennent les dimensions officielles, mais il vous appartient de vérifier votre situation au regard de la réglementation en vigueur.",
      },
      {
        q: "Comment se passe le configurateur ?",
        a: `En 3 étapes : (1) choisissez votre format au catalogue parmi les ${PLATE_FORMATS.length} disponibles, (2) personnalisez votre texte, votre police et l'orientation avec l'aperçu en temps réel, (3) ajustez la quantité, ajoutez la fixation si besoin et validez. Simple.`,
      },
    ],
  },
  {
    category: "Matériaux & fabrication",
    items: [
      {
        q: "En quoi sont faites vos plaques ?",
        a: "En aluminium brossé haute qualité, avec une écriture en pochoir. Une matière élégante et robuste, qui ne rouille pas et garde son aspect dans le temps.",
      },
      {
        q: "Est-ce que ça dure dans le temps ?",
        a: "Oui. L'aluminium brossé et l'écriture en pochoir ne s'altèrent pas : votre plaque est faite pour durer toute une vie, aussi bien en intérieur qu'en extérieur.",
      },
      {
        q: "Y a-t-il des trous de fixation ?",
        a: "Non, nos plaques sont livrées sans perçage, pour préserver leur finition. Des rivets de fixation sont disponibles en option (1,50 € la paire).",
      },
    ],
  },
  {
    category: "Livraison & retours",
    items: [
      {
        q: "Quel est le délai de livraison ?",
        a: "Fabrication à la demande en 24 à 48 h, puis expédition selon le transporteur choisi (Colissimo, Chronopost ou Mondial Relay). Le délai et le tarif de livraison s'affichent au moment du paiement.",
      },
      {
        q: "Livrez-vous à l'international ?",
        a: "Oui, nous expédions dans toute l'Europe et dans la plupart des pays. Les tarifs d'expédition sont calculés au panier selon la destination.",
      },
      {
        q: "Puis-je retourner ma commande ?",
        a: "Oui, votre satisfaction est garantie. Même si les plaques personnalisées ne relèvent pas du droit de rétractation légal (ce sont des produits fabriqués sur mesure), nous appliquons depuis toujours une garantie « satisfait ou remboursé » : si votre plaque ne vous convient pas, ou présente le moindre défaut, contactez-nous et nous la refaisons ou vous remboursons. C'est notre engagement depuis 2005.",
      },
    ],
  },
  {
    category: "Paiement & sécurité",
    items: [
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "CB, Visa, Mastercard, American Express, PayPal, et Apple Pay. Tous les paiements sont sécurisés via Shopify Payments (certifié PCI DSS Level 1).",
      },
      {
        q: "Mes données bancaires sont-elles sécurisées ?",
        a: "Absolument. Nous n'hébergeons aucune donnée bancaire. Toutes les transactions passent par Shopify Payments, qui est certifié PCI DSS Level 1, le niveau de sécurité le plus élevé pour les paiements en ligne.",
      },
    ],
  },
];
