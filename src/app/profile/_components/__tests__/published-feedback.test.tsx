import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { FeedbackMarkdown } from "@/components/feedback-markdown";
import { PublishedFeedback } from "../published-feedback";

const feedback = {
  access_unavailable: false,
  body: "Bloque personal\n\nBloque compartido",
  grade: 9,
  published_at: "2026-11-04T00:54:31.262944+00:00",
  revision_number: 2,
};

test("muestra la devolucion completa, revision, nota privada y fecha argentina", () => {
  const html = renderToStaticMarkup(<PublishedFeedback feedback={feedback} />);

  assert.match(html, /Última devolución publicada/);
  assert.match(html, /Revisión 2/);
  assert.match(html, /3\/11\/2026, 21:54:31 \(hora de Argentina\)/);
  assert.match(html, /Nota privada docente: 9/);
  assert.match(html, /<p>Bloque personal<\/p>/);
  assert.match(html, /<p>Bloque compartido<\/p>/);
  assert.match(html, /overflow-wrap:anywhere/);
  assert.doesNotMatch(html, /<form|<textarea|<input/);
});

test("no trunca los bloques personal y compartido de una devolucion larga", () => {
  const body = `Inicio personal\n${"Detalle de la corrección.\n".repeat(600)}\nFin compartido`;
  const html = renderToStaticMarkup(<PublishedFeedback feedback={{ ...feedback, body }} />);

  assert.ok(body.length > 10000);
  assert.equal((html.match(/Detalle de la corrección\./g) ?? []).length, 600);
  assert.match(html, /Inicio personal/);
  assert.match(html, /Fin compartido/);
});

test("muestra material inaccesible sin nota numerica", () => {
  const html = renderToStaticMarkup(<PublishedFeedback feedback={{ ...feedback, access_unavailable: true, grade: null }} />);

  assert.match(html, /Sin nota: material inaccesible/);
  assert.doesNotMatch(html, /Nota privada docente:|null/);
  assert.match(html, /Bloque personal/);
  assert.match(html, /Bloque compartido/);
});

test("escapa HTML y conserva el contenido como texto sin ejecutarlo", () => {
  const body = '<script>alert("no")</script><img src=x onerror=alert(1)>';
  const html = renderToStaticMarkup(<PublishedFeedback feedback={{ ...feedback, body }} />);

  assert.doesNotMatch(html, /<script|<img/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&lt;img/);
});

test("renderiza titulos, enfasis, listas, citas, tablas GFM y codigo", () => {
  const body = "# Título\n\n## Sección\n\nTexto **importante** con `BFS`.\n\n- Acción\n\n1. Comprobar\n\n> Prompt sugerido\n\n| Aspecto | Resultado |\n| --- | --- |\n| FSM | Integrada |\n\n```js\nconst seguro = true;\n```";
  const html = renderToStaticMarkup(<PublishedFeedback feedback={{ ...feedback, body }} />);

  assert.match(html, /<h1>Título<\/h1>/);
  assert.match(html, /<h2>Sección<\/h2>/);
  assert.match(html, /<strong>importante<\/strong>/);
  assert.match(html, /<code>BFS<\/code>/);
  assert.match(html, /<ul>/);
  assert.match(html, /<ol>/);
  assert.match(html, /<blockquote>/);
  assert.match(html, /<table>/);
  assert.match(html, /<th>Aspecto<\/th>/);
  assert.match(html, /<td>Integrada<\/td>/);
  assert.match(html, /role="region" aria-label="Tabla de la devolución" tabindex="0"/);
  assert.match(html, /overflow-x-auto/);
  assert.match(html, /<pre tabindex="0" aria-label="Código de la devolución"><code class="language-js">/);
});

test("abre enlaces web protegidos y permite mailto sin aceptar destinos inseguros", () => {
  const body = "[Repositorio](https://example.com/repo)\n\n[Correo](mailto:docente@example.com)\n\n[No ejecutar](javascript:alert%281%29)\n\n[No navegar](/ruta-inventada)";
  const html = renderToStaticMarkup(<FeedbackMarkdown>{body}</FeedbackMarkdown>);

  assert.match(html, /href="https:\/\/example.com\/repo" target="_blank" rel="noreferrer noopener"/);
  assert.match(html, /href="mailto:docente@example.com"/);
  assert.match(html, /<span>No ejecutar<\/span>/);
  assert.match(html, /<span>No navegar<\/span>/);
  assert.doesNotMatch(html, /href="javascript:|href="\/ruta-inventada"/);
});

test("no carga imagenes externas y conserva su descripcion", () => {
  const html = renderToStaticMarkup(<FeedbackMarkdown>{"![Diagrama del NPC](https://example.com/tracker.png)"}</FeedbackMarkdown>);

  assert.match(html, /\[Imagen: Diagrama del NPC\]/);
  assert.doesNotMatch(html, /<img|<link|tracker\.png/);
});

test("el visualizador compartido de texto no introduce metadatos docentes", () => {
  const html = renderToStaticMarkup(<FeedbackMarkdown>{"Primera línea\nSegunda línea\n\nÚltimo párrafo"}</FeedbackMarkdown>);

  assert.match(html, /<p>Primera línea\nSegunda línea<\/p>/);
  assert.match(html, /<p>Último párrafo<\/p>/);
  assert.doesNotMatch(html, /Nota privada docente|material inaccesible|<form|<textarea/);
});
