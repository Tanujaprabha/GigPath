import { By, until } from 'selenium-webdriver';
import assert from 'assert';
import { setupDriver, takeScreenshotOnFailure, performLogin, BASE_URL } from '../utils.js';

describe('TC-PROF: Profile', function () {
  let driver;

  before(async function () {
    driver = await setupDriver();
    await performLogin(driver);
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    await takeScreenshotOnFailure(driver, this);
  });

  it('TC-PROF-01: View Profile - should load profile page', async function () {
    await driver.get(`${BASE_URL}#/app/profile`);
    await driver.wait(until.urlContains('/profile'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/profile'), 'Profile page loaded');
  });

  it('TC-PROF-02: Edit Profile - should allow edits', async function () {
    await driver.get(`${BASE_URL}#/app/profile/edit`);
    await driver.wait(until.urlContains('/profile/edit'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('/profile/edit'), 'Edit profile page loaded');
  });
});
