import { ChainablePromiseElement, ElementArray } from 'webdriverio';
import { Helper } from '../utils/helper';

export class HomePage {
    private helper: Helper;
    private driver: any;

    constructor(driver: any) {
        this.driver = driver;
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

    // async clickAddTask() {
    //     await this.helper.click(this.addTaskButton);
    // }

    async clickAllListsMenu() {
        await this.helper.click(this.allListsTextSelector);
    }

    // Get all dropdown items
    async getAllListItems(): Promise<string[]> {
        // Wait for at least one dropdown item to appear
        const firstItem = await this.driver.$('//android.widget.TextView[@text="All Lists"]');
        await firstItem.waitForDisplayed({ timeout: 5000 });

        // Get all dropdown items (narrow the XPath if possible)
        const items: ElementArray = await this.driver.$$('//android.widget.TextView');
        const texts: string[] = [];

        for (const item of items) {
            const text = await item.getText();
            texts.push(text.trim());
        }

        return texts;
    }

    // Assert dropdown items
    async assertAllListDropdown(expectedItems: string[]) {
        this.driver.pause(5000);
        console.log("Expected Texts :: ", expectedItems);

        const actualItems = await this.getAllListItems();
        console.log("Actual Texts  :: ", actualItems);

        if (actualItems.length !== expectedItems.length) {
            throw new Error(`Dropdown length mismatch.... Expected ${expectedItems.length}, Actual ${actualItems.length}`);
        }

        for (let i = 0; i < expectedItems.length; i++) {
            if (actualItems[i] !== expectedItems[i]) {
                throw new Error(`Damn..Dropdown item mismatch at index ${i}. Expected: "${expectedItems[i]}", Actual: "${actualItems[i]}"`);
            }
        }
        console.log("All dropdown items match!");
    }


    async clickMoreOptionMenu() {
        await this.helper.click(this.moreOptionMenuSelector);
    }
}