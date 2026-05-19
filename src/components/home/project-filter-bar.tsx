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
            className={`group inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-left transition-all focus-visible:outline-offset-2 sm:min-h-11 ${
              isActive
                ? "btn-primary-dark border-[#181818] shadow-[0_4px_14px_rgba(24,24,24,0.22)]"
                : "border-[rgba(24,24,24,0.12)] bg-white text-[#6f6a61] hover:border-[rgba(24,24,24,0.2)] hover:bg-[#fffdf8] hover:text-[#181818]"
            }`}
          >
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]">
              {option.label}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.68rem] font-semibold ${
                isActive
                  ? "bg-white/15 text-white"
                  : "bg-[rgba(24,24,24,0.06)] text-[#6f6a61] group-hover:text-[#181818]"
              }`}
            >
              {option.count}
            </span>
            <span className="hidden text-xs opacity-70 lg:inline">
              {option.helper}
            </span>
          </button>
        );
      })}
    </div>
  );
}
