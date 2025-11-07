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
        canvas: "#fafafa",
        ink: "#18181b",
        muted: "#52525b",
        outline: "#e4e4e7",
        accent: {
          DEFAULT: "#3b7c74",
          soft: "#e1f0ec",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: "0 25px 60px rgba(15, 23, 42, 0.08)",
        soft: "0 12px 30px rgba(15, 23, 42, 0.08)",
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
