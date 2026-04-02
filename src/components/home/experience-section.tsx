"use client";

import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { ExperienceCard } from "@/components/home/experience-card";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";

const featuredExperience = EXPERIENCE.filter((item) => item.featured);

export function ExperienceSection() {
  return (
    <section id="experience" className="space-y-8 py-4 sm:space-y-10">
      <Reveal>
        <SectionHeading eyebrow="Experience" title="Experience" />
      </Reveal>

      <div className="space-y-5">
        {featuredExperience.map((experience, index) => (
          <Reveal key={experience.id} delay={index * 0.05}>
            <ExperienceCard
              experience={experience}
              relatedProjects={PROJECTS.filter((project) =>
                experience.projectSlugs?.includes(project.slug),
              )}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
