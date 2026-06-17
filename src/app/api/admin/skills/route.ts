import type { NextRequest } from "next/server";
import { createResource, listResource } from "@/lib/admin-repository";
import { ok, withAdminApi } from "@/lib/admin-route-utils";
import { revalidatePortfolioPublicPages } from "@/lib/revalidate-portfolio";

export async function GET(request: NextRequest) {
  return withAdminApi(request, async () =>
    ok({
      items: await listResource("skills", {
        search: request.nextUrl.searchParams.get("search") || undefined,
        category: request.nextUrl.searchParams.get("category") || undefined,
      }),
    }),
  );
}

export async function POST(request: NextRequest) {
  return withAdminApi(request, async () => {
    const skill = await createResource("skills", await request.json());
    revalidatePortfolioPublicPages();
    return ok(skill);
  });
}
