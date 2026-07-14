import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const MAX_ENTRIES = 2_000;

type AttemptState = { failures: number; firstFailureAt: number; blockedUntil: number };
const attempts = new Map<string, AttemptState>();

function clientIp(request: NextRequest) {
  const value = request.headers.get("x-forwarded-for")?.split(",", 1)[0]?.trim() || request.headers.get("x-real-ip")?.trim();
  return value && /^[a-f0-9:.]{3,64}$/i.test(value) ? value : "unknown";
}

function fingerprint(request: NextRequest, identifier: string) {
  return createHash("sha256").update(`${clientIp(request)}\0${identifier.trim().toLowerCase()}`).digest("hex");
}

function prune(now: number) {
  if (attempts.size < MAX_ENTRIES) return;
  for (const [key, state] of attempts) {
    if (state.blockedUntil < now && state.firstFailureAt + WINDOW_MS < now) attempts.delete(key);
  }
}

export function getLoginThrottle(request: NextRequest, identifier: string) {
  const now = Date.now();
  const key = fingerprint(request, identifier);
  const state = attempts.get(key);
  if (!state || state.blockedUntil <= now) return { blocked: false, retryAfterSeconds: 0 };
  return { blocked: true, retryAfterSeconds: Math.max(1, Math.ceil((state.blockedUntil - now) / 1000)) };
}

export function recordLoginFailure(request: NextRequest, identifier: string) {
  const now = Date.now();
  prune(now);
  const key = fingerprint(request, identifier);
  const current = attempts.get(key);
  const state = !current || current.firstFailureAt + WINDOW_MS < now
    ? { failures: 1, firstFailureAt: now, blockedUntil: 0 }
    : { ...current, failures: current.failures + 1 };
  if (state.failures >= MAX_FAILURES) state.blockedUntil = now + BLOCK_MS;
  attempts.set(key, state);
  return state.blockedUntil > now;
}

export function clearLoginFailures(request: NextRequest, identifier: string) {
  attempts.delete(fingerprint(request, identifier));
}

export function getSafeClientAddress(request: NextRequest) {
  const ip = clientIp(request);
  return ip === "unknown" ? ip : createHash("sha256").update(ip).digest("hex").slice(0, 16);
}
