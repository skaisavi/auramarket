"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Moon, Sparkles, Sun, Zap } from "lucide-react";
import { ProductCard } from "@/components/public/product-card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mock-data";

type Intention = "Sleep" | "Glow" | "Focus";
type Moment = "Morning" | "Desk" | "Evening";

const intentions: { label: Intention; icon: typeof Moon; clue: string }[] = [
  { label: "Sleep", icon: Moon, clue: "calm, rest, lavender" },
  { label: "Glow", icon: Sparkles, clue: "skin, body, rose" },
  { label: "Focus", icon: Zap, clue: "citrus, energy, workspace" }
];

const moments: { label: Moment; icon: typeof Sun }[] = [
  { label: "Morning", icon: Sun },
  { label: "Desk", icon: Zap },
  { label: "Evening", icon: Moon }
];

export function RitualFinder({ products }: { products: Product[] }) {
  const [intention, setIntention] = useState<Intention>("Sleep");
  const [moment, setMoment] = useState<Moment>("Evening");

  const matches = useMemo(() => {
    const query = `${intention} ${moment}`.toLowerCase();
    const scored = products.map((product) => {
      const haystack = [
        product.name,
        product.category,
        product.collection,
        product.badge,
        product.description,
        product.ritual.join(" "),
        product.ingredients.join(" ")
      ].join(" ").toLowerCase();

      let score = 0;
      if (query.includes("sleep") || query.includes("evening")) {
        if (/sleep|rest|lavender|pillow|bath|calm|evening/.test(haystack)) score += 4;
      }
      if (query.includes("glow") || query.includes("morning")) {
        if (/glow|serum|skin|rose|body|vitamin|morning/.test(haystack)) score += 4;
      }
      if (query.includes("focus") || query.includes("desk")) {
        if (/focus|citrus|mist|aroma|workspace|energy|rosemary/.test(haystack)) score += 4;
      }
      if (product.status === "Published") score += 1;
      score += product.rating / 10;

      return { product, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.product);
  }, [intention, moment, products]);

  return (
    <section className="bg-white/56">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
          {/* Left: selector panel */}
          <div className="rounded-2xl border border-line bg-white/80 p-6 shadow-inset">
            <Badge tone="sage">Ritual finder</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Find a product by the moment you want to create.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              A lightweight guided discovery flow that makes the storefront feel more personal while still using the real product catalogue.
            </p>

            <div className="mt-5 space-y-4">
              <OptionGroup title="I want to feel" value={intention} options={intentions} onChange={setIntention} />
              <MomentGroup value={moment} onChange={setMoment} />
            </div>

            <a
              href={`/products?search=${encodeURIComponent(intention.toLowerCase())}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700 transition hover:text-sage-900"
            >
              Explore all {intention.toLowerCase()} rituals
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Right: product results */}
          <div>
            <div className="mb-5">
              <p className="text-sm font-semibold text-sage-700">
                Recommended for {moment.toLowerCase()} {intention.toLowerCase()}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <h3 className="text-2xl font-semibold tracking-tight">Your ritual edit</h3>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-500" />
                </span>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {matches.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OptionGroup({
  onChange,
  options,
  title,
  value
}: {
  onChange: (value: Intention) => void;
  options: { label: Intention; icon: typeof Moon; clue: string }[];
  title: string;
  value: Intention;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{title}</legend>
      <div className="mt-2.5 grid gap-2">
        {options.map(({ clue, icon: Icon, label }) => {
          const active = value === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange(label)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                active
                  ? "border-sage-300 bg-sage-50 text-sage-700"
                  : "border-line bg-gradient-to-br from-white to-surface-strong text-ink hover:border-sage-200 hover:bg-white"
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${active ? "bg-sage-100" : "bg-surface-strong"}`}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {label}
              </span>
              <span className="ml-8 mt-0.5 block text-xs text-muted">{clue}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function MomentGroup({
  onChange,
  value
}: {
  onChange: (value: Moment) => void;
  value: Moment;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">For this moment</legend>
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {moments.map(({ icon: Icon, label }) => {
          const active = value === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange(label)}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-4 text-xs font-semibold transition ${
                active
                  ? "border-sage-300 bg-sage-50 text-sage-700"
                  : "border-line bg-gradient-to-br from-white to-surface-strong text-ink hover:border-sage-200 hover:bg-white"
              }`}
            >
              <span className={`grid h-6 w-6 place-items-center rounded-lg ${active ? "bg-sage-100" : "bg-surface-strong"}`}>
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
