import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/admin/command-palette";

export function AdminHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-line bg-white/54 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold text-sage-700">Saturday operations</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Website administration overview</h1>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <CommandPalette />
        <Button href="/admin/permissions" variant="secondary">
          <Settings className="h-4 w-4" aria-hidden="true" />
          Settings
        </Button>
      </div>
    </header>
  );
}
