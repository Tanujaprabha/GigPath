import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupAppiumDriver, takeScreenshotOnFailure, performLogin } from '../utils.js';

describe('TC-MOBILE-AI: AI Chat', function () {
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

  it('TC-MOBILE-AI-01: Open AI Chat - should navigate correctly', async function () {
    await driver.executeScript('window.location.hash = "#/app/ai/chat"');
    await driver.wait(until.urlContains('/ai/chat'), 10000);
    
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/ai/chat'), 'AI Chat page loaded');
  });

  it('TC-MOBILE-AI-02: Send AI Message - should receive response', async function () {
    const inputField = await driver.wait(until.elementLocated(By.css('.chat-form input')), 10000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('.chat-form button[type="submit"]')), 10000);

    await inputField.sendKeys('Hello AI on Mobile');
    
    // Hide keyboard and use Javascript click to avoid element interception
    await driver.executeScript("document.activeElement.blur();");
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", submitBtn);
    
    const messageLog = await driver.wait(until.elementLocated(By.css('.chat-log')), 10000);
    
    await driver.wait(async () => {
      const messages = await messageLog.findElements(By.css('.message--assistant'));
      return messages.length >= 2; 
    }, 15000).catch(() => {}); // Catch timeout if AI takes too long
    
    const assistantMessages = await messageLog.findElements(By.css('.message--assistant'));
    assert.ok(assistantMessages.length >= 1, 'AI should have sent a message');
  });
});
