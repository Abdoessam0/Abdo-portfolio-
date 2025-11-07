import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const href = project.links.live ?? project.links.repo ?? `/projects/${project.slug}`;
  const isExternal = href.startsWith("http");
  const rel = isExternal ? "noreferrer" : undefined;
  const target = isExternal ? "_blank" : undefined;

  return (
    <Link
      href={href}
      aria-label={`Open ${project.title}`}
      target={target}
      rel={rel}
      prefetch={!isExternal}
      className="group flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-4 shadow-card transition hover:-translate-y-1 hover:border-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          width={project.hero.width}
          height={project.hero.height}
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={project.hero.blurDataURL}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{project.period}</p>
          <h3 className="text-lg font-semibold text-zinc-900">{project.title}</h3>
          <p className="text-sm text-zinc-600">{project.summary}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 text-xs font-semibold text-zinc-700">
          {project.stack.slice(0, 4).map((item) => (
            <span key={item} className="rounded-full border border-zinc-200 px-3 py-1">
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
