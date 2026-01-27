import { remote } from 'webdriverio';
import { getAppiumConfig } from '../mobile.config';

export async function createDriver(device: {
    udid: string;
    systemPort: number;
}) {
    const config = getAppiumConfig(device);
    return await remote(config);
}

export async function quitDriver(driver: any) {
    if (driver) {
        await driver.deleteSession();
    }
}
