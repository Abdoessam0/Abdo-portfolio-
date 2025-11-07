"use client";

import { motion, type MotionProps, type TargetAndTransition, useReducedMotion } from "framer-motion";
import * as React from "react";
import { fadeUp } from "@/lib/motion";

type FadeInProps = React.PropsWithChildren<
  Omit<MotionProps, "initial" | "animate" | "variants" | "viewport" | "transition"> & {
    className?: string;
    distance?: number;
    duration?: number;
    delay?: number;
    once?: boolean;
    amount?: number;
  }
>;

export function FadeIn({
  children,
  className,
  distance = 16,
  duration = 0.6,
  delay = 0,
  once = true,
  amount = 0.3,
  ...rest
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = React.useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      };
    }

    const baseVariants = fadeUp(distance, duration);
    const visible = baseVariants.visible as TargetAndTransition;

    return {
      hidden: baseVariants.hidden,
      visible: {
        ...visible,
        transition: { ...visible.transition, delay },
      },
    };
  }, [distance, duration, delay, shouldReduceMotion]);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}


