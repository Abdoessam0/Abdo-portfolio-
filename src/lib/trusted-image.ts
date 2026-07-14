const DEFAULT_TRUSTED_IMAGE_HOSTS = new Set([
  "www.realestate-algarve.com",
  "www.realestate-lisbon.com",
  "www.trustedbuildr.com",
  "trustbuildrr.vercel.app",
  "www.youthpass.eu",
]);

function configuredHosts() {
  const hosts = new Set(DEFAULT_TRUSTED_IMAGE_HOSTS);
  const values = process.env.TRUSTED_IMAGE_HOSTS?.split(",") ?? [];
  for (const value of values) {
    const host = value.trim().toLowerCase();
    if (host) hosts.add(host);
  }

  try {
    const storageHost = process.env.S3_PUBLIC_BASE_URL ? new URL(process.env.S3_PUBLIC_BASE_URL).hostname.toLowerCase() : "";
    if (storageHost) hosts.add(storageHost);
  } catch {
    // Invalid configuration is ignored here and rejected by the storage adapter.
  }

  return hosts;
}

export function normalizeTrustedImageUrl(value: string | null | undefined) {
  const candidate = value?.trim() ?? "";
  if (!candidate || /[\r\n\0]/.test(candidate)) return null;
  if (candidate.startsWith("/") && !candidate.startsWith("//") && !candidate.includes("..")) return candidate;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return configuredHosts().has(url.hostname.toLowerCase()) ? url.toString() : null;
  } catch {
    return null;
  }
}

