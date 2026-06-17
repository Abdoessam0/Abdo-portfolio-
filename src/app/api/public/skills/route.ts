import { publicDataResponse } from "@/lib/public-api-response";
import { getVisibleSkills } from "@/lib/public-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return publicDataResponse(await getVisibleSkills());
}
