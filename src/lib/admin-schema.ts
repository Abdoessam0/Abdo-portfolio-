import "server-only";

import { executeStatement, queryRow } from "@/lib/db";

let schemaReady: Promise<void> | null = null;

async function createSchema() {
  await executeStatement(`
    CREATE TABLE IF NOT EXISTS portfolio_projects (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      short_description TEXT NOT NULL,
      long_description LONGTEXT NULL,
      category VARCHAR(120) NULL,
      tech_stack TEXT NULL,
      thumbnail_url TEXT NULL,
      live_url TEXT NULL,
      github_url TEXT NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      published TINYINT(1) NOT NULL DEFAULT 0,
      order_index INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY portfolio_projects_slug_unique (slug),
      KEY portfolio_projects_status_idx (published, featured),
      KEY portfolio_projects_order_idx (order_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await executeStatement(`
    CREATE TABLE IF NOT EXISTS portfolio_project_images (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      project_id INT UNSIGNED NOT NULL,
      image_url TEXT NOT NULL,
      alt_text VARCHAR(255) NULL,
      order_index INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY portfolio_project_images_project_idx (project_id),
      KEY portfolio_project_images_order_idx (order_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await executeStatement(`
    CREATE TABLE IF NOT EXISTS portfolio_skills (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(160) NOT NULL,
      category VARCHAR(80) NOT NULL DEFAULT 'Other',
      level_label VARCHAR(80) NULL,
      visible TINYINT(1) NOT NULL DEFAULT 1,
      order_index INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY portfolio_skills_category_idx (category),
      KEY portfolio_skills_order_idx (order_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await executeStatement(`
    CREATE TABLE IF NOT EXISTS portfolio_experience (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      company VARCHAR(180) NOT NULL,
      role VARCHAR(180) NOT NULL,
      location VARCHAR(180) NULL,
      start_date DATE NULL,
      end_date DATE NULL,
      description LONGTEXT NULL,
      stack TEXT NULL,
      visible TINYINT(1) NOT NULL DEFAULT 1,
      order_index INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY portfolio_experience_visible_idx (visible),
      KEY portfolio_experience_order_idx (order_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await executeStatement(`
    CREATE TABLE IF NOT EXISTS portfolio_education (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      school VARCHAR(180) NOT NULL,
      degree VARCHAR(180) NOT NULL,
      location VARCHAR(180) NULL,
      start_date DATE NULL,
      end_date DATE NULL,
      description LONGTEXT NULL,
      visible TINYINT(1) NOT NULL DEFAULT 1,
      order_index INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY portfolio_education_visible_idx (visible),
      KEY portfolio_education_order_idx (order_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await executeStatement(`
    CREATE TABLE IF NOT EXISTS portfolio_certificates (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(220) NOT NULL,
      issuer VARCHAR(180) NULL,
      certificate_date DATE NULL,
      certificate_url TEXT NULL,
      visible TINYINT(1) NOT NULL DEFAULT 1,
      order_index INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY portfolio_certificates_visible_idx (visible),
      KEY portfolio_certificates_order_idx (order_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await executeStatement(`
    CREATE TABLE IF NOT EXISTS portfolio_profile_settings (
      id TINYINT UNSIGNED NOT NULL DEFAULT 1,
      name VARCHAR(180) NOT NULL DEFAULT '',
      headline VARCHAR(255) NOT NULL DEFAULT '',
      bio LONGTEXT NULL,
      email VARCHAR(255) NOT NULL DEFAULT '',
      github_url TEXT NULL,
      linkedin_url TEXT NULL,
      cv_url TEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await executeStatement(`
    CREATE TABLE IF NOT EXISTS portfolio_admin_users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      username VARCHAR(80) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(160) NULL,
      active TINYINT(1) NOT NULL DEFAULT 1,
      session_version INT UNSIGNED NOT NULL DEFAULT 1,
      last_login_at TIMESTAMP NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY portfolio_admin_users_username_unique (username),
      UNIQUE KEY portfolio_admin_users_email_unique (email),
      KEY portfolio_admin_users_active_idx (active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await ensurePortfolioIndexes();
  await ensureProfileSettingsColumns();
  await ensureColumn("portfolio_admin_users", "session_version", "INT UNSIGNED NOT NULL DEFAULT 1 AFTER active");
}

async function ensureIndex(table: string, indexName: string, columns: string[]) {
  const existing = await queryRow<{ total: number }>(
    `
      SELECT COUNT(*) AS total
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND INDEX_NAME = ?
    `,
    [table, indexName],
  );

  if (Number(existing?.total ?? 0) > 0) {
    return;
  }

  try {
    await executeStatement(
      `ALTER TABLE ${table} ADD INDEX ${indexName} (${columns.join(", ")})`,
    );
  } catch (error) {
    const mysqlError = error as { code?: string } | null;
    if (mysqlError?.code !== "ER_DUP_KEYNAME") {
      throw error;
    }
  }
}

async function ensurePortfolioIndexes() {
  await ensureIndex("portfolio_projects", "portfolio_projects_public_idx", [
    "published",
    "featured",
    "order_index",
  ]);
  await ensureIndex("portfolio_skills", "portfolio_skills_visible_category_order_idx", [
    "visible",
    "category",
    "order_index",
  ]);
  await ensureIndex("portfolio_experience", "portfolio_experience_visible_order_idx", [
    "visible",
    "order_index",
  ]);
  await ensureIndex("portfolio_education", "portfolio_education_visible_order_idx", [
    "visible",
    "order_index",
  ]);
  await ensureIndex("portfolio_certificates", "portfolio_certificates_visible_order_idx", [
    "visible",
    "order_index",
  ]);
}

async function ensureColumn(table: string, column: string, definition: string) {
  const existing = await queryRow<{ total: number }>(
    `
      SELECT COUNT(*) AS total
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?
    `,
    [table, column],
  );

  if (Number(existing?.total ?? 0) > 0) return;

  try {
    await executeStatement(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  } catch (error) {
    const mysqlError = error as { code?: string } | null;
    if (mysqlError?.code !== "ER_DUP_FIELDNAME") throw error;
  }
}

async function ensureProfileSettingsColumns() {
  await ensureColumn("portfolio_profile_settings", "whatsapp_url", "TEXT NULL AFTER cv_url");
  await ensureColumn("portfolio_profile_settings", "instagram_url", "TEXT NULL AFTER whatsapp_url");
  await ensureColumn("portfolio_profile_settings", "footer_text", "TEXT NULL AFTER instagram_url");
  await ensureColumn("portfolio_profile_settings", "twitter_url", "TEXT NULL AFTER footer_text");
}

export async function ensureAdminSchema() {
  if (!schemaReady) {
    schemaReady = createSchema();
  }

  return schemaReady;
}
