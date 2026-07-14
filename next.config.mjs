// ─────────────────────────────────────────────────────────────────────────────
// Redirections 301 des URLs de l'ancienne boutique Shopify (indexées par
// Google avant la bascule DNS). Relevé complet des sitemaps Shopify du
// 2026-07-14. Inertes tant que plaques-collection.fr sert Shopify, actives
// dès que le domaine pointe vers Vercel. L'ordre compte : spécifiques d'abord.
// ─────────────────────────────────────────────────────────────────────────────
const LEGACY_PRODUCT_REDIRECTS = {
  "plaques-collection-noires-aluminium-format-52-x-11-cm": "auto-52x11",
  "plaques-collection-noires-aluminium-format-45-5-x-10-cm": "auto-455x10",
  "plaques-collection-noires-aluminium-format-27-5-x-20cm": "auto-275x20",
  "plaques-collection-noires-aluminium-format-21-x-13cm": "moto-21x13",
  "plaques-collection-noires-aluminium-format-17-x-13cm": "moto-17x13",
  "plaques-collection-noires-aluminium-format-14-x-12cm": "moto-14x12",
  "plaques-collection-noires-aluminium-format-14-x-12cm-1": "moto-14x13",
  "plaques-collection-noires-aluminium-format-17-x-10cm": "moto-17x10",
  "plaques-collection-noires-aluminium-format-17-5-x-10cm": "moto-175x10",
  "plaques-collection-noires-aluminium-format-17-x-10-5cm": "moto-17x105",
  "plaques-collection-noires-aluminium-format-8-5-x-10-5cm-copie": "moto-85x85",
  "plaques-collection-noires-aluminium-format-10-x-10cm": "moto-10x10",
  "plaque-d-immatriculation-collection-moto-aluminium-noir-format-12-x-12-cm": "moto-12x12",
  "plaque-d-immatriculation-collection-moto-aluminium-noir-format-17-x-17-cm": "moto-17x17",
  "plaque-moto-collection-moto-aluminium-format-13-x-5-cm": "moto-13x5",
  "plaque-moto-collection-moto-aluminium-format-13-x-5-cm-copie": "moto-13x5",
  "plaque-moto-collection-moto-aluminium-format-14-x-4-cm-copie": "moto-14x4",
  "plaque-moto-collection-moto-aluminium-format-18-x-5-cm-copie": "moto-18x5",
  "plaque-moto-collection-moto-aluminium-format-20-x-5-cm-copie": "moto-20x5",
  "plaque-moto-collection-moto-aluminium-format-22-x-6-cm-copie": "moto-22x6",
  "plaque-moto-collection-moto-aluminium-format-24-x-7-5-cm-copie": "moto-24x75",
  "plaque-d-immatriculation-collection-moto-aluminium-format-21-x-13-cm-copie-1": "moto-21x13",
  "plaque-d-immatriculation-us-collection-aluminium-format-30-x-15-cm-copie": "us-30x15",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.shopify.com"],
  },
  async redirects() {
    return [
      // Produits Shopify → pages formats
      ...Object.entries(LEGACY_PRODUCT_REDIRECTS).map(([slug, id]) => ({
        source: `/products/${slug}`,
        destination: `/plaques/${id}`,
        permanent: true,
      })),
      { source: "/products/lot-2-rivets-noirs-pour-plaques-d-immatriculation-collection", destination: "/catalogue?cat=accessoire", permanent: true },
      { source: "/products/item-personalization", destination: "/catalogue", permanent: true },
      // Pages Shopify → pages du site
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/a-propos", destination: "/a-propos", permanent: true },
      { source: "/pages/faq", destination: "/faq", permanent: true },
      { source: "/pages/conformite-legale", destination: "/mentions-legales", permanent: true },
      { source: "/pages/mention-legales-cgv", destination: "/cgv", permanent: true },
      // Collections Shopify → catalogue filtré
      { source: "/collections/plaque-auto", destination: "/catalogue?cat=auto", permanent: true },
      { source: "/collections/plaques-moto", destination: "/catalogue?cat=moto", permanent: true },
      { source: "/collections/plaques-format-us", destination: "/catalogue?cat=us", permanent: true },
      { source: "/collections/accessoires", destination: "/catalogue?cat=accessoire", permanent: true },
      // Filets de sécurité pour toute autre URL Shopify résiduelle
      { source: "/products/:path*", destination: "/catalogue", permanent: true },
      { source: "/collections/:path*", destination: "/catalogue", permanent: true },
      { source: "/pages/:path*", destination: "/", permanent: true },
      { source: "/blogs/:path*", destination: "/", permanent: true },
      { source: "/cart", destination: "/catalogue", permanent: true },
      { source: "/account/:path*", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // SAMEORIGIN plutôt que DENY : n'interdit que l'embarquement
          // par des sites tiers (clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Le déploiement *.vercel.app ne doit jamais être indexé : les
        // canoniques pointent vers plaques-collection.fr, ceci est la
        // deuxième sécurité contre le contenu dupliqué
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
