import { test, expect } from '@playwright/test';

test.describe('SCRUM-T1: ホームページの基本表示確認', () => {
  test('ホームページが正しく表示されること', async ({ page }) => {
    await page.goto('/');

    // ヘッダーの存在確認
    await expect(page.locator('header')).toBeVisible();

    // ナビゲーションの存在確認
    await expect(page.locator('nav')).toBeVisible();

    // フッターの存在確認
    await expect(page.locator('footer')).toBeVisible();
  });
});