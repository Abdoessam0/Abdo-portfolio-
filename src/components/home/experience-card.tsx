"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import type { Experience } from "@/data/experience";
import type { Project } from "@/data/projects";

type ExperienceCardProps = {
  experience: Experience;
  relatedProjects: Project[];
};

export function ExperienceCard({
  experience,
  relatedProjects,
}: ExperienceCardProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const href = `/experience/${experience.slug}`;
  const gallery = experience.gallery ?? [];
  const [activeImg, setActiveImg] = useState(0);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(href);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((i) => (i === 0 ? gallery.length - 1 : i - 1));
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((i) => (i === gallery.length - 1 ? 0 : i + 1));
  };

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="group relative grid cursor-pointer gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-card shadow-black/20 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]"
      role="link"
      tabIndex={0}
      aria-label={`Open ${experience.company} experience details`}
      onClick={() => router.push(href)}
      onKeyDown={onKeyDown}
    >
      {/* ── Left: info ── */}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="pill-label">{experience.period}</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-soft">
            {experience.location}
          </span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">
            {experience.company}
          </p>
          <h3 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-white">
            {experience.role}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            {experience.summary}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {experience.metrics?.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                {metric.label}
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {metric.value}
              </p>
              {metric.helper ? (
                <p className="mt-1 text-xs text-muted">{metric.helper}</p>
              ) : null}
            </div>
          ))}
        </div>

        <ul className="space-y-3">
          {experience.impact.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-soft">
              <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-glow" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-soft"
            >
              {item}
            </span>
          ))}
        </div>

        {/* External links */}
        {experience.links?.length ? (
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              Links
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/[0.06] px-3 py-1 text-xs text-brand-glow transition hover:border-brand/40 hover:bg-brand/10"
                >
                  <ExternalLink className="h-3 w-3" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {relatedProjects.length ? (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              Related work
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  onClick={(event) => event.stopPropagation()}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-soft transition hover:border-brand/30 hover:text-white"
                >
                  {project.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <Link
          href={href}
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-brand-glow"
        >
          View experience details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* ── Right: gallery ── */}
      <div className="relative flex flex-col gap-3">
        {/* Main image */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[1.7rem] bg-[linear-gradient(145deg,rgba(91,124,255,0.18),rgba(139,109,255,0.08),rgba(53,214,164,0.08))] blur-xl" />
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.04]">
            {gallery.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={gallery[activeImg].src}
                    alt={gallery[activeImg].alt}
                    width={gallery[activeImg].width}
                    height={gallery[activeImg].height}
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="aspect-[4/3] w-full bg-[linear-gradient(145deg,rgba(91,124,255,0.18),rgba(139,109,255,0.08),rgba(53,214,164,0.08))]" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(6,8,22,0.6)_100%)]" />

            {/* Navigation arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/60 hover:text-white"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/60 hover:text-white"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Caption overlay */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-[rgba(7,10,22,0.65)] px-4 py-3 backdrop-blur-xl">
              <p className="text-xs leading-5 text-soft">
                {gallery[activeImg]?.alt ?? experience.impact[0]}
              </p>
            </div>

            {/* Dot indicators */}
            {gallery.length > 1 && (
              <div className="absolute right-4 top-4 flex gap-1.5">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImg(idx);
                    }}
                    className={`h-2 w-2 rounded-full transition-all ${
                      idx === activeImg
                        ? "w-5 bg-brand-glow shadow-[0_0_6px_rgba(139,164,255,0.5)]"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        {gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.03] p-2">
            {gallery.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg(idx);
                }}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  idx === activeImg
                    ? "border-brand-glow ring-1 ring-brand-glow/30 shadow-[0_0_12px_rgba(139,164,255,0.25)]"
                    : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                }`}
                aria-label={img.alt}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={80}
                  height={56}
                  className="h-full w-full object-cover"
                />
                {idx === activeImg && (
                  <div className="absolute inset-0 border-2 border-brand-glow/40 rounded-[10px]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
