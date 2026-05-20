import fs from "node:fs";
import path from "node:path";

import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/catalog?tab=rental",
  "/catalog?tab=traditional",
  "/catalog?tab=tools",
  "/catalog?tab=materials",
  "/services",
  "/products/premium-brocade-lace",
  "/products/premium-glass-seed-beads",
  "/products/gingher-shears-tool",
  "/products/premium-javanese-beskap",
];

type AxeNode = {
  target: string[];
  failureSummary?: string;
};

type AxeViolation = {
  id: string;
  impact?: string;
  help: string;
  nodes: AxeNode[];
};

type AxeResult = {
  violations: AxeViolation[];
};

test("full-site axe audit (wcag2a/wcag2aa)", async ({ page }) => {
  const reportLines: string[] = [];
  reportLines.push("# Full-site Axe Accessibility Report");
  reportLines.push("");
  reportLines.push(`Generated: ${new Date().toISOString()}`);
  reportLines.push("");
  reportLines.push("## Scope");
  for (const route of ROUTES) reportLines.push(`- \`${route}\``);
  reportLines.push("");

  let totalViolations = 0;

  for (const route of ROUTES) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    await page.addScriptTag({ url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.6.3/axe.min.js" });

    const result = await page.evaluate(async () => {
      const run = (window as unknown as { axe: { run: (ctx: Document, opts: unknown) => Promise<AxeResult> } }).axe.run;
      return run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } });
    });

    const violations = result.violations ?? [];
    totalViolations += violations.length;

    reportLines.push(`## ${route}`);
    reportLines.push(`Violations: **${violations.length}**`);

    if (!violations.length) {
      reportLines.push("- No violations found.");
      reportLines.push("");
      continue;
    }

    for (const violation of violations) {
      reportLines.push(`- \`${violation.id}\` (${violation.impact ?? "unknown"}) — ${violation.help}`);
      for (const node of violation.nodes.slice(0, 3)) {
        const target = node.target.join(" ");
        const summary = node.failureSummary?.replace(/\n/g, " ") ?? "No summary";
        reportLines.push(`  - Target: \`${target}\``);
        reportLines.push(`  - Summary: ${summary}`);
      }
    }
    reportLines.push("");
  }

  const outPath = path.join(process.cwd(), "test-results", "axe-fullsite-report.md");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, reportLines.join("\n"), "utf8");

  expect(totalViolations).toBe(0);
});

