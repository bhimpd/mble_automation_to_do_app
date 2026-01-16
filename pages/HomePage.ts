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

    // async clickAddTask() {
    //     await this.helper.click(this.addTaskButton);
    // }

}