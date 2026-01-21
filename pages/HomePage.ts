import { ChainablePromiseElement, ElementArray } from 'webdriverio';
import { Helper } from '../utils/helper';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {
    private helper: Helper;

    constructor(driver: any) {
        super(driver);
        this.helper = new Helper();
    }

    /* ---------------- LOCATORS ---------------- */

    get allListsTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@text="All Lists"]');
    }

    get nothingToDoTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/tvEmpty"]');
    }

    get quickTaskInputSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.EditText[@resource-id="com.splendapps.splendo:id/etQuickTask"]');
    }

    get addTaskButtonSelector(): ChainablePromiseElement {
        return this.driver.$('//com.google.android.material.floatingactionbutton.FloatingActionButton[@content-desc="Add Task"]');
    }
    get allListsMenuSelector(): ChainablePromiseElement {
        return this.driver.$('android.widget.TextView');
    }

    get moreOptionMenuSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.ImageView[@content-desc="More options"]');
    }

    get newListTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/navLineName" and @text="New List"]');
    }

    get newListTextTitleSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/alertTitle"]');
    }

    get enterListNameSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.EditText[@text="Enter List Name"]');
    }

    get addButtonSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
    }

    get cancelButtonSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.Button[@resource-id="android:id/button2"]');
    }

    get taskListsTitleSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/title" and @text="Task Lists"]');
    }

    get hamburgerMenuSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.Button[@content-desc="New List"]');
    }

    get backButtonSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.ImageButton[@content-desc="Navigate up"]');
    }

    get editListTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/alertTitle"]');
    }

    get saveTextSelector(): ChainablePromiseElement {
        return this.driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
    }


    /* ---------------- ACTIONS / ASSERTIONS ---------------- */

    async assertAllListsText(expectedText: string) {
        await this.helper.assertText(this.allListsTextSelector, expectedText);
    }

    async assertNothingToDoText(expectedText: string) {
        await this.helper.assertText(this.nothingToDoTextSelector, expectedText);
    }

    async assertQuickTaskPlaceholder(expectedText: string) {
        await this.helper.assertText(this.quickTaskInputSelector, expectedText);
    }

    async clickAllListsMenu() {
        await this.helper.click(this.allListsTextSelector);
    }

    async clickMoreOptionMenu() {
        await this.helper.click(this.moreOptionMenuSelector);
    }

    async assertAllListDropdown(expectedItems: string[]) {
        await this.assertDropdown('All Lists', expectedItems);
    }

    async assertMoreOptionItems(expectedItems: string[]) {
        await this.assertDropdown('Task Lists', expectedItems);
    }

    async clickAddTask() {
        await this.helper.click(this.addTaskButtonSelector);
    }

    async clickNewListText() {
        await this.helper.click(this.newListTextSelector);
    }

    async assertNewListTextTitle(expectedText: string) {
        await this.helper.assertText(this.newListTextTitleSelector, expectedText);
    }

    async assertEnterListName(expectedText: string) {
        await this.helper.assertText(this.enterListNameSelector, expectedText);
    }


    async assertAddText(expectedText: string) {
        await this.helper.assertText(this.addButtonSelector, expectedText);
    }

    async assertCancelText(expectedText: string) {
        await this.helper.assertText(this.cancelButtonSelector, expectedText);
    }
    async clickAddButton() {
        await this.helper.click(this.addButtonSelector);
    }

    async enterListName(listName: string) {
        await this.helper.type(this.enterListNameSelector, listName);
    }

    async assertListNameAtTop(expectedText: string) {
        const element = await this.driver.$(`//android.widget.TextView[@text="${expectedText}"]`);
        await this.helper.assertText(element, expectedText);
    }


    async clickTaskLists() {
        await this.helper.click(this.taskListsTitleSelector);
    }

    async clickHamburgerMenu() {
        await this.helper.click(this.hamburgerMenuSelector);
    }

    async assertNewlyCreatedTask(expectedTaskName: string) {
        await this.assertTaskList(expectedTaskName);
    }


    async clickBackButton() {
        await this.clickNavigateUpButton(this.backButtonSelector);
    }

    async assertTaskNameFromDropdown(expectedTaskName: string) {
        await this.assertTaskNameAtTop(expectedTaskName);
    }


    async clickEditForList(listName: string) {
        const editIcon = await this.driver.$(
            `//android.widget.TextView[@text="${listName}"]` +
            `/ancestor::android.widget.LinearLayout[@resource-id="com.splendapps.splendo:id/list_item"]` +
            `//android.widget.ImageView[@content-desc="Edit"]`
        );

        await editIcon.waitForDisplayed({ timeout: 10000 });
        await editIcon.click();
    }

    async assertEditListText(expectedText: string) {
        await this.helper.assertText(this.editListTextSelector, expectedText);
    }

    async assertSaveText(expectedText: string) {
        await this.helper.assertText(this.saveTextSelector, expectedText);
    }


}