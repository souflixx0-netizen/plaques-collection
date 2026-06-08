import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogueClient from "./CatalogueClient";

export const metadata: Metadata = {
  title: "Catalogue",
  description: "Tous nos formats de plaques d'immatriculation collection : Auto, Moto (homologué, carré, étroit, allongé) et US.",
};

export default function CataloguePage() {
  return (
    <Suspense>
      <CatalogueClient />
    </Suspense>
  );
}
