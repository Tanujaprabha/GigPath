import assert from 'assert';
import { setupAppiumDriver, takeScreenshotOnFailure, toggleNetwork, performLogin } from '../utils.js';
import { until, By } from 'selenium-webdriver';

describe('TC-MOBILE-DEV: Device & Network', function () {
  let driver;
  let networkModesUsed = new Set();

  before(async function () {
    this.timeout(60000);
    driver = await setupAppiumDriver();
    
    await driver.executeScript(`
      window.lastAlertMessage = '';
      window.alert = function(msg) { window.lastAlertMessage = msg; };
    `);
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
    
    // Ensure we restore network after EVERY test to guarantee the next test starts online
    const mode = await toggleNetwork(driver, 'online', 'Please turn OFF Airplane Mode to restore internet.');
    networkModesUsed.add(mode);
  });

  after(async function () {
    console.log(`\n--- Network Modes Used During Testing ---`);
    console.log(Array.from(networkModesUsed).join(', '));
    console.log(`-----------------------------------------\n`);
    
    if (driver) {
      await driver.quit();
    }
  });

  it('TC-MOBILE-DEV-01: Launch App Without Internet - should show offline state', async function () {
    this.timeout(45000);
    // 1. Start Offline
    const mode = await toggleNetwork(driver, 'offline', 'Please turn ON Airplane Mode to disable internet.');
    networkModesUsed.add(mode);

    await driver.executeScript('window.location.hash = "#/"');
    await driver.sleep(2000); 
    
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.length > 0, 'App should load locally even when offline');
  });

  it('TC-MOBILE-DEV-02: Login Without Internet - should show error', async function () {
    this.timeout(45000);
    // 1. Start Offline
    const mode = await toggleNetwork(driver, 'offline', 'Please turn ON Airplane Mode to disable internet.');
    networkModesUsed.add(mode);

    await driver.executeScript('window.location.hash = "#/login"');
    
    await driver.executeScript(`window.lastAlertMessage = '';`);
    
    const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
    const loginBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);

    await emailInput.clear();
    await passwordInput.clear();
    await emailInput.sendKeys('offline@example.com');
    await passwordInput.sendKeys('password123');
    
    await driver.executeScript("document.activeElement.blur();");
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", loginBtn);

    await driver.sleep(2000);
    
    let errorText = await driver.executeScript("return window.lastAlertMessage;");
    let domAlerts = await driver.findElements(By.css('.alert--error'));
    
    if (!errorText && domAlerts.length > 0) {
      errorText = await domAlerts[0].getText();
      const closeBtns = await domAlerts[0].findElements(By.css('button'));
      if (closeBtns.length > 0) {
        await driver.executeScript("arguments[0].click();", closeBtns[0]);
      }
    }

    assert.ok(errorText, 'Expected a network error alert to be intercepted or displayed');
    assert.ok(errorText.toLowerCase().includes('network') || errorText.toLowerCase().includes('connect') || errorText.toLowerCase().includes('failed') || errorText.toLowerCase().includes('offline'), `Expected auth/network-request-failed or similar, but got: ${errorText}`);
  });

  it('TC-MOBILE-DEV-03: AI Chat Without Internet - should show offline message', async function () {
    this.timeout(60000);
    // 1. Ensure Online and Logged in
    await performLogin(driver);
    await driver.executeScript(`window.lastAlertMessage = '';`);

    // 2. Navigate and verify reaching the route
    await driver.executeScript('window.location.hash = "#/app/ai"');
    await driver.wait(until.urlContains('/ai'), 10000);

    const messageInput = await driver.wait(until.elementLocated(By.css('input[placeholder*="message"]')), 10000);
    const sendBtn = await driver.wait(until.elementLocated(By.css('button.send-btn')), 10000);

    // 3. Switch Offline
    const mode = await toggleNetwork(driver, 'offline', 'Please turn ON Airplane Mode to disable internet.');
    networkModesUsed.add(mode);

    // 4. Test offline behavior
    await messageInput.sendKeys('Hello AI');
    await driver.executeScript("document.activeElement.blur();");
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", sendBtn);

    await driver.sleep(2000);
    
    let errorText = await driver.executeScript("return window.lastAlertMessage;");
    let domAlerts = await driver.findElements(By.css('.alert--error'));
    
    if (errorText || domAlerts.length > 0) {
      assert.ok(true, 'AI chat showed error banner');
    } else {
      const bodyText = await driver.findElement(By.css('body')).getText();
      assert.ok(bodyText.toLowerCase().includes('failed') || bodyText.toLowerCase().includes('error') || bodyText.toLowerCase().includes('network'), 'Should show an error in the chat log');
    }
  });

  it('TC-MOBILE-DEV-04: Create Goal Without Internet - should fail gracefully', async function () {
    this.timeout(60000);
    // 1. Ensure Online and Logged in
    await performLogin(driver);
    
    // 2. Navigate and verify reaching the route
    await driver.executeScript('window.location.hash = "#/app/goals/new"');
    await driver.wait(until.urlContains('/goals/new'), 10000);

    const titleInput = await driver.wait(until.elementLocated(By.css('input[name="title"]')), 10000);
    const purposeInput = await driver.wait(until.elementLocated(By.css('textarea[name="purpose"]')), 10000);
    const targetInput = await driver.wait(until.elementLocated(By.css('input[name="targetAmount"]')), 10000);
    const savedInput = await driver.wait(until.elementLocated(By.css('input[name="savedAmount"]')), 10000);
    const monthlyInput = await driver.wait(until.elementLocated(By.css('input[name="monthlyContribution"]')), 10000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);

    // 3. Switch Offline
    const mode = await toggleNetwork(driver, 'offline', 'Please turn ON Airplane Mode to disable internet.');
    networkModesUsed.add(mode);

    // 4. Test offline submission
    await titleInput.sendKeys('Offline Goal');
    await purposeInput.sendKeys('Offline Test');
    await targetInput.sendKeys('100');
    await savedInput.sendKeys('0');
    await monthlyInput.sendKeys('10');
    
    await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", submitBtn);
    await driver.sleep(500);
    
    await driver.executeScript(`window.lastAlertMessage = '';`);
    await driver.executeScript("arguments[0].click();", submitBtn);

    await driver.sleep(2000);
    let errorText = await driver.executeScript("return window.lastAlertMessage;");
    const errors = await driver.findElements(By.css('.alert--error'));
    assert.ok(errorText || errors.length > 0, 'Should show a connection error alert for offline form submission');
  });

  it('TC-MOBILE-DEV-05: Add Transaction Without Internet - should fail gracefully', async function () {
    this.timeout(60000);
    // 1. Ensure Online and Logged in
    await performLogin(driver);
    
    // 2. Navigate and verify reaching the route
    await driver.executeScript('window.location.hash = "#/app/finance/transactions/new"');
    await driver.wait(until.urlContains('/finance/transactions/new'), 10000);

    const titleInput = await driver.wait(until.elementLocated(By.css('input[name="title"]')), 10000);
    const amountInput = await driver.wait(until.elementLocated(By.css('input[name="amount"]')), 10000);
    const submitBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);

    // 3. Switch Offline
    const mode = await toggleNetwork(driver, 'offline', 'Please turn ON Airplane Mode to disable internet.');
    networkModesUsed.add(mode);

    // 4. Test offline submission
    await titleInput.sendKeys('Offline Income');
    await amountInput.sendKeys('10');
    
    await driver.executeScript("arguments[0].scrollIntoView(true); document.activeElement.blur();", submitBtn);
    await driver.sleep(500);
    
    await driver.executeScript(`window.lastAlertMessage = '';`);
    await driver.executeScript("arguments[0].click();", submitBtn);

    await driver.sleep(2000);
    let errorText = await driver.executeScript("return window.lastAlertMessage;");
    const errors = await driver.findElements(By.css('.alert--error'));
    assert.ok(errorText || errors.length > 0, 'Should show a connection error alert for offline transaction submission');
  });

  it('TC-MOBILE-DEV-06: Reconnect Internet And Verify Recovery - should regain access', async function () {
    this.timeout(60000);
    // 1. Launch from a fresh session (performLogin ensures we are logged in from scratch online)
    await performLogin(driver);
    
    // 2. Go to dashboard
    await driver.executeScript('window.location.hash = "#/app/dashboard"');
    await driver.wait(until.urlContains('/dashboard'), 10000);
    
    // 3. Simulate sudden drop
    const modeOffline = await toggleNetwork(driver, 'offline', 'Please turn ON Airplane Mode to disable internet.');
    networkModesUsed.add(modeOffline);
    await driver.sleep(2000);
    
    // 4. Restore connectivity
    const modeOnline = await toggleNetwork(driver, 'online', 'Please turn OFF Airplane Mode to restore internet.');
    networkModesUsed.add(modeOnline);
    await driver.sleep(5000); // Give Firebase time to reconnect socket
    
    // 5. Verify recovery
    // We navigate to another data-driven route to prove network is back
    await driver.executeScript('window.location.hash = "#/app/finance"');
    await driver.wait(until.urlContains('/finance'), 15000);
    
    const bodyText = await driver.findElement(By.css('body')).getText();
    assert.ok(bodyText.length > 0 && !bodyText.toLowerCase().includes('network error'), 'Finance view should load properly after recovery');
  });
});
