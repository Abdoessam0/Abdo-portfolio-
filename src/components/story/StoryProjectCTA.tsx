"use client";

import { Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { useLang } from "@/hooks/use-lang";

export function StoryProjectCTA() {
  const { lang, t } = useLang();
  const c = t.projectCta;
  const isArabic = lang === "ar";

  return (
    <section
      id="project-cta"
      dir={t.dir}
      aria-labelledby="project-cta-heading"
      className="space-y-5 py-4 sm:space-y-6 sm:py-6"
    >
      <Reveal>
        <p className="mx-auto max-w-2xl text-center text-sm leading-7 text-[#6f6a61] sm:text-base">
          {c.connector}
        </p>
      </Reveal>

      <Reveal delay={0.04}>
        <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(255,255,255,0.14)] bg-[#1f1f1d] px-5 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:px-8 sm:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className={`inline-flex items-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-[0.68rem] font-semibold text-[#d8d1c6] ${
                isArabic ? "tracking-normal" : "uppercase tracking-[0.2em]"
              }`}
            >
              {c.badge}
            </p>
            <h2
              id="project-cta-heading"
              className={`mt-5 font-heading text-[clamp(1.65rem,4vw,2.35rem)] font-black leading-[1.12] text-white ${
                isArabic ? "tracking-normal" : "tracking-[-0.04em]"
              }`}
            >
              {c.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-[1.75] text-[#d8d1c6] sm:text-base">
              {c.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={c.emailHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.14)] bg-[#fffdf8] px-6 py-3 text-[0.88rem] font-semibold text-[#181818] shadow-sm transition hover:border-[#181818] hover:bg-[#f7f1e7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06b56b]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#06b56b]" aria-hidden />
                {c.btnEmail}
              </a>
              <a
                href={c.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#06b56b] px-6 py-3 text-[0.88rem] font-semibold text-white shadow-[0_4px_18px_rgba(6,181,107,0.35)] transition hover:bg-[#048c55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                {c.btnWhatsapp}
              </a>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-4 py-4 text-start sm:px-5 sm:py-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d8d1c6]">
                {c.cardEmailTitle}
              </p>
              <a
                href={c.emailHref}
                className="mt-2 block break-all text-sm font-semibold text-white underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06b56b]"
              >
                {c.email}
              </a>
              <p className="mt-2 text-xs leading-5 text-[#d8d1c6] sm:text-sm">
                {c.cardEmailDesc}
              </p>
            </div>
            <div className="rounded-2xl border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-4 py-4 text-start sm:px-5 sm:py-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d8d1c6]">
                {c.cardWhatsappTitle}
              </p>
              <a
                href={c.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm font-semibold text-white underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06b56b]"
              >
                {c.whatsappDisplay}
              </a>
              <p className="mt-2 text-xs leading-5 text-[#d8d1c6] sm:text-sm">
                {c.cardWhatsappDesc}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {c.services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.2)] px-4 py-4 text-start"
              >
                <p className="text-sm font-semibold text-white">{svc.title}</p>
                <p className="mt-2 text-xs leading-6 text-[#d8d1c6] sm:text-[0.8125rem]">
                  {svc.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
