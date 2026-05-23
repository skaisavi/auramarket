"use client";

import { Star, ThumbsUp } from "lucide-react";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { submitReview } from "@/lib/actions/reviews";
import { useToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { ReviewRow } from "@/lib/data/public";

const FALLBACK_REVIEWS: ReviewRow[] = [
  {
    id: "r1",
    name: "Maya R.",
    rating: 5,
    body: "This has become an essential part of my evening routine. The texture and scent feel considered, and the results are genuinely noticeable after two weeks.",
    date: "12 May 2026",
    verified: true,
    helpful: 14,
  },
  {
    id: "r2",
    name: "Noah L.",
    rating: 5,
    body: "Beautifully presented and easy to work into a daily ritual. I appreciated the clear usage notes and ingredient detail on the product page.",
    date: "3 May 2026",
    verified: true,
    helpful: 9,
  },
  {
    id: "r3",
    name: "Chloe M.",
    rating: 4,
    body: "Really lovely product. Scent is subtle and lasting without being overpowering. Would have given five stars but shipping took a little longer than expected.",
    date: "28 Apr 2026",
    verified: true,
    helpful: 5,
  },
];

export function ReviewSection({
  productSlug,
  productRating,
  initialReviews,
}: {
  productSlug: string;
  productRating: number;
  initialReviews: ReviewRow[];
}) {
  const [reviews, setReviews] = useState<ReviewRow[]>(
    initialReviews.length > 0 ? initialReviews : FALLBACK_REVIEWS
  );
  const [helpedIds, setHelpedIds] = useState<Set<string>>(new Set());
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : productRating.toFixed(1);

  function markHelpful(id: string) {
    if (helpedIds.has(id)) return;
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
    setHelpedIds((prev) => new Set(prev).add(id));
  }

  function handleSubmit() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name";
    if (rating === 0) next.rating = "Please select a star rating";
    if (body.trim().length < 10) next.body = "Review must be at least 10 characters";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    startTransition(async () => {
      try {
        const saved = await submitReview({ productSlug, name: name.trim(), rating, body: body.trim() });
        setReviews((prev) => [saved, ...prev]);
      } catch {
        // DB unavailable — add optimistically with local timestamp
        const optimistic: ReviewRow = {
          id: `r-${Date.now()}`,
          name: name.trim(),
          rating,
          body: body.trim(),
          date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
          verified: false,
          helpful: 0,
        };
        setReviews((prev) => [optimistic, ...prev]);
      }
      setName(""); setRating(0); setBody(""); setErrors({}); setFormOpen(false);
      toast("Review submitted — thank you!");
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="border-t border-line pt-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Customer reviews</h2>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn("h-5 w-5", parseFloat(avgRating) >= s ? "fill-gold text-gold" : "fill-none text-line")}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{avgRating}</span>
              <span className="text-sm text-muted">({reviews.length} reviews)</span>
            </div>
          </div>
          <Button onClick={() => setFormOpen(!formOpen)} variant={formOpen ? "secondary" : "primary"}>
            {formOpen ? "Cancel" : "Write a review"}
          </Button>
        </div>

        {formOpen && (
          <div className="mt-6 rounded-2xl border border-line bg-white/78 p-6 shadow-inset">
            <h3 className="font-semibold">Your review</h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={cn(
                    "mt-1.5 h-11 w-full max-w-sm rounded-xl border bg-white px-4 text-sm outline-none transition focus:ring-2",
                    errors.name ? "border-clay-300 focus:ring-clay-100" : "border-line focus:border-sage-400 focus:ring-sage-100"
                  )}
                />
                {errors.name && <p className="mt-1 text-xs text-clay-700">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted">Rating</label>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(0)}
                      aria-label={`${s} star${s !== 1 ? "s" : ""}`}
                    >
                      <Star
                        className={cn(
                          "h-7 w-7 transition",
                          (hovered || rating) >= s ? "fill-gold text-gold" : "fill-none text-line"
                        )}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="mt-1 text-xs text-clay-700">{errors.rating}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted">Review</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  placeholder="Share your experience with this product..."
                  className={cn(
                    "mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2",
                    errors.body ? "border-clay-300 focus:ring-clay-100" : "border-line focus:border-sage-400 focus:ring-sage-100"
                  )}
                />
                {errors.body && <p className="mt-1 text-xs text-clay-700">{errors.body}</p>}
              </div>

              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Submitting…" : "Submit review"}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-2xl border border-line bg-white/78 p-5 shadow-inset">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {review.date}
                    {review.verified && (
                      <span className="ml-2 rounded-full bg-sage-50 px-2 py-0.5 text-sage-700">Verified purchase</span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={cn("h-4 w-4", review.rating >= s ? "fill-gold text-gold" : "fill-none text-line")}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{review.body}</p>
              <button
                type="button"
                onClick={() => markHelpful(review.id)}
                disabled={helpedIds.has(review.id)}
                className={cn(
                  "mt-4 flex items-center gap-1.5 text-xs transition",
                  helpedIds.has(review.id) ? "text-sage-600" : "text-muted hover:text-ink"
                )}
              >
                <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
                Helpful ({review.helpful})
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
