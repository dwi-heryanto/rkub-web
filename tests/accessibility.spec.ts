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
