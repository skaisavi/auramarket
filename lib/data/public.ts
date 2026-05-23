import { db } from "@/lib/db";
import {
  products as mockProducts,
  campaigns as mockCampaigns,
  type Product,
  type Campaign,
} from "@/lib/mock-data";

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await db.product.findMany({ orderBy: { updatedAt: "desc" } });
    return rows as Product[];
  } catch {
    return mockProducts;
  }
}

export async function getPublishedProducts(): Promise<Product[]> {
  try {
    const rows = await db.product.findMany({
      where: { status: "Published" },
      orderBy: { updatedAt: "desc" },
    });
    return rows as Product[];
  } catch {
    return mockProducts.filter((p) => p.status === "Published");
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const row = await db.product.findUnique({ where: { slug } });
    return row as Product | null;
  } catch {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const rows = await db.product.findMany({ select: { slug: true } });
    return rows.map((r) => r.slug);
  } catch {
    return mockProducts.map((p) => p.slug);
  }
}

export async function getFeaturedCampaign(): Promise<Campaign | null> {
  try {
    const row = await db.campaign.findFirst({
      where: { status: "Live" },
      orderBy: { launchDate: "desc" },
    });
    if (row) return row as Campaign;
    // Fall back to any campaign if none are Live
    const fallback = await db.campaign.findFirst({ orderBy: { launchDate: "desc" } });
    return fallback as Campaign | null;
  } catch {
    return mockCampaigns[0] ?? null;
  }
}

export type ReviewRow = {
  id: string;
  name: string;
  rating: number;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
};

export async function getReviewsForProduct(productSlug: string): Promise<ReviewRow[]> {
  try {
    const rows = await db.review.findMany({
      where: { productSlug },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      rating: r.rating,
      body: r.body,
      date: r.createdAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      verified: r.verified,
      helpful: r.helpful,
    }));
  } catch {
    return [];
  }
}
