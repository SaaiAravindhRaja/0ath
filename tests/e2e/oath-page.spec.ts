import { expect, test } from "@playwright/test";

test("oath page shows judge scorecard and receipt", async ({ page }) => {
  await page.goto("/oaths/oath_0ath_launch");
  await expect(page.getByRole("heading", { name: "Judge scorecard" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Settlement receipt" })).toBeVisible();
  await expect(page.getByText(/receipt pending/i)).toBeVisible();
});
