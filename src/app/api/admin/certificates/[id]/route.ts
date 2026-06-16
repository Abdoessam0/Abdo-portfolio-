import type { NextRequest } from "next/server";
import { deleteResource, updateResource } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { parsePositiveId } from "@/lib/validators";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    return ok(await updateResource("certificates", parsePositiveId(id), await request.json()));
  });
}

export async function DELETE(request: NextRequest, context: Context) {
  return withAdminApi(request, async () => {
    const { id } = await context.params;
    await deleteResource("certificates", parsePositiveId(id));
    return ok({ ok: true });
  });
}
