"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function CTASection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-28 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="reveal"
          style={inView ? { opacity: 1, transform: "none" } : {}}
        >
          <div className="gold-line mb-16" />

          <p className="font-mono text-[10px] text-forge-gold tracking-[0.5em] uppercase mb-5">
            Commencez maintenant
          </p>

          <h2 className="heading-display text-4xl md:text-5xl font-bold mb-5 text-balance">
            Votre plaque en 3 étapes
          </h2>

          <p className="text-forge-secondary font-body text-base leading-relaxed mb-10 max-w-md mx-auto">
            Choisissez votre format, saisissez votre texte, visualisez le rendu en temps réel.
            Livraison France sous 3 à 5 jours ouvrés.
          </p>

          <Link href="/configurateur" className="btn-primary">
            Configurer ma plaque
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>

          <p className="font-mono text-[10px] text-forge-gold tracking-widest uppercase mt-6 flex items-center justify-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
            Satisfait ou remboursé
          </p>

          <div className="gold-line mt-16" />
        </div>
      </div>
    </section>
  );
}
