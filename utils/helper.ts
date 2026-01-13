import { ChainablePromiseElement } from 'webdriverio';
import { strict as assert } from 'assert';

export class Helper {
    async assertText(
        element: ChainablePromiseElement,
        expectedText: string
    ) {
        const actualText = await element.getText();

        assert.equal(
            actualText.trim(),
            expectedText.trim(),
            `Text mismatch. Expected: ${expectedText}, Actual: ${actualText}`
        );
    }

    async click(element: ChainablePromiseElement) {
        await element.click();
    }

    async type(element: ChainablePromiseElement, value: string) {
        await element.setValue(value);
    }
}
