import "server-only";

import type { ZodType } from "zod";
import { ensureAdminSchema } from "@/lib/admin-schema";
import { executeStatement, queryRow, queryRows } from "@/lib/db";
import type {
  AdminCertificate,
  AdminEducation,
  AdminExperience,
  AdminProfileSettings,
  AdminProject,
  AdminProjectImage,
  AdminSkill,
  DashboardOverview,
} from "@/lib/admin-types";
import {
  certificateSchema,
  educationSchema,
  experienceSchema,
  profileSettingsSchema,
  projectImageSchema,
  projectPatchSchema,
  projectSchema,
  skillSchema,
} from "@/lib/validators";

type DbValue = string | number | boolean | null;
type ResourcePayload = Record<string, DbValue>;

type ResourceConfig = {
  table: string;
  columns: string[];
  booleanColumns: string[];
  dateColumns: string[];
  searchColumns: string[];
  categoryColumn?: string;
  schema: ZodType<ResourcePayload>;
};

export type ResourceName = "skills" | "experience" | "education" | "certificates";

const resourceConfigs: Record<ResourceName, ResourceConfig> = {
  skills: {
    table: "portfolio_skills",
    columns: ["name", "category", "level_label", "visible", "order_index"],
    booleanColumns: ["visible"],
    dateColumns: [],
    searchColumns: ["name", "category", "level_label"],
    categoryColumn: "category",
    schema: skillSchema,
  },
  experience: {
    table: "portfolio_experience",
    columns: ["company", "role", "location", "start_date", "end_date", "description", "stack", "visible", "order_index"],
    booleanColumns: ["visible"],
    dateColumns: ["start_date", "end_date"],
    searchColumns: ["company", "role", "location", "description", "stack"],
    schema: experienceSchema,
  },
  education: {
    table: "portfolio_education",
    columns: ["school", "degree", "location", "start_date", "end_date", "description", "visible", "order_index"],
    booleanColumns: ["visible"],
    dateColumns: ["start_date", "end_date"],
    searchColumns: ["school", "degree", "location", "description"],
    schema: educationSchema,
  },
  certificates: {
    table: "portfolio_certificates",
    columns: ["title", "issuer", "certificate_date", "certificate_url", "visible", "order_index"],
    booleanColumns: ["visible"],
    dateColumns: ["certificate_date"],
    searchColumns: ["title", "issuer", "certificate_url"],
    schema: certificateSchema,
  },
};

function serializeValue(value: unknown) {
  if (typeof value === "boolean") return value ? 1 : 0;
  if (value === undefined) return null;
  return value as DbValue;
}

function toIso(value: unknown) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function toDateOnly(value: unknown) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function mapBooleans<T extends Record<string, unknown>>(row: T, booleanColumns: string[], dateColumns: string[]) {
  const mapped: Record<string, unknown> = { ...row };

  for (const column of booleanColumns) {
    mapped[column] = Boolean(row[column]);
  }

  for (const column of dateColumns) {
    mapped[column] = toDateOnly(row[column]);
  }

  mapped.created_at = toIso(row.created_at);
  mapped.updated_at = toIso(row.updated_at);

  return mapped;
}

function mapProject(row: Record<string, unknown>): AdminProject {
  return mapBooleans(row, ["featured", "published"], []) as AdminProject;
}

function mapProjectImage(row: Record<string, unknown>): AdminProjectImage {
  return mapBooleans(row, [], []) as AdminProjectImage;
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  await ensureAdminSchema();

  const row = await queryRow<{
    totalProjects: number;
    publishedProjects: number;
    draftProjects: number;
    featuredProjects: number;
    totalSkills: number;
    totalExperience: number;
    totalEducation: number;
    totalCertificates: number;
    hiddenSkills: number;
    hiddenExperience: number;
    profileName: string | null;
    profileHeadline: string | null;
    profileEmail: string | null;
    profileCvUrl: string | null;
    lastUpdatedContent: Date | string | null;
  }>(`
    SELECT
      (SELECT COUNT(*) FROM portfolio_projects) AS totalProjects,
      (SELECT COUNT(*) FROM portfolio_projects WHERE published = 1) AS publishedProjects,
      (SELECT COUNT(*) FROM portfolio_projects WHERE published = 0) AS draftProjects,
      (SELECT COUNT(*) FROM portfolio_projects WHERE featured = 1) AS featuredProjects,
      (SELECT COUNT(*) FROM portfolio_skills) AS totalSkills,
      (SELECT COUNT(*) FROM portfolio_experience) AS totalExperience,
      (SELECT COUNT(*) FROM portfolio_education) AS totalEducation,
      (SELECT COUNT(*) FROM portfolio_certificates) AS totalCertificates,
      (SELECT COUNT(*) FROM portfolio_skills WHERE visible = 0) AS hiddenSkills,
      (SELECT COUNT(*) FROM portfolio_experience WHERE visible = 0) AS hiddenExperience,
      (SELECT name FROM portfolio_profile_settings WHERE id = 1) AS profileName,
      (SELECT headline FROM portfolio_profile_settings WHERE id = 1) AS profileHeadline,
      (SELECT email FROM portfolio_profile_settings WHERE id = 1) AS profileEmail,
      (SELECT cv_url FROM portfolio_profile_settings WHERE id = 1) AS profileCvUrl,
      GREATEST(
        COALESCE((SELECT MAX(updated_at) FROM portfolio_projects), '1970-01-01'),
        COALESCE((SELECT MAX(updated_at) FROM portfolio_skills), '1970-01-01'),
        COALESCE((SELECT MAX(updated_at) FROM portfolio_experience), '1970-01-01'),
        COALESCE((SELECT MAX(updated_at) FROM portfolio_education), '1970-01-01'),
        COALESCE((SELECT MAX(updated_at) FROM portfolio_certificates), '1970-01-01'),
        COALESCE((SELECT MAX(updated_at) FROM portfolio_profile_settings), '1970-01-01')
      ) AS lastUpdatedContent
  `);

  const profileName = String(row?.profileName ?? "").trim();
  const profileHeadline = String(row?.profileHeadline ?? "").trim();
  const profileEmail = String(row?.profileEmail ?? "").trim();
  const profileCvUrl = String(row?.profileCvUrl ?? "").trim();

  return {
    totalProjects: Number(row?.totalProjects ?? 0),
    publishedProjects: Number(row?.publishedProjects ?? 0),
    draftProjects: Number(row?.draftProjects ?? 0),
    featuredProjects: Number(row?.featuredProjects ?? 0),
    totalSkills: Number(row?.totalSkills ?? 0),
    totalExperience: Number(row?.totalExperience ?? 0),
    totalEducation: Number(row?.totalEducation ?? 0),
    totalCertificates: Number(row?.totalCertificates ?? 0),
    hiddenSkills: Number(row?.hiddenSkills ?? 0),
    hiddenExperience: Number(row?.hiddenExperience ?? 0),
    profileName,
    profileHeadline,
    profileEmail,
    profileCvUrl,
    profileComplete: profileName.length > 0 && profileHeadline.length > 0 && profileEmail.length > 0,
    lastUpdatedContent: toIso(row?.lastUpdatedContent),
  };
}

export async function listProjects(filters: { search?: string; published?: string; featured?: string }) {
  await ensureAdminSchema();

  const where: string[] = [];
  const values: unknown[] = [];

  if (filters.search) {
    const search = `%${filters.search}%`;
    where.push("(title LIKE ? OR slug LIKE ? OR short_description LIKE ? OR category LIKE ?)");
    values.push(search, search, search, search);
  }

  if (filters.published === "published") {
    where.push("published = 1");
  } else if (filters.published === "draft") {
    where.push("published = 0");
  }

  if (filters.featured === "featured") {
    where.push("featured = 1");
  } else if (filters.featured === "standard") {
    where.push("featured = 0");
  }

  const rows = await queryRows<Record<string, unknown>>(
    `
      SELECT *
      FROM portfolio_projects
      ${where.length > 0 ? `WHERE ${where.join(" AND ")}` : ""}
      ORDER BY order_index ASC, updated_at DESC, id DESC
    `,
    values,
  );

  return rows.map(mapProject);
}

export async function getProject(id: number) {
  await ensureAdminSchema();
  const row = await queryRow<Record<string, unknown>>("SELECT * FROM portfolio_projects WHERE id = ?", [id]);
  if (!row) return null;

  return mapProject(row);
}

export async function getProjectWithImages(id: number) {
  const project = await getProject(id);
  if (!project) return null;

  const images = await listProjectImages(id);
  return { ...project, images };
}

export async function createProject(input: unknown) {
  await ensureAdminSchema();
  const payload = projectSchema.parse(input);
  const result = await executeStatement(
    `
      INSERT INTO portfolio_projects (
        title, slug, short_description, long_description, category, tech_stack,
        thumbnail_url, live_url, github_url, featured, published, order_index
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      payload.title,
      payload.slug,
      payload.short_description,
      payload.long_description,
      payload.category,
      payload.tech_stack,
      payload.thumbnail_url,
      payload.live_url,
      payload.github_url,
      serializeValue(payload.featured),
      serializeValue(payload.published),
      payload.order_index,
    ],
  );

  const project = await getProject(result.insertId);
  if (!project) {
    throw new Error("Project write failed.");
  }

  return project;
}

export async function updateProject(id: number, input: unknown) {
  await ensureAdminSchema();
  const payload = projectSchema.parse(input);

  const result = await executeStatement(
    `
      UPDATE portfolio_projects
      SET title = ?, slug = ?, short_description = ?, long_description = ?, category = ?,
          tech_stack = ?, thumbnail_url = ?, live_url = ?, github_url = ?,
          featured = ?, published = ?, order_index = ?
      WHERE id = ?
    `,
    [
      payload.title,
      payload.slug,
      payload.short_description,
      payload.long_description,
      payload.category,
      payload.tech_stack,
      payload.thumbnail_url,
      payload.live_url,
      payload.github_url,
      serializeValue(payload.featured),
      serializeValue(payload.published),
      payload.order_index,
      id,
    ],
  );

  if (result.affectedRows === 0) {
    return getProject(id);
  }

  return getProject(id);
}

export async function patchProject(id: number, input: unknown) {
  await ensureAdminSchema();
  const payload = projectPatchSchema.parse(input);
  const columns = Object.keys(payload);

  if (columns.length === 0) {
    return getProject(id);
  }

  const assignments = columns.map((column) => `${column} = ?`).join(", ");
  const values = columns.map((column) => serializeValue(payload[column as keyof typeof payload]));
  const result = await executeStatement(`UPDATE portfolio_projects SET ${assignments} WHERE id = ?`, [...values, id]);

  if (result.affectedRows === 0) {
    return getProject(id);
  }

  return getProject(id);
}

export async function deleteProject(id: number) {
  await ensureAdminSchema();
  const project = await getProject(id);
  if (!project) return false;

  await executeStatement("DELETE FROM portfolio_project_images WHERE project_id = ?", [id]);
  const result = await executeStatement("DELETE FROM portfolio_projects WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export async function listProjectImages(projectId: number) {
  await ensureAdminSchema();
  const rows = await queryRows<Record<string, unknown>>(
    `
      SELECT *
      FROM portfolio_project_images
      WHERE project_id = ?
      ORDER BY order_index ASC, id ASC
    `,
    [projectId],
  );

  return rows.map(mapProjectImage);
}

export async function createProjectImage(projectId: number, input: unknown) {
  await ensureAdminSchema();
  const project = await getProject(projectId);
  if (!project) return null;

  const payload = projectImageSchema.parse(input);
  const result = await executeStatement(
    `
      INSERT INTO portfolio_project_images (project_id, image_url, alt_text, order_index)
      VALUES (?, ?, ?, ?)
    `,
    [projectId, payload.image_url, payload.alt_text, payload.order_index],
  );

  const image = await getProjectImage(projectId, result.insertId);
  if (!image) {
    throw new Error("Project image write failed.");
  }

  return image;
}

export async function getProjectImage(projectId: number, imageId: number) {
  await ensureAdminSchema();
  const row = await queryRow<Record<string, unknown>>(
    "SELECT * FROM portfolio_project_images WHERE project_id = ? AND id = ?",
    [projectId, imageId],
  );

  return row ? mapProjectImage(row) : null;
}

export async function updateProjectImage(projectId: number, imageId: number, input: unknown) {
  await ensureAdminSchema();
  const payload = projectImageSchema.parse(input);
  const result = await executeStatement(
    `
      UPDATE portfolio_project_images
      SET image_url = ?, alt_text = ?, order_index = ?
      WHERE project_id = ? AND id = ?
    `,
    [payload.image_url, payload.alt_text, payload.order_index, projectId, imageId],
  );

  if (result.affectedRows === 0) {
    return getProjectImage(projectId, imageId);
  }

  return getProjectImage(projectId, imageId);
}

export async function deleteProjectImage(projectId: number, imageId: number) {
  await ensureAdminSchema();
  const result = await executeStatement("DELETE FROM portfolio_project_images WHERE project_id = ? AND id = ?", [projectId, imageId]);
  return result.affectedRows > 0;
}

function getResourceConfig(name: ResourceName) {
  return resourceConfigs[name];
}

export async function listResource(name: ResourceName, filters: { search?: string; category?: string } = {}) {
  await ensureAdminSchema();
  const config = getResourceConfig(name);
  const where: string[] = [];
  const values: unknown[] = [];

  if (filters.search) {
    const search = `%${filters.search}%`;
    where.push(`(${config.searchColumns.map((column) => `${column} LIKE ?`).join(" OR ")})`);
    values.push(...config.searchColumns.map(() => search));
  }

  if (config.categoryColumn && filters.category) {
    where.push(`${config.categoryColumn} = ?`);
    values.push(filters.category);
  }

  const rows = await queryRows<Record<string, unknown>>(
    `
      SELECT *
      FROM ${config.table}
      ${where.length > 0 ? `WHERE ${where.join(" AND ")}` : ""}
      ORDER BY order_index ASC, updated_at DESC, id DESC
    `,
    values,
  );

  return rows.map((row) => mapBooleans(row, config.booleanColumns, config.dateColumns));
}

export async function getResource(name: ResourceName, id: number) {
  await ensureAdminSchema();
  const config = getResourceConfig(name);
  const row = await queryRow<Record<string, unknown>>(`SELECT * FROM ${config.table} WHERE id = ?`, [id]);

  return row ? mapBooleans(row, config.booleanColumns, config.dateColumns) : null;
}

export async function createResource(name: ResourceName, input: unknown) {
  await ensureAdminSchema();
  const config = getResourceConfig(name);
  const payload = config.schema.parse(input);
  const columns = config.columns;
  const placeholders = columns.map(() => "?").join(", ");
  const result = await executeStatement(
    `INSERT INTO ${config.table} (${columns.join(", ")}) VALUES (${placeholders})`,
    columns.map((column) => serializeValue(payload[column])),
  );

  const resource = await getResource(name, result.insertId);
  if (!resource) {
    throw new Error(`${name} write failed.`);
  }

  return resource;
}

export async function updateResource(name: ResourceName, id: number, input: unknown) {
  await ensureAdminSchema();
  const config = getResourceConfig(name);
  const payload = config.schema.parse(input);
  const columns = config.columns;
  const assignments = columns.map((column) => `${column} = ?`).join(", ");
  const result = await executeStatement(
    `UPDATE ${config.table} SET ${assignments} WHERE id = ?`,
    [...columns.map((column) => serializeValue(payload[column])), id],
  );

  if (result.affectedRows === 0) {
    return getResource(name, id);
  }

  return getResource(name, id);
}

export async function deleteResource(name: ResourceName, id: number) {
  await ensureAdminSchema();
  const config = getResourceConfig(name);
  const result = await executeStatement(`DELETE FROM ${config.table} WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}

export async function getProfileSettings() {
  await ensureAdminSchema();
  const row = await queryRow<Record<string, unknown>>("SELECT * FROM portfolio_profile_settings WHERE id = 1");

  if (!row) {
    return {
      id: 1,
      name: "",
      headline: "",
      bio: "",
      email: "",
      github_url: "",
      linkedin_url: "",
      cv_url: "",
      whatsapp_url: "",
      instagram_url: "",
      footer_text: "",
      twitter_url: "",
      created_at: null,
      updated_at: null,
    } satisfies AdminProfileSettings;
  }

  return mapBooleans(row, [], []) as AdminProfileSettings;
}

export async function updateProfileSettings(input: unknown) {
  await ensureAdminSchema();
  const payload = profileSettingsSchema.parse(input);

  const result = await executeStatement(
    `
      INSERT INTO portfolio_profile_settings (
        id, name, headline, bio, email, github_url, linkedin_url, cv_url,
        whatsapp_url, instagram_url, footer_text, twitter_url
      )
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        headline = VALUES(headline),
        bio = VALUES(bio),
        email = VALUES(email),
        github_url = VALUES(github_url),
        linkedin_url = VALUES(linkedin_url),
        cv_url = VALUES(cv_url),
        whatsapp_url = VALUES(whatsapp_url),
        instagram_url = VALUES(instagram_url),
        footer_text = VALUES(footer_text),
        twitter_url = VALUES(twitter_url)
    `,
    [
      payload.name,
      payload.headline,
      payload.bio,
      payload.email,
      payload.github_url,
      payload.linkedin_url,
      payload.cv_url,
      payload.whatsapp_url,
      payload.instagram_url,
      payload.footer_text,
      payload.twitter_url,
    ],
  );

  if (result.affectedRows === 0) {
    const settings = await getProfileSettings();
    if (!settings) {
      throw new Error("Profile settings write failed.");
    }

    return settings;
  }

  return getProfileSettings();
}

export type ResourceItem = AdminSkill | AdminExperience | AdminEducation | AdminCertificate;
