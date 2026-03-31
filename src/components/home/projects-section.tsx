"use client";

import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/home/project-card";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const selectedProjects = [...PROJECTS].sort((a, b) => a.priority - b.priority);
const liveProjectCount = PROJECTS.filter(
  (project) => project.status === "Live",
).length;
const projectHighlights = [
  {
    label: "Selected",
    value: `${selectedProjects.length} projects`,
    helper: "Product, business, and platform delivery",
  },
  {
    label: "Live now",
    value: `${liveProjectCount} launched`,
    helper: "Production work and active client sites",
  },
  {
    label: "Strength",
    value: "Frontend + delivery",
    helper: "UI systems, structure, and launch quality",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-7 py-4 sm:space-y-8">
      <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Shipped work with stronger product framing, clean interfaces, and real delivery context."
        />

        <div className="grid gap-3 sm:grid-cols-3 lg:w-[40rem]">
          {projectHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-4"
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
