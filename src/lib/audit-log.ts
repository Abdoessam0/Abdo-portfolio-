import "server-only";

type AuditDetails = Record<string, string | number | boolean | null | undefined>;

export function auditAdminEvent(event: string, details: AuditDetails = {}) {
  const safeDetails = Object.fromEntries(
    Object.entries(details).filter(([key, value]) => !/(password|cookie|token|secret|authorization)/i.test(key) && value !== undefined),
  );
  console.info(JSON.stringify({ scope: "admin-audit", event, at: new Date().toISOString(), ...safeDetails }));
}

