"use client";

import { Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const iconByKind = {
  email: Mail,
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  github: Github,
  resume: Download,
} as const;

export function ContactSection() {
  return (
    <section id="contact" className="space-y-7 py-4 sm:space-y-8">
      <Reveal>
        <SectionHeading
          eyebrow={PROFILE.contact.eyebrow}
          title={PROFILE.contact.title}
          description={PROFILE.contact.description}
        />
      </Reveal>

      <Reveal className="section-frame px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="pill-label">Hiring</p>
            <h3 className="mt-3 font-heading text-[1.85rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.2rem]">
              {PROFILE.contact.availability}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Email or LinkedIn is the best place to start. I am based in
              Turkiye and work in Arabic, English, and Turkish.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[34rem]">
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
                    className="flex h-full items-center gap-3 rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3 transition hover:border-brand/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                        {channel.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white">
                        {channel.value}
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
