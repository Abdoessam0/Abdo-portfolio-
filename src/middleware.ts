import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLogin = pathname.startsWith("/admin/login");
  const isLogout = pathname.startsWith("/admin/logout");

  if (isLogin || isLogout) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("admin-auth")?.value;
  const isAuthed = authCookie === "true";

  if (isAuthed) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
