import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import 'chromedriver';

async function testDriver() {
  console.log("Starting driver build...");
  try {
    let options = new chrome.Options();
    options.addArguments('--headless=new'); // Trying new headless mode
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    console.log("Driver built successfully!");
    await driver.quit();
  } catch (err) {
    console.error("Failed:", err);
  }
}

testDriver();
