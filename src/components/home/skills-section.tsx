"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const iconMap: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Database,
  Database: Cloud,
  Tools: Wrench,
  Focus: Search,
};

export function SkillsSection() {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();

  return (
    <section id="skills" className="space-y-8 py-4 sm:space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Skills"
          description="The tools and areas I use most in real work."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {PROFILE.skills.map((group, index) => {
          const Icon = iconMap[group.title] ?? Code2;

          return (
            <Reveal key={group.title} delay={index * 0.05} className="h-full">
              <motion.div
                whileHover={
                  reducedMotion || shouldUseLiteMotion
                    ? undefined
                    : { y: -4 }
                }
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="section-frame h-full p-4 sm:p-6"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                        Capability
                      </p>
                      <h3 className="mt-2 font-heading text-[1.2rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.35rem]">
                        {group.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {group.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-white/0 via-white/10 to-white/0" />

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tech-badge">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
