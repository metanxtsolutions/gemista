import { sql } from "@vercel/postgres";

export interface OrderItem {
  slug: string;
  name: string;
  variant: string;
  qty: number;
  price: number;
}

export interface OrderRecord {
  id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  pin_code: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  gift_note: string | null;
  status: string;
  created_at: string;
}

let tableReady: Promise<unknown> | null = null;

function ensureOrdersTable(): Promise<unknown> {
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        razorpay_order_id TEXT NOT NULL,
        razorpay_payment_id TEXT NOT NULL UNIQUE,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        pin_code TEXT NOT NULL,
        items JSONB NOT NULL,
        subtotal INTEGER NOT NULL,
        shipping INTEGER NOT NULL,
        discount INTEGER NOT NULL,
        total INTEGER NOT NULL,
        gift_note TEXT,
        status TEXT NOT NULL DEFAULT 'paid',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
  }
  return tableReady;
}

export interface NewOrderInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
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

export async function insertOrder(input: NewOrderInput): Promise<void> {
  await ensureOrdersTable();
  await sql`
    INSERT INTO orders (
      razorpay_order_id, razorpay_payment_id, full_name, phone, address, city, pin_code,
      items, subtotal, shipping, discount, total, gift_note
    ) VALUES (
      ${input.razorpayOrderId}, ${input.razorpayPaymentId}, ${input.fullName}, ${input.phone},
      ${input.address}, ${input.city}, ${input.pinCode}, ${JSON.stringify(input.items)},
      ${input.subtotal}, ${input.shipping}, ${input.discount}, ${input.total}, ${input.giftNote}
    )
    ON CONFLICT (razorpay_payment_id) DO NOTHING
  `;
}

export async function listOrders(): Promise<OrderRecord[]> {
  await ensureOrdersTable();
  const { rows } = await sql<OrderRecord>`
    SELECT * FROM orders ORDER BY created_at DESC LIMIT 200
  `;
  return rows;
}
