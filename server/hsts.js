/**
 * HSTS, and whether the preload claim is true.
 *
 * `preload` in the header is a request, not a state. A site can carry the
 * directive for years without ever having submitted itself, and everyone
 * involved will believe it is preloaded. The only way to know is to look in the
 * list Chromium ships — which is what preload.js is for.
 *
 * The distinction matters because preloading is what closes the first-visit
 * hole: without it, HSTS only protects a visitor who has already reached the
 * site over HTTPS at least once, which is exactly the visit an attacker on the
 * network would target.
 */

import { flag } from '@sharapov/service-kit';

import { header } from './http.js';
import { preloadStatus } from './preload.js';

const YEAR = 31536000;

export function parseHsts(value) {
  if (!value) return null;
  const directives = String(value).split(';').map(part => part.trim().toLowerCase());
  const maxAgeToken = directives.find(part => part.startsWith('max-age'));
  const maxAge = maxAgeToken ? Number(maxAgeToken.split('=')[1]?.replace(/"/g, '')) : null;
  return {
    raw: value,
    maxAge: Number.isFinite(maxAge) ? maxAge : null,
    includeSubDomains: directives.includes('includesubdomains'),
    preload: directives.includes('preload'),
  };
}

export async function inspectHsts(headers, domain, { overHttp = null } = {}) {
  const flags = [];
  const value = header(headers, 'strict-transport-security');
  const parsed = parseHsts(value);

  /* A Strict-Transport-Security header sent over plain HTTP is ignored by every
     browser (RFC 6797 §8.1). Sending it there is harmless and usually means
     somebody added it to the wrong server block. */
  if (overHttp) {
    flags.push(flag('hsts-sent-over-http', 'info', 'info', {}));
  }

  if (!parsed) {
    flags.push(flag('hsts-missing', 'high', 'missing', {}));
    return { present: false, preloadList: await preloadStatus(domain), flags };
  }

  if (parsed.maxAge === null) {
    // Without max-age the header does nothing at all.
    flags.push(flag('hsts-no-max-age', 'high', 'failed', {}));
  } else if (parsed.maxAge === 0) {
    // A deliberate way to switch HSTS off — and indistinguishable, from here,
    // from a mistake.
    flags.push(flag('hsts-max-age-zero', 'medium', 'warning', {}));
  } else if (parsed.maxAge < YEAR) {
    flags.push(flag('hsts-max-age-short', 'medium', 'warning',
      { maxAge: parsed.maxAge, recommended: YEAR }));
  }

  if (!parsed.includeSubDomains) {
    // Subdomains are where the cookies get set from.
    flags.push(flag('hsts-no-subdomains', 'medium', 'warning', {}));
  }

  const list = await preloadStatus(domain);

  if (parsed.preload && list.known && !list.preloaded) {
    /* The header asks to be preloaded and the site is not in the list. Usually
       nobody ever submitted it, and everybody involved assumes it is done. */
    flags.push(flag('hsts-preload-claimed-not-listed', 'medium', 'warning', {}));
  }
  if (list.known && list.preloaded && !parsed.preload) {
    // Being in the list without the directive is how a site gets removed at the
    // next list refresh.
    flags.push(flag('hsts-listed-without-directive', 'medium', 'warning', {}));
  }
  if (parsed.preload && (!parsed.includeSubDomains || (parsed.maxAge ?? 0) < YEAR)) {
    flags.push(flag('hsts-preload-not-eligible', 'low', 'warning', {}));
  }
  if (!list.known) {
    flags.push(flag('hsts-preload-list-not-bundled', 'info', 'unknown', {}));
  }

  return {
    present: true,
    ...parsed,
    longEnough: (parsed.maxAge ?? 0) >= YEAR,
    eligibleForPreload: Boolean(parsed.includeSubDomains && parsed.preload &&
      (parsed.maxAge ?? 0) >= YEAR),
    preloadList: list,
    flags,
  };
}
