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
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();
  const detailHref = `/projects/${project.slug}`;
  const primaryUrl = project.archived ? project.archiveUrl : project.liveUrl;
  const AccentIcon = project.archived ? Archive : ExternalLink;
  const coverFit = project.cover?.fit ?? "cover";

  return (
    <motion.article
      whileHover={
        reducedMotion || shouldUseLiteMotion ? undefined : { y: -4 }
      }
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="group section-frame card-hover flex h-full flex-col overflow-hidden p-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/8">
        {project.cover ? (
          <>
            {coverFit === "contain" ? (
              <Image
                src={project.cover.src}
                alt=""
                fill
                quality={48}
                sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 42vw, (min-width: 640px) 46vw, 92vw"
                className="object-cover opacity-20 blur-xl scale-105"
              />
            ) : null}
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              quality={74}
              sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 42vw, (min-width: 640px) 46vw, 92vw"
              className={`h-full w-full transition duration-700 ${
                coverFit === "contain"
                  ? "bg-[rgba(7,11,22,0.94)] p-3 object-contain sm:p-4"
                  : "object-cover group-hover:scale-[1.04]"
              }`}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(95,132,232,0.18),rgba(111,205,245,0.08),rgba(14,22,38,0.9))] text-brand-glow">
            <Code2 className="h-4.5 w-4.5" />
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,22,0.16),rgba(7,11,22,0.28)_38%,rgba(4,8,16,0.88)_100%)]" />
        <div className="absolute left-3 top-3 inline-flex max-w-[72%] rounded-full border border-white/14 bg-[rgba(4,8,16,0.72)] px-3 py-1.5 text-[0.64rem] uppercase tracking-[0.16em] text-soft sm:left-4 sm:top-4 sm:text-[0.68rem] sm:tracking-[0.18em]">
          {project.context}
        </div>
        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-[0.64rem] font-medium uppercase tracking-[0.16em] sm:right-4 sm:top-4 sm:text-[0.68rem] sm:tracking-[0.18em] ${
            project.archived
              ? "border border-white/12 bg-[rgba(4,8,16,0.72)] text-soft"
              : "border border-brand/20 bg-brand/15 text-brand-glow"
          }`}
        >
          {project.status}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <CalendarDays className="h-3.5 w-3.5 text-brand-glow/80" />
          <span>{project.timeline}</span>
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-[1.08rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.22rem]">
            {project.title}
          </h3>
          <p className="text-sm leading-6 text-muted">{project.summary}</p>
        </div>

        {project.metrics?.length ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {project.metrics.slice(0, 2).map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-2.5"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                  {metric.label}
                </p>
                <p className="mt-1 text-sm font-medium text-soft">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((item) => (
            <span key={item} className="tech-badge">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-white/8 pt-4 text-sm font-medium">
          <Link
            href={detailHref}
            className="inline-flex min-h-10 items-center gap-2 text-white transition hover:text-brand-glow"
          >
            {project.secondaryCtaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 text-muted transition hover:text-white"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-soft transition hover:border-brand/30 hover:text-white sm:ml-auto"
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
