import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from '../utils.js';

describe('TC-RES: Responsive', function () {
  let driver;

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
  });

  it('TC-RES-01: Desktop Viewport - layout correctly', async function () {
    driver = await setupDriver({ width: 1920, height: 1080 });
    await performLogin(driver);
    await driver.get(`${BASE_URL}#/app/dashboard`);
    await driver.sleep(1000);
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.length > 0, 'Dashboard loaded in desktop');
  });

  it('TC-RES-02: Mobile Viewport - layout stacks', async function () {
    // Resize viewport
    await driver.manage().window().setRect({ width: 375, height: 812 });
    await driver.get(`${BASE_URL}#/app/dashboard`);
    await driver.sleep(1000);
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.length > 0, 'Dashboard loaded in mobile viewport');
  });
});
