"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (compact) {
    return (
      <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-paper p-8 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-xl text-ink-900">Get 10% off your first order</h3>
          <p className="mt-1 text-sm text-ink-500">
            Join our list for new arrivals, styling edits, and members-only offers.
          </p>
        </div>
        {submitted ? (
          <p className="flex items-center gap-2 text-sm font-medium text-success">
            <Check size={16} /> You&apos;re on the list!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="h-12 flex-1 rounded-full border border-beige-dark bg-transparent px-5 text-sm placeholder:text-ink-400 focus:border-ink-900 focus:outline-none"
            />
            <Button type="submit" size="md" aria-label="Subscribe">
              <ArrowRight size={16} />
            </Button>
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="bg-ink-900 py-20 sm:py-28">
      <div className="container-gem">
        <Reveal className={cn("mx-auto max-w-xl text-center")}>
          <p className="eyebrow text-gold-400">Stay In The Sparkle</p>
          <h2 className="mt-3 text-balance font-display text-3xl text-cream sm:text-4xl">
            Be the first to know about new drops
          </h2>
          <p className="mt-4 text-balance text-ink-300">
            Sign up for 10% off your first order, plus early access to new collections and
            styling stories.
          </p>

          {submitted ? (
            <p className="mt-8 flex items-center justify-center gap-2 font-medium text-gold-400">
              <Check size={18} /> Welcome to Gemista — check your inbox.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="h-[52px] flex-1 rounded-full border border-ink-600 bg-transparent px-6 text-sm text-cream placeholder:text-ink-400 focus:border-gold-400 focus:outline-none"
              />
              <Button type="submit" variant="outline-light" size="lg">
                Subscribe
              </Button>
            </form>
          )}
          <p className="mt-4 text-[11px] text-ink-400">
            By subscribing you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
