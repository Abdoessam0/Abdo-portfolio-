"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CompactMediaGallery } from "@/components/ui/compact-media-gallery";
import type { Experience } from "@/data/experience";
import type { Project } from "@/data/projects";
import { useLang } from "@/hooks/use-lang";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

type ExperienceCardProps = {
  experience: Experience;
  relatedProjects: Project[];
};

export function ExperienceCard({
  experience,
  relatedProjects,
}: ExperienceCardProps) {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();
  const href = `/experience/${experience.slug}`;
  const gallery = experience.gallery ?? [];
  const hasGallery = gallery.length > 0;
  const isAfaqyCollage = experience.slug === "afaqy" && gallery.length >= 2;
  const isCompactExperience = experience.slug === "feinsoft";
  const copy = t.experience.items[experience.id];
  const metrics = copy?.metrics ?? experience.metrics;
  const impact = copy?.impact ?? experience.impact;

  return (
    <motion.article
      whileHover={
        reducedMotion || shouldUseLiteMotion ? undefined : { y: -2 }
      }
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      dir={t.dir}
      className={`section-frame overflow-hidden ${
        isCompactExperience ? "p-3.5 sm:p-4" : "p-3.5 sm:p-4"
      }`}
    >
      <div
        className={
          hasGallery
            ? "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)]"
            : "grid gap-3"
        }
      >
        <div className={isCompactExperience ? "max-w-3xl space-y-2.5" : "space-y-3"}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[rgba(24,24,24,0.12)] bg-white px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#6f6a61]">
              {copy?.period ?? experience.period}
            </span>
            <span className="rounded-full border border-[rgba(24,24,24,0.1)] bg-[#f5f3ef] px-2.5 py-1 text-[0.72rem] text-[#6f6a61]">
              {copy?.location ?? experience.location}
            </span>
          </div>

          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              {experience.company}
            </p>
            <h3
              className={`mt-1.5 font-heading font-semibold tracking-[-0.035em] text-[#181818] ${
                isCompactExperience
                  ? "text-[1.25rem] sm:text-[1.45rem]"
                  : "text-[1.35rem] sm:text-[1.65rem]"
              }`}
            >
              {copy?.role ?? experience.role}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              {copy?.summary ?? experience.summary}
            </p>
          </div>

          {metrics?.length ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="story-inner-card rounded-2xl px-3 py-2.5"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                    {metric.label}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-[#181818]">
                    {metric.value}
                  </p>
                  {metric.helper ? (
                    <p className="mt-1 text-xs text-muted">{metric.helper}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          <ul className={isCompactExperience ? "space-y-1.5" : "space-y-2"}>
            {impact.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-6 text-[#6f6a61]">
                <span className="story-bullet mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {experience.stack.map((item) => (
              <span key={item} className="rounded-full border border-[rgba(24,24,24,0.1)] bg-[#f7f4ee] px-2.5 py-1 text-[0.7rem] font-medium text-[#6f6a61]">
                {item}
              </span>
            ))}
          </div>

          {experience.documents?.length ? (
            <div className="space-y-1.5">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                {t.experience.labels.documents}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {experience.documents.map((document) => (
                  <a
                    key={document.href}
                    href={document.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary px-2.5 py-1 text-[0.72rem] font-medium text-[#6f6a61]"
                  >
                    <FileText className="h-3 w-3" />
                    {copy?.documents?.[document.label] ?? document.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {experience.links?.length ? (
            <div className="space-y-1.5">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                {t.experience.labels.links}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {experience.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary px-2.5 py-1 text-[0.72rem] font-medium text-[#6f6a61]"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {relatedProjects.length ? (
            <div className="space-y-1.5">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                {t.experience.labels.relatedWork}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="btn-secondary px-2.5 py-1 text-[0.72rem] font-medium text-[#6f6a61]"
                  >
                    {project.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <Link href={href} className="btn-primary-dark px-3.5 py-2 text-xs">
            {t.experience.labels.details}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {hasGallery ? (
          <div className="story-nested-dark lg:max-w-[24rem] lg:justify-self-end">
          {isAfaqyCollage ? (
            <div className="space-y-2.5">
              <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[rgba(9,15,28,0.88)] p-1.5">
                <div className="relative overflow-hidden rounded-[1rem] border border-white/8">
                  <Image
                    src={gallery[0].src}
                    alt={gallery[0].alt}
                    width={gallery[0].width}
                    height={gallery[0].height}
                    quality={74}
                    sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 38vw, 92vw"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,22,0.08),rgba(7,11,22,0.16)_45%,rgba(4,8,16,0.76)_100%)]" />
                  <div className="absolute bottom-2 left-2 right-2 select-none rounded-2xl border border-white/10 bg-[rgba(7,11,22,0.74)] px-2.5 py-2 backdrop-blur-xl">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#b9b4ab]">
                      {gallery[0].caption ?? "AFAQY — Riyadh"}
                    </p>
                    {gallery[0].captionSub ? (
                      <p className="mt-0.5 text-[0.7rem] leading-[1.3] text-[#ebe7df]">
                        {gallery[0].captionSub}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-[0.8fr_1.2fr]">
                <div className="overflow-hidden rounded-[1.15rem] border border-white/10 bg-[rgba(9,15,28,0.88)] p-1.5">
                  <div className="relative overflow-hidden rounded-[0.9rem] border border-white/8">
                    <Image
                      src={gallery[1].src}
                      alt={gallery[1].alt}
                      width={gallery[1].width}
                      height={gallery[1].height}
                      quality={74}
                      sizes="(min-width: 1280px) 14vw, (min-width: 1024px) 18vw, 44vw"
                      className="aspect-[4/4.8] w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="rounded-[1.15rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,28,48,0.84),rgba(7,12,24,0.96))] p-3">
                  <p className="pill-label">{t.experience.labels.moments}</p>
                  <p className="mt-3 text-sm font-medium text-[#f5f3ef]">
                    {t.experience.labels.momentsTitle}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#c9c4bc]">
                    {t.experience.labels.momentsDescription}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <CompactMediaGallery
              items={gallery}
              imageSizes="(min-width: 1024px) 32vw, 100vw"
              nestedDarkChrome
            />
          )}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
