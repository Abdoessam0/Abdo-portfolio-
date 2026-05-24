"use client";

import { Download, Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useLang } from "@/hooks/use-lang";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const iconByKind = {
  email: Mail,
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  resume: Download,
} as const;

export function ContactSection() {
  const { t } = useLang();
  const { shouldUseLiteEffects } = useMobileOptimization();

  return (
    <section id="contact" dir={t.dir} className="space-y-6 py-4 sm:space-y-7">
      <Reveal>
        <SectionHeading
          eyebrow={t.contact.heading.eyebrow}
          title={t.contact.heading.title}
          description={t.contact.heading.description}
        />
      </Reveal>

      <Reveal className="section-frame relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -left-8 top-5 h-20 w-20 rounded-full bg-[rgba(24,24,24,0.04)] sm:-left-10 sm:h-28 sm:w-28 ${
            shouldUseLiteEffects ? "blur-xl opacity-50" : "blur-3xl"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-[rgba(6,181,107,0.06)] sm:h-32 sm:w-32 ${
            shouldUseLiteEffects ? "blur-xl opacity-40" : "blur-3xl"
          }`}
        />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="pill-label">{t.contact.panelEyebrow}</p>
            <p className="story-accent-badge mt-4 inline-flex min-h-9 items-center gap-2 rounded-full px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.68rem] sm:tracking-[0.22em]">
              <span className="h-2 w-2 rounded-full bg-[#06b56b]" aria-hidden />
              {t.contact.openToWork}
            </p>
            <h3 className="mt-3 font-heading text-[1.55rem] font-semibold tracking-[-0.04em] text-[#181818] sm:text-[2rem]">
              {t.contact.availability}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#6f6a61]">
              {t.contact.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[32rem]">
            {PROFILE.contact.channels.map((channel, index) => {
              const Icon = iconByKind[channel.kind];
              const channelCopy = t.contact.channels[channel.kind];

              return (
                <Reveal
                  key={channel.label}
                  delay={index * 0.05}
                  className="h-full"
                >
                  <a
                    href={channel.href}
                    target={channel.kind === "email" ? undefined : "_blank"}
                    rel={channel.kind === "email" ? undefined : "noreferrer"}
                    className="story-inner-card flex h-full min-h-16 items-center gap-3 rounded-[1.05rem] px-4 py-3 transition hover:border-[#181818] hover:bg-[#fffdf8] focus-visible:outline-offset-2 sm:rounded-[1.15rem]"
                  >
                    <div className="story-icon-wrap h-10 w-10 rounded-2xl">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#6f6a61]">
                        {channelCopy.label}
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-[#181818]">
                        {channelCopy.value ?? channel.value}
                      </p>
                      <p className="mt-1 text-xs text-[#6f6a61]">
                        {channelCopy.note}
                      </p>
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
