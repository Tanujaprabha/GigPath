import { By, until, error } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from './utils.js';

describe('Vulnerability Testing - XSS Security', function () {
  let driver;

  before(async function () {
    driver = await setupDriver();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
  });

  it('TC-VULN-13: Goal Title XSS - should not execute injected script', async function () {
    await driver.get(BASE_URL);
    await driver.executeScript('window.localStorage.clear(); window.sessionStorage.clear();');
    await performLogin(driver);
    await driver.get(`${BASE_URL}#/app/goals/new`);

    const titleInput = await driver.wait(until.elementLocated(By.css('input[name="title"]')), 5000);
    const amountInput = await driver.wait(until.elementLocated(By.css('input[name="targetAmount"]')), 5000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    const xssPayload = `<script>alert('XSS_VULN_13')</script>`;
    await titleInput.sendKeys(xssPayload);
    await amountInput.sendKeys('500');
    await driver.executeScript("arguments[0].click();", submitBtn);

    // Wait for the app to navigate to goals list
    await driver.wait(until.urlContains('/goals'), 5000);
    await driver.sleep(1000); // Give it a moment to render

    // Check if an alert is present
    try {
      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();
      if (alertText.includes('XSS_VULN_13')) {
        assert.fail('XSS script was executed via Goal Title');
      }
      await alert.dismiss(); // dismiss so test can proceed if it somehow triggered
    } catch (err) {
      // We expect a NoSuchAlertError if XSS is blocked
      assert.ok(err instanceof error.NoSuchAlertError, 'Expected no alert to be present');
    }
  });

  it('TC-VULN-14: Profile Name XSS - should not execute injected image onerror', async function () {
    await driver.get(`${BASE_URL}#/app/profile/edit`);

    // We use a different payload for HTML injection
    const xssPayload = `<img src=x onerror=alert('XSS_VULN_14')>`;
    
    // Some implementations might find inputs by name or type or label, checking EditProfilePage it doesn't have a name attribute, 
    // but it's the first text input inside .form-grid.
    const inputs = await driver.wait(until.elementsLocated(By.css('.form-grid input[type="text"]')), 5000);
    const nameInput = inputs[0]; // Full name is the first text input
    
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    await nameInput.clear();
    await nameInput.sendKeys(xssPayload);
    await driver.executeScript("arguments[0].click();", submitBtn);

    // Wait for the success message or redirect to profile
    await driver.wait(until.urlContains('/profile'), 5000);
    await driver.sleep(1000); // Render time

    // Check if an alert is present
    try {
      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();
      if (alertText.includes('XSS_VULN_14')) {
        assert.fail('XSS script was executed via Profile Name');
      }
      await alert.dismiss();
    } catch (err) {
      assert.ok(err instanceof error.NoSuchAlertError, 'Expected no alert to be present');
    }
  });
});
