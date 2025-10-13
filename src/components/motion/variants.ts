import { Variants } from "framer-motion";

export function fadeIn(direction: "up" | "down" | "left" | "right" = "up", distance = 16): Variants {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const delta = direction === "up" || direction === "left" ? distance : -distance;
  return {
    hidden: { opacity: 0, [axis]: delta },
    show: { opacity: 1, [axis]: 0 },
  } as unknown as Variants;
}

export const stagger: Variants = {
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const hoverScale = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
};


