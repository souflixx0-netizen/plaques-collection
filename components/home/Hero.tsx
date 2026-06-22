"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PlateCanvas from "@/components/configurateur/PlateCanvas";
import { PLATE_FORMATS } from "@/lib/formats";

const HERO_FORMAT   = PLATE_FORMATS.find((f) => f.id === "auto-52x11")!;
const FULL_TEXT     = "AB-123-CD";
const CHAR_DELAY_MS = 110;
const START_DELAY   = 900;

export default function Hero() {
  const [mounted,  setMounted]  = useState(false);
  const [plateText,setPlateText]= useState("");
  const [tilt,     setTilt]     = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mount
  useEffect(() => {
    setMounted(true);
    if (containerRef.current) setContainerW(containerRef.current.offsetWidth);
    const ro = new ResizeObserver(() => {
      if (containerRef.current) setContainerW(containerRef.current.offsetWidth);
    });
    if (containerRef.current) ro.observe(containerRef.current);
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

  // 3D tilt on hover
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r  = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    setTilt({ x: -dy * 5, y: dx * 8 });
  }
  function handleMouseLeave() { setTilt({ x: 0, y: 0 }); }

  // Responsive plate scale
  const plateW = Math.min(containerW - 48, 560);
  const scale  = plateW / (HERO_FORMAT.width * 28);

  return (
    <section className="grain relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-forge-black" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(200,169,110,0.03) 0%, transparent 65%)",
        }}
      />

      {/* Very faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-4 mb-10"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? "none" : "translateY(12px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          <div className="w-8 h-px bg-forge-gold/50" />
          <span className="font-sans text-[10px] text-forge-secondary tracking-[0.2em] uppercase">
            Artisanat français
          </span>
          <div className="w-8 h-px bg-forge-gold/50" />
        </div>

        {/* Title */}
        <h1
          className="heading-display text-5xl md:text-6xl lg:text-[76px] font-bold mb-5 text-balance"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? "none" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          L&apos;authenticité{" "}
          <em className="text-gold not-italic" style={{ fontStyle: "italic" }}>
            gravée dans l&apos;aluminium
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-forge-secondary text-base md:text-lg max-w-md mb-16 leading-relaxed"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? "none" : "translateY(16px)",
            transition: "all 0.7s ease 0.35s",
          }}
        >
          Plaques de collection fabriquées à la main en Alsace &middot; Atelier familial depuis 2005
        </p>

        {/* Plate — hero centerpiece */}
        <div
          ref={wrapRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mb-16 tilt-wrap cursor-default"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? "none" : "translateY(28px) scale(0.97)",
            transition: "opacity 0.9s ease 0.55s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.55s",
          }}
        >
          <div
            className="tilt-inner"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition:
                tilt.x === 0 && tilt.y === 0
                  ? "transform 0.6s ease"
                  : "transform 0.12s ease",
            }}
          >
            {mounted && (
              <PlateCanvas
                format={HERO_FORMAT}
                text={plateText}
                fontId="stencil"
                scale={scale}
              />
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? "none" : "translateY(12px)",
            transition: "all 0.6s ease 0.8s",
          }}
        >
          <Link href="/configurateur" className="btn-primary text-xs">
            Configurer ma plaque
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-12 mt-16"
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 1s" }}
        >
          {[
            [String(PLATE_FORMATS.length), "Formats"],
            ["100%", "Fabriqué en France"],
            ["3–5j", "Livraison"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="font-display text-xl font-bold text-forge-gold">{n}</p>
              <p className="font-sans text-[9px] text-forge-dim uppercase tracking-widest mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-forge-dim/40 animate-bounce">
        <ChevronDown className="w-5 h-5" strokeWidth={1} />
      </div>
    </section>
  );
}
