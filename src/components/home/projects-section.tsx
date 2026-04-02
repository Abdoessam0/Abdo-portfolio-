"use client";

import { PROJECTS, sortProjects } from "@/data/projects";
import { ProjectCard } from "@/components/home/project-card";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const selectedProjects = sortProjects(PROJECTS);
const liveProjectCount = PROJECTS.reduce(
  (count, project) =>
    count +
    (project.liveUrl ? 1 : 0) +
    (project.additionalLinks?.length ?? 0),
  0,
);
const projectHighlights = [
  {
    label: "Selected",
    value: `${selectedProjects.length} projects`,
    helper: "Product, client, and academic work",
  },
  {
    label: "Verified live",
    value: `${liveProjectCount} links`,
    helper: "Only confirmed public demos",
  },
  {
    label: "Focus",
    value: "UI and systems",
    helper: "Performance, clarity, and maintenance",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-6 py-3 sm:space-y-8 sm:py-4">
      <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Production work, client builds, and full-stack systems with verified links, clear project order, and real product visuals."
        />

        <div className="grid gap-3 sm:grid-cols-3 lg:w-[40rem]">
          {projectHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-3.5 sm:rounded-[1.25rem] sm:py-4"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {item.value}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">{item.helper}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {selectedProjects.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 0.05}
            className={index === 0 ? "sm:col-span-2 xl:col-span-2" : ""}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
