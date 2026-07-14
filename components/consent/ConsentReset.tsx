"use client";

import { resetConsent } from "@/lib/consent";

// Retrait du consentement aussi simple que son octroi (exigence CNIL) :
// efface le choix mémorisé et recharge, le bandeau réapparaît.
export default function ConsentReset() {
  return (
    <button
      onClick={() => {
        resetConsent();
        window.location.reload();
      }}
      className="text-forge-gold hover:underline"
    >
      modifier mon choix en matière de cookies
    </button>
  );
}
