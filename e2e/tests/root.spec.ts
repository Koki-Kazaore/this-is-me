import { test, expect } from '@playwright/test';

test('Homepage displays correctly', async ({ page }) => {
  // Navigate to homepage and wait for network idle
  await page.goto('/', { waitUntil: 'networkidle' });

  // Check title
  await expect(page).toHaveTitle('kaza.ooo');

  // Verify main content visibility with increased timeout
  await expect(page.locator('main')).toBeVisible({ timeout: 10000 });

  // Wait for hero section to be visible
  const heroSection = page.locator('section').first();
  await expect(heroSection).toBeVisible({ timeout: 10000 });

  // Wait for animation to complete
  await page.waitForTimeout(1000);

  // Verify header text with increased timeout
  const headerText = heroSection.locator('h1 span').first();
  await expect(headerText).toBeVisible({ timeout: 10000 });
  await expect(headerText).toHaveText('Hello, I\'m ', { timeout: 10000 });

  // Wait for the animated text to appear
  await expect(
    heroSection.locator('.index-module_type__E-SaG')
  ).toBeVisible({ timeout: 10000 });
});

test('Navigation functions properly', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Scroll to About section and wait for animation
  await page.getByRole('link', { name: 'About' }).click();
  const aboutSection = page.locator('#about');
  await expect(aboutSection).toBeVisible({ timeout: 10000 });
  await expect(aboutSection.getByRole('heading', { name: 'About Me' })).toBeVisible({ timeout: 10000 });

  // Wait for animation to complete
  await page.waitForTimeout(1000);

  // Scroll to Projects section and wait for animation
  await page.getByRole('link', { name: 'Projects' }).click();
  const projectsSection = page.locator('#projects');
  await expect(projectsSection).toBeVisible({ timeout: 10000 });
  await expect(projectsSection.getByRole('heading', { name: 'My Projects' })).toBeVisible({ timeout: 10000 });

  // Wait for animation to complete
  await page.waitForTimeout(1000);

  // Navigate to Blog page
  await page.getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL(/.*blog/);
});

test('Contact form input and validation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Scroll to Contact section
  await page.getByRole('link', { name: 'Contact' }).click();
  const contactSection = page.locator('#contact');
  await expect(contactSection).toBeVisible({ timeout: 10000 });

  // Test form input
  await page.getByLabel('Your email').fill('playwright-test@example.com');
  await page.getByLabel('Subject').fill('Playwright Test Subject');
  await page.getByLabel('Message').fill('This is a playwright test message');

  // Click send button
  const sendButton = page.getByRole('button', { name: 'Send Message' });
  await sendButton.click();

  // Wait for button to be disabled (indicating form submission)
  await expect(sendButton).toBeDisabled({ timeout: 10000 });

  // Wait for success message
  await expect(
    page.getByRole('button', { name: 'Email sent!' })
  ).toBeVisible({ timeout: 10000 });
});