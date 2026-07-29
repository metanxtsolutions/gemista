"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, CreditCard, Landmark, Lock, QrCode, Tag } from "lucide-react";
import { useGemista } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import { loadRazorpayScript } from "@/lib/razorpay";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

type PaymentMethod = "upi" | "credit_card" | "debit_card";

const paymentMethods: { id: PaymentMethod; label: string; sub: string; icon: typeof QrCode }[] = [
  { id: "upi", label: "UPI", sub: "Google Pay, PhonePe, Paytm & more", icon: QrCode },
  { id: "credit_card", label: "Credit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "debit_card", label: "Debit Card", sub: "Visa, Mastercard, RuPay", icon: Landmark },
];

const inputClass =
  "h-12 w-full rounded-xl border border-beige-dark bg-paper px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400/30";

export default function CheckoutPage() {
  const cart = useGemista((s) => s.cart);
  const subtotal = useGemista((s) => s.cartSubtotal());
  const mounted = useGemista((s) => s.hasHydrated);
  const clearCart = useGemista((s) => s.clearCart);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("upi");
  const [giftNote, setGiftNote] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState("");
  const [placed, setPlaced] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data: { customer: { full_name: string | null; phone: string } | null }) => {
        if (!data.customer) return;
        if (data.customer.full_name) setFullName(data.customer.full_name);
        setPhone(data.customer.phone);
      })
      .catch(() => {
        // Not logged in or request failed — checkout continues as guest.
      });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((line) => ({ slug: line.slug, qty: line.qty })),
          couponApplied,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setError(orderData.error ?? "Could not start payment. Please try again.");
        setSubmitting(false);
        return;
      }

      const scriptReady = await loadRazorpayScript();
      if (!scriptReady || !window.Razorpay) {
        setError("Could not load the payment gateway. Check your connection and try again.");
        setSubmitting(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Gemista",
        description: `${cart.length} item${cart.length === 1 ? "" : "s"}`,
        order_id: orderData.orderId,
        prefill: { name: fullName, contact: phone },
        theme: { color: "#c8a55a" },
        method: payment === "upi" ? { upi: true, card: false } : { card: true, upi: false },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                order: {
                  fullName,
                  phone,
                  address,
                  city,
                  pinCode,
                  items: cart.map((line) => ({
                    slug: line.slug,
                    name: line.name,
                    variant: line.variant,
                    qty: line.qty,
                    price: line.price,
                  })),
                  subtotal,
                  shipping,
                  discount,
                  total,
                  giftNote: giftNote && giftNoteText ? giftNoteText : null,
                },
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.verified) {
              clearCart();
              setPlaced(true);
            } else {
              setError("Payment could not be verified. If you were charged, contact support.");
            }
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });
      razorpay.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (placed) {
    return (
      <div className="container-gem flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
          <Check size={26} />
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink-900">Thank you for your order</h1>
        <p className="mt-2 max-w-md text-ink-500">
          Your payment was successful. Your order will be packed with care and on its way shortly.
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

      <form onSubmit={handleSubmit} className="container-gem grid grid-cols-1 gap-8 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-beige bg-paper p-6 shadow-[0_1px_2px_rgba(20,20,18,0.04)]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-[11px] font-medium text-cream">1</span>
              <h2 className="font-display text-lg text-ink-900">Contact</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className={cn(inputClass, "sm:col-span-2")}
              />
              <input
                required
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className={cn(inputClass, "sm:col-span-2")}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-beige bg-paper p-6 shadow-[0_1px_2px_rgba(20,20,18,0.04)]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-[11px] font-medium text-cream">2</span>
              <h2 className="font-display text-lg text-ink-900">Shipping Address</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className={cn(inputClass, "sm:col-span-2")}
              />
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className={inputClass}
              />
              <input
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="PIN code"
                className={inputClass}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-beige bg-paper p-6 shadow-[0_1px_2px_rgba(20,20,18,0.04)]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-[11px] font-medium text-cream">3</span>
              <h2 className="font-display text-lg text-ink-900">Payment Method</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {paymentMethods.map((m) => {
                const Icon = m.icon;
                const active = payment === m.id;
                return (
                  <label
                    key={m.id}
                    className={cn(
                      "flex cursor-pointer flex-col items-start gap-3 rounded-xl border px-4 py-4 transition-all duration-200",
                      active
                        ? "border-ink-900 bg-ivory shadow-[0_1px_3px_rgba(20,20,18,0.08)]"
                        : "border-beige-dark hover:border-ink-400",
                    )}
                  >
                    <div className="flex w-full items-start justify-between">
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200",
                          active ? "bg-ink-900 text-cream" : "bg-ivory text-ink-500",
                        )}
                      >
                        <Icon size={16} />
                      </span>
                      <span
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-200",
                          active ? "border-ink-900 bg-ink-900" : "border-beige-dark",
                        )}
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-cream" />}
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={active}
                      onChange={() => setPayment(m.id)}
                      className="sr-only"
                    />
                    <div>
                      <p className="text-sm font-medium text-ink-900">{m.label}</p>
                      <p className="mt-0.5 text-xs text-ink-500">{m.sub}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-beige bg-paper p-6 shadow-[0_1px_2px_rgba(20,20,18,0.04)]">
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
                value={giftNoteText}
                onChange={(e) => setGiftNoteText(e.target.value)}
                placeholder="Write your gift note..."
                rows={3}
                className="mt-3 w-full rounded-xl border border-beige-dark bg-paper px-4 py-3 text-sm focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
              />
            )}
          </section>
        </div>

        <div className="h-fit space-y-4 rounded-2xl border border-beige bg-paper p-6 shadow-[0_1px_2px_rgba(20,20,18,0.04)] lg:sticky lg:top-24">
          <h2 className="font-display text-lg text-ink-900">Order Summary</h2>
          <ul className="space-y-2 text-sm text-ink-600">
            {cart.map((line) => (
              <li key={`${line.slug}-${line.variant}`} className="flex justify-between">
                <span className="truncate pr-2">
                  {line.name} × {line.qty}
                </span>
                <span className="shrink-0">{formatPrice(line.price * line.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-beige-dark px-3">
              <Tag size={14} className="text-ink-400" />
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="h-11 flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <Button type="button" variant="secondary" size="sm" onClick={() => setCouponApplied(Boolean(coupon))}>
              Apply
            </Button>
          </div>
          {couponApplied && <p className="text-xs text-success">Code applied: 10% off</p>}

          <div className="space-y-2 border-t border-beige pt-4 text-sm">
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
          <div className="flex justify-between border-t border-beige pt-3 font-semibold text-ink-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-xs text-error">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            <Lock size={14} /> {submitting ? "Processing..." : `Pay ${formatPrice(total)}`}
          </Button>
          <p className="text-center text-[11px] text-ink-400">
            Payments are processed securely by Razorpay.
          </p>
        </div>
      </form>
    </div>
  );
}
