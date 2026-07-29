import { createHash, randomInt } from "crypto";

export const OTP_LENGTH = 6;
export const OTP_TTL_MS = 5 * 60 * 1000;
export const OTP_RESEND_COOLDOWN_MS = 30 * 1000;
export const OTP_MAX_ATTEMPTS = 5;

const INDIA_MOBILE_RE = /^[6-9]\d{9}$/;

export function isValidIndianMobile(phone: string): boolean {
  return INDIA_MOBILE_RE.test(phone.trim());
}

export function generateOtpCode(): string {
  return String(randomInt(0, 10 ** OTP_LENGTH)).padStart(OTP_LENGTH, "0");
}

export function hashOtpCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}
