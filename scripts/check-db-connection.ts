import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import mysql from "mysql2/promise";

const requiredEnv = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"] as const;

type DbEnvKey = (typeof requiredEnv)[number];

type MysqlErrorLike = {
  code?: unknown;
  errno?: unknown;
  sqlState?: unknown;
};

const connectionFailureCodes = new Set([
  "ECONNREFUSED",
  "ENOTFOUND",
  "ETIMEDOUT",
  "EHOSTUNREACH",
  "EAI_AGAIN",
  "PROTOCOL_CONNECTION_LOST",
]);

function parseEnvLine(line: string) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const equalsIndex = trimmed.indexOf("=");
  if (equalsIndex <= 0) return null;

  const key = trimmed.slice(0, equalsIndex).trim();
  let value = trimmed.slice(equalsIndex + 1).trim();

  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return { key, value };
}

function loadEnvFile(fileName: string, override: boolean) {
  const filePath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(filePath)) return;

  const contents = fs.readFileSync(filePath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const parsed = parseEnvLine(line);
    if (!parsed) continue;
    if (!override && process.env[parsed.key] !== undefined) continue;
    process.env[parsed.key] = parsed.value;
  }
}

function sanitizeCode(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "UNKNOWN";
  }

  const normalized = String(value).toUpperCase().replace(/[^A-Z0-9_]/g, "_");
  return normalized || "UNKNOWN";
}

function getErrorCategory(code: string) {
  if (code === "ER_ACCESS_DENIED_ERROR" || code === "ER_DBACCESS_DENIED_ERROR") {
    return "MYSQL_AUTH_FAILED";
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

  return "MYSQL_QUERY_FAILED";
}

function getEnvValue(name: DbEnvKey) {
  return process.env[name] ?? "";
}

async function main() {
  loadEnvFile(".env", false);
  loadEnvFile(".env.local", true);

  const envPresence = Object.fromEntries(requiredEnv.map((name) => [name, Boolean(process.env[name])]));

  console.log(`DB_HOST=${getEnvValue("DB_HOST")}`);
  console.log(`DB_PORT=${getEnvValue("DB_PORT")}`);
  console.log(`DB_NAME=${getEnvValue("DB_NAME")}`);
  console.log(`DB_USER=${getEnvValue("DB_USER")}`);
  console.log(`DB_PASSWORD present=${envPresence.DB_PASSWORD}`);

  const missing = requiredEnv.filter((name) => !envPresence[name]);
  if (missing.length > 0) {
    console.error(`Missing required env: ${missing.join(", ")}`);
    console.error("mysqlErrorCategory=MYSQL_CONFIG_MISSING");
    process.exitCode = 1;
    return;
  }

  let connection: mysql.Connection | null = null;

  try {
    connection = await mysql.createConnection({
      host: getEnvValue("DB_HOST"),
      port: Number(getEnvValue("DB_PORT") || "3306"),
      database: getEnvValue("DB_NAME"),
      user: getEnvValue("DB_USER"),
      password: getEnvValue("DB_PASSWORD"),
      connectTimeout: 10000,
      charset: "utf8mb4",
      timezone: "+00:00",
    });

    await connection.query("SELECT 1 AS ok");
    console.log("MySQL connection OK");
  } catch (error) {
    const mysqlError = error as MysqlErrorLike | null;
    const code = sanitizeCode(mysqlError?.code);
    const errno = mysqlError?.errno ?? "UNKNOWN";
    const sqlState = mysqlError?.sqlState ?? "UNKNOWN";

    console.error("MySQL connection failed");
    console.error(`error.code=${code}`);
    console.error(`error.errno=${errno}`);
    console.error(`error.sqlState=${sqlState}`);
    console.error(`mysqlErrorCategory=${getErrorCategory(code)}`);
    process.exitCode = 1;
  } finally {
    await connection?.end().catch(() => undefined);
  }
}

void main();
