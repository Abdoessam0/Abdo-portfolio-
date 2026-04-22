"use client";

import type { ProjectCollection } from "@/data/projects";

export type ProjectFilterValue = "all" | ProjectCollection;

type ProjectFilterOption = {
  value: ProjectFilterValue;
  label: string;
  count: number;
  helper: string;
};

type ProjectFilterBarProps = {
  value: ProjectFilterValue;
  options: ProjectFilterOption[];
  onChange: (value: ProjectFilterValue) => void;
};

export function ProjectFilterBar({
  value,
  options,
  onChange,
}: ProjectFilterBarProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter portfolio projects"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`group inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-left transition sm:min-h-11 ${
              isActive
                ? "border-[#a9d9ef]/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(95,132,232,0.18),rgba(111,205,245,0.12))] text-white shadow-[0_14px_28px_rgba(14,25,48,0.18)]"
                : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(111,205,245,0.03))] text-soft hover:border-white/18 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(111,205,245,0.06))] hover:text-white"
            }`}
          >
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
              {option.label}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.68rem] font-semibold ${
                isActive
                  ? "bg-white/12 text-white"
                  : "bg-white/[0.05] text-muted group-hover:text-soft"
              }`}
            >
              {option.count}
            </span>
            <span className="hidden text-xs text-muted lg:inline">
              {option.helper}
            </span>
          </button>
        );
      })}
    </div>
  );
}
