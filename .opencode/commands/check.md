---
description: Run the complete project validation gate and diagnose failures.
agent: build
---

Run `npm run check`. Diagnose every failure and apply minimal fixes when they are within this scope:

$ARGUMENTS

Re-run the failed stage after each fix and finish with the status of lint, typecheck, and production build. Do not weaken checks to make them pass.
