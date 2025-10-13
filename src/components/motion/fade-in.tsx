"use client";

import { motion, type MotionProps } from "framer-motion";
import * as React from "react";

type FadeInProps = React.PropsWithChildren<MotionProps & { className?: string }>;

export function FadeIn({ children, className, ...rest }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}


