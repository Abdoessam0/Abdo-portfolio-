import "server-only";

import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

let pool: Pool | null = null;

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
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
      connectionLimit: 10,
      queueLimit: 0,
      charset: "utf8mb4",
    });
  }

  return pool;
}

export async function queryRows<T>(sql: string, values: unknown[] = []) {
  const [rows] = await getDbPool().execute<RowDataPacket[]>(sql, values as Parameters<Pool["execute"]>[1]);
  return rows as T[];
}

export async function queryRow<T>(sql: string, values: unknown[] = []) {
  const rows = await queryRows<T>(sql, values);
  return rows[0] ?? null;
}

export async function executeStatement(sql: string, values: unknown[] = []) {
  const [result] = await getDbPool().execute<ResultSetHeader>(sql, values as Parameters<Pool["execute"]>[1]);
  return result;
}
