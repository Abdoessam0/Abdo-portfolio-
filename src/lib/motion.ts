import type { Variants, Transition } from "framer-motion";

/**
 * Shared easing curve for primary entrance animations.
 * Matches an ease-out-expo style curve for a natural slowdown.
 */
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const fadeUp = (distance = 20, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: easeOutExpo as Transition["ease"] },
  },
});

export const stagger = (staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});
