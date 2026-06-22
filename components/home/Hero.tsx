"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PlateCanvas from "@/components/configurateur/PlateCanvas";
import { PLATE_FORMATS } from "@/lib/formats";

const HERO_FORMAT   = PLATE_FORMATS.find((f) => f.id === "auto-52x11")!;
const FULL_TEXT     = "AB-123-CD";
const CHAR_DELAY_MS = 110;
const START_DELAY   = 900;

// Resting 3D angle — gives the plate a "product shot" depth
const BASE_TILT = { x: 7, y: -17 };

export default function Hero() {
  const [mounted,   setMounted]   = useState(false);
  const [plateText, setPlateText] = useState("");
  const [tilt,      setTilt]      = useState(BASE_TILT);
  const [stageW,    setStageW]    = useState(520);
  const stageRef = useRef<HTMLDivElement>(null);

  // Mount + measure plate stage
  useEffect(() => {
    setMounted(true);
    const measure = () => { if (stageRef.current) setStageW(stageRef.current.offsetWidth); };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // Letter-by-letter animation
  useEffect(() => {
    if (!mounted) return;
    const t0 = setTimeout(() => {
      let i = 0;
      const tick = setInterval(() => {
        i++;
        setPlateText(FULL_TEXT.slice(0, i));
        if (i >= FULL_TEXT.length) clearInterval(tick);
      }, CHAR_DELAY_MS);
      return () => clearInterval(tick);
    }, START_DELAY);
    return () => clearTimeout(t0);
  }, [mounted]);

  // 3D tilt on hover, layered on top of the resting angle
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r  = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    setTilt({ x: BASE_TILT.x - dy * 5, y: BASE_TILT.y + dx * 7 });
  }
  function handleMouseLeave() { setTilt(BASE_TILT); }

  const plateW = Math.min(stageW - 24, 560);
  const scale  = Math.max(0.2, plateW / (HERO_FORMAT.width * 28));

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-28 lg:py-0">
      {/* Background */}
      <div className="absolute inset-0 bg-forge-black" />

      {/* Warm spotlight behind the plate (right side on desktop) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 72% 45%, rgba(200,169,110,0.10) 0%, transparent 60%)",
        }}
      />
      {/* Soft top-down vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.45) 100%)",
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
          <h1
            className="heading-display text-5xl md:text-6xl lg:text-[68px] font-bold mb-6 text-balance"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all 0.8s ease 0.2s" }}
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
            <Link href="/configurateur" className="btn-cta text-xs w-full sm:w-auto">
              Configurer ma plaque
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link href="/catalogue" className="btn-primary text-xs w-full sm:w-auto">
              Voir le catalogue
            </Link>
          </div>

          {/* Trust row (truthful) */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 justify-center lg:justify-start"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.9s" }}
          >
            {[
              { icon: MapPin,     label: "Fabriqué en Alsace" },
              { icon: BadgeCheck, label: "Satisfait ou remboursé" },
              { icon: ShieldCheck,label: "Paiement sécurisé" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 font-sans text-[11px] text-forge-secondary tracking-wide">
                <Icon className="w-3.5 h-3.5 text-forge-gold" strokeWidth={1.5} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right : plate in perspective with reflection ── */}
        <div
          ref={stageRef}
          className="relative flex justify-center lg:justify-end"
          style={{ perspective: "1400px" }}
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-default"
            style={{
              opacity:    mounted ? 1 : 0,
              transform:  mounted ? "none" : "translateY(28px) scale(0.97)",
              transition: "opacity 0.9s ease 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <div
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === BASE_TILT.x && tilt.y === BASE_TILT.y
                  ? "transform 0.6s ease"
                  : "transform 0.12s ease",
                filter: "drop-shadow(0 30px 45px rgba(0,0,0,0.7))",
              }}
            >
              {mounted && (
                <PlateCanvas format={HERO_FORMAT} text={plateText} fontId="stencil" scale={scale} />
              )}

              {/* Reflection */}
              {mounted && (
                <div
                  aria-hidden
                  className="absolute left-0 right-0 top-full flex justify-center"
                  style={{
                    transform: "scaleY(-1)",
                    opacity: 0.16,
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 55%)",
                    maskImage: "linear-gradient(to bottom, black 0%, transparent 55%)",
                    marginTop: "6px",
                  }}
                >
                  <PlateCanvas format={HERO_FORMAT} text={plateText} fontId="stencil" scale={scale} />
                </div>
              )}
            </div>

            {/* Ground shadow */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-3/4 h-8 rounded-[50%] pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)", filter: "blur(6px)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
