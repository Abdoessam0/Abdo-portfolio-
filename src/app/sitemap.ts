import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = new URL(PROFILE.links.portfolio).origin;
  const now = new Date();

  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...PROJECTS.map((project) => ({
      url: `${origin}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...EXPERIENCE.filter((item) => item.slug).map((item) => ({
      url: `${origin}/experience/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
