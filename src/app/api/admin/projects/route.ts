import type { NextRequest } from "next/server";
import { createProject, listProjects } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";

export async function GET(request: NextRequest) {
  return withAdminApi(request, async () => {
    const searchParams = request.nextUrl.searchParams;
    const projects = await listProjects({
      search: searchParams.get("search") || undefined,
      published: searchParams.get("published") || undefined,
      featured: searchParams.get("featured") || undefined,
    });

    return ok({ items: projects });
  });
}

export async function POST(request: NextRequest) {
  return withAdminApi(request, async () => ok(await createProject(await request.json())));
}
