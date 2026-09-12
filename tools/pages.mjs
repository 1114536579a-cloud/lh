import { SITE, NAV, COUNTRIES, CALC_DESTINATIONS, EXAMPLES, PLATFORMS } from './site.data.mjs';
import { t, txt, el, ph, icon, esc } from './layout.mjs';
import { compute, fmtNum, fmtVolume, dash } from './calc.mjs';

const TG = `${SITE.telegram}?text=`;
const WA = `${SITE.whatsapp}?text=`;

function bullets(keys, cls = 'ticks') {
  return `<ul class="${cls}">${keys.map((k) => `<li>${icon('check', 'icon icon--tick')}<span data-i18n="${k}">${txt(k)}</span></li>`).join('')}</ul>`;
}

function sectionHead({ eyebrow, title, lead, cls = 'section__head' }) {
  const parts = [`<div class="${cls}">`];
  if (eyebrow) parts.push(el('p', eyebrow, { cls: 'eyebrow' }));
  parts.push(el('h2', title, { cls: 'h2' }));
  if (lead) parts.push(el('p', lead, { cls: 'lead' }));
  parts.push('</div>');
  return parts.join('\n');
}

function sectionHeadDark({ eyebrow, title, lead }) {
  const parts = [`<div class="section__head section__head--dark">`];
  if (eyebrow) parts.push(el('p', eyebrow, { cls: 'eyebrow eyebrow--light' }));
  parts.push(el('h2', title, { cls: 'h2 h2--light' }));
  if (lead) parts.push(el('p', lead, { cls: 'lead lead--light' }));
  parts.push('</div>');
  return parts.join('\n');
}

function ctaBand({ title = 'cta.title', desc = 'cta.desc' } = {}) {
  return `<section class="band">
  <div class="container band__inner">
    <div>
      ${el('h2', title, { cls: 'h2 h2--light' })}
      ${el('p', desc, { cls: 'lead lead--light' })}
    </div>
    <div class="band__actions">
      <a class="btn btn--accent" href="contacts.html#request"><span data-i18n="cta.btn1">${txt('cta.btn1')}</span>${icon('arrow', 'icon icon--sm')}</a>
      <a class="btn btn--ghost btn--ghost-light" href="calculator.html"><span data-i18n="cta.btn2">${txt('cta.btn2')}</span></a>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ hero */

function quickForm() {
  const options = CALC_DESTINATIONS.map(
    (d) => `<option value="${d.key}" data-i18n="city.${d.key}">${txt(`city.${d.key}`)}</option>`,
  ).join('');
  return `<form class="quote" id="quoteForm" novalidate>
  <p class="quote__title">${el('span', 'home.card.title')}</p>
  <p class="quote__desc" data-i18n="home.card.desc">${txt('home.card.desc')}</p>
  <label class="field">
    <span data-i18n="home.card.linkLabel">${txt('home.card.linkLabel')}</span>
    <textarea id="quoteCargo" rows="3"${ph('home.card.linkPh')}></textarea>
  </label>
  <label class="field">
    <span data-i18n="home.card.cityLabel">${txt('home.card.cityLabel')}</span>
    <select id="quoteCity">${options}</select>
  </label>
  <div class="quote__actions">
    <button class="btn btn--primary" type="submit">${icon('telegram', 'icon icon--sm')}<span data-i18n="home.card.submit">${txt('home.card.submit')}</span></button>
    <button class="btn btn--ghost" type="button" id="quoteWa">${icon('whatsapp', 'icon icon--sm')}<span data-i18n="home.card.wa">${txt('home.card.wa')}</span></button>
  </div>
  <p class="quote__note" data-i18n="home.card.note">${txt('home.card.note')}</p>
</form>`;
}

function hero() {
  return `<section class="hero">
  <div class="hero__bg" aria-hidden="true">
    <span class="hero__blob hero__blob--a"></span>
    <span class="hero__blob hero__blob--b"></span>
    <span class="hero__mesh"></span>
  </div>
  <div class="container hero__inner">
    <div class="hero__copy">
      ${el('p', 'home.eyebrow', { cls: 'eyebrow eyebrow--light' })}
      ${el('h1', 'home.title', { cls: 'h1', html: true })}
      ${el('p', 'home.lead', { cls: 'lead lead--light' })}
      <div class="hero__cta">
        <a class="btn btn--accent" href="calculator.html">${icon('calc', 'icon icon--sm')}<span data-i18n="home.btn1">${txt('home.btn1')}</span></a>
        <a class="btn btn--ghost btn--ghost-light" href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}<span data-i18n="home.btn2">${txt('home.btn2')}</span></a>
      </div>
      <ul class="hero__facts">
        ${['home.b1', 'home.b2', 'home.b3'].map((k) => `<li>${icon('check', 'icon icon--tick')}<span data-i18n="${k}">${txt(k)}</span></li>`).join('')}
      </ul>
    </div>
    <div class="hero__visual" aria-hidden="true">
      <img src="assets/img/hero.jpg" alt="" decoding="async">
      <div class="hero__route">
        <span class="hero__route-dot"></span>
        <div><small data-i18n="city.china">${txt('city.china')}</small><strong data-i18n="about.geoChinaValue">${txt('about.geoChinaValue')}</strong></div>
        ${icon('arrow', 'icon icon--sm')}
        <div><small data-i18n="routes.country.ru">${txt('routes.country.ru')}</small><strong data-i18n="city.moscow">${txt('city.moscow')}</strong></div>
      </div>
      <div class="hero__status">
        ${icon('plane', 'icon')}
        <span><small data-i18n="routes.th.air">${txt('routes.th.air')}</small><strong data-i18n="home.b1">${txt('home.b1')}</strong></span>
      </div>
    </div>
  </div>
</section>
<section class="quote-bar" aria-label="${esc(t('home.card.title'))}">
  <div class="container quote-bar__inner">
    <div class="quote-bar__head">
      <span class="quote-bar__index">01</span>
      <div><strong data-i18n="home.card.title">${txt('home.card.title')}</strong><p data-i18n="home.card.desc">${txt('home.card.desc')}</p></div>
    </div>
    <aside class="hero__panel">${quickForm()}</aside>
  </div>
</section>`;
}

function pageHero({ eyebrow, title, lead, extra = '' }) {
  return `<section class="pagehead">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="index.html" data-i18n="ui.breadcrumbHome">${txt('ui.breadcrumbHome')}</a>
      <span aria-hidden="true">/</span>
      <span data-i18n="${title}">${txt(title)}</span>
    </nav>
    ${el('p', eyebrow, { cls: 'eyebrow' })}
    ${el('h1', title, { cls: 'h1' })}
    ${el('p', lead, { cls: 'lead' })}
    ${extra}
  </div>
</section>`;
}

/* ---------------------------------------------------------------- blocks */

function statsBand() {
  const items = [
    ['stat.air.value', 'stat.air.label'],
    ['stat.countries.value', 'stat.countries.label'],
    ['stat.steps.value', 'stat.steps.label'],
    ['stat.manager.value', 'stat.manager.label'],
  ];
  return `<section class="stats">
  <div class="container stats__grid">
    ${items
      .map(
        ([valueKey, labelKey]) => `<div class="stats__item">
      <p class="stats__value" data-i18n="${valueKey}">${txt(valueKey)}</p>
      <p class="stats__label" data-i18n="${labelKey}">${txt(labelKey)}</p>
    </div>`,
      )
      .join('')}
  </div>
</section>`;
}

/** Photo + KPI tiles that overlap the hero, replacing the old flat stat bar. */
function mediaStrip() {
  const items = [
    ['stat.air.value', 'stat.air.label'],
    ['stat.countries.value', 'stat.countries.label'],
    ['stat.steps.value', 'stat.steps.label'],
    ['stat.manager.value', 'stat.manager.label'],
  ];
  return `<section class="media-strip">
  <div class="container media-strip__grid">
    <div class="stat-tiles">
      ${items
        .map(
          ([valueKey, labelKey]) => `<div class="stat-tile">
        <p class="stat-tile__value" data-i18n="${valueKey}">${txt(valueKey)}</p>
        <p class="stat-tile__label" data-i18n="${labelKey}">${txt(labelKey)}</p>
      </div>`,
        )
        .join('')}
    </div>
  </div>
</section>`;
}

function servicesGrid() {
  const icons = { s1: 'search', s2: 'wallet', s3: 'shield', s4: 'box', s5: 'plane', s6: 'refresh' };
  const cards = ['s1', 's2', 's3', 's4', 's5', 's6']
    .map(
      (k, index) => `<article class="bcard${index < 2 ? ' bcard--lg' : ''} reveal">
      <header class="bcard__top">
        <span class="bcard__icon">${icon(icons[k], 'icon')}</span>
        <span class="tag" data-i18n="${k}.tag">${txt(`${k}.tag`)}</span>
      </header>
      <h3 data-i18n="${k}.title">${txt(`${k}.title`)}</h3>
      <p data-i18n="${k}.desc">${txt(`${k}.desc`)}</p>
      ${bullets([`${k}.b1`, `${k}.b2`, `${k}.b3`])}
      <a class="bcard__link" href="services.html#${k}"><span data-i18n="ui.moreDetails">${txt('ui.moreDetails')}</span>${icon('arrow', 'icon icon--sm')}</a>
    </article>`,
    )
    .join('');
  return `<section class="section" id="services">
  <div class="container">
    ${sectionHead({ eyebrow: 'home.svc.eyebrow', title: 'home.svc.title', lead: 'home.svc.lead' })}
    <div class="bento">${cards}</div>
    <p class="section__more"><a class="link-arrow" href="services.html"><span data-i18n="home.svc.more">${txt('home.svc.more')}</span>${icon('arrow', 'icon icon--sm')}</a></p>
  </div>
</section>`;
}

function processGrid() {
  const steps = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6']
    .map(
      (k, i) => `<li class="timeline__item reveal">
      <span class="timeline__num">${String(i + 1).padStart(2, '0')}</span>
      <div class="timeline__body">
        <h3 data-i18n="${k}.title">${txt(`${k}.title`)}</h3>
        <p data-i18n="${k}.desc">${txt(`${k}.desc`)}</p>
      </div>
    </li>`,
    )
    .join('');
  return `<section class="section section--alt" id="process">
  <div class="container">
    ${sectionHead({ eyebrow: 'proc.eyebrow', title: 'proc.title', lead: 'proc.lead' })}
    <ol class="timeline">${steps}</ol>
  </div>
</section>`;
}

function routeCard(country) {
  const rows = country.cities
    .map((city) => {
      const air = city.air ? `${dash(city.air)} ${t('ui.daysShort')}` : t('ui.onRequest');
      const ground = city.ground ? `${dash(city.ground)} ${t('ui.daysShort')}` : t('ui.onRequest');
      const direct = city.direct
        ? `<span class="chip chip--accent" data-i18n="routes.direct">${txt('routes.direct')}</span>`
        : '';
      return `<tr>
      <th scope="row">${esc(t(`city.${city.key}`))} ${direct}</th>
      <td>${esc(air)}</td>
      <td>${esc(ground)}</td>
      <td>${city.lcl ? t('ui.yes') : t('ui.no')}</td>
      <td>${city.fcl ? t('ui.yes') : t('ui.no')}</td>
    </tr>`;
    })
    .join('');
  return `<article class="routecard reveal" id="country-${country.key}">
  <header class="routecard__head">
    <h3 data-i18n="routes.country.${country.key}">${txt(`routes.country.${country.key}`)}</h3>
  </header>
  <div class="table-wrap">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" data-i18n="routes.th.city">${txt('routes.th.city')}</th>
          <th scope="col" data-i18n="routes.th.air">${txt('routes.th.air')}</th>
          <th scope="col" data-i18n="routes.th.ground">${txt('routes.th.ground')}</th>
          <th scope="col" data-i18n="routes.th.lcl">${txt('routes.th.lcl')}</th>
          <th scope="col" data-i18n="routes.th.fcl">${txt('routes.th.fcl')}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
</article>`;
}

function routesSection({ withHead = true } = {}) {
  const tabs = COUNTRIES.map(
    (country, index) =>
      `<button class="seg__btn${index === 0 ? ' is-active' : ''}" type="button" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}" data-country="${country.key}" data-i18n="routes.country.${country.key}">${txt(`routes.country.${country.key}`)}</button>`,
  ).join('');
  const panels = COUNTRIES.map(
    (country, index) => routeCard(country).replace('class="routecard reveal"', `class="routepanel${index === 0 ? ' is-active' : ''}" data-country="${country.key}"`),
  ).join('');
  return `<section class="section" id="routes">
  <div class="container">
    ${withHead ? sectionHead({ eyebrow: 'routes.eyebrow', title: 'routes.title', lead: 'routes.lead' }) : ''}
    <div class="seg" role="tablist" aria-label="${esc(t('routes.tabLabel'))}" data-i18n-aria="routes.tabLabel">${tabs}</div>
    <div class="routepanels">${panels}</div>
    <p class="note" data-i18n="routes.note">${txt('routes.note')}</p>
  </div>
</section>`;
}

function modesSection() {
  const card = (mode) => {
    const iconName = mode === 'air' ? 'plane' : 'truck';
    return `<article class="ticket ticket--${mode} reveal">
      <header class="ticket__head">
        <span class="ticket__icon">${icon(iconName, 'icon')}</span>
        <span class="tag tag--light" data-i18n="modes.${mode}.tag">${txt(`modes.${mode}.tag`)}</span>
      </header>
      <h3 data-i18n="modes.${mode}.title">${txt(`modes.${mode}.title`)}</h3>
      <p data-i18n="modes.${mode}.desc">${txt(`modes.${mode}.desc`)}</p>
      <dl class="ticket__facts">
        ${[1, 2, 3]
          .map(
            (i) => `<div><dt data-i18n="modes.${mode}.t${i}">${txt(`modes.${mode}.t${i}`)}</dt><dd data-i18n="modes.${mode}.t${i}label">${txt(`modes.${mode}.t${i}label`)}</dd></div>`,
          )
          .join('')}
      </dl>
    </article>`;
  };
  return `<section class="section section--alt" id="modes">
  <div class="container">
    ${sectionHead({ eyebrow: 'modes.eyebrow', title: 'modes.title', lead: 'modes.lead' })}
    <div class="tickets">${card('air')}${card('ground')}</div>
  </div>
</section>`;
}

function whyGrid() {
  const items = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6']
    .map(
      (k) => `<li class="gcard reveal">
      <h3 data-i18n="${k}.title">${txt(`${k}.title`)}</h3>
      <p data-i18n="${k}.desc">${txt(`${k}.desc`)}</p>
    </li>`,
    )
    .join('');
  return `<section class="section section--dark" id="why">
  <div class="section__glow" aria-hidden="true"></div>
  <div class="container">
    ${sectionHeadDark({ eyebrow: 'why.eyebrow', title: 'why.title', lead: 'why.lead' })}
    <ul class="gcards">${items}</ul>
  </div>
</section>`;
}

function audienceGrid() {
  const items = ['1', '2', '3', '4']
    .map(
      (i) => `<article class="acard reveal">
      <span class="acard__num">${i}</span>
      <h3 data-i18n="aud.${i}.title">${txt(`aud.${i}.title`)}</h3>
      <p data-i18n="aud.${i}.desc">${txt(`aud.${i}.desc`)}</p>
    </article>`,
    )
    .join('');
  return `<section class="section section--alt" id="audience">
  <div class="container">
    ${sectionHead({ eyebrow: 'aud.eyebrow', title: 'aud.title', lead: 'aud.lead' })}
    <div class="acards">${items}</div>
  </div>
</section>`;
}

function platformsStrip() {
  return `<section class="section" id="platforms">
  <div class="container">
    ${sectionHead({ eyebrow: 'platforms.eyebrow', title: 'platforms.title', lead: 'platforms.lead' })}
    <ul class="chips">${PLATFORMS.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
  </div>
</section>`;
}

/* ---------------------------------------------------------- calculator */

function calculatorBlock({ id = 'calculator', compact = false } = {}) {
  const destOptions = CALC_DESTINATIONS.map(
    (d) => `<option value="${d.key}" data-i18n="city.${d.key}">${txt(`city.${d.key}`)}</option>`,
  ).join('');
  return `<section class="section${compact ? ' section--alt' : ''}" id="${id}">
  <div class="container">
    ${sectionHead({ eyebrow: 'calc.eyebrow', title: 'calc.title', lead: 'calc.lead' })}
    <div class="calc">
      <div class="calc__col">
      <form class="calc__form" id="calcForm" novalidate>
        <div class="calc__fields">
          <label class="field"><span data-i18n="calc.length">${txt('calc.length')}</span><input type="number" id="calcLength" inputmode="decimal" min="1" step="0.1" autocomplete="off" required></label>
          <label class="field"><span data-i18n="calc.width">${txt('calc.width')}</span><input type="number" id="calcWidth" inputmode="decimal" min="1" step="0.1" autocomplete="off" required></label>
          <label class="field"><span data-i18n="calc.height">${txt('calc.height')}</span><input type="number" id="calcHeight" inputmode="decimal" min="1" step="0.1" autocomplete="off" required></label>
          <label class="field"><span data-i18n="calc.pieces">${txt('calc.pieces')}</span><input type="number" id="calcPieces" inputmode="numeric" min="1" step="1" value="1" autocomplete="off"></label>
          <label class="field"><span data-i18n="calc.actual">${txt('calc.actual')}</span><input type="number" id="calcActual" inputmode="decimal" min="0.1" step="0.1" autocomplete="off" required></label>
          <label class="field"><span data-i18n="calc.destination">${txt('calc.destination')}</span><select id="calcDestination">${destOptions}</select></label>
          <label class="field"><span data-i18n="calc.mode">${txt('calc.mode')}</span><select id="calcMode">
            <option value="air" data-i18n="calc.modeAir">${txt('calc.modeAir')}</option>
            <option value="ground" data-i18n="calc.modeGround">${txt('calc.modeGround')}</option>
          </select></label>
        </div>
        <div class="calc__actions">
          <button class="btn btn--primary" type="submit">${icon('calc', 'icon icon--sm')}<span data-i18n="calc.submit">${txt('calc.submit')}</span></button>
          <button class="btn btn--ghost" type="reset" id="calcReset"><span data-i18n="calc.reset">${txt('calc.reset')}</span></button>
        </div>
        <p class="calc__policy" data-i18n="calc.priceOff">${txt('calc.priceOff')}</p>
      </form>
      <div class="calc__result" id="calcResult" hidden>
        <h3 data-i18n="calc.resultTitle">${txt('calc.resultTitle')}</h3>
        <p class="calc__badge" id="calcBadge" data-i18n="calc.byVol">${txt('calc.byVol')}</p>
        <dl class="calc__stats">
          <div><dt data-i18n="calc.volume">${txt('calc.volume')}</dt><dd id="calcVolume">—</dd></div>
          <div><dt data-i18n="calc.volWeight">${txt('calc.volWeight')}</dt><dd id="calcVolWeight">—</dd></div>
          <div><dt data-i18n="calc.actualOut">${txt('calc.actualOut')}</dt><dd id="calcActualOut">—</dd></div>
          <div class="is-accent"><dt data-i18n="calc.chargeable">${txt('calc.chargeable')}</dt><dd id="calcChargeable">—</dd></div>
        </dl>
        <p class="calc__price" id="calcPrice" hidden></p>
        <p class="note" data-i18n="calc.note">${txt('calc.note')}</p>
        <div class="calc__cta">
          <a class="btn btn--primary" id="calcQuote" href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}<span data-i18n="calc.quoteBtn">${txt('calc.quoteBtn')}</span></a>
          <button class="btn btn--ghost" type="button" id="calcPrint">${icon('doc', 'icon icon--sm')}<span data-i18n="calc.printBtn">${txt('calc.printBtn')}</span></button>
        </div>
      </div>
      </div>
      <aside class="calc__side">
        <h3 data-i18n="calc.formulaTitle">${txt('calc.formulaTitle')}</h3>
        <p class="calc__formula" data-i18n="calc.formula">${txt('calc.formula')}</p>
        <h4 data-i18n="calc.howTitle">${txt('calc.howTitle')}</h4>
        <ol class="calc__how">
          ${[1, 2, 3, 4].map((i) => `<li data-i18n="calc.how${i}">${txt(`calc.how${i}`)}</li>`).join('')}
        </ol>
      </aside>
    </div>
  </div>
</section>`;
}

function exampleCard(example) {
  const s = compute({ pieces: example.pieces, box: example.box, actual: example.actual, mode: example.mode });
  const modeLabel = example.mode === 'air' ? t('calc.modeAir') : t('calc.modeGround');
  return `<article class="card card--example reveal">
  <h3><span data-i18n="calc.ex.${example.key}">${txt(`calc.ex.${example.key}`)}</span></h3>
  <p class="card__meta">${esc(`${example.pieces} ${t('calc.ex.pieces')} · ${example.box.join('×')} ${t('ui.cm')}`)} · ${esc(t(`city.${example.destination}`))} · ${esc(modeLabel)}</p>
  <dl class="mini">
    <div><dt data-i18n="calc.ex.actual">${txt('calc.ex.actual')}</dt><dd>${esc(fmtNum(s.actual))} ${esc(t('ui.kg'))}</dd></div>
    <div><dt data-i18n="calc.ex.volume">${txt('calc.ex.volume')}</dt><dd>${esc(fmtVolume(s.volumeM3))} ${esc(t('ui.m3'))}</dd></div>
    <div><dt data-i18n="calc.ex.volWeight">${txt('calc.ex.volWeight')}</dt><dd>${esc(fmtNum(s.volWeight))} ${esc(t('ui.kg'))}</dd></div>
    <div class="is-accent"><dt data-i18n="calc.ex.chargeable">${txt('calc.ex.chargeable')}</dt><dd>${esc(fmtNum(s.chargeable))} ${esc(t('ui.kg'))}</dd></div>
  </dl>
</article>`;
}

function docsGrid() {
  const icons = { 1: 'doc', 2: 'box', 3: 'wallet', 4: 'clock', 5: 'shield' };
  const items = ['1', '2', '3', '4', '5']
    .map(
      (i) => `<li class="rail__item reveal">
      <span class="rail__dot">${icon(icons[i], 'icon icon--sm')}</span>
      <h3 data-i18n="doc.${i}.title">${txt(`doc.${i}.title`)}</h3>
      <p data-i18n="doc.${i}.desc">${txt(`doc.${i}.desc`)}</p>
    </li>`,
    )
    .join('');
  return `<section class="section" id="documents">
  <div class="container">
    ${sectionHead({ eyebrow: 'docs.eyebrow', title: 'docs.title', lead: 'docs.lead' })}
    <ul class="rail">${items}</ul>
  </div>
</section>`;
}

function faqSection({ keys, eyebrow = 'home.faq.eyebrow', title = 'home.faq.title', lead = 'home.faq.lead', more = null, alt = false }) {
  const items = keys
    .map(
      (n) => `<details class="faq__item">
      <summary><span data-i18n="faq.q${n}">${txt(`faq.q${n}`)}</span><span class="faq__mark" aria-hidden="true"></span></summary>
      <div class="faq__answer"><p data-i18n="faq.a${n}">${txt(`faq.a${n}`)}</p></div>
    </details>`,
    )
    .join('');
  return `<section class="section${alt ? ' section--alt' : ''}" id="faq">
  <div class="container">
    ${sectionHead({ eyebrow, title, lead })}
    <div class="faq-layout">
      <div class="faq__col">
        <div class="faq__tools">
          <label class="search">
            <span class="sr-only" data-i18n="faq.searchLabel">${txt('faq.searchLabel')}</span>
            <span class="search__icon">${icon('search', 'icon icon--sm')}</span>
            <input type="search" id="faqSearch" autocomplete="off"${ph('faq.searchPh')}>
          </label>
        </div>
        <div class="faq">${items}</div>
        <p class="faq__empty" id="faqEmpty" hidden data-i18n="faq.searchEmpty">${txt('faq.searchEmpty')}</p>
      </div>
      <aside class="faq__side">
        <div class="faq-card">
          <h3 data-i18n="contact.directTitle">${txt('contact.directTitle')}</h3>
          <p data-i18n="contact.directDesc">${txt('contact.directDesc')}</p>
          <a class="btn btn--primary btn--sm" href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}<span data-i18n="ui.writeTg">${txt('ui.writeTg')}</span></a>
          <a class="btn btn--ghost btn--sm" href="${SITE.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'icon icon--sm')}<span data-i18n="ui.writeWa">${txt('ui.writeWa')}</span></a>
          ${more ? `<a class="link-arrow" href="${more.href}"><span data-i18n="${more.label}">${txt(more.label)}</span>${icon('arrow', 'icon icon--sm')}</a>` : ''}
        </div>
      </aside>
    </div>
  </div>
</section>`;
}

/* -------------------------------------------------------------- contacts */

function contactForm() {
  const topics = [
    'contact.topicDelivery',
    'contact.topicPurchase',
    'contact.topicPayment',
    'contact.topicInspection',
    'contact.topicWarehouse',
    'contact.topicFactory',
    'contact.topicOther',
  ];
  return `<form class="form" id="requestForm" novalidate>
  <p class="form__title">${el('span', 'contact.formTitle')}</p>
  <p class="form__desc" data-i18n="contact.formDesc">${txt('contact.formDesc')}</p>
  <div class="form__row">
    <label class="field"><span data-i18n="contact.formName">${txt('contact.formName')}</span><input type="text" id="reqName" autocomplete="name"${ph('contact.formNamePh')}></label>
    <label class="field"><span data-i18n="contact.formTopic">${txt('contact.formTopic')}</span><select id="reqTopic">${topics.map((k) => `<option value="${k}" data-i18n="${k}">${txt(k)}</option>`).join('')}</select></label>
  </div>
  <div class="form__row">
    <label class="field"><span data-i18n="contact.formDest">${txt('contact.formDest')}</span><select id="reqCity">${CALC_DESTINATIONS.map((d) => `<option value="${d.key}" data-i18n="city.${d.key}">${txt(`city.${d.key}`)}</option>`).join('')}</select></label>
  </div>
  <label class="field"><span data-i18n="contact.formMsg">${txt('contact.formMsg')}</span><textarea id="reqMsg" rows="5"${ph('contact.formMsgPh')}></textarea></label>
  <div class="form__actions">
    <button class="btn btn--primary" type="submit">${icon('telegram', 'icon icon--sm')}<span data-i18n="contact.formSubmit">${txt('contact.formSubmit')}</span></button>
    <button class="btn btn--ghost" type="button" id="reqWa">${icon('whatsapp', 'icon icon--sm')}<span data-i18n="contact.formSubmitWa">${txt('contact.formSubmitWa')}</span></button>
  </div>
  <p class="form__legal"><span data-i18n="ui.consent">${txt('ui.consent')}</span> <a href="privacy.html" data-i18n="ui.consentLegal">${txt('ui.consentLegal')}</a></p>
</form>`;
}

function contactChannels() {
  return `<div class="channels">
  <a class="channel channel--tg" href="${SITE.telegram}" target="_blank" rel="noopener">
    ${icon('telegram', 'icon')}
    <strong data-i18n="ui.telegram">${txt('ui.telegram')}</strong>
    <span>${esc(SITE.telegramHandle)}</span>
  </a>
  <a class="channel channel--wa" href="${SITE.whatsapp}" target="_blank" rel="noopener">
    ${icon('whatsapp', 'icon')}
    <strong data-i18n="ui.whatsapp">${txt('ui.whatsapp')}</strong>
    <span>${esc(SITE.phonePretty)}</span>
  </a>
  <a class="channel" href="tel:${esc(SITE.phone)}">
    ${icon('phone', 'icon')}
    <strong data-i18n="ui.phone">${txt('ui.phone')}</strong>
    <span>${esc(SITE.phonePretty)}</span>
  </a>
</div>`;
}

function contactFacts() {
  return `<ul class="facts">
  <li>${icon('clock', 'icon icon--sm')}<span><strong data-i18n="contact.hoursTitle">${txt('contact.hoursTitle')}</strong> <span data-i18n="contact.hoursValue">${txt('contact.hoursValue')}</span><em data-i18n="contact.hoursNote">${txt('contact.hoursNote')}</em></span></li>
  <li>${icon('refresh', 'icon icon--sm')}<span><strong data-i18n="contact.replyTitle">${txt('contact.replyTitle')}</strong> <span data-i18n="contact.replyValue">${txt('contact.replyValue')}</span><em data-i18n="contact.replyNote">${txt('contact.replyNote')}</em></span></li>
  <li>${icon('pin', 'icon icon--sm')}<span><strong data-i18n="contact.chinaTitle">${txt('contact.chinaTitle')}</strong> <span data-i18n="contact.chinaValue">${txt('contact.chinaValue')}</span><em data-i18n="contact.chinaNote">${txt('contact.chinaNote')}</em></span></li>
</ul>`;
}

function qrBlock() {
  return `<div class="qr">
  <p class="qr__title" data-i18n="contact.qrTitle">${txt('contact.qrTitle')}</p>
  <div class="qr__items">
    <figure class="qr__item">
      <span class="qr__frame"><img src="assets/img/qr-telegram.png" alt="Telegram QR" loading="lazy" decoding="async"></span>
      <figcaption data-i18n="contact.qrTg">${txt('contact.qrTg')}</figcaption>
    </figure>
    <figure class="qr__item">
      <span class="qr__frame"><img src="assets/img/qr-whatsapp.png" alt="WhatsApp QR" loading="lazy" decoding="async"></span>
      <figcaption data-i18n="contact.qrWa">${txt('contact.qrWa')}</figcaption>
    </figure>
  </div>
  <p class="qr__note" data-i18n="contact.qrNote">${txt('contact.qrNote')}</p>
</div>`;
}

function trackBlock() {
  return `<form class="track" id="trackForm" novalidate>
  <h3 data-i18n="contact.trackTitle">${txt('contact.trackTitle')}</h3>
  <p data-i18n="contact.trackDesc">${txt('contact.trackDesc')}</p>
  <label class="field"><span data-i18n="contact.trackLabel">${txt('contact.trackLabel')}</span><input type="text" id="trackInput"${ph('contact.trackPh')}></label>
  <button class="btn btn--primary" type="submit">${icon('telegram', 'icon icon--sm')}<span data-i18n="contact.trackBtn">${txt('contact.trackBtn')}</span></button>
</form>`;
}

function ceoBlock() {
  return `<div class="ceo">
  <figure class="ceo__photo">
    <img src="assets/img/ceo.jpg" alt="${esc(t('contact.ceoName'))}" loading="lazy" decoding="async">
  </figure>
  <div class="ceo__text">
    ${el('p', 'contact.directTitle', { cls: 'h3' })}
    <p class="ceo__name" data-i18n="contact.ceoName">${txt('contact.ceoName')}</p>
    <p data-i18n="contact.ceoDesc">${txt('contact.ceoDesc')}</p>
    <div class="ceo__actions">
      <a class="btn btn--primary btn--sm" href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}<span data-i18n="ui.writeTg">${txt('ui.writeTg')}</span></a>
      <a class="btn btn--ghost btn--sm" href="${SITE.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'icon icon--sm')}<span data-i18n="ui.writeWa">${txt('ui.writeWa')}</span></a>
    </div>
  </div>
</div>`;
}

function contactSection({ alt = false } = {}) {
  return `<section class="section${alt ? ' section--alt' : ''}" id="contacts">
  <div class="container">
    ${sectionHead({ eyebrow: 'contact.eyebrow', title: 'contact.title', lead: 'contact.lead' })}
    ${contactChannels()}
    <div class="contact-grid">
      <div class="contact-grid__aside">
        ${ceoBlock()}
        ${qrBlock()}
        ${contactFacts()}
      </div>
      <div class="contact-grid__main" id="request">
        ${contactForm()}
        ${trackBlock()}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------------------------------------------------------------- pages */

export function homePage() {
  return [
    hero(),
    mediaStrip(),
    servicesGrid(),
    routesSection(),
    whyGrid(),
    processGrid(),
    calculatorBlock({ id: 'calculator', compact: true }),
    faqSection({ keys: [1, 2, 3, 5], more: { href: 'faq.html', label: 'home.faq.more' }, alt: true }),
    ctaBand(),
  ].join('\n');
}

export function servicesPage() {
  const serviceDetail = (k, index) => {
    const icons = { s1: 'search', s2: 'wallet', s3: 'shield', s4: 'box', s5: 'plane', s6: 'refresh' };
    return `<article class="svc${index % 2 ? ' svc--flip' : ''}" id="${k}">
    <div class="svc__text">
      <p class="tag" data-i18n="${k}.tag">${txt(`${k}.tag`)}</p>
      <h2 data-i18n="${k}.title">${txt(`${k}.title`)}</h2>
      <p class="lead" data-i18n="${k}.desc">${txt(`${k}.desc`)}</p>
      <p class="svc__label" data-i18n="svcpage.includes">${txt('svcpage.includes')}</p>
      ${bullets([`${k}.b1`, `${k}.b2`, `${k}.b3`])}
      <a class="btn btn--ghost btn--sm" href="contacts.html#request">${icon('telegram', 'icon icon--sm')}<span data-i18n="svcpage.request">${txt('svcpage.request')}</span></a>
    </div>
    <div class="svc__art" aria-hidden="true"><span class="svc__icon">${icon(icons[k], 'icon')}</span></div>
  </article>`;
  };

  const restrictions = ['1', '2', '3', '4']
    .map(
      (i) => `<article class="card card--plain reveal">
      <h3 data-i18n="restrict.${i}.title">${txt(`restrict.${i}.title`)}</h3>
      <p data-i18n="restrict.${i}.desc">${txt(`restrict.${i}.desc`)}</p>
    </article>`,
    )
    .join('');

  return [
    pageHero({
      eyebrow: 'page.services.eyebrow',
      title: 'page.services.title',
      lead: 'page.services.lead',
      extra: `<div class="pagehead__actions">
        <a class="btn btn--primary" href="contacts.html#request"><span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span>${icon('arrow', 'icon icon--sm')}</a>
        <a class="btn btn--ghost" href="calculator.html">${icon('calc', 'icon icon--sm')}<span data-i18n="ui.openCalc">${txt('ui.openCalc')}</span></a>
      </div>`,
    }),
    `<section class="section"><div class="container svc-list">${['s1', 's2', 's3', 's4', 's5', 's6']
      .map((k, i) => serviceDetail(k, i))
      .join('')}</div></section>`,
    `<section class="section section--alt" id="work">
      <div class="container">
        ${sectionHead({ eyebrow: 'svcpage.workEyebrow', title: 'svcpage.workTitle', lead: 'svcpage.workLead' })}
        <ol class="timeline">${['p1', 'p2', 'p3', 'p4', 'p5', 'p6']
          .map(
            (k, i) => `<li class="timeline__item reveal"><span class="timeline__num">${String(i + 1).padStart(2, '0')}</span><div class="timeline__body"><h3 data-i18n="${k}.title">${txt(`${k}.title`)}</h3><p data-i18n="${k}.desc">${txt(`${k}.desc`)}</p></div></li>`,
          )
          .join('')}</ol>
      </div>
    </section>`,
    `<section class="section" id="restrictions">
      <div class="container">
        ${sectionHead({ eyebrow: 'svcpage.restrictionsTitle', title: 'svcpage.restrictionsTitle', lead: 'svcpage.restrictionsLead' })}
        <div class="grid grid--4">${restrictions}</div>
      </div>
    </section>`,
    modesSection(),
    docsGrid(),
    faqSection({ keys: [1, 5, 7, 12], alt: true, more: { href: 'faq.html', label: 'home.faq.more' } }),
    ctaBand(),
  ].join('\n');
}

export function routesPage() {
  return [
    pageHero({
      eyebrow: 'page.routes.eyebrow',
      title: 'page.routes.title',
      lead: 'page.routes.lead',
      extra: `<div class="pagehead__actions">
        <a class="btn btn--primary" href="calculator.html">${icon('calc', 'icon icon--sm')}<span data-i18n="home.btn1">${txt('home.btn1')}</span></a>
        <a class="btn btn--ghost" href="contacts.html#request"><span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span></a>
      </div>`,
    }),
    statsBand(),
    routesSection({ withHead: false }),
    modesSection(),
    `<section class="section" id="restrictions">
      <div class="container">
        ${sectionHead({ eyebrow: 'svcpage.restrictionsTitle', title: 'svcpage.restrictionsTitle', lead: 'svcpage.restrictionsLead' })}
        <div class="grid grid--4">${['1', '2', '3', '4']
          .map(
            (i) => `<article class="card card--plain reveal"><h3 data-i18n="restrict.${i}.title">${txt(`restrict.${i}.title`)}</h3><p data-i18n="restrict.${i}.desc">${txt(`restrict.${i}.desc`)}</p></article>`,
          )
          .join('')}</div>
      </div>
    </section>`,
    faqSection({ keys: [3, 4, 8, 9], alt: true, more: { href: 'faq.html', label: 'home.faq.more' } }),
    ctaBand(),
  ].join('\n');
}

export function calculatorPage() {
  return [
    pageHero({
      eyebrow: 'page.calculator.eyebrow',
      title: 'page.calculator.title',
      lead: 'page.calculator.lead',
      extra: `<div class="pagehead__actions">
        <a class="btn btn--primary" href="contacts.html#request"><span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span>${icon('arrow', 'icon icon--sm')}</a>
        <a class="btn btn--ghost" href="routes.html"><span data-i18n="ui.allRoutes">${txt('ui.allRoutes')}</span></a>
      </div>`,
    }),
    calculatorBlock({ id: 'calculator' }),
    `<section class="section section--alt" id="examples">
      <div class="container">
        ${sectionHead({ eyebrow: 'calc.examplesTitle', title: 'calc.examplesTitle', lead: 'calc.examplesLead' })}
        <div class="grid grid--2">${EXAMPLES.map(exampleCard).join('')}</div>
      </div>
    </section>`,
    modesSection(),
    faqSection({ keys: [1, 3, 5, 8, 9, 11], more: { href: 'faq.html', label: 'home.faq.more' } }),
    `<section class="band">
      <div class="container band__inner">
        <div>
          ${el('h2', 'calc.needTitle', { cls: 'h2 h2--light' })}
          ${el('p', 'calc.needDesc', { cls: 'lead lead--light' })}
        </div>
        <div class="band__actions">
          <a class="btn btn--accent" href="contacts.html#request">${icon('telegram', 'icon icon--sm')}<span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span></a>
        </div>
      </div>
    </section>`,
  ].join('\n');
}

export function aboutPage() {
  const principles = ['1', '2', '3', '4']
    .map(
      (i) => `<article class="card card--plain reveal"><h3 data-i18n="about.pr${i}.title">${txt(`about.pr${i}.title`)}</h3><p data-i18n="about.pr${i}.desc">${txt(`about.pr${i}.desc`)}</p></article>`,
    )
    .join('');
  const geo = [
    ['about.geoChina', 'about.geoChinaValue'],
    ['about.geoRu', 'about.geoRuValue'],
    ['about.geoBy', 'about.geoByValue'],
    ['about.geoKz', 'about.geoKzValue'],
    ['about.geoKg', 'about.geoKgValue'],
  ]
    .map(
      ([k, v]) => `<li class="geo__item reveal"><span>${icon('pin', 'icon icon--sm')}</span><div><strong data-i18n="${k}">${txt(k)}</strong><p data-i18n="${v}">${txt(v)}</p></div></li>`,
    )
    .join('');
  return [
    pageHero({
      eyebrow: 'page.about.eyebrow',
      title: 'page.about.title',
      lead: 'page.about.lead',
      extra: `<div class="pagehead__actions">
        <a class="btn btn--primary" href="contacts.html#request"><span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span>${icon('arrow', 'icon icon--sm')}</a>
        <a class="btn btn--ghost" href="services.html"><span data-i18n="nav.services">${txt('nav.services')}</span></a>
      </div>`,
    }),
    statsBand(),
    `<section class="section" id="story">
      <div class="container about">
        <div class="about__text">
          ${el('h2', 'about.storyTitle', { cls: 'h2' })}
          ${el('p', 'about.p1', { cls: 'lead' })}
          ${el('p', 'about.p2')}
          ${el('p', 'about.p3')}
          <ul class="about__facts">${['about.fact1', 'about.fact2', 'about.fact3', 'about.fact4']
            .map((k) => `<li>${icon('check', 'icon icon--tick')}<span data-i18n="${k}">${txt(k)}</span></li>`)
            .join('')}</ul>
        </div>
        <div class="about__art" aria-hidden="true"><span>${icon('box', 'icon')}</span></div>
      </div>
    </section>`,
    `<section class="section section--alt" id="principles">
      <div class="container">
        ${sectionHead({ eyebrow: 'about.principlesTitle', title: 'about.principlesTitle', lead: 'about.pr3.desc' })}
        <div class="grid grid--4">${principles}</div>
      </div>
    </section>`,
    `<section class="section" id="geography">
      <div class="container">
        ${sectionHead({ eyebrow: 'about.geoTitle', title: 'about.geoTitle', lead: 'footer.builtFor' })}
        <ul class="geo">${geo}</ul>
      </div>
    </section>`,
    `<section class="section section--alt" id="team">
      <div class="container">
        ${sectionHead({ eyebrow: 'about.ceoTitle', title: 'about.ceoTitle', lead: 'about.ceoNote' })}
        ${ceoBlock()}
      </div>
    </section>`,
    docsGrid(),
    ctaBand(),
  ].join('\n');
}

export function faqPage() {
  return [
    pageHero({
      eyebrow: 'page.faq.eyebrow',
      title: 'page.faq.title',
      lead: 'page.faq.lead',
      extra: `<div class="pagehead__actions">
        <a class="btn btn--primary" href="contacts.html#request">${icon('telegram', 'icon icon--sm')}<span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span></a>
        <a class="btn btn--ghost" href="calculator.html">${icon('calc', 'icon icon--sm')}<span data-i18n="ui.openCalc">${txt('ui.openCalc')}</span></a>
      </div>`,
    }),
    faqSection({
      keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      title: 'faq.title',
      lead: 'faq.lead',
      eyebrow: 'page.faq.eyebrow',
    }),
    ctaBand(),
    contactSection({ alt: true }),
  ].join('\n');
}

export function contactsPage() {
  return [
    pageHero({
      eyebrow: 'page.contacts.eyebrow',
      title: 'page.contacts.title',
      lead: 'page.contacts.lead',
      extra: `<div class="pagehead__actions">
        <a class="btn btn--primary" href="${SITE.telegram}" target="_blank" rel="noopener">${icon('telegram', 'icon icon--sm')}<span data-i18n="ui.writeTg">${txt('ui.writeTg')}</span></a>
        <a class="btn btn--ghost" href="${SITE.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'icon icon--sm')}<span data-i18n="ui.writeWa">${txt('ui.writeWa')}</span></a>
      </div>`,
    }),
    contactSection({ alt: false }),
    faqSection({ keys: [1, 2, 5, 10], alt: true, more: { href: 'faq.html', label: 'home.faq.more' } }),
    ctaBand(),
  ].join('\n');
}

function legalPage(kind) {
  const isPrivacy = kind === 'privacy';
  const paragraphs = isPrivacy
    ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => `legal.privacy.p${i}`)
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `legal.terms.p${i}`);
  const titleKey = isPrivacy ? 'legal.privacyTitle' : 'legal.termsTitle';
  return [
    pageHero({ eyebrow: 'footer.legalTitle', title: titleKey, lead: isPrivacy ? 'meta.privacy.desc' : 'meta.terms.desc' }),
    `<section class="section"><div class="container legal">
      <p class="legal__updated" data-i18n="ui.updated">${txt('ui.updated')}</p>
      ${paragraphs.map((k) => `<p data-i18n="${k}">${txt(k)}</p>`).join('')}
      <p class="legal__contact">${icon('telegram', 'icon icon--sm')}<a href="${SITE.telegram}" target="_blank" rel="noopener">${esc(SITE.telegramHandle)}</a> · ${icon('whatsapp', 'icon icon--sm')}<a href="${SITE.whatsapp}" target="_blank" rel="noopener">${esc(SITE.phonePretty)}</a></p>
      <div class="legal__links">
        <a class="btn btn--ghost btn--sm" href="${isPrivacy ? 'terms.html' : 'privacy.html'}"><span data-i18n="${isPrivacy ? 'legal.termsTitle' : 'legal.privacyTitle'}">${txt(isPrivacy ? 'legal.termsTitle' : 'legal.privacyTitle')}</span></a>
        <a class="btn btn--ghost btn--sm" href="contacts.html">${icon('telegram', 'icon icon--sm')}<span data-i18n="ui.requestQuote">${txt('ui.requestQuote')}</span></a>
      </div>
    </div></section>`,
  ].join('\n');
}

export const privacyPage = () => legalPage('privacy');
export const termsPage = () => legalPage('terms');

export function notFoundPage() {
  return `<section class="section notfound">
  <div class="container">
    <p class="eyebrow">404</p>
    ${el('h1', 'notfound.title', { cls: 'h1' })}
    ${el('p', 'notfound.desc', { cls: 'lead' })}
    <div class="pagehead__actions">
      <a class="btn btn--primary" href="index.html"><span data-i18n="notfound.home">${txt('notfound.home')}</span>${icon('arrow', 'icon icon--sm')}</a>
      <a class="btn btn--ghost" href="calculator.html">${icon('calc', 'icon icon--sm')}<span data-i18n="ui.openCalc">${txt('ui.openCalc')}</span></a>
      <a class="btn btn--ghost" href="contacts.html">${icon('telegram', 'icon icon--sm')}<span data-i18n="nav.contacts">${txt('nav.contacts')}</span></a>
    </div>
  </div>
</section>`;
}

export const PAGE_TG = { TG, WA };
export const NAV_LIST = NAV;

/**
 * FAQPage structured data for the FAQ screen. Kept next to the page markup so
 * the visible answers and the schema can never diverge.
 */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => ({
      '@type': 'Question',
      name: t(`faq.q${i}`),
      acceptedAnswer: { '@type': 'Answer', text: t(`faq.a${i}`) },
    })),
  };
}
