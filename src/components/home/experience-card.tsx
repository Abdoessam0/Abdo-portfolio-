"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
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

      {/* Gallery section */}
      <div className="relative">
        <div className="absolute inset-0 rounded-[1.7rem] bg-[linear-gradient(145deg,rgba(91,124,255,0.18),rgba(139,109,255,0.08),rgba(53,214,164,0.08))] blur-xl" />
        <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.04]">
          {gallery.length > 0 ? (
            <Image
              src={gallery[activeImg]?.src ?? gallery[0].src}
              alt={gallery[activeImg]?.alt ?? gallery[0].alt}
              width={gallery[activeImg]?.width ?? gallery[0].width}
              height={gallery[activeImg]?.height ?? gallery[0].height}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="aspect-[5/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="aspect-[5/4] w-full bg-[linear-gradient(145deg,rgba(91,124,255,0.18),rgba(139,109,255,0.08),rgba(53,214,164,0.08))]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(6,8,22,0.72)_100%)]" />

          {/* Photo thumbnails strip */}
          {gallery.length > 1 ? (
            <div className="absolute bottom-16 left-4 right-4 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImg(idx);
                  }}
                  className={`h-10 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    idx === activeImg
                      ? "border-brand-glow shadow-[0_0_8px_rgba(139,164,255,0.4)]"
                      : "border-white/20 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={56}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}

          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-[rgba(7,10,22,0.62)] p-4 backdrop-blur-xl">
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted">
              What stands out
            </p>
            <p className="mt-2 text-sm leading-7 text-soft">
              {experience.impact[0]}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
