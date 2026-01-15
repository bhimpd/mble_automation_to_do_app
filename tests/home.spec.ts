import { describe, it, before, after } from 'mocha';
import { createDriver, quitDriver } from '../fixtures/driverSetup';
import { HomePage } from '../pages/HomePage';

let driver: any;
let homePage: HomePage;

describe('Splendo Home Module', function () {
    this.timeout(60000);

    before(async () => {
        driver = await createDriver();
        homePage = new HomePage(driver);
    });

    after(async () => {
        await quitDriver(driver);
    });

    it('should verify home screen texts', async () => {
        console.log('Verifying Home Screen');
        await homePage.assertAllListsText('All Lists');
        await homePage.assertNothingToDoText('Nothing to do');
        await homePage.assertQuickTaskPlaceholder('Enter Quick Task Here');
        // await homePage.clickAddTask();
    });

    it('should assert all lists in dropdown', async () => {
        await homePage.clickAllListsMenu();

        const expectedItems = ['All Lists', 'Default', 'Personal', 'Shopping', 'Wishlist', 'Work', 'Finished', 'New List'];
        await homePage.assertAllListDropdown(expectedItems);
    });

});
