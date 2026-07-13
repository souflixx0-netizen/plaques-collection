"use client";

import { useState, useEffect, useCallback } from "react";
import type { CartItem, PlateFormat, PlateOrientation } from "@/types";
import { createCheckout, isShopifyConfigured, type CartLineInput } from "@/lib/shopify";
import { getVariantId } from "@/lib/shopifyVariants";
import { isAccessory } from "@/lib/accessories";

const CART_KEY = "pc_cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items,  setItems]  = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setItems(loadCart()); }, []);

  const addItem = useCallback((format: PlateFormat, text: string, quantity = 1, fontId = "stencil", plateMode: import("@/types").PlateMode = "siv", price = format.price, orientation: PlateOrientation = "paysage") => {
    setItems((prev) => {
      const key      = `${format.id}__${text}__${fontId}__${plateMode}__${orientation}`;
      const existing = prev.find((i) => i.id === key);
      const next     = existing
        ? prev.map((i) => i.id === key ? { ...i, quantity: i.quantity + quantity } : i)
        : [...prev, { id: key, format, text, fontId, plateMode, quantity, price, orientation }];
      saveCart(next);
      return next;
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => { const n = prev.filter((i) => i.id !== id); saveCart(n); return n; });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      const n = quantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => i.id === id ? { ...i, quantity } : i);
      saveCart(n); return n;
    });
  }, []);

  const clearCart = useCallback(() => { setItems([]); localStorage.removeItem(CART_KEY); }, []);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  /** Build a Shopify cart from the local items and redirect to its checkout. */
  const checkout = useCallback(async () => {
    setCheckoutError(null);

    if (items.length === 0) return;
    if (!isShopifyConfigured) {
      setCheckoutError("Le paiement en ligne n'est pas encore activé. Contactez-nous pour finaliser votre commande.");
      return;
    }

    // Map each cart item to a Shopify variant + carry the personalisation as attributes.
    const lines: CartLineInput[] = [];
    const unmapped: string[] = [];
    for (const i of items) {
      const merchandiseId = getVariantId(i.format.id);
      if (!merchandiseId) { unmapped.push(i.format.label); continue; }
      // Les accessoires n'ont pas de personnalisation à transmettre.
      const attributes = isAccessory(i.format)
        ? undefined
        : [
            { key: "Texte",  value: i.text },
            { key: "Police", value: i.fontId },
            { key: "Format", value: i.format.label },
            { key: "Type",   value: i.plateMode === "siv" ? "SIV (AB-123-CD)" : "FNI (ancien)" },
            ...(i.orientation === "portrait"
              ? [{ key: "Orientation", value: "Portrait (plaque pivotée à 90°)" }]
              : []),
          ];
      lines.push({ merchandiseId, quantity: i.quantity, attributes });
    }

    if (unmapped.length > 0) {
      setCheckoutError(`Format(s) pas encore disponible(s) à la commande en ligne : ${unmapped.join(", ")}.`);
      return;
    }

    setIsCheckingOut(true);
    try {
      const cart = await createCheckout(lines);
      window.location.href = cart.checkoutUrl;
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Le checkout a échoué. Réessayez.");
      setIsCheckingOut(false);
    }
  }, [items]);

  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);
  const count = items.reduce((a, i) => a + i.quantity, 0);

  return {
    items, total, count, isOpen, setIsOpen,
    addItem, removeItem, updateQuantity, clearCart,
    checkout, isCheckingOut, checkoutError,
  };
}
