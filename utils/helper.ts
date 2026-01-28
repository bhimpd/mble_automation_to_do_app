import { ChainablePromiseElement } from 'webdriverio';
import { strict as assert } from 'assert';

export class Helper {

    protected driver: any;

    constructor(driver: any) {
        this.driver = driver;
    }


    async assertText(element: ChainablePromiseElement, expectedText: string) {
        const actualText = await element.getText();
        console.log("Actual Text :: ", actualText);
        console.log("Expected Text :: ", expectedText);

        assert.equal(actualText.trim(), expectedText.trim());
    }

    async click(element: ChainablePromiseElement) {
        console.log("Clicking on element: ", element);
        await element.click();
    }

    async type(element: ChainablePromiseElement, value: string) {
        await element.setValue(value);
    }


    async typeMultilineTasks(
        element: ChainablePromiseElement,
        values: string[]
    ) {
        await element.click(); // focus input

        for (let i = 0; i < values.length; i++) {
            await element.addValue(values[i]);

            // Add newline EXCEPT after last item
            if (i < values.length - 1) {
                await element.addValue('\n');
            }
        }
    }


}
