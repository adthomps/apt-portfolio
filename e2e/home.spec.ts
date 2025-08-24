import { test, expect } from '@playwright/test';

/**
 * Basic smoke tests for the home page.
 */

test('home renders key sections and theme toggles', async ({ page }) => {
  await page.goto('/');

  // Sections are visible
  await expect(page.getByRole('heading', { name: /testing framework/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /blogs & podcasts/i })).toBeVisible();

  // Theme toggle works (button is present and clickable)
  // Try all possible aria-labels for the theme toggle
  const labels = [
    'Switch to dark mode',
    'Switch to system mode',
    'Switch to light mode'
  ];
  let found = false;
  for (const label of labels) {
    const toggle = page.getByRole('button', { name: label });
    try {
      await expect(toggle).toBeVisible({ timeout: 1000 });
      await toggle.click();
      found = true;
      break;
    } catch {
      // ignore if this specific toggle state isn't present
    }
  }
  expect(found).toBeTruthy();
});

test('navigation scrolls to Blogs & Podcasts section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Blogs & Podcasts' }).click();
  await expect(page.getByRole('heading', { name: /blogs & podcasts/i })).toBeVisible();
});

test('home has basic accessibility landmarks and headings', async ({ page }) => {
  await page.goto('/');

  // Landmarks present
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible(); // footer

  // Main landmark: our Index wraps sections inside <main>
  await expect(page.getByRole('main')).toBeVisible();

  // Single H1 on the page inside hero
  const h1s = page.getByRole('heading', { level: 1 });
  await expect(h1s).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1, name: /adam thompson/i })).toBeVisible();

  // Logo image has alt text
  await expect(page.getByRole('img', { name: /apt portfolio logo/i })).toBeVisible();

  // Key section headings are visible by role
  await expect(page.getByRole('heading', { name: /photography portfolio/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /blogs & podcasts/i })).toBeVisible();
});
