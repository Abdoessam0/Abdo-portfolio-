import "server-only";

import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

let pool: Pool | null = null;

type DatabaseErrorLike = {
  code?: unknown;
  errno?: unknown;
  sqlState?: unknown;
  message?: unknown;
};

export type DatabaseErrorCategory =
  | "MYSQL_AUTH_FAILED"
  | "MYSQL_CONFIG_MISSING"
  | "MYSQL_CONNECTION_FAILED"
  | "MYSQL_DATABASE_NOT_FOUND"
  | "MYSQL_SCHEMA_MISSING"
  | "MYSQL_DUPLICATE"
  | "MYSQL_QUERY_FAILED";

const connectionFailureCodes = new Set([
  "ECONNREFUSED",
  "ENOTFOUND",
  "ETIMEDOUT",
  "EHOSTUNREACH",
  "EAI_AGAIN",
  "PROTOCOL_CONNECTION_LOST",
]);

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function sanitizeErrorCode(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "UNKNOWN";
  }

  const normalized = String(value).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
  return normalized || "UNKNOWN";
}

export function getSafeDatabaseErrorCode(error: unknown) {
  if (error instanceof SafeDatabaseError) {
    return error.originalCode;
  }

  if (error instanceof Error) {
    const envMatch = error.message.match(/^(DB_[A-Z_]+) is not configured\.$/);
    if (envMatch) {
      return `${envMatch[1]}_MISSING`;
    }
  }

  const maybeError = error as DatabaseErrorLike | null;
  if (maybeError?.code !== undefined) {
    return sanitizeErrorCode(maybeError.code);
  }

  if (maybeError?.errno !== undefined) {
    return sanitizeErrorCode(maybeError.errno);
  }

  return "UNKNOWN";
}

export function getSafeDatabaseErrorCategory(error: unknown): DatabaseErrorCategory {
  if (error instanceof SafeDatabaseError) {
    return error.category;
  }

  const code = getSafeDatabaseErrorCode(error);

  if (code === "ER_ACCESS_DENIED_ERROR" || code === "ER_DBACCESS_DENIED_ERROR") {
    return "MYSQL_AUTH_FAILED";
  }

  if (/^DB_(HOST|PORT|NAME|USER|PASSWORD)_MISSING$/.test(code)) {
    return "MYSQL_CONFIG_MISSING";
  }

  if (connectionFailureCodes.has(code)) {
    return "MYSQL_CONNECTION_FAILED";
  }

  if (code === "ER_BAD_DB_ERROR") {
    return "MYSQL_DATABASE_NOT_FOUND";
  }

  if (code === "ER_NO_SUCH_TABLE") {
    return "MYSQL_SCHEMA_MISSING";
  }

  if (code === "ER_DUP_ENTRY") {
    return "MYSQL_DUPLICATE";
  }

  return "MYSQL_QUERY_FAILED";
}

export function getSafeDatabaseErrorMessage(error: unknown) {
  switch (getSafeDatabaseErrorCategory(error)) {
    case "MYSQL_AUTH_FAILED":
      return "Database authentication failed. Check DB_USER and DB_PASSWORD.";
    case "MYSQL_CONFIG_MISSING":
      return "Database configuration is incomplete.";
    case "MYSQL_CONNECTION_FAILED":
      return "Database connection failed. Check DB_HOST and DB_PORT.";
    case "MYSQL_DATABASE_NOT_FOUND":
      return "Database not found. Check DB_NAME.";
    case "MYSQL_SCHEMA_MISSING":
      return "Database schema is not ready. Please retry.";
    case "MYSQL_DUPLICATE":
      return "A record with that unique value already exists.";
    default:
      return "Database request failed.";
  }
}

function getDatabaseErrorStatus(category: DatabaseErrorCategory) {
  if (category === "MYSQL_DUPLICATE") return 409;
  if (category === "MYSQL_QUERY_FAILED") return 500;
  return 503;
}

export class SafeDatabaseError extends Error {
  readonly name = "SafeDatabaseError";
  readonly code: string;
  readonly originalCode: string;
  readonly category: DatabaseErrorCategory;
  readonly statusCode: number;

  constructor(error: unknown) {
    const category = getSafeDatabaseErrorCategory(error);
    super(getSafeDatabaseErrorMessage(error));
    this.originalCode = getSafeDatabaseErrorCode(error);
    this.code = this.originalCode;
    this.category = category;
    this.statusCode = getDatabaseErrorStatus(category);
  }
}

export function isDatabaseError(error: unknown) {
  if (error instanceof SafeDatabaseError) return true;

  const code = getSafeDatabaseErrorCode(error);
  return (
    code.startsWith("ER_") ||
    connectionFailureCodes.has(code) ||
    /^DB_(HOST|PORT|NAME|USER|PASSWORD)_MISSING$/.test(code)
  );
}

export function toSafeDatabaseError(error: unknown) {
  return error instanceof SafeDatabaseError ? error : new SafeDatabaseError(error);
}

export function getDbPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: requireEnv("DB_HOST"),
      port: Number(process.env.DB_PORT ?? 3306),
      database: requireEnv("DB_NAME"),
      user: requireEnv("DB_USER"),
      password: requireEnv("DB_PASSWORD"),
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      charset: "utf8mb4",
      connectTimeout: 10000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      timezone: "+00:00",
    });
  }

  return pool;
}

export async function queryRows<T>(sql: string, values: unknown[] = []) {
  return Promise.resolve()
    .then(() => getDbPool().execute<RowDataPacket[]>(sql, values as Parameters<Pool["execute"]>[1]))
    .then(([rows]) => rows as T[])
    .catch((error: unknown) => {
      throw toSafeDatabaseError(error);
    });
}

export async function queryRow<T>(sql: string, values: unknown[] = []) {
  const rows = await queryRows<T>(sql, values);
  return rows[0] ?? null;
}

export async function executeStatement(sql: string, values: unknown[] = []) {
  return Promise.resolve()
    .then(() => getDbPool().execute<ResultSetHeader>(sql, values as Parameters<Pool["execute"]>[1]))
    .then(([result]) => result)
    .catch((error: unknown) => {
      throw toSafeDatabaseError(error);
    });
}

export async function checkDbConnection() {
  return Promise.resolve()
    .then(() => getDbPool().query("SELECT 1 AS ok"))
    .then(() => undefined)
    .catch((error: unknown) => {
      throw toSafeDatabaseError(error);
    });
}
