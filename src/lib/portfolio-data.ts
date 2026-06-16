import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { CERTIFICATES } from "@/data/certificates";

/**
 * Future adapter for moving the public portfolio from hardcoded data to MySQL.
 * Public pages are not using this file yet, so the public site stays unchanged.
 */
export async function getPublicPortfolioData() {
  return {
    profile: PROFILE,
    projects: PROJECTS,
    experience: EXPERIENCE,
    certificates: CERTIFICATES,
  };
}
