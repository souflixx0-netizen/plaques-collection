"use client";

import { useState, useCallback } from "react";
import type { PlateMode } from "@/types";
import {
  getRaw, formatPlate, validateChar, getKeyType,
} from "@/lib/plateInput";

interface UsePlateInputOptions {
  initialMode?: PlateMode;
  initialFormatted?: string;
  onChange?: (formatted: string) => void;
  onModeChange?: (mode: PlateMode) => void;
}

export function usePlateInput({
  initialMode = "siv",
  initialFormatted = "",
  onChange,
  onModeChange,
}: UsePlateInputOptions = {}) {
  const [mode, setModeState] = useState<PlateMode>(initialMode);
  // raw = alphanumeric only (no separators), derived from initialFormatted on first mount
  const [raw, setRaw] = useState<string>(() => getRaw(initialFormatted));

  const formatted = formatPlate(raw, mode);
  const keyType   = getKeyType(raw, mode);

  const addChar = useCallback((char: string) => {
    const up = char.toUpperCase();
    setRaw((prev) => {
      if (!validateChar(up, prev, mode)) return prev;
      const next = prev + up;
      const fmt  = formatPlate(next, mode);
      onChange?.(fmt);
      return next;
    });
  }, [mode, onChange]);

  const deleteChar = useCallback(() => {
    setRaw((prev) => {
      if (!prev) return prev;
      const next = prev.slice(0, -1);
      const fmt  = formatPlate(next, mode);
      onChange?.(fmt);
      return next;
    });
  }, [mode, onChange]);

  /** Handle native <input> onChange — re-validate & reformat from scratch */
  const handleNativeInput = useCallback((value: string) => {
    const stripped = value.toUpperCase().replace(/[-\s]/g, "");
    let validRaw = "";
    for (const ch of stripped) {
      if (validateChar(ch, validRaw, mode)) validRaw += ch;
    }
    setRaw(validRaw);
    onChange?.(formatPlate(validRaw, mode));
  }, [mode, onChange]);

  const switchMode = useCallback((newMode: PlateMode) => {
    setModeState(newMode);
    setRaw("");
    onChange?.("");
    onModeChange?.(newMode);
  }, [onChange, onModeChange]);

  return { mode, raw, formatted, keyType, addChar, deleteChar, handleNativeInput, switchMode };
}
