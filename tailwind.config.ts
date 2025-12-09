// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/data/**/*.{ts,tsx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1160px",
      },
    },
    extend: {
      colors: {
        canvas: "#05070d",
        surface: "#0b0f17",
        panel: "#0f1624",
        ink: "#e6f7ed",
        muted: "#9fb8aa",
        outline: "#182032",
        accent: {
          DEFAULT: "#4ef19d",
          soft: "#123322",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: "0 30px 70px rgba(0, 0, 0, 0.35)",
        soft: "0 16px 40px rgba(0, 0, 0, 0.28)",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate3d(-10%, -10%, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(10%, 5%, 0) rotate(6deg)" },
          "100%": { transform: "translate3d(-10%, -10%, 0) rotate(0deg)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        aurora: "aurora 28s linear infinite",
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
