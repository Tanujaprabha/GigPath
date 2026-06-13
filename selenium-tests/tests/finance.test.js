import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from '../utils.js';

describe('TC-FIN: Finance', function () {
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

  it('TC-FIN-02: View Transactions - should load list', async function () {
    await driver.get(`${BASE_URL}#/app/finance/transactions`);
    await driver.wait(until.urlContains('/finance/transactions'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/finance/transactions'), 'Transactions page loaded');
  });

  it('TC-FIN-01: Add New Transaction - should load form', async function () {
    await driver.get(`${BASE_URL}#/app/finance/transactions/new`);
    await driver.wait(until.urlContains('/finance/transactions/new'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/finance/transactions/new'), 'Add transaction page loaded');
  });
});
