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
} from "@/data/projects";

const orderedProjects = sortProjects(PROJECTS);
const liveProjectCount = orderedProjects.filter(
  (project) =>
    Boolean(getProjectPrimaryUrl(project)) ||
    Boolean(project.additionalLinks?.length),
).length;
const clientWorkCount = orderedProjects.filter(
  (project) => project.collection === "Client Work",
).length;
const projectHighlights = [
  {
    label: "Projects",
    value: `${orderedProjects.length} selected`,
    helper: "Client work, shipped products, and prototypes",
  },
  {
    label: "Live",
    value: `${liveProjectCount} public launches`,
    helper: "Confirmed live links and production sites",
  },
  {
    label: "Client work",
    value: `${clientWorkCount} recent builds`,
    helper: "Freelance and production delivery work",
  },
];

function getFilterDescription(value: ProjectFilterValue) {
  switch (value) {
    case "Client Work":
      return "Live and production-facing work for business, education, and admissions projects.";
    case "Independent":
      return "Independent products built around marketplace, platform, and civic workflows.";
    case "Prototype":
      return "Exploratory builds focused on product flow, interfaces, and technical execution.";
    case "Academic":
      return "Academic project work with implementation depth and complete workflows.";
    default:
      return "All projects are shown together in one grid, ordered from newest to oldest, with filtering still available.";
  }
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterValue>("all");

  const filterOptions = useMemo(
    () => [
      {
        value: "all" as const,
        label: "All work",
        count: orderedProjects.length,
        helper: "Newest first",
      },
      {
        value: "Client Work" as const,
        label: "Client Work",
        count: orderedProjects.filter(
          (project) => project.collection === "Client Work",
        ).length,
        helper: "Live builds",
      },
      {
        value: "Independent" as const,
        label: "Independent",
        count: orderedProjects.filter(
          (project) => project.collection === "Independent",
        ).length,
        helper: "Product work",
      },
      {
        value: "Prototype" as const,
        label: "Prototypes",
        count: orderedProjects.filter(
          (project) => project.collection === "Prototype",
        ).length,
        helper: "Concepts and systems",
      },
      {
        value: "Academic" as const,
        label: "Academic",
        count: orderedProjects.filter(
          (project) => project.collection === "Academic",
        ).length,
        helper: "Coursework",
      },
    ],
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return orderedProjects;
    }

    return orderedProjects.filter(
      (project) => project.collection === activeFilter,
    );
  }, [activeFilter]);

  const activeFilterOption =
    filterOptions.find((option) => option.value === activeFilter) ??
    filterOptions[0];

  return (
    <section id="projects" className="space-y-6 py-1 sm:space-y-8 lg:space-y-9">
      <Reveal className="space-y-4 sm:space-y-5">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Projects in one clean, filterable view"
            description="Everything is shown together in a single grid, ordered from newest to oldest so the latest work appears first and stays easy to browse."
          />

          {/* Stats strip — warm light cards */}
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

        {/* Filter panel — warm light surface */}
        <div className="flex flex-col gap-4 rounded-[1.4rem] border border-[rgba(24,24,24,0.1)] bg-[#fffdf8] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-1.5">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#6f6a61]">
              Browse by type
            </p>
            <p className="text-sm leading-6 text-[#6f6a61]">
              {getFilterDescription(activeFilter)}
            </p>
          </div>

          <ProjectFilterBar
            value={activeFilter}
            options={filterOptions}
            onChange={setActiveFilter}
          />
        </div>
      </Reveal>

      <div className="space-y-4">
        <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#6f6a61]">
              {activeFilterOption.label}
            </p>
            <h3 className="font-heading text-[1.45rem] font-black tracking-[-0.04em] text-[#181818] sm:text-2xl">
              {activeFilterOption.count}{" "}
              {activeFilterOption.count === 1 ? "project" : "projects"} shown
            </h3>
          </div>
          <p className="max-w-lg text-sm leading-6 text-[#6f6a61]">
            {getFilterDescription(activeFilter)}
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
