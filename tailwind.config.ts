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
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        canvas: "#060816",
        surface: "#0b1020",
        panel: "#10172b",
        elevated: "#131d35",
        ink: "#f4f7ff",
        muted: "#94a3c3",
        soft: "#c7d2ea",
        line: "#243252",
        brand: {
          DEFAULT: "#5b7cff",
          soft: "#2d3f84",
          glow: "#8ba4ff",
        },
        violet: "#8b6dff",
        emerald: "#35d6a4",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: "0 20px 80px rgba(2, 6, 23, 0.45)",
        soft: "0 12px 36px rgba(8, 15, 35, 0.28)",
        glow: "0 0 0 1px rgba(139, 164, 255, 0.12), 0 24px 80px rgba(91, 124, 255, 0.18)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate3d(-8%, -6%, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(8%, 5%, 0) rotate(5deg)" },
          "100%": { transform: "translate3d(-8%, -6%, 0) rotate(0deg)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        aurora: "aurora 24s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        glow: "pulseGlow 7s ease-in-out infinite",
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
