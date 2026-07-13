"use client";

import type { PlateFormat, PlateMode, PlateOrientation } from "@/types";
import { formatPrice, canRotate, orientFormat } from "@/lib/formats";
import { getFontById } from "@/lib/fonts";
import { RIVET_KIT } from "@/lib/accessories";
import { useCartContext } from "@/components/cart/CartContext";
import { usePrice } from "@/components/PriceContext";
import { Minus, Plus, ShoppingBag, RotateCcw, Check, ChevronLeft, Wrench } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StepThreeProps {
  format: PlateFormat;
  text: string;
  fontId: string;
  plateMode: PlateMode;
  orientation: PlateOrientation;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onReset: () => void;
  onBack: () => void;
}

export default function StepThree({
  format, text, fontId, plateMode, orientation, quantity, onQuantityChange, onReset, onBack,
}: StepThreeProps) {
  const { addItem } = useCartContext();
  const price = usePrice(format.id, format.price);
  const rivetPrice = usePrice(RIVET_KIT.format.id, RIVET_KIT.format.price);
  const [added, setAdded] = useState(false);
  const [withRivets, setWithRivets] = useState(false);
  const font = getFontById(fontId);
  const rotatable = canRotate(format);

  function handleAddToCart() {
    addItem(format, text, quantity, fontId, plateMode, price, orientation);
    // 1 lot de 2 rivets par plaque commandée
    if (withRivets) addItem(RIVET_KIT.format, "", quantity, "stencil", "siv", rivetPrice);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onReset();
    }, 2500);
  }

  const total = (price + (withRivets ? rivetPrice : 0)) * quantity;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="heading-display text-2xl font-bold">Récapitulatif</h2>
          <p className="text-forge-secondary font-sans text-xs mt-1">
            Vérifiez votre commande avant d&apos;ajouter au panier
          </p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest text-forge-secondary hover:text-forge-gold transition-colors shrink-0 mt-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          Modifier
        </button>
      </div>

      {/* Summary */}
      <div className="card divide-y divide-forge-border overflow-hidden">
        {[
          ["Format",   rotatable ? orientFormat(format, orientation).label : format.label],
          ...(rotatable
            ? [["Orientation", orientation === "portrait" ? "Portrait" : "Paysage"]]
            : []),
          ["Texte",    text],
          ["Mode",     plateMode === "siv" ? "SIV — AB-123-CD" : "FNI — Ancien numéro"],
          ["Police",   font.label],
          ["Matière",  "Aluminium brossé · pochoir"],
          ["P. unit.", formatPrice(price)],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between items-center px-5 py-3">
            <span className="font-sans text-[10px] text-forge-dim uppercase tracking-widest">{label}</span>
            <span className={`font-sans text-sm text-forge-text ${label === "Texte" ? "tracking-widest font-bold text-base" : ""} ${label === "P. unit." ? "text-forge-gold" : ""}`}>
              {value}
            </span>
          </div>
        ))}

        {/* Quantity */}
        <div className="flex justify-between items-center px-5 py-4">
          <span className="font-sans text-[10px] text-forge-dim uppercase tracking-widest">Quantité</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-7 h-7 rounded border border-forge-border flex items-center justify-center text-forge-secondary hover:border-forge-gold hover:text-forge-gold transition-colors disabled:opacity-25"
            >
              <Minus className="w-3 h-3" strokeWidth={1.5} />
            </button>
            <span className="font-sans text-sm font-bold text-forge-text w-5 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-7 h-7 rounded border border-forge-border flex items-center justify-center text-forge-secondary hover:border-forge-gold hover:text-forge-gold transition-colors"
            >
              <Plus className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Upsell — rivets de fixation (1 lot de 2 par plaque) */}
        <button
          type="button"
          onClick={() => setWithRivets((v) => !v)}
          className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-forge-gold/[0.04]"
        >
          <span
            className={cn(
              "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
              withRivets ? "bg-forge-gold border-forge-gold" : "border-forge-dim"
            )}
          >
            {withRivets && <Check className="w-3 h-3 text-forge-black" strokeWidth={3} />}
          </span>
          <Wrench className="w-3.5 h-3.5 text-forge-secondary shrink-0" strokeWidth={1.5} />
          <span className="flex-1 min-w-0">
            <span className="block font-sans text-xs text-forge-text">
              Ajouter la fixation : lot de 2 rivets noirs par plaque
            </span>
            <span className="block font-sans text-[10px] text-forge-dim mt-0.5">
              Plaque livrée sans trous · pose à la pince à riveter
            </span>
          </span>
          <span className="font-sans text-xs text-forge-gold shrink-0">
            +{formatPrice(rivetPrice * quantity)}
          </span>
        </button>

        {/* Total */}
        <div className="flex justify-between items-center px-5 py-5">
          <span className="font-sans text-[10px] text-forge-dim uppercase tracking-widest">Total</span>
          <span className="heading-display text-2xl font-bold text-forge-gold">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Reassurance — above the main CTA */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-forge-border pt-6">
        {["Fabrication artisanale", "Expédition 24-48h", "Paiement sécurisé", "Satisfaction ou remboursement"].map((t) => (
          <div key={t} className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-forge-gold shrink-0" strokeWidth={2} />
            <span className="font-sans text-[11px] text-forge-secondary tracking-wide">{t}</span>
          </div>
        ))}
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
          className={`btn-cta flex-1 justify-center transition-all duration-300 ${added ? "!bg-emerald-600 !text-white !shadow-none" : ""}`}
        >
          {added ? <Check className="w-4 h-4" strokeWidth={2} /> : <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />}
          {added ? "Ajouté !" : "Ajouter au panier"}
        </button>
      </div>

    </div>
  );
}
