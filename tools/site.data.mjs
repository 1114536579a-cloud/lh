/**
 * Business data for the LiHui Cargo website.
 * Language-independent values live here; every visible label lives in tools/i18n.*.mjs
 */

export const SITE = {
  brand: 'LiHui International Logistics',
  brandShort: 'LiHui Cargo',
  domain: 'lihui-cargo.ru',
  origin: 'https://www.lihui-cargo.ru',
  telegram: 'https://t.me/Lihui9559',
  telegramHandle: '@Lihui9559',
  whatsapp: 'https://wa.me/8615604658910',
  phone: '+8615604658910',
  phonePretty: '+86 156 0465 8910',
  legalUpdated: '2026-09-13',
  year: 2026,
};

/** Freight modes. divisor = volumetric divisor in cm3/kg. */
export const MODES = {
  air: { divisor: 6000 },
  ground: { divisor: 6000 },
};

/**
 * Route matrix. Times are shown in days and are the numbers already confirmed
 * for this business. `null` means "confirm with the manager" on that channel.
 */
export const COUNTRIES = [
  {
    key: 'ru',
    cities: [
      { key: 'moscow', air: '2-4', ground: '12-15', lcl: true, fcl: true },
      { key: 'nsk', air: '4-6', ground: null, lcl: true, fcl: false },
      { key: 'ekb', air: null, ground: null, lcl: true, fcl: false },
      { key: 'spb', air: null, ground: null, lcl: true, fcl: false },
    ],
  },
  {
    key: 'by',
    cities: [
      { key: 'minsk', air: null, ground: null, lcl: true, fcl: true, direct: true },
      { key: 'gomel', air: null, ground: null, lcl: true, fcl: false },
    ],
  },
  {
    key: 'kz',
    cities: [
      { key: 'almaty', air: '2-4', ground: '5-7', lcl: true, fcl: true },
      { key: 'astana', air: null, ground: null, lcl: true, fcl: false },
    ],
  },
  {
    key: 'kg',
    cities: [
      { key: 'bishkek', air: null, ground: null, lcl: true, fcl: true, direct: true },
      { key: 'osh', air: null, ground: null, lcl: true, fcl: false },
    ],
  },
];

/** Destinations offered by the freight calculator. */
export const CALC_DESTINATIONS = [
  { key: 'moscow', country: 'ru', air: true, ground: true },
  { key: 'nsk', country: 'ru', air: true, ground: false },
  { key: 'minsk', country: 'by', air: true, ground: true },
  { key: 'almaty', country: 'kz', air: true, ground: true },
  { key: 'bishkek', country: 'kg', air: true, ground: true },
];

/**
 * Typical shipments shown on the site. Every figure is calculated at build time
 * with the same formula the calculator uses, so numbers can never drift.
 */
export const EXAMPLES = [
  { key: 'samples', pieces: 3, box: [60, 40, 40], actual: 42, mode: 'air', destination: 'moscow' },
  { key: 'furniture', pieces: 1, box: [120, 60, 60], actual: 95, mode: 'ground', destination: 'moscow' },
  { key: 'consolidation', pieces: 5, box: [70, 50, 50], actual: 130, mode: 'air', destination: 'almaty' },
  { key: 'equipment', pieces: 2, box: [100, 80, 70], actual: 210, mode: 'ground', destination: 'almaty' },
];

export const PLATFORMS = ['1688', 'Taobao', 'Pinduoduo', 'Poizon', 'Yiwu', 'Factories'];

/**
 * Optional price estimates for the calculator.
 * Keep enabled:false until real tariffs are confirmed — the site then asks for a
 * personal quote instead of showing an invented number.
 * When you enable it, set per-kg rates in the currency you quote in (RUB by default).
 */
export const PRICING = {
  enabled: false,
  currency: 'RUB',
  rates: {
    // 'moscow:air':   { min: 0, max: 0 },
    // 'moscow:ground':{ min: 0, max: 0 },
  },
};

export const NAV = [
  { key: 'services', href: 'services.html' },
  { key: 'routes', href: 'routes.html' },
  { key: 'calculator', href: 'calculator.html' },
  { key: 'about', href: 'about.html' },
  { key: 'contacts', href: 'contacts.html' },
];
