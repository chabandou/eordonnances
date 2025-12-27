const { test, expect } = require('@playwright/test');
const fs = require('fs');
const pathLib = require('path');

const pages = ['/', '/diseases', '/diseases/add', '/print'];

/**
 * Selector hints per page to wait for stable content before screenshot
 */
const waitSelectors = {
  '/': '.menu',
  '/diseases': 'main, .menu',
  '/diseases/add': 'section, .menu',
  '/print': '.prescription',
};

for (const route of pages) {
  test.describe(route, () => {
    test(`snapshot ${route}`, async ({ page }, testInfo) => {
      const base = process.env.BASE_URL || 'http://localhost:3000';
      const url = base + route;

      const consoleLogs = [];
      page.on('console', (msg) => {
        consoleLogs.push(`${msg.type()}: ${msg.text()}`);
      });

      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait for known stable selector for this route; fallback to body
      const selector = waitSelectors[route] || 'body';
      try {
        await page.waitForSelector(selector, { timeout: 10000 });
      } catch (err) {
        // continue — we'll capture diagnostics below
      }

      // small pause for animations to settle
      await page.waitForTimeout(300);

      const name = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
      const project = testInfo.project.name.replace(/[^a-z0-9_-]/gi, '_');
      const screenshotName = `${name}-${project}.png`;

      try {
        await expect(page).toHaveScreenshot(screenshotName, { fullPage: true });
      } catch (err) {
        // save diagnostics: screenshot (already saved by toHaveScreenshot failure), HTML and console logs
        const outDir = pathLib.join('tests', 'diagnostics');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        const htmlPath = pathLib.join(outDir, `${name}-${project}.html`);
        const consolePath = pathLib.join(outDir, `${name}-${project}-console.txt`);
        const html = await page.content();
        fs.writeFileSync(htmlPath, html, 'utf8');
        fs.writeFileSync(consolePath, consoleLogs.join('\n'), 'utf8');
        throw err; // rethrow so test reports failure
      }
    });
  });
}
