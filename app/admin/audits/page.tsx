import { AuditSummary } from "@/components/admin/audit-summary";
import { AuditIssueManager } from "@/components/admin/audit-issue-manager";
import { audits } from "@/lib/mock-data";

export default function AdminAuditsPage() {
  return (
    <section className="space-y-6">
      <AuditSummary audits={audits} />
      <AuditIssueManager />
    </section>
  );
}
