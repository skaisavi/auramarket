"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import type { Banner } from "@/lib/mock-data";

const bannerStatusSchema = z.enum(["Scheduled", "Live", "Paused"]);

export async function updateBannerStatus(id: string, status: Banner["status"]) {
  const parsedId = z.string().min(1).parse(id);
  const parsedStatus = bannerStatusSchema.parse(status);

  const saved = await db.banner.update({
    where: { id: parsedId },
    data: { status: parsedStatus }
  });

  revalidatePath("/admin/banners");
  revalidatePath("/admin");
  revalidatePath("/");
  return saved as Banner;
}
