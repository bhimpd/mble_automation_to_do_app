import { describe, it, beforeEach, afterEach } from "mocha";
import { createDriver, quitDriver } from "../fixtures/driverSetup";
import { HomePage } from "../pages/HomePage";
import { AddTaskPage } from "../pages/AddTaskPage";

import { captureScreenshot } from '../utils/screenshot';
import { generateTaskName } from '../utils/fakerUtils';
import { devices } from '../devices';



let driver: any;
let homePage: HomePage;
let addTaskPage: AddTaskPage;


devices.forEach(device => {


    describe(`Add Task Module - ${device.name}`, function () {
        this.timeout(60000);
        // this.retries(1);

        beforeEach(async () => {
            driver = await createDriver(device);
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

        it('@sanity should display all required fields on the Add New Task screen', async () => {
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


        it('@sanity should show a validation error when saving a task without a name', async () => {
            await homePage.clickAddTask();
            await addTaskPage.clickSaveTaskButton();
            await addTaskPage.assertValidationMessage("Enter task at first");
        });

        it('@smoke should create a new task with due date and notification successfully', async () => {
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

            await addTaskPage.assertDaySummaryText("Day summary on the same day at 8:00 am.");
            await addTaskPage.assertIndividualNotificationText("Individual notification on time.");
            await addTaskPage.clickSaveTaskButton();
            await addTaskPage.clickSearchIcon();
            await addTaskPage.enterSearchText(taskName);
            await addTaskPage.assertSearchResult(taskName);

        });

        it('@regressionshould create a new task with due date and notification successfully ,Delete it and assert deleted successfully...', async () => {
            await homePage.clickAddTask();

            const taskName = generateTaskName();
            await addTaskPage.enterNewTaskName(taskName);

            await addTaskPage.clickDueDate();

            const today = new Date().getDate(); // gets 1-31
            await addTaskPage.selectTodayDate(today);
            await addTaskPage.clickOkButton();

            await addTaskPage.clickTimeNotSet();
            await addTaskPage.clickHourSelector();
            await addTaskPage.clickMinuteSelector();
            await addTaskPage.clickOkButton();

            await addTaskPage.clickSaveTaskButton();
            await addTaskPage.clickSearchIcon();
            await addTaskPage.enterSearchText(taskName);
            await addTaskPage.assertSearchResult(taskName);
            await addTaskPage.clickSearchedTask();
            await addTaskPage.clickDeleteIcon();
            await addTaskPage.clickDeleteButton();

            const listNameAssertion = taskName + " not found";
            console.log("Delete Task Name: " + listNameAssertion);
            await homePage.assertNothingToDoText(listNameAssertion);
        });

        it('@regression should create a new task with due date and notification and dynamic task list', async () => {
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
            await addTaskPage.clickDefaultTextListDropDown();

            const expectedItems = ['Default', 'Personal', 'Shopping', 'Wishlist', 'Work'];
            await addTaskPage.assertAllListDropdown(expectedItems);

            const selectedList = await addTaskPage.selectRandomTaskList(['Default']);
            console.log("FUCking selected Task List ::: ", selectedList);

            await addTaskPage.clickSaveTaskButton();
            await addTaskPage.clickSearchIcon();

            await addTaskPage.enterSearchText(taskName);
            await addTaskPage.assertSearchResult(taskName);
            await addTaskPage.clickSearchedTask();
            await addTaskPage.assertDynamicTaskList(selectedList);


        });

    });

});