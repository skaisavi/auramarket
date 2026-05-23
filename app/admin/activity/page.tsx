import { ActivityLogManager } from "@/components/admin/activity-log-manager";
import { activityLogs } from "@/lib/mock-data";

export default function AdminActivityPage() {
  return (
    <section>
      <ActivityLogManager logs={activityLogs} />
    </section>
  );
}
