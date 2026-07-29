"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AccountForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div>
      <div className="flex gap-1 rounded-full bg-ivory p-1">
        <button
          onClick={() => setMode("signin")}
          className={cn(
            "flex-1 rounded-full py-2 text-sm font-medium transition-colors",
            mode === "signin" ? "bg-paper text-ink-900 shadow-soft" : "text-ink-500",
          )}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode("signup")}
          className={cn(
            "flex-1 rounded-full py-2 text-sm font-medium transition-colors",
            mode === "signup" ? "bg-paper text-ink-900 shadow-soft" : "text-ink-500",
          )}
        >
          Create Account
        </button>
      </div>

      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        {mode === "signup" && (
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Full Name</label>
            <input className="mt-1.5 h-12 w-full rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none" />
          </div>
        )}
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Email</label>
          <input type="email" className="mt-1.5 h-12 w-full rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink-600">Password</label>
          <input type="password" className="mt-1.5 h-12 w-full rounded-md border border-beige-dark bg-transparent px-4 text-sm focus:border-ink-900 focus:outline-none" />
        </div>
        <Button type="submit" className="w-full" size="lg">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </Button>
        {mode === "signin" && (
          <p className="text-center text-xs text-ink-500">
            <a href="#" className="underline">Forgot your password?</a>
          </p>
        )}
      </form>
    </div>
  );
}
