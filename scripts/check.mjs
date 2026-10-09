import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { policy } from '../src/policy-content.mjs';

const root = resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const documents = ['index.html', 'en/index.html'];
const ids = new Map();
const pages = new Map();
let checkedLinks = 0;
for (const [i, filename] of documents.entries()) {
  const html = await readFile(resolve(root, filename), 'utf8');
  pages.set(filename, html);
  const documentIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(documentIds).size, documentIds.length, `${filename}: duplicate ID`);
  ids.set(filename, new Set(documentIds));
  const lang = i === 0 ? 'ar' : 'en';
  assert.match(html, new RegExp(`<html lang="${lang}" dir="${i === 0 ? 'rtl' : 'ltr'}">`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${filename}: one primary heading required`);
  assert.match(html, /<meta name="description" content="[^\"]+">/);
  assert.match(html, /<time datetime="2026-10-08">/);
  assert.ok(!/<script(?![^>]*\bsrc=)[^>]*>/i.test(html), `${filename}: inline script`);
  assert.ok(!/\son\w+\s*=|\sstyle\s*=|<iframe|<form\b/i.test(html), `${filename}: unexpected inline code or form`);
  assert.ok(!/TODO|LOREM|example\.com|YOUR_DOMAIN|YOUR_REPO/i.test(html), `${filename}: unfinished public copy`);
  for (const section of policy[lang].sections) assert.ok(documentIds.includes(section.id), `Missing section: ${section.id}`);
  assert.match(html, /mailto:support\.fastaqim@gmail\.com/);
}
assert.deepEqual(policy.ar.sections.map((s) => s.id), policy.en.sections.map((s) => s.id), 'Language section order differs');
for (const [filename, html] of pages) {
  for (const match of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    const [, kind, href] = match;
    if (/^(https:|mailto:)/.test(href)) {
      assert.notEqual(kind, 'src', `Third-party resource in ${filename}: ${href}`);
      continue;
    }
    assert.ok(!href.startsWith('/'), `${filename}: root path breaks project-site hosting: ${href}`);
    const [relative, fragment] = href.split('#');
    let target = resolve(dirname(resolve(root, filename)), relative || filename.split('/').at(-1));
    assert.ok(target === root || target.startsWith(root + sep), 'Link escapes public directory');
    if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
    await stat(target);
    if (fragment) {
      const targetHtml = await readFile(target, 'utf8');
      assert.ok(targetHtml.includes(`id="${fragment}"`), `${filename}: broken anchor ${href}`);
    }
    checkedLinks++;
  }
}
const css = await readFile(resolve(root, 'styles.css'), 'utf8');
assert.ok(!/@import|url\(["']?https?:/i.test(css), 'Styles request a third-party resource');
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) await stat(resolve(root, match[1]));
for (const filename of ['app.js', '_headers', '.nojekyll', 'assets/fonts/OFL.txt']) await stat(resolve(root, filename));
console.log(`PASS: Arabic/English documents, mirrored sections, ${checkedLinks} local links and assets, no third-party embeds or unfinished public copy.`);
