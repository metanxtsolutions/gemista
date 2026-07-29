import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { insertOrder, OrderItem } from "@/lib/db";
import { CUSTOMER_COOKIE_NAME, getCustomerIdFromToken } from "@/lib/customer-auth";

interface OrderDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  giftNote: string | null;
}

interface VerifyBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  order: OrderDetails;
}

export async function POST(req: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Payments aren't configured yet." }, { status: 500 });
  }

  let body: VerifyBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order) {
    return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
  }

  const expected = createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(razorpay_signature, "hex");

  const isValid =
    expectedBuf.length === receivedBuf.length && timingSafeEqual(expectedBuf, receivedBuf);

  if (!isValid) {
    return NextResponse.json({ verified: false, error: "Payment could not be verified." }, { status: 400 });
  }

  try {
    const customerId = getCustomerIdFromToken(req.cookies.get(CUSTOMER_COOKIE_NAME)?.value);
    await insertOrder({
      customerId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      fullName: order.fullName,
      phone: order.phone,
      address: order.address,
      city: order.city,
      pinCode: order.pinCode,
      items: order.items,
      subtotal: order.subtotal,
      shipping: order.shipping,
      discount: order.discount,
      total: order.total,
      giftNote: order.giftNote,
    });
  } catch (err) {
    // Payment is already verified and real money was captured — never fail the
    // customer-facing response over a storage error. Log for manual follow-up.
    console.error("Failed to store order after verified payment:", razorpay_payment_id, err);
  }

  return NextResponse.json({ verified: true });
}
