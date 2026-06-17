import { NextResponse, type NextRequest } from "next/server";
import { authenticateAdmin, createAdminLoginResponse } from "@/lib/auth";
import { logAdminError } from "@/lib/admin-diagnostics";
import { isDatabaseError, toSafeDatabaseError } from "@/lib/db";
import { formatZodError, loginSchema } from "@/lib/validators";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const body = loginSchema.parse(rawBody);
    const user = await authenticateAdmin(body.identifier, body.password);

    if (!user) {
      return NextResponse.json({ error: "Invalid username/email or password." }, { status: 401 });
    }

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
