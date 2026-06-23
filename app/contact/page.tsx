import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur votre plaque de collection ? Contactez notre atelier.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <p className="font-sans text-xs text-forge-secondary tracking-[0.17em] uppercase mb-3">
            Contact
          </p>
          <h1 className="heading-display text-4xl md:text-5xl font-bold mb-4 text-balance">
            Une question ? On vous répond
          </h1>
          <p className="text-forge-secondary font-body max-w-md mx-auto leading-relaxed">
            Un doute sur un format, une demande spéciale, un suivi de commande ?
            Notre atelier vous répond généralement sous 24 h.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="mailto:contact@plaques-collection.fr"
            className="card-hover p-6 flex flex-col items-center text-center gap-3"
          >
            <Mail className="w-5 h-5 text-forge-secondary" strokeWidth={1.5} />
            <div>
              <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest mb-1">E-mail</p>
              <p className="font-sans text-sm text-forge-text">contact@plaques-collection.fr</p>
            </div>
          </a>

          <a
            href="tel:+33661191916"
            className="card-hover p-6 flex flex-col items-center text-center gap-3"
          >
            <Phone className="w-5 h-5 text-forge-secondary" strokeWidth={1.5} />
            <div>
              <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest mb-1">Téléphone</p>
              <p className="font-sans text-sm text-forge-text">06 61 19 19 16</p>
            </div>
          </a>

          <div className="card p-6 flex flex-col items-center text-center gap-3">
            <MapPin className="w-5 h-5 text-forge-secondary" strokeWidth={1.5} />
            <div>
              <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest mb-1">Atelier</p>
              <p className="font-sans text-sm text-forge-text">Alsace, France</p>
            </div>
          </div>

          <div className="card p-6 flex flex-col items-center text-center gap-3">
            <Clock className="w-5 h-5 text-forge-secondary" strokeWidth={1.5} />
            <div>
              <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest mb-1">Délai de réponse</p>
              <p className="font-sans text-sm text-forge-text">Sous 24 h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
