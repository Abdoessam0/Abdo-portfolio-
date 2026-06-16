import "server-only";

import { getDbPool } from "@/lib/db";

type AdminEnvKey =
  | "DB_HOST"
  | "DB_PORT"
  | "DB_NAME"
  | "DB_USER"
  | "DB_PASSWORD"
  | "ADMIN_SESSION_SECRET";

type AdminEnvPresence = Record<AdminEnvKey, boolean>;

type SafeErrorWithCode = {
  code?: unknown;
  errno?: unknown;
  message?: unknown;
};

export function getAdminEnvPresence(): AdminEnvPresence {
  return {
    DB_HOST: Boolean(process.env.DB_HOST),
    DB_PORT: Boolean(process.env.DB_PORT),
    DB_NAME: Boolean(process.env.DB_NAME),
    DB_USER: Boolean(process.env.DB_USER),
    DB_PASSWORD: Boolean(process.env.DB_PASSWORD),
    ADMIN_SESSION_SECRET: Boolean(process.env.ADMIN_SESSION_SECRET),
  };
}

function sanitizeErrorCode(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "UNKNOWN";
  }

  const normalized = String(value).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
  return normalized || "UNKNOWN";
}

export function getSafeAdminErrorCode(error: unknown) {
  if (error instanceof Error) {
    const envMatch = error.message.match(/^([A-Z_]+) is not configured\.$/);
    if (envMatch) {
      return `${envMatch[1]}_MISSING`;
    }

    if (error.message === "ADMIN_SESSION_SECRET must be set to at least 32 characters.") {
      return "ADMIN_SESSION_SECRET_INVALID";
    }
  }

  const maybeError = error as SafeErrorWithCode | null;
  if (maybeError?.code !== undefined) {
    return sanitizeErrorCode(maybeError.code);
  }

  if (maybeError?.errno !== undefined) {
    return sanitizeErrorCode(maybeError.errno);
  }

  return "UNKNOWN";
}

export function logAdminError(scope: string, error: unknown) {
  const code = getSafeAdminErrorCode(error);
  console.error(`[${scope}] code=${code}`);
  return code;
}

export async function checkAdminDbConnection() {
  try {
    await getDbPool().query("SELECT 1 AS ok");
    return {
      connectionSuccess: true,
      errorCode: null,
    };
  } catch (error) {
    return {
      connectionSuccess: false,
      errorCode: getSafeAdminErrorCode(error),
    };
  }
}
