"use client";

import { CheckCircle2, Languages, ServerCog } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const iconMap = [CheckCircle2, ServerCog, Languages];

const whatIDo = [
  "Websites",
  "Dashboards",
  "Full-stack systems",
  "Production apps",
];

export function AboutSection() {
  return (
    <section id="about" className="space-y-7 py-3 sm:space-y-10 sm:py-4">
      <Reveal>
        <SectionHeading
          eyebrow="About"
          title="Full-Stack Software Engineer, frontend-first."
        />
      </Reveal>

      <Reveal className="grid gap-4 xl:grid-cols-[1.14fr_0.86fr]">
        <div className="section-frame p-4 sm:p-7">
          <div className="space-y-5">
            <p className="pill-label">{PROFILE.about.intro}</p>

            <div className="flex flex-wrap gap-2">
              {[
                PROFILE.person.base,
                PROFILE.person.nationality,
                PROFILE.person.timezone,
              ].map((item) => (
                <span key={item} className="tech-badge">
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              {PROFILE.about.story.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-2xl text-sm leading-6 text-muted sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                Work
              </p>
              <ul className="mt-3 grid gap-2.5 text-sm text-soft sm:grid-cols-2">
                {whatIDo.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[0.42rem] h-1.5 w-1.5 rounded-full bg-brand-glow/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 pt-1 sm:grid-cols-3">
              {PROFILE.about.focusAreas.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3.5"
                >
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="section-frame p-4 sm:p-6">
            <p className="pill-label">At a glance</p>

            <div className="mt-4 space-y-3">
              {PROFILE.factCards.map((card, index) => {
                const Icon = iconMap[index] ?? CheckCircle2;
                return (
                  <Reveal
                    key={card.label}
                    delay={index * 0.05}
                    className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                          {card.label}
                        </p>
                        <h3 className="mt-1.5 text-base font-semibold text-white">
                          {card.value}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="section-frame p-4 sm:p-6">
            <div className="space-y-5">
              <div>
                <p className="pill-label">Education</p>
                <div className="mt-4 space-y-3">
                  {PROFILE.education.map((item) => (
                    <div
                      key={`${item.degree}-${item.period}`}
                      className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3.5"
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                        {item.period}
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        {item.degree}
                      </p>
                      <p className="mt-1 text-sm text-soft">
                        {item.institution}
                      </p>
                      <p className="mt-1 text-xs text-muted">{item.location}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-divider" />

              <div>
                <p className="pill-label">How I work</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PROFILE.about.principles.map((item) => (
                    <span key={item} className="tech-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
