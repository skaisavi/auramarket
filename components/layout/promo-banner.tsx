"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { banners } from "@/lib/mock-data";

const today = new Date("2026-05-23T00:00:00");

const liveBanner = banners.find(
  (b) => b.status === "Live" && new Date(`${b.endsAt}T00:00:00`) >= today
);

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (!liveBanner || dismissed) return null;

  return (
    <div className="relative flex items-center justify-center gap-3 bg-sage-700 px-10 py-3 text-center text-sm font-semibold text-white">
      <span>{liveBanner.message}</span>
      <Link
        href={liveBanner.destination}
        className="flex items-center gap-1 underline underline-offset-2 opacity-90 transition hover:opacity-100"
      >
        Shop now
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition hover:opacity-100"
        aria-label="Dismiss banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
