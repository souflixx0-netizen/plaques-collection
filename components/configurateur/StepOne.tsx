"use client";

import { useState } from "react";
import { PLATE_FORMATS, FORMAT_CATEGORIES, MOTO_SUBCATEGORIES, formatPrice } from "@/lib/formats";
import type { PlateFormat } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import PlateCanvas from "./PlateCanvas";

interface StepOneProps {
  selected: PlateFormat | null;
  onSelect: (f: PlateFormat) => void;
  fontId: string;
}

type Cat = PlateFormat["category"];
const CATS: Cat[] = ["auto", "moto", "us"];

// Constrain both width (120px) and height (56px) so all text is visible
function miniScale(f: PlateFormat): number {
  return Math.min(120 / (f.width * 28), 56 / (f.height * 28), 1);
}

export default function StepOne({ selected, onSelect, fontId }: StepOneProps) {
  const [cat, setCat] = useState<Cat>("auto");

  const formats = PLATE_FORMATS.filter((f) => f.category === cat);
  const subcats = cat === "moto"
    ? (Object.keys(MOTO_SUBCATEGORIES) as Array<keyof typeof MOTO_SUBCATEGORIES>)
    : null;

  return (
    <div className="space-y-7">
      <div>
        <h2 className="heading-display text-2xl font-bold">Choisissez votre format</h2>
        <p className="text-forge-secondary font-mono text-xs mt-1 tracking-wide">
          {PLATE_FORMATS.length} formats disponibles
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-forge-border">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-all duration-200 border-b-2 -mb-px",
              cat === c
                ? "border-forge-gold text-forge-gold"
                : "border-transparent text-forge-dim hover:text-forge-secondary"
            )}
          >
            {FORMAT_CATEGORIES[c].label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {subcats ? (
        <div className="space-y-8">
          {subcats.map((sub) => {
            const sub_formats = formats.filter((f) => f.subcategory === sub);
            return (
              <div key={sub}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-forge-gold uppercase tracking-widest">
                    {MOTO_SUBCATEGORIES[sub]}
                  </span>
                  {sub === "homologué" && (
                    <span className="font-mono text-[9px] border border-forge-gold/30 text-forge-gold px-2 py-0.5 rounded">
                      Homologué
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {sub_formats.map((f) => (
                    <FormatCard key={f.id} format={f} selected={selected?.id === f.id} onSelect={onSelect} fontId={fontId} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {formats.map((f) => (
            <FormatCard key={f.id} format={f} selected={selected?.id === f.id} onSelect={onSelect} fontId={fontId} />
          ))}
        </div>
      )}
    </div>
  );
}

function FormatCard({ format, selected, onSelect, fontId }: {
  format: PlateFormat; selected: boolean; onSelect: (f: PlateFormat) => void; fontId: string;
}) {
  return (
    <button
      onClick={() => onSelect(format)}
      className={cn(
        "card-hover group relative p-4 text-center flex flex-col items-center gap-3 rounded-xl text-left",
        selected && "!border-forge-gold/50 !scale-100"
      )}
    >
      {selected && (
        <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-forge-gold rounded-full flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-forge-black" strokeWidth={3} />
        </span>
      )}
      <div className="flex items-center justify-center h-12">
        <PlateCanvas format={format} text="AB-123-CD" fontId={fontId} scale={miniScale(format)} />
      </div>
      <div>
        <p className="font-mono text-xs font-bold text-forge-text">{format.label}</p>
        <p className="font-mono text-[10px] text-forge-gold mt-0.5">{formatPrice(format.price)}</p>
      </div>
    </button>
  );
}
