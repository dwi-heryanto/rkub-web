import { expect, test } from "@playwright/test";

test("catalog page matches the stitched structure", async ({ page }) => {
  await page.goto("/catalog");

  // Compact header: h1 for the default (rental) tab
  await expect(page.getByRole("heading", { name: "Dress for the Occasion", level: 1 })).toBeVisible();

  // Tab pill nav with aria-current on the active tab
  const tabNav = page.getByRole("navigation", { name: "Catalog categories" });
  await expect(tabNav).toBeVisible();
  await expect(tabNav.getByRole("link", { name: "Rental" })).toHaveAttribute("aria-current", "page");
  await expect(tabNav.getByRole("link", { name: "Fabrics" })).toBeVisible();

  // Grid cards render
  await expect(page.locator("article").first()).toBeVisible();

  await expect(page).toHaveScreenshot("catalog-page.png", {
    animations: "disabled",
    fullPage: true,
  });
});

test("catalog sidebar is visible at desktop viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/catalog");

  // Sidebar with filter groups visible at desktop
  await expect(page.getByRole("complementary").getByText("Filters", { exact: true })).toBeVisible();
  await expect(page.getByRole("group", { name: "Region" })).toBeVisible();
});

test("catalog tab nav switches tabs and updates heading", async ({ page }) => {
  await page.goto("/catalog");

  const tabNav = page.getByRole("navigation", { name: "Catalog categories" });
  await tabNav.getByRole("link", { name: "Fabrics" }).click();

  await expect(page).toHaveURL(/\/catalog\?tab=fabric/);
  await expect(page.getByRole("heading", { name: "Explore Fabrics", level: 1 })).toBeVisible();
  await expect(tabNav.getByRole("link", { name: "Fabrics" })).toHaveAttribute("aria-current", "page");
});