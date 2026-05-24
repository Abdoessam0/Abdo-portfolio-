"use client";

import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { ExperienceCard } from "@/components/home/experience-card";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useLang } from "@/hooks/use-lang";

const featuredExperience = EXPERIENCE.filter((item) => item.featured);

export function ExperienceSection() {
  const { t } = useLang();

  return (
    <section id="experience" dir={t.dir} className="space-y-6 py-3 sm:space-y-8 sm:py-4">
      <Reveal>
        <SectionHeading
          eyebrow={t.experience.heading.eyebrow}
          title={t.experience.heading.title}
          description={t.experience.heading.description}
        />
      </Reveal>

      <div className="space-y-4">
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
