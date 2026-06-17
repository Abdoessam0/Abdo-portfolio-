import "server-only";

import {
  checkDbConnection,
  getSafeDatabaseErrorCategory,
  getSafeDatabaseErrorCode,
} from "@/lib/db";

type AdminEnvKey =
  | "DB_HOST"
  | "DB_PORT"
  | "DB_NAME"
  | "DB_USER"
  | "DB_PASSWORD"
  | "ADMIN_SESSION_SECRET";

type AdminEnvPresence = Record<AdminEnvKey, boolean>;

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

  return getSafeDatabaseErrorCode(error);
}

export function getSafeAdminErrorCategory(error: unknown) {
  return getSafeDatabaseErrorCategory(error);
}

export function logAdminError(scope: string, error: unknown) {
  const code = getSafeAdminErrorCode(error);
  console.error(`[${scope}] code=${code}`);
  return code;
}

export async function checkAdminDbConnection() {
  try {
    await checkDbConnection();
    return {
      connectionSuccess: true,
      errorCode: null,
      errorCategory: null,
    };
  } catch (error) {
    const code = getSafeAdminErrorCode(error);
    const category = getSafeAdminErrorCategory(error);
    return {
      connectionSuccess: false,
      errorCode: code,
      errorCategory: category,
    };
  }
}
