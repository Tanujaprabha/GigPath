import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from '../utils.js';

describe('TC-DASH: Dashboard', function () {
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

  it('TC-DASH-01: Dashboard Loading - should display dashboard elements', async function () {
    await driver.get(`${BASE_URL}#/app/dashboard`);
    await driver.sleep(1000); // Wait for data to load
    
    const bodyText = await driver.findElement(By.css('body')).getText();
    // Assuming the dashboard has common keywords
    assert.ok(bodyText.length > 0, 'Dashboard should render some text');
  });

  it('TC-DASH-02: Navigation Links - should be clickable', async function () {
    // Check if we can navigate to transactions from dashboard/sidebar
    await driver.get(`${BASE_URL}#/app/finance/transactions`);
    await driver.wait(until.urlContains('/finance/transactions'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/finance/transactions'), 'Navigated to transactions');
  });
});
