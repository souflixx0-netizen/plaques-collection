"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useConfigurator } from "@/hooks/useConfigurator";
import StepTwo from "@/components/configurateur/StepTwo";
import StepThree from "@/components/configurateur/StepThree";
import { getFormatById } from "@/lib/formats";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import ReassuranceBar from "@/components/ReassuranceBar";

const STEPS = [
  { n: 1, label: "Personnalisation" },
  { n: 2, label: "Commande" },
];

export default function ConfigurateurClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    state, selectFormat, setPlateText, setPlateMode, setFont,
    setQuantity, nextStep, prevStep, reset,
  } = useConfigurator();

  const { step, selectedFormat, plateText, plateMode, quantity, selectedFontId } = state;

  // Format is chosen on the catalogue. Pre-select it from the URL param
  // (?format=auto-52x11) and start at personalisation. No format = back to catalogue.
  useEffect(() => {
    const formatId = searchParams.get("format");
    const format = formatId ? getFormatById(formatId) : null;
    if (format) selectFormat(format);
    else router.replace("/catalogue");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const canNext = step === 1 && plateText.trim().length >= 2;

  // While redirecting (no valid format), render nothing.
  if (!selectedFormat) return null;

  return (
    <div className="pt-20 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-12 pt-4">
          <p className="font-sans text-[10px] text-forge-gold tracking-[0.2em] uppercase mb-4">
            Configurateur
          </p>
          <h1 className="heading-display text-4xl md:text-5xl font-bold">
            Créez votre plaque
          </h1>
          <p className="font-sans text-[10px] text-forge-dim mt-4 max-w-md mx-auto leading-relaxed">
            Plaques de collection. La pose sur la voie publique est réservée aux
            véhicules immatriculés en collection ; sinon, usage décoratif et exposition.
          </p>
        </div>

        {/* ── Stepper ── */}
        <div className="flex items-center justify-center gap-0 mb-12 select-none">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center">
              {/* Dot + label */}
              <div className="flex flex-col items-center gap-2 px-2">
                <div className={cn("step-dot", {
                  "step-active": step === s.n,
                  "step-done":   step > s.n,
                  "step-idle":   step < s.n,
                })}>
                  {step > s.n
                    ? <Check className="w-4 h-4" strokeWidth={2.5} />
                    : <span>{s.n}</span>
                  }
                </div>
                <span className={cn(
                  "font-sans text-[9px] uppercase tracking-widest whitespace-nowrap",
                  step === s.n  ? "text-forge-gold"
                  : step > s.n  ? "text-forge-secondary"
                  :               "text-forge-secondary/50"
                )}>
                  {s.label}
                </span>
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-20 md:w-28 h-px -mt-5 transition-all duration-500",
                    step > s.n ? "bg-forge-gold/50" : "bg-forge-secondary/20"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="card p-6 md:p-8">
          {step === 1 && (
            <StepTwo
              format={selectedFormat}
              text={plateText}
              fontId={selectedFontId}
              plateMode={plateMode}
              onTextChange={setPlateText}
              onFontChange={setFont}
              onModeChange={setPlateMode}
            />
          )}
          {step === 2 && (
            <StepThree
              format={selectedFormat}
              text={plateText}
              fontId={selectedFontId}
              plateMode={plateMode}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onReset={reset}
              onBack={prevStep}
            />
          )}

          {/* Navigation */}
          {step < 2 && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-forge-border">
              <button
                onClick={() => router.push("/catalogue")}
                className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-forge-secondary hover:text-forge-text transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                Changer de format
              </button>
              <button
                onClick={nextStep}
                disabled={!canNext}
                className={cn(
                  "btn-primary text-[11px] py-3",
                  !canNext && "opacity-30 cursor-not-allowed pointer-events-none"
                )}
              >
                Récapitulatif
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>

        <ReassuranceBar className="mt-16 rounded-lg" />

      </div>
    </div>
  );
}
