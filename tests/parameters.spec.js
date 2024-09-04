import { qase } from 'playwright-qase-reporter';
const { test } = require('@playwright/test');

const values = ['Chrome', 'Safari', 'Firefox'];

// Note - Please ensure you map your test case Id from Qase in the qase.id() below. 
// Otherwise three different tests will be created

for (const value of values) {
  test(`Test with parameters: ${value}`, async ({ page }) => {
    qase.id(6352);
    qase.parameters({ 'parameter': value });
    await page.goto('https://example.com');
  });
}
