import { expect, test } from "@playwright/test";

test("judge mode exposes the full verification path", async ({ page }) => {
  await page.goto("/judge");
  await expect(page.getByRole("heading", { name: /Ship a public Arc-notarized proof market/i })).toBeVisible();
  await expect(page.getByText(/single-page verification path/i)).toBeVisible();
  await expect(page.getByText(/Receipt emitted on Arc Testnet/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open ArcScan receipt/i }).first()).toBeVisible();
});
