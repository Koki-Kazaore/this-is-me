import { test, expect } from '@playwright/test';

test.describe('SCRUM-T2: ナビゲーションメニューの動作確認', () => {
  test('ナビゲーションメニューが正しく機能すること', async ({ page }) => {
    await page.goto('/');

    // プロフィールページへの遷移確認
    await page.click('text=プロフィール');
    await expect(page).toHaveURL(/.*profile/);

    // ホームページへの遷移確認
    await page.click('text=ホーム');
    await expect(page).toHaveURL('/');
  });
});