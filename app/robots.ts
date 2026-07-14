import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Pas de disallow /configurateur : la page porte un noindex, et Google
      // doit pouvoir la crawler pour le lire (disallow + noindex s'annulent)
      allow: "/",
    },
    sitemap: "https://plaques-collection.fr/sitemap.xml",
  };
}
