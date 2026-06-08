// ─────────────────────────────────────────────────────────────────────────────
// Plate input — masking, validation, formatting
// ─────────────────────────────────────────────────────────────────────────────

export type PlateMode = "siv" | "fni";

/** Strip all separators (hyphens & spaces) to get the raw alphanumeric string */
export function getRaw(formatted: string): string {
  return formatted.replace(/[-\s]/g, "").toUpperCase();
}

// ── SIV  (AA-123-BB) ─────────────────────────────────────────────────────────
// Raw positions: 0-1 = letters, 2-4 = digits, 5-6 = letters  (max 7 raw chars)

export function formatSIV(raw: string): string {
  const r = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  let out = "";
  for (let i = 0; i < r.length; i++) {
    if (i === 2 || i === 5) out += "-";
    out += r[i];
  }
  return out;
}

export function validateSIVChar(char: string, raw: string): boolean {
  const pos = raw.length;
  if (pos >= 7) return false;
  const up = char.toUpperCase();
  if (pos < 2) return /[A-Z]/.test(up);
  if (pos < 5) return /\d/.test(up);
  if (pos < 7) return /[A-Z]/.test(up);
  return false;
}

/** What key type is valid at the current SIV position? */
export function sivKeyType(raw: string): "letter" | "digit" | "none" {
  const pos = raw.length;
  if (pos >= 7) return "none";
  if (pos < 2 || pos >= 5) return "letter";
  return "digit";
}

// ── FNI  (1234 AB 75) ────────────────────────────────────────────────────────
// Raw: 1-4 digits → 2 letters → 2 digits  (max 8 raw chars)

type FNIPhase = "d1" | "l" | "d2";

function getFNIPhase(raw: string): FNIPhase {
  let i = 0;
  while (i < raw.length && /\d/.test(raw[i])) i++;
  if (i === raw.length) return "d1";
  const letterStart = i;
  while (i < raw.length && /[A-Z]/.test(raw[i])) i++;
  if (i === raw.length) return "l";
  return "d2";
}

function fniD1Count(raw: string): number {
  let i = 0;
  while (i < raw.length && /\d/.test(raw[i])) i++;
  return i;
}

function fniLetterCount(raw: string): number {
  const d1 = fniD1Count(raw);
  let c = 0;
  for (let i = d1; i < raw.length; i++) {
    if (/[A-Z]/.test(raw[i])) c++;
    else break;
  }
  return c;
}

function fniD2Count(raw: string): number {
  return raw.length - fniD1Count(raw) - fniLetterCount(raw);
}

export function formatFNI(raw: string): string {
  const r = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  let d1 = "", lts = "", d2 = "";
  let phase: FNIPhase = "d1";

  for (const ch of r) {
    if (phase === "d1") {
      if (/\d/.test(ch) && d1.length < 4) d1 += ch;
      else if (/[A-Z]/.test(ch) && d1.length >= 1) { phase = "l"; lts += ch; }
    } else if (phase === "l") {
      if (/[A-Z]/.test(ch) && lts.length < 2) {
        lts += ch;
        if (lts.length === 2) phase = "d2";
      } else if (/\d/.test(ch) && lts.length === 2) { phase = "d2"; d2 += ch; }
    } else if (phase === "d2") {
      if (/\d/.test(ch) && d2.length < 2) d2 += ch;
    }
  }

  let out = d1;
  if (lts) out += " " + lts;
  if (d2) out += " " + d2;
  return out;
}

export function validateFNIChar(char: string, raw: string): boolean {
  const up = char.toUpperCase();
  const phase = getFNIPhase(raw);
  const d1 = fniD1Count(raw);
  const l  = fniLetterCount(raw);
  const d2 = fniD2Count(raw);

  if (phase === "d1") {
    if (/\d/.test(up)) return d1 < 4;
    if (/[A-Z]/.test(up)) return d1 >= 1; // can switch to letters after ≥1 digit
    return false;
  }
  if (phase === "l") {
    if (/[A-Z]/.test(up)) return l < 2;
    if (/\d/.test(up)) return l >= 2; // can switch to d2 only after 2 letters
    return false;
  }
  if (phase === "d2") {
    return /\d/.test(up) && d2 < 2;
  }
  return false;
}

/** What key type is valid at the current FNI position? */
export function fniKeyType(raw: string): "letter" | "digit" | "both" | "none" {
  const phase = getFNIPhase(raw);
  const d1 = fniD1Count(raw);
  const l  = fniLetterCount(raw);
  const d2 = fniD2Count(raw);

  if (phase === "d1") {
    if (d1 >= 4) return "letter";          // max digits reached, must switch
    if (d1 >= 1) return "both";            // can add digit or start letters
    return "digit";                        // first char must be digit
  }
  if (phase === "l") {
    if (l >= 2) return "digit";
    return "letter";
  }
  if (phase === "d2") {
    return d2 < 2 ? "digit" : "none";
  }
  return "none";
}

// ── Canvas line split ─────────────────────────────────────────────────────────

/**
 * Returns [line1, line2] for 2-line plate rendering.
 * SIV "AB-123-CD" → ["AB-", "123-CD"]
 * FNI "1234 AB 75" → ["1234", "AB 75"]
 */
export function getLineSplit(formatted: string, mode: PlateMode): [string, string] {
  if (!formatted.trim()) return ["AA-", "123-BB"];

  if (mode === "siv") {
    return [formatted.slice(0, 3), formatted.slice(3)];
  }
  // FNI: split at first space
  const sp = formatted.indexOf(" ");
  if (sp === -1) return [formatted, ""];
  return [formatted.slice(0, sp), formatted.slice(sp + 1)];
}

// ── Validation helpers ────────────────────────────────────────────────────────

export function isComplete(raw: string, mode: PlateMode): boolean {
  if (mode === "siv") return raw.length === 7;
  if (mode === "fni") return raw.length >= 6; // d1(1-4) + 2 letters + 2 digits
  return false;
}

export function formatPlate(raw: string, mode: PlateMode): string {
  return mode === "siv" ? formatSIV(raw) : formatFNI(raw);
}

export function validateChar(char: string, raw: string, mode: PlateMode): boolean {
  return mode === "siv"
    ? validateSIVChar(char, raw)
    : validateFNIChar(char, raw);
}

export function getKeyType(raw: string, mode: PlateMode): "letter" | "digit" | "both" | "none" {
  if (mode === "siv") {
    const t = sivKeyType(raw);
    return t === "none" ? "none" : t;
  }
  return fniKeyType(raw);
}
