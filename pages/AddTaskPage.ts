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


}