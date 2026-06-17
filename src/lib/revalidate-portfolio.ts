import "server-only";

import { revalidatePath } from "next/cache";

export function revalidatePortfolioPublicPages() {
  revalidatePath("/");
  revalidatePath("/projects/[slug]", "page");
  revalidatePath("/experience/[slug]", "page");
  revalidatePath("/sitemap.xml");
}
