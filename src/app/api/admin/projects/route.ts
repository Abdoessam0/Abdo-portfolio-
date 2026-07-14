import type { NextRequest } from "next/server";
import { createProject, listProjects } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { revalidatePortfolioPublicPages } from "@/lib/revalidate-portfolio";
import { auditAdminEvent } from "@/lib/audit-log";

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
  return withAdminApi(request, async (session) => {
    const project = await createProject(await request.json());
    auditAdminEvent("project.create", { userId: session.userId, projectId: project.id, published: project.published });
    revalidatePortfolioPublicPages();
    return ok(project);
  });
}
