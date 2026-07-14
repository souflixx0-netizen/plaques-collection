import type { MetadataRoute } from "next";
import { PLATE_FORMATS } from "@/lib/formats";

const BASE = "https://plaques-collection.fr";

// lastModified = date du build : les pages sont statiques, seul un déploiement
// change leur contenu. priority/changefreq supprimés (ignorés par Google).
const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const formatPages: MetadataRoute.Sitemap = PLATE_FORMATS.map((f) => ({
    url: `${BASE}/plaques/${f.id}`,
    lastModified: LAST_MODIFIED,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    `${BASE}/`,
    `${BASE}/catalogue`,
    `${BASE}/guide-plaque-collection`,
    `${BASE}/a-propos`,
    `${BASE}/faq`,
    `${BASE}/contact`,
    `${BASE}/livraison`,
    `${BASE}/cgv`,
    `${BASE}/mentions-legales`,
    `${BASE}/confidentialite`,
  ].map((url) => ({ url, lastModified: LAST_MODIFIED }));

  return [...staticPages, ...formatPages];
}
