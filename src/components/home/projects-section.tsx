"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/home/project-card";
import {
  ProjectFilterBar,
  type ProjectFilterValue,
} from "@/components/home/project-filter-bar";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import {
  getProjectPrimaryUrl,
  PROJECTS,
  sortProjects,
  type Project,
  type ProjectDiscipline,
} from "@/data/projects";
import { useLang } from "@/hooks/use-lang";

type DisciplineFilter = "all" | ProjectDiscipline;

const DISCIPLINE_ORDER: ProjectDiscipline[] = [
  "Full-Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "AI",
];

const fallbackOrderedProjects = sortProjects(PROJECTS);

export function ProjectsSection({ projects = fallbackOrderedProjects }: { projects?: Project[] }) {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState<DisciplineFilter>("all");
  const orderedProjects = projects;

  const liveProjectCount = useMemo(
    () =>
      orderedProjects.filter(
        (project) =>
          Boolean(getProjectPrimaryUrl(project)) ||
          Boolean(project.additionalLinks?.length),
      ).length,
    [orderedProjects],
  );
  const clientWorkCount = useMemo(
    () =>
      orderedProjects.filter((project) => project.collection === "Client Work")
        .length,
    [orderedProjects],
  );

  const projectHighlights = useMemo(
    () => [
      {
        label: t.projects.stats.projects.label,
        value: `${orderedProjects.length} ${t.projects.stats.projects.value}`,
        helper: t.projects.stats.projects.helper,
      },
      {
        label: t.projects.stats.live.label,
        value: `${liveProjectCount} ${t.projects.stats.live.value}`,
        helper: t.projects.stats.live.helper,
      },
      {
        label: t.projects.stats.clientWork.label,
        value: `${clientWorkCount} ${t.projects.stats.clientWork.value}`,
        helper: t.projects.stats.clientWork.helper,
      },
    ],
    [clientWorkCount, liveProjectCount, orderedProjects.length, t],
  );

  // Build discipline filter options — only show disciplines that have at least one project
  const disciplineOptions = useMemo(() => {
    const allOption = {
      value: "all" as ProjectFilterValue,
      label: t.projects.disciplineFilters.all.label,
      count: orderedProjects.length,
      helper: t.projects.disciplineFilters.all.helper,
    };

    const opts = [allOption];
    for (const discipline of DISCIPLINE_ORDER) {
      const count = orderedProjects.filter((p) =>
        p.disciplines.includes(discipline),
      ).length;
      if (count === 0) continue; // hide empty discipline filters
      opts.push({
        value: discipline as ProjectFilterValue,
        label: t.projects.disciplineFilters[discipline].label,
        count,
        helper: t.projects.disciplineFilters[discipline].helper,
      });
    }
    return opts;
  }, [orderedProjects, t]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return orderedProjects;
    return orderedProjects.filter((p) =>
      p.disciplines.includes(activeFilter as ProjectDiscipline),
    );
  }, [activeFilter, orderedProjects]);

  const activeOption =
    disciplineOptions.find((o) => o.value === activeFilter) ?? disciplineOptions[0];
  const activeDescription =
    t.projects.disciplineFilters[activeFilter as DisciplineFilter]?.description ??
    t.projects.disciplineFilters.all.description;

  const shownLabel =
    filteredProjects.length === 1
      ? t.projects.shownSingular
      : t.projects.shownPlural;

  return (
    <section
      id="projects"
      dir={t.dir}
      className="space-y-6 py-1 sm:space-y-8 lg:space-y-9"
    >
      <Reveal className="space-y-4 sm:space-y-5">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading
            eyebrow={t.projects.heading.eyebrow}
            title={t.projects.heading.title}
            description={t.projects.heading.description}
          />

          {/* Stats strip */}
          <div className="grid gap-3 sm:grid-cols-3 xl:w-[42rem]">
            {projectHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.05rem] border border-[rgba(24,24,24,0.1)] bg-white px-4 py-3 shadow-[0_2px_8px_rgba(24,24,24,0.06)] sm:rounded-[1.15rem]"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#6f6a61]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#181818]">
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#6f6a61]">
                  {item.helper}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Discipline filter panel */}
        <div className="flex flex-col gap-4 rounded-[1.4rem] border border-[rgba(24,24,24,0.1)] bg-[#fffdf8] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-1.5">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#6f6a61]">
              {t.projects.browseByType}
            </p>
            <p className="text-sm leading-6 text-[#6f6a61]">
              {activeDescription}
            </p>
          </div>

          <ProjectFilterBar
            value={activeFilter as ProjectFilterValue}
            options={disciplineOptions}
            onChange={(v) => setActiveFilter(v as DisciplineFilter)}
            ariaLabel={t.projects.disciplineAriaLabel}
          />
        </div>
      </Reveal>

      <div className="space-y-4">
        <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#6f6a61]">
              {activeOption.label}
            </p>
            <h3 className="font-heading text-[1.45rem] font-black tracking-[-0.04em] text-[#181818] sm:text-2xl">
              {filteredProjects.length} {shownLabel} {t.projects.shown}
            </h3>
          </div>
          <p className="max-w-lg text-sm leading-6 text-[#6f6a61]">
            {activeDescription}
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.03}>
              <ProjectCard project={project} coverPriority={index < 4} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
