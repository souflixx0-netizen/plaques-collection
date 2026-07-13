import type { MetadataRoute } from "next";
import { PLATE_FORMATS } from "@/lib/formats";

const BASE = "https://plaques-collection.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const formatPages: MetadataRoute.Sitemap = PLATE_FORMATS.map((f) => ({
    url: `${BASE}/plaques/${f.id}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/catalogue`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/livraison`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/cgv`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [...staticPages, ...formatPages];
}
