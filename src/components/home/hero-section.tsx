"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Download,
  Gauge,
  Layers3,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const heroBadges = [
  { icon: Code2, label: "Next.js" },
  { icon: Layers3, label: "TypeScript" },
  { icon: Gauge, label: "Full-stack" },
];

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteEffects, shouldUseLiteMotion } =
    useMobileOptimization();
  const primaryCta = PROFILE.hero.ctas[0];
  const secondaryCta = PROFILE.hero.ctas[1];
  const spotlightMetrics = PROFILE.metrics.slice(0, 4);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(16,23,43,0.94),rgba(10,16,32,0.9),rgba(12,20,38,0.98))] px-4 py-6 shadow-[0_14px_32px_rgba(2,6,23,0.24)] sm:rounded-[2.2rem] sm:px-8 sm:py-10 sm:shadow-card sm:shadow-black/25 lg:px-10 lg:py-12"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.035] sm:opacity-[0.05]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(111,205,245,0.14),transparent_72%)] sm:h-44 sm:bg-[radial-gradient(circle_at_top,rgba(111,205,245,0.16),transparent_70%)]" />
      <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-brand/10 blur-[72px] sm:-left-16 sm:top-10 sm:h-52 sm:w-52 sm:bg-brand/12 sm:blur-[130px]" />
      <div className="absolute right-[-1rem] top-0 h-36 w-36 rounded-full bg-accent-cyan/8 blur-[72px] sm:h-60 sm:w-60 sm:bg-accent-cyan/10 sm:blur-[150px]" />
      <div className="absolute bottom-[-2rem] left-[42%] h-28 w-28 rounded-full bg-accent-amber/8 blur-[70px] sm:bottom-[-5rem] sm:h-48 sm:w-48 sm:bg-accent-amber/10 sm:blur-[145px]" />

      <div className="relative grid gap-7 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
        <div className="space-y-5 sm:space-y-6">
          <Reveal className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="pill-label">{PROFILE.hero.eyebrow}</p>
              <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#b8ffe8] sm:text-[0.68rem] sm:tracking-[0.2em]">
                <span className="h-2 w-2 rounded-full bg-emerald animate-glow" />
                Open to work
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="max-w-2xl font-heading text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-hero">
                {PROFILE.hero.headline}
              </h1>
              <p className="max-w-xl text-balance text-[0.96rem] leading-7 text-soft sm:text-lg">
                {PROFILE.hero.subheadline}
              </p>
              <p className="max-w-xl text-sm leading-6 text-muted sm:text-base">
                {PROFILE.hero.description}
              </p>
            </div>
          </Reveal>

          <Reveal className="flex flex-col gap-3 sm:flex-row sm:flex-wrap" delay={0.08}>
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f4f7ff_0%,#d8e5ff_42%,#88d2ef_100%)] px-5 py-3 text-sm font-semibold text-canvas shadow-[0_18px_36px_rgba(111,205,245,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(111,205,245,0.18)]"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-brand/30 hover:bg-white/[0.08]"
            >
              <Download className="h-4 w-4 text-brand-glow" />
              {secondaryCta.label}
            </a>
          </Reveal>

          <Reveal className="grid gap-3 sm:grid-cols-3" delay={0.12}>
            {PROFILE.hero.proofStrip.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-4 py-3.5 sm:rounded-[1.3rem] sm:py-4"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-soft">{item.value}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="space-y-3" delay={0.16}>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-muted">
                <Sparkles className="h-3.5 w-3.5 text-accent-amber" />
                Trusted by
              </span>
              <span className="hidden h-px flex-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 sm:block" />
            </div>
            <div className="flex flex-wrap gap-2">
              {PROFILE.hero.trustedBy.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-soft transition hover:border-brand/25 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:ml-auto lg:max-w-[28rem]"
        >
          {heroBadges.map((badge, index) => {
            const positions = [
              "left-[-0.75rem] top-10",
              "right-[-0.75rem] top-20",
              "left-4 bottom-36",
            ];
            const Icon = badge.icon;

            return (
              <motion.div
                key={badge.label}
                animate={
                  reducedMotion || shouldUseLiteMotion
                    ? undefined
                    : { y: [0, -6, 0] }
                }
                transition={
                  reducedMotion || shouldUseLiteMotion
                    ? undefined
                    : {
                        duration: 4 + index,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.4,
                      }
                }
                className={`absolute z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-[rgba(8,12,24,0.8)] px-3 py-1.5 text-xs font-medium text-soft backdrop-blur-xl md:inline-flex ${positions[index]}`}
              >
                <Icon className="h-3.5 w-3.5 text-brand-glow" />
                {badge.label}
              </motion.div>
            );
          })}

          <motion.div
            animate={
              reducedMotion || shouldUseLiteMotion
                ? undefined
                : { y: [0, -10, 0] }
            }
            transition={
              reducedMotion || shouldUseLiteMotion
                ? undefined
                : {
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
            }
            className="relative"
          >
            <div
              className={`absolute inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(111,205,245,0.2),transparent_56%)] ${
                shouldUseLiteEffects ? "blur-xl opacity-75" : "blur-2xl"
              }`}
            />
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,28,48,0.9),rgba(7,12,24,0.96))] p-2.5 shadow-[0_10px_24px_rgba(58,94,168,0.14)] sm:rounded-[2rem] sm:p-3 sm:shadow-glow-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#d8d6cd] sm:rounded-[1.55rem]">
                <Image
                  src={PROFILE.heroImage.src}
                  alt={PROFILE.heroImage.alt}
                  fill
                  priority
                  quality={78}
                  sizes="(min-width: 1280px) 28rem, (min-width: 1024px) 22rem, (min-width: 640px) 40vw, 88vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(10,16,30,0.08)_56%,rgba(10,16,30,0.22)_100%)]" />
              </div>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                {spotlightMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 sm:rounded-[1.15rem] sm:px-4"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {metric.value}
                    </p>
                    {metric.helper ? (
                      <p className="mt-1 text-xs text-muted">{metric.helper}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
