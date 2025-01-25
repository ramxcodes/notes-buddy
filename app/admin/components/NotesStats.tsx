import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, Hourglass, XCircle } from "lucide-react";

interface Stats {
  totalNotesRequests: number;
  completedNotesRequests: number;
  rejectedNotesRequests: number;
  pendingNotesRequests: number;
}

export function NotesStats({ stats }: { stats: Stats }) {
  const cards = [
    {
      title: "Total Requests",
      value: stats.totalNotesRequests,
      icon: FileText,
    },
    {
      title: "Completed Requests",
      value: stats.completedNotesRequests,
      icon: CheckCircle,
    },
    {
      title: "Pending Requests",
      value: stats.pendingNotesRequests,
      icon: Hourglass,
    },
    {
      title: "Rejected Requests",
      value: stats.rejectedNotesRequests,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-col items-center">
            <card.icon className="w-8 h-8 mb-2" />
            <CardContent className="text-4xl font-bold">
              {card.value || 0}
            </CardContent>
            <CardTitle className="text-sm text-center">{card.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
