"use client";

import { useRef, useEffect, useState } from "react";
import type { PlateFormat, PlateMode } from "@/types";
import PlateCanvas from "./PlateCanvas";
import FontSelector from "./FontSelector";
import { formatPrice } from "@/lib/formats";
import { usePlateInput } from "@/hooks/usePlateInput";
import { usePrice } from "@/components/PriceContext";
import { cn } from "@/lib/utils";

interface StepTwoProps {
  format: PlateFormat;
  text: string;
  fontId: string;
  plateMode: PlateMode;
  onTextChange: (t: string) => void;
  onFontChange: (id: string) => void;
  onModeChange: (m: PlateMode) => void;
}

/** Fit the plate to the full panel width, capped by a max height */
function calcScale(format: PlateFormat, panelW: number, maxH = 250): number {
  const byW = (panelW * 0.9) / (format.width * 28);
  const byH = maxH / (format.height * 28);
  return Math.min(byW, byH, 3);
}

const MODES: { m: PlateMode; title: string; sub: string; ex: string }[] = [
  { m: "siv", title: "SIV", sub: "Format actuel", ex: "AB-123-CD" },
  { m: "fni", title: "FNI", sub: "Ancien format", ex: "1234 AB 75" },
];

export default function StepTwo({
  format, text, fontId, plateMode,
  onTextChange, onFontChange, onModeChange,
}: StepTwoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelW, setPanelW] = useState(640);

  const { mode, formatted, keyType, handleNativeInput, switchMode } =
    usePlateInput({
      initialMode:      plateMode,
      initialFormatted: text,
      onChange:         onTextChange,
      onModeChange:     onModeChange,
    });

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    const measure = () => { if (panelRef.current) setPanelW(panelRef.current.offsetWidth); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(panelRef.current);
    return () => ro.disconnect();
  }, []);

  const price       = usePrice(format.id, format.price);
  const scale       = calcScale(format, panelW);
  const placeholder = mode === "siv" ? "AB-123-CD" : "1234 AB 75";
  const tooShort    = formatted.trim().length === 1;

  return (
    <div className="space-y-8">
      {/* ── Big plate preview, full width on top ── */}
      <div
        ref={panelRef}
        className="relative overflow-hidden rounded-2xl border border-forge-border bg-forge-black"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(115% 80% at 50% 0%, rgba(200,169,110,0.12), transparent 62%)" }}
        />
        <div className="relative flex items-center justify-center px-6 py-14 md:py-16 min-h-[240px]">
          <PlateCanvas
            format={format}
            text={formatted}
            fontId={fontId}
            plateMode={mode}
            scale={scale}
          />
        </div>
        {/* Context strip */}
        <div className="relative flex items-center justify-between border-t border-forge-border/70 px-5 py-3">
          <span className="font-sans text-xs text-forge-secondary">{format.label}</span>
          <span className="font-sans text-sm font-semibold text-forge-gold">{formatPrice(price)}</span>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="space-y-7">

        {/* Type de plaque */}
        <div className="space-y-3">
          <p className="font-sans text-[11px] text-forge-secondary uppercase tracking-widest">
            Type de plaque
          </p>
          <div className="grid grid-cols-2 gap-3">
            {MODES.map((opt) => {
              const active = mode === opt.m;
              return (
                <button
                  key={opt.m}
                  onClick={() => switchMode(opt.m)}
                  className={cn(
                    "rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
                    active
                      ? "border-forge-gold bg-forge-gold/[0.07]"
                      : "border-forge-border bg-forge-dark hover:border-forge-gold/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("font-sans text-sm font-semibold", active ? "text-forge-gold" : "text-forge-text")}>
                      {opt.title}
                    </span>
                    <span className={cn(
                      "w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors",
                      active ? "border-forge-gold" : "border-forge-dim"
                    )}>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-forge-gold" />}
                    </span>
                  </div>
                  <p className="font-sans text-[10px] text-forge-dim mt-1">{opt.sub} · {opt.ex}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Immatriculation */}
        <div className="space-y-3">
          <p className="font-sans text-[11px] text-forge-secondary uppercase tracking-widest">
            Votre immatriculation
          </p>
          <input
            ref={inputRef}
            type="text"
            value={formatted}
            onChange={(e) => handleNativeInput(e.target.value)}
            placeholder={placeholder}
            inputMode={keyType === "digit" ? "numeric" : "text"}
            className="input-terminal w-full text-center text-2xl py-4 tracking-[0.18em] uppercase"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <p className={cn(
            "font-sans text-[10px] text-center transition-colors",
            tooShort ? "text-forge-gold" : "text-forge-dim"
          )}>
            {tooShort
              ? "Encore un caractère pour continuer"
              : mode === "siv"
                ? "2 lettres · 3 chiffres · 2 lettres — tirets automatiques"
                : "1–4 chiffres · 2 lettres · 2 chiffres dépt — espaces automatiques"}
          </p>
        </div>

        {/* Police */}
        <FontSelector selectedId={fontId} onChange={onFontChange} />
      </div>
    </div>
  );
}
