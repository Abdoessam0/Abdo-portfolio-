"use client";

import { CheckCircle2, Languages, ServerCog } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useLang } from "@/hooks/use-lang";

const iconMap = [CheckCircle2, ServerCog, Languages];

export function AboutSection() {
  const { t } = useLang();

  return (
    <section id="about" dir={t.dir} className="space-y-6 py-3 sm:space-y-8 sm:py-4">
      <Reveal>
        <SectionHeading
          eyebrow={t.about.heading.eyebrow}
          title={t.about.heading.title}
          description={t.about.heading.description}
        />
      </Reveal>

      <Reveal className="grid items-start gap-4 xl:grid-cols-[1.14fr_0.86fr]">
        <div className="section-frame p-4 sm:p-5">
          <div className="space-y-4">
            <p className="pill-label">{t.about.intro}</p>

            <div className="flex flex-wrap gap-2">
              {t.about.badges.map((item) => (
                <span key={item} className="tech-badge">
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              {t.about.story.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-2xl text-sm leading-6 text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-3.5">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                {t.about.workLabel}
              </p>
              <ul className="mt-3 grid gap-2.5 text-sm text-soft sm:grid-cols-2">
                {t.about.workItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="story-bullet mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-2.5 pt-1 sm:grid-cols-3">
              {t.about.focusAreas.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3.5 py-3"
                >
                  <p className="text-sm font-semibold text-[#181818]">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="section-frame p-4 sm:p-5">
            <p className="pill-label">{t.about.glanceLabel}</p>

            <div className="mt-4 space-y-3">
              {t.about.factCards.map((card, index) => {
                const Icon = iconMap[index] ?? CheckCircle2;
                return (
                  <Reveal
                    key={card.label}
                    delay={index * 0.05}
                    className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="story-icon-wrap mt-0.5 h-10 w-10 rounded-2xl">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                          {card.label}
                        </p>
                        <h3 className="mt-1.5 text-base font-semibold text-[#181818]">
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

          <div className="section-frame p-4 sm:p-5">
            <div className="space-y-5">
              <div>
                <p className="pill-label">{t.about.educationLabel}</p>
                <div className="mt-4 space-y-3">
                  {t.about.education.map((item) => (
                    <div
                      key={`${item.degree}-${item.period}`}
                      className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3.5"
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                        {item.period}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#181818]">
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
                <p className="pill-label">{t.about.howIWorkLabel}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.about.principles.map((item) => (
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
