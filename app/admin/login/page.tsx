import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Leaf, LockKeyhole } from "lucide-react";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function authenticate(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirectTo: "/admin"
      });
    } catch (authError) {
      if (authError instanceof AuthError) {
        redirect("/admin/login?error=CredentialsSignin");
      }

      throw authError;
    }
  }

  return (
    <section className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white/78 p-8 shadow-inset">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white">
            <Leaf className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">AuraMarket</p>
            <p className="text-xs text-muted">Admin access</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Protected dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Sign in to continue</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Use the portfolio admin credentials to review product, campaign, content, and QA workflows.
          </p>
        </div>

        <form action={authenticate} className="mt-7 space-y-5">
          <label className="block text-sm font-semibold">
            Username
            <input
              name="username"
              autoComplete="username"
              className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
              required
            />
          </label>
          <label className="block text-sm font-semibold">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm"
              required
            />
          </label>
          {error ? (
            <p className="rounded-xl border border-clay-200 bg-clay-50 px-4 py-3 text-sm font-semibold text-clay-700" role="alert">
              Those credentials do not match the portfolio admin account.
            </p>
          ) : null}
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="mt-6 rounded-xl border border-line bg-surface/70 px-4 py-3 text-xs leading-5 text-muted">
          Demo credentials: <span className="font-semibold text-ink">admin</span> / <span className="font-semibold text-ink">auramarket2026</span>
        </div>
      </div>
    </section>
  );
}
