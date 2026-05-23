"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import type { ReviewRow } from "@/lib/data/public";

const reviewSchema = z.object({
  productSlug: z.string().min(1),
  name: z.string().min(1).max(100),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(10).max(1000),
});

export async function submitReview(
  input: z.infer<typeof reviewSchema>
): Promise<ReviewRow> {
  const data = reviewSchema.parse(input);

  const review = await db.review.create({
    data: {
      productSlug: data.productSlug,
      name: data.name,
      rating: data.rating,
      body: data.body,
      verified: false,
      helpful: 0,
    },
  });

  revalidatePath(`/products/${data.productSlug}`);

  return {
    id: review.id,
    name: review.name,
    rating: review.rating,
    body: review.body,
    date: review.createdAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    verified: review.verified,
    helpful: review.helpful,
  };
}
