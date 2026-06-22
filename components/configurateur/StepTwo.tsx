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

/** Scale to fill 90% of available width, capped by max height */
function calcScale(format: PlateFormat, colW: number, maxH = 280): number {
  const byW = (colW * 0.90) / (format.width  * 28);
  const byH = maxH           / (format.height * 28);
  return Math.min(byW, byH, 3);
}

export default function StepTwo({
  format, text, fontId, plateMode,
  onTextChange, onFontChange, onModeChange,
}: StepTwoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const colRef   = useRef<HTMLDivElement>(null);
  const [colW, setColW] = useState(380);

  const { mode, formatted, keyType, handleNativeInput, switchMode } =
    usePlateInput({
      initialMode:      plateMode,
      initialFormatted: text,
      onChange:         onTextChange,
      onModeChange:     onModeChange,
    });

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!colRef.current) return;
    const measure = () => { if (colRef.current) setColW(colRef.current.offsetWidth); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(colRef.current);
    return () => ro.disconnect();
  }, []);

  const price       = usePrice(format.id, format.price);
  const scale       = calcScale(format, colW);
  const canContinue = formatted.trim().length >= 2;
  const placeholder = mode === "siv" ? "AB-123-CD" : "1234 AB 75";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="heading-display text-2xl font-bold">Personnalisez</h2>
        <p className="text-forge-secondary font-sans text-xs mt-1">
          {format.label} · <span className="text-forge-gold">{formatPrice(price)}</span>
        </p>
      </div>

      {/* 55 / 45 layout */}
      <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 items-start">

        {/* LEFT — plate preview */}
        <div
          ref={colRef}
          className="flex flex-col items-center justify-center gap-4
                     min-h-[300px] bg-forge-black rounded-xl border border-forge-border
                     py-10 px-6"
        >
          <PlateCanvas
            format={format}
            text={formatted}
            fontId={fontId}
            plateMode={mode}
            scale={scale}
          />

        </div>

        {/* RIGHT — controls */}
        <div className="space-y-5 py-2">

          {/* Mode toggle */}
          <div className="space-y-1.5">
            <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest">Format</p>
            <div className="flex rounded border border-forge-border overflow-hidden">
              {(["siv", "fni"] as PlateMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={cn(
                    "flex-1 py-2.5 font-sans text-[10px] uppercase tracking-widest transition-all duration-200",
                    mode === m
                      ? "bg-forge-gold text-forge-black font-bold"
                      : "bg-forge-card text-forge-dim hover:text-forge-secondary"
                  )}
                >
                  {m === "siv" ? "SIV" : "FNI — Ancien"}
                </button>
              ))}
            </div>
          </div>

          {/* Text input */}
          <div className="space-y-1.5">
            <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest">
              Immatriculation
            </p>
            <input
              ref={inputRef}
              type="text"
              value={formatted}
              onChange={(e) => handleNativeInput(e.target.value)}
              placeholder={placeholder}
              inputMode={keyType === "digit" ? "numeric" : "text"}
              className="input-terminal w-full text-center text-xl tracking-[0.14em] uppercase"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <p className="font-sans text-[10px] text-forge-dim">
              {mode === "siv"
                ? "2 lettres · 3 chiffres · 2 lettres — tirets automatiques"
                : "1–4 chiffres · 2 lettres · 2 chiffres dépt — espaces automatiques"}
            </p>
          </div>

          {/* Font selector */}
          <FontSelector selectedId={fontId} onChange={onFontChange} />

          {!canContinue && formatted.length > 0 && (
            <p className="text-forge-dim font-sans text-[10px] text-center">
              Minimum 2 caractères pour continuer
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
