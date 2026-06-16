import "server-only";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import type { AdminSession, AdminUserRecord } from "@/lib/admin-types";
import { ensureAdminSchema } from "@/lib/admin-schema";
import { executeStatement, queryRow } from "@/lib/db";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifySessionToken,
} from "@/lib/session";

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSessionFromCookies();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireAdminApiSession(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

async function createBootstrapAdminIfNeeded() {
  const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (!bootstrapPassword) return;

  const countRow = await queryRow<{ total: number }>("SELECT COUNT(*) AS total FROM portfolio_admin_users");
  if ((countRow?.total ?? 0) > 0) return;

  const username = process.env.ADMIN_BOOTSTRAP_USERNAME || "admin";
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL || "admin@example.com";
  const passwordHash = await bcrypt.hash(bootstrapPassword, 12);

  await executeStatement(
    `
      INSERT INTO portfolio_admin_users (username, email, password_hash, display_name, active)
      VALUES (?, ?, ?, ?, 1)
    `,
    [username, email, passwordHash, username],
  );
}

export async function authenticateAdmin(identifier: string, password: string) {
  await ensureAdminSchema();
  await createBootstrapAdminIfNeeded();

  const user = await queryRow<AdminUserRecord>(
    `
      SELECT id, username, email, password_hash, display_name, active
      FROM portfolio_admin_users
      WHERE active = 1 AND (username = ? OR email = ?)
      LIMIT 1
    `,
    [identifier, identifier],
  );

  if (!user) return null;

  const passwordOk = await bcrypt.compare(password, user.password_hash);
  if (!passwordOk) return null;

  await executeStatement("UPDATE portfolio_admin_users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?", [user.id]);

  return user;
}

export async function createAdminLoginResponse(user: Pick<AdminUserRecord, "id" | "username" | "email">) {
  const token = await createSessionToken({
    userId: user.id,
    username: user.username,
    email: user.email,
  });
  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export function createAdminLogoutResponse() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function sessionDisplayName(session: AdminSession) {
  return session.username || session.email;
}
