"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Code2, Database, Search, Wrench, type LucideIcon } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const iconMap: Record<string, LucideIcon> = {
  Frontend: Code2,
  "Backend / APIs": Database,
  "Cloud & DevOps": Cloud,
  "Tools & Design": Wrench,
  "SEO & Performance": Search,
};

export function SkillsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="space-y-8 py-4 sm:space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Technical toolkit"
          description="Clean grouping, compact layout, and the core tools I use across frontend, backend integration, and production delivery."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {PROFILE.skills.map((group, index) => {
          const Icon = iconMap[group.title] ?? Code2;

          return (
            <Reveal key={group.title} delay={index * 0.05} className="h-full">
              <motion.div
                whileHover={reducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="section-frame h-full p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                      Capability
                    </p>
                    <h3 className="mt-2 font-heading text-[1.35rem] font-semibold tracking-[-0.04em] text-white">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {group.summary}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 grid gap-2.5 text-sm text-soft sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-glow/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
