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
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

type ProjectCardProps = {
  project: Project;
};

function getStatusClassName(status: string) {
  switch (status) {
    case "Production":
      return "border border-brand/20 bg-brand/15 text-brand-glow";
    case "Live":
      return "border border-emerald-400/18 bg-emerald-400/10 text-emerald-200";
    case "Prototype":
      return "border border-amber-300/16 bg-amber-300/12 text-amber-100";
    default:
      return "border border-white/12 bg-[rgba(4,8,16,0.72)] text-soft";
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();
  const detailHref = `/projects/${project.slug}`;
  const primaryUrl = getProjectPrimaryUrl(project);
  const AccentIcon = project.archived ? Archive : ExternalLink;
  const coverFit = project.cover?.fit ?? "cover";
  const isSvgCover = project.cover?.src.endsWith(".svg") ?? false;
  const isContainedCover = coverFit === "contain";
  const visibleStack = project.stack.slice(0, 3);
  const remainingStackCount = Math.max(project.stack.length - visibleStack.length, 0);
  const metaItems = [String(project.year), project.projectType, project.status];

  return (
    <motion.article
      whileHover={
        reducedMotion || shouldUseLiteMotion ? undefined : { y: -3 }
      }
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="group section-frame card-hover flex h-full flex-col overflow-hidden p-0"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/8">
        {project.cover ? (
          <div
            className={`relative h-full w-full ${
              isContainedCover
                ? "bg-[linear-gradient(180deg,rgba(249,252,255,0.98),rgba(230,240,251,0.94))] p-2.5 sm:p-3"
                : "bg-[linear-gradient(180deg,rgba(11,19,34,0.16),rgba(11,19,34,0.32))]"
            }`}
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              quality={74}
              unoptimized={isSvgCover}
              sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 42vw, (min-width: 640px) 46vw, 92vw"
              className={`h-full w-full transition duration-500 ease-out ${
                isContainedCover
                  ? "rounded-[1.15rem] object-contain"
                  : "object-cover group-hover:scale-[1.02]"
              }`}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(95,132,232,0.18),rgba(111,205,245,0.08),rgba(14,22,38,0.9))] text-brand-glow">
            <Code2 className="h-4 w-4" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_30%,rgba(9,17,30,0.12)_100%)]" />
        <div className="absolute left-3 top-3 inline-flex max-w-[60%] rounded-full border border-white/30 bg-[rgba(10,18,32,0.52)] px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm sm:left-3.5 sm:top-3.5 sm:text-[0.62rem]">
          {project.collection}
        </div>
        <div
          className={`absolute right-3 top-3 rounded-full px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] sm:right-3.5 sm:top-3.5 sm:text-[0.62rem] ${getStatusClassName(project.status)}`}
        >
          {project.status}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-3.5 sm:p-4">
        <div className="space-y-2.5">
          <p className="text-[0.64rem] uppercase tracking-[0.22em] text-muted">
            {project.context}
          </p>

          <div className="space-y-1.5">
            <h3 className="line-clamp-2 font-heading text-[1rem] font-semibold tracking-[-0.035em] text-white sm:text-[1.08rem]">
              {project.title}
            </h3>

            <div className="flex flex-wrap items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted">
              {metaItems.map((item, index) => (
                <div key={item} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <span
                      className="h-1 w-1 rounded-full bg-brand-glow/45"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="line-clamp-2 text-[0.92rem] leading-6 text-soft/88">
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {visibleStack.map((item) => (
            <span key={item} className="tech-badge">
              {item}
            </span>
          ))}
          {remainingStackCount > 0 ? (
            <span className="tech-badge">+{remainingStackCount}</span>
          ) : null}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-white/8 pt-3.5 text-sm font-medium">
          <Link
            href={detailHref}
            className="inline-flex min-h-9.5 min-w-[8rem] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f7fbff_0%,#deedff_44%,#8fd7f3_100%)] px-3.5 text-[0.82rem] font-semibold text-[#07111f] shadow-[0_12px_26px_rgba(111,205,245,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(111,205,245,0.2)]"
          >
            View Project
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9.5 items-center justify-center gap-2 rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(123,176,255,0.04))] px-3.5 text-[0.82rem] text-soft transition hover:border-brand/25 hover:bg-brand/10 hover:text-white"
            >
              <AccentIcon className="h-3.5 w-3.5" />
              {project.primaryCtaLabel}
            </a>
          ) : null}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9.5 items-center justify-center gap-2 rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(123,176,255,0.04))] px-3.5 text-[0.82rem] text-soft transition hover:border-brand/25 hover:bg-brand/10 hover:text-white"
              aria-label={`Open ${project.title} repository`}
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
