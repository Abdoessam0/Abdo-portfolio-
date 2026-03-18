"use client";

import { CheckCircle2, Languages, MapPin } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const iconMap = [CheckCircle2, MapPin, Languages];

export function AboutSection() {
  return (
    <section id="about" className="space-y-8 py-4 sm:space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="About"
          title="Frontend-first. Product-minded."
          description="Polished interfaces, clean systems, and production-tested delivery."
        />
      </Reveal>

      <Reveal className="grid gap-4 xl:grid-cols-[1.14fr_0.86fr]">
        <div className="section-frame p-6 sm:p-7">
          <div className="space-y-5">
            <p className="pill-label">{PROFILE.about.intro}</p>

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

        <div className="section-frame p-5 sm:p-6">
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

          <Reveal className="mt-4 rounded-[1.2rem] border border-white/8 bg-[linear-gradient(145deg,rgba(91,124,255,0.08),rgba(139,109,255,0.04),rgba(53,214,164,0.03))] px-4 py-4">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
              Recent context
            </p>
            <p className="mt-2 text-sm leading-6 text-soft">
              RE/MAX Wise for production real-estate platforms. NFS Soft for
              multilingual business websites. AFAQY for support, diagnostics,
              and reliability.
            </p>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
