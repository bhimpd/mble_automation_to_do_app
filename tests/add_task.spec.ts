import { describe, it, beforeEach, afterEach } from "mocha";
import { createDriver, quitDriver } from "../fixtures/driverSetup";
import { HomePage } from "../pages/HomePage";
import { AddTaskPage } from "../pages/AddTaskPage";

let driver: any;
let homePage: HomePage;
let addTaskPage: AddTaskPage;

describe('Add Task Module', function () {
    this.timeout(60000);

    beforeEach(async () => {
        driver = await createDriver();
        await driver.terminateApp('com.splendapps.splendo');
        await driver.activateApp('com.splendapps.splendo');
        homePage = new HomePage(driver);
        addTaskPage = new AddTaskPage(driver);

    });

    afterEach(async () => {
        await quitDriver(driver);
    });

    it('should assert all the text in the add new task page', async () => {
        await homePage.clickAddTask();
        await addTaskPage.assertNewTaskName("New Task");
        await addTaskPage.assertToBeDoneText("What is to be done?");
        await addTaskPage.assertEnterTaskHereText("Enter Task Here");
        await addTaskPage.assertDueDateText("Due date");
        await addTaskPage.assertDateNotSetText("Date not set");
        await addTaskPage.assertNotificationText("Notifications");
        await addTaskPage.assertNoNotificationText("No notifications if date not set.");
        await addTaskPage.assertAddToListText("Add to List");
        await addTaskPage.assertDefaultText("Default");
    });

    it.only('should show validation message when adding a task without a name', async () => {
        await homePage.clickAddTask();
        await addTaskPage.clickSaveTaskButton();
        await addTaskPage.assertValidationMessage("Enter task at first");
    });
});