require('dotenv').config();
const { test, expect, chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Capture XHR response and save it', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Use credentials and other variables from environment variables
  const username = process.env.QASE_USERNAME;
  const password = process.env.QASE_PASSWORD;
  const code = process.env.PROJECT_CODE;
  const id = process.env.RUN_ID;

  // Set a higher timeout
  test.setTimeout(60000);

  try {
    // Login to Qase
    await page.goto('https://app.qase.io/login');
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for navigation and confirm login
    await page.waitForNavigation({ waitUntil: 'networkidle' });
    console.log('Successfully logged in.');

    // Step 1: Get the hash from the /v1/project/<code>/run/<id>/dashboard/info endpoint
    const infoResponse = await page.evaluate(async ({ code, id }) => {
      try {
        const response = await fetch(`https://app.qase.io/v1/project/${code}/run/${id}/dashboard/info`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          }
        });
        return response.json();
      } catch (error) {
        console.error('Failed to fetch info:', error);
        return { hash: null };
      }
    }, { code, id });

    const hash = infoResponse.hash;
    if (!hash) {
      throw new Error('Failed to retrieve hash from /dashboard/info endpoint.');
    }

    console.log(`Retrieved hash: ${hash}`);

    // Step 2: Navigate to the specified dashboard URL using the hash
    await page.goto(`https://app.qase.io/run/${code}/dashboard/${id}`);

    // Set up request interception for capturing XHR requests
    const treeRequestPromise = new Promise((resolve, reject) => {
      page.on('response', async (response) => {
        if (response.url().includes(`/v2/run/${hash}/dashboard/tree`)) {
          try {
            console.log(`Captured response from URL: ${response.url()}`);
            const jsonResponse = await response.json();
            resolve(jsonResponse);
          } catch (error) {
            reject(error);
          }
        }
      });

      // Optional: Reject the promise if no response is captured within a certain timeout
      setTimeout(() => reject(new Error('XHR request timed out')), 60000);
    });

    // Wait for the XHR request to be captured
    const treeResponse = await treeRequestPromise;

    // Save the response to a file
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const filePath = path.join(outputDir, 'tree_response.json');
    fs.writeFileSync(filePath, JSON.stringify(treeResponse, null, 2));

    console.log(`Tree response saved to ${filePath}`);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
});