import { test } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

const PAGES = ["/", "/about", "/contact", "/system", "/projects/project-one", "/personal/hobbies", "/404-not-found"];

for (const path of PAGES) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.evaluate(() => localStorage.setItem("psp:boot-played", "1")).catch(() => {});
    await page.goto(path);
    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: { rules: { "color-contrast": { enabled: true } } },
    });
  });
}
