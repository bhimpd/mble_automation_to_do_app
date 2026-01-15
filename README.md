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


**Why do we need package.json??**

Node projects cannot work without package.json.

**This file controls:**
❓ What is this project?
❓ How do I run it?
❓ What libraries does it need?
❓ How should Node treat modules?

**Without this file:**
No dependency management
No scripts
No reproducible automation setup
