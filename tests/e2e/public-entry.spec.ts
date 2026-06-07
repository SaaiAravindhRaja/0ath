import { expect, test } from "@playwright/test";

test("public entry links to an oath", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Proof-of-ship markets/i })).toBeVisible();
  await page.getByRole("link", { name: /Open strongest oath/i }).click();
  await expect(page.getByRole("heading", { name: /Ship a public Arc-notarized proof market/i })).toBeVisible();
});
