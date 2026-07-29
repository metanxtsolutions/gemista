"use client";

import { useState } from "react";
import { Check, Package, Truck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Check, label: "Order Confirmed" },
  { icon: Package, label: "Packed" },
  { icon: Truck, label: "Out for Delivery" },
  { icon: Home, label: "Delivered" },
];

export function TrackOrderForm() {
  const [tracked, setTracked] = useState(false);

  if (tracked) {
    return (
      <div>
        <p className="text-sm text-ink-500">Order #GM10482</p>
        <p className="mt-1 font-medium text-ink-900">Estimated delivery: 2 business days</p>
        <div className="mt-8 space-y-6">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-4">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  i <= 1 ? "bg-ink-900 text-cream" : "bg-beige text-ink-400"
                }`}
              >
                <s.icon size={16} />
              </div>
              <span className={i <= 1 ? "font-medium text-ink-900" : "text-ink-400"}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTracked(true);
      }}
      className="space-y-5"
    >
      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Order Number</label>
        <input
          required
          placeholder="e.g. GM10482"
          className="mt-1.5 h-12 w-full rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Email Address</label>
        <input
          required
          type="email"
          className="mt-1.5 h-12 w-full rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none"
        />
      </div>
      <Button type="submit" className="w-full" size="lg">
        Track Order
      </Button>
    </form>
  );
}
