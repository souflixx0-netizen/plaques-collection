"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CONSENT_EVENT, getConsent, type ConsentValue } from "@/lib/consent";

// IDs publics par nature (visibles dans le HTML de tout site qui les utilise).
// Renseignés ici ou via les variables d'environnement Vercel.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-3NNEYTZLWV";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Charge GA4 et le pixel Meta uniquement après consentement, et envoie les
// pages vues à chaque navigation (App Router = navigation client, GA ne voit
// pas les changements de route tout seul).
export default function Analytics() {
  const [consent, setConsentState] = useState<ConsentValue | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setConsentState(getConsent());
    const onChange = (e: Event) =>
      setConsentState((e as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // Page vue à chaque changement de route (no-op tant que les scripts ne sont pas là)
  useEffect(() => {
    if (consent !== "granted") return;
    (window as any).gtag?.("event", "page_view", {
      page_location: window.location.href,
      page_title: document.title,
    });
    (window as any).fbq?.("track", "PageView");
  }, [consent, pathname]);

  if (consent !== "granted") return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
              gtag('event', 'page_view', {
                page_location: window.location.href,
                page_title: document.title,
              });`}
          </Script>
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
}
