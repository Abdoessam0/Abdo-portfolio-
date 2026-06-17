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
    const certificate = await updateResource("certificates", parsePositiveId(id), await request.json());
    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
    }

    revalidatePortfolioPublicPages();
    return ok(certificate);
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    const deleted = await deleteResource("certificates", parsePositiveId(id));
    if (!deleted) {
      return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
    }

    revalidatePortfolioPublicPages();
    return ok({ ok: true });
  });
}
