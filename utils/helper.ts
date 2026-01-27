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

    async typeAndEnter(element: ChainablePromiseElement, value: string) {
        await element.addValue(value);
        await this.driver.pressKeyCode(66);
        await element.addValue(value);
        await this.driver.pressKeyCode(66);
        await element.addValue(value);
        await this.driver.pressKeyCode(66);

    }

}
