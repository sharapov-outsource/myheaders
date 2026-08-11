/**
 * The letter.
 *
 * Three components:
 *
 *   transport  35%  — HTTPS everywhere, the first hop, HSTS, the certificate
 *   csp        40%  — content security policy, in detail
 *   headers    25%  — framing, sniffing, referrer, isolation, cookies
 *
 * CSP carries the most weight, and that is the deliberate difference from the
 * incumbent. securityheaders.com is a good tool without advertising, so there
 * is no free ground to take: the only way to be more useful is to go further
 * into the one header that is hard to get right. A site can collect every other
 * header and still ship a policy that an injected script walks straight
 * through, and a checklist that counts headers will call that an A.
 *
 * So a policy that is present but bypassable scores like a policy that is
 * present, not like one that works.
 */

import { letterFor, worstGrade, weighted, sortFlags } from '@sharapov/service-kit';

export const CAPS = [
  ['https-unreachable', 'F', 'https-does-not-work'],
  ['certificate-not-trusted', 'F', 'certificate-not-trusted'],
  ['certificate-not-trusted-on-alias', 'C', 'certificate-not-trusted-on-alias'],
  ['http-does-not-redirect', 'D', 'http-is-served-as-is'],
  ['csp-unsafe-inline', 'C', 'csp-allows-inline-script'],
  ['csp-wildcard-script-src', 'C', 'csp-allows-any-script'],
  ['csp-no-script-src', 'C', 'csp-does-not-govern-script'],
  ['redirect-stays-on-http', 'C', 'first-hop-in-the-clear'],
  ['cookie-samesite-none-without-secure', 'C', 'cookie-rejected-by-browsers'],
  ['cookie-prefix-violated', 'C', 'cookie-rejected-by-browsers'],
  ['cors-wildcard-with-credentials', 'C', 'cors-misconfigured'],
  ['csp-missing', 'B', 'no-csp'],
  ['hsts-missing', 'B', 'no-hsts'],
  ['no-clickjacking-protection', 'B', 'no-framing-protection'],
  ['csp-report-only', 'B', 'csp-not-enforced'],
  ['cookie-not-secure', 'B', 'cookie-without-secure'],
  ['csp-data-in-script-src', 'B', 'csp-allows-data-urls'],
  ['legacy-tls', 'B', 'obsolete-tls'],
];

const WARNINGS = [
  'csp-unsafe-eval', 'csp-bypassable-host', 'csp-wildcard-host',
  'csp-unsafe-inline-with-nonce', 'csp-object-src-not-none', 'csp-no-base-uri',
  'csp-no-frame-ancestors', 'csp-no-reporting', 'hsts-max-age-short',
  'hsts-no-subdomains', 'hsts-preload-claimed-not-listed', 'no-nosniff',
  'no-referrer-policy', 'referrer-policy-leaky', 'no-permissions-policy',
  'no-coop', 'cookie-not-httponly', 'cookie-no-samesite', 'version-in-headers',
  'duplicate-security-header', 'no-http2', 'redirect-not-permanent',
  'obsolete-x-xss-protection', 'obsolete-expect-ct', 'www-and-bare-both-serve',
];

function transportScore({ hsts, protocols }, ids) {
  let score = 100;

  if (ids.has('https-unreachable')) return 0;
  if (ids.has('certificate-not-trusted')) score -= 60;
  if (ids.has('certificate-not-trusted-on-alias')) score -= 20;
  if (ids.has('http-does-not-redirect')) score -= 40;
  if (ids.has('redirect-stays-on-http')) score -= 25;
  if (ids.has('redirect-changes-host-and-scheme')) score -= 5;
  if (ids.has('redirect-not-permanent')) score -= 5;
  if (ids.has('redirect-loop')) score -= 30;

  if (!hsts.present) score -= 30;
  else {
    if (!hsts.longEnough) score -= 12;
    if (!hsts.includeSubDomains) score -= 8;
    if (!hsts.preloadList?.preloaded) score -= 4;
  }

  if (protocols?.tls?.protocol && /TLSv1(\.[01])?$/.test(protocols.tls.protocol)) score -= 25;

  return Math.max(0, Math.min(100, score));
}

/**
 * The policy, scored on what it stops rather than on whether it exists.
 */
function cspScore({ csp }, ids) {
  if (!csp.present) return 0;

  let score = 100;

  if (!csp.enforced) score -= 55;                      // report-only stops nothing
  if (ids.has('csp-no-script-src')) return Math.max(0, score - 60);
  if (ids.has('csp-unsafe-inline')) score -= 50;
  if (ids.has('csp-wildcard-script-src')) score -= 45;
  if (ids.has('csp-data-in-script-src')) score -= 25;
  if (ids.has('csp-unsafe-eval')) score -= 15;
  if (ids.has('csp-bypassable-host')) score -= 15;
  if (ids.has('csp-wildcard-host')) score -= 10;
  if (ids.has('csp-unsafe-inline-with-nonce')) score -= 5;
  if (ids.has('csp-object-src-not-none')) score -= 8;
  if (ids.has('csp-no-base-uri')) score -= 8;
  if (ids.has('csp-no-frame-ancestors')) score -= 5;
  if (ids.has('csp-no-form-action')) score -= 3;
  if (ids.has('csp-no-reporting')) score -= 3;

  // A policy built on nonces or hashes is doing the thing the mechanism is for.
  if (csp.usesNonce || csp.usesHash) score += 5;
  if (csp.strictDynamic) score += 5;

  return Math.max(0, Math.min(100, score));
}

function headerScore({ cookies }, ids) {
  let score = 100;

  if (ids.has('no-clickjacking-protection')) score -= 20;
  if (ids.has('no-nosniff')) score -= 12;
  if (ids.has('no-referrer-policy')) score -= 8;
  if (ids.has('referrer-policy-leaky')) score -= 8;
  if (ids.has('no-permissions-policy')) score -= 5;
  if (ids.has('no-coop')) score -= 5;
  if (ids.has('no-corp')) score -= 2;
  if (ids.has('duplicate-security-header')) score -= 10;
  if (ids.has('cors-wildcard-with-credentials')) score -= 25;
  if (ids.has('version-in-headers')) score -= 3;
  for (const id of ids) if (id.startsWith('obsolete-')) score -= 2;

  if (cookies.count) {
    if (ids.has('cookie-not-secure')) score -= 18;
    if (ids.has('cookie-prefix-violated')) score -= 15;
    if (ids.has('cookie-samesite-none-without-secure')) score -= 15;
    if (ids.has('cookie-not-httponly')) score -= 8;
    if (ids.has('cookie-no-samesite')) score -= 5;
  }

  return Math.max(0, Math.min(100, score));
}

export function grade(report) {
  const flags = sortFlags(report.flags || []);
  const present = new Set(flags.map(entry => entry.id));

  /* Every component reads the one merged list. Section-local arrays were a
     second source of truth, and the assembled report does not carry them —
     which is the kind of divergence that produces a crash the first time a
     check fails early. */
  const components = {
    transport: { key: 'transport', score: transportScore(report, present), weight: 0.35 },
    csp: { key: 'csp', score: cspScore(report, present), weight: 0.4 },
    headers: { key: 'headers', score: headerScore(report, present), weight: 0.25 },
  };

  const score = weighted(Object.values(components));
  let letter = letterFor(score);

  const caps = [];
  const warnings = WARNINGS.filter(id => present.has(id));

  if (report.incomplete?.length) {
    return finish('?', 'scan-incomplete');
  }

  for (const [id, cap, reason] of CAPS) {
    if (!present.has(id)) continue;
    caps.push({ grade: cap, reason });
    letter = worstGrade(letter, cap);
  }

  /* The bonus goes to a site whose policy would survive an injected script:
     enforced, nonce- or hash-based, no inline, no wildcard — plus HSTS long
     enough to be preloadable and nothing else outstanding. */
  if (letter === 'A' && !warnings.length &&
      report.csp.enforced && (report.csp.usesNonce || report.csp.usesHash) &&
      report.hsts.present && report.hsts.longEnough) {
    letter = 'A+';
  }

  return finish(letter);

  function finish(finalGrade, reason) {
    return {
      grade: finalGrade,
      score,
      reason,
      components,
      caps,
      warnings,
      methodology: 'myheaders/1.0 — transport 35%, CSP 40%, other headers 25%',
    };
  }
}
