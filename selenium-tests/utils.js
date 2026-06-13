import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import path from 'path';

export const BASE_URL = 'http://127.0.0.1:4173/GigPath/';

export async function setupDriver(viewport = { width: 1920, height: 1080 }) {
  let options = new chrome.Options();
  options.addArguments('--headless=new'); // Run headless by default for CI and full suite
  options.addArguments('--disable-gpu');
  options.addArguments(`--window-size=${viewport.width},${viewport.height}`);
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--mute-audio');

  return await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

export async function takeScreenshotOnFailure(driver, testContext) {
  if (testContext.currentTest.state === 'failed') {
    const reportsDir = path.resolve('reports', 'screenshots');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    // Create safe filename from test title
    const safeTitle = testContext.currentTest.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(reportsDir, `${safeTitle}_${timestamp}.png`);

    try {
      const image = await driver.takeScreenshot();
      fs.writeFileSync(screenshotPath, image, 'base64');
      console.log(`\n📸 Screenshot saved: ${screenshotPath}`);
    } catch (err) {
      console.error('Failed to take screenshot:', err);
    }
  }
}

export async function performLogin(driver, email = 'test@example.com', password = 'testpassword123') {
  const { until, By } = await import('selenium-webdriver');
  await driver.get(`${BASE_URL}#/login`);

  const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
  const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
  const loginBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);

  await emailInput.sendKeys(email);
  await passwordInput.sendKeys(password);
  await loginBtn.click();

  // Wait for navigation away from login
  await driver.wait(until.urlContains('/dashboard'), 10000);
}
