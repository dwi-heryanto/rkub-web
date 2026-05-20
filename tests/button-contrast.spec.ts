import { test } from '@playwright/test';

type AxeNode = { target: string[] };
type AxeViolation = { id: string; description: string; nodes: AxeNode[] };
type AxeRunResult = { violations?: AxeViolation[] };

test('compute contrast ratio for Browse Catalog button', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.6.3/axe.min.js' });

  const result = await page.evaluate(async (): Promise<
    | { found: false }
    | { found: true; fg: string; bg: string; ratio: number; axe: AxeRunResult }
  > => {
    function srgbToLinear(c: number) {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    function luminance(r: number, g: number, b: number) {
      return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
    }
    function contrastRatio(rgbA: string, rgbB: string) {
      const parse = (s: string) => s.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
      const [r1, g1, b1] = parse(rgbA);
      const [r2, g2, b2] = parse(rgbB);
      const L1 = luminance(r1, g1, b1);
      const L2 = luminance(r2, g2, b2);
      const lighter = Math.max(L1, L2);
      const darker = Math.min(L1, L2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    const btn = Array.from(document.querySelectorAll('button')).find((b) => (b.textContent || '').trim().includes('Browse Catalog')) as HTMLElement | null;
    if (!btn) return { found: false };
    const cs = window.getComputedStyle(btn);
    // get effective foreground color
    const rawFg = cs.color;
    // find background color by walking up until non-transparent
    let bgEl: HTMLElement | null = btn;
    let rawBg = '';
    while (bgEl && bgEl !== document.documentElement) {
      const bgcs = window.getComputedStyle(bgEl);
      const b = bgcs.backgroundColor;
      if (b && b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent') { rawBg = b; break; }
      bgEl = bgEl.parentElement;
    }
    if (!rawBg) rawBg = window.getComputedStyle(document.documentElement).backgroundColor || 'rgb(255,255,255)';

    function normalizeColorViaCanvas(colorStr: string) {
      const cvs = document.createElement('canvas');
      cvs.width = 1; cvs.height = 1;
      const ctx = cvs.getContext('2d');
      if (!ctx) return 'rgb(255, 255, 255)';
      ctx.fillStyle = colorStr;
      // reading back ctx.fillStyle returns a normalized string like 'rgb(r, g, b)'
      return ctx.fillStyle as string;
    }

    const fg = normalizeColorViaCanvas(rawFg);
    const bg = normalizeColorViaCanvas(rawBg);

    const axe = (window as Window & { axe: { run: (node: HTMLElement, options: unknown) => Promise<AxeRunResult> } }).axe;
    const axeResult = await axe.run(btn, { runOnly: { type: 'rule', values: ['color-contrast'] } });
    return { found: true, fg, bg, ratio: contrastRatio(fg, bg), axe: axeResult };
  });

  if (!result.found) {
    console.log('Button not found on the page');
    return;
  }
  console.log('Button foreground:', result.fg, 'background:', result.bg, 'contrastRatio:', isNaN(result.ratio) ? result.ratio : result.ratio.toFixed(2));
  if (result.axe && result.axe.violations && result.axe.violations.length) {
    console.log('axe color-contrast violations:');
    // print id and failure summary and nodes count
    for (const v of result.axe.violations) {
      console.log(`- ${v.id}: ${v.description} -- nodes: ${v.nodes.length}`);
      for (const node of v.nodes) {
        console.log('  target:', node.target.join(', '));
      }
    }
  } else {
    console.log('No axe color-contrast violations reported for this element.');
  }
});
