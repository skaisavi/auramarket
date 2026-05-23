"use server";

import { z } from "zod";
import { db } from "@/lib/db";

const orderItemSchema = z.object({
  productSlug: z.string().min(1),
  productName: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
});

const createOrderSchema = z.object({
  orderRef: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postcode: z.string().min(1),
  country: z.string().min(1),
  total: z.number().positive(),
  items: z.array(orderItemSchema).min(1),
});

export async function createOrder(input: z.infer<typeof createOrderSchema>) {
  const data = createOrderSchema.parse(input);

  const order = await db.order.create({
    data: {
      orderRef: data.orderRef,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      postcode: data.postcode,
      country: data.country,
      total: data.total,
      status: "Preparing",
      items: {
        create: data.items,
      },
    },
    include: { items: true },
  });

  return order;
}
