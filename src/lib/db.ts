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
  customer_id: number | null;
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

export interface CustomerRecord {
  id: number;
  phone: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
}

interface OtpRecord {
  id: number;
  phone: string;
  code_hash: string;
  expires_at: string;
  attempts: number;
  created_at: string;
}

let schemaReady: Promise<unknown> | null = null;

function ensureSchema(): Promise<unknown> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS customers (
          id SERIAL PRIMARY KEY,
          phone TEXT NOT NULL UNIQUE,
          full_name TEXT,
          email TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS otp_codes (
          id SERIAL PRIMARY KEY,
          phone TEXT NOT NULL,
          code_hash TEXT NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL,
          attempts INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`
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
      await sql`
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_id INTEGER REFERENCES customers(id)
      `;
    })();
  }
  return schemaReady;
}

export interface NewOrderInput {
  customerId: number | null;
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
  await ensureSchema();
  await sql`
    INSERT INTO orders (
      customer_id, razorpay_order_id, razorpay_payment_id, full_name, phone, address, city, pin_code,
      items, subtotal, shipping, discount, total, gift_note
    ) VALUES (
      ${input.customerId}, ${input.razorpayOrderId}, ${input.razorpayPaymentId}, ${input.fullName}, ${input.phone},
      ${input.address}, ${input.city}, ${input.pinCode}, ${JSON.stringify(input.items)},
      ${input.subtotal}, ${input.shipping}, ${input.discount}, ${input.total}, ${input.giftNote}
    )
    ON CONFLICT (razorpay_payment_id) DO NOTHING
  `;
}

export async function listOrders(): Promise<OrderRecord[]> {
  await ensureSchema();
  const { rows } = await sql<OrderRecord>`
    SELECT * FROM orders ORDER BY created_at DESC LIMIT 200
  `;
  return rows;
}

export async function listOrdersForCustomer(customerId: number): Promise<OrderRecord[]> {
  await ensureSchema();
  const { rows } = await sql<OrderRecord>`
    SELECT * FROM orders WHERE customer_id = ${customerId} ORDER BY created_at DESC LIMIT 100
  `;
  return rows;
}

export async function findOrCreateCustomerByPhone(phone: string): Promise<CustomerRecord> {
  await ensureSchema();
  const existing = await sql<CustomerRecord>`SELECT * FROM customers WHERE phone = ${phone}`;
  if (existing.rows[0]) return existing.rows[0];
  const created = await sql<CustomerRecord>`
    INSERT INTO customers (phone) VALUES (${phone})
    ON CONFLICT (phone) DO UPDATE SET phone = EXCLUDED.phone
    RETURNING *
  `;
  return created.rows[0];
}

export async function getCustomerById(id: number): Promise<CustomerRecord | null> {
  await ensureSchema();
  const { rows } = await sql<CustomerRecord>`SELECT * FROM customers WHERE id = ${id}`;
  return rows[0] ?? null;
}

export async function updateCustomerProfile(
  id: number,
  input: { fullName: string; email: string | null },
): Promise<void> {
  await ensureSchema();
  await sql`
    UPDATE customers SET full_name = ${input.fullName}, email = ${input.email} WHERE id = ${id}
  `;
}

export async function createOtpCode(phone: string, codeHash: string, expiresAt: Date): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO otp_codes (phone, code_hash, expires_at) VALUES (${phone}, ${codeHash}, ${expiresAt.toISOString()})
  `;
}

export async function getLatestOtp(phone: string): Promise<OtpRecord | null> {
  await ensureSchema();
  const { rows } = await sql<OtpRecord>`
    SELECT * FROM otp_codes WHERE phone = ${phone} ORDER BY created_at DESC LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function incrementOtpAttempts(id: number): Promise<void> {
  await sql`UPDATE otp_codes SET attempts = attempts + 1 WHERE id = ${id}`;
}

export async function deleteOtp(id: number): Promise<void> {
  await sql`DELETE FROM otp_codes WHERE id = ${id}`;
}
