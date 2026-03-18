"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Archive,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  variant?: "featured" | "compact";
};

export function ProjectCard({
  project,
  variant = "featured",
}: ProjectCardProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const detailHref = `/projects/${project.slug}`;

  const navigate = () => router.push(detailHref);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate();
    }
  };

  const stop = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const primaryUrl = project.archived ? project.archiveUrl : project.liveUrl;
  const accentIcon = project.archived ? Archive : ExternalLink;
  const AccentIcon = accentIcon;

  if (variant === "compact") {
    return (
      <motion.article
        whileHover={reducedMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={navigate}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="link"
        aria-label={`Open ${project.title} case study`}
        className="group section-frame cursor-pointer overflow-hidden p-4 sm:p-5"
      >
        {project.cover ? (
          <div className="relative mb-5 overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.04]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw"
              className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(6,8,22,0.24)_65%,rgba(6,8,22,0.7))]" />
          </div>
        ) : (
          <div className="mb-5 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(91,124,255,0.16),rgba(139,109,255,0.08),rgba(53,214,164,0.06))] p-5">
            <p className="pill-label">Project system</p>
            <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-soft">
              {project.context}
            </p>
          </div>
        )}

        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-soft">
              {project.context}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${project.archived ? "bg-white/[0.08] text-soft" : "bg-brand/15 text-brand-glow"}`}
            >
              {project.status}
            </span>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-soft"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-sm font-medium">
            <Link
              href={detailHref}
              onClick={stop}
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
                onClick={stop}
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
                onClick={stop}
                className="inline-flex items-center gap-2 text-muted transition hover:text-white"
              >
                <Github className="h-4 w-4" />
                Repository
              </a>
            ) : null}
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={navigate}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`Open ${project.title} case study`}
      className="group section-frame cursor-pointer overflow-hidden"
    >
      <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.03]">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 46vw, 100vw"
            className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="aspect-[16/10] w-full bg-[linear-gradient(135deg,rgba(91,124,255,0.18),rgba(139,109,255,0.08),rgba(53,214,164,0.06))]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_18%,rgba(5,8,18,0.14)_56%,rgba(5,8,18,0.82))]" />
        <div className="absolute left-5 right-5 top-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/12 bg-[rgba(8,12,24,0.75)] px-3 py-1 text-[0.72rem] font-medium text-soft">
            {project.context}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[0.72rem] font-medium ${project.archived ? "bg-white/12 text-white" : "bg-brand/18 text-brand-glow"}`}
          >
            {project.status}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="max-w-xl">
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[1.9rem]">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-soft">
              {project.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <p className="text-sm leading-6 text-muted">{project.description}</p>

        {project.metrics?.length ? (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-3.5 py-3"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                  {metric.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-soft"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-sm font-medium">
          <Link
            href={detailHref}
            onClick={stop}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-canvas transition hover:bg-brand-glow"
          >
            {project.secondaryCtaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              onClick={stop}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-soft transition hover:border-brand/30 hover:text-white"
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
              onClick={stop}
              className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-soft transition hover:border-brand/30 hover:text-white"
              aria-label={`Open ${project.title} repository`}
            >
              <Github className="h-4 w-4" />
            </a>
          ) : (
            <span className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-soft">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
