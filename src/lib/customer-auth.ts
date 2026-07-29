import { createHmac, timingSafeEqual } from "crypto";

export const CUSTOMER_COOKIE_NAME = "gemista_customer_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

function getSecret(): string | undefined {
  return process.env.SESSION_SECRET;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  return aBuf.length === bBuf.length && timingSafeEqual(aBuf, bBuf);
}

export function createCustomerSessionToken(customerId: number): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const expiry = Date.now() + SESSION_TTL_MS;
  const payload = `${customerId}.${expiry}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function getCustomerIdFromToken(token: string | undefined): number | null {
  const secret = getSecret();
  if (!secret || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [idStr, expiryStr, sig] = parts;
  const expiry = Number(expiryStr);
  const customerId = Number(idStr);
  if (!customerId || !expiry || !sig || Date.now() > expiry) return null;
  const payload = `${idStr}.${expiryStr}`;
  return safeEqual(sign(payload, secret), sig) ? customerId : null;
}
