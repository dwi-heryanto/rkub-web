import { test } from '@playwright/test';

test('scan all buttons for color-contrast issues', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const results = await page.evaluate(() => {
    function srgbToLinear(c: number) {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    function luminance(r: number, g: number, b: number) {
      return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
    }
    function contrastRatioRGB(rgb1: [number, number, number], rgb2: [number, number, number]) {
      const L1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
      const L2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
      const lighter = Math.max(L1, L2);
      const darker = Math.min(L1, L2);
      return (lighter + 0.05) / (darker + 0.05);
    }
    function hexToRgb(hex: string): [number, number, number] {
      if (hex.startsWith('#')) hex = hex.slice(1);
      if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return [r, g, b];
    }
    function normalizeViaCanvas(colorStr: string) {
      const cvs = document.createElement('canvas');
      const ctx = cvs.getContext('2d');
      if (!ctx) return '#ffffff';
      ctx.fillStyle = colorStr;
      return ctx.fillStyle as string; // usually '#rrggbb' or 'rgb(...)'
    }

    const buttons = Array.from(document.querySelectorAll('button')) as HTMLElement[];
    const out: Array<any> = [];
    for (const btn of buttons) {
      const txt = (btn.textContent || '').trim().slice(0, 60);
      const cs = window.getComputedStyle(btn);
      const rawFg = cs.color;
      // find background by walking up
      let bgEl: HTMLElement | null = btn;
      let rawBg = '';
      while (bgEl && bgEl !== document.documentElement) {
        const bgcs = window.getComputedStyle(bgEl);
        const b = bgcs.backgroundColor;
        if (b && b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent') { rawBg = b; break; }
        bgEl = bgEl.parentElement;
      }
      if (!rawBg) rawBg = window.getComputedStyle(document.documentElement).backgroundColor || 'rgb(255,255,255)';

      const fgNorm = normalizeViaCanvas(rawFg);
      const bgNorm = normalizeViaCanvas(rawBg);

      function parseNormalized(s: string) {
        if (s.startsWith('#')) return hexToRgb(s.slice(1));
        const m = s.match(/(\d+),\s*(\d+),\s*(\d+)/);
        if (m) return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
        return [255, 255, 255];
      }

      const fgRgb = parseNormalized(fgNorm);
      const bgRgb = parseNormalized(bgNorm);
      const ratio = contrastRatioRGB(fgRgb as [number, number, number], bgRgb as [number, number, number]);
      out.push({ text: txt, fg: fgNorm, bg: bgNorm, ratio });
    }
    return out;
  });

  // report any with ratio < 4.5
  const failures = results.filter((r: any) => r.ratio < 4.5);
  // eslint-disable-next-line no-console
  console.log('buttons scanned:', results.length, 'failures:', failures.length);
  for (const f of failures) {
    // eslint-disable-next-line no-console
    console.log(`- ${f.text} -> fg:${f.fg} bg:${f.bg} ratio:${f.ratio.toFixed(2)}`);
  }
});
