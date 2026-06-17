import "server-only";

import { NextResponse } from "next/server";

export function publicDataResponse(data: unknown) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
