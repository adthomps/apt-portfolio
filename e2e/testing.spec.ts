import { test, expect } from '@playwright/test';

/**
 * Testing section dialog flows -> launch a sandbox route.
 */

test('open Test Links dialog and launch a test page', async ({ page }) => {
  await page.goto('/');

  // Navigate to Testing section
  await page.getByRole('button', { name: 'Testing' }).click();
  await expect(page.getByRole('heading', { name: /testing framework/i })).toBeVisible();

  // Open the first Test Links dialog
  const testLinksBtn = page.getByRole('button', { name: /test links/i }).first();
  await testLinksBtn.click();

  // Dialog title should be visible
  await expect(page.getByRole('heading', { name: /test links/i })).toBeVisible();

  // Launch a test
  await page.getByRole('button', { name: /launch test/i }).first().click();

});
