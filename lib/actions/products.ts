"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import type { Product } from "@/lib/mock-data";

const productStatusSchema = z.enum(["Published", "Draft", "Hidden"]);

const productSchema = z.object({
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  name: z.string().min(3),
  category: z.string().min(2),
  collection: z.string().min(2),
  price: z.number().min(1),
  rating: z.number(),
  stock: z.number().int().min(0),
  market: z.string().min(2),
  badge: z.string(),
  tone: z.string(),
  description: z.string().min(40),
  ritual: z.array(z.string()),
  ingredients: z.array(z.string()),
  image: z.string(),
  status: productStatusSchema,
  seoCompleteness: z.number().int().min(0).max(100),
  imageAlt: z.string(),
  sku: z.string(),
  updatedAt: z.string()
});

export async function upsertProduct(input: Product, originalSlug?: string) {
  const product = productSchema.parse(input);
  const lookupSlug = originalSlug ?? product.slug;

  const exists = await db.product.findUnique({ where: { slug: lookupSlug } });

  const saved = exists
    ? await db.product.update({
        where: { slug: lookupSlug },
        data: product
      })
    : await db.product.create({ data: product });

  revalidatePath("/admin/products");
  revalidatePath("/admin/inventory");
  revalidatePath("/products");
  revalidatePath("/");
  return saved as Product;
}

export async function updateProductStatus(slug: string, status: Product["status"]) {
  const parsedSlug = z.string().min(3).parse(slug);
  const parsedStatus = productStatusSchema.parse(status);
  const saved = await db.product.update({
    where: { slug: parsedSlug },
    data: {
      status: parsedStatus,
      updatedAt: new Date().toISOString().split("T")[0]
    }
  });

  revalidatePath("/admin/products");
  revalidatePath("/admin/inventory");
  revalidatePath("/products");
  revalidatePath("/");
  return saved as Product;
}
