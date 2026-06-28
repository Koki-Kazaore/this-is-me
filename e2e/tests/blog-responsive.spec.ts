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

const detailUrls = ["/blog/7", "/blog/1"];
for (const url of detailUrls) {
  for (const width of [324, 375]) {
    test(`Blog detail ${url} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url, { waitUntil: "networkidle" });
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
      const noPageOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth
      );
      expect(noPageOverflow, `${url} page overflows at ${width}px`).toBe(true);
      // An element wider than the viewport is fine when it lives inside an
      // in-viewport horizontal scroll container (e.g. <pre>/<table> wrappers):
      // it scrolls inside its own box rather than widening the page. Only flag
      // elements that overflow WITHOUT such a containing scroll box.
      const offenders = await page.evaluate(() => {
        const inScrollBox = (el: Element) => {
          let p = el.parentElement;
          while (p) {
            const ovx = getComputedStyle(p).overflowX;
            if (
              (ovx === "auto" || ovx === "scroll") &&
              p.getBoundingClientRect().right <= window.innerWidth + 1
            ) {
              return true;
            }
            p = p.parentElement;
          }
          return false;
        };
        return Array.from(document.querySelectorAll("main, main *"))
          .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
          .filter((el) => !inScrollBox(el))
          .map((el) => el.tagName + "." + (el.className || ""));
      });
      expect(offenders, `overflowing elements on ${url} at ${width}px`).toEqual(
        []
      );
    });
  }
}
