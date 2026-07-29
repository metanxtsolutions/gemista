"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Incorrect password.");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-2xl border border-beige bg-paper p-6 shadow-[0_1px_2px_rgba(20,20,18,0.04)]"
    >
      <h1 className="flex items-center gap-2 font-display text-lg text-ink-900">
        <Lock size={16} /> Admin Login
      </h1>
      <input
        type="password"
        required
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="h-12 w-full rounded-xl border border-beige-dark bg-paper px-4 text-sm text-ink-900 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
      />
      {error && <p className="text-xs text-error">{error}</p>}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Checking..." : "Sign In"}
      </Button>
    </form>
  );
}
