import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "gemista_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getSecret(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

function sign(expiry: number, secret: string): string {
  return createHmac("sha256", secret).update(String(expiry)).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  return aBuf.length === bBuf.length && timingSafeEqual(aBuf, bBuf);
}

export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const expiry = Date.now() + SESSION_TTL_MS;
  return `${expiry}.${sign(expiry, secret)}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !token) return false;
  const [expiryStr, sig] = token.split(".");
  const expiry = Number(expiryStr);
  if (!expiry || !sig || Date.now() > expiry) return false;
  return safeEqual(sign(expiry, secret), sig);
}

export function verifyPassword(candidate: string): boolean {
  const secret = getSecret();
  if (!secret) return false;
  return safeEqual(candidate, secret);
}
