export interface PlateFont {
  id: string;
  label: string;
  /** CSS font-family for canvas ctx.font */
  cssFamily: string;
  weight: string;
  /** Google Font or system fallback shown in selector when custom file isn't loaded */
  previewFamily: string;
}

export const PLATE_FONTS: PlateFont[] = [
  {
    id: "uknumberplate",
    label: "Plaque standard",
    // Local file (UKNumberPlate.woff), fallback to Share Tech Mono (Google Fonts)
    cssFamily: '"UKNumberPlate", "Share Tech Mono", "Courier New", monospace',
    weight: "400",
    previewFamily: '"UKNumberPlate", "Share Tech Mono", "Courier New", monospace',
  },
  {
    id: "calibri",
    label: "Calibri Bold",
    // Carlito = clone libre métriquement identique à Calibri (Google Fonts)
    cssFamily: '"Carlito", "Calibri", "Trebuchet MS", Arial, sans-serif',
    weight: "700",
    previewFamily: '"Carlito", "Calibri", "Trebuchet MS", Arial, sans-serif',
  },
  {
    id: "stencil",
    label: "Stencil",
    // Stardos Stencil (Google Fonts), fallback Arial Black / Impact
    cssFamily: '"Stardos Stencil", "Arial Black", Impact, sans-serif',
    weight: "700",
    previewFamily: '"Stardos Stencil", "Arial Black", Impact, sans-serif',
  },
  {
    id: "american-typewriter",
    label: "Machine à écrire",
    // Special Elite (Google Fonts) = style machine à écrire vintage
    cssFamily: '"Special Elite", "Courier New", Georgia, serif',
    weight: "400",
    previewFamily: '"Special Elite", "Courier New", Georgia, serif',
  },
  {
    id: "gunplay",
    label: "Gunplay RG",
    // Local file (GunplayRg.woff), fallback to Orbitron (Google Fonts)
    cssFamily: '"GunplayRg", "Gunplay", "Orbitron", "Courier New", monospace',
    weight: "400",
    previewFamily: '"GunplayRg", "Gunplay", "Orbitron", "Courier New", monospace',
  },
];

export const DEFAULT_FONT_ID = "uknumberplate";

export function getFontById(id: string): PlateFont {
  return PLATE_FONTS.find((f) => f.id === id) ?? PLATE_FONTS[0];
}
