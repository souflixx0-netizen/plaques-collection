import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Outil de personnalisation : coquille vide sans paramètre, pas de valeur SEO
      disallow: "/configurateur",
    },
    sitemap: "https://plaques-collection.fr/sitemap.xml",
  };
}
