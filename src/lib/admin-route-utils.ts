import "server-only";

import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { requireAdminApiSession, unauthorizedResponse } from "@/lib/auth";
import { isDatabaseError, toSafeDatabaseError } from "@/lib/db";
import { formatZodError } from "@/lib/validators";
import type { AdminSession } from "@/lib/admin-types";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function hasValidRequestOrigin(request: NextRequest) {
  if (SAFE_METHODS.has(request.method.toUpperCase())) return true;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;

  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    const expectedHost = (request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host)
      .split(",", 1)[0]
      ?.trim();
    const expectedProtocol = (request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(":", ""))
      .split(",", 1)[0]
      ?.trim();
    return originUrl.host === expectedHost && originUrl.protocol === `${expectedProtocol}:`;
  } catch {
    return false;
  }
}

export async function withAdminApi(
  request: NextRequest,
  handler: (session: AdminSession) => Promise<Response> | Response,
) {
  const session = await requireAdminApiSession(request);
  if (!session) return unauthorizedResponse();
  if (!hasValidRequestOrigin(request)) {
    return NextResponse.json({ error: "Request origin was rejected." }, { status: 403 });
  }

  try {
    return await handler(session);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: formatZodError(error) }, { status: 400 });
    }

    if (error instanceof Error && error.message === "Invalid id.") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (isDatabaseError(error)) {
      const dbError = toSafeDatabaseError(error);
      console.error(`[admin-api] code=${dbError.originalCode} category=${dbError.category}`);
      return NextResponse.json(
        {
          success: false,
          error: dbError.message,
          code: dbError.category,
        },
        { status: dbError.statusCode },
      );
    }

    console.error("[admin-api]", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Admin request failed." }, { status: 500 });
  }
}

export function ok(data: unknown) {
  return NextResponse.json(data);
}
