/**
 * Draws myheaders' icons. The glyph is a response: a stack of header lines
 * with the first one carrying the accent.
 *
 *   node scripts/make-icons.js
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { makeIcons, roundedRect } from '@sharapov/service-kit/make-icons';

const PUBLIC_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

/** Coordinates are the same 1024-unit grid public/icon.svg is drawn on. */
const LINES = [
  [248, 300, 400, 'accent'],
  [248, 440, 528, 'paper'],
  [248, 580, 440, 'paper'],
  [248, 720, 312, 'paper'],
];

function glyph(at, x, y) {
  for (const [left, top, width, kind] of LINES) {
    const inside = roundedRect(
      x, y,
      at(left + width / 2), at(top + 36),
      at(width / 2), at(36), at(36)) <= 0;
    if (inside) return kind;
  }
  return null;
}

export { glyph, roundedRect };

makeIcons({ publicDir: PUBLIC_DIR, glyph });
