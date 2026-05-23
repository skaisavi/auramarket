import { Bell, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { adminNotifications } from "@/lib/mock-data";

export default function AdminNotificationsPage() {
  const unread = adminNotifications.filter((notification) => !notification.read).length;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-line bg-white/72 p-5 shadow-inset">
        <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
          <Bell className="h-4 w-4" aria-hidden="true" />
          {unread} unread
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Notifications center</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Centralised alerts for audit issues, translations, campaign blockers, stock warnings, and system checks.
        </p>
      </div>
      <Card>
        <div className="divide-y divide-line rounded-2xl border border-line bg-white/70">
          {adminNotifications.map((notification) => (
            <article key={notification.id} className="grid gap-4 p-4 md:grid-cols-[auto_1fr_8rem] md:items-start">
              <Circle className={notification.read ? "mt-1 h-3 w-3 text-muted" : "mt-1 h-3 w-3 fill-sage-500 text-sage-500"} aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase text-sage-700">{notification.type} · {notification.priority}</p>
                <h2 className="mt-1 font-semibold">{notification.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{notification.body}</p>
              </div>
              <p className="text-sm text-muted md:text-right">{notification.time}</p>
            </article>
          ))}
        </div>
      </Card>
    </section>
  );
}
