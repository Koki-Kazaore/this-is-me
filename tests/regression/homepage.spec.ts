import { test, expect } from '@playwright/test';

test.describe('Homepage Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have working links', async ({ page }) => {
    const links = page.locator('a');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        await expect(link).not.toHaveAttribute('href', '');
      }
    }
  });

  test('should be responsive', async ({ page }) => {
    // Check mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileNav = page.locator('.mobile-nav');
    await expect(mobileNav).toBeVisible();

    // Check tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    const tabletNav = page.locator('.tablet-nav');
    await expect(tabletNav).toBeVisible();

    // Check desktop view
    await page.setViewportSize({ width: 1440, height: 900 });
    const desktopNav = page.locator('.desktop-nav');
    await expect(desktopNav).toBeVisible();
  });
});