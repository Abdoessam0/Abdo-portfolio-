import type { NextRequest } from "next/server";
import { createResource, listResource } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";

export async function GET(request: NextRequest) {
  return withAdminApi(request, async () =>
    ok({ items: await listResource("certificates", { search: request.nextUrl.searchParams.get("search") || undefined }) }),
  );
}

export async function POST(request: NextRequest) {
  return withAdminApi(request, async () => ok(await createResource("certificates", await request.json())));
}
