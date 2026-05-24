"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Archive,
  ArrowRight,
  Code2,
  ExternalLink,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProjectPrimaryUrl, type Project } from "@/data/projects";
import { useLang } from "@/hooks/use-lang";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

type ProjectCardProps = {
  project: Project;
  /** First visible cards: eager load cover to reduce layout shift in first viewport */
  coverPriority?: boolean;
};

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "Production":
    case "Live":
      return "border border-[#06b56b]/25 bg-[#06b56b]/10 text-[#048c55]";
    case "Prototype":
      return "border border-amber-500/25 bg-amber-50 text-amber-700";
    default:
      return "border border-[rgba(24,24,24,0.12)] bg-[#f5f3ef] text-[#6f6a61]";
  }
}

export function ProjectCard({ project, coverPriority = false }: ProjectCardProps) {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();
  const detailHref = `/projects/${project.slug}`;
  const primaryUrl = getProjectPrimaryUrl(project);
  const AccentIcon = project.archived ? Archive : ExternalLink;
  const copy = t.projects.items[project.slug];
  const title = copy?.title ?? project.title;
  const collection =
    t.projects.collectionLabels[project.collection] ?? project.collection;
  const status = t.projects.statusLabels[project.status] ?? project.status;
  const projectType = copy?.projectType ?? project.projectType;
  const context = copy?.context ?? project.context;
  const description = copy?.description ?? project.description;
  const primaryCtaLabel = copy?.primaryCtaLabel ?? project.primaryCtaLabel;
  const coverFit = project.cover?.fit ?? "cover";
  const isSvgCover = project.cover?.src.endsWith(".svg") ?? false;
  const isContainedCover = coverFit === "contain";
  const visibleStack = project.stack.slice(0, 3);
  const remainingStackCount = Math.max(project.stack.length - visibleStack.length, 0);
  const metaItems = [String(project.year), projectType, status];

  return (
    <motion.article
      whileHover={
        reducedMotion || shouldUseLiteMotion ? undefined : { y: -4 }
      }
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
      dir={t.dir}
      className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[rgba(24,24,24,0.1)] bg-white shadow-[0_2px_12px_rgba(24,24,24,0.06)] transition-shadow hover:shadow-[0_8px_28px_rgba(24,24,24,0.12)]"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[rgba(24,24,24,0.08)]">
        {project.cover ? (
          <div
            className={`relative h-full w-full ${
              isContainedCover
                ? "bg-[#f5f3ef] p-2.5 sm:p-3"
                : "bg-[#e8e4dc]"
            }`}
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              quality={74}
              priority={coverPriority}
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 33vw, (min-width: 640px) 46vw, 92vw"
              unoptimized={isSvgCover}
              className={`h-full w-full transition duration-300 ease-out ${
                isContainedCover
                  ? "rounded-[1.15rem] object-contain"
                  : "object-cover group-hover:scale-[1.03]"
              }`}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#f5f3ef] text-[#6f6a61]">
            <Code2 className="h-5 w-5" />
          </div>
        )}

        {/* Collection badge */}
        <div className="absolute left-3 top-3 inline-flex max-w-[60%] rounded-full border border-[rgba(24,24,24,0.18)] bg-white/95 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#181818] backdrop-blur-none sm:bg-white/90 sm:backdrop-blur-sm sm:left-3.5 sm:top-3.5 sm:text-[0.62rem]">
          {collection}
        </div>
        {/* Status badge */}
        <div
          className={`absolute right-3 top-3 rounded-full px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] sm:right-3.5 sm:top-3.5 sm:text-[0.62rem] ${getStatusBadgeClass(project.status)}`}
        >
          {status}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3.5 p-3.5 sm:p-4">
        <div className="space-y-2.5">
          <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#6f6a61]">
            {context}
          </p>

          <div className="space-y-1.5">
            <h3 className="line-clamp-2 font-heading text-[1rem] font-semibold tracking-[-0.035em] text-[#181818] sm:text-[1.08rem]">
              {title}
            </h3>

            <div className="flex flex-wrap items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#6f6a61]">
              {metaItems.map((item, index) => (
                <div key={item} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <span
                      className="h-1 w-1 rounded-full bg-[#06b56b]/50"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="line-clamp-2 text-[0.92rem] leading-6 text-[#6f6a61]">
              {description}
            </p>
          </div>
        </div>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {visibleStack.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full border border-[rgba(24,24,24,0.1)] bg-[#f5f3ef] px-2.5 py-1 text-[0.72rem] font-medium text-[#6f6a61] transition-colors hover:border-[rgba(24,24,24,0.2)] hover:text-[#181818]"
            >
              {item}
            </span>
          ))}
          {remainingStackCount > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(24,24,24,0.1)] bg-[#f5f3ef] px-2.5 py-1 text-[0.72rem] font-medium text-[#6f6a61]">
              +{remainingStackCount} {t.common.more}
            </span>
          ) : null}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-[rgba(24,24,24,0.08)] pt-3.5 text-sm font-medium">
          {/* Primary CTA — dark charcoal */}
          <Link
            href={detailHref}
            className="btn-primary-dark min-h-9 min-w-[8rem] px-3.5 text-[0.82rem] shadow-[0_2px_8px_rgba(24,24,24,0.2)] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(24,24,24,0.28)]"
          >
            {t.common.viewProject}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>

          {/* Live link */}
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary min-h-9 px-3.5 text-[0.82rem] font-medium text-[#6f6a61] hover:border-[rgba(24,24,24,0.2)] hover:text-[#181818]"
            >
              <AccentIcon className="h-3.5 w-3.5" />
              {primaryCtaLabel}
            </a>
          ) : null}

          {/* GitHub link */}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary min-h-9 px-3.5 text-[0.82rem] font-medium text-[#6f6a61]"
              aria-label={`Open ${title} repository`}
            >
              <Github className="h-3.5 w-3.5" />
              {t.common.github}
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
