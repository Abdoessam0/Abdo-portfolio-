import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

function strapiUrl(path: string) {
  if (!API_URL) throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not set");
  return `${API_URL.replace(/\/$/, "")}${path}`;
}

export async function getProjects() {
  if (!API_URL) return null;
  const res = await axios.get(strapiUrl(`/api/projects?populate=*`));
  return res.data?.data as unknown[];
}

export async function getExperiences() {
  if (!API_URL) return null;
  const res = await axios.get(strapiUrl(`/api/experiences?populate=*`));
  return res.data?.data as unknown[];
}

export async function getSkills() {
  if (!API_URL) return null;
  const res = await axios.get(strapiUrl(`/api/skills?populate=*`));
  return res.data?.data as unknown[];
}

export async function getVolunteering() {
  if (!API_URL) return null;
  const res = await axios.get(strapiUrl(`/api/volunteerings?populate=*`));
  return res.data?.data as unknown[];
}

export async function getCertifications() {
  if (!API_URL) return null;
  const res = await axios.get(strapiUrl(`/api/certifications?populate=*`));
  return res.data?.data as unknown[];
}

export async function getEducation() {
  if (!API_URL) return null;
  const res = await axios.get(strapiUrl(`/api/education?populate=*`));
  return res.data?.data as unknown[];
}

export function mapStrapiImage(item: unknown): string | undefined {
  const anyItem = item as { data?: { attributes?: { url?: string } }; attributes?: { url?: string } } | undefined;
  const url = anyItem?.data?.attributes?.url || anyItem?.attributes?.url;
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  if (!API_URL) return url; // return as-is if base unknown
  return `${API_URL.replace(/\/$/, "")}${url}`;
}

export function mapStrapiProjects(data: unknown[]): Array<{
  imageUrl?: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
}> {
  return (data || []).map((entry) => {
    const e = entry as { attributes?: Record<string, unknown> };
    const a = (e?.attributes || {}) as Record<string, unknown>;
    const pick = (obj: Record<string, unknown>, keys: string[]) => {
      for (const k of keys) if (obj[k] !== undefined) return obj[k];
      return undefined;
    };
    const imageCandidate = pick(a, ["image", "cover", "thumbnail"]);
    const imageUrl = mapStrapiImage(imageCandidate);
    const techRaw = pick(a, ["tech", "technologies"]);
    const tech: string[] = Array.isArray(techRaw)
      ? (techRaw as unknown[]).map((t) => String(t))
      : typeof techRaw === "string"
      ? (techRaw as string).split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    return {
      imageUrl,
      title: String(a.title ?? "Untitled"),
      description: String((a.description as string) ?? (a.summary as string) ?? ""),
      tech,
      liveUrl: (a.liveUrl as string) || (a.demo as string) || (a.url as string) || undefined,
      repoUrl: (a.repoUrl as string) || (a.github as string) || undefined,
    };
  });
}

export function mapStrapiExperiences(data: unknown[]): Array<{
  title: string;
  role: string;
  summary: string;
}> {
  return (data || []).map((entry) => {
    const e = entry as { attributes?: Record<string, unknown> };
    const a = (e?.attributes || {}) as Record<string, unknown>;
    const company = a.company ?? a.title;
    const location = a.location ? ` (${String(a.location)})` : "";
    const role = (a.role as string) || (a.position as string) || "";
    const start = a["start"] as string | undefined;
    const end = a["end"] as string | undefined;
    const period = start && end ? ` — ${start}–${end}` : "";
    return {
      title: `${(company as string) || "Experience"}${location}`,
      role: `${role}${period}`.trim(),
      summary: ((a.description as string) || (a.summary as string) || ""),
    };
  });
}
