import { test, expect } from '@playwright/test';

// Optional Axe-core accessibility scan. If @axe-core/playwright is not installed, skip gracefully.

test.describe('Automated accessibility scan (axe-core)', () => {
  test('home has no WCAG A/AA detectable violations (if axe available)', async ({ page }) => {
    await page.goto('/');

    let AxeBuilder: typeof import('@axe-core/playwright').default | null = null;
    try {
      // Dynamically import to avoid hard dependency
      ({ default: AxeBuilder } = await import('@axe-core/playwright'));
    } catch (e) {
      test.skip(true, 'Skipping axe-core scan: @axe-core/playwright not installed');
      return;
    }

    const results = await new AxeBuilder!({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(
      results.violations,
      `Accessibility violations found: ${results.violations.map((v) => v.id).join(', ')}`
    )
      .toEqual([]);
  });
});
