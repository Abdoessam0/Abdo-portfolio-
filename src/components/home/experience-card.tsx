"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CompactMediaGallery } from "@/components/ui/compact-media-gallery";
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
  const reducedMotion = useReducedMotion();
  const href = `/experience/${experience.slug}`;
  const gallery = experience.gallery ?? [];
  const isAfaqyCollage = experience.slug === "afaqy" && gallery.length >= 2;

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="section-frame overflow-hidden p-5 sm:p-6"
    >
      <div className="grid gap-5 lg:grid-cols-[1.14fr_0.86fr]">
        <div className="space-y-4">
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
            <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]">
              {experience.role}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              {experience.summary}
            </p>
          </div>

          {experience.metrics?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {experience.metrics.map((metric) => (
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
          ) : null}

          <ul className="space-y-3">
            {experience.impact.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-soft">
                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-glow" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.stack.map((item) => (
              <span key={item} className="tech-badge">
                {item}
              </span>
            ))}
          </div>

          {experience.documents?.length ? (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                Documents
              </p>
              <div className="flex flex-wrap gap-2">
                {experience.documents.map((document) => (
                  <a
                    key={document.href}
                    href={document.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-soft transition hover:border-brand/30 hover:text-white"
                  >
                    <FileText className="h-3 w-3" />
                    {document.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

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
            className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-brand-glow"
          >
            View experience details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="lg:max-w-[30rem] lg:justify-self-end">
          {isAfaqyCollage ? (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(9,15,28,0.88)] p-2">
                <div className="relative overflow-hidden rounded-[1.2rem] border border-white/8">
                  <Image
                    src={gallery[0].src}
                    alt={gallery[0].alt}
                    width={gallery[0].width}
                    height={gallery[0].height}
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,22,0.08),rgba(7,11,22,0.16)_45%,rgba(4,8,16,0.76)_100%)]" />
                  <div className="absolute bottom-3 left-3 right-3 rounded-[1rem] border border-white/10 bg-[rgba(7,11,22,0.74)] px-3 py-2.5 backdrop-blur-xl">
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted">
                      AFAQY team
                    </p>
                    <p className="mt-1 text-xs leading-5 text-soft">
                      {gallery[0].alt}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[rgba(9,15,28,0.88)] p-2">
                  <div className="relative overflow-hidden rounded-[1rem] border border-white/8">
                    <Image
                      src={gallery[1].src}
                      alt={gallery[1].alt}
                      width={gallery[1].width}
                      height={gallery[1].height}
                      sizes="(min-width: 1024px) 14vw, 100vw"
                      className="aspect-[4/5] w-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,28,48,0.84),rgba(7,12,24,0.96))] p-4">
                  <p className="pill-label">Moments</p>
                  <p className="mt-4 text-sm font-medium text-white">
                    Technical support work in Riyadh with team collaboration and
                    on-site certificate handoff.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Added real internship photos to replace the placeholder
                    graphic so the section reflects the actual AFAQY experience.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <CompactMediaGallery
              items={gallery}
              imageSizes="(min-width: 1024px) 32vw, 100vw"
            />
          )}
        </div>
      </div>
    </motion.article>
  );
}
