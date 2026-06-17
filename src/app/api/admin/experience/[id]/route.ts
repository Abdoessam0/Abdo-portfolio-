import { NextResponse, type NextRequest } from "next/server";
import { deleteResource, updateResource } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { revalidatePortfolioPublicPages } from "@/lib/revalidate-portfolio";
import { parsePositiveId } from "@/lib/validators";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    const experience = await updateResource("experience", parsePositiveId(id), await request.json());
    if (!experience) {
      return NextResponse.json({ error: "Experience not found." }, { status: 404 });
    }

    revalidatePortfolioPublicPages();
    return ok(experience);
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    const deleted = await deleteResource("experience", parsePositiveId(id));
    if (!deleted) {
      return NextResponse.json({ error: "Experience not found." }, { status: 404 });
    }

    revalidatePortfolioPublicPages();
    return ok({ ok: true });
  });
}
