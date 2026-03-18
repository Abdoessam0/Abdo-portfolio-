"use client";

import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/home/project-card";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const featuredProjects = PROJECTS.filter((project) => project.featured).sort(
  (a, b) => a.priority - b.priority,
);
const secondaryProjects = PROJECTS.filter((project) => !project.featured).sort(
  (a, b) => a.priority - b.priority,
);

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-8 py-4 sm:space-y-10">
      <Reveal>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Production platforms and shipped products, featured first."
        />
      </Reveal>

      <div className="grid gap-6 xl:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="pt-2">
        <div>
          <p className="pill-label">More work</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Side projects and prototypes for range.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {secondaryProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} variant="compact" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
