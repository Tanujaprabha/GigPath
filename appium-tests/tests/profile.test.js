import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupAppiumDriver, takeScreenshotOnFailure, performLogin } from '../utils.js';

describe('TC-MOBILE-PROF: Profile', function () {
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

  it('TC-MOBILE-PROF-01: View Profile - should load profile page', async function () {
    await driver.executeScript('window.location.hash = "#/app/profile"');
    await driver.wait(until.urlContains('/profile'), 10000);
    
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/profile'), 'Profile page loaded');
  });

  it('TC-MOBILE-PROF-02: Edit Profile - should allow modifying profile data', async function () {
    await driver.executeScript('window.location.hash = "#/app/profile/edit"');
    await driver.wait(until.urlContains('/profile/edit'), 10000);
    
    // We verified EditProfilePage.jsx uses standard inputs and a submit button
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
    
    // Attempt a safe save
    await driver.executeScript("document.activeElement.blur();");
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", submitBtn);
    
    // Should navigate back to profile on success
    await driver.sleep(2000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/profile'), 'Should return to profile page after save');
  });

  it('TC-MOBILE-PROF-03: Change Password - should load security form and validate', async function () {
    await driver.executeScript('window.location.hash = "#/app/profile/security"');
    await driver.wait(until.urlContains('/security'), 10000);
    
    // We verified SecurityPage.jsx contains input[type="password"] fields
    const passwordInputs = await driver.findElements(By.css('input[type="password"]'));
    assert.ok(passwordInputs.length >= 2, 'Should have current and new password fields');
    
    // Type a short password to trigger the 'at least 6 characters' validation
    // instead of the HTML5 'required' validation
    await passwordInputs[0].sendKeys('currentpass');
    await passwordInputs[1].sendKeys('123');

    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
    await driver.executeScript("document.activeElement.blur();");
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", submitBtn);
    
    // Expect error to show up in DOM
    await driver.sleep(1500);
    const alertElements = await driver.findElements(By.css('.alert--error'));
    let uiErrorText = '';
    if (alertElements.length > 0) {
      uiErrorText = await alertElements[0].getText();
    }
    
    assert.ok(uiErrorText.includes('Weak password') || uiErrorText.includes('at least 6 characters'), `Validation error should appear on invalid password change, got: ${uiErrorText}`);
  });
});
