import { NextResponse, type NextRequest } from "next/server";
import { deleteProjectImage, getProjectImage, updateProjectImage } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { revalidatePortfolioPublicPages } from "@/lib/revalidate-portfolio";
import { parsePositiveId } from "@/lib/validators";
import { auditAdminEvent } from "@/lib/audit-log";
import { deleteOwnedUpload } from "@/lib/upload-storage";

type Context = {
  params: Promise<{ id: string; imageId: string }>;
};

export async function PUT(request: NextRequest, context: Context) {
  return withAdminApi(request, async (session) => {
    const { id, imageId } = await context.params;
    const projectId = parsePositiveId(id);
    const parsedImageId = parsePositiveId(imageId);
    const previous = await getProjectImage(projectId, parsedImageId);
    const image = await updateProjectImage(projectId, parsedImageId, await request.json());

    if (!image) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    if (previous?.image_url && previous.image_url !== image.image_url) await deleteOwnedUpload(previous.image_url);
    auditAdminEvent("project.image.update", { userId: session.userId, projectId, imageId: parsedImageId });

    revalidatePortfolioPublicPages();
    return ok(image);
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  return withAdminApi(request, async (session) => {
    const { id, imageId } = await context.params;
    const projectId = parsePositiveId(id);
    const parsedImageId = parsePositiveId(imageId);
    const previous = await getProjectImage(projectId, parsedImageId);
    const deleted = await deleteProjectImage(projectId, parsedImageId);
    if (!deleted) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    await deleteOwnedUpload(previous?.image_url);
    auditAdminEvent("project.image.delete", { userId: session.userId, projectId, imageId: parsedImageId });

    revalidatePortfolioPublicPages();
    return ok({ ok: true });
  });
}
