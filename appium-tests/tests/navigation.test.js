import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupAppiumDriver, takeScreenshotOnFailure, performLogin } from '../utils.js';

describe('TC-MOBILE-NAV: Navigation', function () {
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

  it('TC-MOBILE-NAV-01: Open Side Menu - should open using hamburger button', async function () {
    // Navigate to a page that definitely has the header
    await driver.executeScript('window.location.hash = "#/app/dashboard"');
    await driver.sleep(1500);
    
    // We verified AppLayout.jsx contains .hamburger-btn
    const hamburgerBtn = await driver.wait(until.elementLocated(By.css('.hamburger-btn')), 10000);
    await driver.executeScript("arguments[0].click();", hamburgerBtn);
    
    await driver.sleep(1000);
    
    // Verify sidebar is open
    const sidebar = await driver.findElement(By.css('.app-sidebar'));
    const className = await sidebar.getAttribute('class');
    assert.ok(className.includes('is-open'), 'Sidebar should have is-open class after hamburger click');
  });

  it('TC-MOBILE-NAV-02: Navigate Between Modules - should route via sidebar links', async function () {
    // Assume sidebar is already open from previous test. If not, click it.
    try {
        const sidebar = await driver.findElement(By.css('.app-sidebar.is-open'));
    } catch(e) {
        const hamburgerBtn = await driver.wait(until.elementLocated(By.css('.hamburger-btn')), 5000);
        await driver.executeScript("arguments[0].click();", hamburgerBtn);
        await driver.sleep(1000);
    }
    
    // Click a link in the sidebar, e.g. Goals
    const link = await driver.wait(until.elementLocated(By.css('.app-sidebar a[href*="#/app/goals"]')), 10000);
    await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", link);
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", link);
    
    await driver.wait(until.urlContains('/goals'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/goals'), 'Should navigate to Goals module');
  });

  it('TC-MOBILE-NAV-03: Android Back Button - should navigate history', async function () {
    await driver.executeScript('window.location.hash = "#/app/dashboard"');
    await driver.sleep(1500);
    
    await driver.executeScript('window.location.hash = "#/app/profile"');
    await driver.sleep(1500);
    
    let currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/profile'), 'Setup: Currently on profile page');
    
    // Use Appium native back command (simulates hardware back button)
    await driver.navigate().back();
    await driver.sleep(2000);
    
    currentUrl = await driver.getCurrentUrl();
    assert.ok(!currentUrl.includes('/profile'), 'Should have navigated away from profile via hardware back button');
  });
});
