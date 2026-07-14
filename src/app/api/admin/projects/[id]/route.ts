import { NextResponse, type NextRequest } from "next/server";
import { deleteProject, getProjectWithImages, patchProject, updateProject } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { revalidatePortfolioPublicPages } from "@/lib/revalidate-portfolio";
import { parsePositiveId } from "@/lib/validators";
import { auditAdminEvent } from "@/lib/audit-log";
import { deleteOwnedUpload, deleteOwnedUploads } from "@/lib/upload-storage";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    const project = await getProjectWithImages(parsePositiveId(id));

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return ok(project);
  });
}

export async function PUT(request: NextRequest, context: Context) {
  return withAdminApi(request, async (session) => {
    const { id } = await context.params;
    const projectId = parsePositiveId(id);
    const previous = await getProjectWithImages(projectId);
    const project = await updateProject(projectId, await request.json());

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    if (previous?.thumbnail_url && previous.thumbnail_url !== project.thumbnail_url) {
      await deleteOwnedUpload(previous.thumbnail_url);
    }
    auditAdminEvent("project.update", { userId: session.userId, projectId: project.id, published: project.published });

    revalidatePortfolioPublicPages();
    return ok(project);
  });
}

export async function PATCH(request: NextRequest, context: Context) {
  return withAdminApi(request, async (session) => {
    const { id } = await context.params;
    const project = await patchProject(parsePositiveId(id), await request.json());

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    auditAdminEvent("project.patch", { userId: session.userId, projectId: project.id, published: project.published });

    revalidatePortfolioPublicPages();
    return ok(project);
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  return withAdminApi(request, async (session) => {
    const { id } = await context.params;
    const projectId = parsePositiveId(id);
    const previous = await getProjectWithImages(projectId);
    const deleted = await deleteProject(projectId);
    if (!deleted) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    await deleteOwnedUploads([previous?.thumbnail_url, ...(previous?.images.map((image) => image.image_url) ?? [])]);
    auditAdminEvent("project.delete", { userId: session.userId, projectId });

    revalidatePortfolioPublicPages();
    return ok({ ok: true });
  });
}
