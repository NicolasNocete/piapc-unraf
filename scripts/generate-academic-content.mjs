import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const programPath = resolve(appRoot, "..", "programa", "Programa PIAPC - 2026.md");
const glossaryPath = resolve(appRoot, "..", "contenidos", "glosario.md");
const outputPath = resolve(appRoot, "src", "content", "generated", "academic-content.ts");

function fail(message) {
  throw new Error(`Academic content validation failed: ${message}`);
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function parseFrontmatter(markdown, sourceName) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);

  if (!match) {
    fail(`${sourceName} is missing frontmatter.`);
  }

  const metadata = Object.fromEntries(
    match[1].split(/\r?\n/).map((line) => {
      const separator = line.indexOf(":");

      if (separator === -1) {
        fail(`${sourceName} has invalid frontmatter.`);
      }

      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
  );

  return { body: markdown.slice(match[0].length).trim(), metadata };
}

function extractSection(markdown, heading) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `## ${heading}`);

  if (start === -1) {
    fail(`program is missing the ${heading} section.`);
  }

  const end = lines.findIndex((line, index) => index > start && line.startsWith("## "));

  return lines.slice(start + 1, end === -1 ? undefined : end).join("\n").trim();
}

function parseTable(section) {
  const lines = section.split(/\r?\n/);
  const tableStart = lines.findIndex((line) => line.startsWith("| N.º de clase |"));

  if (tableStart === -1 || !lines[tableStart + 1]?.startsWith("|---")) {
    fail("program schedule table is invalid.");
  }

  const headers = lines[tableStart]
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
  const rows = lines
    .slice(tableStart + 2)
    .filter((line) => line.startsWith("|"))
    .map((line) =>
      Object.fromEntries(
        headers.map((header, index) => [
          header,
          line.split("|").slice(1, -1)[index]?.trim() ?? "",
        ]),
      ),
    );

  if (rows.length !== 14) {
    fail(`program schedule must contain 14 classes, found ${rows.length}.`);
  }

  return { introduction: lines.slice(0, tableStart).join("\n").trim(), headers, rows };
}

function parseGlossary(body) {
  const lines = body.split(/\r?\n/);
  const terms = [];
  let currentTerm;
  let definition = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentTerm) {
        terms.push({ term: currentTerm, definition: definition.join("\n").trim() });
      }

      currentTerm = line.slice(3).trim();
      definition = [];
    } else if (currentTerm) {
      definition.push(line);
    }
  }

  if (currentTerm) {
    terms.push({ term: currentTerm, definition: definition.join("\n").trim() });
  }

  if (terms.length === 0 || terms.some(({ definition }) => !definition)) {
    fail("glossary must have a definition for every term.");
  }

  return terms;
}

const [hasProgramSource, hasGlossarySource] = await Promise.all([
  exists(programPath),
  exists(glossaryPath),
]);

if (hasProgramSource !== hasGlossarySource) {
  fail("both external academic content sources must be available to regenerate the artifact.");
}

if (!hasProgramSource) {
  if (!(await exists(outputPath))) {
    fail("external academic content sources and the committed generated artifact are missing.");
  }

  console.warn("Academic content sources are unavailable; using the committed generated artifact.");
} else {
  const programMarkdown = await readFile(programPath, "utf8");
  const glossaryMarkdown = await readFile(glossaryPath, "utf8");
  const program = parseFrontmatter(programMarkdown, "program");
  const glossary = parseFrontmatter(glossaryMarkdown, "glossary");

  if (program.metadata.anio !== "2026" || program.metadata.estado !== "aprobado") {
    fail("program must be the approved 2026 program.");
  }

  if (
    glossary.metadata.id !== "glosario-general" ||
    glossary.metadata.version !== "2" ||
    glossary.metadata.acceso !== "publico"
  ) {
    fail("glossary metadata must identify version 2 public glossary.");
  }

  const schedule = parseTable(extractSection(program.body, "CRONOGRAMA"));
  const glossaryLines = glossary.body.split(/\r?\n/);
  const glossaryTitle = glossaryLines.findIndex((line) => line.startsWith("# "));
  const firstGlossaryTerm = glossaryLines.findIndex((line) => line.startsWith("## "));

  if (glossaryTitle === -1 || firstGlossaryTerm === -1) {
    fail("glossary is missing its title or terms.");
  }

  const glossaryIntroduction = glossaryLines
    .slice(glossaryTitle + 1, firstGlossaryTerm)
    .join("\n")
    .trim();
  const generated = `// This file is generated by scripts/generate-academic-content.mjs. Do not edit manually.\n\nexport const program = ${JSON.stringify(
    {
      year: program.metadata.anio,
      version: program.metadata.version,
      status: program.metadata.estado,
      title: "Programa PIAPC 2026",
      markdown: program.body,
    },
    null,
    2,
  )} as const;\n\nexport const schedule = ${JSON.stringify(schedule, null, 2)} as const;\n\nexport const glossary = ${JSON.stringify(
    {
      title: glossary.metadata.titulo,
      version: glossary.metadata.version,
      introduction: glossaryIntroduction,
      terms: parseGlossary(glossary.body),
    },
    null,
    2,
  )} as const;\n`;

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, generated);
}
