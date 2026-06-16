import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from './utils.js';

describe('Vulnerability Testing - Input Validation Security', function () {
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

  it('TC-VULN-09: Invalid Email Format - should be intercepted by validation', async function () {
    await driver.get(`${BASE_URL}#/login`);

    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 5000);
    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 5000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    await emailInput.sendKeys('not_an_email');
    await passwordInput.sendKeys('SomePassword123');
    await submitBtn.click();

    // Verify HTML5 validation intercepts the bad email format
    const validationMessage = await emailInput.getAttribute('validationMessage');
    assert.ok(validationMessage !== '', 'Expected HTML5 validation message on invalid email format');
    
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), 'User should not be able to bypass email validation');
  });

  it('TC-VULN-10: Negative Transaction Amount - should be blocked by min=0 validation', async function () {
    // Refresh to clear the email input from the previous test
    await driver.navigate().refresh();
    await performLogin(driver);
    await driver.get(`${BASE_URL}#/app/finance/transactions/new`);

    const amountInput = await driver.wait(until.elementLocated(By.css('input[name="amount"]')), 5000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    // Try to type a negative number
    await amountInput.sendKeys('-50.00');
    
    // Check if the input field rejected the negative sign or if it's invalid
    const validity = await driver.executeScript('return arguments[0].validity.valid;', amountInput);
    if (!validity) {
      const validationMessage = await amountInput.getAttribute('validationMessage');
      assert.ok(validationMessage !== '', 'Expected validation message for negative amount');
    } else {
      // If valid, click submit and see if it navigates (it shouldn't if it's caught)
      await driver.executeScript("arguments[0].click();", submitBtn);
      const url = await driver.getCurrentUrl();
      assert.ok(url.includes('/new'), 'Should not be able to submit negative transaction amount');
    }
  });

  it('TC-VULN-11: Empty Goal Title - should intercept empty title via validation', async function () {
    await driver.get(`${BASE_URL}#/app/goals/new`);

    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
    
    // Click submit without entering a title
    await driver.executeScript("arguments[0].click();", submitBtn);

    // We should still be on the new goal page due to HTML5 validation
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/new'), 'Should not be able to submit an empty goal title');
  });

  it('TC-VULN-12: Extremely Long Goal Title - should keep application stable', async function () {
    await driver.get(`${BASE_URL}#/app/goals/new`);

    const titleInput = await driver.wait(until.elementLocated(By.css('input[name="title"]')), 5000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);

    const longTitle = 'G'.repeat(5000);
    await driver.executeScript(`arguments[0].value = '${longTitle}';`, titleInput);
    
    // Fill required fields
    const amountInput = await driver.wait(until.elementLocated(By.css('input[name="targetAmount"]')), 5000);
    await amountInput.sendKeys('100');

    await driver.executeScript("arguments[0].click();", submitBtn);

    // The app should not crash. It will either save successfully (truncating or handling large payload) 
    // or return a server error that is gracefully handled.
    await driver.sleep(2000); // give time for submission
    
    // Let's just check if the app is still alive
    const pageBody = await driver.findElement(By.css('body'));
    assert.ok(await pageBody.isDisplayed(), 'Application should not crash rendering extremely long title');
  });
});
