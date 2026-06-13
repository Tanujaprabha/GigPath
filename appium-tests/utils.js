import { Builder } from 'selenium-webdriver';
import seleniumCommand from 'selenium-webdriver/lib/command.js';
import path from 'path';
import fs from 'fs';

const { Command } = seleniumCommand;

export async function setupAppiumDriver() {
  const apkPath = path.resolve(process.cwd(), 'android/app/build/outputs/apk/debug/app-debug.apk');
  
  if (!fs.existsSync(apkPath)) {
    throw new Error(`APK not found at ${apkPath}. Please build the Android app first using 'npm run build && npx cap sync android' and then build the APK in Android Studio or via Gradle.`);
  }

  const capabilities = {
    browserName: '', // Satisfies selenium-webdriver local check without triggering Appium to open Chrome
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': apkPath,
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 3600,
    'appium:chromedriverExecutableDir': path.resolve(process.cwd(), 'appium-tests/chromedrivers'),
  };

  console.log('Starting Appium driver and launching app...');
  const driver = await new Builder()
    .usingServer('http://127.0.0.1:4723/')
    .withCapabilities(capabilities)
    .build();

  // Inject Appium's custom endpoints into selenium-webdriver
  driver.getExecutor().defineCommand('getContexts', 'GET', '/session/:sessionId/contexts');
  driver.getExecutor().defineCommand('getCurrentContext', 'GET', '/session/:sessionId/context');
  driver.getExecutor().defineCommand('switchContext', 'POST', '/session/:sessionId/context');
  driver.getExecutor().defineCommand('setNetworkConnection', 'POST', '/session/:sessionId/network_connection');
  driver.getExecutor().defineCommand('getNetworkConnection', 'GET', '/session/:sessionId/network_connection');

  // Wait a moment for the Capacitor app to fully load the WebView
  await driver.sleep(5000);

  console.log('Fetching true Appium contexts...');
  
  try {
    const currentContext = await driver.execute(new Command('getCurrentContext'));
    console.log(`Current context before switch: ${currentContext}`);

    const contexts = await driver.execute(new Command('getContexts'));
    console.log('All available contexts:', contexts);

    let targetContext = null;
    if (contexts && contexts.length > 0) {
      // Prefer WEBVIEW, fallback to CHROMIUM
      const webviewContext = contexts.find(c => c.includes('WEBVIEW'));
      const chromiumContext = contexts.find(c => c === 'CHROMIUM');
      
      targetContext = webviewContext || chromiumContext;
      
      if (targetContext) {
        console.log(`Selected target context: ${targetContext}`);
        if (currentContext !== targetContext) {
          console.log(`Switching from ${currentContext} to ${targetContext}...`);
          await driver.execute(new Command('switchContext').setParameter('name', targetContext));
        } else {
          console.log(`Already in the target context: ${targetContext}`);
        }
      }
    }

    if (!targetContext) {
      console.warn('Could not find a valid web context (WEBVIEW or CHROMIUM). Contexts found:', contexts);
    } else {
      const newContext = await driver.execute(new Command('getCurrentContext'));
      console.log(`Current context after switch: ${newContext}`);
      
      console.log('Fetching available window handles (tabs/pages) in current context...');
      const handles = await driver.getAllWindowHandles();
      console.log(`Found ${handles.length} window handles:`, handles);
      
      let foundTargetPage = false;
      
      for (const handle of handles) {
        await driver.switchTo().window(handle);
        const currentUrl = await driver.getCurrentUrl();
        const pageTitle = await driver.getTitle();
        
        console.log(`- Handle: ${handle}`);
        console.log(`  URL:   ${currentUrl}`);
        console.log(`  Title: ${pageTitle}`);
        
        // Capacitor apps usually serve content from http://localhost or capacitor://localhost
        if (currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1') || currentUrl.includes('ionic://')) {
          console.log(`=> Found target Capacitor page! Selecting this window handle.`);
          foundTargetPage = true;
          break;
        }
      }
      
      if (!foundTargetPage) {
        console.warn('Could not find a page matching localhost. Staying on the last inspected window.');
      } else {
        console.log('Verifying final web context state...');
        const readyState = await driver.executeScript('return document.readyState');
        console.log(`- document.readyState: ${readyState}`);
      }
    }
  } catch (err) {
    console.error('Error during context switching:', err);
  }

  return driver;
}

export async function takeScreenshotOnFailure(driver, testContext) {
  if (testContext.currentTest.state === 'failed') {
    const reportsDir = path.resolve('reports', 'appium', 'screenshots');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const safeTitle = testContext.currentTest.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(reportsDir, `${safeTitle}_${timestamp}.png`);
    
    try {
      const image = await driver.takeScreenshot();
      fs.writeFileSync(screenshotPath, image, 'base64');
      console.log(`\n📸 Appium Screenshot saved: ${screenshotPath}`);
      testContext.currentTest.screenshotPath = screenshotPath;
    } catch (err) {
      console.error('Failed to take Appium screenshot:', err);
    }
  }
}

export async function performLogin(driver, email = 'test@example.com', password = 'testpassword123') {
  const { until, By } = await import('selenium-webdriver');
  await driver.executeScript('window.location.hash = "#/login"');
  
  const emailInput = await driver.wait(until.elementLocated(By.css('input[type="email"]')), 15000);
  const passwordInput = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 15000);
  const loginBtn = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 15000);

  await emailInput.clear();
  await passwordInput.clear();
  await emailInput.sendKeys(email);
  await passwordInput.sendKeys(password);
  
  // Hide keyboard to prevent click interception
  await driver.executeScript("document.activeElement.blur();");
  await driver.sleep(500);
  
  // Use JS click to absolutely ensure it bypasses any overlaps
  await driver.executeScript("arguments[0].click();", loginBtn);
  
  // Wait for navigation away from login
  await driver.wait(until.urlContains('/dashboard'), 15000);
}

let manualModeTriggered = false;

export async function toggleNetwork(driver, mode, manualPrompt) {
  // mode: 'offline' or 'online'
  const type = mode === 'offline' ? 1 : 6;
  
  if (!manualModeTriggered) {
    try {
      const { Command } = await import('selenium-webdriver/lib/command.js');
      // For Appium 2.x, the parameter is sometimes "type" instead of "parameters" or passed directly
      // but UIAutomator2 driver spec expects { parameters: { type: 1 } }
      await driver.execute(new Command('setNetworkConnection').setParameter('parameters', { type }));
      console.log(`[Network] Successfully switched to ${mode} mode automatically via Appium.`);
      return 'automatic';
    } catch (err) {
      console.warn(`\n⚠️ Appium network control blocked by Android security: ${err.message}`);
      console.warn(`Switching to manual network mode for the rest of the suite.`);
      manualModeTriggered = true;
    }
  }

  // If we reach here, we are in manual mode
  console.log(`\n======================================================`);
  console.log(`🛑 MANUAL ACTION REQUIRED: ${manualPrompt}`);
  console.log(`======================================================`);
  console.log(`Waiting 15 seconds for you to toggle the setting...`);
  await driver.sleep(15000);
  return 'manual';
}
