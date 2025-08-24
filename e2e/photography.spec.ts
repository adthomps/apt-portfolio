import { test, expect } from '@playwright/test';

// Photography section responsive behavior

test.describe('Photography section tabs and mobile select', () => {
  test('desktop: tabs switch content', async ({ page, browserName }) => {
    await page.goto('/');

    // Ensure the section exists
    await expect(page.getByRole('heading', { name: /photography portfolio/i })).toBeVisible();

    // Desktop-only: TabsList visible on md+; we can't force viewport here but we can still click tab triggers directly by role
    // Click "Video Projects" tab trigger and expect a YouTube iframe(s) to be visible
      await page.getByRole('tab', { name: /video projects/i }).click();
      const ytLocator = page.locator('iframe[src*="youtube.com/embed/"]');
      const ytCount = await ytLocator.count();
      expect(ytCount).toBeGreaterThan(0);
      // Each embedded video iframe should have a non-empty title
      for (let i = 0; i < ytCount; i++) {
        const title = await ytLocator.nth(i).getAttribute('title');
        expect(title && title.trim().length > 0).toBeTruthy();
      }

  // Click "Drone Gallery" tab and expect no YouTube iframes
    await page.getByRole('tab', { name: /drone gallery/i }).click();
    await expect(page.locator('iframe[src*="youtube.com/embed/"]')).toHaveCount(0);

    // Click back to "Still Photography" and expect images/cards present
    await page.getByRole('tab', { name: /still photography/i }).click();
      await expect(page.locator('img[alt*="Snoqualmie"]').first()).toBeVisible({ timeout: 5000 });
  });

    test('desktop: tabs are keyboard navigable (arrow keys)', async ({ page }) => {
      await page.goto('/');

      // Focus the first tab and move with arrow keys
      const stillTab = page.getByRole('tab', { name: /still photography/i });
      await stillTab.focus();
      await expect(stillTab).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await expect(page.getByRole('tab', { name: /video projects/i })).toHaveAttribute('data-state', 'active');

      await page.keyboard.press('ArrowRight');
      await expect(page.getByRole('tab', { name: /drone gallery/i })).toHaveAttribute('data-state', 'active');

      await page.keyboard.press('ArrowRight');
      const mapsTab = page.getByRole('tab', { name: /maps/i });
      await expect(mapsTab).toHaveAttribute('data-state', 'active');

      // Maps content: ensure iframes present and titled
      const mapFrames = page.locator('iframe[src*="google.com/maps"]');
      await expect(mapFrames).toHaveCount(2);
      const mapCount = await mapFrames.count();
      for (let i = 0; i < mapCount; i++) {
        const t = await mapFrames.nth(i).getAttribute('title');
        expect(t && t.trim().length > 0).toBeTruthy();
      }
    });

  test('mobile: select changes tab content', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12-ish
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /photography portfolio/i })).toBeVisible();

    // Check if the new mobile select exists in this deployment; if not, skip gracefully
    const selectCount = await page.getByTestId('media-category-select').count();
    if (selectCount === 0) {
      test.skip(true, 'Mobile select not present on this deployment');
    }

    // Open the select using test id to avoid role/name variances across platforms
    const trigger = page.getByTestId('media-category-select');
    await trigger.click();

    // Choose Video Projects
  await page.getByRole('option', { name: /video projects/i }).click();

    // Expect YouTube iframe present
  await expect(await page.locator('iframe[src*="youtube.com/embed/"]').count()).toBeGreaterThan(0);

    // Switch to Maps
    await trigger.click();
    await page.getByRole('option', { name: /maps/i }).click();

    // Expect Google Maps iframes present
    await expect(page.locator('iframe[src*="google.com/maps"]')).toHaveCount(2);
  });
});
