import fs from 'fs';
import path from 'path';
import * as allure from 'allure-js-commons';

export async function captureScreenshot(driver: any, testName: string) {
    const dir = path.join(process.cwd(), 'screenshots');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const filePath = path.join(
        dir,
        `${testName.replace(/[^a-zA-Z0-9]/g, '_')}.png`
    );

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(filePath, screenshot, 'base64');

    // ✅ Attach to Allure
    allure.attachment(
        'Failure Screenshot',
        Buffer.from(screenshot, 'base64'),
        'image/png'
    );
}
