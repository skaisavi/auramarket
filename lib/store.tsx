"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import {
  products as mockProducts,
  campaigns as mockCampaigns,
  banners as mockBanners,
  auditIssues as mockAuditIssues,
  launchChecklist as mockChecklist,
  permissionRoles as mockRoles,
  contentTranslations as mockContentTranslations,
  type Product,
  type Campaign,
  type Banner,
  type AuditIssue,
  type LaunchChecklistItem,
  type PermissionRole,
  type ContentTranslation,
} from "./mock-data";

type State = {
  products: Product[];
  campaigns: Campaign[];
  banners: Banner[];
  auditIssues: AuditIssue[];
  launchChecklist: LaunchChecklistItem[];
  permissionRoles: PermissionRole[];
  contentTranslations: ContentTranslation[];
};

export type StoreState = State;

type Action =
  | { type: "UPSERT_PRODUCT"; product: Product; originalSlug?: string }
  | { type: "UPDATE_CAMPAIGN_STATUS"; slug: string; status: Campaign["status"] }
  | { type: "UPDATE_BANNER_STATUS"; id: string; status: Banner["status"] }
  | { type: "UPDATE_AUDIT_ISSUE"; id: string; status: AuditIssue["status"] }
  | { type: "TOGGLE_CHECKLIST_ITEM"; id: string }
  | { type: "TOGGLE_PERMISSION"; role: string; key: keyof PermissionRole["permissions"] }
  | { type: "UPDATE_TRANSLATION_STATUS"; id: string; status: ContentTranslation["status"] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPSERT_PRODUCT": {
      const lookupSlug = action.originalSlug ?? action.product.slug;
      const exists = state.products.some((p) => p.slug === lookupSlug);
      return {
        ...state,
        products: exists
          ? state.products.map((p) => (p.slug === lookupSlug ? action.product : p))
          : [action.product, ...state.products],
      };
    }
    case "UPDATE_CAMPAIGN_STATUS":
      return {
        ...state,
        campaigns: state.campaigns.map((c) =>
          c.slug === action.slug ? { ...c, status: action.status } : c
        ),
      };
    case "UPDATE_BANNER_STATUS":
      return {
        ...state,
        banners: state.banners.map((b) =>
          b.id === action.id ? { ...b, status: action.status } : b
        ),
      };
    case "UPDATE_AUDIT_ISSUE":
      return {
        ...state,
        auditIssues: state.auditIssues.map((issue) =>
          issue.id === action.id ? { ...issue, status: action.status } : issue
        ),
      };
    case "TOGGLE_CHECKLIST_ITEM":
      return {
        ...state,
        launchChecklist: state.launchChecklist.map((item) =>
          item.id === action.id ? { ...item, complete: !item.complete } : item
        ),
      };
    case "TOGGLE_PERMISSION":
      return {
        ...state,
        permissionRoles: state.permissionRoles.map((role) =>
          role.role === action.role
            ? { ...role, permissions: { ...role.permissions, [action.key]: !role.permissions[action.key] } }
            : role
        ),
      };
    case "UPDATE_TRANSLATION_STATUS":
      return {
        ...state,
        contentTranslations: state.contentTranslations.map((ct) =>
          ct.id === action.id ? { ...ct, status: action.status } : ct
        ),
      };
    default:
      return state;
  }
}

const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

const initialState: State = {
  products: mockProducts,
  campaigns: mockCampaigns,
  banners: mockBanners,
  auditIssues: mockAuditIssues,
  launchChecklist: mockChecklist,
  permissionRoles: mockRoles,
  contentTranslations: mockContentTranslations,
};

export function StoreProvider({
  children,
  initialState: providedInitialState = initialState
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const [state, dispatch] = useReducer(reducer, providedInitialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
