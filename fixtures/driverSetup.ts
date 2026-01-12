import { remote } from 'webdriverio';
import { appiumConfig } from '../mobile.config';

export async function createDriver() {
    return await remote(appiumConfig);
}

export async function quitDriver(driver: any) {
    if (driver) {
        await driver.deleteSession();
    }
}
