import { loadEnvConfig } from "@next/env";
import bcrypt from "bcryptjs";
import mysql, { type Connection, type ResultSetHeader } from "mysql2/promise";
import { CERTIFICATES } from "../src/data/certificates";
import { EXPERIENCE } from "../src/data/experience";
import { PROFILE } from "../src/data/profile";
import { getProjectPrimaryUrl, PROJECTS } from "../src/data/projects";

loadEnvConfig(process.cwd());

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function toSqlDate(value: string | undefined | null) {
  if (!value) return null;

  const trimmed = value.trim();
  if (/^\d{4}$/.test(trimmed)) {
    return `${trimmed}-01-01`;
  }

  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    return `${trimmed}-01`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(/^([A-Za-z]{3,9})\s+(\d{4})$/);
  if (!match) return null;

  const monthIndex = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ].indexOf(match[1].slice(0, 3).toLowerCase());

  if (monthIndex === -1) return null;
  return `${match[2]}-${String(monthIndex + 1).padStart(2, "0")}-01`;
}

function parseEducationPeriod(period: string) {
  const rangeMatch = period.match(/^([A-Za-z]{3,9}\s+\d{4})\s*-\s*([A-Za-z]{3,9}\s+\d{4})$/);
  if (rangeMatch) {
    return {
      startDate: toSqlDate(rangeMatch[1]),
      endDate: toSqlDate(rangeMatch[2]),
    };
  }

  const graduatedMatch = period.match(/^Graduated\s+([A-Za-z]{3,9}\s+\d{4})$/);
  if (graduatedMatch) {
    return {
      startDate: null,
      endDate: toSqlDate(graduatedMatch[1]),
    };
  }

  return {
    startDate: null,
    endDate: null,
  };
}

function dedupeProjectImages(
  projectSlug: string,
  cover?: { src: string; alt: string },
  gallery?: Array<{ src: string; alt: string }>,
) {
  const seen = new Set<string>();
  const items: Array<{ imageUrl: string; altText: string; orderIndex: number }> = [];

  const pushImage = (imageUrl: string | undefined, altText: string | undefined) => {
    if (!imageUrl || seen.has(imageUrl)) return;
    seen.add(imageUrl);
    items.push({
      imageUrl,
      altText: altText || `${projectSlug} image`,
      orderIndex: items.length,
    });
  };

  pushImage(cover?.src, cover?.alt || `${projectSlug} cover image`);
  for (const image of gallery ?? []) {
    pushImage(image.src, image.alt);
  }

  return items;
}

async function clearContentTables(connection: Connection) {
  const tables = [
    "portfolio_project_images",
    "portfolio_projects",
    "portfolio_skills",
    "portfolio_experience",
    "portfolio_education",
    "portfolio_certificates",
  ];

  for (const table of tables) {
    await connection.execute(`DELETE FROM ${table}`);
  }
}

async function syncProjects(connection: Connection) {
  for (const project of PROJECTS) {
    const [result] = await connection.execute<ResultSetHeader>(
      `
        INSERT INTO portfolio_projects (
          title, slug, short_description, long_description, category, tech_stack,
          thumbnail_url, live_url, github_url, featured, published, order_index
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        project.title,
        project.slug,
        project.summary,
        project.caseStudy || project.description,
        project.collection,
        project.stack.join(", "),
        project.cover?.src ?? project.gallery?.[0]?.src ?? null,
        getProjectPrimaryUrl(project) ?? null,
        project.repoUrl ?? null,
        project.featured ? 1 : 0,
        project.archived ? 0 : 1,
        project.priority,
      ],
    );

    for (const image of dedupeProjectImages(project.slug, project.cover, project.gallery)) {
      await connection.execute(
        `
          INSERT INTO portfolio_project_images (project_id, image_url, alt_text, order_index)
          VALUES (?, ?, ?, ?)
        `,
        [result.insertId, image.imageUrl, image.altText, image.orderIndex],
      );
    }
  }
}

async function syncSkills(connection: Connection) {
  let orderIndex = 0;

  for (const group of PROFILE.skills) {
    for (const item of group.items) {
      await connection.execute(
        `
          INSERT INTO portfolio_skills (name, category, level_label, visible, order_index)
          VALUES (?, ?, ?, 1, ?)
        `,
        [item, group.title, null, orderIndex],
      );
      orderIndex += 1;
    }
  }
}

async function syncExperience(connection: Connection) {
  for (const [index, item] of EXPERIENCE.entries()) {
    const description = [item.summary, ...item.impact].join("\n");
    await connection.execute(
      `
        INSERT INTO portfolio_experience (
          company, role, location, start_date, end_date, description, stack, visible, order_index
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
      `,
      [
        item.company,
        item.role,
        item.location,
        toSqlDate(item.start),
        toSqlDate(item.end),
        description,
        item.stack.join(", "),
        index,
      ],
    );
  }
}

async function syncEducation(connection: Connection) {
  for (const [index, item] of PROFILE.education.entries()) {
    const { startDate, endDate } = parseEducationPeriod(item.period);
    await connection.execute(
      `
        INSERT INTO portfolio_education (
          school, degree, location, start_date, end_date, description, visible, order_index
        )
        VALUES (?, ?, ?, ?, ?, ?, 1, ?)
      `,
      [
        item.institution,
        item.degree,
        item.location,
        startDate,
        endDate,
        item.period,
        index,
      ],
    );
  }
}

async function syncCertificates(connection: Connection) {
  for (const [index, item] of CERTIFICATES.entries()) {
    await connection.execute(
      `
        INSERT INTO portfolio_certificates (
          title, issuer, certificate_date, certificate_url, visible, order_index
        )
        VALUES (?, ?, ?, ?, 1, ?)
      `,
      [
        item.title,
        item.issuer,
        toSqlDate(item.date),
        item.verifyUrl || item.link || (item.file ? `/certificates/${item.file}` : null),
        index,
      ],
    );
  }
}

async function syncProfileSettings(connection: Connection) {
  await connection.execute(
    `
      INSERT INTO portfolio_profile_settings (
        id, name, headline, bio, email, github_url, linkedin_url, cv_url
      )
      VALUES (1, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        headline = VALUES(headline),
        bio = VALUES(bio),
        email = VALUES(email),
        github_url = VALUES(github_url),
        linkedin_url = VALUES(linkedin_url),
        cv_url = VALUES(cv_url)
    `,
    [
      PROFILE.person.name,
      PROFILE.hero.headline,
      PROFILE.about.story.join("\n\n"),
      PROFILE.socials.email,
      PROFILE.socials.github,
      PROFILE.socials.linkedin,
      PROFILE.links.resume,
    ],
  );
}

async function ensureAbdoAdminUser(connection: Connection) {
  const passwordHash = await bcrypt.hash("admin", 12);
  await connection.execute(
    `
      INSERT INTO portfolio_admin_users (username, email, password_hash, display_name, active)
      VALUES (?, ?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE
        email = VALUES(email),
        password_hash = VALUES(password_hash),
        display_name = VALUES(display_name),
        active = 1
    `,
    ["abdo", PROFILE.socials.email, passwordHash, PROFILE.person.name],
  );
}

async function readCounts(connection: Connection) {
  const tables = [
    "portfolio_projects",
    "portfolio_project_images",
    "portfolio_skills",
    "portfolio_experience",
    "portfolio_education",
    "portfolio_certificates",
    "portfolio_profile_settings",
    "portfolio_admin_users",
  ];
  const counts: Record<string, number> = {};

  for (const table of tables) {
    const [rows] = await connection.query(`SELECT COUNT(*) AS total FROM ${table}`);
    counts[table] = Number((rows as Array<{ total: number }>)[0]?.total ?? 0);
  }

  return counts;
}

async function main() {
  const connection = await mysql.createConnection({
    host: requireEnv("DB_HOST"),
    port: Number(process.env.DB_PORT ?? 3306),
    database: requireEnv("DB_NAME"),
    user: requireEnv("DB_USER"),
    password: requireEnv("DB_PASSWORD"),
    charset: "utf8mb4",
  });

  try {
    await connection.beginTransaction();
    await clearContentTables(connection);
    await syncProjects(connection);
    await syncSkills(connection);
    await syncExperience(connection);
    await syncEducation(connection);
    await syncCertificates(connection);
    await syncProfileSettings(connection);
    await ensureAbdoAdminUser(connection);
    await connection.commit();

    console.log(
      JSON.stringify(
        {
          ok: true,
          counts: await readCounts(connection),
          adminUser: {
            username: "abdo",
            email: PROFILE.socials.email,
          },
        },
        null,
        2,
      ),
    );
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(message);
  process.exit(1);
});
