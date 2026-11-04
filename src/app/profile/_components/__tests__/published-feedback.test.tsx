import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

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
  assert.ok(html.includes(feedback.body));
  assert.match(html, /whitespace-pre-wrap/);
  assert.match(html, /overflow-wrap:anywhere/);
  assert.doesNotMatch(html, /<form|<textarea|<input/);
});

test("no trunca los bloques personal y compartido de una devolucion larga", () => {
  const body = `Inicio personal\n${"Detalle de la corrección.\n".repeat(600)}\nFin compartido`;
  const html = renderToStaticMarkup(<PublishedFeedback feedback={{ ...feedback, body }} />);

  assert.ok(body.length > 10000);
  assert.ok(html.includes(body));
  assert.match(html, /Inicio personal/);
  assert.match(html, /Fin compartido/);
});

test("muestra material inaccesible sin nota numerica", () => {
  const html = renderToStaticMarkup(<PublishedFeedback feedback={{ ...feedback, access_unavailable: true, grade: null }} />);

  assert.match(html, /Sin nota: material inaccesible/);
  assert.doesNotMatch(html, /Nota privada docente:|null/);
  assert.ok(html.includes(feedback.body));
});

test("escapa HTML y conserva el contenido como texto sin ejecutarlo", () => {
  const body = '<script>alert("no")</script><img src=x onerror=alert(1)>';
  const html = renderToStaticMarkup(<PublishedFeedback feedback={{ ...feedback, body }} />);

  assert.doesNotMatch(html, /<script|<img/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&lt;img/);
});
