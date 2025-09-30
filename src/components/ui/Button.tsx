"use client";

import * as React from "react";
import { motion } from "framer-motion";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium transition will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-accent text-bg shadow-glass hover:opacity-90"
      : "bg-transparent text-text ring-1 ring-text/20 hover:bg-text/10";

  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}


