import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        nangell: {
          cyan: "#00C2FC",
          blue: "#058FF7",
          electric: "#3061FA",
          violet: "#6139FA",
          dark: "#05070D",
          surface: "#0B0F1A",
          text: "#F8FAFC",
          muted: "#94A3B8",
        },
        glass: {
          border: "rgba(255,255,255,0.08)",
        },
      },
      borderRadius: {
        nangell: "0.75rem",
        "nangell-lg": "1rem",
        "nangell-xl": "1.25rem",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 194, 252, 0.15)",
        "glow-violet": "0 0 60px rgba(97, 57, 250, 0.2)",
        "glow-soft": "0 8px 32px rgba(5, 143, 247, 0.12)",
        glass: "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        "nangell-gradient":
          "linear-gradient(135deg, #00C2FC 0%, #058FF7 35%, #3061FA 65%, #6139FA 100%)",
        "nangell-gradient-subtle":
          "linear-gradient(135deg, rgba(0,194,252,0.12) 0%, rgba(97,57,250,0.12) 100%)",
        "nangell-radial":
          "radial-gradient(ellipse at top, rgba(48,97,250,0.15) 0%, transparent 60%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-sora)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
};

export default config;
