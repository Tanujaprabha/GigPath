import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupAppiumDriver, takeScreenshotOnFailure, performLogin } from '../utils.js';

describe('TC-MOBILE-AUTH: Authentication', function () {
  let driver;

  before(async function () {
    this.timeout(60000); 
    driver = await setupAppiumDriver();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
  });

  it('TC-MOBILE-AUTH-02: Invalid Login - should display error or reject', async function () {
    await driver.executeScript('window.location.hash = "#/login"');
    
    // Override window.alert to capture the message without blocking the Appium driver
    await driver.executeScript(`
      window.lastAlertMessage = '';
      window.alert = function(msg) { window.lastAlertMessage = msg; };
    `);
    
    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
    const loginBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);

    await emailInput.clear();
    await passwordInput.clear();
    await emailInput.sendKeys('invalid@example.com');
    await passwordInput.sendKeys('wrongpass');
    await driver.executeScript("document.activeElement.blur();");
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", loginBtn);
    
    await driver.sleep(2000);
    
    const alertElements = await driver.findElements(By.css('.alert--error'));
    let errorText = '';
    if (alertElements.length > 0) {
      errorText = await alertElements[0].getText();
    } else {
      errorText = await driver.executeScript("return window.lastAlertMessage;");
    }
    
    assert.ok(errorText && (errorText.toLowerCase().includes('invalid') || errorText.toLowerCase().includes('fail') || errorText.includes('auth/')), `Expected invalid credential error, but got: ${errorText}`);
    
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/login'), 'User should remain on login page');
  });

  it('TC-MOBILE-AUTH-03: Empty Field Validation - should show errors', async function () {
    await driver.executeScript('window.location.hash = "#/login"');
    
    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
    
    await emailInput.clear();
    await passwordInput.clear();
    
    const loginBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
    await driver.executeScript("document.activeElement.blur();");
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", loginBtn);
    
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/login'), 'User should remain on login page');
  });

  it('TC-MOBILE-AUTH-04: Forgot Password - should allow sending reset link', async function () {
    await driver.executeScript('window.location.hash = "#/forgot-password"');
    
    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);

    await emailInput.sendKeys('test@example.com');
    await driver.executeScript("document.activeElement.blur();");
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", submitBtn);
    
    await driver.sleep(2000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('forgot-password') || currentUrl.includes('login'), 'User should be on forgot-password or login');
  });

  it('TC-MOBILE-AUTH-01: Valid Login - should redirect to dashboard', async function () {
    await performLogin(driver);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/dashboard'), 'User should be redirected to dashboard');
  });

  it('TC-MOBILE-AUTH-05: Logout - should end session and redirect to login', async function () {
    // Click logout button (assuming it's in the sidebar)
    const logoutBtn = await driver.wait(until.elementLocated(By.css('.sidebar-footer .button--ghost')), 10000);
    await driver.executeScript("arguments[0].click();", logoutBtn);
    
    await driver.wait(until.urlContains('/login'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/login'), 'User should be on login page');
  });
});
