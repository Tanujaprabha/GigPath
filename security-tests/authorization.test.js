import { until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, BASE_URL } from './utils.js';

describe('Vulnerability Testing - Authorization Security', function () {
  let driver;

  before(async function () {
    driver = await setupDriver();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
    // Ensure we are logged out before the next test just in case a test somehow bypasses auth
    await driver.executeScript('window.localStorage.clear(); window.sessionStorage.clear();');
  });

  it('TC-VULN-05: Access Dashboard Without Login - should redirect to Login', async function () {
    await driver.get(`${BASE_URL}#/app/dashboard`);

    // The router should intercept the unauthenticated state and redirect to /login
    await driver.wait(until.urlContains('/login'), 5000);
    
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), `Expected URL to be redirected to /login, got ${url}`);
  });

  it('TC-VULN-06: Access Finance Without Login - should redirect to Login', async function () {
    await driver.get(`${BASE_URL}#/app/finance/transactions`);

    // The router should intercept the unauthenticated state and redirect to /login
    await driver.wait(until.urlContains('/login'), 5000);
    
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), `Expected URL to be redirected to /login, got ${url}`);
  });

  it('TC-VULN-07: Access Goals Without Login - should redirect to Login', async function () {
    await driver.get(`${BASE_URL}#/app/goals`);

    // The router should intercept the unauthenticated state and redirect to /login
    await driver.wait(until.urlContains('/login'), 5000);
    
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), `Expected URL to be redirected to /login, got ${url}`);
  });

  it('TC-VULN-08: Access Profile Without Login - should redirect to Login', async function () {
    await driver.get(`${BASE_URL}#/app/profile`);

    // The router should intercept the unauthenticated state and redirect to /login
    await driver.wait(until.urlContains('/login'), 5000);
    
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), `Expected URL to be redirected to /login, got ${url}`);
  });
});
