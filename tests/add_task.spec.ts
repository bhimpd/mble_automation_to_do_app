import { describe, it, beforeEach, afterEach } from "mocha";
import { createDriver, quitDriver } from "../fixtures/driverSetup";
import { HomePage } from "../pages/HomePage";

let driver: any;
let homePage: HomePage;

describe('Add Task Module', function () {
    this.timeout(60000);

    beforeEach(async () => {
        driver = await createDriver();
        homePage = new HomePage(driver);
    });

    afterEach(async () => {
        await quitDriver(driver);
    });

    it('should add a task', async () => {
        await homePage.clickAddTask();

    });
});