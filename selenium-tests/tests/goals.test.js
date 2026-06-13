import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from '../utils.js';

describe('TC-GOAL: Goals', function () {
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

  it('TC-GOAL-01: Create New Goal - should load form', async function () {
    await driver.get(`${BASE_URL}#/app/goals/new`);
    await driver.wait(until.urlContains('/goals/new'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/goals/new'), 'Add goal page loaded');
  });

  it('TC-GOAL-02: View Goal Progress - should load list', async function () {
    await driver.get(`${BASE_URL}#/app/goals`);
    await driver.wait(until.urlContains('/goals'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/goals'), 'Goals list page loaded');
  });
});
