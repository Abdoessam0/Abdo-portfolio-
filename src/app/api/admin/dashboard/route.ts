import type { NextRequest } from "next/server";
import { getDashboardOverview } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";

export async function GET(request: NextRequest) {
  return withAdminApi(request, async () => ok(await getDashboardOverview()));
}
