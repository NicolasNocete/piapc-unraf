const argentinaDateTimeFormatter = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Buenos_Aires",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export function formatArgentinaDateTime(timestamp: string): string {
  return `${argentinaDateTimeFormatter.format(new Date(timestamp))} (hora de Argentina)`;
}
