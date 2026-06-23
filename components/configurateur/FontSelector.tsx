"use client";

import { useRef, useEffect, useCallback } from "react";
import { PLATE_FONTS, type PlateFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface FontSelectorProps {
  selectedId: string;
  onChange: (id: string) => void;
}

const PREVIEW_TEXT = "AB-123-CD";
const W = 130; // wider canvas so 9-char text always fits
const H = 30;

function FontPreview({ font, active }: { font: PlateFont; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    // Dark background
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 3);
    ctx.fillStyle = "#0e0d0a";
    ctx.fill();

    // Binary-search font size — use actual bounding box + 12% margin
    const maxFW = W * 0.88;
    let lo = 6, hi = 22, best = lo;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      ctx.font = `${font.weight} ${mid}px ${font.cssFamily}`;
      const m   = ctx.measureText(PREVIEW_TEXT);
      const rw  = (m.actualBoundingBoxRight !== undefined && m.actualBoundingBoxRight > 0)
        ? (m.actualBoundingBoxLeft ?? 0) + m.actualBoundingBoxRight
        : m.width;
      (rw * 1.12 <= maxFW) ? (best = mid, lo = mid + 1) : (hi = mid - 1);
    }

    ctx.font          = `${font.weight} ${best}px ${font.cssFamily}`;
    ctx.textAlign     = "center";
    ctx.textBaseline  = "middle";

    // Color
    const grad = ctx.createLinearGradient(0, H * 0.1, 0, H * 0.9);
    if (active) {
      grad.addColorStop(0,   "#e0c880");
      grad.addColorStop(0.5, "#c8a96e");
      grad.addColorStop(1,   "#a88a50");
    } else {
      grad.addColorStop(0,   "#d0d0d0");
      grad.addColorStop(0.5, "#989898");
      grad.addColorStop(1,   "#6a6a6a");
    }

    ctx.shadowColor   = "rgba(0,0,0,0.8)";
    ctx.shadowBlur    = 2;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle     = grad;
    ctx.fillText(PREVIEW_TEXT, W / 2, H / 2);
  }, [font, active]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => { document.fonts.ready.then(draw); }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="rounded-sm flex-shrink-0"
      style={{ width: W, height: H }}
    />
  );
}

export default function FontSelector({ selectedId, onChange }: FontSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="font-sans text-[11px] text-forge-secondary uppercase tracking-widest">Police</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {PLATE_FONTS.map((font) => {
          const active = selectedId === font.id;
          return (
            <button
              key={font.id}
              onClick={() => onChange(font.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-2.5 px-3 py-3.5 rounded-xl border transition-all duration-200",
                active
                  ? "border-forge-gold bg-forge-gold/[0.07]"
                  : "border-forge-border bg-forge-dark hover:border-forge-gold/30"
              )}
            >
              <FontPreview font={font} active={active} />
              <span className={cn(
                "font-sans text-[10px] uppercase tracking-widest text-center leading-tight",
                active ? "text-forge-gold" : "text-forge-dim"
              )}>
                {font.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
