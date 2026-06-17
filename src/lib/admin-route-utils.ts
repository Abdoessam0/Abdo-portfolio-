import "server-only";

import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { requireAdminApiSession, unauthorizedResponse } from "@/lib/auth";
import { isDatabaseError, toSafeDatabaseError } from "@/lib/db";
import { formatZodError } from "@/lib/validators";

export async function withAdminApi(
  request: NextRequest,
  handler: () => Promise<Response> | Response,
) {
  const session = await requireAdminApiSession(request);
  if (!session) return unauthorizedResponse();

  try {
    return await handler();
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
