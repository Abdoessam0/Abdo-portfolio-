import { getPublishedProjects } from "@/lib/public-data";
import { publicDataResponse } from "@/lib/public-api-response";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return publicDataResponse(await getPublishedProjects());
}
