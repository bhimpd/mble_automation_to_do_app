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

    // HomePage.ts
    // ------------------------------
    async assertDropDownAllLists(expectedDefaultLists: string[]) {
        // Wait for dropdown items to be displayed
        const firstItem = await this.driver.$('//android.widget.TextView[@text="All Lists"]');
        await firstItem.waitForDisplayed({ timeout: 5000 });

        // Get all items in the dropdown
        const items: ElementArray = await this.driver.$$('//android.widget.TextView');
        const actualItems: string[] = [];

        for (const item of items) {
            const text = await item.getText();
            actualItems.push(text.trim());
        }

        console.log("Expected Default Lists :: ", expectedDefaultLists);
        console.log("Actual Dropdown Items  :: ", actualItems);

        // ✅ Assert that all default lists exist in the dropdown
        expectedDefaultLists.forEach(expected => {
            if (!actualItems.includes(expected)) {
                throw new Error(`Expected default list "${expected}" not found in dropdown`);
            }
        });

        console.log("All default lists are present!");
    }



}