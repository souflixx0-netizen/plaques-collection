"use client";

import { useEffect, useRef, useState } from "react";
import type { PlateFormat } from "@/types";
import PlateCanvas from "@/components/configurateur/PlateCanvas";
import { formatPrice } from "@/lib/formats";
import { usePrice } from "@/components/PriceContext";

/** Rendu réel du format (canvas), adapté à la largeur disponible. */
export default function PlateShowcase({ format }: { format: PlateFormat }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(420);
  const price = usePrice(format.id, format.price);

  useEffect(() => {
    const measure = () => {
      if (stageRef.current) setStageW(stageRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scale = Math.min(
    (stageW * 0.9) / (format.width * 28),
    240 / (format.height * 28),
    2.5
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-forge-border bg-gradient-to-b from-forge-dark to-forge-black shadow-card">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 75% at 50% 0%, rgba(200,169,110,0.14), transparent 60%)" }}
      />
      <div
        ref={stageRef}
        className="relative flex items-center justify-center px-6 py-12 min-h-[200px]"
      >
        <PlateCanvas format={format} text="" scale={scale} />
      </div>
      <div className="relative flex items-center justify-between border-t border-forge-border/70 px-5 py-3.5">
        <span className="font-sans text-xs text-forge-secondary">{format.label}</span>
        <span className="font-display text-lg font-bold text-forge-gold">{formatPrice(price)}</span>
      </div>
    </div>
  );
}
