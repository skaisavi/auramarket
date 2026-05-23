"use server";

import { z } from "zod";
import { db } from "@/lib/db";

const emailSchema = z.string().email();

export async function subscribeToNewsletter(email: string) {
  const validEmail = emailSchema.parse(email);

  await db.newsletterSignup.upsert({
    where: { email: validEmail },
    create: { email: validEmail },
    update: {},
  });

  return { success: true };
}
