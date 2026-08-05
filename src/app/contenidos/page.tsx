import { ContentCatalog } from "@/app/contenidos/_components/content-catalog";
import { schedule } from "@/content/generated/academic-content";
import { listContent } from "@/lib/content/server";

export const metadata = { title: "Contenidos | PIAPC" };

export default async function ContentIndexPage() {
  const entries = await listContent();
  const classNumbers = schedule.rows.map((row) => Number(row["N.º de clase"]));

  return (
    <main className="min-h-svh bg-[#f2f0e8] px-5 py-10 text-[#14251d] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <ContentCatalog entries={entries} classNumbers={classNumbers} />
      </div>
    </main>
  );
}
