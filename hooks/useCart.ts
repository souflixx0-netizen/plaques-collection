"use client";

import { useState, useEffect, useCallback } from "react";
import type { CartItem, PlateFormat } from "@/types";

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

  const addItem = useCallback((format: PlateFormat, text: string, quantity = 1, fontId = "stencil", plateMode: import("@/types").PlateMode = "siv") => {
    setItems((prev) => {
      const key      = `${format.id}__${text}__${fontId}__${plateMode}`;
      const existing = prev.find((i) => i.id === key);
      const next     = existing
        ? prev.map((i) => i.id === key ? { ...i, quantity: i.quantity + quantity } : i)
        : [...prev, { id: key, format, text, fontId, plateMode, quantity, price: format.price }];
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

  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);
  const count = items.reduce((a, i) => a + i.quantity, 0);

  return { items, total, count, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart };
}
