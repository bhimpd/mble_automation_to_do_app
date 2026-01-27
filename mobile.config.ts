export function getAppiumConfig(device: {
    udid: string;
    systemPort: number;
}) {
    return {
        hostname: '127.0.0.1',
        port: 4723,
        path: '/',
        capabilities: {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',

            // 🔑 DEVICE-SPECIFIC
            'appium:udid': device.udid,
            'appium:deviceName': device.udid,
            'appium:systemPort': device.systemPort,

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
}
