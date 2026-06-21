import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartContext";
import { PriceProvider } from "@/components/PriceContext";

export const metadata: Metadata = {
  title: {
    default: "Plaques Collection — Plaques d'immatriculation aluminium pochoir",
    template: "%s | Plaques Collection",
  },
  description:
    "Plaques d'immatriculation collection en aluminium pochoir, fabriquées en France. Auto, moto, US — tous formats sur mesure.",
  keywords: ["plaque immatriculation", "collection", "aluminium", "pochoir", "France", "moto", "custom"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://plaques-collection.fr",
    siteName: "Plaques Collection",
    title: "Plaques Collection — L'atelier métallurgique français",
    description: "Plaques d'immatriculation collection en aluminium pochoir artisanal.",
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
