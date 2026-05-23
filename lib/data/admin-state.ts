import { db } from "@/lib/db";
import {
  auditIssues as mockAuditIssues,
  banners as mockBanners,
  campaigns as mockCampaigns,
  contentTranslations as mockContentTranslations,
  launchChecklist as mockChecklist,
  permissionRoles as mockRoles,
  products as mockProducts,
  type AuditIssue,
  type Banner,
  type Campaign,
  type Product
} from "@/lib/mock-data";
import type { StoreState } from "@/lib/store";

export async function getAdminState(): Promise<StoreState> {
  try {
    const [products, campaigns, banners, auditIssues] = await Promise.all([
      db.product.findMany({ orderBy: { updatedAt: "desc" } }),
      db.campaign.findMany({ orderBy: { launchDate: "asc" } }),
      db.banner.findMany({ orderBy: { startsAt: "asc" } }),
      db.auditIssue.findMany({ orderBy: { due: "asc" } })
    ]);

    return {
      products: products.map((product) => product as Product),
      campaigns: campaigns.map((campaign) => campaign as Campaign),
      banners: banners.map((banner) => banner as Banner),
      auditIssues: auditIssues.map((auditIssue) => auditIssue as AuditIssue),
      launchChecklist: mockChecklist,
      permissionRoles: mockRoles,
      contentTranslations: mockContentTranslations
    };
  } catch {
    return {
      products: mockProducts,
      campaigns: mockCampaigns,
      banners: mockBanners,
      auditIssues: mockAuditIssues,
      launchChecklist: mockChecklist,
      permissionRoles: mockRoles,
      contentTranslations: mockContentTranslations
    };
  }
}
