"use client";

import { useState, useCallback } from "react";
import type { ConfiguratorState, PlateFormat, PlateMode, PlateOrientation } from "@/types";
import { DEFAULT_FONT_ID } from "@/lib/fonts";

const INITIAL: ConfiguratorState = {
  step: 1,
  selectedFormat: null,
  plateText: "",
  plateMode: "siv",
  quantity: 1,
  selectedFontId: DEFAULT_FONT_ID,
  orientation: "paysage",
};

export function useConfigurator() {
  const [state, setState] = useState<ConfiguratorState>(INITIAL);

  const selectFormat = useCallback((format: PlateFormat) => {
    setState((s) => ({ ...s, selectedFormat: format, step: 1, orientation: "paysage" }));
  }, []);

  const setOrientation = useCallback((orientation: PlateOrientation) => {
    setState((s) => ({ ...s, orientation }));
  }, []);

  /** Store the already-formatted plate text (formatting done in StepTwo) */
  const setPlateText = useCallback((formatted: string) => {
    setState((s) => ({ ...s, plateText: formatted }));
  }, []);

  const setPlateMode = useCallback((mode: PlateMode) => {
    setState((s) => ({ ...s, plateMode: mode, plateText: "" }));
  }, []);

  const setFont = useCallback((fontId: string) => {
    setState((s) => ({ ...s, selectedFontId: fontId }));
  }, []);

  const setQuantity = useCallback((quantity: number) => {
    setState((s) => ({ ...s, quantity: Math.max(1, quantity) }));
  }, []);

  const nextStep = useCallback(() => {
    setState((s) => {
      if (s.step === 1 && s.plateText.trim().length < 2) return s;
      return { ...s, step: Math.min(2, s.step + 1) as ConfiguratorState["step"] };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((s) => ({ ...s, step: Math.max(1, s.step - 1) as ConfiguratorState["step"] }));
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return {
    state,
    selectFormat, setPlateText, setPlateMode, setOrientation,
    setFont, setQuantity, nextStep, prevStep, reset,
  };
}
