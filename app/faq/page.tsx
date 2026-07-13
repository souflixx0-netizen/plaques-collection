import type { Metadata } from "next";
import FAQClient from "./FAQClient";
import { FAQ_SECTIONS } from "@/lib/faqData";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description: "Questions fréquentes sur nos plaques d'immatriculation collection en aluminium pochoir.",
};

// Données structurées FAQPage : questions/réponses éligibles aux résultats enrichis
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_SECTIONS.flatMap((s) =>
    s.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <FAQClient />
    </>
  );
}
