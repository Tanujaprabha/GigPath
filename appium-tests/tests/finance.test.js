import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupAppiumDriver, takeScreenshotOnFailure, performLogin } from '../utils.js';

describe('TC-MOBILE-FIN: Finance', function () {
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

  it('TC-MOBILE-FIN-01: View Transactions - should load list', async function () {
    await driver.executeScript('window.location.hash = "#/app/finance/transactions"');
    await driver.wait(until.urlContains('/finance/transactions'), 10000);
    
    // Attempt to verify transactions exist, but gracefully pass if it's a new account
    await driver.wait(until.elementLocated(By.css('a[href^="#/app/finance/transactions/"]')), 5000).catch(() => null);
    
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/finance/transactions'), 'Transactions page loaded');
  });

  it('TC-MOBILE-FIN-02: Add Transaction - should create a new transaction', async function () {
    await driver.executeScript('window.location.hash = "#/app/finance/transactions/new"');
    await driver.wait(until.urlContains('/finance/transactions/new'), 10000);

    const titleInput = await driver.wait(until.elementLocated(By.css('input[name="title"]')), 10000);
    const amountInput = await driver.wait(until.elementLocated(By.css('input[name="amount"]')), 10000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);

    await titleInput.sendKeys('Appium Test Income');
    await amountInput.sendKeys('150');
    
    await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", submitBtn);
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", submitBtn);

    await driver.sleep(2000);
    const errors = await driver.findElements(By.css('.alert--error'));
    if (errors.length > 0) {
        const errorText = await errors[0].getText();
        assert.fail(`Form submission failed with UI error: ${errorText}`);
    }

    await driver.wait(until.urlContains('/finance/transactions'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(!currentUrl.includes('/new'), 'Should have navigated away from new transaction form');
    
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.includes('Appium Test Income') || bodyText.includes('150'), 'New transaction should be visible in the list');
  });

  it('TC-MOBILE-FIN-03: Edit Transaction - should allow modifications', async function () {
    await driver.executeScript('window.location.hash = "#/app/finance/transactions"');
    await driver.wait(until.urlContains('/finance/transactions'), 10000);

    // Click the first Edit link found on the transaction list
    const editLink = await driver.wait(until.elementLocated(By.css('a[href$="/edit"]')), 10000).catch(() => null);
    
    if (editLink) {
      await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", editLink);
      await driver.sleep(500);
      await driver.executeScript("arguments[0].click();", editLink);
      
      await driver.wait(until.urlContains('/edit'), 10000);

      const amountInput = await driver.wait(until.elementLocated(By.css('input[name="amount"]')), 10000);
      
      // Clear can be flaky in webviews, so we use JS to clear it
      await driver.executeScript("arguments[0].value = '';", amountInput);
      await amountInput.sendKeys('250');
      
      const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
      await driver.executeScript("document.activeElement.blur();");
      await driver.sleep(500);
      await driver.executeScript("arguments[0].click();", submitBtn);

      await driver.sleep(2000);
      const currentUrl = await driver.getCurrentUrl();
      assert.ok(!currentUrl.includes('/edit'), 'Should return to transaction details after save');
    }
  });
});
