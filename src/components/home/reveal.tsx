"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const travel = shouldUseLiteMotion ? Math.min(y, 12) : y;
  const duration = shouldUseLiteMotion ? 0.32 : 0.44;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{
        duration,
        delay: shouldUseLiteMotion ? Math.min(delay, 0.12) : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}
