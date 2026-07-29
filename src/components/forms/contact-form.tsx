"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-beige p-12 text-center">
        <Check size={28} className="text-success" />
        <p className="mt-4 font-display text-xl text-ink-900">Message sent</p>
        <p className="mt-2 text-sm text-ink-500">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Name</label>
          <input
            required
            type="text"
            className="mt-1.5 h-12 w-full rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Email</label>
          <input
            required
            type="email"
            className="mt-1.5 h-12 w-full rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Order Number (optional)</label>
        <input
          type="text"
          className="mt-1.5 h-12 w-full rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Message</label>
        <textarea
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-beige-dark bg-transparent px-4 py-3 text-sm focus:border-ink-900 focus:outline-none"
        />
      </div>
      <Button type="submit" size="lg">
        Send Message
      </Button>
    </form>
  );
}
