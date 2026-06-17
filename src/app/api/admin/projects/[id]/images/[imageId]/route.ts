import { NextResponse, type NextRequest } from "next/server";
import { deleteProjectImage, updateProjectImage } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { revalidatePortfolioPublicPages } from "@/lib/revalidate-portfolio";
import { parsePositiveId } from "@/lib/validators";

type Context = {
  params: Promise<{ id: string; imageId: string }>;
};

export async function PUT(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id, imageId } = await context.params;
    const image = await updateProjectImage(parsePositiveId(id), parsePositiveId(imageId), await request.json());

    if (!image) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    revalidatePortfolioPublicPages();
    return ok(image);
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id, imageId } = await context.params;
    const deleted = await deleteProjectImage(parsePositiveId(id), parsePositiveId(imageId));
    if (!deleted) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    revalidatePortfolioPublicPages();
    return ok({ ok: true });
  });
}
