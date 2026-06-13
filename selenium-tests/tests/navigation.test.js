import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from '../utils.js';

describe('TC-NAV: Navigation', function () {
  let driver;

  before(async function () {
    driver = await setupDriver();
    await performLogin(driver);
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
  });

  it('TC-NAV-01: All Menu Items - should route correctly', async function () {
    // Navigate to Insights Overview
    await driver.get(`${BASE_URL}#/app/insights/overview`);
    await driver.wait(until.urlContains('/insights/overview'), 5000);
    let currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/insights/overview'), 'Insights page loaded');

    // Navigate to AI Chat
    await driver.get(`${BASE_URL}#/app/ai/chat`);
    await driver.wait(until.urlContains('/ai/chat'), 5000);
    currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/ai/chat'), 'AI Chat page loaded');
  });
});
