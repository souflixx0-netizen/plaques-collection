import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          black:      "#0a0908",
          dark:       "#0e0d0a",
          card:       "#111009",
          border:     "#1e1c14",
          gold:       "#c8a96e",
          "gold-light":"#dfc080",
          "gold-dark": "#a88a50",
          text:       "#e8e4da",
          secondary:  "#8a7a60",
          dim:        "#5a5040",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body:    ["Georgia", "Times New Roman", "serif"],
        mono:    ["Courier New", "Courier", "monospace"],
        sans:    ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        "widest-2": "0.16em",
        "widest-3": "0.22em",
      },
      boxShadow: {
        gold:   "0 0 0 1px rgba(200,169,110,0.25)",
        "gold-glow": "0 0 24px rgba(200,169,110,0.12)",
        plate:  "0 0 0 1px rgba(255,255,255,0.06), 0 6px 32px rgba(0,0,0,0.8)",
        card:   "0 1px 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-up":  "fadeUp 0.7s ease-out forwards",
        "fade-in":  "fadeIn 0.5s ease-out forwards",
        "plate-in": "plateIn 1s cubic-bezier(0.16,1,0.3,1) forwards",
        blink:      "blink 1.1s ease infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        plateIn: {
          from: { opacity: "0", transform: "translateY(16px) scale(0.98)" },
          to:   { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
