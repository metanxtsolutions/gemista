import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { products } from "@/lib/data/products";

interface OrderItem {
  slug: string;
  qty: number;
}

interface CreateOrderBody {
  items: OrderItem[];
  couponApplied?: boolean;
}

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 79;
const COUPON_DISCOUNT_RATE = 0.1;

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 500 },
    );
  }

  let body: CreateOrderBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  let subtotal = 0;
  for (const item of body.items) {
    const product = products.find((p) => p.slug === item.slug);
    if (!product || !Number.isInteger(item.qty) || item.qty < 1) {
      return NextResponse.json({ error: `Invalid item: ${item.slug}` }, { status: 400 });
    }
    subtotal += product.price * item.qty;
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const discount = body.couponApplied ? Math.round(subtotal * COUPON_DISCOUNT_RATE) : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `gemista_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }
}
