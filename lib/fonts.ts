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
    // Fichier local CalibriBold.woff2 (police de production)
    cssFamily: '"CalibriPlate", "Calibri", "Trebuchet MS", Arial, sans-serif',
    weight: "700",
    previewFamily: '"CalibriPlate", "Calibri", "Trebuchet MS", Arial, sans-serif',
  },
  {
    id: "stencil",
    label: "Stencil",
    // Fichier local StencilRegular.woff2 (police de production)
    cssFamily: '"StencilPlate", "Stencil", "Arial Black", Impact, sans-serif',
    weight: "400",
    previewFamily: '"StencilPlate", "Stencil", "Arial Black", Impact, sans-serif',
  },
  {
    id: "american-typewriter",
    label: "Machine à écrire",
    // Fichier local AmericanTypewriterBold.woff2 (police de production)
    cssFamily: '"AmericanTypewriterPlate", "American Typewriter", "Courier New", Georgia, serif',
    weight: "700",
    previewFamily: '"AmericanTypewriterPlate", "American Typewriter", "Courier New", Georgia, serif',
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

/**
 * Force le chargement du fichier de police avant un dessin canvas.
 * ctx.font ne déclenche PAS le téléchargement d'une @font-face : sans cet
 * appel, le canvas retombe silencieusement sur la police de secours.
 */
export function loadPlateFont(font: PlateFont): Promise<unknown> {
  if (typeof document === "undefined" || !document.fonts?.load) {
    return Promise.resolve();
  }
  return document.fonts
    .load(`${font.weight} 16px ${font.cssFamily}`, "AB-123-CD")
    .catch(() => {});
}

export function getFontById(id: string): PlateFont {
  return PLATE_FONTS.find((f) => f.id === id) ?? PLATE_FONTS[0];
}
