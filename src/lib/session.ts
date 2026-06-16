import type { AdminSession } from "@/lib/admin-types";

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

function getSessionSecret(secret = process.env.ADMIN_SESSION_SECRET) {
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set to at least 32 characters.");
  }

  return secret;
}

export async function createSessionToken(payload: Omit<AdminSession, "iat" | "exp">) {
  const now = Math.floor(Date.now() / 1000);
  const session: AdminSession = {
    ...payload,
    iat: now,
    exp: now + ADMIN_SESSION_MAX_AGE_SECONDS,
  };
  const body = bytesToBase64Url(encoder.encode(JSON.stringify(session)));
  const signature = await sign(body, getSessionSecret());

  return `${body}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null) {
  if (!token) return null;

  try {
    const [body, signature] = token.split(".");
    if (!body || !signature) return null;

    const expected = await sign(body, getSessionSecret());
    if (!safeEqual(signature, expected)) return null;

    const session = JSON.parse(decoder.decode(base64UrlToBytes(body))) as AdminSession;
    if (!session.userId || !session.username || !session.exp) return null;
    if (session.exp < Math.floor(Date.now() / 1000)) return null;

    return session;
  } catch {
    return null;
  }
}
