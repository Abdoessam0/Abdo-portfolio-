"use client";

import { CheckCircle2, ExternalLink, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { useLang } from "@/hooks/use-lang";

export function FounderSection() {
  const { t } = useLang();

  return (
    <section id="kolaytec" dir={t.dir} className="py-2 sm:py-3">
      <Reveal className="section-frame overflow-hidden p-4 shadow-[0_10px_28px_rgba(24,24,24,0.06)] sm:p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="max-w-2xl space-y-4">
            <p className="pill-label">{t.founder.eyebrow}</p>

            <div className="space-y-2.5">
              <h2 className="font-heading text-[1.85rem] font-semibold leading-tight tracking-[-0.045em] text-[#181818] sm:text-[2.35rem]">
                {t.founder.title}
              </h2>
              <p className="max-w-xl text-sm leading-6 text-[#6f6a61] sm:text-base">
                {t.founder.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {t.founder.proof.map((item) => (
                <span
                  key={item}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[rgba(24,24,24,0.1)] bg-[#f7f4ee] px-3 py-1 text-xs font-semibold text-[#181818] shadow-[0_1px_6px_rgba(24,24,24,0.04)]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#06a865]" aria-hidden />
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap">
              <a
                href={PROFILE.founder.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                aria-label={PROFILE.founder.primaryCta.ariaLabel}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#06b56b] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(6,181,107,0.18)] transition hover:bg-[#049f5e] hover:shadow-[0_10px_22px_rgba(6,181,107,0.24)] sm:w-auto"
              >
                <span className="text-white">{t.founder.primaryCta}</span>
                <ExternalLink className="h-4 w-4 text-white" aria-hidden />
              </a>
              <Link
                href={PROFILE.founder.secondaryCta.href}
                aria-label={PROFILE.founder.secondaryCta.ariaLabel}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[rgba(24,24,24,0.12)] bg-[#fffdf8] px-5 py-3 text-sm font-semibold text-[#181818] transition hover:border-[#06b56b]/35 hover:bg-[#f0fdf7] sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 text-[#06a865]" aria-hidden />
                <span>{t.founder.secondaryCta}</span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[15rem] overflow-hidden rounded-[1.25rem] border border-[rgba(24,24,24,0.1)] bg-[linear-gradient(145deg,#f7f4ee,#e9f6ef_54%,#e7f0f7)] p-3 shadow-[0_10px_24px_rgba(24,24,24,0.07)] sm:min-h-[18rem] sm:rounded-[1.45rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(6,181,107,0.18),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(58,126,210,0.16),transparent_32%)]" />
            <div className="relative flex h-full min-h-[13.5rem] flex-col justify-between overflow-hidden rounded-[1.05rem] border border-white/70 bg-white/62 p-4 backdrop-blur-sm sm:min-h-[16.5rem] sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#048c55]">
                    Kolaytec
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#181818]">
                    {t.founder.companyProject}
                  </p>
                </div>
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white bg-[#efe8dd] shadow-[0_6px_16px_rgba(24,24,24,0.12)]">
                  <Image
                    src={PROFILE.heroImage.src}
                    alt={PROFILE.heroImage.alt}
                    fill
                    sizes="56px"
                    quality={72}
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {t.founder.offerings.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-[rgba(24,24,24,0.08)] bg-[#fffdf8]/82 px-3 py-2.5 text-sm font-semibold text-[#181818] shadow-[0_2px_10px_rgba(24,24,24,0.04)]"
                  >
                    <span>{item}</span>
                    <span className="h-2 w-2 rounded-full bg-[#06b56b]" aria-hidden />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {t.founder.trust.map((item) => (
            <div
              key={item.label}
              className="rounded-[1rem] border border-[rgba(24,24,24,0.08)] bg-[#f7f4ee]/72 px-3.5 py-3"
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a61]">
                {item.label}
              </p>
              <h3 className="mt-1.5 text-sm font-semibold leading-5 text-[#181818]">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
