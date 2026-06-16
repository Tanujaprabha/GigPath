import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import path from 'path';

export const BASE_URL =
  process.env.BASE_URL || 'http://127.0.0.1:5173/GigPath/';

export async function setupDriver(
  viewport = { width: 1920, height: 1080 }
) {
  const options = new chrome.Options();

  // Uncomment for CI if needed
  // options.addArguments('--headless=new');

  options.addArguments('--disable-gpu');
  options.addArguments(
    `--window-size=${viewport.width},${viewport.height}`
  );
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--mute-audio');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  return driver;
}

export async function takeScreenshotOnFailure(driver, testContext) {
  try {
    if (!driver) {
      console.error('Screenshot skipped: driver not initialized');
      return;
    }

    if (
      !testContext ||
      !testContext.currentTest ||
      testContext.currentTest.state !== 'failed'
    ) {
      return;
    }

    const reportsDir = path.resolve('reports', 'screenshots');

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const safeTitle = testContext.currentTest.title
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-');

    const screenshotPath = path.join(
      reportsDir,
      `${safeTitle}_${timestamp}.png`
    );

    const image = await driver.takeScreenshot();

    fs.writeFileSync(screenshotPath, image, 'base64');

    console.log(`\n📸 Screenshot saved: ${screenshotPath}`);
  } catch (err) {
    console.error('Failed to take screenshot:', err);
  }
}

export async function performLogin(
  driver,
  email = 'test@example.com',
  password = 'testpassword123'
) {
  const { until, By } = await import('selenium-webdriver');

  await driver.get(`${BASE_URL}#/login`);

  const emailInput = await driver.wait(
    until.elementLocated(By.css('input[type="email"]')),
    10000
  );

  const passwordInput = await driver.wait(
    until.elementLocated(By.css('input[type="password"]')),
    10000
  );

  const loginBtn = await driver.wait(
    until.elementLocated(By.css('button[type="submit"]')),
    10000
  );

  await emailInput.sendKeys(email);
  await passwordInput.sendKeys(password);
  await loginBtn.click();

  await driver.wait(
    until.urlContains('/dashboard'),
    10000
  );
}
