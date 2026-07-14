import type { Metadata } from "next";
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
  return <CatalogueClient initialCat={searchParams.cat} />;
}
