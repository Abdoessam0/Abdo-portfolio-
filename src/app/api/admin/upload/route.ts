import "server-only";

import { NextResponse, type NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { basename, extname, join } from "path";
import { requireAdminApiSession, unauthorizedResponse } from "@/lib/auth";
import {
  getUploadCategoryConfig,
  isUploadCategory,
  validateUploadFile,
  type UploadCategory,
} from "@/lib/admin-upload";

function sanitizeBaseName(value: string) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function safeFilename(category: UploadCategory, originalName: string, mimeType: string): string {
  const config = getUploadCategoryConfig(category);
  const allowedExtensions = config.extensionsByType[mimeType] ?? [];
  const requestedExt = extname(originalName).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const ext = allowedExtensions.includes(requestedExt) ? requestedExt : allowedExtensions[0] ?? "";
  const originalBase = sanitizeBaseName(basename(originalName, requestedExt));
  const base = category === "cv" ? config.defaultBaseName : originalBase || config.defaultBaseName;
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return category === "cv" ? `${base}-${timestamp}${ext}` : `${base}-${timestamp}-${random}${ext}`;
}

export async function POST(request: NextRequest) {
  const session = await requireAdminApiSession(request);
  if (!session) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const categoryValue = formData.get("category") ?? "projects";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!isUploadCategory(categoryValue)) {
      return NextResponse.json({ error: "Invalid upload category." }, { status: 400 });
    }

    const validationError = validateUploadFile(categoryValue, file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const config = getUploadCategoryConfig(categoryValue);
    const uploadDir = join(process.cwd(), "public", "uploads", config.directory);
    await mkdir(uploadDir, { recursive: true });

    const filename = safeFilename(categoryValue, file.name, file.type);
    const filepath = join(uploadDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    const publicUrl = `/uploads/${config.directory}/${filename}`;
    return NextResponse.json({ url: publicUrl, filename, category: categoryValue });
  } catch (error) {
    console.error("[admin-upload]", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
