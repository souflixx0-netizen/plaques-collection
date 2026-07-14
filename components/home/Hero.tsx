"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Stamp, Truck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-28 lg:py-0">
      {/* Background photo (placeholder — vintage car). next/image + priority :
          l'ancien background CSS n'était ni optimisé ni préchargé (LCP 6,6s) */}
      <Image
        src="/images/hero-car.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        quality={70}
        sizes="100vw"
        className="object-cover"
      />
      {/* Horizontal dark gradient — keeps copy readable on the left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,9,8,0.97) 0%, rgba(10,9,8,0.92) 32%, rgba(10,9,8,0.6) 66%, rgba(10,9,8,0.7) 100%)",
        }}
      />
      {/* Vertical fade for depth + smooth transition into the next section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0.55) 0%, transparent 22%, transparent 55%, rgba(10,9,8,0.95) 100%)",
        }}
      />
      {/* Warm spotlight behind the plate */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 48% 55% at 74% 46%, rgba(200,169,110,0.14) 0%, transparent 62%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">

        {/* ── Left : copy ── */}
        <div className="text-center lg:text-left">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-3 mb-7"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(12px)", transition: "all 0.6s ease 0.1s" }}
          >
            <span className="w-8 h-px bg-forge-gold/60" />
            <span className="font-sans text-[11px] text-forge-secondary tracking-[0.2em] uppercase">
              Artisanat français &middot; Depuis 2005
            </span>
          </div>

          {/* Title */}
          {/* LCP : jamais d'animation d'opacité sur le h1, transform uniquement */}
          <h1
            className="heading-display text-5xl md:text-6xl lg:text-[68px] font-bold mb-6 text-balance"
            style={{ transform: mounted ? "none" : "translateY(20px)", transition: "transform 0.8s ease 0.2s" }}
          >
            L&apos;authenticité{" "}
            <span className="text-gold italic">gravée dans l&apos;aluminium</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-forge-secondary text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-9 leading-relaxed"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all 0.7s ease 0.35s" }}
          >
            Plaques de collection en aluminium brossé, fabriquées à la main dans
            notre atelier familial alsacien. Pour les passionnés de belles mécaniques.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(12px)", transition: "all 0.6s ease 0.55s" }}
          >
            <Link href="/catalogue" className="btn-cta text-xs w-full sm:w-auto">
              Configurer ma plaque
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>

          {/* Trust row (truthful) */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 justify-center lg:justify-start"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.9s" }}
          >
            {[
              { icon: MapPin, label: "Fabriqué en Alsace depuis 2005" },
              { icon: Stamp,  label: "Aluminium brossé, écriture pochoir" },
              { icon: Truck,  label: "Expédition sous 48h" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 font-sans text-[11px] text-forge-secondary tracking-wide">
                <Icon className="w-3.5 h-3.5 text-forge-secondary" strokeWidth={1.5} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right : realistic plate render ── */}
        {/* LCP candidate : transform uniquement, l'image reste visible dès le rendu */}
        <div
          className="relative flex justify-center lg:justify-end"
          style={{
            transform:  mounted ? "none" : "translateY(28px) scale(0.97)",
            transition: "transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
        >
          <Image
            src="/images/plates/long-34.png"
            alt="Plaque de collection en aluminium brossé, écriture pochoir — AB-123-CD"
            width={1000}
            height={500}
            priority
            className="w-full max-w-[560px] h-auto plate-float"
            style={{ filter: "drop-shadow(0 28px 40px rgba(0,0,0,0.55))" }}
          />
        </div>
      </div>
    </section>
  );
}
