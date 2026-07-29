"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass =
  "h-12 w-full rounded-xl border border-beige-dark bg-paper px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-400/30";

const RESEND_COOLDOWN_S = 30;

export function OtpLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  useEffect(() => {
    if (step === "code") codeInputRef.current?.focus();
  }, [step]);

  async function sendCode() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not send the code. Please try again.");
        setSubmitting(false);
        return;
      }
      setStep("code");
      setCooldown(RESEND_COOLDOWN_S);
      setSubmitting(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  async function handlePhoneSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    await sendCode();
  }

  async function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Incorrect code.");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (step === "phone") {
    return (
      <form
        onSubmit={handlePhoneSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-beige bg-paper p-7 shadow-[0_1px_2px_rgba(20,20,18,0.04)]"
      >
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink-700">
            <Smartphone size={18} />
          </div>
          <h1 className="mt-4 font-display text-xl text-ink-900">Sign in or create an account</h1>
          <p className="mt-1 text-sm text-ink-500">We&apos;ll text you a one-time code to sign in.</p>
        </div>

        <div className="flex overflow-hidden rounded-xl border border-beige-dark focus-within:border-ink-900 focus-within:ring-2 focus-within:ring-gold-400/30">
          <span className="flex items-center border-r border-beige-dark bg-ivory px-3 text-sm text-ink-600">+91</span>
          <input
            required
            autoFocus
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="10-digit mobile number"
            className="h-12 flex-1 bg-paper px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Sending..." : "Continue"}
        </Button>
        <p className="text-center text-[11px] leading-relaxed text-ink-400">
          By continuing, you agree to Gemista&apos;s Terms of Service and Privacy Policy.
        </p>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleCodeSubmit}
      className="w-full max-w-sm space-y-5 rounded-2xl border border-beige bg-paper p-7 shadow-[0_1px_2px_rgba(20,20,18,0.04)]"
    >
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink-700">
          <ShieldCheck size={18} />
        </div>
        <h1 className="mt-4 font-display text-xl text-ink-900">Enter the code</h1>
        <p className="mt-1 text-sm text-ink-500">
          We sent a 6-digit code to <span className="font-medium text-ink-800">+91 {phone}</span>
        </p>
      </div>

      <input
        ref={codeInputRef}
        required
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        placeholder="6-digit code"
        className={`${inputClass} text-center text-lg tracking-[0.5em]`}
      />
      {error && <p className="text-xs text-error">{error}</p>}

      <Button type="submit" className="w-full" disabled={submitting || code.length !== 6}>
        {submitting ? "Verifying..." : "Verify & Continue"}
      </Button>

      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => {
            setStep("phone");
            setCode("");
            setError(null);
          }}
          className="flex items-center gap-1 text-ink-500 hover:text-ink-900"
        >
          <ArrowLeft size={13} /> Change number
        </button>
        <button
          type="button"
          disabled={cooldown > 0 || submitting}
          onClick={sendCode}
          className="text-ink-500 hover:text-ink-900 disabled:cursor-not-allowed disabled:text-ink-400"
        >
          {cooldown > 0 ? `Resend code in 0:${String(cooldown).padStart(2, "0")}` : "Resend code"}
        </button>
      </div>
    </form>
  );
}
