"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const primaryCta = PROFILE.hero.ctas[0];
  const secondaryCta = PROFILE.hero.ctas[1];

  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(16,23,43,0.92),rgba(10,16,32,0.82),rgba(12,20,38,0.96))] px-5 py-8 shadow-card shadow-black/25 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
    >
      {/* Background — reduced to 2 subtle glows */}
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-brand/10 blur-[120px]" />
      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet/8 blur-[140px]" />

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Text content */}
        <div className="space-y-6">
          <Reveal className="space-y-4">
            <div className="space-y-3">
              <h1 className="max-w-2xl font-sans text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[3.2rem] lg:text-[3.6rem] lg:leading-[0.97]">
                {PROFILE.hero.headline}
              </h1>
              <p className="max-w-xl text-balance text-base leading-relaxed text-soft sm:text-lg">
                {PROFILE.hero.subheadline}
              </p>
            </div>
          </Reveal>

          <Reveal className="flex flex-wrap gap-3" delay={0.08}>
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-canvas transition hover:bg-brand-glow"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-brand/30 hover:bg-white/[0.08]"
            >
              <Download className="h-4 w-4 text-brand-glow" />
              {secondaryCta.label}
            </a>
          </Reveal>

          {/* Compact proof line */}
          <Reveal delay={0.12}>
            <p className="text-sm text-muted">
              <span className="text-soft">Recent work:</span>{" "}
              {PROFILE.hero.trustedBy.join(" · ")}
              <span className="mx-2 text-white/20">|</span>
              <span className="text-soft">Stack:</span>{" "}
              Next.js, TypeScript, Tailwind
            </p>
          </Reveal>
        </div>

        {/* Hero image — cleaner with fewer decorative layers */}
        <Reveal
          delay={0.1}
          className="relative mx-auto w-full max-w-[20rem] lg:ml-auto lg:max-w-[22rem]"
        >
          <div className="pointer-events-none absolute inset-x-6 top-3 h-[85%] rounded-[999px] bg-[radial-gradient(circle_at_center,rgba(53,214,164,0.2),rgba(53,214,164,0.06)_50%,transparent_74%)] blur-[40px]" />
          <div className="pointer-events-none absolute inset-x-8 top-5 bottom-5 rounded-[999px] border border-emerald/15 opacity-60" />

          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
            transition={
              reducedMotion
                ? undefined
                : {
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
            }
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[999px] border border-emerald/25 bg-[linear-gradient(180deg,rgba(8,21,23,0.86),rgba(7,14,20,0.84))] p-2.5 shadow-[0_0_0_1px_rgba(53,214,164,0.12),0_0_28px_rgba(53,214,164,0.16),0_20px_60px_rgba(5,8,18,0.5)]">
              <div className="relative aspect-[0.75] overflow-hidden rounded-[999px] border border-white/8 bg-[#d8d6cd]">
                <Image
                  src={PROFILE.heroImage.src}
                  alt={PROFILE.heroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 22rem, 80vw"
                  className="object-contain object-bottom"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,16,30,0.02),transparent_30%,rgba(10,16,30,0.12)_100%)]" />
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
