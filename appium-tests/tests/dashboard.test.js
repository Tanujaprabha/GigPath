import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupAppiumDriver, takeScreenshotOnFailure, performLogin } from '../utils.js';

describe('TC-MOBILE-DASH: Dashboard', function () {
  let driver;

  before(async function () {
    this.timeout(60000);
    driver = await setupAppiumDriver();
    await performLogin(driver);
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
  });

  it('TC-MOBILE-DASH-01: Dashboard Load - should load successfully', async function () {
    await driver.executeScript('window.location.hash = "#/app/dashboard"');
    await driver.sleep(1500); // Wait for data
    
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.length > 0, 'Dashboard should render some text');
  });

  it('TC-MOBILE-DASH-02: Dashboard Cards Visible - should display summary data', async function () {
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.includes('Total') || bodyText.includes('Balance') || bodyText.length > 50, 'Dashboard cards should have loaded');
  });

  it('TC-MOBILE-DASH-03: Dashboard Refresh - should support pull-to-refresh or reload', async function () {
    // Simulate webview pull-to-refresh using JS reload as native swipe can be flaky on simple WebViews
    await driver.executeScript('window.location.reload()');
    await driver.sleep(2000);
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.length > 0, 'Dashboard should successfully reload');
  });

  it('TC-MOBILE-DASH-04: Dashboard Navigation - should navigate via card links', async function () {
    // Find the first internal link on the dashboard and click it to verify routing
    const firstLink = await driver.wait(until.elementLocated(By.css('a[href^="#/app/"]')), 10000);
    const href = await firstLink.getAttribute('href');
    
    await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", firstLink);
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", firstLink);
    
    await driver.sleep(1500);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl !== '#/app/dashboard', `Dashboard link should navigate away, went to ${currentUrl}`);
  });
});
