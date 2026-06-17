import { NextResponse } from "next/server";
import { checkAdminDbConnection, getAdminEnvPresence } from "@/lib/admin-diagnostics";

export const runtime = "nodejs";

export async function GET() {
  const envPresence = getAdminEnvPresence();
  const timestamp = new Date().toISOString();

  try {
    const dbStatus = await checkAdminDbConnection();

    return NextResponse.json({
      nodeRuntimeOk: true,
      timestamp,
      appVersion: "0.1.0",
      dbHostPresent: envPresence.DB_HOST,
      dbPortPresent: envPresence.DB_PORT,
      dbNamePresent: envPresence.DB_NAME,
      dbUserPresent: envPresence.DB_USER,
      dbPasswordPresent: envPresence.DB_PASSWORD,
      adminSessionSecretPresent: envPresence.ADMIN_SESSION_SECRET,
      mysqlConnectionSuccess: dbStatus.connectionSuccess,
      mysqlErrorCode: dbStatus.errorCode,
      mysqlErrorCategory: dbStatus.errorCategory,
    });
  } catch (error) {
    const errorCode = error instanceof Error ? "HEALTH_CHECK_FAILED" : "UNKNOWN";

    return NextResponse.json({
      nodeRuntimeOk: true,
      timestamp,
      appVersion: "0.1.0",
      dbHostPresent: envPresence.DB_HOST,
      dbPortPresent: envPresence.DB_PORT,
      dbNamePresent: envPresence.DB_NAME,
      dbUserPresent: envPresence.DB_USER,
      dbPasswordPresent: envPresence.DB_PASSWORD,
      adminSessionSecretPresent: envPresence.ADMIN_SESSION_SECRET,
      mysqlConnectionSuccess: false,
      mysqlErrorCode: errorCode,
      mysqlErrorCategory: "MYSQL_QUERY_FAILED",
    });
  }
}
