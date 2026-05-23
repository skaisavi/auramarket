import { PrismaClient } from "@prisma/client";
import { auditIssues, banners, campaigns, products } from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.newsletterSignup.deleteMany();
  await prisma.product.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.auditIssue.deleteMany();

  await prisma.product.createMany({
    data: products.map((product) => ({
      slug: product.slug,
      name: product.name,
      category: product.category,
      collection: product.collection,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      market: product.market,
      badge: product.badge,
      tone: product.tone,
      description: product.description,
      ritual: product.ritual,
      ingredients: product.ingredients,
      image: product.image,
      status: product.status,
      seoCompleteness: product.seoCompleteness,
      imageAlt: product.imageAlt,
      sku: product.sku,
      updatedAt: product.updatedAt
    }))
  });

  await prisma.campaign.createMany({
    data: campaigns.map((campaign) => ({
      slug: campaign.slug,
      title: campaign.title,
      status: campaign.status,
      market: campaign.market,
      readiness: campaign.readiness,
      launchDate: campaign.launchDate,
      heroCopy: campaign.heroCopy,
      focusProducts: campaign.focusProducts,
      missingRequirements: campaign.missingRequirements
    }))
  });

  await prisma.banner.createMany({
    data: banners.map((banner) => ({
      id: banner.id,
      placement: banner.placement,
      message: banner.message,
      status: banner.status,
      market: banner.market,
      startsAt: banner.startsAt,
      endsAt: banner.endsAt,
      destination: banner.destination,
      imageAlt: banner.imageAlt,
      visual: banner.visual
    }))
  });

  await prisma.auditIssue.createMany({
    data: auditIssues.map((auditIssue) => ({
      id: auditIssue.id,
      area: auditIssue.area,
      issue: auditIssue.issue,
      priority: auditIssue.priority,
      status: auditIssue.status,
      owner: auditIssue.owner,
      due: auditIssue.due
    }))
  });

  // Seed a few reviews across different products
  const seedReviews = [
    {
      productSlug: products[0].slug,
      name: "Maya R.",
      rating: 5,
      body: "This has become an essential part of my evening routine. The texture and scent feel considered, and the results are genuinely noticeable after two weeks.",
      verified: true,
      helpful: 14,
    },
    {
      productSlug: products[0].slug,
      name: "Noah L.",
      rating: 5,
      body: "Beautifully presented and easy to work into a daily ritual. I appreciated the clear usage notes and ingredient detail on the product page.",
      verified: true,
      helpful: 9,
    },
    {
      productSlug: products[0].slug,
      name: "Chloe M.",
      rating: 4,
      body: "Really lovely product. Scent is subtle and lasting without being overpowering. Would have given five stars but shipping took a little longer than expected.",
      verified: true,
      helpful: 5,
    },
    {
      productSlug: products[1]?.slug ?? products[0].slug,
      name: "Lena K.",
      rating: 5,
      body: "Perfect addition to my morning skin routine. Lightweight and absorbs quickly — I've already ordered a second one.",
      verified: true,
      helpful: 11,
    },
    {
      productSlug: products[2]?.slug ?? products[0].slug,
      name: "James W.",
      rating: 4,
      body: "Great for the desk. The diffuser runs quietly and the scent isn't overpowering — exactly what I needed for focused work.",
      verified: true,
      helpful: 7,
    },
  ];

  for (const review of seedReviews) {
    await prisma.review.create({ data: review });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
