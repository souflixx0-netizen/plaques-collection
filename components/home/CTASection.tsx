"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function CTASection() {
  const { ref, inView } = useInView();

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background photo (placeholder — classic car) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cta-car.jpg')" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0.93) 0%, rgba(10,9,8,0.82) 45%, rgba(10,9,8,0.95) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 38%, rgba(200,169,110,0.12) 0%, transparent 62%)",
        }}
      />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative z-10 max-w-2xl mx-auto text-center reveal"
        style={inView ? { opacity: 1, transform: "none" } : {}}
      >
        <p className="font-sans text-[10px] text-forge-gold tracking-[0.2em] uppercase mb-5">
          Commencez maintenant
        </p>

        <h2 className="heading-display text-4xl md:text-5xl font-bold mb-5 text-balance">
          Votre plaque, en 3 étapes
        </h2>

        <p className="text-forge-secondary font-body text-base leading-relaxed mb-10 max-w-md mx-auto">
          Choisissez votre format, saisissez votre texte, visualisez le rendu en
          temps réel. Fabriquée à la main en Alsace, livrée chez vous.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/configurateur" className="btn-cta">
            Configurer ma plaque
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
          <Link href="/catalogue" className="btn-primary">
            Voir le catalogue
          </Link>
        </div>

        <p className="font-sans text-[10px] text-forge-gold tracking-widest uppercase mt-8 flex items-center justify-center gap-1.5">
          <BadgeCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
          Satisfait ou remboursé
        </p>
      </div>
    </section>
  );
}
