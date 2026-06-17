"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { useLang } from "@/hooks/use-lang";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";
import type { PublicProfileSettings } from "@/lib/public-data";

function Marquee({ text, dir }: { text: string; dir: "ltr" | "rtl" }) {
  const repeated = `${text}${text}${text}`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[48%] -translate-y-1/2 select-none overflow-hidden"
    >
      <p
        className={[
          "marquee-track whitespace-nowrap font-heading text-[clamp(4rem,14vw,9rem)]",
          "font-black uppercase leading-none tracking-tighter",
          "text-[#181818]/[0.045]",
          dir === "rtl" ? "marquee-rtl" : "marquee-ltr",
        ].join(" ")}
      >
        {repeated}
      </p>
    </div>
  );
}

const TECH_FLOATERS = [
  { label: "Next.js", x: "8%", y: "20%", delay: 0 },
  { label: "React", x: "80%", y: "14%", delay: 0.6 },
  { label: "TypeScript", x: "72%", y: "78%", delay: 1.1 },
  { label: "Tailwind", x: "12%", y: "82%", delay: 0.3 },
  { label: "Node.js", x: "48%", y: "88%", delay: 0.8 },
  { label: "Laravel", x: "86%", y: "52%", delay: 1.4 },
  { label: "MySQL", x: "5%", y: "54%", delay: 0.5 },
] as const;

function TechFloaters() {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();
  const staticOnly = reducedMotion || shouldUseLiteMotion;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      {TECH_FLOATERS.map(({ label, x, y, delay }) =>
        staticOnly ? (
          <span
            key={label}
            style={{ left: x, top: y, position: "absolute" }}
            className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#181818]/[0.055]"
          >
            {label}
          </span>
        ) : (
          <motion.span
            key={label}
            style={{ left: x, top: y, position: "absolute" }}
            animate={{ y: [0, -10, 0], opacity: [0.45, 0.75, 0.45] }}
            transition={{
              duration: 5 + delay * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#181818]/[0.055]"
          >
            {label}
          </motion.span>
        ),
      )}
    </div>
  );
}

function ProfilePhoto() {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();
  const shouldAnimate = !reducedMotion && !shouldUseLiteMotion;

  return (
    <div className="group relative mx-auto mb-7 h-36 w-36 sm:mb-8 sm:h-40 sm:w-40">
      <div className="absolute -inset-5 rounded-full bg-[#06b56b]/8 blur-2xl transition duration-500 group-hover:bg-[#06b56b]/22" />
      <motion.div
        animate={
          shouldAnimate ? { y: [0, -7, 0], scale: [1, 1.015, 1] } : undefined
        }
        transition={
          shouldAnimate
            ? {
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
            : undefined
        }
        className="relative h-full w-full overflow-hidden rounded-full border border-[#181818]/10 bg-[#e9e1d8] shadow-[0_18px_42px_rgba(24,24,24,0.12)] transition duration-500 group-hover:border-[#06b56b] group-hover:shadow-[0_0_0_1px_rgba(6,181,107,0.28),0_18px_46px_rgba(6,181,107,0.26)]"
      >
        <Image
          src="/profile-image.jpg"
          alt={PROFILE.heroImage.alt}
          fill
          priority
          quality={78}
          sizes="(min-width: 640px) 160px, 136px"
          className="object-cover object-center grayscale-[18%]"
        />
      </motion.div>
    </div>
  );
}

export function StoryHero({ profileSettings }: { profileSettings?: PublicProfileSettings }) {
  const { lang, t } = useLang();
  const isArabic = lang === "ar";
  const headline = profileSettings?.headline || t.headline;
  const cvUrl = profileSettings?.cvUrl || PROFILE.links.resume;

  return (
    <section
      id="hero"
      dir={t.dir}
      className="relative isolate flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center overflow-hidden px-4 pb-18 pt-28 text-center sm:px-6 sm:pb-24 sm:pt-32 lg:px-8"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(6,181,107,0.055),transparent)]"
      />
      <Marquee text={t.marquee} dir={t.dir} />
      <TechFloaters />

      <div className="relative z-10 mx-auto w-full max-w-[760px]">
        <ProfilePhoto />

        <p
          className={`mx-auto mb-4 max-w-[21rem] text-[0.74rem] font-semibold text-[#06a865] sm:max-w-none sm:text-[0.78rem] ${
            isArabic ? "tracking-normal" : "uppercase tracking-[0.18em]"
          }`}
        >
          {t.label}
        </p>

        <h1
          className={`mx-auto max-w-[22rem] text-balance font-heading text-[clamp(2.05rem,5.6vw,3.8rem)] font-black leading-[1.05] text-[#181818] sm:max-w-[760px] ${
            isArabic ? "tracking-normal" : "tracking-[-0.035em]"
          }`}
          style={{ whiteSpace: "pre-line" }}
        >
          {headline}
        </h1>

        <p className="mx-auto mt-5 max-w-[22rem] text-[clamp(0.96rem,2vw,1.1rem)] leading-[1.7] text-[#6f6a61] sm:max-w-[560px]">
          {t.sub}
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-[23rem] flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="#projects"
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#06b56b] px-7 py-3.5 text-[0.94rem] font-semibold text-white shadow-[0_12px_28px_rgba(6,181,107,0.22)] transition hover:bg-[#049f5e] hover:shadow-[0_14px_32px_rgba(6,181,107,0.28)] focus-visible:outline-offset-4 sm:min-w-[11.75rem]"
          >
            {t.cta1}
            <ArrowRight
              className={`h-4 w-4 ${isArabic ? "rotate-180" : ""}`}
              aria-hidden
            />
          </Link>

          <a
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border-2 border-[#181818] bg-transparent px-7 py-3.5 text-[0.94rem] font-semibold text-[#181818] transition hover:bg-[#181818] hover:text-white focus-visible:outline-offset-4 sm:min-w-[11.75rem]"
          >
            <Download className="h-4 w-4" aria-hidden />
            {t.cta2}
          </a>

          <Link
            href="#contact"
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-[#06b56b]/35 bg-[#fffdf8]/75 px-6 py-3 text-[0.9rem] font-semibold text-[#048c55] shadow-[0_8px_22px_rgba(24,24,24,0.05)] transition hover:border-[#06b56b] hover:bg-white focus-visible:outline-offset-4 sm:min-w-[11.75rem]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t.cta3}
          </Link>
        </div>
      </div>
    </section>
  );
}
