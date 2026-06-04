"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { useLang } from "@/hooks/use-lang";

const details = [
  { label: "Role", value: "Full-stack development" },
  { label: "Scope", value: "Business website + SEO + contact flow" },
  { label: "Stack", value: "React / Vite / Tailwind / SEO / Hosting" },
  { label: "Result", value: "Live production platform" },
];

export function FounderSection() {
  const { t } = useLang();

  return (
    <section id="kolaytec" dir={t.dir} className="py-1 sm:py-2">
      <Reveal className="section-frame overflow-hidden p-4 shadow-[0_8px_22px_rgba(24,24,24,0.06)] sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-[#06b56b]/20 bg-[#06b56b]/10 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#048c55]">
                Case Study
              </span>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a61]">
                Featured Case Study / Kolaytec Business Platform
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-[1.45rem] font-semibold leading-tight tracking-[-0.04em] text-[#181818] sm:text-[1.85rem]">
                Kolaytec Business Platform
              </h2>
              <p className="max-w-3xl text-sm font-medium leading-6 text-[#181818]">
                Company website, service pages, multilingual content, contact
                flow, SEO setup, and production deployment.
              </p>
              <p className="max-w-3xl text-sm leading-6 text-[#6f6a61]">
                Designed and developed a production-ready business website for
                Kolaytec to present services, packages, references, and contact
                flows. Built with a clean UI, responsive layouts, multilingual
                support, SEO structure, and conversion-focused pages.
              </p>
              <p className="text-xs font-medium text-[#6f6a61]">
                Built and maintained by Abdelrahman Mohamed under Kolaytec.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[0.9rem] border border-[rgba(24,24,24,0.08)] bg-[#f7f4ee]/72 px-3 py-2.5"
                >
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a61]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#181818]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 pt-0.5 sm:flex-row sm:flex-wrap">
              <a
                href={PROFILE.founder.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                aria-label={PROFILE.founder.primaryCta.ariaLabel}
                className="inline-flex min-h-10 min-w-[11rem] items-center justify-center gap-2 rounded-full bg-[#06b56b] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(6,181,107,0.18)] transition hover:bg-[#049f5e] hover:shadow-[0_10px_22px_rgba(6,181,107,0.24)] sm:w-auto"
              >
                <span className="text-white">View Live Website</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-white" aria-hidden />
              </a>
              <Link
                href="/projects/kolaytec-business-platform"
                aria-label="View Kolaytec Business Platform project details"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[rgba(24,24,24,0.12)] bg-[#fffdf8] px-4 py-2.5 text-sm font-semibold text-[#181818] transition hover:border-[#06b56b]/35 hover:bg-[#f0fdf7] sm:w-auto"
              >
                <span>View Project Details</span>
                <ArrowRight className="h-4 w-4 text-[#06a865]" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.05rem] border border-[rgba(24,24,24,0.1)] bg-[#08111f] shadow-[0_8px_22px_rgba(24,24,24,0.12)]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/projects/kolaytec-business-platform-cover.png"
                alt="Kolaytec website homepage showing the Code. Connect. Create the Future hero section"
                fill
                sizes="(min-width: 1024px) 22rem, 92vw"
                quality={78}
                className="object-cover object-left-top"
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-2.5">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/72">
                Live website
              </span>
              <span className="rounded-full bg-[#06b56b]/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#06d985]">
                Production
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
