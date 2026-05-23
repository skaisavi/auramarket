"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import type { AuditIssue } from "@/lib/mock-data";

const auditStatusSchema = z.enum(["Open", "In progress", "Waiting for approval", "Fixed", "Closed"]);

export async function updateAuditIssue(id: string, status: AuditIssue["status"]) {
  const parsedId = z.string().min(1).parse(id);
  const parsedStatus = auditStatusSchema.parse(status);

  const saved = await db.auditIssue.update({
    where: { id: parsedId },
    data: { status: parsedStatus }
  });

  revalidatePath("/admin/audits");
  revalidatePath("/admin");
  return saved as AuditIssue;
}
