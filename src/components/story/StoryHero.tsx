"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/hooks/use-lang";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

// ─── Background marquee ────────────────────────────────────────────────────
function Marquee({ text, dir }: { text: string; dir: "ltr" | "rtl" }) {
  // Duplicate text so scroll loop is seamless
  const repeated = `${text}${text}${text}`;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden select-none"
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

// ─── Faint floating tech icons (text-based, no SVG imports needed) ─────────
const TECH_FLOATERS = [
  { label: "Next.js",     x: "8%",  y: "18%", delay: 0 },
  { label: "React",       x: "80%", y: "14%", delay: 0.6 },
  { label: "TypeScript",  x: "72%", y: "72%", delay: 1.1 },
  { label: "Tailwind",    x: "12%", y: "76%", delay: 0.3 },
  { label: "Node.js",     x: "50%", y: "88%", delay: 0.8 },
  { label: "Laravel",     x: "88%", y: "48%", delay: 1.4 },
  { label: "MySQL",       x: "4%",  y: "50%", delay: 0.5 },
] as const;

function TechFloaters() {
  const rm = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();
  const staticOnly = rm || shouldUseLiteMotion;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {TECH_FLOATERS.map(({ label, x, y, delay }) =>
        staticOnly ? (
          <span
            key={label}
            style={{ left: x, top: y, position: "absolute" }}
            className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#181818]/[0.07]"
          >
            {label}
          </span>
        ) : (
          <motion.span
            key={label}
            style={{ left: x, top: y, position: "absolute" }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5 + delay * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
            className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#181818]/[0.07]"
          >
            {label}
          </motion.span>
        ),
      )}
    </div>
  );
}

// ─── Profile photo ─────────────────────────────────────────────────────────
function ProfilePhoto() {
  return (
    <div className="group relative mx-auto mb-8 h-32 w-32 sm:h-36 sm:w-36">
      {/* Green glow ring — visible on hover */}
      <span
        className="absolute -inset-1 rounded-full bg-[#06b56b]/0 blur-sm transition-all duration-500 group-hover:bg-[#06b56b]/20 sm:blur-md"
        aria-hidden
      />
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#181818]/10 transition-all duration-500 group-hover:border-[#06b56b]/50 group-hover:scale-[1.04]">
        <Image
          src="/profile-image.jpg"
          alt="Abdelrahman Mohamed"
          fill
          priority
          quality={78}
          sizes="(min-width: 640px) 144px, 128px"
          className="object-cover object-center grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.06]"
        />
      </div>
    </div>
  );
}

// ─── Entrance animation variants ───────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Main hero ─────────────────────────────────────────────────────────────
export function StoryHero() {
  const { t } = useLang();
  const rm = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();

  return (
    <section
      id="hero"
      dir={t.dir}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-32 text-center sm:px-6 lg:px-8"
    >
      {/* Marquee background */}
      <Marquee text={t.marquee} dir={t.dir} />

      {/* Faint floating tech labels */}
      <TechFloaters />

      {/* Hero content */}
      <motion.div
        variants={rm ? undefined : container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-[680px]"
      >
        {/* Profile photo */}
        <motion.div variants={rm ? undefined : item}>
          <ProfilePhoto />
        </motion.div>

        {/* Eyebrow label */}
        <motion.p
          variants={rm ? undefined : item}
          className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#6f6a61]"
        >
          {t.label}
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={rm ? undefined : item}
          className="font-heading text-[clamp(2rem,5.5vw,3.4rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#181818]"
          style={{ whiteSpace: "pre-line" }}
        >
          {t.headline}
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={rm ? undefined : item}
          className="mx-auto mt-5 max-w-[540px] text-[clamp(0.9rem,2vw,1.08rem)] leading-[1.75] text-[#6f6a61]"
        >
          {t.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={rm ? undefined : item}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Primary — view work */}
          <Link
            href="#projects"
            className="btn-primary-dark group px-6 py-3 text-[0.88rem] shadow-[0_4px_14px_rgba(24,24,24,0.22)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(24,24,24,0.3)] focus-visible:outline-offset-4"
          >
            {t.cta1}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>

          {/* Secondary — download CV */}
          <a
            href="/CV updated.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary px-6 py-3 text-[0.88rem] shadow-[0_2px_8px_rgba(24,24,24,0.08)] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(24,24,24,0.1)] focus-visible:outline-offset-4"
          >
            <Download className="h-4 w-4 text-[#06b56b]" aria-hidden />
            {t.cta2}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        {rm || shouldUseLiteMotion ? (
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-[#181818]/15 pt-1.5 opacity-70">
            <span className="h-1.5 w-1 rounded-full bg-[#181818]/30" />
          </span>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.45 }}
          >
            <span className="flex h-9 w-5 items-start justify-center rounded-full border border-[#181818]/15 pt-1.5">
              <motion.span
                animate={{ y: [0, 7, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1 rounded-full bg-[#181818]/30"
              />
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
