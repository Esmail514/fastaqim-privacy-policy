import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Optional verification tool. The published website has no Playwright dependency.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const output = fileURLToPath(new URL('../verification/', import.meta.url));
const headersText = await readFile(resolve(root, '_headers'), 'utf8');
const securityHeaders = Object.fromEntries(headersText.split('\n').filter((line) => /^\s+[^:]+:/.test(line))
  .map((line) => { const index = line.indexOf(':'); return [line.slice(0, index).trim(), line.slice(index + 1).trim()]; }));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.ttf': 'font/ttf' };
const server = createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith('/privacy-policy/')) return response.writeHead(404).end();
    pathname = pathname.slice('/privacy-policy'.length);
    let path = resolve(root, '.' + pathname);
    if (path !== root && !path.startsWith(root + sep)) return response.writeHead(403).end();
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const data = await readFile(path);
    response.writeHead(200, { ...securityHeaders, 'Content-Type': types[extname(path)] || 'application/octet-stream' }).end(data);
  } catch { response.writeHead(404).end(); }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const base = `http://127.0.0.1:${server.address().port}/privacy-policy/`;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
const results = [];
try {
  for (const lang of ['ar', 'en']) {
    for (const [device, viewport] of Object.entries({ desktop: { width: 1440, height: 1000 }, mobile: { width: 390, height: 844 } })) {
      const context = await browser.newContext({ viewport, colorScheme: 'light', reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      const external = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('request', (request) => { if (!request.url().startsWith(base)) external.push(request.url()); });
      await page.goto(base + (lang === 'en' ? 'en/' : ''), { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('html').getAttribute('lang'), lang);
      assert.equal(await page.locator('html').getAttribute('dir'), lang === 'ar' ? 'rtl' : 'ltr');
      assert.equal(await page.locator('.policy-section').count(), 11);
      assert.ok((await page.locator('#retention strong').textContent()).includes(lang === 'ar' ? 'لا تُحذف' : 'not currently deleted'));
      assert.equal(await page.evaluate(() => document.cookie), '');
      assert.equal(await page.evaluate(() => localStorage.length), 0, 'No preference stored before the user chooses');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${lang} ${device} overflow`);
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.className), 'skip-link');
      await page.keyboard.press('Enter');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'policy-text');
      await page.goto(base + (lang === 'en' ? 'en/' : ''), { waitUntil: 'networkidle' });
      await page.screenshot({ path: resolve(output, `${lang}-${device}-light.png`), fullPage: false });
      await page.locator('[data-theme-toggle]').click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      assert.equal(await page.evaluate(() => localStorage.getItem('fastaqim-privacy-theme')), 'dark');
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      await page.screenshot({ path: resolve(output, `${lang}-${device}-dark.png`), fullPage: false });
      const tocButton = page.locator('[data-toc-toggle]');
      if (device === 'mobile') {
        assert.equal(await tocButton.getAttribute('aria-expanded'), 'false');
        await tocButton.click();
        assert.equal(await tocButton.getAttribute('aria-expanded'), 'true');
      }
      await page.locator('[data-section-link][href="#retention"]').click();
      await page.waitForFunction(() => document.querySelector('[href="#retention"][data-section-link]').getAttribute('aria-current') === 'location');
      assert.ok(await page.locator('.language-link').getAttribute('href').then((href) => href.endsWith('#retention')));
      await page.screenshot({ path: resolve(output, `${lang}-${device}-policy.png`), fullPage: false });
      const otherLanguage = lang === 'ar' ? 'en' : 'ar';
      await page.locator('.language-link').click();
      await page.waitForLoadState('networkidle');
      assert.equal(await page.locator('html').getAttribute('lang'), otherLanguage);
      assert.equal(new URL(page.url()).hash, '#retention');
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      await page.evaluate(() => { window.__printRequested = false; window.print = () => { window.__printRequested = true; }; });
      await page.locator('[data-print]').click();
      assert.ok(await page.evaluate(() => window.__printRequested));
      await page.emulateMedia({ media: 'print' });
      assert.equal(await page.locator('.policy-sidebar').isVisible(), false);
      assert.equal(await page.locator('#retention').isVisible(), true);
      assert.equal(await page.locator('#contact').isVisible(), true);
      assert.ok(await page.evaluate(() => getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)'));
      await page.pdf({ path: resolve(output, `${otherLanguage}-print-check.pdf`), format: 'A4', printBackground: true, margin: { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' } });
      assert.deepEqual(errors, [], `${lang} ${device} browser/CSP errors`);
      assert.deepEqual(external, [], 'Unexpected third-party requests');
      results.push(`${lang}/${device}: rendering, theme persistence, navigation, translated anchor, printing and CSP passed`);
      await context.close();
    }
  }
  const narrow = await browser.newContext({ viewport: { width: 320, height: 740 }, colorScheme: 'dark', reducedMotion: 'reduce' });
  for (const lang of ['ar', 'en']) {
    const page = await narrow.newPage();
    await page.goto(base + (lang === 'en' ? 'en/' : ''), { waitUntil: 'networkidle' });
    assert.equal(await page.locator('html').getAttribute('data-appearance'), 'dark');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${lang} 320px overflow`);
    const undersized = await page.locator('.header-actions a, .header-actions button, .hero-actions a, .hero-actions button, .toc-heading').evaluateAll((elements) => elements.filter((element) => element.getBoundingClientRect().width < 44 || element.getBoundingClientRect().height < 44).map((element) => element.outerHTML));
    assert.deepEqual(undersized, [], 'Undersized primary touch controls');
    await page.screenshot({ path: resolve(output, `${lang}-320-dark.png`) });
    await page.close();
  }
  await narrow.close();
  const shortWindow = await browser.newContext({ viewport: { width: 1366, height: 650 }, reducedMotion: 'reduce' });
  for (const lang of ['ar', 'en']) {
    const page = await shortWindow.newPage();
    await page.goto(base + (lang === 'en' ? 'en/' : ''), { waitUntil: 'networkidle' });
    await page.locator('[data-section-link][href="#retention"]').click();
    const lastLink = page.locator('[data-section-link][href="#contact"]');
    await lastLink.focus();
    const bounds = await lastLink.boundingBox();
    assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= 650, 'Last contents link must be visible on keyboard focus');
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('[data-section-link][href="#contact"]').getAttribute('aria-current') === 'location');
    await page.close();
  }
  await shortWindow.close();
  results.push('Short desktop window: all contents links reachable and final contact section highlighted');
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  for (const lang of ['ar', 'en']) {
    const page = await noJs.newPage();
    await page.goto(base + (lang === 'en' ? 'en/' : ''), { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.policy-section').count(), 11);
    assert.ok(await page.locator('#toc-list').isVisible());
    assert.ok(await page.locator('#retention').textContent());
    assert.equal(await page.locator('[data-theme-toggle]').isVisible(), false);
    assert.equal(await page.locator('[data-print]').isVisible(), false);
    await page.locator('.language-link').click();
    assert.equal(await page.locator('html').getAttribute('lang'), lang === 'ar' ? 'en' : 'ar');
    await page.close();
  }
  await noJs.close();
  results.push('320px, system dark appearance, primary touch controls, JavaScript-disabled Arabic/English reading passed');
  await writeFile(resolve(output, 'browser-results.txt'), results.join('\n') + '\n', 'utf8');
  console.log(results.join('\n'));
} finally {
  await browser.close();
  await new Promise((done) => server.close(done));
}
