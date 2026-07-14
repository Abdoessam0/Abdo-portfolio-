import { NextResponse, type NextRequest } from "next/server";
import { createProjectImage, listProjectImages } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { revalidatePortfolioPublicPages } from "@/lib/revalidate-portfolio";
import { parsePositiveId } from "@/lib/validators";
import { auditAdminEvent } from "@/lib/audit-log";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    return ok({ items: await listProjectImages(parsePositiveId(id)) });
  });
}

export async function POST(request: NextRequest, context: Context) {
  return withAdminApi(request, async (session) => {
    const { id } = await context.params;
    const image = await createProjectImage(parsePositiveId(id), await request.json());
    if (!image) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    auditAdminEvent("project.image.create", { userId: session.userId, projectId: image.project_id, imageId: image.id });

    revalidatePortfolioPublicPages();
    return ok(image);
  });
}
