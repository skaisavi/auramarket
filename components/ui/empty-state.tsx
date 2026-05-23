import { Inbox } from "lucide-react";
import { Card } from "./card";

export function EmptyState({
  title,
  message
}: {
  title: string;
  message: string;
}) {
  return (
    <Card className="flex min-h-52 flex-col items-center justify-center text-center">
      <Inbox className="mb-4 h-8 w-8 text-sage-500" aria-hidden="true" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{message}</p>
    </Card>
  );
}
