"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const iconByKind = {
  email: Mail,
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  github: Github,
  resume: Download,
} as const;

export function ContactSection() {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteEffects, shouldUseLiteMotion } =
    useMobileOptimization();

  return (
    <section id="contact" className="space-y-6 py-4 sm:space-y-7">
      <Reveal>
        <SectionHeading
          eyebrow={PROFILE.contact.eyebrow}
          title={PROFILE.contact.title}
          description={PROFILE.contact.description}
        />
      </Reveal>

      <Reveal className="section-frame relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
        <motion.div
          aria-hidden="true"
          animate={
            reducedMotion || shouldUseLiteMotion
              ? undefined
              : { x: [0, 20, 0], y: [0, -12, 0], opacity: [0.3, 0.65, 0.3] }
          }
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className={`pointer-events-none absolute -left-8 top-5 h-20 w-20 rounded-full bg-brand/12 ${
            shouldUseLiteEffects ? "blur-2xl" : "blur-3xl"
          } sm:-left-10 sm:h-28 sm:w-28`}
        />
        <motion.div
          aria-hidden="true"
          animate={
            reducedMotion || shouldUseLiteMotion
              ? undefined
              : { x: [0, -16, 0], y: [0, 12, 0], opacity: [0.2, 0.45, 0.2] }
          }
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className={`pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-accent-cyan/10 ${
            shouldUseLiteEffects ? "blur-2xl" : "blur-3xl"
          } sm:h-32 sm:w-32`}
        />
        <motion.div
          aria-hidden="true"
          animate={
            reducedMotion || shouldUseLiteMotion
              ? undefined
              : { opacity: [0.35, 0.9, 0.35], scaleX: [0.96, 1, 0.96] }
          }
          transition={{
            duration: 4.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-glow/70 to-transparent sm:inset-x-10"
        />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="pill-label">Contact</p>
            <motion.div
              animate={
                reducedMotion || shouldUseLiteMotion
                  ? undefined
                  : { y: [0, -3, 0], opacity: [1, 0.92, 1] }
              }
              transition={{
                duration: 4.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.08] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-brand-glow sm:text-[0.68rem] sm:tracking-[0.22em]"
            >
              <motion.span
                animate={
                  reducedMotion || shouldUseLiteMotion
                    ? undefined
                    : { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }
                }
                transition={{
                  duration: 2.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="h-2 w-2 rounded-full bg-brand-glow"
              />
              Open to work
            </motion.div>
            <h3 className="mt-3 font-heading text-[1.55rem] font-semibold tracking-[-0.04em] text-white sm:text-[2rem]">
              {PROFILE.contact.availability}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {PROFILE.contact.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[32rem]">
            {PROFILE.contact.channels.map((channel, index) => {
              const Icon = iconByKind[channel.kind];

              return (
                <Reveal
                  key={channel.label}
                  delay={index * 0.05}
                  className="h-full"
                >
                  <a
                    href={channel.href}
                    target={
                      channel.kind === "email" || channel.kind === "resume"
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      channel.kind === "email" || channel.kind === "resume"
                        ? undefined
                        : "noreferrer"
                    }
                    className="flex h-full min-h-16 items-center gap-3 rounded-[1.05rem] border border-white/8 bg-white/[0.03] px-4 py-3 transition hover:border-brand/30 hover:bg-white/[0.05] sm:rounded-[1.15rem]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                        {channel.label}
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-white">
                        {channel.value}
                      </p>
                      <p className="mt-1 text-xs text-muted">{channel.note}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
