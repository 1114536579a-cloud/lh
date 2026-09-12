import { ru } from './i18n.ru.mjs';
import { en } from './i18n.en.mjs';
import { zh } from './i18n.zh.mjs';
import { SITE, NAV } from './site.data.mjs';

export const DICTS = { ru, en, zh };
export const LANGS = ['ru', 'en', 'zh'];

/** Look up a string; throws so a typo can never ship an empty label. */
export function t(key, lang = 'ru') {
  const value = DICTS[lang] && DICTS[lang][key];
  if (value === undefined) throw new Error(`Missing i18n key "${key}" for language "${lang}"`);
  return value;
}

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Inner content for a key: HTML is allowed only when the dictionary says so. */
export function txt(key, { html = false } = {}) {
  const value = t(key);
  return html ? value : esc(value);
}

/**
 * Element whose Russian text is rendered at build time and whose other
 * languages are applied by assets/js/site.js through data-i18n.
 */
export function el(tag, key, { cls, attrs = '', html = false } = {}) {
  const classAttr = cls ? ` class="${cls}"` : '';
  const i18nAttr = key ? ` data-i18n="${key}"` : '';
  const body = key ? txt(key, { html }) : '';
  return `<${tag}${classAttr}${attrs}${i18nAttr}>${body}</${tag}>`;
}

/** placeholder="…" + data-i18n-ph="key" pair for inputs and textareas. */
export function ph(key) {
  return ` placeholder="${esc(t(key))}" data-i18n-ph="${key}"`;
}

/** title/aria-label localisation helpers. */
export function attrName(name, key) {
  return ` ${name}="${esc(t(key))}" data-i18n-${name.replace(/[^a-z]/gi, '')}="${key}"`;
}

const ICONS = {
  telegram:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.7 4.3 18.9 19c-.2 1-.8 1.3-1.6.8l-4.5-3.3-2.2 2.1c-.2.3-.5.4-.8.4l.3-4.4 7.6-6.9c.3-.3 0-.5-.5-.2l-9.4 5.9-4-1.3c-.9-.3-.9-.9.2-1.3l15.6-6c.7-.3 1.4.2 1.1 1.5Z"/></svg>',
  whatsapp:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.8-.1a11 11 0 0 1-5.9-5.2c-.5-1-.7-1.9-.5-2.7.1-.5.6-1.4 1.1-1.7.3-.2.7-.2 1 .1l.9 1.4c.1.2.1.3 0 .5l-.4.6c-.1.2-.2.3 0 .6.4.7 1.5 1.9 2.4 2.3.2.1.4.1.5 0l.7-.7c.2-.2.4-.2.6-.1l1.4.8c.2.1.3.4.2.7Z"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4.5 5.6c0-1 .8-1.8 1.8-1.8h1.4c.8 0 1.5.5 1.7 1.3l.6 2c.1.6-.1 1.2-.6 1.5l-1 .7a11 11 0 0 0 4.9 4.9l.7-1c.4-.5 1-.7 1.5-.6l2 .6c.8.2 1.3.9 1.3 1.7v1.4c0 1-.8 1.8-1.8 1.8h-.6A14.4 14.4 0 0 1 4.5 6.2v-.6Z"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m5 13 4.5 4.5L19 7"/></svg>',
  up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m-6 6 6-6 6 6"/></svg>',
  share:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 16V4m0 0L7 9m5-5 5 5M5 14v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="m12 4 2.5 5.2 5.5.8-4 4 1 5.5-5-2.8-5 2.8 1-5.5-4-4 5.5-.8Z"/></svg>',
  starOn:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 4 2.5 5.2 5.5.8-4 4 1 5.5-5-2.8-5 2.8 1-5.5-4-4 5.5-.8Z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M12 7v5l3 2"/><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"/><circle cx="12" cy="11" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3Zm0 0v9m8-4.8-8 4.8m-8-4.8 8 4.8"/></svg>',
  plane:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M3 13.5 21 5l-4 9-6 .8-2.5 5-1.5-4Z"/></svg>',
  truck:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6Z"/><circle cx="7" cy="18" r="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="18" r="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  shield:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="m9 12 2 2 4-4"/></svg>',
  calc:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M8.5 7.5h7M8.5 12h2m3 0h2m-7 4h2m3 0h2"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M7 3h7l4 4v14H7V3Z"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M10 12h5m-5 4h5"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="m20 20-4.2-4.2"/></svg>',
  wallet:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M3 10h18M16 14h2"/></svg>',
  refresh:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M4 12a8 8 0 0 1 13.6-5.7L20 8m0-4v4h-4M20 12a8 8 0 0 1-13.6 5.7L4 16m0 4v-4h4"/></svg>',
};

export function icon(name, cls = 'icon') {
  const body = ICONS[name];
  if (!body) throw new Error(`Unknown icon "${name}"`);
  return body.replace('<svg', `<svg class="${cls}"`);
}

/**
 * Brand mark: the client-provided logo file is used as-is, never redrawn.
 * It sits in a rounded frame so the square artwork aligns with the UI grid.
 */
function brandMark(cls = 'brand__logo') {
  return `<img class="${cls}" src="assets/brand/logo.png" width="46" height="46" alt="" aria-hidden="true" decoding="async">`;
}

function langSwitch(cls = 'lang') {
  const labels = { ru: 'RU', en: 'EN', zh: '中文' };
  return `<div class="${cls}" role="group" aria-label="${esc(t('ui.langLabel'))}" data-i18n-aria="ui.langLabel">
    ${LANGS.map(
      (lang) =>
        `<button type="button" data-lang="${lang}" aria-pressed="${lang === 'ru' ? 'true' : 'false'}">${labels[lang]}</button>`,
    ).join('')}
  </div>`;
}

export function topbar() {
  return `<div class="topbar">
  <div class="container topbar__inner">
    <p class="topbar__note">${icon('shield', 'icon icon--sm')}<span data-i18n="top.note">${txt('top.note')}</span></p>
    <p class="topbar__hours">${icon('clock', 'icon icon--sm')}<span data-i18n="top.hours">${txt('top.hours')}</span></p>
    <p class="topbar__links">
      <a href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}${esc(SITE.telegramHandle)}</a>
      <a href="${SITE.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'icon icon--sm')}${esc(SITE.phonePretty)}</a>
    </p>
  </div>
</div>`;
}

export function header(active) {
  const links = NAV.map(
    ({ key, href }) =>
      `<a href="${href}"${key === active ? ' class="is-active" aria-current="page"' : ''} data-i18n="nav.${key}">${txt(`nav.${key}`)}</a>`,
  ).join('');
  const drawerLinks = [
    `<a href="index.html" data-i18n="nav.home">${txt('nav.home')}</a>`,
    NAV.map(
      ({ key, href }) =>
        `<a href="${href}"${key === active ? ' aria-current="page"' : ''} data-i18n="nav.${key}">${txt(`nav.${key}`)}</a>`,
    ).join(''),
  ].join('');

  return `${topbar()}
<header class="header" id="header">
  <div class="container">
    <div class="header__bar" id="headerBar">
      <a class="brand" href="index.html" aria-label="${esc(SITE.brand)}">
        ${brandMark()}
        <span class="brand__text">
          <strong data-i18n="brand.name">${txt('brand.name')}</strong>
          <small data-i18n="brand.sub">${txt('brand.sub')}</small>
        </span>
      </a>
      <nav class="nav" aria-label="${esc(t('nav.aria'))}" data-i18n-aria="nav.aria">${links}</nav>
      <div class="header__side">
        ${langSwitch()}
        <a class="btn btn--primary btn--sm header__cta" href="contacts.html#request">
          <span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span>
        </a>
        <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(t('ui.menu'))}" data-i18n-aria="ui.menu">${icon('menu')}</button>
      </div>
    </div>
  </div>
  <nav class="drawer" id="drawer" aria-label="${esc(t('nav.aria'))}" data-i18n-aria="nav.aria" hidden>
    <div class="drawer__links">${drawerLinks}</div>
    <div class="drawer__foot">
      ${langSwitch('lang lang--drawer')}
      <a class="btn btn--primary" href="contacts.html#request"><span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span></a>
      <a class="btn btn--ghost" href="${SITE.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'icon icon--sm')}<span data-i18n="ui.writeWa">${txt('ui.writeWa')}</span></a>
    </div>
  </nav>
</header>
<button class="progress" id="progress" type="button" aria-label="${esc(t('ui.top'))}" data-i18n-aria="ui.top"><span></span></button>`;
}

export function floating() {
  return `<div class="float">
  <a class="float__btn float__btn--wa" href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="${esc(t('ui.writeWa'))}" data-i18n-aria="ui.writeWa" title="${esc(t('ui.writeWa'))}" data-i18n-title="ui.writeWa">${icon('whatsapp', 'icon')}</a>
  <a class="float__btn float__btn--tg" href="${SITE.telegram}" target="_blank" rel="noopener" aria-label="${esc(t('ui.writeTg'))}" data-i18n-aria="ui.writeTg" title="${esc(t('ui.writeTg'))}" data-i18n-title="ui.writeTg">${icon('telegram', 'icon')}</a>
</div>
<div class="mobilebar">
  <a href="tel:${esc(SITE.phone)}" aria-label="${esc(t('ui.call'))}" data-i18n-aria="ui.call">${icon('phone', 'icon icon--sm')}<span data-i18n="ui.call">${txt('ui.call')}</span></a>
  <a href="${SITE.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'icon icon--sm')}<span data-i18n="ui.whatsapp">${txt('ui.whatsapp')}</span></a>
  <a href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}<span data-i18n="ui.telegram">${txt('ui.telegram')}</span></a>
  <a href="calculator.html">${icon('calc', 'icon icon--sm')}<span data-i18n="nav.calculator">${txt('nav.calculator')}</span></a>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

export function footer() {
  const navLinks = [
    `<a href="index.html" data-i18n="nav.home">${txt('nav.home')}</a>`,
    ...NAV.map(({ key, href }) => `<a href="${href}" data-i18n="nav.${key}">${txt(`nav.${key}`)}</a>`),
  ].join('');
  const svcLinks = ['s1', 's3', 's4', 's5']
    .map((k) => `<a href="services.html#${k}" data-i18n="${k}.title">${txt(`${k}.title`)}</a>`)
    .join('');

  return `<footer class="footer">
  <div class="container footer__cta">
    <p data-i18n="footer.ctaTitle">${txt('footer.ctaTitle')}</p>
    <a class="btn btn--primary" href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}<span data-i18n="footer.ctaBtn">${txt('footer.ctaBtn')}</span></a>
  </div>
  <div class="container footer__grid">
    <div class="footer__col footer__col--brand">
      <a class="brand brand--footer" href="index.html">
        ${brandMark('brand__logo brand__logo--footer')}
        <span class="brand__text"><strong data-i18n="brand.name">${txt('brand.name')}</strong><small data-i18n="footer.builtFor">${txt('footer.builtFor')}</small></span>
      </a>
      <p data-i18n="footer.desc">${txt('footer.desc')}</p>
      <div class="footer__contacts">
        <a href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}${esc(SITE.telegramHandle)}</a>
        <a href="${SITE.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'icon icon--sm')}${esc(SITE.phonePretty)}</a>
        <a href="tel:${esc(SITE.phone)}">${icon('phone', 'icon icon--sm')}${esc(SITE.phonePretty)}</a>
      </div>
    </div>
    <div class="footer__col"><h3 data-i18n="footer.navTitle">${txt('footer.navTitle')}</h3>${navLinks}</div>
    <div class="footer__col"><h3 data-i18n="footer.svcTitle">${txt('footer.svcTitle')}</h3>${svcLinks}<a href="services.html" data-i18n="ui.moreDetails">${txt('ui.moreDetails')}</a></div>
    <div class="footer__col"><h3 data-i18n="footer.legalTitle">${txt('footer.legalTitle')}</h3>
      <a href="privacy.html" data-i18n="footer.privacy">${txt('footer.privacy')}</a>
      <a href="terms.html" data-i18n="footer.terms">${txt('footer.terms')}</a>
      <a href="faq.html" data-i18n="footer.faq">${txt('footer.faq')}</a>
      <a href="calculator.html" data-i18n="footer.calc">${txt('footer.calc')}</a>
      <a href="routes.html" data-i18n="footer.routes">${txt('footer.routes')}</a>
    </div>
  </div>
  <div class="container footer__bottom">
    <p data-i18n="footer.rights">${txt('footer.rights')}</p>
    <p data-i18n="footer.note">${txt('footer.note')}</p>
  </div>
</footer>
<div class="cookie" id="cookie" hidden>
  <p><span data-i18n="cookie.text">${txt('cookie.text')}</span> <a href="privacy.html" data-i18n="cookie.more">${txt('cookie.more')}</a></p>
  <button class="btn btn--sm btn--primary" type="button" id="cookieOk" data-i18n="cookie.ok">${txt('cookie.ok')}</button>
</div>`;
}

/** Organisation + website structured data, shared by every page. */
export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: SITE.brand,
    url: `${SITE.origin}/`,
    description:
      'Sourcing, payment, inspection, consolidation and cross-border delivery from China to Russia, Belarus, Kazakhstan and Kyrgyzstan.',
    areaServed: ['RU', 'BY', 'KZ', 'KG', 'CN'],
    knowsLanguage: ['ru', 'en', 'zh'],
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'customer service', telephone: SITE.phone, availableLanguage: ['ru', 'en', 'zh'] },
      { '@type': 'ContactPoint', contactType: 'sales', url: SITE.telegram, availableLanguage: ['ru', 'en', 'zh'] },
    ],
    sameAs: [SITE.telegram, SITE.whatsapp],
  };
}

export function breadcrumbSchema(items) {
  const clean = (value) => String(value || '').replace(/index\.html$/, '').replace(/\.html$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.origin}/${clean(item.path)}`,
    })),
  };
}

export function head({ page, titleKey, descKey, canonical, schemas = [] }) {
  const allSchemas = [orgSchema(), ...schemas];
  // Cloudflare Pages serves extensionless URLs (services.html -> /services), so
  // canonical and Open Graph URLs point at the final address.
  const cleanPath = String(canonical || '').replace(/index\.html$/, '').replace(/\.html$/, '');
  const canonicalUrl = `${SITE.origin}/${cleanPath}`;
  return `<!DOCTYPE html>
<html lang="ru" data-lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-i18n-doctitle="${titleKey}">${esc(t(titleKey))}</title>
<meta name="description" content="${esc(t(descKey))}" data-i18n-desc="${descKey}">
<meta name="theme-color" content="#2b2dc0">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonicalUrl}">
<link rel="icon" href="assets/brand/logo.png" type="image/png">
<link rel="apple-touch-icon" href="assets/brand/logo.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.brand)}">
<meta property="og:title" content="${esc(t(titleKey))}" data-i18n-ogtitle="${titleKey}">
<meta property="og:description" content="${esc(t(descKey))}" data-i18n-ogdesc="${descKey}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:image" content="${SITE.origin}/assets/hero.jpg">
<meta property="og:locale" content="ru_RU">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t(titleKey))}" data-i18n-twtitle="${titleKey}">
<meta name="twitter:description" content="${esc(t(descKey))}" data-i18n-twdesc="${descKey}">
<meta name="twitter:image" content="${SITE.origin}/assets/hero.jpg">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" href="assets/css/styles.css?v=20260913-7">
<script type="application/ld+json">${JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas)}</script>
<script defer src="assets/js/i18n.js?v=20260913-7"></script>
<script defer src="assets/js/site.js?v=20260913-7"></script>
</head>
<body data-page="${page}">
<a class="skip" href="#main" data-i18n="ui.skipLink">${txt('ui.skipLink')}</a>`;
}

export function layout({ page, active, titleKey, descKey, canonical, schemas, body }) {
  return `${head({ page, titleKey, descKey, canonical, schemas })}
${header(active)}
<main id="main">
${body}
</main>
${footer()}
${floating()}
</body>
</html>
`;
}
