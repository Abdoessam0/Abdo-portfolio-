import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";
import { getPublishedProjects, getVisibleExperience } from "@/lib/public-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = new URL(PROFILE.links.portfolio).origin;
  const now = new Date();
  const [projects, experience] = await Promise.all([
    getPublishedProjects(),
    getVisibleExperience(),
  ]);

  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${origin}/cv`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...projects.map((project) => ({
      url: `${origin}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...experience.filter((item) => item.slug).map((item) => ({
      url: `${origin}/experience/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
