import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupAppiumDriver, takeScreenshotOnFailure, performLogin } from '../utils.js';

describe('TC-MOBILE-GOAL: Goals', function () {
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

  it('TC-MOBILE-GOAL-01: View Goals - should load list', async function () {
    await driver.executeScript('window.location.hash = "#/app/goals"');
    await driver.wait(until.urlContains('/goals'), 10000);
    
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/goals'), 'Goals list page loaded');
  });

  it('TC-MOBILE-GOAL-02: Create Goal - should allow adding new goal', async function () {
    await driver.executeScript('window.location.hash = "#/app/goals/new"');
    await driver.wait(until.urlContains('/goals/new'), 10000);

    const titleInput = await driver.wait(until.elementLocated(By.css('input[name="title"]')), 10000);
    const purposeInput = await driver.wait(until.elementLocated(By.css('textarea[name="purpose"]')), 10000);
    const targetInput = await driver.wait(until.elementLocated(By.css('input[name="targetAmount"]')), 10000);
    const savedInput = await driver.wait(until.elementLocated(By.css('input[name="savedAmount"]')), 10000);
    const monthlyInput = await driver.wait(until.elementLocated(By.css('input[name="monthlyContribution"]')), 10000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);

    await titleInput.sendKeys('Appium Vacation');
    await purposeInput.sendKeys('Test goal');
    await targetInput.sendKeys('5000');
    await savedInput.sendKeys('500');
    await monthlyInput.sendKeys('200');
    
    await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", submitBtn);
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", submitBtn);

    await driver.sleep(2000);
    const errors = await driver.findElements(By.css('.alert--error'));
    if (errors.length > 0) {
        const errorText = await errors[0].getText();
        assert.fail(`Form submission failed with UI error: ${errorText}`);
    }

    await driver.wait(until.urlContains('/goals'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(!currentUrl.includes('/new'), 'Should return to goals list');
    
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.includes('Appium Vacation') || bodyText.includes('5000'), 'New goal should be visible in the list');
  });

  it('TC-MOBILE-GOAL-03: Update Goal Progress - should allow editing saved amount', async function () {
    await driver.executeScript('window.location.hash = "#/app/goals"');
    await driver.wait(until.urlContains('/goals'), 10000);

    // Find the first goal Detail link to click
    const detailLinks = await driver.findElements(By.css('a[href^="#/app/goals/"]'));
    let targetDetailLink = null;
    for (let link of detailLinks) {
        let href = await link.getAttribute('href');
        // Filter out specific sub-routes to isolate the base detail view link
        if (!href.includes('/new') && !href.includes('/progress') && !href.includes('/edit')) {
            targetDetailLink = link;
            break;
        }
    }
    
    if (targetDetailLink) {
        await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", targetDetailLink);
        await driver.sleep(500);
        await driver.executeScript("arguments[0].click();", targetDetailLink);
        
        await driver.sleep(1500);
        
        // Inside Detail View, click Edit
        const editLink = await driver.wait(until.elementLocated(By.css('a[href$="/edit"]')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", editLink);
        await driver.sleep(500);
        await driver.executeScript("arguments[0].click();", editLink);
        
        await driver.wait(until.urlContains('/edit'), 10000);

        const savedInput = await driver.wait(until.elementLocated(By.css('input[name="savedAmount"]')), 10000);
        
        // Safe clear for mobile webview
        await driver.executeScript("arguments[0].value = '';", savedInput);
        await savedInput.sendKeys('500');
        
        const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
        await driver.executeScript("document.activeElement.blur();");
        await driver.sleep(500);
        await driver.executeScript("arguments[0].click();", submitBtn);

        await driver.sleep(2000);
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(!currentUrl.includes('/edit'), 'Should return to goal details after update');
    }
  });
});
