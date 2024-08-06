import { test, expect } from '@playwright/test';
import {qase} from "playwright-qase-reporter";

test('has title', async ({ page }) => {
//  qase.id(1);  #[QASE] please note, that you will need to have a test case with id: 2 in your project repository
  qase.title("has title")

  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
//  qase.id(2);
  qase.title("get started link"); 
  //[QASE] qase.title() will work only when qase.id() is not used. This will create a new test case with the specified title.

  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});