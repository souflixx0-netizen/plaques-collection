"use client";

import { useEffect, useRef, useCallback } from "react";
import type { PlateFormat, PlateMode } from "@/types";
import { getFontById, DEFAULT_FONT_ID } from "@/lib/fonts";
import { getLineSplit } from "@/lib/plateInput";

interface PlateCanvasProps {
  format: PlateFormat;
  text: string;
  fontId?: string;
  plateMode?: PlateMode;
  className?: string;
  scale?: number;
  animate?: boolean;
}

const PX_PER_CM = 28;

// ── Font size binary search ───────────────────────────────────────────────────
function findFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  weight: string,
  family: string,
  maxW: number,
  maxH: number
): number {
  if (!text.trim()) return Math.min(maxH, 60);
  let lo = 6, hi = Math.min(maxH, 220), best = lo;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    ctx.font = `${weight} ${mid}px ${family}`;
    const m = ctx.measureText(text);
    // Use actual bounding box when available (accounts for glyph overhangs & shadow)
    const rw = (m.actualBoundingBoxRight !== undefined && m.actualBoundingBoxRight > 0)
      ? (m.actualBoundingBoxLeft ?? 0) + m.actualBoundingBoxRight
      : m.width;
    // 10% safety margin prevents shadow & sub-pixel rendering from clipping
    (rw * 1.10 <= maxW) ? (best = mid, lo = mid + 1) : (hi = mid - 1);
  }
  return best;
}

// ── Aluminium text ────────────────────────────────────────────────────────────
function drawText(
  ctx: CanvasRenderingContext2D,
  line: string,
  cx: number,
  cy: number,
  fs: number,
  weight: string,
  family: string
) {
  if (!line.trim()) return;
  ctx.font = `${weight} ${fs}px ${family}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const top    = cy - fs * 0.55;
  const bottom = cy + fs * 0.55;

  // Always reset alignment before drawing (safety guard)
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";

  // ── Pass 1 : deboss shadow (purely visual depth, no position shift) ──
  ctx.shadowColor   = "rgba(0,0,0,0.90)";
  ctx.shadowBlur    = Math.max(2, fs * 0.05);
  ctx.shadowOffsetX = Math.max(0.5, fs * 0.015);
  ctx.shadowOffsetY = Math.max(0.5, fs * 0.015); // keep tiny so centering stays accurate

  // High-contrast aluminium gradient : #fff → #888
  const g = ctx.createLinearGradient(0, top, 0, bottom);
  g.addColorStop(0,    "#ffffff");
  g.addColorStop(0.08, "#f0f0f0");
  g.addColorStop(0.22, "#c8c8c8");
  g.addColorStop(0.36, "#e4e4e4");
  g.addColorStop(0.50, "#a0a0a0");
  g.addColorStop(0.64, "#d0d0d0");
  g.addColorStop(0.78, "#909090");
  g.addColorStop(0.90, "#a8a8a8");
  g.addColorStop(1,    "#888888");
  ctx.fillStyle = g;
  ctx.fillText(line, cx, cy);

  // ── Pass 2 : white top-left edge highlight ──
  ctx.shadowColor   = "rgba(255,255,255,0.45)";
  ctx.shadowBlur    = Math.max(1, fs * 0.02);
  ctx.shadowOffsetX = -Math.max(0.3, fs * 0.008);
  ctx.shadowOffsetY = -Math.max(0.3, fs * 0.008);
  ctx.fillStyle     = "rgba(255,255,255,0)";
  ctx.fillText(line, cx, cy);

  // ── Pass 3 : specular top strip ──
  ctx.shadowColor   = "transparent";
  ctx.shadowBlur    = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  const hl = ctx.createLinearGradient(0, top, 0, top + fs * 0.25);
  hl.addColorStop(0, "rgba(255,255,255,0.28)");
  hl.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hl;
  ctx.fillText(line, cx, cy);
}

// ── Main draw ─────────────────────────────────────────────────────────────────
function drawPlate(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  text: string,
  lines: 1 | 2,
  weight: string,
  family: string,
  mode: PlateMode = "siv"
) {
  ctx.clearRect(0, 0, w, h);

  const R  = Math.min(8, h * 0.12);
  // Border width = 5% of height, clamped 4–8px
  const bw = Math.max(4, Math.min(8, h * 0.05));
  const iR = Math.max(2, R - bw); // inner corner radius

  // ── Outer aluminium border ───────────────────────────────────────────────────
  const alumGrad = ctx.createLinearGradient(0, 0, 0, h);
  alumGrad.addColorStop(0,    "#b8b0a0");
  alumGrad.addColorStop(0.20, "#f2ead8");
  alumGrad.addColorStop(0.42, "#c8c0b0");
  alumGrad.addColorStop(0.58, "#ece4d0");
  alumGrad.addColorStop(0.80, "#d0c8b8");
  alumGrad.addColorStop(1,    "#a09888");

  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, R);
  ctx.fillStyle = alumGrad;
  ctx.fill();

  // Brushed grain on the border area
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, R);
  ctx.clip();
  ctx.globalAlpha = 0.05;
  for (let y = 0; y < h; y += 1.5) {
    ctx.beginPath();
    ctx.moveTo(0, y); ctx.lineTo(w, y);
    ctx.strokeStyle = y % 3 < 1.5 ? "#fff" : "#888";
    ctx.lineWidth = 0.5; ctx.stroke();
  }
  ctx.restore();

  // ── Inner black plate ────────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.roundRect(bw, bw, w - bw * 2, h - bw * 2, iR);
  ctx.fillStyle = "#111111";
  ctx.fill();

  // Grain on inner plate
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(bw, bw, w - bw * 2, h - bw * 2, iR);
  ctx.clip();
  ctx.globalAlpha = 0.018;
  for (let y = bw; y < h - bw; y += 1.6) {
    ctx.beginPath();
    ctx.moveTo(bw, y); ctx.lineTo(w - bw, y);
    ctx.strokeStyle = y % 3.2 < 1.6 ? "#fff" : "#000";
    ctx.lineWidth = 0.5; ctx.stroke();
  }
  ctx.restore();

  // ── Text — sized relative to inner plate ────────────────────────────────────
  const iw   = w - 2 * bw;
  const ih   = h - 2 * bw;
  const displayText = text.trim() || (mode === "fni" ? "1234 AB 75" : "AA-123-BB");

  if (lines === 1) {
    const fs = findFontSize(ctx, displayText, weight, family, iw * 0.84, ih * 0.80);
    drawText(ctx, displayText, w / 2, h / 2, fs, weight, family);
  } else {
    const [l1, l2] = getLineSplit(displayText, mode);
    const gap   = ih * 0.08;
    const maxFH = ih * 0.38;
    const maxFW = iw * 0.84;

    const fs1 = findFontSize(ctx, l1, weight, family, maxFW, maxFH);
    const fs2 = l2 ? findFontSize(ctx, l2, weight, family, maxFW, maxFH) : fs1;
    const fs  = Math.min(fs1, l2 ? fs2 : fs1);

    const blockH = fs * 2 + gap;
    const y1 = (h - blockH) / 2 + fs / 2;
    const y2 = y1 + fs + gap;

    drawText(ctx, l1, w / 2, y1, fs, weight, family);
    if (l2) drawText(ctx, l2, w / 2, y2, fs, weight, family);
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PlateCanvas({
  format,
  text,
  fontId    = DEFAULT_FONT_ID,
  plateMode = "siv",
  className = "",
  scale     = 1,
  animate   = false,
}: PlateCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const font      = getFontById(fontId);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w   = Math.round(format.width  * PX_PER_CM * scale);
    const h   = Math.round(format.height * PX_PER_CM * scale);
    const dpr = window.devicePixelRatio || 1;
    canvas.width        = w * dpr;
    canvas.height       = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    drawPlate(ctx, w, h, text, format.lines, font.weight, font.cssFamily, plateMode);
  }, [format, text, font, scale, plateMode]);

  useEffect(() => { render(); }, [render]);
  useEffect(() => { document.fonts.ready.then(render); }, [render]);

  // Subtle flash on text change
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !text) return;
    el.classList.remove("plate-type");
    void el.offsetWidth;
    el.classList.add("plate-type");
  }, [text]);

  return (
    <div ref={wrapRef} className={`inline-block ${animate ? "animate-plate-in" : ""}`}>
      <canvas
        ref={canvasRef}
        className={`plate-frame ${className}`}
        aria-label={`Aperçu plaque ${text || "vide"}`}
      />
    </div>
  );
}
