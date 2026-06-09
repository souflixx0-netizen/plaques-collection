"use client";

import type { PlateFormat, PlateMode } from "@/types";
import PlateCanvas from "./PlateCanvas";
import { formatPrice } from "@/lib/formats";
import { getFontById } from "@/lib/fonts";
import { useCartContext } from "@/components/cart/CartContext";
import { Minus, Plus, ShoppingBag, RotateCcw, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface StepThreeProps {
  format: PlateFormat;
  text: string;
  fontId: string;
  plateMode: PlateMode;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onReset: () => void;
}

export default function StepThree({
  format, text, fontId, plateMode, quantity, onQuantityChange, onReset,
}: StepThreeProps) {
  const { addItem } = useCartContext();
  const [added, setAdded] = useState(false);
  const [recapW, setRecapW] = useState(360);
  const recapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!recapRef.current) return;
    const ro = new ResizeObserver(() => {
      if (recapRef.current) setRecapW(recapRef.current.offsetWidth);
    });
    ro.observe(recapRef.current);
    return () => ro.disconnect();
  }, []);

  // max 400px wide, max 280px tall
  const recapScale = Math.min(
    Math.min(recapW, 400) / (format.width  * 28),
    280                   / (format.height * 28),
    1.5
  );
  const font = getFontById(fontId);

  function handleAddToCart() {
    addItem(format, text, quantity, fontId, plateMode);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onReset();
    }, 2500);
  }

  const total = format.price * quantity;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-display text-2xl font-bold">Récapitulatif</h2>
        <p className="text-forge-secondary font-mono text-xs mt-1">
          Vérifiez votre commande avant d&apos;ajouter au panier
        </p>
      </div>

      {/* Plate — max 400px wide, centred */}
      <div
        ref={recapRef}
        className="flex flex-col items-center gap-3 py-10 px-4 bg-forge-black rounded-xl border border-forge-border"
      >
        <div
          className="flex items-center justify-center"
          style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.8))" }}
        >
          <PlateCanvas
            format={format}
            text={text}
            fontId={fontId}
            plateMode={plateMode}
            scale={recapScale}
            animate
          />
        </div>
        <p className="font-mono text-[9px] text-forge-dim uppercase tracking-widest mt-1">
          Police : {font.label} · {format.lines === 1 ? "1 ligne" : "2 lignes"}
        </p>
      </div>

      {/* Summary */}
      <div className="card divide-y divide-forge-border overflow-hidden">
        {[
          ["Format",   format.label],
          ["Texte",    text],
          ["Mode",     plateMode === "siv" ? "SIV — AB-123-CD" : "FNI — Ancien numéro"],
          ["Matière",  "Aluminium anodisé · Pochoir"],
          ["P. unit.", formatPrice(format.price)],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between items-center px-5 py-3">
            <span className="font-mono text-[10px] text-forge-dim uppercase tracking-widest">{label}</span>
            <span className={`font-mono text-sm text-forge-text ${label === "Texte" ? "tracking-widest font-bold text-base" : ""} ${label === "P. unit." ? "text-forge-gold" : ""}`}>
              {value}
            </span>
          </div>
        ))}

        {/* Quantity */}
        <div className="flex justify-between items-center px-5 py-4">
          <span className="font-mono text-[10px] text-forge-dim uppercase tracking-widest">Quantité</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-7 h-7 rounded border border-forge-border flex items-center justify-center text-forge-secondary hover:border-forge-gold hover:text-forge-gold transition-colors disabled:opacity-25"
            >
              <Minus className="w-3 h-3" strokeWidth={1.5} />
            </button>
            <span className="font-mono text-sm font-bold text-forge-text w-5 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-7 h-7 rounded border border-forge-border flex items-center justify-center text-forge-secondary hover:border-forge-gold hover:text-forge-gold transition-colors"
            >
              <Plus className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center px-5 py-5">
          <span className="font-mono text-[10px] text-forge-dim uppercase tracking-widest">Total</span>
          <span className="heading-display text-2xl font-bold text-forge-gold">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="btn-ghost flex-1 justify-center border border-forge-border rounded py-3 hover:border-forge-gold/40 hover:text-forge-text transition-all duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
          Nouvelle plaque
        </button>
        <button
          onClick={handleAddToCart}
          className={`btn-primary flex-1 justify-center transition-all duration-300 ${added ? "!border-emerald-500 !text-emerald-400 hover:!bg-emerald-500 hover:!text-forge-black" : ""}`}
        >
          {added ? <Check className="w-4 h-4" strokeWidth={2} /> : <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />}
          {added ? "Ajouté !" : "Ajouter au panier"}
        </button>
      </div>

      <p className="text-forge-dim font-mono text-[10px] text-center tracking-wide">
        Fabrication artisanale · Expédition 3–5 jours · France & Europe
      </p>
    </div>
  );
}
