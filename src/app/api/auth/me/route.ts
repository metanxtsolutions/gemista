import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_COOKIE_NAME, getCustomerIdFromToken } from "@/lib/customer-auth";
import { getCustomerById } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(CUSTOMER_COOKIE_NAME)?.value;
  const customerId = getCustomerIdFromToken(token);
  if (!customerId) {
    return NextResponse.json({ customer: null });
  }

  try {
    const customer = await getCustomerById(customerId);
    return NextResponse.json({ customer });
  } catch (err) {
    console.error("auth/me failed:", err);
    return NextResponse.json({ customer: null });
  }
}
