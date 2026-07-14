import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CatalogueClient from "./CatalogueClient";

export const metadata: Metadata = {
  alternates: { canonical: "/catalogue" },
  title: { absolute: "Formats de plaques d'immatriculation collection auto, moto et US" },
  description:
    "Choisissez parmi 23 formats de plaques collection en aluminium brossé : auto (52x11, 45,5x10...), moto (21x13, allongés, carrés) et US. Personnalisation en ligne, fabrication en Alsace.",
};

// searchParams côté serveur : le contenu du catalogue est rendu dans le HTML
// (indexable), là où useSearchParams + Suspense laissait une coquille vide.
export default function CataloguePage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  return (
    <>
      <CatalogueClient initialCat={searchParams.cat} />
      <CatalogueGuide />
    </>
  );
}

// Guide de choix rendu côté serveur, sous la grille : couverture topique du
// catalogue (l'audit SEO relevait ~190 mots de contenu réel sur cette page).
function CatalogueGuide() {
  return (
    <div className="pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="mt-20 border-t border-forge-border pt-14">
          <p className="eyebrow mb-3">Bien choisir</p>
          <h2 className="heading-display text-3xl md:text-4xl font-bold mb-8 text-balance">
            Comment choisir son format de plaque de collection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
            <div>
              <h3 className="font-display text-lg font-bold text-forge-text mb-3">
                Commencez par le véhicule
              </h3>
              <p className="text-forge-secondary font-body text-sm leading-relaxed mb-3">
                Pour une voiture ancienne, trois formats couvrent la quasi-totalité des cas :
                le 52 × 11 cm des berlines et coupés classiques, le 45,5 × 10 cm des faces avant
                étroites, et le 27,5 × 20 cm presque carré des emplacements hauts, celui des 2CV,
                4L et de nombreux coupés anglais. Pour une moto, le choix se fait au style :
                classiques hauts pour les motos vintage et les mobylettes, allongés pour les
                Harley et customs, carrés pour l&apos;enduro, bandeaux étroits pour les café racers.
                Les muscle cars et pickups américains gardent leur support d&apos;origine avec nos
                formats US 30 × 15 et 30 × 17 cm.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-forge-text mb-3">
                Homologué ou format d&apos;époque&nbsp;?
              </h3>
              <p className="text-forge-secondary font-body text-sm leading-relaxed mb-3">
                Quatre de nos formats reprennent les dimensions homologuées par la réglementation
                actuelle : 52 × 11, 45,5 × 10 et 27,5 × 20 cm pour l&apos;auto, 21 × 13 cm pour la
                moto. Ils sont marqués «&nbsp;Homologué route&nbsp;» dans la grille ci-dessus. Les
                autres sont des formats d&apos;époque : sur un véhicule immatriculé en collection
                (carte grise collection), une plaque conforme aux règles de sa première mise en
                circulation reste admise, ce qui permet de retrouver le format d&apos;origine.
                Pour les autres véhicules, ces plaques sont destinées à l&apos;exposition et à la
                décoration.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-forge-text mb-3">
                Une seule matière, la bonne
              </h3>
              <p className="text-forge-secondary font-body text-sm leading-relaxed mb-3">
                Tous nos formats partagent la même fabrication : aluminium brossé, immatriculation
                en écriture pochoir, fond noir. L&apos;aluminium ne rouille pas et garde son aspect
                toute la vie du véhicule, en intérieur comme en extérieur. Chaque plaque est
                fabriquée à la commande dans notre atelier alsacien, expédiée sous 24 à 48 h,
                livrée sans perçage pour préserver la finition. Les rivets de pose sont disponibles
                dans l&apos;onglet Accessoires.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-forge-text mb-3">
                Le doute est permis, pas l&apos;erreur
              </h3>
              <p className="text-forge-secondary font-body text-sm leading-relaxed mb-3">
                Si vous hésitez entre deux formats, mesurez l&apos;emplacement ou la plaque actuelle
                de votre véhicule : chaque fiche format indique les dimensions exactes et les
                véhicules typiques. Et si le rendu ne vous convient pas à la réception, notre
                garantie satisfait ou remboursé de 14 jours s&apos;applique même sur les plaques
                personnalisées : nous refabriquons ou nous remboursons.
              </p>
            </div>
          </div>

          <p className="text-forge-secondary font-body text-sm leading-relaxed mb-10">
            Pour la réglementation en détail (plaque noire, carte grise collection, attestation
            FFVE, formats homologués), consultez notre{" "}
            <Link href="/guide-plaque-collection" className="text-forge-gold hover:underline">
              guide de la plaque de véhicule de collection
            </Link>{" "}
            ou parcourez la <Link href="/faq" className="text-forge-gold hover:underline">FAQ</Link>.
          </p>
        </section>

        {/* Closing CTA */}
        <div className="rounded-2xl border border-forge-border bg-forge-card/60 px-8 py-12 text-center">
          <h2 className="heading-display text-2xl md:text-3xl font-bold mb-3 text-balance">
            Chaque plaque est personnalisable
          </h2>
          <p className="text-forge-secondary font-body mb-7 max-w-md mx-auto leading-relaxed">
            Choisissez votre format ci-dessus, votre texte, et visualisez le rendu en temps réel.
          </p>
          <Link href="#haut-catalogue" className="btn-cta">
            Choisir mon format
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
