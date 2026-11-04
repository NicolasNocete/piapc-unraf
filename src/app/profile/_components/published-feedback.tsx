import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatArgentinaDateTime } from "@/lib/date-time";

type Props = {
  feedback: {
    access_unavailable: boolean;
    body: string;
    grade: number | null;
    published_at: string;
    revision_number: number;
  };
};

export function PublishedFeedback({ feedback }: Props) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle><h3>Última devolución publicada</h3></CardTitle>
        <CardDescription>
          Revisión {feedback.revision_number} · {formatArgentinaDateTime(feedback.published_at)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex min-w-0 flex-col gap-4">
        <p className="text-sm">
          {feedback.access_unavailable ? "Sin nota: material inaccesible" : `Nota privada docente: ${feedback.grade}`}
        </p>
        <p className="whitespace-pre-wrap break-words text-sm leading-6 [overflow-wrap:anywhere]">{feedback.body}</p>
      </CardContent>
    </Card>
  );
}
