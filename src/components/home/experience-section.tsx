"use client";

import { EXPERIENCE } from "@/data/experience";
import type { Experience } from "@/data/experience";
import { PROJECTS, type Project } from "@/data/projects";
import { ExperienceCard } from "@/components/home/experience-card";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useLang } from "@/hooks/use-lang";

function buildSummaryCards(experience: Experience[]) {
  return experience.slice(0, 3).map((item) => ({
    company: item.company,
    role: item.role,
    summary: item.summary,
  }));
}

export function ExperienceSection({
  experience = EXPERIENCE,
  projects = PROJECTS,
}: {
  experience?: Experience[];
  projects?: Project[];
}) {
  const { t } = useLang();
  const featuredExperience = experience.filter((item) => item.featured);
  const summaryCards = buildSummaryCards(featuredExperience.length ? featuredExperience : experience);

  return (
    <section id="experience" dir={t.dir} className="space-y-6 py-3 sm:space-y-8 sm:py-4">
      <Reveal>
        <SectionHeading
          eyebrow={t.experience.heading.eyebrow}
          title="Experience that shaped my work"
          description={t.experience.heading.description}
        />
      </Reveal>

      <Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {summaryCards.map((item) => (
            <article
              key={item.company}
              className="rounded-[1.05rem] border border-[rgba(24,24,24,0.1)] bg-white px-4 py-4 shadow-[0_2px_10px_rgba(24,24,24,0.05)]"
            >
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#6f6a61]">
                {item.company}
              </p>
              <h3 className="mt-2 font-heading text-[1rem] font-semibold tracking-[-0.03em] text-[#181818]">
                {item.role}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6f6a61]">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </Reveal>

      <div className="space-y-4">
        {featuredExperience.map((experience, index) => (
          <Reveal key={experience.id} delay={index * 0.05}>
            <ExperienceCard
              experience={experience}
              relatedProjects={projects.filter((project) =>
                experience.projectSlugs?.includes(project.slug),
              )}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
