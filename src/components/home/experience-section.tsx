"use client";

import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { ExperienceCard } from "@/components/home/experience-card";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useLang } from "@/hooks/use-lang";

const featuredExperience = EXPERIENCE.filter((item) => item.featured);
const summaryCards = [
  {
    company: "RE/MAX Wise",
    role: "Software Developer",
    summary:
      "Built and improved production real-estate platforms using Next.js, TypeScript, Tailwind, Supabase, and Vercel.",
  },
  {
    company: "AFAQY",
    role: "Technical Support Engineer",
    summary:
      "Supported fleet operations for 650+ vehicles, handled client support, technical coordination, and reporting workflows.",
  },
  {
    company: "NFS Soft",
    role: "WordPress Developer Intern",
    summary:
      "Built responsive WordPress websites, custom themes, and client-facing web pages.",
  },
];

export function ExperienceSection() {
  const { t } = useLang();

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
