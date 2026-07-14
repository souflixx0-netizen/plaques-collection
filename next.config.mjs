/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.shopify.com"],
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
