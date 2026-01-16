import { describe, it, beforeEach, afterEach } from 'mocha';
import { createDriver, quitDriver } from '../fixtures/driverSetup';
import { HomePage } from '../pages/HomePage';

let driver: any;
let homePage: HomePage;

describe('Splendo Home Module', function () {
    this.timeout(60000);

    beforeEach(async () => {
        driver = await createDriver();
        homePage = new HomePage(driver);
    });

    afterEach(async () => {
        await quitDriver(driver);
    });

    it('should verify home screen texts', async () => {
        await homePage.assertAllListsText('All Lists');
        await homePage.assertNothingToDoText('Nothing to do');
        await homePage.assertQuickTaskPlaceholder('Enter Quick Task Here');
    });

    it('should assert all lists in dropdown', async () => {
        await homePage.clickAllListsMenu();

        const expectedItems = ['All Lists', 'Default', 'Personal', 'Shopping', 'Wishlist', 'Work', 'Finished', 'New List'];
        await homePage.assertAllListDropdown(expectedItems);
    });

    // it('should open more options menu', async () => {
    //     await homePage.clickMoreOptionMenu();
    // });

});
