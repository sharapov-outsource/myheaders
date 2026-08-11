/**
 * The rest of the response headers.
 *
 * Three groups. The isolation headers (COOP, COEP, CORP) are the ones that grew
 * out of Spectre and are still the least deployed. The framing and referrer
 * headers are old and mostly present. And then there is the group nobody
 * removes: `X-XSS-Protection`, which browsers dropped years ago and which was
 * itself exploitable; `Expect-CT`, retired in 2021; `P3P`, a policy language
 * from 2002 that Internet Explorer needed and nothing has read since.
 *
 * Version banners are treated as a low-severity note rather than a finding.
 * Hiding them stops nobody, and the security of a server does not rest on
 * whether it admits which one it is — but it does hand a scanner a filter, and
 * the header is free to remove.
 */

import { flag } from '@sharapov/service-kit';

import { header, headerValues, duplicatedHeaders } from './http.js';

/** Headers whose only remaining function is to be found in a report. */
const OBSOLETE = {
  'x-xss-protection': 'x-xss-protection',
  'expect-ct': 'expect-ct',
  p3p: 'p3p',
  'x-webkit-csp': 'x-webkit-csp',
  'x-content-security-policy': 'x-content-security-policy',
};

/** Headers that name the software, and sometimes its version. */
const VERSION_HEADERS = ['server', 'x-powered-by', 'x-aspnet-version', 'x-aspnetmvc-version',
  'x-generator', 'x-drupal-cache', 'x-runtime', 'x-version'];

export function inspectMisc(response, { csp } = {}) {
  const flags = [];
  const headers = response.headers || {};

  const xfo = header(headers, 'x-frame-options');
  const frameAncestors = csp?.directives?.['frame-ancestors'];

  /* X-Frame-Options and frame-ancestors do the same job; the CSP one supersedes
     it and is the only one that can name more than one origin. Having neither
     is the finding — having both is fine and worth a note only when they
     disagree. */
  if (!xfo && !frameAncestors) {
    flags.push(flag('no-clickjacking-protection', 'high', 'missing', {}));
  } else if (xfo && frameAncestors) {
    const xfoDenies = /^deny$/i.test(xfo.trim());
    const cspDenies = frameAncestors.length === 1 && frameAncestors[0] === "'none'";
    if (xfoDenies !== cspDenies) {
      flags.push(flag('framing-headers-disagree', 'low', 'warning',
        { xFrameOptions: xfo, frameAncestors }));
    }
  }
  if (xfo && /^allow-from/i.test(xfo.trim())) {
    // ALLOW-FROM was never implemented by Chrome and was removed from Firefox:
    // in practice this means no protection at all.
    flags.push(flag('x-frame-options-allow-from', 'medium', 'weak', { value: xfo }));
  }

  const nosniff = header(headers, 'x-content-type-options');
  if (!nosniff) {
    flags.push(flag('no-nosniff', 'medium', 'missing', {}));
  } else if (!/^nosniff$/i.test(nosniff.trim())) {
    flags.push(flag('nosniff-malformed', 'medium', 'failed', { value: nosniff }));
  }

  const referrer = header(headers, 'referrer-policy');
  if (!referrer) {
    flags.push(flag('no-referrer-policy', 'low', 'missing', {}));
  } else if (/unsafe-url|^origin-when-cross-origin$|no-referrer-when-downgrade/i.test(referrer)) {
    // unsafe-url sends the full path to third parties, including any identifier
    // that happens to be in it.
    flags.push(flag('referrer-policy-leaky', 'medium', 'weak', { value: referrer }));
  }

  const permissions = header(headers, 'permissions-policy') || header(headers, 'feature-policy');
  if (!permissions) {
    flags.push(flag('no-permissions-policy', 'low', 'missing', {}));
  } else if (header(headers, 'feature-policy') && !header(headers, 'permissions-policy')) {
    flags.push(flag('feature-policy-superseded', 'low', 'warning', {}));
  }

  const coop = header(headers, 'cross-origin-opener-policy');
  const coep = header(headers, 'cross-origin-embedder-policy');
  const corp = header(headers, 'cross-origin-resource-policy');
  if (!coop) flags.push(flag('no-coop', 'low', 'missing', {}));
  if (!corp) flags.push(flag('no-corp', 'info', 'missing', {}));

  for (const [name, code] of Object.entries(OBSOLETE)) {
    if (header(headers, name)) {
      flags.push(flag(`obsolete-${code}`, 'low', 'warning', { header: name }));
    }
  }

  const versions = VERSION_HEADERS
    .map(name => ({ name, value: header(headers, name) }))
    .filter(entry => entry.value);
  const withVersion = versions.filter(entry => /\d+\.\d+/.test(entry.value));
  if (withVersion.length) {
    flags.push(flag('version-in-headers', 'low', 'warning',
      { headers: withVersion.map(entry => `${entry.name}: ${entry.value}`) }));
  }

  const duplicated = duplicatedHeaders(response.rawHeaders)
    .filter(name => /^(content-security-policy|strict-transport-security|x-frame-options|x-content-type-options|referrer-policy|access-control-allow-origin)$/.test(name));
  if (duplicated.length) {
    // Browsers disagree about which copy wins, so for a security header the
    // disagreement decides whether the policy applies.
    flags.push(flag('duplicate-security-header', 'medium', 'warning', { headers: duplicated }));
  }

  const cors = header(headers, 'access-control-allow-origin');
  const credentials = header(headers, 'access-control-allow-credentials');
  if (cors === '*' && /true/i.test(credentials || '')) {
    // Browsers refuse this combination outright, so the endpoint is broken as
    // well as over-permissive.
    flags.push(flag('cors-wildcard-with-credentials', 'high', 'failed', {}));
  } else if (cors === '*') {
    flags.push(flag('cors-wildcard', 'info', 'info', {}));
  }

  return {
    xFrameOptions: xfo,
    contentTypeOptions: nosniff,
    referrerPolicy: referrer,
    permissionsPolicy: permissions,
    coop, coep, corp,
    cors,
    obsolete: Object.keys(OBSOLETE).filter(name => header(headers, name)),
    versionHeaders: Object.fromEntries(versions.map(entry => [entry.name, entry.value])),
    duplicated,
    setCookieCount: headerValues(headers, 'set-cookie').length,
    flags,
  };
}
