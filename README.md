
📱 Mobile Automation – How It Works (From Scratch)
This document explains how mobile automation runs step by step in this project.
Tech stack used: - TypeScript – test language - Mocha – test runner - WebdriverIO – WebDriver client - Appium – mobile automation server - Android (UiAutomator2) – device automation engine
________________________________________
1️⃣ Big Picture: What Happens When You Run Automation
When you run:
npm run automation
This is the actual flow:
1.	Node.js starts
2.	Mocha starts the test runner
3.	ts-node compiles TypeScript on the fly
4.	Test lifecycle hooks (before, it, after) execute
5.	WebdriverIO connects to Appium
6.	Appium talks to Android device
7.	App launches
8.	Test interacts with the app
9.	Session closes
________________________________________
2️⃣ How the Test Run Starts (package.json)
Script used:
"automation": "mocha -r ts-node/register tests/home.spec.ts"
What this means:
•	mocha → starts the test runner
•	-r ts-node/register → allows running .ts files directly
•	tests/home.spec.ts → entry test file
📌 Without ts-node/register, Node cannot run TypeScript.
________________________________________
3️⃣ Test Lifecycle (Mocha Hooks)
Inside the test file:
before(async () => {
    driver = await createDriver();
});

after(async () => {
    await quitDriver(driver);
});
Why this exists:
•	before → creates Appium session (setup)
•	after → destroys Appium session (cleanup)
📌 Tests must never start without a driver 📌 Sessions must always be closed to avoid failures
________________________________________
4️⃣ Driver Creation (driverSetup.ts)
export async function createDriver() {
    return await remote(appiumConfig);
}
What happens here:
1.	WebdriverIO calls remote()
2.	Sends configuration to Appium server
3.	Appium:
o	Connects to the Android device
o	Starts UiAutomator2
o	Launches the app
4.	A WebDriver session is created
5.	Driver object is returned to the test
📌 This driver is your remote control for the app
________________________________________
5️⃣ Appium Configuration (mobile.config.ts)
export const appiumConfig = {
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    capabilities: { ... }
};
Connection settings:
•	hostname → where Appium is running
•	port → Appium default port
•	path → WebDriver endpoint
________________________________________
Capabilities Explained (VERY IMPORTANT)
platformName: 'Android'
Tells Appium this is an Android session
'appium:deviceName': 'u8g6wcmzuk9x65rs'
Specific Android device (ADB ID)
'appium:automationName': 'UiAutomator2'
Android automation engine (mandatory)
'appium:appPackage'
'appium:appActivity'
Defines which app to launch
'appium:noReset': true
Prevents app reinstall / data wipe
'appium:newCommandTimeout': 300
Prevents session timeout during idle time
'appium:waitForIdleTimeout': 5000
Waits for UI to stabilize before actions
'appium:autoGrantPermissions': true
Automatically accepts runtime permissions
________________________________________
6️⃣ Test Execution (Inside it block)
Example:
const el = await driver.$('//android.widget.TextView[@text="All Lists"]');
const text = await el.getText();
What happens:
1.	WebdriverIO sends XPath to Appium
2.	Appium forwards it to UiAutomator2
3.	Android finds the element
4.	Element reference is returned
5.	Action (getText, click) is performed
📌 Every action travels: Test → WebdriverIO → Appium → Device → App
________________________________________
7️⃣ Test Completion (Session Cleanup)
await driver.deleteSession();
Why this is critical:
•	Releases device
•	Stops Appium session
•	Prevents port locking
•	Avoids flaky test failures
❌ Without cleanup: - Future tests fail - Device becomes busy - Appium crashes
________________________________________
8️⃣ Summary (One-Page Mental Model)
npm run automation
        ↓
Mocha starts
        ↓
TypeScript compiled
        ↓
before() → createDriver()
        ↓
Appium session created
        ↓
App launched on device
        ↓
Tests interact with app
        ↓
after() → deleteSession()
        ↓
Session closed
________________________________________
9️⃣ Key Rule to Remember
If Appium session is not created → tests cannot run If Appium session is not closed → next run will fail



***********Key Reminders***********
Appium Server must be running before you start the tests.

USB Debugging must be enabled on the device u8g6wcmzuk9x65rs.

Target Folder: Always ensure your tsconfig.json points to the correct outDir so you aren't running stale code.




----------------------------------******************----------------------------------
----------------------------------******************----------------------------------
----------------------------------******************----------------------------------


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



Allure Report Setup & Usage (Mobile Automation – Appium + Mocha)

This project uses Allure Reports to generate rich and interactive test execution reports for mobile automation.

📦 Install Allure Dependencies
npm install --save-dev allure-mocha allure-commandline

📜 Package.json Configuration
"scripts": {
  "all": "mocha -r ts-node/register allure-mocha tests/**/*.spec.ts",
  "home": "mocha -r ts-node/register allure-mocha tests/home.spec.ts",
  "add_task": "mocha -r ts-node/register allure-mocha tests/add_task.spec.ts",
  "allure:generate": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report"
}

▶️ Run Tests and Generate Allure Results
npm run all

After execution, an allure-results/ folder will be automatically created.

📈 Generate Allure Report
npm run allure:generate

After execution, an allure-report/ folder will be automatically created.

📊 Open Allure Report
npm run allure:open