import { test, expect } from "@playwright/test";

const widths = [324, 375, 640];

for (const width of widths) {
  test(`Blog list has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/blog", { waitUntil: "networkidle" });
    await expect(page.locator("article").first()).toBeVisible({ timeout: 10000 });

    // 1) No page-level horizontal scroll
    const noPageOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth
    );
    expect(noPageOverflow, `page overflows at ${width}px`).toBe(true);

    // 2) No card/text element extends past the viewport right edge
    const offenders = await page.evaluate(() => {
      const els = Array.from(
        document.querySelectorAll(
          'a[href^="/blog/"], article, article h2, article p'
        )
      );
      return els
        .filter(
          (el) => el.getBoundingClientRect().right > window.innerWidth + 1
        )
        .map((el) => el.tagName + "." + (el.className || ""));
    });
    expect(offenders, `overflowing elements at ${width}px`).toEqual([]);
  });
}
