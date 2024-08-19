import { qase } from 'playwright-qase-reporter';
const { test, expect } = require('@playwright/test');

test.describe('Test suite', () => {
  test('Simple test', () => {
    qase.title('Example of simple test');
    expect(true).toBe(true);
  });

  test('Test with annotated fields', () => {
    qase.fields({ 'severity': 'high', 'priority': 'medium' });
    expect(true).toBe(true);
  });

  test('This syntax is still supported', () => {
    expect(true).toBe(true);
  });

  test('Running, but not reported to Qase', () => {
    qase.ignore();
    expect(true).toBe(true);
  });

  test('An Example Test with steps', async () => {
    await test.step('Step 1', async () => {
      expect(true).toBe(true);
    });
    await test.step('Step 2', async () => {
      expect(true).toBe(false);
    });
    expect(true).toBe(true);
  });
});

