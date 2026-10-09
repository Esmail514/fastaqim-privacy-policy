import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { policy } from '../src/policy-content.mjs';

const publicRoot = new URL('../public/', import.meta.url);
const email = 'support.fastaqim@gmail.com';
const ui = {
  ar: {
    brand: 'فاستقم', caption: 'سياسة الخصوصية', skip: 'انتقل إلى السياسة',
    language: 'English', languageLabel: 'Read this policy in English',
    theme: 'تغيير المظهر', light: 'استخدام المظهر الفاتح', dark: 'استخدام المظهر الداكن',
    read: 'اقرأ السياسة', print: 'طباعة السياسة', contents: 'في هذه الصفحة',
    contentsLabel: 'فهرس سياسة بيانات المستخدمين', note: 'اختر القسم الذي يهمك، أو اقرأ السياسة كاملة بالترتيب.',
    contact: 'التواصل والطلبات', top: 'العودة إلى الأعلى', privacy: 'الخصوصية',
    footer: 'فاستقم · سياسة واضحة لتجربة مطمئنة', updated: '2026-10-08',
    footerDescription: 'تعرّف على كيفية استخدام بياناتك، والخيارات المتاحة لك في تطبيق فاستقم.',
    footerLinks: 'روابط تهمّك', footerData: 'بيانات السياسة', ownerLabel: 'المسؤول عن التطبيق',
    owner: 'مطور تطبيق فاستقم', policyLabel: 'السياسة كاملة', choicesLabel: 'التحكم في بياناتك',
    servicesLabel: 'الخدمات الخارجية', version: 'نسخة السياسة',
  },
  en: {
    brand: 'Fastaqim', caption: 'Privacy policy', skip: 'Skip to the policy',
    language: 'العربية', languageLabel: 'اقرأ السياسة باللغة العربية',
    theme: 'Change appearance', light: 'Use light appearance', dark: 'Use dark appearance',
    read: 'Read the policy', print: 'Print policy', contents: 'On this page',
    contentsLabel: 'Privacy policy contents', note: 'Go straight to a section, or read the full policy in order.',
    contact: 'Contact & requests', top: 'Back to top', privacy: 'Privacy',
    footer: 'Fastaqim · A clearer view of your privacy', updated: '2026-10-08',
    footerDescription: 'Understand how your data is used and explore your choices in the Fastaqim app.',
    footerLinks: 'Useful links', footerData: 'Policy details', ownerLabel: 'App operator',
    owner: 'Fastaqim app developer', policyLabel: 'Full policy', choicesLabel: 'Your data controls',
    servicesLabel: 'External services', version: 'Policy version',
  },
};
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const paths = {
  device: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4M10 6h4"/>',
  location: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  feedback: '<path d="M21 11a8 8 0 0 1-8 8H8l-5 3V11a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/><path d="M8 9h8M8 13h5"/>',
  moon: '<path d="M20.5 14.2A9 9 0 0 1 9.8 3.5 9 9 0 1 0 20.5 14.2Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>',
  arrow: '<path d="m9 5 7 7-7 7"/>',
  print: '<path d="M7 8V3h10v5M7 17H4V8h16v9h-3M7 14h10v7H7Z"/><path d="M16 11h1"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 6 9 7 9-7"/>',
  up: '<path d="M12 20V4m-6 6 6-6 6 6"/>',
  book: '<path d="M12 6c-3-3-6-3-10-2v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-4-1-7-1-10 2Zm0 0v15"/>',
};
const icon = (name, className = '') => `<svg class="${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;

function render(lang) {
  const text = policy[lang];
  const labels = ui[lang];
  const prefix = lang === 'ar' ? './' : '../';
  const other = lang === 'ar' ? './en/' : '../';
  const number = (n) => new Intl.NumberFormat(lang, { minimumIntegerDigits: 2 }).format(n);
  const nav = [...text.sections, { id: 'contact', title: labels.contact }];
  const brand = `<img class="brand-logo" src="${prefix}assets/logo.png" alt="" width="56" height="56"><span class="brand-copy"><span class="brand-name">${labels.brand}</span><span class="brand-caption">${labels.caption}</span></span>`;
  return `<!doctype html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(text.title)} | ${labels.brand}</title>
  <meta name="description" content="${escape(text.description)}">
  <meta name="theme-color" content="#F5F7F0">
  <meta name="color-scheme" content="light dark">
  <meta name="referrer" content="no-referrer">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(text.title)} | ${labels.brand}">
  <meta property="og:description" content="${escape(text.description)}">
  <meta property="og:locale" content="${lang === 'ar' ? 'ar_AR' : 'en_US'}">
  <link rel="alternate" hreflang="${lang === 'ar' ? 'en' : 'ar'}" href="${other}">
  <link rel="icon" type="image/png" href="${prefix}assets/icon.png">
  <link rel="apple-touch-icon" href="${prefix}assets/icon.png">
  <link rel="stylesheet" href="${prefix}styles.css">
  <script src="${prefix}app.js" defer></script>
</head>
<body id="top">
  <a class="skip-link" href="#policy-text">${labels.skip}</a>
  <div class="reading-progress" aria-hidden="true"><div id="reading-progress"></div></div>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#top" aria-label="${labels.brand}">${brand}</a>
      <div class="header-actions">
        <a class="language-link" href="${other}" hreflang="${lang === 'ar' ? 'en' : 'ar'}" lang="${lang === 'ar' ? 'en' : 'ar'}" aria-label="${labels.languageLabel}">${icon('globe')}<span>${labels.language}</span></a>
        <button class="icon-button" type="button" data-theme-toggle hidden data-light-label="${labels.light}" data-dark-label="${labels.dark}" aria-label="${labels.theme}" title="${labels.theme}">${icon('moon', 'theme-moon')}${icon('sun', 'theme-sun')}</button>
      </div>
    </div>
  </header>
  <main id="main" class="container">
    <section class="hero" aria-labelledby="page-title">
      <div class="hero-copy">
        <p class="eyebrow">${icon('book')}${escape(text.eyebrow)}</p>
        <h1 id="page-title">${escape(text.title)}</h1>
        <p class="hero-description">${escape(text.intro)}</p>
        <div class="hero-meta"><span>${labels.privacy}</span><span>${escape(text.updatedLabel)} <time datetime="${labels.updated}">${escape(text.updatedDate)}</time></span><span>${escape(text.versionLabel)}</span></div>
        <div class="hero-actions"><a class="button button-primary" href="#overview">${labels.read}${icon('arrow', 'directional-icon')}</a><button class="button button-secondary print-button" type="button" data-print hidden>${icon('print')}${labels.print}</button></div>
      </div>
      <div class="hero-art" aria-hidden="true"><div class="art-halo"></div><img class="hero-logo" src="${prefix}assets/logo.png" alt="" width="300" height="300"><span class="art-line"></span></div>
    </section>
    <section class="summary" id="summary" aria-labelledby="summary-title">
      <div class="section-heading"><p class="eyebrow">${lang === 'ar' ? 'قبل التفاصيل' : 'Before the details'}</p><h2 id="summary-title">${escape(text.summaryTitle)}</h2><p>${escape(text.summaryIntro)}</p></div>
      <div class="summary-grid">${text.summaries.map((item) => `<div class="summary-card"><span class="icon-tile">${icon(item.icon)}</span><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></div>`).join('')}</div>
    </section>
    <div class="policy-layout" id="policy">
      <aside class="policy-sidebar">
        <nav class="toc" aria-label="${labels.contentsLabel}">
          <button class="toc-heading" type="button" data-toc-toggle disabled aria-expanded="true" aria-controls="toc-list"><span>${labels.contents}</span>${icon('chevron', 'chevron')}</button>
          <ol class="toc-list" id="toc-list">${nav.map((section, i) => `<li><a href="#${section.id}" data-section-link><span class="toc-number">${number(i + 1)}</span><span>${escape(section.title)}</span></a></li>`).join('')}</ol>
        </nav>
        <div class="sidebar-note">${icon('book')}<p>${labels.note}</p></div>
      </aside>
      <article class="policy-body" id="policy-text" tabindex="-1" aria-label="${escape(text.title)}">
        ${text.sections.map((section, i) => `<section class="policy-section" id="${section.id}" aria-labelledby="heading-${section.id}"><header class="section-header"><span class="section-number" aria-hidden="true">${number(i + 1)}</span><div><p class="section-kicker">${escape(section.kicker)}</p><h2 id="heading-${section.id}">${escape(section.title)}</h2></div></header><div class="section-content">${section.html}</div></section>`).join('\n        ')}
        <section class="contact-card" id="contact" aria-labelledby="contact-title"><div class="contact-copy"><span class="icon-tile">${icon('mail')}</span><h2 id="contact-title">${escape(text.contact.title)}</h2><p>${escape(text.contact.text)}</p></div><div class="contact-actions"><a class="contact-email" href="mailto:${email}" dir="ltr">${email}</a><a class="button button-primary" href="mailto:${email}">${escape(text.contact.button)}${icon('mail')}</a></div></section>
      </article>
    </div>
  </main>
  <footer class="site-footer" id="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <a class="brand" href="#top">${brand}</a>
          <p class="footer-description">${labels.footerDescription}</p>
          <a class="footer-email" href="mailto:${email}">${icon('mail')}<bdi dir="ltr">${email}</bdi></a>
        </div>
        <nav class="footer-navigation" aria-labelledby="footer-links-title">
          <h2 id="footer-links-title">${labels.footerLinks}</h2>
          <ul><li><a href="#overview">${labels.policyLabel}</a></li><li><a href="#choices">${labels.choicesLabel}</a></li><li><a href="#services">${labels.servicesLabel}</a></li><li><a href="#contact">${labels.contact}</a></li></ul>
        </nav>
        <section class="footer-information" aria-labelledby="footer-data-title">
          <h2 id="footer-data-title">${labels.footerData}</h2>
          <dl><div><dt>${labels.ownerLabel}</dt><dd>${labels.owner}</dd></div><div><dt>${text.updatedLabel}</dt><dd><time datetime="${labels.updated}">${text.updatedDate}</time></dd></div><div><dt>${labels.version}</dt><dd><span class="footer-version">${text.versionLabel}</span></dd></div></dl>
        </section>
      </div>
      <div class="footer-bottom"><p>© <time datetime="2026">2026</time> ${labels.brand}</p><div class="footer-bottom-links"><a href="${other}" lang="${lang === 'ar' ? 'en' : 'ar'}" hreflang="${lang === 'ar' ? 'en' : 'ar'}">${icon('globe')}${labels.language}</a><a href="#top">${labels.top}${icon('up')}</a></div></div>
    </div>
  </footer>
  <a class="back-to-top" href="#top" aria-label="${labels.top}" title="${labels.top}">${icon('up')}</a>
</body>
</html>
`;
}

await mkdir(new URL('en/', publicRoot), { recursive: true });
await writeFile(new URL('index.html', publicRoot), render('ar'), 'utf8');
await writeFile(new URL('en/index.html', publicRoot), render('en'), 'utf8');
console.log(`Generated Arabic and English pages in ${fileURLToPath(publicRoot)}`);
