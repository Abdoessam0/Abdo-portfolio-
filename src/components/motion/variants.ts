import type { Transition, Variant, Variants } from "framer-motion";
import { easeOutExpo, fadeUp, stagger as buildStagger } from "@/lib/motion";

export { easeOutExpo, fadeUp };

export function fadeIn(direction: "up" | "down" | "left" | "right" = "up", distance = 16, duration = 0.6): Variants {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const delta = direction === "up" || direction === "left" ? distance : -distance;

  type AxisOffset = Partial<Record<"x" | "y", number>>;
  const offset: AxisOffset = axis === "x" ? { x: delta } : { y: delta };
  const neutral: AxisOffset = axis === "x" ? { x: 0 } : { y: 0 };
  const transition: Transition = { duration, ease: easeOutExpo };

  const hidden: Variant = {
    opacity: 0,
    ...offset,
  };

  const show: Variant = {
    opacity: 1,
    ...neutral,
    transition,
  };

  return {
    hidden,
    show,
  };
}

export const stagger: Variants = buildStagger();

export const hoverScale = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
};


