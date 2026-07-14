"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartContext } from "./CartContext";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Loader2, Check } from "lucide-react";
import { formatPrice, orientFormat } from "@/lib/formats";
import { getAccessoryByFormatId } from "@/lib/accessories";
import { usePrices } from "@/components/PriceContext";
import { cn } from "@/lib/utils";
import PlateCanvas from "@/components/configurateur/PlateCanvas";
import Image from "next/image";
import type { PlateFormat } from "@/types";

function cartItemScale(format: PlateFormat): number {
  return Math.min(76 / (format.width * 28), 34 / (format.height * 28));
}

export default function CartDrawer() {
  const {
    items, count, isOpen, setIsOpen, removeItem, updateQuantity,
    checkout, isCheckingOut, checkoutError,
  } = useCartContext();

  // Fermeture au clavier (Échap)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  // Prix live (Shopify) ; on retombe sur le prix capturé à l'ajout si pas encore chargé.
  const prices = usePrices();
  const priceOf = (item: (typeof items)[number]) => prices[item.format.id] ?? item.price;
  const total = items.reduce((a, i) => a + priceOf(i) * i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 bg-forge-black/80 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-sm z-50 flex flex-col",
          "bg-forge-dark border-l border-forge-border",
          "transition-transform duration-300 ease-spring",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-forge-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-forge-secondary" strokeWidth={1.5} />
            <span className="font-sans text-xs tracking-widest uppercase text-forge-text">
              Panier {count > 0 && <span className="text-forge-gold ml-1">({count})</span>}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le panier"
            className="min-w-11 min-h-11 -m-2 inline-flex items-center justify-center text-forge-secondary hover:text-forge-text transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <ShoppingBag className="w-10 h-10 text-forge-border" strokeWidth={1} />
              <p className="font-sans text-[10px] text-forge-dim uppercase tracking-widest">
                Votre panier est vide
              </p>
              <Link
                href="/catalogue"
                onClick={() => setIsOpen(false)}
                className="btn-primary py-3 px-6 text-[11px]"
              >
                Voir le catalogue
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const accessory = getAccessoryByFormatId(item.format.id);
                const oriented = orientFormat(item.format, item.orientation ?? "paysage");
                return (
                <li key={item.id} className="card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      {accessory ? (
                        <Image
                          src={accessory.image}
                          alt={item.format.label}
                          width={76}
                          height={50}
                          className="w-[64px] h-[42px] object-cover rounded border border-forge-border"
                        />
                      ) : (
                        <PlateCanvas
                          format={oriented}
                          text={item.text}
                          fontId={item.fontId}
                          plateMode={item.plateMode}
                          scale={cartItemScale(oriented)}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-xs font-bold text-forge-text truncate tracking-widest">
                        {item.text || item.format.label}
                      </p>
                      <p className="font-sans text-[9px] text-forge-dim mt-0.5">
                        {accessory
                          ? "Accessoire"
                          : item.orientation === "portrait"
                            ? `${oriented.label} · Portrait`
                            : item.format.label}
                      </p>
                      <p className="font-sans text-[10px] text-forge-gold mt-1">{formatPrice(priceOf(item))}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Retirer ${item.text || item.format.label} du panier`}
                      className="text-forge-dim hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Diminuer la quantité"
                      className="w-6 h-6 rounded border border-forge-border flex items-center justify-center text-forge-secondary hover:border-forge-gold hover:text-forge-gold transition-colors"
                    >
                      <Minus className="w-2.5 h-2.5" strokeWidth={1.5} aria-hidden="true" />
                    </button>
                    <span aria-live="polite" className="font-sans text-xs text-forge-text w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Augmenter la quantité"
                      className="w-6 h-6 rounded border border-forge-border flex items-center justify-center text-forge-secondary hover:border-forge-gold hover:text-forge-gold transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5" strokeWidth={1.5} aria-hidden="true" />
                    </button>
                    <span className="ml-auto font-sans text-xs font-bold text-forge-text">
                      {formatPrice(priceOf(item) * item.quantity)}
                    </span>
                  </div>
                </li>
                );
              })}
            </ul>
          )}

          {items.length > 0 && (
            <div className="mt-5 pt-5 border-t border-forge-border space-y-3">
              <p className="font-sans text-[10px] text-forge-secondary italic leading-relaxed">
                Chaque plaque est fabriquée à la commande.
              </p>
              <ul className="space-y-1.5">
                {["Fabrication artisanale en Alsace", "Expédition 24-48h", "Paiement sécurisé"].map((t) => (
                  <li key={t} className="flex items-center gap-2 font-sans text-[10px] text-forge-dim">
                    <Check className="w-3 h-3 text-forge-gold shrink-0" strokeWidth={2} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-forge-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="font-sans text-[10px] text-forge-secondary uppercase tracking-widest">Total</span>
              <span className="heading-display text-2xl font-bold text-forge-gold">{formatPrice(total)}</span>
            </div>
            <p className="font-sans text-[9px] text-forge-dim">Livraison calculée à la commande</p>
            {checkoutError && (
              <p role="alert" className="font-sans text-[10px] text-red-400 leading-relaxed">{checkoutError}</p>
            )}
            <button
              onClick={checkout}
              disabled={isCheckingOut}
              className="btn-cta w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <>
                  Redirection…
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                </>
              ) : (
                <>
                  Commander
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </>
              )}
            </button>
            <p className="font-sans text-[9px] text-forge-dim text-center">
              Paiement sécurisé · Satisfait ou remboursé 14 jours
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
