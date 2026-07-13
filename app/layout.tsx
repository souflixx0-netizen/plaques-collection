import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartContext";
import { PriceProvider } from "@/components/PriceContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://plaques-collection.fr"),
  alternates: { canonical: "/" },
  title: {
    default: "Plaques Collection — Plaques d'immatriculation collection en aluminium",
    template: "%s | Plaques Collection",
  },
  description:
    "Plaques d'immatriculation de collection en aluminium, fabriquées à la main en Alsace depuis 2005. Auto, moto, US — tous formats, personnalisables.",
  keywords: ["plaque immatriculation", "collection", "aluminium", "Alsace", "France", "moto", "voiture ancienne", "véhicule d'époque"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://plaques-collection.fr",
    siteName: "Plaques Collection",
    title: "Plaques Collection — Atelier familial alsacien depuis 2005",
    description: "Plaques d'immatriculation de collection fabriquées à la main en Alsace, pour les passionnés de véhicules d'époque.",
  },
};

// Données structurées : boutique en ligne (rendues côté serveur)
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Plaques Collection",
  url: "https://plaques-collection.fr",
  logo: "https://plaques-collection.fr/icon.svg",
  description:
    "Plaques d'immatriculation de collection en aluminium brossé, fabriquées à la main en Alsace depuis 2005.",
  foundingDate: "2005",
  address: { "@type": "PostalAddress", addressRegion: "Alsace", addressCountry: "FR" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@plaques-collection.fr",
    telephone: "+33661191916",
    contactType: "customer service",
    availableLanguage: "French",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <PriceProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </PriceProvider>
      </body>
    </html>
  );
}
