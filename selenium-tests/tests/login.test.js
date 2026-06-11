import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import 'chromedriver';
import assert from 'assert';

describe('Login Flow E2E Test', function() {
  let driver;

  // Since vite preview usually runs on 4173 by default
  // and we have a base path of /GigPath/
  const baseUrl = 'http://localhost:4173/GigPath/';

  before(async function() {
    let options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('should load the login page, enter credentials, and attempt login', async function() {
    // Navigate to the app (it should redirect to login or we can go directly to hash router)
    await driver.get(`${baseUrl}#/login`);

    // Wait for the email input to be present
    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
    const passwordInput = await driver.wait(until.elementLocated(By.id('password')), 10000);
    const loginBtn = await driver.wait(until.elementLocated(By.id('login-button')), 10000);

    // Enter test credentials
    await emailInput.sendKeys('test@example.com');
    await passwordInput.sendKeys('testpassword123');

    // Click login
    await loginBtn.click();

    // Verify expected behavior
    await driver.sleep(2000);
    
    // We can just verify the URL still contains /GigPath/ to ensure the app didn't crash completely.
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/GigPath/'), 'App should remain on a valid route');
  });
});
