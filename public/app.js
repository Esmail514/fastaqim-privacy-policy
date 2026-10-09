(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'fastaqim-privacy-theme';
  const currentTheme = () => root.dataset.theme || (systemTheme.matches ? 'dark' : 'light');
  const syncThemeLabel = () => {
    const isDark = currentTheme() === 'dark';
    const label = isDark ? themeButton.dataset.lightLabel : themeButton.dataset.darkLabel;
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    root.dataset.appearance = isDark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = isDark ? '#121212' : '#F5F7F0';
  };
  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  } catch { /* Preferences are optional when browser storage is blocked. */ }
  syncThemeLabel();
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    root.dataset.theme = currentTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(storageKey, root.dataset.theme); } catch { /* The toggle still works. */ }
    syncThemeLabel();
  });
  systemTheme.addEventListener('change', syncThemeLabel);
  document.querySelectorAll('[data-print]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });

  const tocButton = document.querySelector('[data-toc-toggle]');
  const tocList = document.getElementById('toc-list');
  tocButton.disabled = false;
  const mobile = window.matchMedia('(max-width: 860px)');
  const setTocOpen = (open) => {
    tocButton.setAttribute('aria-expanded', String(open));
    tocList.hidden = !open;
  };
  setTocOpen(!mobile.matches);
  mobile.addEventListener('change', () => setTocOpen(!mobile.matches));
  tocButton.addEventListener('click', () => setTocOpen(tocList.hidden));

  const links = [...document.querySelectorAll('[data-section-link]')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href')));
  const progress = document.getElementById('reading-progress');
  const footer = document.querySelector('.site-footer');
  const languageLink = document.querySelector('.language-link');
  const languageBase = languageLink.getAttribute('href');
  const setCurrent = (id) => {
    for (const link of links) {
      if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  let queued = false;
  const updateReading = () => {
    queued = false;
    const range = root.scrollHeight - window.innerHeight;
    progress.style.width = `${range > 0 ? Math.min(100, Math.max(0, window.scrollY / range * 100)) : 0}%`;
    document.body.classList.toggle('has-scrolled', window.scrollY > 700);
    document.body.classList.toggle('footer-visible', footer.getBoundingClientRect().top < window.innerHeight);
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 150) current = section;
      else break;
    }
    if (range > 0 && window.scrollY >= range - 2) current = sections.at(-1);
    setCurrent(current.id);
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(updateReading); }
  }, { passive: true });
  window.addEventListener('resize', updateReading);
  const syncLanguageAnchor = () => {
    const id = window.location.hash.slice(1);
    languageLink.href = languageBase + (document.getElementById(id) ? `#${id}` : '');
  };
  window.addEventListener('hashchange', syncLanguageAnchor);
  syncLanguageAnchor();
  updateReading();
})();
