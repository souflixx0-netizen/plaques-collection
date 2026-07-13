import type { Metadata } from "next";
import CatalogueClient from "./CatalogueClient";

export const metadata: Metadata = {
  alternates: { canonical: "/catalogue" },
  title: "Catalogue",
  description: "Tous nos formats de plaques d'immatriculation collection : Auto, Moto (classique, allongé, carré, étroit) et US.",
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
