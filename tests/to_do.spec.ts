import { describe, it, before, after } from 'mocha';
import { strict as assert } from 'assert';
import { createDriver, quitDriver } from '../fixtures/driverSetup';

let driver: any;

describe('Splendo App Launch Test', function () {
    this.timeout(60000); // 60 seconds timeout

    before(async () => {
        driver = await createDriver();
    });

    after(async () => {
        await quitDriver(driver);
    });

    it('should open the app and show the main screen', async () => {
        console.log("Whats up??Bitochh...");
    });
});
