import "server-only";

import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { requireAdminApiSession, unauthorizedResponse } from "@/lib/auth";
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

    if (error instanceof Error && error.message.includes("Duplicate entry")) {
      return NextResponse.json({ error: "A record with that unique value already exists." }, { status: 409 });
    }

    console.error(error);
    return NextResponse.json({ error: "Admin request failed." }, { status: 500 });
  }
}

export function ok(data: unknown) {
  return NextResponse.json(data);
}
