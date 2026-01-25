import { describe, it, beforeEach, afterEach } from 'mocha';
import { createDriver, quitDriver } from '../fixtures/driverSetup';
import { HomePage } from '../pages/HomePage';
import { captureScreenshot } from '../utils/screenshot';
import { generateListName } from '../utils/fakerUtils';
import { generateTaskName } from '../utils/fakerUtils';
import { AddTaskPage } from '../pages/AddTaskPage';


let driver: any;
let homePage: HomePage;
let addTaskPage: AddTaskPage;

describe('Home Page Module', function () {
    this.timeout(60000);
    // this.retries(1);

    beforeEach(async () => {
        driver = await createDriver();
        await driver.terminateApp('com.splendapps.splendo');
        await driver.activateApp('com.splendapps.splendo');
        homePage = new HomePage(driver);
        addTaskPage = new AddTaskPage(driver);
    });

    afterEach(async function () {
        // ✅ TAKE SCREENSHOT ONLY IF TEST FAILED
        if (this.currentTest?.state === 'failed') {
            await captureScreenshot(driver, this.currentTest.title);
        }

        await quitDriver(driver);
    });

    it('should display expected task lists on the home screen', async () => {
        await homePage.assertAllListsText('All Lists');
        await homePage.assertNothingToDoText('Nothing to dos');
        await homePage.assertQuickTaskPlaceholder('Enter Quick Task Here');
    });

    it('should show all task lists in the task list dropdown', async () => {
        await homePage.clickAllListsMenu();
        const expectedItems = ['All Lists', 'Default', 'Personal', 'Shopping', 'Wishlist', 'Work', 'Finished', 'New List'];
        await homePage.assertAllListDropdown(expectedItems);
    });

    it('should display all task lists in the more options menu', async () => {
        await homePage.clickMoreOptionMenu();
        const expectedItems = ['Task Lists', 'Add in Batch Mode', 'Remove Ads', 'Send feedback', 'Follow us', 'Invite friends to the app', 'Settings'];
        await homePage.assertMoreOptionItems(expectedItems);
    });

    it('should create a new task list and display it across the app', async () => {
        await homePage.clickAllListsMenu();
        await homePage.clickNewListText();
        await homePage.assertNewListTextTitle('New List');
        await homePage.assertEnterListName('Enter List Name');
        await homePage.assertAddText('ADD');
        await homePage.assertCancelText('CANCEL');


        const listName = generateListName();
        await homePage.enterListName(listName);
        await homePage.clickAddButton();
        await homePage.assertListAddedText('List Added');

        await homePage.assertListNameAtTop(listName);
        const listNameAssertion = "List " + listName + " is empty";
        await homePage.assertNothingToDoText(listNameAssertion);
        await homePage.clickMoreOptionMenu();
        await homePage.clickTaskLists();
        await homePage.assertNewlyCreatedTask(listName);

    });

    it('should allow creating a task list from the more options menu', async () => {
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

    it('should allow renaming an existing task list', async () => {
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

    it('should delete an existing task list and remove it from the app', async () => {
        await homePage.clickMoreOptionMenu();
        await homePage.clickTaskLists();
        await homePage.clickHamburgerMenu();

        const listName = generateListName();
        await homePage.enterListName(listName);
        await homePage.clickAddButton();
        await homePage.clickDeleteForList(listName);
        await homePage.assertAreYouSureText('Are you sure?');
        await homePage.assertDeleteText('DELETE');
        await homePage.assertDeleteMessage('All tasks from the list will also be deleted.');
        await homePage.clickDeleteButton();
        await homePage.assertListDeletedText('List Deleted');

    });

    it('should create the quick task', async () => {
        await homePage.clickQuickTaskButton();
        const taskName = generateTaskName();
        await homePage.enterQuickTaskName(taskName);
        await homePage.clickQuickTaskSaveButton();
        await addTaskPage.clickSearchIcon();
        await addTaskPage.enterSearchText(taskName);
        await addTaskPage.assertSearchResult(taskName);
    });

});
