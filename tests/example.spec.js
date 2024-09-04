const { test, expect } = require('@playwright/test');

test.describe('Test suite', () => {
  
  test('Test 1: Simple failing test', () => {
    expect(true).toBe(false);
  });

  test('Test 2: Simple passing test', () => {
    expect(true).toBe(true);
  });

  test('Test 3: Assertion with number comparison', () => {
    expect(1 + 1).toBe(2);
  });

  test('Test 4: String matching test', () => {
    expect('hello').toBe('hello');
  });

  test('Test 5: Object equality test', () => {
    const obj = { a: 1, b: 2 };
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  test('Test 6: Array contains test', () => {
    const arr = [1, 2, 3];
    expect(arr).toContain(2);
  });

  test('Test 7: Boolean check', () => {
    expect(true).toBeTruthy();
  });

  test('Test 8: Not Null test', () => {
    const value = 'Playwright';
    expect(value).not.toBeNull();
  });

  test('Test 9: Undefined value test', () => {
    let value;
    expect(value).toBeUndefined();
  });

  test('Test 10: Async test with steps', async () => {
    await test.step('Step 1: Basic assertion', async () => {
      expect(5).toBeGreaterThan(1);
    });
    await test.step('Step 2: Another basic assertion', async () => {
      expect(10).toBeLessThan(100);
    });
    expect('Playwright').toBe('Playwright');
  });
  
});