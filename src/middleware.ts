import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login" || pathname.startsWith("/api/admin/login");
  const isLogout = pathname === "/admin/logout" || pathname.startsWith("/api/admin/logout");

  if (!isAdminApi && !isAdminPage) {
    return NextResponse.next();
  }

  if (isLogin || isLogout) {
    return NextResponse.next();
  }

  const session = await verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (session) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
