"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Download, Gauge, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";

const heroBadges = [
  { icon: Code2, label: "Next.js" },
  { icon: Layers3, label: "TypeScript" },
  { icon: Gauge, label: "SEO + performance" },
];

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const primaryCta = PROFILE.hero.ctas[0];
  const secondaryCta = PROFILE.hero.ctas[1];

  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(16,23,43,0.92),rgba(10,16,32,0.82),rgba(12,20,38,0.96))] px-5 py-8 shadow-card shadow-black/25 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-brand/10 blur-[120px]" />
      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet/8 blur-[140px]" />

      <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-6">
          <Reveal className="space-y-4">
            <div className="space-y-3">
              <p className="pill-label">{PROFILE.hero.eyebrow}</p>
              <h1 className="max-w-2xl font-heading text-hero font-semibold text-white">
                {PROFILE.hero.headline}
              </h1>
              <p className="max-w-xl text-balance text-base leading-relaxed text-soft sm:text-lg">
                {PROFILE.hero.subheadline}
              </p>
              <p className="max-w-xl text-sm leading-6 text-muted sm:text-base">
                {PROFILE.hero.description}
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

          <Reveal className="grid gap-3 sm:grid-cols-3" delay={0.12}>
            {PROFILE.hero.proofStrip.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-soft">{item.value}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className="relative mx-auto w-full max-w-[20rem] lg:ml-auto lg:max-w-[22rem]"
        >
          {heroBadges.map((badge, index) => {
            const positions = [
              "left-[-0.75rem] top-10",
              "right-[-0.75rem] top-20",
              "left-4 bottom-24",
            ];
            const Icon = badge.icon;

            return (
              <motion.div
                key={badge.label}
                animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                transition={
                  reducedMotion
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
            animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
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
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-2 shadow-glow-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#d8d6cd]">
                <Image
                  src={PROFILE.heroImage.src}
                  alt={PROFILE.heroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 22rem, 80vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(10,16,30,0.08)_62%,rgba(10,16,30,0.18)_100%)]" />
              </div>

              <div className="mt-3 flex items-center justify-between rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                    Availability
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Open to work
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                    Focus
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Frontend + full-stack
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
