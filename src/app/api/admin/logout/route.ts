import type { NextRequest } from "next/server";
import { createAdminLogoutResponse } from "@/lib/auth";
import { withAdminApi } from "@/lib/admin-route-utils";
import { auditAdminEvent } from "@/lib/audit-log";

export async function POST(request: NextRequest) {
  return withAdminApi(request, async (session) => {
    auditAdminEvent("logout", { userId: session.userId });
    return createAdminLogoutResponse();
  });
}
