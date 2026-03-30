"use client";

import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/home/project-card";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const selectedProjects = [...PROJECTS].sort((a, b) => a.priority - b.priority);

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-7 py-4 sm:space-y-8">
      <Reveal>
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Shipped work with context and key outcomes."
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {selectedProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
