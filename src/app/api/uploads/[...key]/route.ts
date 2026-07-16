import { NextResponse, type NextRequest } from "next/server";
import { getSafeDatabaseErrorCode } from "@/lib/db";
import { getDatabaseUpload } from "@/lib/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ key: string[] }>;
};

export async function GET(_request: NextRequest, context: Context) {
  const { key: parts } = await context.params;
  const key = parts.join("/");

  try {
    const upload = await getDatabaseUpload(key);
    if (!upload) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(upload.body), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${key.split("/").at(-1) ?? "upload"}"`,
        "Content-Length": String(upload.byteSize),
        "Content-Type": upload.contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(`[public-upload] read_failed code=${getSafeDatabaseErrorCode(error)}`);
    return NextResponse.json({ error: "File storage is temporarily unavailable." }, { status: 503 });
  }
}
