import { ContentCalendar } from "@/components/admin/content-calendar";
import { contentCalendar } from "@/lib/mock-data";

export default function AdminCalendarPage() {
  return <ContentCalendar items={contentCalendar} />;
}
