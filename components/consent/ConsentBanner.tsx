"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

// Bandeau de consentement (CNIL) : accepter et refuser ont la même visibilité,
// le choix est mémorisé, modifiable depuis /confidentialite.
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  function choose(value: "granted" | "denied") {
    setConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-forge-border bg-forge-dark px-4 py-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
        <p className="flex-1 font-sans text-xs text-forge-secondary leading-relaxed">
          Nous utilisons des cookies de mesure d&apos;audience (Google Analytics) et de
          publicité (Meta) pour comprendre l&apos;usage du site et améliorer la boutique.
          Votre choix est modifiable à tout moment.{" "}
          <Link href="/confidentialite" className="text-forge-gold hover:underline">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => choose("denied")}
            className="btn-primary py-2.5 px-5 text-[11px]"
          >
            Refuser
          </button>
          <button
            onClick={() => choose("granted")}
            className="btn-cta py-2.5 px-5 text-[11px]"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
