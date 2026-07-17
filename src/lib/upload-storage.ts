import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { UploadCategory } from "@/lib/admin-upload";
import { executeStatement, queryRow } from "@/lib/db";

type StoredUpload = {
  key: string;
  url: string;
};

type StoreUploadInput = {
  category: UploadCategory;
  body: Buffer;
  contentType: string;
  extension: string;
};

type DatabaseUpload = {
  body: Buffer;
  contentType: string;
  byteSize: number;
};

type StorageDriver = "database" | "local" | "s3";

const OWNED_PREFIXES = ["projects/", "certificates/", "cv/"] as const;
const REQUIRED_S3_ENV = [
  "S3_ENDPOINT",
  "S3_REGION",
  "S3_BUCKET",
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
  "S3_PUBLIC_BASE_URL",
] as const;
let s3Client: S3Client | null = null;
let databaseSchemaReady: Promise<void> | null = null;
let warnedAboutIncompleteS3 = false;

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function hasCompleteS3Configuration() {
  return REQUIRED_S3_ENV.every((name) => Boolean(process.env[name]?.trim()));
}

function storageDriver(): StorageDriver {
  const configured = process.env.UPLOAD_STORAGE_DRIVER?.trim().toLowerCase();
  if (configured === "s3") {
    if (hasCompleteS3Configuration()) return "s3";
    if (!warnedAboutIncompleteS3) {
      console.warn("[upload-storage] S3 configuration is incomplete; using database storage.");
      warnedAboutIncompleteS3 = true;
    }
    return "database";
  }
  if (configured === "database" || configured === "local") return configured;
  return process.env.NODE_ENV === "production" ? "database" : "local";
}

function publicBaseUrl() {
  return requiredEnv("S3_PUBLIC_BASE_URL").replace(/\/+$/, "");
}

function getS3Client() {
  if (!s3Client) {
    s3Client = new S3Client({
      endpoint: requiredEnv("S3_ENDPOINT"),
      region: requiredEnv("S3_REGION"),
      forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
      credentials: {
        accessKeyId: requiredEnv("S3_ACCESS_KEY_ID"),
        secretAccessKey: requiredEnv("S3_SECRET_ACCESS_KEY"),
      },
    });
  }

  return s3Client;
}

function objectKey(category: UploadCategory, extension: string) {
  const safeExtension = /^\.[a-z0-9]{2,5}$/.test(extension) ? extension : "";
  return `${category}/${randomUUID()}${safeExtension}`;
}

function isOwnedKey(value: string) {
  return OWNED_PREFIXES.some((prefix) => value.startsWith(prefix)) && !value.includes("..") && !/[\r\n\0]/.test(value);
}

async function ensureDatabaseUploadSchema() {
  if (!databaseSchemaReady) {
    databaseSchemaReady = executeStatement(`
      CREATE TABLE IF NOT EXISTS portfolio_uploads (
        object_key VARCHAR(255) NOT NULL,
        content_type VARCHAR(100) NOT NULL,
        byte_size INT UNSIGNED NOT NULL,
        body LONGBLOB NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (object_key),
        KEY portfolio_uploads_created_idx (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `).then(() => undefined);
  }

  return databaseSchemaReady;
}

async function storeDatabaseUpload(key: string, input: StoreUploadInput) {
  await ensureDatabaseUploadSchema();
  await executeStatement(
    `
      INSERT INTO portfolio_uploads (object_key, content_type, byte_size, body)
      VALUES (?, ?, ?, ?)
    `,
    [key, input.contentType, input.body.length, input.body],
  );

  return { key, url: `/api/uploads/${key}` };
}

export async function storeUpload(input: StoreUploadInput): Promise<StoredUpload> {
  const key = objectKey(input.category, input.extension);

  if (storageDriver() === "database") {
    return storeDatabaseUpload(key, input);
  }

  if (storageDriver() === "local") {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Local upload storage is disabled in production.");
    }

    const directory = join(process.cwd(), "public", "uploads", input.category);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, key.slice(input.category.length + 1)), input.body, { flag: "wx" });
    return { key, url: `/uploads/${key}` };
  }

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: requiredEnv("S3_BUCKET"),
      Key: key,
      Body: input.body,
      ContentType: input.contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  return { key, url: `${publicBaseUrl()}/${key}` };
}

type OwnedUploadReference = {
  driver: StorageDriver;
  key: string;
};

function getOwnedUploadReference(url: string | null | undefined): OwnedUploadReference | null {
  if (!url || /[\r\n\0]/.test(url)) return null;

  if (url.startsWith("/api/uploads/")) {
    const key = url.slice("/api/uploads/".length).split(/[?#]/, 1)[0] ?? "";
    return isOwnedKey(key) ? { driver: "database", key } : null;
  }

  if (url.startsWith("/uploads/")) {
    const key = url.slice("/uploads/".length).split(/[?#]/, 1)[0] ?? "";
    return isOwnedKey(key) ? { driver: "local", key } : null;
  }

  if (storageDriver() !== "s3") return null;

  try {
    const base = new URL(`${publicBaseUrl()}/`);
    const candidate = new URL(url);
    if (candidate.protocol !== "https:" || candidate.origin !== base.origin) return null;
    if (!candidate.pathname.startsWith(base.pathname)) return null;
    const key = decodeURIComponent(candidate.pathname.slice(base.pathname.length));
    return isOwnedKey(key) ? { driver: "s3", key } : null;
  } catch {
    return null;
  }
}

export function getOwnedUploadKey(url: string | null | undefined) {
  return getOwnedUploadReference(url)?.key ?? null;
}

export async function getDatabaseUpload(key: string): Promise<DatabaseUpload | null> {
  if (!isOwnedKey(key)) return null;

  await ensureDatabaseUploadSchema();
  const row = await queryRow<{
    body: Buffer;
    content_type: string;
    byte_size: number;
  }>(
    `
      SELECT body, content_type, byte_size
      FROM portfolio_uploads
      WHERE object_key = ?
      LIMIT 1
    `,
    [key],
  );

  if (!row || !Buffer.isBuffer(row.body)) return null;
  return {
    body: row.body,
    contentType: row.content_type,
    byteSize: Number(row.byte_size),
  };
}

export async function deleteOwnedUpload(url: string | null | undefined) {
  const owned = getOwnedUploadReference(url);
  if (!owned) return false;

  if (owned.driver === "database") {
    await ensureDatabaseUploadSchema();
    const result = await executeStatement(
      "DELETE FROM portfolio_uploads WHERE object_key = ?",
      [owned.key],
    );
    return result.affectedRows > 0;
  }

  if (owned.driver === "local") {
    if (process.env.NODE_ENV === "production") return false;
    await unlink(join(process.cwd(), "public", "uploads", ...owned.key.split("/"))).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
    return true;
  }

  await getS3Client().send(new DeleteObjectCommand({ Bucket: requiredEnv("S3_BUCKET"), Key: owned.key }));
  return true;
}

export async function deleteOwnedUploads(urls: Array<string | null | undefined>) {
  const unique = [...new Set(urls.filter((value): value is string => Boolean(value)))];
  const results = await Promise.allSettled(unique.map((url) => deleteOwnedUpload(url)));
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`[upload-storage] delete_failed index=${index} reason=${result.reason instanceof Error ? result.reason.message : "unknown"}`);
    }
  });
}
