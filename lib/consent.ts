// Consentement cookies (CNIL) : la mesure d'audience (GA4) et le pixel Meta ne
// se chargent qu'après acceptation explicite. Le choix est stocké en
// localStorage et diffusé via un CustomEvent pour charger sans recharger la page.

export type ConsentValue = "granted" | "denied";

const KEY = "pc_consent";
export const CONSENT_EVENT = "pc-consent";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* stockage indisponible : le bandeau réapparaîtra */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

export function resetConsent() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* rien à faire */
  }
}
