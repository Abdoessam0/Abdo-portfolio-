"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
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
          <CompactMediaGallery
            items={gallery}
            imageSizes="(min-width: 1024px) 32vw, 100vw"
          />
        </div>
      </div>
    </motion.article>
  );
}
