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
    id: "stencil",
    label: "Stencil",
    cssFamily: "Stencil, 'Arial Black', Impact, monospace",
    weight: "400",
    previewFamily: "Stencil, 'Arial Black', Impact, monospace",
  },
  {
    id: "american-typewriter",
    label: "American Typewriter",
    cssFamily: '"American Typewriter", "Courier New", Georgia, serif',
    weight: "700",
    previewFamily: '"American Typewriter", "Courier New", Georgia, serif',
  },
  {
    id: "uknumberplate",
    label: "UK Number Plate",
    // Custom file first, fallback to Share Tech Mono (Google Fonts)
    cssFamily: '"UKNumberPlate", "Share Tech Mono", "Courier New", monospace',
    weight: "400",
    previewFamily: '"UKNumberPlate", "Share Tech Mono", "Courier New", monospace',
  },
  {
    id: "calibri",
    label: "Calibri Bold",
    cssFamily: '"Calibri", "Trebuchet MS", Arial, sans-serif',
    weight: "700",
    previewFamily: '"Calibri", "Trebuchet MS", Arial, sans-serif',
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

export const DEFAULT_FONT_ID = "stencil";

export function getFontById(id: string): PlateFont {
  return PLATE_FONTS.find((f) => f.id === id) ?? PLATE_FONTS[0];
}
