import { describe, it, before, after } from 'mocha';
import { strict as assert } from 'assert';
import { createDriver } from '../fixtures/driverSetup';

let driver: any;

describe('Splendo App Launch Test', function () {
    this.timeout(60000); // 60 seconds timeout

    before(async () => {
        driver = await createDriver();
    });

    // after(async () => {
    //     await quitDriver(driver);
    // });

    it('should open the app and show the main screen and Verify the Visible Text', async () => {
        console.log("Waiting for main screen...");

        const allListTextEl = await driver.$('//android.widget.TextView[@text="All Lists"]');
        const allListText = await allListTextEl.getText();
        console.log("TEXT HERE ::: ", allListText);

        const nthToDoEl = await driver.$('//android.widget.TextView[@resource-id="com.splendapps.splendo:id/tvEmpty"]');
        const nthToDotext = await nthToDoEl.getText();
        console.log("NTH TEXT HERE ::: ", nthToDotext);

        const placeHolderEl = await driver.$('//android.widget.EditText[@resource-id="com.splendapps.splendo:id/etQuickTask"]');
        const placeHolderText = await placeHolderEl.getText();
        console.log("PLACEHOLDER TEXT HERE ::: ", placeHolderText);


        const addTaskButton = await driver.$('//com.google.android.material.floatingactionbutton.FloatingActionButton[@content-desc="Add Task"]').click();

    });
});
