import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        canvas: "#060d1a",
        surface: "#0a1322",
        panel: "#0f1a2c",
        elevated: "#12203a",
        ink: "#f4f7ff",
        muted: "#90a0bc",
        soft: "#cbd7ea",
        line: "#1f2d46",
        brand: {
          DEFAULT: "#5f84e8",
          soft: "#26437f",
          glow: "#97b4ff",
        },
        violet: "#4c6dbe",
        emerald: "#31c39c",
        accent: {
          cyan: "#6fcdf5",
          rose: "#ff6b8a",
          amber: "#ffb547",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        hero: [
          "clamp(2.5rem, 5vw, 3.9rem)",
          { lineHeight: "1.02", letterSpacing: "-0.05em" },
        ],
        section: [
          "clamp(1.8rem, 3vw, 2.6rem)",
          { lineHeight: "1.1", letterSpacing: "-0.04em" },
        ],
        "card-title": [
          "clamp(1.25rem, 2vw, 1.75rem)",
          { lineHeight: "1.16", letterSpacing: "-0.03em" },
        ],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        "8xl": "1400px",
      },
      boxShadow: {
        card: "0 20px 80px rgba(2, 6, 23, 0.45)",
        soft: "0 12px 36px rgba(8, 15, 35, 0.28)",
        glow: "0 0 0 1px rgba(151, 180, 255, 0.12), 0 24px 80px rgba(58, 94, 168, 0.2)",
        "glow-sm":
          "0 0 0 1px rgba(151, 180, 255, 0.08), 0 8px 24px rgba(58, 94, 168, 0.14)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        glow: "pulseGlow 7s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(148,163,195,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,195,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
