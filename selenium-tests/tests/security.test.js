import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from '../utils.js';

describe('TC-SEC: Security', function () {
  let driver;

  before(async function () {
    // Unauthenticated driver
    driver = await setupDriver();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
  });

  it('TC-SEC-01: Route Protection - Unauthenticated users are redirected', async function () {
    await driver.get(`${BASE_URL}#/app/dashboard`);
    await driver.wait(until.urlContains('/login'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/login'), 'Redirected to login');
  });

  it('TC-SEC-02: Direct URL Access - Cannot bypass auth', async function () {
    await driver.get(`${BASE_URL}#/app/finance/transactions`);
    await driver.wait(until.urlContains('/login'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/login'), 'Redirected to login from deep link');
  });
});
