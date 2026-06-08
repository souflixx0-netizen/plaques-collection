import type { Metadata } from "next";
import { Suspense } from "react";
import ConfigurateurClient from "./ConfigurateurClient";

export const metadata: Metadata = {
  title: "Configurateur",
  description: "Créez votre plaque d'immatriculation collection en aluminium pochoir en 3 étapes.",
};

export default function ConfigurateurPage() {
  return (
    <Suspense>
      <ConfigurateurClient />
    </Suspense>
  );
}
