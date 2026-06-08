"use client";

import { useCartContext } from "./CartContext";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/formats";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, total, count, isOpen, setIsOpen, removeItem, updateQuantity } = useCartContext();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 bg-forge-black/80 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer */}
      <aside
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
            <ShoppingBag className="w-4 h-4 text-forge-gold" strokeWidth={1.5} />
            <span className="font-mono text-xs tracking-widest uppercase text-forge-text">
              Panier {count > 0 && <span className="text-forge-gold ml-1">({count})</span>}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-forge-secondary hover:text-forge-text transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="w-10 h-10 text-forge-border" strokeWidth={1} />
              <p className="font-mono text-[10px] text-forge-dim uppercase tracking-widest">
                Votre panier est vide
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-14 h-7 bg-[#111] rounded flex items-center justify-center">
                      <span className="font-mono text-[8px] font-bold text-forge-secondary tracking-widest">
                        {item.text}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs font-bold text-forge-text truncate tracking-widest">
                        {item.text}
                      </p>
                      <p className="font-mono text-[9px] text-forge-dim mt-0.5">{item.format.label}</p>
                      <p className="font-mono text-[10px] text-forge-gold mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-forge-dim hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded border border-forge-border flex items-center justify-center text-forge-secondary hover:border-forge-gold hover:text-forge-gold transition-colors"
                    >
                      <Minus className="w-2.5 h-2.5" strokeWidth={1.5} />
                    </button>
                    <span className="font-mono text-xs text-forge-text w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded border border-forge-border flex items-center justify-center text-forge-secondary hover:border-forge-gold hover:text-forge-gold transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5" strokeWidth={1.5} />
                    </button>
                    <span className="ml-auto font-mono text-xs font-bold text-forge-text">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-forge-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-[10px] text-forge-secondary uppercase tracking-widest">Total</span>
              <span className="heading-display text-2xl font-bold text-forge-gold">{formatPrice(total)}</span>
            </div>
            <p className="font-mono text-[9px] text-forge-dim">Livraison calculée à la commande</p>
            <button className="btn-primary w-full justify-center">
              Commander
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
