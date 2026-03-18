/**
 * Admin data-layer abstraction.
 *
 * Every admin page calls these helpers instead of Supabase directly.
 * Under the hood they hit local Next.js API routes backed by a JSON file.
 * To migrate back to Supabase later, swap the implementation here.
 */

type Sections = "profile" | "projects" | "experience" | "volunteering" | "certificates";

const BASE = "/api/admin";

/* ------------------------------------------------------------------ */
/*  Generic helpers                                                    */
/* ------------------------------------------------------------------ */

async function json<T>(res: Response): Promise<{ data: T | null; error: string | null }> {
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    return { data: null, error: text || `HTTP ${res.status}` };
  }
  const data = (await res.json()) as T;
  return { data, error: null };
}

export async function loadSection<T>(section: Sections): Promise<{ data: T | null; error: string | null }> {
  const res = await fetch(`${BASE}/${section}`, { cache: "no-store" });
  return json<T>(res);
}

export async function saveSection<T>(section: Sections, payload: unknown): Promise<{ data: T | null; error: string | null }> {
  const res = await fetch(`${BASE}/${section}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return json<T>(res);
}

export async function updateItem<T>(section: Sections, id: string | number, payload: unknown): Promise<{ data: T | null; error: string | null }> {
  const res = await fetch(`${BASE}/${section}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return json<T>(res);
}

export async function deleteItem(section: Sections, id: string | number): Promise<{ error: string | null }> {
  const res = await fetch(`${BASE}/${section}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    return { error: text || `HTTP ${res.status}` };
  }
  return { error: null };
}
