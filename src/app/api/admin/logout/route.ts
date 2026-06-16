import { createAdminLogoutResponse } from "@/lib/auth";

export async function POST() {
  return createAdminLogoutResponse();
}
