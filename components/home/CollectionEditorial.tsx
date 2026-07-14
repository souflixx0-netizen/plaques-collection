import Link from "next/link";
import { PLATE_FORMATS } from "@/lib/formats";

// Section éditoriale (serveur, sans animation) : couverture topique de
// l'accueil — l'audit SEO relevait ~200 mots de contenu réel sur la page.
export default function CollectionEditorial() {
  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">La plaque de collection</p>
            <h2 className="heading-display text-3xl md:text-4xl font-bold text-balance mb-6">
              Le fond noir, dans les règles de l&apos;art
            </h2>
            <p className="text-forge-secondary font-body text-sm leading-relaxed mb-4">
              La plaque à fond noir est celle que portaient toutes les voitures françaises
              jusqu&apos;en 1993. Aujourd&apos;hui, la réglementation la réserve aux véhicules
              immatriculés en collection : la mention «&nbsp;véhicule de collection&nbsp;» sur la
              carte grise autorise le fond noir sur la voie publique, et permet même de retrouver
              les dimensions d&apos;époque de votre plaque d&apos;origine. Pour les autres véhicules,
              nos plaques habillent l&apos;exposition, le garage ou les rassemblements.
            </p>
            <p className="text-forge-secondary font-body text-sm leading-relaxed">
              Notre{" "}
              <Link href="/guide-plaque-collection" className="text-forge-gold hover:underline">
                guide de la plaque de véhicule de collection
              </Link>{" "}
              détaille la réglementation : conditions de la carte grise collection, attestation
              FFVE, formats homologués et formats d&apos;époque.
            </p>
          </div>
          <div className="lg:pt-14">
            <p className="text-forge-secondary font-body text-sm leading-relaxed mb-4">
              Du 52 × 11 cm des berlines classiques au 10 × 10 cm des enduros, notre{" "}
              <Link href="/catalogue" className="text-forge-gold hover:underline">
                catalogue de {PLATE_FORMATS.length} formats
              </Link>{" "}
              couvre les voitures anciennes, les motos de toutes les époques et les véhicules
              américains. Quatre formats reprennent les dimensions homologuées actuelles, les
              autres reproduisent les tailles que portaient réellement les véhicules avant
              l&apos;uniformisation.
            </p>
            <p className="text-forge-secondary font-body text-sm leading-relaxed mb-4">
              Toutes partagent la même fabrication : aluminium brossé qui ne rouille pas,
              immatriculation en écriture pochoir, plaque livrée sans perçage et fabriquée à la
              commande dans notre atelier alsacien, expédiée sous 24 à 48 heures. Depuis 2005,
              chaque plaque qui sort de l&apos;atelier est couverte par notre garantie satisfait
              ou remboursé de 14 jours, y compris sur les produits personnalisés.
            </p>
            <p className="text-forge-secondary font-body text-sm leading-relaxed">
              Une question sur la pose, les délais ou la personnalisation ? La{" "}
              <Link href="/faq" className="text-forge-gold hover:underline">FAQ</Link>{" "}
              y répond, et l&apos;atelier reste joignable par{" "}
              <Link href="/contact" className="text-forge-gold hover:underline">email</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
