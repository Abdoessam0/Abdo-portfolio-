import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { UploadCategory } from "@/lib/admin-upload";

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

const OWNED_PREFIXES = ["projects/", "certificates/", "cv/"] as const;
let s3Client: S3Client | null = null;

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function storageDriver() {
  const configured = process.env.UPLOAD_STORAGE_DRIVER?.trim().toLowerCase();
  if (configured === "s3" || configured === "local") return configured;
  return process.env.NODE_ENV === "production" ? "s3" : "local";
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

export async function storeUpload(input: StoreUploadInput): Promise<StoredUpload> {
  const key = objectKey(input.category, input.extension);

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

export function getOwnedUploadKey(url: string | null | undefined) {
  if (!url || /[\r\n\0]/.test(url)) return null;

  if (url.startsWith("/uploads/")) {
    const key = url.slice("/uploads/".length).split(/[?#]/, 1)[0] ?? "";
    return isOwnedKey(key) ? key : null;
  }

  if (storageDriver() !== "s3") return null;

  try {
    const base = new URL(`${publicBaseUrl()}/`);
    const candidate = new URL(url);
    if (candidate.protocol !== "https:" || candidate.origin !== base.origin) return null;
    if (!candidate.pathname.startsWith(base.pathname)) return null;
    const key = decodeURIComponent(candidate.pathname.slice(base.pathname.length));
    return isOwnedKey(key) ? key : null;
  } catch {
    return null;
  }
}

export async function deleteOwnedUpload(url: string | null | undefined) {
  const key = getOwnedUploadKey(url);
  if (!key) return false;

  if (storageDriver() === "local") {
    if (process.env.NODE_ENV === "production") return false;
    await unlink(join(process.cwd(), "public", "uploads", ...key.split("/"))).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
    return true;
  }

  await getS3Client().send(new DeleteObjectCommand({ Bucket: requiredEnv("S3_BUCKET"), Key: key }));
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

