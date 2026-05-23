"use client";

import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { type PermissionRole } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const permissionLabels: Array<keyof PermissionRole["permissions"]> = [
  "products",
  "campaigns",
  "banners",
  "translations",
  "audits",
  "settings"
];

export function PermissionsManager() {
  const { state, dispatch } = useStore();
  const { permissionRoles } = state;
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-line bg-white/72 p-5 shadow-inset">
        <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
          <Lock className="h-4 w-4" aria-hidden="true" />
          Role permissions
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Admin access settings</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          A practical permissions model for separating content editing, campaign review, and web administration responsibilities.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {permissionRoles.map((role) => (
          <Card key={role.role}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{role.role}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{role.description}</p>
              </div>
              <span className="shrink-0 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-muted">
                {role.members} users
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {permissionLabels.map((permission) => {
                const allowed = role.permissions[permission];
                return (
                  <button
                    key={permission}
                    type="button"
                    onClick={() => { dispatch({ type: "TOGGLE_PERMISSION", role: role.role, key: permission }); toast(`${role.role}: ${permission} ${role.permissions[permission] ? "revoked" : "granted"}`, "info"); }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition",
                      allowed
                        ? "border-sage-300/60 bg-sage-50 hover:bg-sage-100/60"
                        : "border-line bg-white/72 hover:bg-white"
                    )}
                  >
                    <span className="capitalize">{permission}</span>
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        allowed ? "border-sage-600 bg-sage-600" : "border-line bg-white"
                      )}
                      aria-label={allowed ? "Allowed" : "Not allowed"}
                    />
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
