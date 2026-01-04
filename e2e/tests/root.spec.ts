import { test, expect } from "@playwright/test";

test("Homepage displays correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page).toHaveTitle("kaza.ooo");

  // Wait for main content
  await expect(page.locator("main")).toBeVisible({ timeout: 10000 });

  // Wait for hero section
  const heroSection = page.locator("section").first();
  await expect(heroSection).toBeVisible({ timeout: 10000 });

  // Wait for heading to be attached to DOM and any initial animations
  const headerText = page
    .getByRole("heading", { level: 1 })
    .getByText("Hello, I'm", { exact: false });

  // More reliable than waiting for visibility
  await expect(headerText).toBeVisible({ timeout: 10000 });
  await expect(headerText).toHaveText("Hello, I'm ", { timeout: 10000 });

  // Wait for the animated text to appear
  await expect(heroSection.locator(".index-module_type__E-SaG")).toBeVisible({
    timeout: 10000,
  });
});

test("Navigation functions properly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Scroll to About section and wait for animation
  await page.getByRole("link", { name: "About" }).click();

  // Wait for scroll animation to complete
  await page.waitForTimeout(500);

  const aboutSection = page.locator("#about");
  await expect(aboutSection).toBeInViewport({ timeout: 10000 });
  await expect(aboutSection).toBeVisible({ timeout: 10000 });

  // Wait for heading with more reliable selector
  const aboutHeading = page.getByRole("heading", {
    name: "About Me",
    level: 2,
  });
  await expect(aboutHeading).toBeVisible({ timeout: 10000 });
  await expect(aboutHeading).toBeVisible({ timeout: 10000 });

  // Scroll to Projects section and wait for animation
  await page.getByRole("link", { name: "Projects" }).click();
  const projectsSection = page.locator("#projects");
  await expect(projectsSection).toBeVisible({ timeout: 10000 });
  await expect(
    projectsSection.getByRole("heading", { name: "My Projects" })
  ).toBeVisible({ timeout: 10000 });

  // Wait for animation to complete
  await page.waitForTimeout(1000);

  // Navigate to Blog page
  await page.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/.*blog/);
});

test.skip("Contact form handles valid input successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Scroll to Contact section
  await page.getByRole("link", { name: "Contact" }).click();
  const contactSection = page.locator("#contact");
  await expect(contactSection).toBeVisible({ timeout: 10000 });

  // Test form input
  await page.getByLabel("Your email").fill("playwright-test@example.com");
  await page.getByLabel("Subject").fill("Playwright Test Subject");
  await page.getByLabel("Message").fill("This is a playwright test message");

  // Click send button and wait for the network request
  const sendButton = page.getByRole("button", { name: "Send Message" });
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/api/send") && response.status() === 200
    ),
    sendButton.click(),
  ]);

  // Wait for success message
  await expect(page.getByRole("button", { name: "Email sent!" })).toBeVisible({
    timeout: 10000,
  });
});

test.skip("Contact form validates required fields", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Scroll to Contact section
  await page.getByRole("link", { name: "Contact" }).click();
  const contactSection = page.locator("#contact");
  await expect(contactSection).toBeVisible({ timeout: 10000 });

  // Get form elements
  const emailInput = page.getByLabel("Your email");
  const subjectInput = page.getByLabel("Subject");
  const sendButton = page.getByRole("button", { name: "Send Message" });

  // Verify required attributes
  await expect(emailInput).toHaveAttribute("required", "");
  await expect(subjectInput).toHaveAttribute("required", "");

  // Try to submit empty form
  await sendButton.click();

  // Form should not be submitted (button should not be disabled)
  await expect(sendButton).not.toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Email sent!" })
  ).not.toBeVisible();

  // Fill only email and try to submit
  await emailInput.fill("test@example.com");
  await sendButton.click();

  // Form should still not be submitted
  await expect(sendButton).not.toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Email sent!" })
  ).not.toBeVisible();

  // Fill only subject and try to submit
  await emailInput.clear();
  await subjectInput.fill("Test Subject");
  await sendButton.click();

  // Form should still not be submitted
  await expect(sendButton).not.toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Email sent!" })
  ).not.toBeVisible();
});

test.skip("Contact form validates email format", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Scroll to Contact section
  await page.getByRole("link", { name: "Contact" }).click();
  const contactSection = page.locator("#contact");
  await expect(contactSection).toBeVisible({ timeout: 10000 });

  // Get form elements
  const emailInput = page.getByLabel("Your email");
  const subjectInput = page.getByLabel("Subject");
  const messageInput = page.getByLabel("Message");
  const sendButton = page.getByRole("button", { name: "Send Message" });

  // Test invalid email formats
  const invalidEmails = [
    "invalid-email",
    "invalid@",
    "@invalid.com",
    "invalid@.com",
    "invalid@com.",
    "@",
    "test@.com.",
  ];

  for (const invalidEmail of invalidEmails) {
    // Fill form with invalid email
    await emailInput.fill(invalidEmail);
    await subjectInput.fill("Test Subject");
    await messageInput.fill("Test Message");
    await sendButton.click();

    // Form should not be submitted with invalid email
    await expect(sendButton).not.toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Email sent!" })
    ).not.toBeVisible();
  }

  // Verify form works with valid email
  await emailInput.fill("valid@example.com");
  await sendButton.click();
  await expect(sendButton).toBeDisabled({ timeout: 10000 });
  await expect(page.getByRole("button", { name: "Email sent!" })).toBeVisible({
    timeout: 10000,
  });
});

test.skip("Contact form handles long input values", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Scroll to Contact section
  await page.getByRole("link", { name: "Contact" }).click();
  const contactSection = page.locator("#contact");
  await expect(contactSection).toBeVisible({ timeout: 10000 });

  // Test with long but valid inputs
  const longEmail =
    "very.long.email.address.test.123456789@really.long.domain.name.example.com";
  const longSubject = "A".repeat(100);
  const longMessage = "B".repeat(1000);

  // Fill form with long values
  await page.getByLabel("Your email").fill(longEmail);
  await page.getByLabel("Subject").fill(longSubject);
  await page.getByLabel("Message").fill(longMessage);

  // Submit form
  const sendButton = page.getByRole("button", { name: "Send Message" });
  await sendButton.click();

  // Form should still work with long inputs
  await expect(sendButton).toBeDisabled({ timeout: 10000 });
  await expect(page.getByRole("button", { name: "Email sent!" })).toBeVisible({
    timeout: 10000,
  });
});
