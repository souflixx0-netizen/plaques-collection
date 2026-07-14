import Link from "next/link";
import { Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-forge-border bg-forge-dark mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <p className="font-sans text-[11px] font-bold text-forge-text tracking-[0.17em] uppercase">
                Plaques Collection
              </p>
              <p className="font-sans text-[9px] text-forge-secondary tracking-[0.35em] uppercase mt-1">
                Atelier familial · Fabriqué en Alsace
              </p>
            </div>
            <p className="text-forge-secondary font-body text-sm leading-relaxed max-w-xs">
              Atelier familial depuis 2005. Chaque plaque de collection est
              fabriquée à la main, en Alsace, pour les passionnés de véhicules
              d&apos;époque.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:contact@plaques-collection.fr"
                className="p-2 border border-forge-border rounded text-forge-secondary hover:text-forge-gold hover:border-forge-gold/50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a
                href="https://instagram.com/plaquescollection"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-forge-border rounded text-forge-secondary hover:text-forge-gold hover:border-forge-gold/50 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-sans text-[9px] text-forge-secondary uppercase tracking-[0.2em] mb-5">Boutique</p>
            <ul className="space-y-3">
              {[
                ["Catalogue",     "/catalogue"],
                ["L'Atelier",     "/a-propos"],
                ["FAQ",           "/faq"],
                ["Contact",       "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="font-sans text-xs text-forge-secondary hover:text-forge-text transition-colors tracking-wide">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-sans text-[9px] text-forge-secondary uppercase tracking-[0.2em] mb-5">Légal</p>
            <ul className="space-y-3">
              {[
                ["Mentions légales", "/mentions-legales"],
                ["CGV",              "/cgv"],
                ["Confidentialité",  "/confidentialite"],
                ["Livraison",        "/livraison"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="font-sans text-xs text-forge-secondary hover:text-forge-text transition-colors tracking-wide">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-line mt-12 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-forge-dim font-sans text-[10px]">
          <p>&copy; {new Date().getFullYear()} Plaques Collection</p>
          <p className="tracking-wide">Atelier familial · Fabriqué à la main en Alsace · Satisfait ou remboursé · Depuis 2005</p>
        </div>
      </div>
    </footer>
  );
}
