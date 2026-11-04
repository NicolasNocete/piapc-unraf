import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { formatArgentinaDateTime } from "../date-time";

test("muestra la entrega reportada el 3/11 por la noche, no el 4/11", () => {
  assert.equal(
    formatArgentinaDateTime("2026-11-04T00:54:31.262944+00:00"),
    "3/11/2026, 21:54:31 (hora de Argentina)",
  );
});

test("el mismo instante con offset argentino conserva su fecha y hora", () => {
  assert.equal(
    formatArgentinaDateTime("2026-11-03T21:54:31.262944-03:00"),
    formatArgentinaDateTime("2026-11-04T00:54:31.262944Z"),
  );
});

test("medianoche argentina se muestra como 00 y no como 24", () => {
  assert.equal(
    formatArgentinaDateTime("2026-11-04T03:00:00Z"),
    "4/11/2026, 00:00:00 (hora de Argentina)",
  );
});

test("el cambio de anio respeta el dia civil argentino", () => {
  assert.equal(
    formatArgentinaDateTime("2027-01-01T01:30:00Z"),
    "31/12/2026, 22:30:00 (hora de Argentina)",
  );
});

test("no depende de la zona horaria del proceso", () => {
  const modulePath = fileURLToPath(new URL("../date-time.ts", import.meta.url));
  const script = `const { formatArgentinaDateTime } = require(${JSON.stringify(modulePath)}); process.stdout.write(formatArgentinaDateTime("2026-11-04T00:54:31.262944Z"));`;

  for (const timeZone of ["UTC", "Pacific/Auckland", "America/Los_Angeles"]) {
    const output = execFileSync(process.execPath, ["--require", "tsx/cjs", "--eval", script], {
      encoding: "utf8",
      env: { ...process.env, TZ: timeZone },
    });
    assert.equal(output, "3/11/2026, 21:54:31 (hora de Argentina)", timeZone);
  }
});
