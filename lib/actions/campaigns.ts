"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import type { Campaign } from "@/lib/mock-data";

const campaignStatusSchema = z.enum(["Draft", "Ready", "Live"]);

export async function updateCampaignStatus(slug: string, status: Campaign["status"]) {
  const parsedSlug = z.string().min(3).parse(slug);
  const parsedStatus = campaignStatusSchema.parse(status);

  const saved = await db.campaign.update({
    where: { slug: parsedSlug },
    data: { status: parsedStatus }
  });

  revalidatePath("/admin/campaigns");
  revalidatePath("/admin");
  revalidatePath("/");
  return saved as Campaign;
}
