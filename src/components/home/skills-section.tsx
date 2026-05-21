"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  Database,
  Bot,
  Search,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiGit,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWordpress,
} from "react-icons/si";
import { PROFILE } from "@/data/profile";
import { Reveal } from "@/components/home/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Code2,
  "Backend and APIs": Server,
  Mobile: Smartphone,
  Databases: Database,
  "AI and Computer Vision": BrainCircuit,
  "CMS and Platforms": Wrench,
  "Deployment and DevOps": Server,
  "SEO and Product Engineering": Search,
  Tools: Wrench,
};

const logoIcons: Record<string, IconType> = {
  "React.js": SiReact,
  "React Native": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "JavaScript ES6+": SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  PHP: SiPhp,
  Laravel: SiLaravel,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Git: SiGit,
  GitHub: SiGithub,
  Vercel: SiVercel,
  Supabase: SiSupabase,
  WordPress: SiWordpress,
  Python: SiPython,
};

const coreStack = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "MySQL",
  "AI Agents",
];

const visibleSkillOrder: Record<string, string[]> = {
  Frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
  "Backend and APIs": ["Node.js", "RESTful APIs", "PHP", "Laravel"],
  Mobile: ["React Native", "Expo", "Expo Router"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB"],
  "AI and Computer Vision": ["Python", "YOLOv8", "OpenCV"],
  "CMS and Platforms": ["WordPress", "cPanel"],
  "Deployment and DevOps": ["Vercel", "Supabase", "GitHub Actions"],
  "SEO and Product Engineering": [
    "SEO-safe Routing",
    "Metadata Handling",
    "Performance Optimization",
  ],
  Tools: ["Git", "GitHub", "Postman", "VS Code"],
};

const coreCategories = new Set(["Frontend", "Backend and APIs", "Databases"]);
const aiWorkflowChips = [
  ["🤖", "AI Coding Agents"],
  ["🧠", "Prompt Engineering"],
  ["⚙️", "Workflow Automation"],
  ["🔍", "Debugging"],
  ["✅", "Code Review"],
  ["🚀", "Faster Prototyping"],
] as const;

// Mobile: show up to 4 chips per card
const MOBILE_CHIP_LIMIT = 4;

function SkillLogo({ label, compact = false }: { label: string; compact?: boolean }) {
  if (label === "AI Agents") {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[#06b56b]/18 bg-[#f0fdf7] text-[#048c55] shadow-[0_1px_8px_rgba(6,181,107,0.08)] transition group-hover:scale-105 group-hover:border-[#06b56b]/32 ${
          compact ? "h-6 w-6 sm:h-7 sm:w-7" : "h-7 w-7 sm:h-8 sm:w-8"
        }`}
      >
        <Bot className={compact ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} aria-hidden />
      </span>
    );
  }

  const Icon = logoIcons[label];
  const fallback = label
    .replace(/\.js|CSS|ES6\+/g, "")
    .split(/[\s/-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[rgba(24,24,24,0.09)] bg-[#fffdf8] text-[#181818] shadow-[0_1px_6px_rgba(24,24,24,0.04)] transition group-hover:border-[#06b56b]/25 group-hover:text-[#048c55] ${
        compact ? "h-6 w-6 sm:h-7 sm:w-7" : "h-7 w-7 sm:h-8 sm:w-8"
      }`}
    >
      {Icon ? (
        <Icon className={compact ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} aria-hidden />
      ) : (
        <span className="text-[0.52rem] font-bold tracking-[-0.03em] sm:text-[0.58rem]">
          {fallback}
        </span>
      )}
    </span>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="group inline-flex min-h-6 items-center gap-1 rounded-full border border-[rgba(24,24,24,0.09)] bg-[#f7f4ee] px-1.5 py-0.5 text-[0.65rem] font-medium text-[#4f4a42] transition hover:border-[#06b56b]/28 hover:bg-[#f0fdf7] hover:text-[#181818] sm:min-h-7 sm:gap-1.5 sm:px-2 sm:text-[0.7rem]">
      <SkillLogo label={label} compact />
      <span>{label}</span>
    </span>
  );
}

export function SkillsSection() {
  const reducedMotion = useReducedMotion();
  const { shouldUseLiteMotion } = useMobileOptimization();
  const shouldAnimate = !reducedMotion && !shouldUseLiteMotion;

  return (
    <section id="skills" className="max-w-full space-y-3 overflow-x-hidden py-2 sm:space-y-5 sm:py-4">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Skills"
          description="A compact view of the technologies I use most across production websites, dashboards, backend work, mobile apps, and AI-assisted workflows."
        />
      </Reveal>

      {/* Core workflow chip bar */}
      <Reveal>
        <div className="rounded-[1rem] border border-[rgba(24,24,24,0.08)] bg-white/72 p-1.5 shadow-[0_8px_22px_rgba(24,24,24,0.045)] sm:rounded-[1.15rem] sm:p-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#6f6a61] sm:px-2.5 sm:py-1 sm:text-[0.62rem]">
              Core workflow
            </span>
            {coreStack.map((item) => (
              <motion.div
                key={item}
                whileHover={shouldAnimate ? { y: -2 } : undefined}
                transition={{ duration: 0.18 }}
                className="group inline-flex min-h-7 items-center gap-1.5 rounded-full border border-[rgba(24,24,24,0.09)] bg-[#fffdf8] px-2 py-0.5 text-[0.7rem] font-semibold text-[#181818] transition hover:border-[#06b56b]/30 hover:bg-[#f0fdf7] sm:min-h-9 sm:gap-2 sm:px-2.5 sm:py-1 sm:text-xs"
              >
                <SkillLogo label={item} />
                <span>{item === "Laravel" ? "PHP/Laravel" : item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* AI Workflow card */}
      <Reveal>
        <div className="section-frame p-2.5 sm:p-3.5">
          <div className="grid gap-2 sm:gap-3 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="story-icon-wrap h-8 w-8 rounded-xl sm:h-9 sm:w-9 sm:rounded-2xl">
                <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-[0.95rem] font-semibold leading-tight tracking-[-0.035em] text-[#181818] sm:text-[1.08rem]">
                  AI Agents & Workflow
                </h3>
                <p className="mt-1 max-w-2xl text-[0.7rem] leading-[1.45] text-[#6f6a61] sm:mt-1.5 sm:text-xs sm:leading-5">
                  Comfortable using AI coding agents to plan, build, debug, refactor, review, and ship software faster while keeping control over code quality.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {aiWorkflowChips.map(([icon, label]) => (
                <span
                  key={label}
                  className="inline-flex min-h-6 items-center gap-1 rounded-full border border-[#06b56b]/16 bg-[#f0fdf7]/70 px-2 py-0.5 text-[0.65rem] font-medium text-[#20483a] shadow-[0_1px_8px_rgba(6,181,107,0.045)] sm:min-h-7 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[0.72rem]"
                >
                  <span className="text-[0.72rem] sm:text-[0.78rem]" aria-hidden>
                    {icon}
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Skill group cards grid — always visible, no opacity:0 initial state */}
      <div className="grid grid-cols-1 gap-2 sm:gap-2.5 md:grid-cols-2 xl:grid-cols-3">
        {PROFILE.skills.map((group) => {
          const Icon = categoryIcons[group.title] ?? Code2;
          const preferred = visibleSkillOrder[group.title] ?? group.items.slice(0, 5);
          const visibleItems = preferred.filter((item) => group.items.includes(item));
          const hiddenCount = Math.max(group.items.length - visibleItems.length, 0);

          // On mobile, show up to MOBILE_CHIP_LIMIT chips
          const mobileVisible = visibleItems.slice(0, MOBILE_CHIP_LIMIT);
          const mobileHidden = Math.max(
            visibleItems.length - MOBILE_CHIP_LIMIT + hiddenCount,
            0
          );

          return (
            <motion.div
              key={group.title}
              whileHover={shouldAnimate ? { y: -3 } : undefined}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="group section-frame h-full p-3 sm:p-3.5"
            >
              <div className="flex h-full flex-col gap-2">
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="story-icon-wrap mt-0.5 h-7 w-7 rounded-lg transition group-hover:scale-105 group-hover:shadow-[0_0_0_3px_rgba(6,181,107,0.08)] sm:h-8 sm:w-8 sm:rounded-xl">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <h3 className="font-heading text-[0.9rem] font-semibold leading-tight tracking-[-0.03em] text-[#181818] sm:text-[1rem]">
                          {group.title}
                        </h3>
                        {coreCategories.has(group.title) ? (
                          <span className="rounded-full border border-[#06b56b]/18 bg-[#f0fdf7] px-1.5 py-0.5 text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-[#048c55] sm:text-[0.58rem]">
                            Core
                          </span>
                        ) : null}
                      </div>
                      {group.summary ? (
                        <p className="mt-0.5 max-w-md text-[0.7rem] leading-[1.4] text-[#6f6a61] sm:mt-1 sm:text-xs sm:leading-5">
                          {group.summary}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Mobile: up to 4 chips + "+N more" badge */}
                <div className="flex flex-wrap gap-1 sm:hidden">
                  {mobileVisible.map((item) => (
                    <SkillChip key={item} label={item} />
                  ))}
                  {mobileHidden > 0 ? (
                    <span className="inline-flex min-h-6 items-center rounded-full border border-[rgba(24,24,24,0.08)] bg-white px-2 py-0.5 text-[0.65rem] font-semibold text-[#6f6a61]">
                      +{mobileHidden} more
                    </span>
                  ) : null}
                </div>

                {/* Desktop: all visible chips */}
                <div className="hidden flex-wrap gap-1.5 sm:flex">
                  {visibleItems.map((item) => (
                    <SkillChip key={item} label={item} />
                  ))}
                  {hiddenCount > 0 ? (
                    <span className="inline-flex min-h-7 items-center rounded-full border border-[rgba(24,24,24,0.08)] bg-white px-2.5 py-1 text-[0.72rem] font-semibold text-[#6f6a61]">
                      +{hiddenCount} more
                    </span>
                  ) : null}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
