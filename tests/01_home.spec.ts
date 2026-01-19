import { describe, it, beforeEach, afterEach } from 'mocha';
import { createDriver, quitDriver } from '../fixtures/driverSetup';
import { HomePage } from '../pages/HomePage';
import { captureScreenshot } from '../utils/screenshot';
import { generateListName } from '../utils/fakerUtils';

let driver: any;
let homePage: HomePage;

describe('Home Page Module', function () {
    this.timeout(60000);

    beforeEach(async () => {
        driver = await createDriver();
        await driver.terminateApp('com.splendapps.splendo');
        await driver.activateApp('com.splendapps.splendo');
        homePage = new HomePage(driver);
    });

    afterEach(async function () {
        // ✅ TAKE SCREENSHOT ONLY IF TEST FAILED
        if (this.currentTest?.state === 'failed') {
            await captureScreenshot(driver, this.currentTest.title);
        }

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
        await homePage.clickAllListsMenu();

    });

    it('should open more options menu', async () => {
        await homePage.clickMoreOptionMenu();
        const expectedItems = ['Task Lists', 'Add in Batch Mode', 'Remove Ads', 'More Apps', 'Send feedback', 'Follow us', 'Invite friends to the app', 'Settings'];
        await homePage.assertMoreOptionItems(expectedItems);
    });

    it.only('should add new list', async () => {
        await homePage.clickAllListsMenu();
        this.timeout(1000);
        await homePage.clickNewListText();
        await homePage.assertNewListTextTitle('New List');
        await homePage.assertEnterListName('Enter List Name');
        await homePage.assertAddText('ADD');
        await homePage.assertCancelText('CANCEL');


        const listName = generateListName();
        await homePage.enterListName(listName);
        await homePage.clickAddButton();
    });
});
