**Why do we need tsconfig.json??**
Because:
Node.js does NOT understand TypeScript
Mocha / Playwright / Appium run JavaScript
TypeScript must type-check + compile before execution

**This file controls:**
❓ Which JS version to generate
❓ How modules work
❓ How strict type checking is
❓ What files are included
❓ Where output goes

**Without this file:**
ts-node behaves inconsistently
Type errors are hidden
Imports break randomly
