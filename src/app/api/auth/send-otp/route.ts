import { NextRequest, NextResponse } from "next/server";
import { createOtpCode, getLatestOtp } from "@/lib/db";
import {
  generateOtpCode,
  hashOtpCode,
  isValidIndianMobile,
  OTP_RESEND_COOLDOWN_MS,
  OTP_TTL_MS,
} from "@/lib/otp";
import { sendOtpSms } from "@/lib/sms";

export async function POST(req: NextRequest) {
  let body: { phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const phone = (body.phone ?? "").trim();
  if (!isValidIndianMobile(phone)) {
    return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
  }

  try {
    const latest = await getLatestOtp(phone);
    if (latest && Date.now() - new Date(latest.created_at).getTime() < OTP_RESEND_COOLDOWN_MS) {
      return NextResponse.json({ error: "Please wait before requesting another code." }, { status: 429 });
    }

    const code = generateOtpCode();
    const sendResult = await sendOtpSms(phone, code);
    if (!sendResult.ok) {
      return NextResponse.json({ error: sendResult.error ?? "Could not send the code." }, { status: 502 });
    }

    await createOtpCode(phone, hashOtpCode(code), new Date(Date.now() + OTP_TTL_MS));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-otp failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
