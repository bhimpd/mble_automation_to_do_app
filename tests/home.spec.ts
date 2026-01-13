import { describe, it, before, after } from 'mocha';
import { createDriver, quitDriver } from '../fixtures/driverSetup';
import { HomePage } from '../pages/HomePage';

let driver: any;
let homePage: HomePage;

describe('Home Module', function () {
    this.timeout(60000);

    before(async () => {
        driver = await createDriver();
        homePage = new HomePage(driver);
    });

    after(async () => {
        await quitDriver(driver);
    });

    it('TC_01: Verify home screen texts and click add task', async () => {
        await homePage.assertAllListsText('All Lists');
        await homePage.assertEmptyListText('Nothing to do');
        await homePage.assertQuickTaskPlaceholder('Enter Quick Task Here');

        await homePage.clickAddTask();
    });
});
