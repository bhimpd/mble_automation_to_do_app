import { ChainablePromiseElement } from 'webdriverio';
import { strict as assert } from 'assert';

export class Helper {
    async assertText(element: ChainablePromiseElement, expectedText: string) {
        const actualText = await element.getText();
        console.log("Acutal Text :: ", actualText);
        console.log("Expected Text :: ", expectedText);

        assert.equal(actualText.trim(), expectedText.trim());
    }

    async click(element: ChainablePromiseElement) {
        await element.click();
    }

    async type(element: ChainablePromiseElement, value: string) {
        await element.setValue(value);
    }
}
