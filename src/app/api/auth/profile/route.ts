import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_COOKIE_NAME, getCustomerIdFromToken } from "@/lib/customer-auth";
import { updateCustomerProfile } from "@/lib/db";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(CUSTOMER_COOKIE_NAME)?.value;
  const customerId = getCustomerIdFromToken(token);
  if (!customerId) {
    return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  }

  let body: { fullName?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fullName = (body.fullName ?? "").trim();
  if (!fullName) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }

  try {
    await updateCustomerProfile(customerId, { fullName, email: body.email?.trim() || null });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("profile update failed:", err);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
