import "server-only";

import { CERTIFICATES, type Certificate } from "@/data/certificates";
import { EXPERIENCE, type Experience } from "@/data/experience";
import { PROFILE, type Profile, type SkillGroup } from "@/data/profile";
import {
  getProjectPrimaryUrl,
  PROJECTS,
  sortProjects,
  type Project,
  type ProjectCollection,
  type ProjectImage,
} from "@/data/projects";
import { queryRow, queryRows } from "@/lib/db";
import { normalizeTrustedImageUrl } from "@/lib/trusted-image";

export type PublicEducation = Profile["education"][number];

export type PublicProfileSettings = {
  name: string;
  headline: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string;
};

type PublicProjectRow = {
  id: number;
  title: string | null;
  slug: string | null;
  short_description: string | null;
  long_description: string | null;
  category: string | null;
  tech_stack: string | null;
  thumbnail_url: string | null;
  live_url: string | null;
  github_url: string | null;
  featured: number | boolean | string | null;
  published: number | boolean | string | null;
  order_index: number | null;
  created_at: Date | string | null;
  updated_at: Date | string | null;
};

type PublicImageRow = {
  id: number;
  project_id: number;
  image_url: string | null;
  alt_text: string | null;
  order_index: number | null;
};

type PublicSkillRow = {
  id: number;
  name: string | null;
  category: string | null;
  level_label: string | null;
  visible: number | boolean | string | null;
  order_index: number | null;
};

type PublicExperienceRow = {
  id: number;
  company: string | null;
  role: string | null;
  location: string | null;
  start_date: Date | string | null;
  end_date: Date | string | null;
  description: string | null;
  stack: string | null;
  visible: number | boolean | string | null;
  order_index: number | null;
};

type PublicEducationRow = {
  id: number;
  school: string | null;
  degree: string | null;
  location: string | null;
  start_date: Date | string | null;
  end_date: Date | string | null;
  description: string | null;
  visible: number | boolean | string | null;
  order_index: number | null;
};

type PublicCertificateRow = {
  id: number;
  title: string | null;
  issuer: string | null;
  certificate_date: Date | string | null;
  certificate_url: string | null;
  visible: number | boolean | string | null;
  order_index: number | null;
};

type PublicSettingsRow = {
  name: string | null;
  headline: string | null;
  bio: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  cv_url: string | null;
};

const projectCollections = new Set<ProjectCollection>([
  "Client Work",
  "Independent",
  "Prototype",
  "Academic",
]);

const fallbackProjects = sortProjects(PROJECTS);
const fallbackProjectBySlug = new Map(PROJECTS.map((project) => [project.slug, project]));
const fallbackSkillSummaryByCategory = new Map(
  PROFILE.skills.map((group) => [group.title, group.summary]),
);
const fallbackExperienceByCompany = new Map(
  EXPERIENCE.map((item) => [normalizeKey(item.company), item]),
);
const fallbackCertificateByTitle = new Map(
  CERTIFICATES.map((item) => [normalizeKey(item.title), item]),
);

function logPublicDataError(scope: string, error: unknown) {
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: unknown }).code)
      : error instanceof Error && /^[A-Z_]+ is not configured\.$/.test(error.message)
        ? "ENV_MISSING"
        : "UNKNOWN";

  console.error(`[public-data:${scope}] ${code}`);
}

function normalizeKey(value: string | null | undefined) {
  return String(value ?? "").trim().toLowerCase();
}

function nonEmpty(value: string | null | undefined, fallback = "") {
  const trimmed = String(value ?? "").trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function toBoolean(value: number | boolean | string | Buffer | null | undefined) {
  if (value === true || value === 1) return true;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true";
  }
  if (Buffer.isBuffer(value)) {
    return value[0] === 1;
  }

  return false;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 255);
}

function splitList(value: string | null | undefined) {
  return String(value ?? "")
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitDescription(value: string | null | undefined) {
  const parts = String(value ?? "")
    .split(/\r?\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    summary: parts[0] ?? "",
    details: parts,
  };
}

function toDateString(value: Date | string | null | undefined) {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function toYear(value: Date | string | null | undefined, fallback = new Date().getFullYear()) {
  const date = toDateString(value);
  const year = Number(date.slice(0, 4));
  return Number.isFinite(year) && year > 1900 ? year : fallback;
}

function formatMonthYear(value: Date | string | null | undefined) {
  const date = toDateString(value);
  if (!date) return "";
  const [year, month] = date.split("-");
  if (!year) return "";
  if (!month || month === "01") return year;
  return `${year}-${month}`;
}

function formatPeriod(
  start: Date | string | null | undefined,
  end: Date | string | null | undefined,
  fallback = "",
) {
  const startLabel = formatMonthYear(start);
  const endLabel = formatMonthYear(end);

  if (startLabel && endLabel) return `${startLabel} - ${endLabel}`;
  if (startLabel) return `${startLabel} - Present`;
  if (endLabel) return endLabel;
  return fallback;
}

function normalizeCollection(value: string | null | undefined, fallback: ProjectCollection): ProjectCollection {
  const collection = nonEmpty(value);
  return projectCollections.has(collection as ProjectCollection)
    ? (collection as ProjectCollection)
    : fallback;
}

function normalizeImage(src: string | null | undefined, alt: string, fallback?: ProjectImage): ProjectImage | undefined {
  const imageSrc = normalizeTrustedImageUrl(src);
  if (!imageSrc) return fallback;

  return {
    src: imageSrc,
    alt,
    width: fallback?.width ?? 1600,
    height: fallback?.height ?? 1000,
    fit: fallback?.fit ?? (imageSrc.endsWith(".svg") ? "contain" : undefined),
  };
}

function normalizeProjectImage(row: PublicImageRow): ProjectImage | null {
  const src = normalizeTrustedImageUrl(row.image_url);
  if (!src) return null;

  return {
    src,
    alt: nonEmpty(row.alt_text, "Project image"),
    width: 1600,
    height: 1000,
    fit: src.endsWith(".svg") ? "contain" : undefined,
  };
}

function mergeProjectRow(row: PublicProjectRow, images: ProjectImage[]) {
  const slug = nonEmpty(row.slug, slugify(nonEmpty(row.title, `project-${row.id}`)));
  const fallback = fallbackProjectBySlug.get(slug);
  const title = nonEmpty(row.title, fallback?.title ?? "Untitled project");
  const description = nonEmpty(row.short_description, fallback?.description ?? fallback?.summary ?? "");
  const longDescription = nonEmpty(row.long_description, fallback?.caseStudy ?? fallback?.description ?? description);
  const stack = splitList(row.tech_stack);
  const cover = normalizeImage(row.thumbnail_url, `${title} cover image`, fallback?.cover);
  const gallery = images.length > 0 ? images : fallback?.gallery;
  const year = fallback?.year ?? toYear(row.updated_at ?? row.created_at);

  return {
    ...(fallback ?? {}),
    slug,
    title,
    featured: toBoolean(row.featured),
    priority: Number(row.order_index ?? fallback?.priority ?? 0),
    year,
    collection: normalizeCollection(row.category, fallback?.collection ?? "Independent"),
    projectType: fallback?.projectType ?? nonEmpty(row.category, "Portfolio project"),
    context: fallback?.context ?? nonEmpty(row.category, "Portfolio project"),
    summary: description,
    description,
    caseStudy: longDescription,
    role: fallback?.role ?? "Software Engineer",
    timeline: fallback?.timeline ?? String(year),
    status: fallback?.status ?? (row.live_url ? "Live" : "Completed"),
    cover,
    gallery,
    stack: stack.length > 0 ? stack : fallback?.stack ?? [],
    highlights: fallback?.highlights ?? (description ? [description] : []),
    metrics: fallback?.metrics,
    liveUrl: nonEmpty(row.live_url, fallback?.liveUrl),
    repoUrl: nonEmpty(row.github_url, fallback?.repoUrl),
    additionalLinks: fallback?.additionalLinks,
    primaryCtaLabel: fallback?.primaryCtaLabel ?? (row.live_url ? "Live Site" : "View Project"),
    secondaryCtaLabel: fallback?.secondaryCtaLabel ?? "View Project",
    // DB-only records fall back to empty; known slugs get the correct value via static spread above.
    disciplines: fallback?.disciplines ?? [],
  } satisfies Project;
}

function fallbackProfileSettings(): PublicProfileSettings {
  return {
    name: PROFILE.person.name,
    headline: PROFILE.hero.headline,
    bio: PROFILE.about.story.join("\n\n"),
    email: PROFILE.socials.email,
    githubUrl: PROFILE.socials.github,
    linkedinUrl: PROFILE.socials.linkedin,
    cvUrl: PROFILE.links.resume,
  };
}

function normalizeProfileSettings(row: PublicSettingsRow | null): PublicProfileSettings {
  const fallback = fallbackProfileSettings();

  if (!row) return fallback;

  return {
    name: nonEmpty(row.name, fallback.name),
    headline: nonEmpty(row.headline, fallback.headline),
    bio: nonEmpty(row.bio, fallback.bio),
    email: nonEmpty(row.email, fallback.email),
    githubUrl: nonEmpty(row.github_url, fallback.githubUrl),
    linkedinUrl: nonEmpty(row.linkedin_url, fallback.linkedinUrl),
    cvUrl: nonEmpty(row.cv_url, fallback.cvUrl),
  };
}

export async function getProjectImages(projectId: number): Promise<ProjectImage[]> {
  try {
    const rows = await queryRows<PublicImageRow>(
      `
        SELECT id, project_id, image_url, alt_text, order_index
        FROM portfolio_project_images
        WHERE project_id = ?
        ORDER BY order_index ASC, id ASC
      `,
      [projectId],
    );

    return rows.map(normalizeProjectImage).filter((item): item is ProjectImage => Boolean(item));
  } catch (error) {
    logPublicDataError("project-images", error);
    return [];
  }
}

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const rows = await queryRows<PublicProjectRow>(`
      SELECT
        id, title, slug, short_description, long_description, category, tech_stack,
        thumbnail_url, live_url, github_url, featured, published, order_index,
        created_at, updated_at
      FROM portfolio_projects
      ORDER BY order_index ASC, updated_at DESC, id DESC
    `);

    const imageRows = await queryRows<PublicImageRow>(`
      SELECT images.id, images.project_id, images.image_url, images.alt_text, images.order_index
      FROM portfolio_project_images images
      INNER JOIN portfolio_projects projects ON projects.id = images.project_id
      ORDER BY images.project_id ASC, images.order_index ASC, images.id ASC
    `);

    const imagesByProjectId = new Map<number, ProjectImage[]>();
    for (const row of imageRows) {
      const image = normalizeProjectImage(row);
      if (!image) continue;
      const current = imagesByProjectId.get(row.project_id) ?? [];
      current.push(image);
      imagesByProjectId.set(row.project_id, current);
    }

    return rows
      .filter((row) => toBoolean(row.published))
      .map((row) => mergeProjectRow(row, imagesByProjectId.get(row.id) ?? []));
  } catch (error) {
    logPublicDataError("projects", error);
    return fallbackProjects;
  }
}

export async function getVisibleSkills(): Promise<SkillGroup[]> {
  try {
    const rows = await queryRows<PublicSkillRow>(`
      SELECT id, name, category, level_label, visible, order_index
      FROM portfolio_skills
      WHERE visible = 1
      ORDER BY order_index ASC, category ASC, id ASC
    `);

    const groups = new Map<string, SkillGroup>();

    for (const row of rows) {
      const name = nonEmpty(row.name);
      if (!name) continue;

      const category = nonEmpty(row.category, "Other");
      const existing = groups.get(category);

      if (existing) {
        existing.items.push(name);
      } else {
        groups.set(category, {
          title: category,
          summary: fallbackSkillSummaryByCategory.get(category) ?? "",
          items: [name],
        });
      }
    }

    return [...groups.values()];
  } catch (error) {
    logPublicDataError("skills", error);
    return PROFILE.skills;
  }
}

export async function getVisibleExperience(): Promise<Experience[]> {
  try {
    const rows = await queryRows<PublicExperienceRow>(`
      SELECT id, company, role, location, start_date, end_date, description, stack, visible, order_index
      FROM portfolio_experience
      WHERE visible = 1
      ORDER BY order_index ASC, start_date DESC, id DESC
    `);

    return rows.map((row) => {
      const company = nonEmpty(row.company, "Company");
      const role = nonEmpty(row.role, "Role");
      const fallback = fallbackExperienceByCompany.get(normalizeKey(company));
      const parsed = splitDescription(row.description);
      const summary = parsed.summary || fallback?.summary || "";
      const impact = parsed.details.length > 1 ? parsed.details.slice(1) : fallback?.impact ?? (summary ? [summary] : []);
      const stack = splitList(row.stack);
      const slug = fallback?.slug ?? slugify(`${company}-${role}-${row.id}`);

      return {
        ...(fallback ?? {}),
        id: fallback?.id ?? slug,
        slug,
        featured: fallback?.featured ?? true,
        role,
        company,
        location: nonEmpty(row.location, fallback?.location ?? ""),
        period: formatPeriod(row.start_date, row.end_date, fallback?.period ?? ""),
        start: toDateString(row.start_date) || fallback?.start || "",
        end: toDateString(row.end_date) || fallback?.end || "",
        summary,
        stack: stack.length > 0 ? stack : fallback?.stack ?? [],
        impact,
        metrics: fallback?.metrics,
        links: fallback?.links,
        documents: fallback?.documents,
        gallery: fallback?.gallery,
        projectSlugs: fallback?.projectSlugs,
        // Backward-compatible defaults for new required fields.
        type: fallback?.type ?? "Work",
        international: fallback?.international ?? false,
      } satisfies Experience;
    });
  } catch (error) {
    logPublicDataError("experience", error);
    return EXPERIENCE;
  }
}

export async function getVisibleEducation(): Promise<PublicEducation[]> {
  try {
    const rows = await queryRows<PublicEducationRow>(`
      SELECT id, school, degree, location, start_date, end_date, description, visible, order_index
      FROM portfolio_education
      WHERE visible = 1
      ORDER BY order_index ASC, end_date DESC, id DESC
    `);

    return rows.map((row) => ({
      degree: nonEmpty(row.degree, "Degree"),
      institution: nonEmpty(row.school, "School"),
      location: nonEmpty(row.location),
      period: nonEmpty(row.description, formatPeriod(row.start_date, row.end_date)),
    }));
  } catch (error) {
    logPublicDataError("education", error);
    return PROFILE.education;
  }
}

export async function getVisibleCertificates(): Promise<Certificate[]> {
  try {
    const rows = await queryRows<PublicCertificateRow>(`
      SELECT id, title, issuer, certificate_date, certificate_url, visible, order_index
      FROM portfolio_certificates
      WHERE visible = 1
      ORDER BY order_index ASC, certificate_date DESC, id DESC
    `);

    return rows.map((row) => {
      const title = nonEmpty(row.title, "Certificate");
      const fallback = fallbackCertificateByTitle.get(normalizeKey(title));
      const certificateUrl = nonEmpty(row.certificate_url, fallback?.link ?? fallback?.verifyUrl);
      const year = formatMonthYear(row.certificate_date) || fallback?.date || "";

      return {
        ...(fallback ?? {}),
        id: fallback?.id ?? slugify(`${title}-${row.id}`),
        title,
        issuer: nonEmpty(row.issuer, fallback?.issuer ?? ""),
        date: year,
        description: fallback?.description ?? title,
        file: fallback?.file,
        link: certificateUrl,
        thumbnail: fallback?.thumbnail,
        credentialId: fallback?.credentialId,
        skills: fallback?.skills,
        verifyUrl: fallback?.verifyUrl,
      } satisfies Certificate;
    });
  } catch (error) {
    logPublicDataError("certificates", error);
    return CERTIFICATES;
  }
}

export async function getProfileSettings(): Promise<PublicProfileSettings> {
  try {
    const row = await queryRow<PublicSettingsRow>(`
      SELECT name, headline, bio, email, github_url, linkedin_url, cv_url
      FROM portfolio_profile_settings
      WHERE id = 1
    `);

    return normalizeProfileSettings(row);
  } catch (error) {
    logPublicDataError("settings", error);
    return fallbackProfileSettings();
  }
}

export async function getPublicPortfolioData() {
  const [profileSettings, projects, skills, experience, education, certificates] = await Promise.all([
    getProfileSettings(),
    getPublishedProjects(),
    getVisibleSkills(),
    getVisibleExperience(),
    getVisibleEducation(),
    getVisibleCertificates(),
  ]);

  return {
    profileSettings,
    projects,
    skills,
    experience,
    education,
    certificates,
  };
}

export function getPublicProjectPrimaryUrl(project: Project) {
  return getProjectPrimaryUrl(project);
}
