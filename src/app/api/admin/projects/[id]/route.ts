import { NextResponse, type NextRequest } from "next/server";
import { deleteProject, getProjectWithImages, patchProject, updateProject } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { parsePositiveId } from "@/lib/validators";

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
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    const project = await updateProject(parsePositiveId(id), await request.json());

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return ok(project);
  });
}

export async function PATCH(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    const project = await patchProject(parsePositiveId(id), await request.json());

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return ok(project);
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    await deleteProject(parsePositiveId(id));
    return ok({ ok: true });
  });
}
