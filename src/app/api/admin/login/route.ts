import { NextResponse, type NextRequest } from "next/server";
import { authenticateAdmin, createAdminLoginResponse } from "@/lib/auth";
import { logAdminError } from "@/lib/admin-diagnostics";
import { isDatabaseError, toSafeDatabaseError } from "@/lib/db";
import { formatZodError, loginSchema } from "@/lib/validators";
import { ZodError } from "zod";
import { auditAdminEvent } from "@/lib/audit-log";
import { hasValidRequestOrigin } from "@/lib/admin-route-utils";
import {
  clearLoginFailures,
  getLoginThrottle,
  getSafeClientAddress,
  recordLoginFailure,
} from "@/lib/login-rate-limit";

export async function POST(request: NextRequest) {
  try {
    if (!hasValidRequestOrigin(request)) {
      return NextResponse.json({ error: "Request origin was rejected." }, { status: 403 });
    }

    const rawBody = await request.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const body = loginSchema.parse(rawBody);
    const throttle = getLoginThrottle(request, body.identifier);
    if (throttle.blocked) {
      auditAdminEvent("login.throttled", { client: getSafeClientAddress(request) });
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429, headers: { "Retry-After": String(throttle.retryAfterSeconds) } },
      );
    }

    const user = await authenticateAdmin(body.identifier, body.password);

    if (!user) {
      const blocked = recordLoginFailure(request, body.identifier);
      auditAdminEvent("login.failure", { client: getSafeClientAddress(request), blocked });
      return NextResponse.json({ error: "Invalid username/email or password." }, { status: 401 });
    }

    clearLoginFailures(request, body.identifier);
    auditAdminEvent("login.success", { client: getSafeClientAddress(request), userId: user.id });
    return createAdminLoginResponse(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: formatZodError(error) }, { status: 400 });
    }

    if (isDatabaseError(error)) {
      const dbError = toSafeDatabaseError(error);
      console.error(`[admin-login] code=${dbError.originalCode} category=${dbError.category}`);
      return NextResponse.json(
        {
          success: false,
          error: dbError.message,
          code: dbError.category,
        },
        { status: dbError.statusCode },
      );
    }

    logAdminError("admin-login", error);
    return NextResponse.json({ error: "Login failed. Check server configuration." }, { status: 500 });
  }
}
