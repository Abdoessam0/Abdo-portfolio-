"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

export function SkillsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="space-y-8 py-4 sm:space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Core tools and strengths"
          description="Frontend first, full-stack capable."
        />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {PROFILE.skills.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.05} className="h-full">
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="section-frame h-full p-5 sm:p-6"
            >
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                  Capability
                </p>
                <h3 className="mt-3 font-heading text-[1.45rem] font-semibold tracking-[-0.04em] text-white">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {group.summary}
                </p>
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
        ))}
      </div>
    </section>
  );
}
