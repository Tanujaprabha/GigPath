const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:5173/GigPath/#/signup');
    await driver.wait(until.elementLocated(By.css('input[name="name"]')), 5000).sendKeys('Test User');
    await driver.wait(until.elementLocated(By.css('input[name="email"]')), 5000).sendKeys('test_' + Date.now() + '@example.com');
    await driver.wait(until.elementLocated(By.css('input[name="password"]')), 5000).sendKeys('password123');
    await driver.wait(until.elementLocated(By.css('input[name="confirmPassword"]')), 5000).sendKeys('password123');
    await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000).click();
    await driver.sleep(2000);
    
    try {
      let alert = await driver.switchTo().alert();
      console.log('ALERT TEXT:', await alert.getText());
      await alert.accept();
    } catch(e) {
      console.log('NO ALERT PRESENT:', e.message);
    }
  } catch(e) {
    console.log('ERROR:', e.message);
  } finally {
    await driver.quit();
  }
})();
