import { MODES } from './site.data.mjs';

/** Shared freight maths — the browser copy in src/assets/js/site.js mirrors this. */
export function compute({ pieces = 1, box = [1, 1, 1], actual = 0, mode = 'air' }) {
  const count = Math.max(1, Number(pieces) || 1);
  const [l, w, h] = box.map((v) => Number(v) || 0);
  const divisor = (MODES[mode] || MODES.air).divisor;
  const volumeM3 = (l * w * h * count) / 1_000_000;
  const volWeight = (l * w * h * count) / divisor;
  const chargeable = Math.max(volWeight, actual);
  return {
    pieces: count,
    volumeM3,
    volWeight,
    actual,
    chargeable,
    byVolume: volWeight >= actual,
    divisor,
  };
}

export function fmtNum(value, digits = 1) {
  const rounded = Math.round(value * 10 ** digits) / 10 ** digits;
  return String(rounded).replace(/\.0+$/, '');
}

export function fmtVolume(value) {
  return fmtNum(value, 3);
}

/** "2-4" -> "2–4" for typographic dashes in transit times. */
export function dash(value) {
  return value === null || value === undefined ? null : String(value).replace('-', '–');
}
