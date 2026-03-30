"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Archive,
  ArrowRight,
  CalendarDays,
  Code2,
  ExternalLink,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const detailHref = `/projects/${project.slug}`;
  const primaryUrl = project.archived ? project.archiveUrl : project.liveUrl;
  const AccentIcon = project.archived ? Archive : ExternalLink;

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="group section-frame card-hover flex h-full flex-col gap-4 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        {project.cover ? (
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[1rem] border border-white/10 bg-[rgba(11,17,31,0.9)] sm:h-[4.4rem] sm:w-[5.5rem]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="88px"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          </div>
        ) : (
          <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-[1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(95,132,232,0.18),rgba(111,205,245,0.08),rgba(14,22,38,0.9))] text-brand-glow sm:h-[4.4rem] sm:w-[5.5rem]">
            <Code2 className="h-4.5 w-4.5" />
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
              {project.context}
            </p>
            <span
              className={`rounded-full px-2.5 py-1 text-[0.68rem] font-medium ${
                project.archived
                  ? "bg-white/10 text-soft"
                  : "bg-brand/15 text-brand-glow"
              }`}
            >
              {project.status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <CalendarDays className="h-3.5 w-3.5 text-brand-glow/80" />
            <span>{project.timeline}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div>
          <h3 className="font-heading text-[1.15rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.22rem]">
            {project.title}
          </h3>
          <p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-muted">
            {project.summary}
          </p>
        </div>

        {project.metrics?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.metrics.slice(0, 2).map((metric) => (
              <span
                key={metric.label}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-soft"
              >
                {metric.label}: {metric.value}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((item) => (
            <span key={item} className="tech-badge">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-sm font-medium">
          <Link
            href={detailHref}
            className="inline-flex items-center gap-2 text-white transition hover:text-brand-glow"
          >
            {project.secondaryCtaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-muted transition hover:text-white"
            >
              <AccentIcon className="h-4 w-4" />
              {project.primaryCtaLabel}
            </a>
          ) : null}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-soft transition hover:border-brand/30 hover:text-white"
              aria-label={`Open ${project.title} repository`}
            >
              <Github className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
