import "server-only";

import { NextResponse, type NextRequest } from "next/server";
import { auditAdminEvent } from "@/lib/audit-log";
import { withAdminApi } from "@/lib/admin-route-utils";
import { isUploadCategory, validateUploadFile } from "@/lib/admin-upload";
import { prepareUpload } from "@/lib/secure-upload";
import { deleteOwnedUpload, storeUpload } from "@/lib/upload-storage";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return withAdminApi(request, async (session) => {
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

    let prepared;
    try {
      prepared = await prepareUpload(categoryValue, file);
    } catch (error) {
      console.warn(
        `[admin-upload] rejected category=${categoryValue} reason=${error instanceof Error ? error.message : "unknown"}`,
      );
      auditAdminEvent("upload.rejected", { userId: session.userId, category: categoryValue });
      return NextResponse.json({ error: "The file is not a valid supported upload." }, { status: 400 });
    }

    try {
      const stored = await storeUpload({ category: categoryValue, ...prepared });
      auditAdminEvent("upload.success", {
        userId: session.userId,
        category: categoryValue,
        bytes: prepared.body.length,
        contentType: prepared.contentType,
      });
      return NextResponse.json({ url: stored.url, key: stored.key, category: categoryValue });
    } catch (error) {
      console.error(
        `[admin-upload] storage_failure category=${categoryValue} reason=${error instanceof Error ? error.message : "unknown"}`,
      );
      auditAdminEvent("upload.failure", { userId: session.userId, category: categoryValue });
      return NextResponse.json({ error: "The file could not be stored." }, { status: 500 });
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withAdminApi(request, async (session) => {
    const body = (await request.json().catch(() => null)) as { url?: unknown } | null;
    if (!body || typeof body.url !== "string") {
      return NextResponse.json({ error: "Invalid cleanup request." }, { status: 400 });
    }

    const deleted = await deleteOwnedUpload(body.url);
    auditAdminEvent("upload.cleanup", { userId: session.userId, deleted });
    return NextResponse.json({ ok: true, deleted });
  });
}
