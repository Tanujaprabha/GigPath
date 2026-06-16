import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, BASE_URL } from './utils.js';

describe('Vulnerability Testing - Auth Security', function () {
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

  it('TC-VULN-01: Invalid Login Attempt - should reject invalid credentials', async function () {
    await driver.get(`${BASE_URL}#/login`);

    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 5000);
    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 5000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    await emailInput.sendKeys('invalid_user@example.com');
    await passwordInput.sendKeys('WrongPassword123!');
    await submitBtn.click();

    // The system should show an error message
    const errorMsg = await driver.wait(until.elementLocated(By.className('alert--error')), 5000);
    const errorText = await errorMsg.getText();
    assert.ok(errorText.toLowerCase().includes('invalid'), `Expected error message to contain 'invalid', got '${errorText}'`);
  });

  it('TC-VULN-02: Empty Credentials - should block submission via validation', async function () {
    await driver.get(`${BASE_URL}#/login`);

    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 5000);
    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 5000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    // Clear fields just in case
    await emailInput.clear();
    await passwordInput.clear();

    await submitBtn.click();

    // Verify HTML5 validation prevents form submission
    const emailValidationMessage = await emailInput.getAttribute('validationMessage');
    assert.ok(emailValidationMessage !== '', 'Expected HTML5 validation message on empty email');

    // Ensure we are still on the login page
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), 'User should not be redirected on empty credentials');
  });

  it('TC-VULN-03: Long Input Attack - should not crash with extremely long strings', async function () {
    await driver.get(`${BASE_URL}#/login`);

    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 5000);
    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 5000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    const longString = 'A'.repeat(5000);
    
    // Some browsers or WebDriver implementations crash if sendKeys is too huge,
    // so we execute a script to set the value directly if it's too long, or sendKeys.
    await driver.executeScript(`arguments[0].value = '${longString}@example.com';`, emailInput);
    await driver.executeScript(`arguments[0].value = '${longString}';`, passwordInput);

    await submitBtn.click();

    // Verify that the page is still responsive by checking if an error element appears or URL stays
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), 'User should not be able to log in with excessively long credentials');
  });

  it('TC-VULN-04: Special Character Input - should handle special characters safely', async function () {
    await driver.get(`${BASE_URL}#/login`);

    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 5000);
    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 5000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    // SQL Injection attempt payload
    await emailInput.sendKeys(`admin@example.com' OR '1'='1`);
    await passwordInput.sendKeys(`' OR 1=1 --`);
    
    await submitBtn.click();

    // It should safely reject them (in Firebase auth, this is just an invalid email/password)
    try {
      const errorMsg = await driver.wait(until.elementLocated(By.className('alert--error')), 5000);
      assert.ok(errorMsg, 'Error message should be displayed for special character injection');
    } catch (err) {
      // Alternatively, HTML5 email validation might catch the invalid email format
      const validationMsg = await emailInput.getAttribute('validationMessage');
      assert.ok(validationMsg !== '', 'Expected HTML5 validation message on invalid email format from SQLi attempt');
    }
  });
});
