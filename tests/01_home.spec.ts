import { describe, it, beforeEach, afterEach } from 'mocha';
import { createDriver, quitDriver } from '../fixtures/driverSetup';
import { HomePage } from '../pages/HomePage';
import { captureScreenshot } from '../utils/screenshot';
import { generateListName } from '../utils/fakerUtils';

let driver: any;
let homePage: HomePage;

describe('Home Page Module', function () {
    this.timeout(60000);
    // this.retries(1);

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
        await homePage.assertNothingToDoText('Nothing to dos');
        await homePage.assertQuickTaskPlaceholder('Enter Quick Task Here');
    });

    it('should assert all lists in dropdown', async () => {
        await homePage.clickAllListsMenu();
        const expectedItems = ['All Lists', 'Default', 'Personal', 'Shopping', 'Wishlist', 'Work', 'Finished', 'New List'];
        await homePage.assertAllListDropdown(expectedItems);
    });

    it('should open more options menu', async () => {
        await homePage.clickMoreOptionMenu();
        const expectedItems = ['Task Lists', 'Add in Batch Mode', 'Remove Ads', 'Send feedback', 'Follow us', 'Invite friends to the app', 'Settings'];
        await homePage.assertMoreOptionItems(expectedItems);
    });

    it('should add new task  list and assert new task list at homePage Task Lists DropDown and inside the 3 dots Task Lists as well', async () => {
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
        await homePage.clickMoreOptionMenu();
        await homePage.clickTaskLists();
        await homePage.assertNewlyCreatedTask(listName);

    });

    it('should create the new task list from the 3dots menu, assert newly created task list  there and at HomePage Task Lists', async () => {
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
        await homePage.assertNewlyCreatedTask(listName);
        await homePage.clickBackButton();
        await homePage.clickAllListsMenu();
        await homePage.assertTaskNameFromDropdown(listName);
    });

    it('should create new task list from the 3-dots menu, Update the list name and assert the updated list name', async () => {
        await homePage.clickMoreOptionMenu();
        await homePage.clickTaskLists();
        await homePage.clickHamburgerMenu();

        const listName = generateListName();
        await homePage.enterListName(listName);
        await homePage.clickAddButton();
        await homePage.assertNewlyCreatedTask(listName);
        await homePage.clickEditForList(listName);

        await homePage.assertEditListText('Edit List');
        await homePage.assertSaveText('SAVE');
        await homePage.assertCancelText('CANCEL');

        const updatedListName = listName + " updated";
        await homePage.enterEditListInputValue(updatedListName);
        await homePage.clickSaveButton();
        await homePage.assertNewlyCreatedTask(updatedListName);
        await homePage.clickBackButton();
        await homePage.clickAllListsMenu();
        await homePage.assertTaskNameFromDropdown(updatedListName);

    })

    it('should create the new task list from the 3dots menu, assert newly created task list,delete it and assert the list is deleted', async () => {
        await homePage.clickMoreOptionMenu();
        await homePage.clickTaskLists();
        await homePage.clickHamburgerMenu();

        const listName = generateListName();
        await homePage.enterListName(listName);
        await homePage.clickAddButton();
        await homePage.assertNewlyCreatedTask(listName);
        await homePage.clickBackButton();
        await homePage.clickAllListsMenu();
        await homePage.assertTaskNameFromDropdown(listName);

    });

});
