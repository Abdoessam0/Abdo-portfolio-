import type { NextRequest } from "next/server";
import { getProfileSettings, updateProfileSettings } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";

export async function GET(request: NextRequest) {
  return withAdminApi(request, async () => ok(await getProfileSettings()));
}

export async function PUT(request: NextRequest) {
  return withAdminApi(request, async () => ok(await updateProfileSettings(await request.json())));
}
