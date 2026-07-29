"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Lock, Tag } from "lucide-react";
import { useGemista } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "upi", label: "UPI" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function CheckoutPage() {
  const cart = useGemista((s) => s.cart);
  const subtotal = useGemista((s) => s.cartSubtotal());
  const mounted = useGemista((s) => s.hasHydrated);
  const [payment, setPayment] = useState("card");
  const [giftNote, setGiftNote] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  if (placed) {
    return (
      <div className="container-gem flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
          <Check size={26} />
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink-900">Thank you for your order</h1>
        <p className="mt-2 max-w-md text-ink-500">
          A confirmation has been sent to your email. Your order will be packed with care and
          on its way shortly.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (mounted && cart.length === 0) {
    return (
      <div className="container-gem flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-xl text-ink-900">Your bag is empty</p>
        <Button className="mt-6" asChild>
          <Link href="/collections/all">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Secure Checkout" title="Checkout" crumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPlaced(true);
        }}
        className="container-gem grid grid-cols-1 gap-12 py-10 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-lg text-ink-900">Contact</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required type="email" placeholder="Email address" className="h-12 rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none sm:col-span-2" />
              <input required placeholder="First name" className="h-12 rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none" />
              <input required placeholder="Last name" className="h-12 rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none" />
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink-900">Shipping Address</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Address" className="h-12 rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none sm:col-span-2" />
              <input required placeholder="City" className="h-12 rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none" />
              <input required placeholder="PIN Code" className="h-12 rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none" />
              <input required placeholder="Phone number" className="h-12 rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none sm:col-span-2" />
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg text-ink-900">Payment Method</h2>
            <div className="mt-4 space-y-2">
              {paymentMethods.map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3.5 text-sm",
                    payment === m.id ? "border-ink-900" : "border-beige-dark",
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                    className="h-4 w-4 accent-ink-900"
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </section>

          <section>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
              <input
                type="checkbox"
                checked={giftNote}
                onChange={(e) => setGiftNote(e.target.checked)}
                className="h-4 w-4 accent-ink-900"
              />
              This order is a gift, add gift wrapping & a note
            </label>
            {giftNote && (
              <textarea
                placeholder="Write your gift note..."
                rows={3}
                className="mt-3 w-full rounded-md border border-beige-dark bg-transparent px-4 py-3 text-sm focus:border-ink-900 focus:outline-none"
              />
            )}
          </section>
        </div>

        <div className="h-fit rounded-lg border border-beige p-6">
          <h2 className="font-display text-lg text-ink-900">Order Summary</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-600">
            {cart.map((line) => (
              <li key={`${line.slug}-${line.variant}`} className="flex justify-between">
                <span className="truncate pr-2">
                  {line.name} × {line.qty}
                </span>
                <span className="shrink-0">{formatPrice(line.price * line.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-md border border-beige-dark px-3">
              <Tag size={14} className="text-ink-400" />
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="h-11 flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setCouponApplied(Boolean(coupon))}
            >
              Apply
            </Button>
          </div>
          {couponApplied && <p className="mt-2 text-xs text-success">Code applied: 10% off</p>}

          <div className="mt-5 space-y-2 border-t border-beige pt-4 text-sm">
            <div className="flex justify-between text-ink-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            {couponApplied && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
          </div>
          <div className="mt-3 flex justify-between border-t border-beige pt-3 font-semibold text-ink-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <Button type="submit" className="mt-6 w-full" size="lg">
            <Lock size={14} /> Place Order
          </Button>
          <p className="mt-3 text-center text-[11px] text-ink-400">
            Your payment information is processed securely.
          </p>
        </div>
      </form>
    </div>
  );
}
