import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from './utils.js';

describe('Vulnerability Testing - Session Security', function () {
  let driver;

  before(async function () {
    driver = await setupDriver();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
    // Extra cleanup to ensure we don't bleed session state between tests
    await driver.executeScript('window.localStorage.clear(); window.sessionStorage.clear();');
  });

  it('TC-VULN-15: Back Button After Logout - user should remain logged out', async function () {
    await performLogin(driver);
    await driver.get(`${BASE_URL}#/app/dashboard`);

    // Find the logout button in the sidebar and click it using javascript to avoid interception
    const logoutBtn = await driver.wait(until.elementLocated(By.css('.sidebar-footer .button--ghost')), 5000);
    await driver.executeScript("arguments[0].click();", logoutBtn);

    // Wait until we hit the login page
    await driver.wait(until.urlContains('/login'), 5000);

    // Simulate browser back button
    await driver.navigate().back();

    // Since React Router with RequireAuth handles the redirect, we should instantly be pushed back to login
    // Or if the browser caches the view, interaction should fail or trigger redirect.
    await driver.wait(until.urlContains('/login'), 5000);

    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), 'User should be redirected to login when using back button after logout');
  });

  it('TC-VULN-16: Direct URL Access After Logout - should redirect to Login', async function () {
    await performLogin(driver);
    await driver.get(`${BASE_URL}#/app/dashboard`);

    // Find the logout button and click it
    const logoutBtn = await driver.wait(until.elementLocated(By.css('.sidebar-footer .button--ghost')), 5000);
    await driver.executeScript("arguments[0].click();", logoutBtn);

    // Wait until logged out
    await driver.wait(until.urlContains('/login'), 5000);

    // Attempt direct URL access to dashboard
    await driver.get(`${BASE_URL}#/app/dashboard`);

    // We should be redirected immediately to login
    await driver.wait(until.urlContains('/login'), 5000);

    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login'), 'User should be redirected to login when accessing protected route after logout');
  });
});
