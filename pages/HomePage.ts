import { ChainablePromiseElement } from 'webdriverio';
import { Helper } from '../utils/helper';

export class HomePage {
    private helper: Helper;
    private driver: any;

    constructor(driver: any) {
        this.driver = driver;
        this.helper = new Helper();
    }

    /* ---------------- LOCATORS ---------------- */

    get allListsText(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@text="All Lists"]');
    }

    get nothingToDoText(): ChainablePromiseElement {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/tvEmpty"]');
    }

    get quickTaskInput(): ChainablePromiseElement {
        return this.driver.$('//android.widget.EditText[@resource-id="com.splendapps.splendo:id/etQuickTask"]');
    }

    get addTaskButton(): ChainablePromiseElement {
        return this.driver.$('//com.google.android.material.floatingactionbutton.FloatingActionButton[@content-desc="Add Task"]');
    }

    /* ---------------- ACTIONS / ASSERTIONS ---------------- */

    async assertAllListsText(expectedText: string) {
        await this.helper.assertText(this.allListsText, expectedText);
    }

    async assertNothingToDoText(expectedText: string) {
        await this.helper.assertText(this.nothingToDoText, expectedText);
    }

    async assertQuickTaskPlaceholder(expectedText: string) {
        await this.helper.assertText(this.quickTaskInput, expectedText);
    }

    async clickAddTask() {
        await this.helper.click(this.addTaskButton);
    }
}
