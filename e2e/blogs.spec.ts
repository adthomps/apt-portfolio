import { test, expect } from '@playwright/test';

/**
 * Blog list -> content detail navigation.
 */

test('open a blog/podcast detail and return back', async ({ page }) => {
  await page.goto('/');

  // Navigate to Blogs section
  await page.getByRole('button', { name: 'Blogs & Podcasts' }).click();
  await expect(page.getByRole('heading', { name: /blogs & podcasts/i })).toBeVisible();

  // Open the first item (either Read More or Listen)
  const openDetail = page.getByRole('button', { name: /read more|listen/i }).first();
  await openDetail.click();

  // On detail page, the main H1 should be visible
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // Back to list
  await page.getByRole('button', { name: /back/i }).click();
  await expect(page.getByRole('heading', { name: /blogs & podcasts/i })).toBeVisible();
});
