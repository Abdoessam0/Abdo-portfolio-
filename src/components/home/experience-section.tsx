"use client";

import { useMemo, useState } from "react";
import type { Experience, ExperienceType } from "@/data/experience";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS, type Project } from "@/data/projects";
import { ExperienceCard } from "@/components/home/experience-card";
import { ProjectFilterBar } from "@/components/home/project-filter-bar";
import type { ProjectFilterValue } from "@/components/home/project-filter-bar";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useLang } from "@/hooks/use-lang";

type ExperienceFilter = "all" | ExperienceType;

function toFilterValue(t: ExperienceType): ExperienceFilter {
  return t;
}

export function ExperienceSection({
  experience = EXPERIENCE,
  projects = PROJECTS,
}: {
  experience?: Experience[];
  projects?: Project[];
}) {
  const { t } = useLang();
  const labels = t.experience.labels;
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>("all");

  // Build per-type counts
  const typeCounts = useMemo(() => {
    const counts: Record<ExperienceType, number> = {
      Work: 0,
      Internship: 0,
      Volunteering: 0,
    };
    for (const item of experience) {
      counts[item.type] = (counts[item.type] ?? 0) + 1;
    }
    return counts;
  }, [experience]);

  // Build filter options — only show types that have at least one entry
  const filterOptions = useMemo(() => {
    const all = {
      value: "all" as ProjectFilterValue,
      label: labels.filterAll,
      count: experience.length,
      helper: "",
    };
    const opts = [all];

    const order: ExperienceType[] = ["Work", "Internship", "Volunteering"];
    for (const type of order) {
      const count = typeCounts[type] ?? 0;
      if (count === 0) continue; // hide empty filters

      const labelMap: Record<ExperienceType, string> = {
        Work: labels.filterWork,
        Internship: labels.filterInternship,
        Volunteering: labels.filterVolunteering,
      };
      opts.push({
        value: toFilterValue(type) as ProjectFilterValue,
        label: labelMap[type],
        count,
        helper: "",
      });
    }
    return opts;
  }, [experience.length, typeCounts, labels]);

  const filteredExperience = useMemo(() => {
    if (activeFilter === "all") return experience;
    return experience.filter((item) => item.type === activeFilter);
  }, [activeFilter, experience]);

  const showFilter = filterOptions.length > 1; // Only show if more than just "All"

  return (
    <section id="experience" dir={t.dir} className="space-y-6 py-3 sm:space-y-8 sm:py-4">
      <Reveal>
        <SectionHeading
          eyebrow={t.experience.heading.eyebrow}
          title="Experience that shaped my work"
          description={t.experience.heading.description}
        />
      </Reveal>

      {showFilter && (
        <Reveal>
          <ProjectFilterBar
            value={activeFilter as ProjectFilterValue}
            options={filterOptions}
            onChange={(v) => setActiveFilter(v as ExperienceFilter)}
            ariaLabel={labels.filterAriaLabel}
          />
        </Reveal>
      )}

      <div className="space-y-4">
        {filteredExperience.length === 0 ? (
          <Reveal>
            <p className="py-8 text-center text-sm text-[#6f6a61]">{labels.emptyState}</p>
          </Reveal>
        ) : (
          filteredExperience.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <ExperienceCard
                experience={item}
                relatedProjects={projects.filter((p) =>
                  item.projectSlugs?.includes(p.slug),
                )}
              />
            </Reveal>
          ))
        )}
      </div>
    </section>
  );
}
