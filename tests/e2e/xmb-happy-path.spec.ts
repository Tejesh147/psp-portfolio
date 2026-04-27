import { test, expect } from "@playwright/test";

test("user lands, navigates to a project via keyboard, and arrives", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("psp:boot-played", "1"));
  await page.reload();
  // Wait for XMB to hydrate
  await page.waitForSelector("[class*='subitem']");
  await page.keyboard.press("Enter");
  await page.waitForURL(/\/projects\//);
  const heading = await page.locator("h1").first();
  await expect(heading).toBeVisible();
});

test("ArrowRight then Enter navigates to Personal/hobbies", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("psp:boot-played", "1"));
  await page.reload();
  // Wait for XMB to hydrate
  await page.waitForSelector("[class*='subitem']");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await page.waitForURL(/\/personal\//);
});

test("XMB renders sub-items for the default category", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("psp:boot-played", "1"));
  await page.reload();
  await expect(page.getByText("[STUB] Project One")).toBeVisible();
});
