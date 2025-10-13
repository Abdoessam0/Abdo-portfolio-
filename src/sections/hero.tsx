"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { loadContent } from "../lib/content";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../components/hero/Scene"), { ssr: false });

export default function Hero() {
  const content = loadContent();
    return (
        <section className="relative w-full min-h-[100vh] flex items-center justify-center text-center px-6">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/60 to-transparent" />
            <div className="absolute inset-0 -z-20 opacity-20 pointer-events-none">
              <Scene />
            </div>
            <div className="max-w-3xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-inter font-semibold text-text"
                >
          {content.name}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-4 text-text/80"
                >
          {content.subline}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex items-center justify-center gap-3"
                >
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-accent text-bg font-medium shadow-glass hover:opacity-90 transition"
                        aria-label="View My Work"
                    >
                        View My Work
                        <ArrowRight className="size-4" />
                    </a>
                    <a
            href="#contact"
                        className="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-bg text-text ring-1 ring-text/20 shadow-glass hover:bg-bg/80 transition"
                        aria-label="Get In Touch"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
}


