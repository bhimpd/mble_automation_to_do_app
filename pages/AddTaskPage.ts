import { ChainablePromiseElement, ElementArray } from "webdriverio";
import { Helper } from '../utils/helper';


export class AddTaskPage {
    private helper: Helper;
    private driver: any;

    constructor(driver: any) {
        this.helper = new Helper();
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
}