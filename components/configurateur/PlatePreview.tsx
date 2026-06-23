"use client";

import { useRef, useEffect, useState } from "react";
import type { PlateFormat, PlateMode } from "@/types";
import PlateCanvas from "./PlateCanvas";
import { formatPrice } from "@/lib/formats";
import { usePrice } from "@/components/PriceContext";

interface PlatePreviewProps {
  format: PlateFormat;
  text: string;
  fontId: string;
  plateMode: PlateMode;
}

/** Fit the plate to the stage width, capped by a max height */
function calcScale(format: PlateFormat, stageW: number, maxH: number): number {
  const byW = (stageW * 0.92) / (format.width * 28);
  const byH = maxH / (format.height * 28);
  return Math.min(byW, byH, 3);
}

export default function PlatePreview({ format, text, fontId, plateMode }: PlatePreviewProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(420);
  const [maxH, setMaxH] = useState(260);

  useEffect(() => {
    const measure = () => {
      if (stageRef.current) setStageW(stageRef.current.offsetWidth);
      // Smaller plate when pinned on mobile, larger on desktop
      setMaxH(window.innerWidth >= 1024 ? 280 : 180);
    };
    measure();
    const ro = stageRef.current ? new ResizeObserver(measure) : null;
    if (stageRef.current && ro) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const price = usePrice(format.id, format.price);
  const scale = calcScale(format, stageW, maxH);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-forge-border bg-gradient-to-b from-forge-dark to-forge-black shadow-card">
      {/* warm spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 75% at 50% 0%, rgba(200,169,110,0.14), transparent 60%)" }}
      />

      {/* eyebrow + live dot */}
      <div className="relative flex items-center justify-between px-5 pt-4">
        <span className="font-sans text-[10px] text-forge-gold/80 uppercase tracking-[0.22em]">
          Aperçu en temps réel
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-forge-gold animate-pulse" />
          <span className="font-sans text-[9px] text-forge-dim uppercase tracking-widest">Live</span>
        </span>
      </div>

      {/* stage */}
      <div
        ref={stageRef}
        className="relative flex items-center justify-center px-6 py-10 lg:py-14 min-h-[160px] lg:min-h-[240px]"
      >
        <PlateCanvas
          format={format}
          text={text}
          fontId={fontId}
          plateMode={plateMode}
          scale={scale}
        />
      </div>

      {/* context strip */}
      <div className="relative flex items-center justify-between border-t border-forge-border/70 px-5 py-3.5">
        <span className="font-sans text-xs text-forge-secondary">{format.label}</span>
        <span className="font-display text-lg font-bold text-forge-gold">{formatPrice(price)}</span>
      </div>
    </div>
  );
}
