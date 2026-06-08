import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur nos plaques d'immatriculation collection en aluminium pochoir.",
};

export default function FAQPage() {
  return <FAQClient />;
}
