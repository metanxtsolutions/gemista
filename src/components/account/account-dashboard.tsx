"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { CustomerRecord, OrderRecord } from "@/lib/db";

const inputClass =
  "h-11 w-full rounded-xl border border-beige-dark bg-paper px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400/30";

function statusLabel(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function AccountDashboard({
  customer,
  orders,
}: {
  customer: CustomerRecord;
  orders: OrderRecord[];
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState(customer.full_name ?? "");
  const [email, setEmail] = useState(customer.email ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSaveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email }),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const greetName = customer.full_name?.split(" ")[0] || "there";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-beige bg-paper p-6 shadow-[0_1px_2px_rgba(20,20,18,0.04)]">
          <p className="font-display text-xl text-ink-900">Hi, {greetName}</p>
          <p className="mt-1 text-sm text-ink-500">+91 {customer.phone}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4 w-full"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            <LogOut size={13} /> {signingOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>

        <form
          onSubmit={handleSaveProfile}
          className="space-y-3 rounded-2xl border border-beige bg-paper p-6 shadow-[0_1px_2px_rgba(20,20,18,0.04)]"
        >
          <div className="flex items-center gap-2">
            <User size={15} className="text-ink-500" />
            <h2 className="text-sm font-medium text-ink-900">Your details</h2>
          </div>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className={inputClass}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optional)"
            className={inputClass}
          />
          <Button type="submit" size="sm" variant="secondary" className="w-full" disabled={saving}>
            {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
          </Button>
        </form>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Package size={16} className="text-ink-500" />
          <h2 className="font-display text-lg text-ink-900">Your Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-beige bg-paper p-10 text-center">
            <p className="text-sm text-ink-500">You haven&apos;t placed any orders yet.</p>
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded-2xl border border-beige bg-paper p-5 shadow-[0_1px_2px_rgba(20,20,18,0.04)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-beige pb-3">
                  <div>
                    <p className="text-xs text-ink-400">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-ink-400">Order #{order.id}</p>
                  </div>
                  <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                    {statusLabel(order.status)}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-ink-600">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span className="truncate pr-2">
                        {item.name} × {item.qty}
                      </span>
                      <span className="shrink-0">{formatPrice(item.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-between border-t border-beige pt-3 text-sm font-semibold text-ink-900">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
