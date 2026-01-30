import { ChainablePromiseElement, ElementArray } from "webdriverio";
import { Helper } from '../utils/helper';
import { BasePage } from "./BasePage";


export class AddTaskPage extends BasePage {
    private helper: Helper;
    public driver: any;

    constructor(driver: any) {
        super(driver);
        this.helper = new Helper(driver);
        this.driver = driver;
    }

    /* ---------------- LOCATORS ---------------- */
    get newTaskNameSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@text="New Task"]');
    }

    get toBeDoneSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/head_task_name"]');
    }

    get enterTaskHereSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.EditText[@resource-id="com.splendapps.splendo:id/edtTaskName"]');
    }

    get dueDateTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/head_due"]');
    }

    get dateNotSetSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.EditText[@resource-id="com.splendapps.splendo:id/edtDueD"]');
    }

    get notificationTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/txtNotfInfoTitle"]');
    }

    get noNotificationTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/txtNotfInfoLine0"]');
    }

    get addToListTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/head_list"]');
    }

    get defaultTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@text="Default"]');
    }

    get saveTaskButtonSelector(): ChainablePromiseElement {
        return this.driver.$('//com.google.android.material.floatingactionbutton.FloatingActionButton[@content-desc="Save Task"]');
    }

    get validationMessageSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/snackbar_text"]');
    }


    get okButtonSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
    }

    get timeNotSetTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.EditText[@resource-id="com.splendapps.splendo:id/edtDueT"]');
    }

    get daySummaryTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/txtNotfInfoLine0"]');
    }

    get hourSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.RadialTimePickerView.RadialPickerTouchHelper[@content-desc="12"]');
    }


    get minuteSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.RadialTimePickerView.RadialPickerTouchHelper[@content-desc="0"]');
    }

    get individualNotificationTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/txtNotfInfoLine1"]');
    }

    get searchIconSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.Button[@content-desc="Search"]');
    }


    get searchInputSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.AutoCompleteTextView[@resource-id="com.splendapps.splendo:id/search_src_text"]');
    }

    get searchedTaskSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.RelativeLayout[@resource-id="com.splendapps.splendo:id/task_list_item"]');
    }

    get deleteIconSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.Button[@content-desc="Delete Task"]');
    }


    /* ---------------- ACTIONS / ASSERTIONS ---------------- */

    async assertNewTaskName(expectedText: string) {
        await this.helper.assertText(this.newTaskNameSelector, expectedText);
    }

    async assertToBeDoneText(expectedText: string) {
        await this.helper.assertText(this.toBeDoneSelector, expectedText);
    }

    async assertEnterTaskHereText(expectedText: string) {
        await this.helper.assertText(this.enterTaskHereSelector, expectedText);
    }

    async assertDueDateText(expectedText: string) {
        await this.helper.assertText(this.dueDateTextSelector, expectedText);
    }

    async assertDateNotSetText(expectedText: string) {
        await this.helper.assertText(this.dateNotSetSelector, expectedText);
    }

    async assertNotificationText(expectedText: string) {
        await this.helper.assertText(this.notificationTextSelector, expectedText);
    }

    async assertNoNotificationText(expectedText: string) {
        await this.helper.assertText(this.noNotificationTextSelector, expectedText);
    }

    async assertAddToListText(expectedText: string) {
        await this.helper.assertText(this.addToListTextSelector, expectedText);
    }

    async assertDefaultText(expectedText: string) {
        await this.helper.assertText(this.defaultTextSelector, expectedText);
    }


    async clickSaveTaskButton() {
        await this.saveTaskButtonSelector.click();
    }

    async assertValidationMessage(expectedText: string) {
        await this.helper.assertText(this.validationMessageSelector, expectedText);
    }


    async enterNewTaskName(taskName: string) {
        await this.helper.type(this.enterTaskHereSelector, taskName);
    }

    async clickDueDate() {
        await this.helper.click(this.dateNotSetSelector);
    }

    async selectTodayDate(day: number) {
        // Locate the day cell dynamically using the day number
        const dateSelector = await this.driver.$(
            `android=new UiSelector().text("${day}")`
        );
        await dateSelector.waitForDisplayed({ timeout: 5000 });
        await dateSelector.click();
    }


    async clickOkButton() {
        await this.helper.click(this.okButtonSelector);
    }

    async assertTodaysDate(expectedText: string) {
        await this.helper.assertText(this.dateNotSetSelector, expectedText);
    }

    async assertTimeNotSetText(expectedText: string) {
        await this.helper.assertText(this.timeNotSetTextSelector, expectedText);
    }

    async clickTimeNotSet() {
        await this.helper.click(this.timeNotSetTextSelector);
    }

    async assertDaySummaryText(expectedText: string) {
        await this.helper.assertText(this.daySummaryTextSelector, expectedText);
    }

    async clickHourSelector() {
        await this.helper.click(this.hourSelector);
    }

    async clickMinuteSelector() {
        await this.helper.click(this.minuteSelector);
    }

    async assertIndividualNotificationText(expectedText: string) {
        await this.helper.assertText(this.individualNotificationTextSelector, expectedText);
    }

    async clickSearchIcon() {
        await this.helper.click(this.searchIconSelector);
    }

    async enterSearchText(searchText: string) {
        await this.helper.type(this.searchInputSelector, searchText);
    }


    async assertSearchResult(taskName: string) {
        const task = await this.driver.$(`android=new UiSelector().textContains("${taskName}")`);
        await task.waitForDisplayed({ timeout: 5000 });
        await this.helper.assertText(task, taskName);

    }

    async clickSearchedTask() {
        await this.helper.click(this.searchedTaskSelector);
    }

    async clickDeleteIcon() {
        await this.helper.click(this.deleteIconSelector);
    }


    async clickDeleteButton() {
        await this.helper.click(this.okButtonSelector);
    }

    async clearSearch() {
        await this.searchInputSelector.clearValue();
    }

    async searchAndAssertTasks(tasks: string[]) {
        for (const task of tasks) {
            await this.clearSearch();
            await this.enterSearchText(task);
            await this.assertSearchResult(task);
        }
    }

    async clickDefaultTextListDropDown() {
        await this.helper.click(this.defaultTextSelector);
    }

    async assertAllListDropdown(expectedItems: string[]) {
        await this.assertDropdown('Default', expectedItems);
    }

    async selectRandomTaskList(excludeItems: string[] = []): Promise<string> {
        // Get all visible dropdown texts
        const items = await this.getDropdownTexts('Default');

        // Filter excluded items if any
        const selectableItems = items.filter(
            item => !excludeItems.includes(item)
        );

        if (selectableItems.length === 0) {
            throw new Error('No selectable dropdown items found');
        }

        // Pick random item
        const randomIndex = Math.floor(Math.random() * selectableItems.length);
        const selectedItem = selectableItems[randomIndex];

        // Click the selected item
        const element = await this.driver.$(
            `//android.widget.TextView[@text="${selectedItem}"]`
        );
        await element.click();

        console.log(`✅ Randomly selected task list: ${selectedItem}`);

        return selectedItem;
    }


}