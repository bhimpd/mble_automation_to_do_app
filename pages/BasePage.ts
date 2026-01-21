import { ChainablePromiseElement, ElementArray } from "webdriverio";

export class BasePage {
    protected driver: any;

    constructor(driver: any) {
        this.driver = driver;
    }


    /* ---------------- LOCATORS ---------------- */

    async clickNavigateUpButton(element: ChainablePromiseElement) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
        console.log("Clicked Back Button....!!!!")
    }

    /**
     * Generic method to read visible dropdown/menu texts
     */
    async getDropdownTexts(firstVisibleText: string): Promise<string[]> {
        const firstItem = await this.driver.$(`//android.widget.TextView[@text="${firstVisibleText}"]`);

        await firstItem.waitForDisplayed({ timeout: 5000 });

        const items: ElementArray = await this.driver.$$('//android.widget.TextView');
        const texts: string[] = [];

        for (const item of items) {
            const text = (await item.getText()).trim();
            if (text.length > 0) {
                texts.push(text);
            }
        }

        return texts;
    }

    /**
     * Generic assertion for any dropdown / menu
     */
    async assertDropdown(firstVisibleText: string, expectedItems: string[]): Promise<void> {
        console.log('Expected :: ', expectedItems);

        const actualItems = await this.getDropdownTexts(firstVisibleText);
        console.log('Actual   :: ', actualItems);

        if (actualItems.length !== expectedItems.length) {
            throw new Error(
                `Dropdown length mismatch. Expected ${expectedItems.length}, Actual ${actualItems.length}`
            );
        }

        for (let i = 0; i < expectedItems.length; i++) {
            if (actualItems[i] !== expectedItems[i]) {
                throw new Error(`Mismatch at index ${i}.Expected: "${expectedItems[i]}"Actual  : "${actualItems[i]}"`);
            }
        }

        console.log('✅ All dropdown items match!');
    }


    //get the task list
    async getTaskLists() {
        const items: ElementArray = await this.driver.$$('android=new UiSelector().resourceId("com.splendapps.splendo:id/list_name")');
        const texts: string[] = [];

        for (const item of items) {
            const text = (await item.getText()).trim();
            if (text.length > 0) {
                texts.push(text);
            }
        }
        return texts;
    }

    async assertTaskList(expectedTaskName: string) {
        const actualItems = await this.getTaskLists();
        console.log('Actual   :: ', actualItems);

        if (actualItems.includes(expectedTaskName)) {
            console.log('✅ Task list found!');
        } else {
            throw new Error(`Task list "${expectedTaskName}" not found`);
        }
    }

    async assertTaskNameAtTop(expectedTaskName: string) {
        const actualItems = await this.getDropdownTexts('All Lists');
        console.log('Actual List in the DropDown ALL Lists :: ', actualItems);

        if (actualItems.includes(expectedTaskName)) {
            console.log('✅ Task list found at top!');
        } else {
            throw new Error(`Task list "${expectedTaskName}" not found at top`);
        }
    }
}
