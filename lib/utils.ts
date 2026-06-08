import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPlateText(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9\s-]/g, "").slice(0, 10);
}
