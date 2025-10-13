import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

function url(path: string) {
  if (!API_URL) throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not set");
  return `${API_URL.replace(/\/$/, "")}${path}`;
}

export async function strapiLogin(identifier: string, password: string) {
  const res = await axios.post(url("/api/auth/local"), { identifier, password });
  return res.data as { jwt: string; user: unknown };
}

export async function createProject(jwt: string, payload: unknown) {
  const res = await axios.post(url("/api/projects"), { data: payload }, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res.data;
}

export async function uploadFile(jwt: string, file: File | Blob, filename?: string) {
  const form = new FormData();
  if (filename) {
    // The third arg is optional; when available we pass a filename for better media names.
    // Type narrowing for File ensures compatibility in browsers.
    const fileName = (file as File).name || filename;
    form.append("files", file, fileName);
  } else {
    form.append("files", file);
  }
  const res = await axios.post(url("/api/upload"), form, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res.data;
}
