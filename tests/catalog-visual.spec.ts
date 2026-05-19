import { expect, test } from "@playwright/test";

test("catalog page matches the stitched structure", async ({ page }) => {
  await page.goto("/catalog");

  await expect(page.getByRole("heading", { name: "Dress for the Occasion" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Browse by rental style, size, and occasion" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Clear all" })).toBeVisible();
  await expect(page).toHaveScreenshot("catalog-page.png", {
    animations: "disabled",
    fullPage: true,
  });
});