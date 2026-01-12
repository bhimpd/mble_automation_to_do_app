export const appiumConfig = {
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    capabilities: {
        platformName: 'Android',
        'appium:deviceName': 'u8g6wcmzuk9x65rs',
        'appium:automationName': 'UiAutomator2',

        // App under test
        'appium:appPackage': 'com.splendapps.splendo',
        'appium:appActivity': 'com.splendapps.splendo.MainActivity',

        // Stability
        'appium:noReset': true,
        'appium:newCommandTimeout': 300,
        'appium:waitForIdleTimeout': 5000,
        'appium:autoGrantPermissions': true
    }
};
