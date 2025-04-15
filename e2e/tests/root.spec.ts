import { test, expect } from '@playwright/test';

test('Homepage displays correctly', async ({ page }) => {
  await page.goto('/');

  // Check title
  await expect(page).toHaveTitle('kaza.ooo');

  // Verify main content visibility
  await expect(page.locator('main')).toBeVisible();

  // Verify header text
  await expect(page.getByRole('heading', { name: /Hello, I'm K/ })).toBeVisible();
});

test('Navigation functions properly', async ({ page }) => {
  await page.goto('/');

  // Scroll to About section
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();

  // Scroll to Projects section
  await page.getByRole('link', { name: 'Projects' }).click();
  await expect(page.getByRole('heading', { name: 'My Projects' })).toBeVisible();

  // Navigate to Blog page
  await page.getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL(/.*blog/);
});

test('Contact form input and validation', async ({ page }) => {
  await page.goto('/');

  // Scroll to Contact section
  await page.getByRole('link', { name: 'Contact' }).click();

  // Test form input
  await page.getByLabel('Your email').fill('playwright-test@example.com');
  await page.getByLabel('Subject').fill('Playwright Test Subject');
  await page.getByLabel('Message').fill('This is a playwright test message');

  // Click send button
  const sendButton = page.getByRole('button', { name: 'Send Message' });
  await sendButton.click();

  // Wait for response
  await page.waitForResponse(response =>
    response.url().includes('/api/send') &&
    response.status() === 200
  );

  // Verify success button text change
  await expect(page.getByRole('button', { name: 'Email sent!' })).toBeVisible();
});