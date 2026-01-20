import { describe, it, beforeEach, afterEach } from 'mocha';
import { createDriver, quitDriver } from '../fixtures/driverSetup';
import { HomePage } from '../pages/HomePage';
import { captureScreenshot } from '../utils/screenshot';
import { generateListName } from '../utils/fakerUtils';

let driver: any;
let homePage: HomePage;

describe('Home Page Module', function () {
    this.timeout(60000);
    this.retries(1);

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

    it.only('should verify home screen texts', async () => {
        await homePage.assertAllListsText('All Lists');
        await homePage.assertNothingToDoText('Nothing to dos');
        await homePage.assertQuickTaskPlaceholder('Enter Quick Task Here');
    });

    it('should assert all lists in dropdown', async () => {
        await homePage.clickAllListsMenu();
        const expectedItems = ['All Lists', 'Default', 'Personal', 'Shopping', 'Wishlist', 'Work', 'Finished', 'New List'];
        await homePage.assertDropDownAllLists(expectedItems);
        await homePage.clickAllListsMenu();

    });

    it('should open more options menu', async () => {
        await homePage.clickMoreOptionMenu();
        const expectedItems = ['Task Lists', 'Add in Batch Mode', 'Remove Ads', 'Send feedback', 'Follow us', 'Invite friends to the app', 'Settings'];
        await homePage.assertMoreOptionItems(expectedItems);
    });

    it('should add new task  list', async () => {
        await homePage.clickAllListsMenu();
        await homePage.clickNewListText();
        await homePage.assertNewListTextTitle('New List');
        await homePage.assertEnterListName('Enter List Name');
        await homePage.assertAddText('ADD');
        await homePage.assertCancelText('CANCEL');


        const listName = generateListName();
        await homePage.enterListName(listName);
        await homePage.clickAddButton();

        await homePage.assertListNameAtTop(listName);
        const listNameAssertion = "List " + listName + " is empty";
        await homePage.assertNothingToDoText(listNameAssertion);

    });

    it('should create the new task list from the 3dots menu', async () => {
        await homePage.clickMoreOptionMenu();
        await homePage.clickTaskLists();
        await homePage.clickHamburgerMenu();
        await homePage.assertNewListTextTitle('New List');
        await homePage.assertEnterListName('Enter List Name');
        await homePage.assertAddText('ADD');
        await homePage.assertCancelText('CANCEL');


        const listName = generateListName();
        await homePage.enterListName(listName);
        await homePage.clickAddButton();

    })

});
