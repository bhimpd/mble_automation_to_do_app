import { Helper } from '../utils/helper';

export class HomePage {
    private helper: Helper;
    private driver: any;

    constructor(driver: any) {
        this.helper = new Helper();
        this.driver = driver;

    }

    get allListsText() {
        return this.driver.$('//android.widget.TextView[@text="All Lists"]');
    }

    get emptyListText() {
        return this.driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/tvEmpty"]');
    }

    get quickTaskInput() {
        return this.driver.$('//android.widget.EditText[@resource-id="com.splendapps.splendo:id/etQuickTask"]');
    }

    get addTaskButton() {
        return this.driver.$(
            '//com.google.android.material.floatingactionbutton.FloatingActionButton[@content-desc="Add Task"]'
        );
    }

    async assertAllListsText(expected: string) {
        await this.helper.assertText(this.allListsText, expected);
    }

    async assertEmptyListText(expected: string) {
        await this.helper.assertText(this.emptyListText, expected);
    }

    async assertQuickTaskPlaceholder(expected: string) {
        await this.helper.assertText(this.quickTaskInput, expected);
    }

    async clickAddTask() {
        await this.helper.click(this.addTaskButton);
    }
}
