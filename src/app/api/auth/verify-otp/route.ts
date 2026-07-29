import { NextRequest, NextResponse } from "next/server";
import { deleteOtp, findOrCreateCustomerByPhone, getLatestOtp, incrementOtpAttempts } from "@/lib/db";
import { hashOtpCode, isValidIndianMobile, OTP_MAX_ATTEMPTS } from "@/lib/otp";
import { CUSTOMER_COOKIE_NAME, createCustomerSessionToken } from "@/lib/customer-auth";

export async function POST(req: NextRequest) {
  let body: { phone?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const phone = (body.phone ?? "").trim();
  const code = (body.code ?? "").trim();
  if (!isValidIndianMobile(phone) || !code) {
    return NextResponse.json({ error: "Enter the code sent to your phone." }, { status: 400 });
  }

  try {
    const otp = await getLatestOtp(phone);
    if (!otp || new Date(otp.expires_at).getTime() < Date.now()) {
      return NextResponse.json({ error: "That code has expired. Request a new one." }, { status: 400 });
    }
    if (otp.attempts >= OTP_MAX_ATTEMPTS) {
      return NextResponse.json({ error: "Too many attempts. Request a new code." }, { status: 429 });
    }
    if (otp.code_hash !== hashOtpCode(code)) {
      await incrementOtpAttempts(otp.id);
      return NextResponse.json({ error: "Incorrect code." }, { status: 400 });
    }

    await deleteOtp(otp.id);
    const customer = await findOrCreateCustomerByPhone(phone);
    const token = createCustomerSessionToken(customer.id);
    if (!token) {
      return NextResponse.json({ error: "Login isn't configured yet." }, { status: 500 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(CUSTOMER_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (err) {
    console.error("verify-otp failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
