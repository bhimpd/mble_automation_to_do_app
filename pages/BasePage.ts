import { ElementArray } from 'webdriverio';

export class BasePage {
    protected driver: any;

    constructor(driver: any) {
        this.driver = driver;
    }

    /**
     * Generic method to read visible dropdown/menu texts
     */
    async getDropdownTexts(firstVisibleText: string): Promise<string[]> {
        const firstItem = await this.driver.$(
            `//android.widget.TextView[@text="${firstVisibleText}"]`
        );

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
    async assertDropdown(
        firstVisibleText: string,
        expectedItems: string[]
    ): Promise<void> {
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
                throw new Error(
                    `Mismatch at index ${i}.
Expected: "${expectedItems[i]}"
Actual  : "${actualItems[i]}"`
                );
            }
        }

        console.log('✅ All dropdown items match!');
    }
}
