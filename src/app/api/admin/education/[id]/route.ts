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
    const education = await updateResource("education", parsePositiveId(id), await request.json());
    if (!education) {
      return NextResponse.json({ error: "Education not found." }, { status: 404 });
    }

    revalidatePortfolioPublicPages();
    return ok(education);
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    const deleted = await deleteResource("education", parsePositiveId(id));
    if (!deleted) {
      return NextResponse.json({ error: "Education not found." }, { status: 404 });
    }

    revalidatePortfolioPublicPages();
    return ok({ ok: true });
  });
}
