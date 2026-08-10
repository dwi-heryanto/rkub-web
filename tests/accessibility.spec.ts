import { test, expect } from '@playwright/test';

type AxeNode = { target: string[] };
type AxeViolation = { id: string; nodes: AxeNode[] };
type AxeRunResult = { violations?: AxeViolation[] };

test('home and product pages have sufficient color contrast', async ({ page }) => {
  // Home page
  await page.goto('/');
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.6.3/axe.min.js' });
  const home = await page.evaluate(async (): Promise<AxeRunResult> => {
    const axe = (window as Window & { axe: { run: (node: Document, options: unknown) => Promise<AxeRunResult> } }).axe;
    return await axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast'] } });
  });
  if (home.violations && home.violations.length) {
    console.log('Home contrast violations:', home.violations.map((v) => ({ id: v.id, nodes: v.nodes.length })));
  }
  expect(home.violations?.length ?? 0).toBe(0);

  // Product page (existing rental item)
  await page.goto('/products/kebaya-bali-rental');
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.6.3/axe.min.js' });
  const prod = await page.evaluate(async (): Promise<AxeRunResult> => {
    const axe = (window as Window & { axe: { run: (node: Document, options: unknown) => Promise<AxeRunResult> } }).axe;
    return await axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast'] } });
  });
  if (prod.violations && prod.violations.length) {
    console.log('Product contrast violations:', prod.violations.map((v) => ({ id: v.id, nodes: v.nodes.length })));
  }
  expect(prod.violations?.length ?? 0).toBe(0);
});

test('catalog filter sheet opens, closes with Escape, and applies filters', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/catalog');

  const dialog = page.getByRole('dialog', { name: 'Catalog filters' });

  // Open the filter sheet from the bottom action bar
  await page.getByRole('button', { name: 'Filters' }).click();
  await expect(dialog).toBeVisible();

  // Escape closes the sheet
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  // Reopen and click a filter chip → URL gains the param and the sheet closes
  await page.getByRole('button', { name: 'Filters' }).click();
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Bali' }).click();
  await expect(page).toHaveURL(/[?&]region=Bali/);
  await expect(dialog).toBeHidden();
});
