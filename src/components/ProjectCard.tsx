// src/components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const badge = project.status ?? project.timeline ?? "Project";
  const highlights = project.highlights.slice(0, 2);
  const hasImage = Boolean(project.image);

  return (
    <div className="group flex h-full flex-col rounded-3xl border border-outline bg-panel/80 p-5 shadow-card transition hover:-translate-y-1 hover:border-accent/60">
      <div className="relative mb-4 overflow-hidden rounded-2xl border border-outline bg-surface">
        {hasImage ? (
          <Image
            src={project.image!.src}
            alt={project.image!.alt}
            width={project.image!.width}
            height={project.image!.height}
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
            placeholder={project.image?.blurDataURL ? "blur" : "empty"}
            blurDataURL={project.image?.blurDataURL}
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-surface to-panel text-sm font-semibold text-muted">
            Preview coming soon
          </div>
        )}
        <span className="pointer-events-none absolute inset-x-3 bottom-3 inline-flex items-center justify-center rounded-full bg-surface/80 px-3 py-1 text-xs font-semibold text-accent">
          {badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
          <p className="text-sm text-muted">{project.description}</p>
          <ul className="space-y-1 text-xs text-ink/80">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold text-ink/90">
          {project.stack.slice(0, 5).map((tech) => (
            <span key={tech} className="rounded-full border border-outline px-3 py-1 text-muted">
              {tech}
            </span>
          ))}
          {project.stack.length > 5 ? (
            <span className="rounded-full border border-outline px-3 py-1 text-muted">+{project.stack.length - 5}</span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-2 text-sm font-semibold">
          <Link href={`/projects/${project.slug}`} className="text-accent underline-offset-4 hover:underline">
            View details
          </Link>
          <div className="ml-auto flex gap-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-outline p-2 text-ink transition hover:border-accent hover:text-accent"
                aria-label={`Open ${project.title} live site`}
              >
                <ExternalLink size={16} />
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-outline p-2 text-ink transition hover:border-accent hover:text-accent"
                aria-label={`Open ${project.title} repository`}
              >
                <Github size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
