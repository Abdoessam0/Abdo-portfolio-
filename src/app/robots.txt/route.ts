import { NextResponse } from "next/server";
import { PROFILE } from "@/data/profile";

export function GET() {
  const origin = new URL(PROFILE.links.portfolio).origin;
  const body = `User-agent: *
Allow: /
Sitemap: ${origin}/sitemap.xml
`;
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
