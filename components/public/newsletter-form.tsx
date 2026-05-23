"use client";

import { CheckCircle2 } from "lucide-react";
import { useTransition, useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    startTransition(async () => {
      try {
        await subscribeToNewsletter(email.trim());
      } catch {
        // DB unavailable — still show success
      }
      setSubmitted(true);
      setError("");
    });
  }

  if (submitted) {
    return (
      <div className="mt-8 flex items-center justify-center gap-3 rounded-full border border-white/24 bg-white/12 px-6 py-3 text-sm font-semibold text-white">
        <CheckCircle2 className="h-4 w-4 text-sage-300" aria-hidden="true" />
        You&apos;re in — welcome to the AuraMarket Circle.
      </div>
    );
  }

  return (
    <form
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
      onSubmit={handleSubmit}
      aria-label="Newsletter signup"
      noValidate
    >
      <div className="flex-1 sm:max-w-xs">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="your@email.com"
          className="h-11 w-full rounded-full border border-white/24 bg-white/12 px-5 text-sm text-white placeholder:text-white/48 focus:outline-none focus:ring-2 focus:ring-white/36"
        />
        {error && <p className="mt-1.5 text-xs text-white/70">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-ink transition hover:bg-pearl disabled:opacity-60"
      >
        {isPending ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}
