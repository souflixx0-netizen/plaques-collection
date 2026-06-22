"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ = [
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
        a: "En 3 étapes : (1) choisissez votre format parmi les 24 disponibles, (2) saisissez votre texte et prévisualisez le rendu en temps réel, (3) ajustez la quantité et ajoutez au panier. Simple.",
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
        a: "Les plaques personnalisées (avec texte spécifique) ne sont pas éligibles au droit de rétractation standard car ce sont des produits fabriqués sur mesure. En cas de défaut de fabrication, nous remplaçons ou remboursons sans condition.",
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

export default function FAQClient() {
  const [open, setOpen] = useState<string | null>(null);

  function toggle(key: string) {
    setOpen((prev) => (prev === key ? null : key));
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-xs text-forge-gold tracking-[0.4em] uppercase mb-3">
            Questions fréquentes
          </p>
          <h1 className="heading-display text-4xl md:text-5xl font-bold mb-3">FAQ</h1>
          <p className="text-forge-muted font-mono text-sm">
            Tout ce que vous voulez savoir sur nos plaques et notre atelier.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {FAQ.map((section) => (
            <div key={section.category}>
              <h2 className="font-mono text-xs text-forge-gold uppercase tracking-widest mb-4">
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div
                      key={key}
                      className={cn(
                        "card-forge rounded-lg transition-all duration-200",
                        isOpen && "border-forge-gold/40"
                      )}
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span
                          className={cn(
                            "font-display text-base font-semibold transition-colors duration-200",
                            isOpen ? "text-forge-gold" : "text-forge-text"
                          )}
                        >
                          {item.q}
                        </span>
                        <ChevronDown
                          className={cn(
                            "flex-shrink-0 w-4 h-4 mt-0.5 text-forge-muted transition-transform duration-200",
                            isOpen && "rotate-180 text-forge-gold"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          isOpen ? "max-h-96" : "max-h-0"
                        )}
                      >
                        <p className="px-5 pb-5 text-forge-muted text-sm leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 card-forge rounded-xl p-8 text-center">
          <h3 className="heading-display text-xl font-bold mb-2">Pas trouvé votre réponse ?</h3>
          <p className="text-forge-muted text-sm mb-5">
            Notre équipe répond en moins de 24h.
          </p>
          <a href="mailto:contact@plaques-collection.fr" className="btn-outline">
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}
