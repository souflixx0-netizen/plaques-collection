"use client";

import { useRef, useEffect } from "react";
import type { PlateFormat, PlateMode, PlateOrientation } from "@/types";
import FontSelector from "./FontSelector";
import { usePlateInput } from "@/hooks/usePlateInput";
import { canRotate, orientFormat } from "@/lib/formats";
import { cn } from "@/lib/utils";
import { RectangleHorizontal, RectangleVertical } from "lucide-react";

interface StepTwoProps {
  format: PlateFormat;
  text: string;
  fontId: string;
  plateMode: PlateMode;
  orientation: PlateOrientation;
  onTextChange: (t: string) => void;
  onFontChange: (id: string) => void;
  onModeChange: (m: PlateMode) => void;
  onOrientationChange: (o: PlateOrientation) => void;
}

const MODES: { m: PlateMode; title: string; sub: string; ex: string }[] = [
  { m: "siv", title: "SIV", sub: "Format actuel", ex: "AB-123-CD" },
  { m: "fni", title: "FNI", sub: "Ancien format", ex: "1234 AB 75" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3.5">
      <span className="h-3.5 w-[2px] rounded-full bg-forge-gold" />
      <h3 className="font-sans text-sm font-medium tracking-wide text-forge-text">{children}</h3>
    </div>
  );
}

export default function StepTwo({
  format, text, fontId, plateMode, orientation,
  onTextChange, onFontChange, onModeChange, onOrientationChange,
}: StepTwoProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mode, formatted, keyType, handleNativeInput, switchMode } =
    usePlateInput({
      initialMode:      plateMode,
      initialFormatted: text,
      onChange:         onTextChange,
      onModeChange:     onModeChange,
    });

  // preventScroll : sans lui, le focus au montage fait défiler la page
  // jusqu'au champ sur mobile (la plaque sticky recouvrait alors les contrôles)
  useEffect(() => { inputRef.current?.focus({ preventScroll: true }); }, []);

  const placeholder = mode === "siv" ? "AB-123-CD" : "1234 AB 75";
  const tooShort    = formatted.trim().length === 1;

  return (
    <div className="space-y-8">
      {/* Step intro */}
      <div>
        <h2 className="heading-display text-2xl font-bold">Personnalisez</h2>
        <p className="text-forge-secondary font-sans text-xs mt-1.5">
          Composez votre plaque, l&apos;aperçu se met à jour en direct.
        </p>
      </div>

      {/* Type de plaque */}
      <div>
        <SectionLabel>Type de plaque</SectionLabel>
        <div className="grid grid-cols-2 gap-3">
          {MODES.map((opt) => {
            const active = mode === opt.m;
            return (
              <button
                key={opt.m}
                onClick={() => switchMode(opt.m)}
                aria-pressed={active}
                className={cn(
                  "rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
                  active
                    ? "border-forge-gold bg-forge-gold/[0.07] shadow-gold-glow"
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
      <div>
        <SectionLabel>Immatriculation</SectionLabel>
        <input
          ref={inputRef}
          type="text"
          value={formatted}
          onChange={(e) => handleNativeInput(e.target.value)}
          aria-label="Votre immatriculation"
          placeholder={placeholder}
          inputMode={keyType === "digit" ? "numeric" : "text"}
          className="input-terminal w-full text-center text-2xl py-4 tracking-[0.18em] uppercase"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <p className={cn(
          "font-sans text-[10px] text-center mt-2 transition-colors",
          tooShort ? "text-forge-gold" : "text-forge-dim"
        )}>
          {tooShort
            ? "Encore un caractère pour continuer"
            : mode === "siv"
              ? "2 lettres · 3 chiffres · 2 lettres — tirets automatiques"
              : "1–4 chiffres · 2 lettres · 2 chiffres dépt — espaces automatiques"}
        </p>
      </div>

      {/* Orientation — motos classiques et allongées uniquement */}
      {canRotate(format) && (
        <div>
          <SectionLabel>Orientation</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { o: "paysage" as const, title: "Paysage", Icon: RectangleHorizontal },
                { o: "portrait" as const, title: "Portrait", Icon: RectangleVertical },
              ]
            ).map(({ o, title, Icon }) => {
              const active = orientation === o;
              return (
                <button
                  key={o}
                  onClick={() => onOrientationChange(o)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
                    active
                      ? "border-forge-gold bg-forge-gold/[0.07] shadow-gold-glow"
                      : "border-forge-border bg-forge-dark hover:border-forge-gold/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("font-sans text-sm font-semibold", active ? "text-forge-gold" : "text-forge-text")}>
                      {title}
                    </span>
                    <Icon
                      className={cn("w-4 h-4", active ? "text-forge-gold" : "text-forge-dim")}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="font-sans text-[10px] text-forge-dim mt-1">
                    {orientFormat(format, o).label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Police */}
      <div>
        <SectionLabel>Police</SectionLabel>
        <FontSelector selectedId={fontId} onChange={onFontChange} />
      </div>
    </div>
  );
}
