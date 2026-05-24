import { expect, test } from "@playwright/test";

test("dashboard renders traction state", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "0ath dashboard" })).toBeVisible();
  await expect(page.getByText(/traction gate met/i)).toBeVisible();
});
