import { describe, it, beforeEach, afterEach } from "mocha";
import { createDriver, quitDriver } from "../fixtures/driverSetup";
import { HomePage } from "../pages/HomePage";
import { AddTaskPage } from "../pages/AddTaskPage";

import { captureScreenshot } from '../utils/screenshot';
import { generateTaskName } from '../utils/fakerUtils';



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

    afterEach(async function () {
        // ✅ TAKE SCREENSHOT ONLY IF TEST FAILED
        if (this.currentTest?.state === 'failed') {
            await captureScreenshot(driver, this.currentTest.title);
        }
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

    it('should show validation message when adding a task without a name', async () => {
        await homePage.clickAddTask();
        await addTaskPage.clickSaveTaskButton();
        await addTaskPage.assertValidationMessage("Enter task at first");
    });

    it.only('should add the new task with all the data and assert the created task', async () => {
        await homePage.clickAddTask();

        const taskName = generateTaskName();
        await addTaskPage.enterNewTaskName(taskName);

        await addTaskPage.clickDueDate();

        const today = new Date().getDate(); // gets 1-31
        await addTaskPage.selectTodayDate(today);
        await addTaskPage.clickOkButton();
        await addTaskPage.assertTodaysDate("Today");

        await addTaskPage.assertTimeNotSetText("Time not set (all day)");
        await addTaskPage.clickTimeNotSet();
        await addTaskPage.clickHourSelector();
        await addTaskPage.clickMinuteSelector();
        await addTaskPage.clickOkButton();

        await addTaskPage.assertDaySummaryText("Day summary on the same day at 8:00 AM.");
        await addTaskPage.assertIndividualNotificationText("Individual notification on time.");
        await addTaskPage.clickSaveTaskButton();
        await addTaskPage.clickSearchIcon();
        await addTaskPage.enterSearchText(taskName);
        await addTaskPage.assertSearchResult(taskName);

    });


});