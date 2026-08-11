/**
 * The reasoning, on captured header sets.
 *
 * No network: a response is a plain object, which is all the analysers take.
 * That makes it possible to test the cases that matter and are awkward to find
 * in the wild — a nonce sitting beside `unsafe-inline`, a `__Host-` cookie that
 * a browser will refuse, an HSTS header claiming a preload membership it does
 * not have.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { parseCsp, inspectCsp } from '../server/csp.js';
import { parseHsts, inspectHsts } from '../server/hsts.js';
import { parseSetCookie, inspectCookies } from '../server/cookies.js';
import { inspectMisc } from '../server/misc.js';
import { collectHeaders } from '../server/headers.js';
import { duplicatedHeaders } from '../server/http.js';
import { grade } from '../server/grade.js';

const ids = result => new Set(result.flags.map(entry => entry.id));

/* ------------------------------------------------------------------ *
 * CSP
 * ------------------------------------------------------------------ */

test('a policy is split into directives, first occurrence winning', () => {
  const directives = parseCsp("default-src 'self'; script-src 'self' https://cdn.example; script-src 'none'");
  assert.deepEqual(directives['default-src'], ["'self'"]);
  assert.deepEqual(directives['script-src'], ["'self'", 'https://cdn.example']);
});

test('no policy at all is a finding', () => {
  const result = inspectCsp({});
  assert.equal(result.present, false);
  assert.ok(ids(result).has('csp-missing'));
});

test('unsafe-inline in script-src is critical', () => {
  const result = inspectCsp({
    'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'none'",
  });
  const finding = result.flags.find(entry => entry.id === 'csp-unsafe-inline');
  assert.equal(finding.severity, 'critical');
});

test('unsafe-inline beside a nonce is a different, milder finding', () => {
  const result = inspectCsp({
    'content-security-policy':
      "script-src 'self' 'nonce-r4nd0mv4lu3thatisl0ng' 'unsafe-inline'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  });
  const found = ids(result);
  // The backwards-compatibility shape, not the broken one.
  assert.ok(found.has('csp-unsafe-inline-with-nonce'));
  assert.ok(!found.has('csp-unsafe-inline'));
  assert.equal(result.usesNonce, true);
});

test('a policy that does not govern script at all is caught', () => {
  const result = inspectCsp({ 'content-security-policy': "img-src 'self'; style-src 'self'" });
  assert.ok(ids(result).has('csp-no-script-src'));
});

test('script-src falls back to default-src, and the fallback is named', () => {
  const result = inspectCsp({
    'content-security-policy': "default-src 'self' 'unsafe-inline'; object-src 'none'",
  });
  assert.equal(result.scriptSrcFrom, 'default-src');
  assert.ok(ids(result).has('csp-unsafe-inline'));
});

test('a wildcard scheme in script-src allows everything', () => {
  const result = inspectCsp({ 'content-security-policy': 'script-src https:' });
  assert.ok(ids(result).has('csp-wildcard-script-src'));
});

test('a CDN that can be turned against the policy is flagged', () => {
  const result = inspectCsp({
    'content-security-policy': "script-src 'self' ajax.googleapis.com; object-src 'none'",
  });
  assert.ok(ids(result).has('csp-bypassable-host'));
});

test('strict-dynamic excuses the CDN, because the host list stops applying', () => {
  const result = inspectCsp({
    'content-security-policy':
      "script-src 'strict-dynamic' 'nonce-r4nd0mv4lu3thatisl0ng' ajax.googleapis.com; object-src 'none'",
  });
  assert.ok(!ids(result).has('csp-bypassable-host'));
});

test('report-only is reported as protecting nothing', () => {
  const result = inspectCsp({ 'content-security-policy-report-only': "script-src 'self'" });
  assert.equal(result.enforced, false);
  assert.ok(ids(result).has('csp-report-only'));
});

test('data: in script-src is a finding of its own', () => {
  const result = inspectCsp({ 'content-security-policy': "script-src 'self' data:" });
  assert.ok(ids(result).has('csp-data-in-script-src'));
});

test('a well-built policy produces none of the script findings', () => {
  const result = inspectCsp({
    'content-security-policy': [
      "default-src 'self'",
      "script-src 'self' 'sha256-abcdefghijklmnopqrstuvwxyz0123456789ABCDEF='",
      "object-src 'none'", "base-uri 'none'", "frame-ancestors 'none'",
      "form-action 'self'", 'report-uri /csp',
    ].join('; '),
  });
  const found = ids(result);
  for (const id of ['csp-unsafe-inline', 'csp-unsafe-eval', 'csp-wildcard-script-src',
    'csp-no-script-src', 'csp-object-src-not-none', 'csp-no-base-uri']) {
    assert.ok(!found.has(id), `unexpected ${id}`);
  }
  assert.equal(result.usesHash, true);
});

/* ------------------------------------------------------------------ *
 * HSTS
 * ------------------------------------------------------------------ */

test('an HSTS header is parsed into its three parts', () => {
  const parsed = parseHsts('max-age=63072000; includeSubDomains; preload');
  assert.equal(parsed.maxAge, 63072000);
  assert.equal(parsed.includeSubDomains, true);
  assert.equal(parsed.preload, true);
});

test('a short max-age is a finding, and a year is not', async () => {
  const short = await inspectHsts({ 'strict-transport-security': 'max-age=600' }, 'example.com');
  assert.ok(ids(short).has('hsts-max-age-short'));

  const fine = await inspectHsts(
    { 'strict-transport-security': 'max-age=31536000; includeSubDomains' }, 'example.com');
  assert.ok(!ids(fine).has('hsts-max-age-short'));
  assert.equal(fine.longEnough, true);
});

test('claiming preload without being listed is caught', async () => {
  const result = await inspectHsts(
    { 'strict-transport-security': 'max-age=63072000; includeSubDomains; preload' },
    'certainly-not-preloaded.invalid');
  // Only meaningful when the list is actually bundled with this checkout.
  if (result.preloadList.known) {
    assert.ok(ids(result).has('hsts-preload-claimed-not-listed'));
  } else {
    assert.ok(ids(result).has('hsts-preload-list-not-bundled'));
  }
});

test('preload eligibility needs all three parts', async () => {
  const result = await inspectHsts(
    { 'strict-transport-security': 'max-age=31536000; preload' }, 'example.com');
  assert.equal(result.eligibleForPreload, false);
  assert.ok(ids(result).has('hsts-preload-not-eligible'));
});

/* ------------------------------------------------------------------ *
 * Cookies
 * ------------------------------------------------------------------ */

test('a Set-Cookie line is parsed into its attributes', () => {
  const cookie = parseSetCookie('sid=abc123; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=3600');
  assert.equal(cookie.name, 'sid');
  assert.equal(cookie.secure, true);
  assert.equal(cookie.httpOnly, true);
  assert.equal(cookie.sameSite, 'lax');
  assert.equal(cookie.maxAge, 3600);
});

test('SameSite=None without Secure is a hard failure, because browsers drop it', () => {
  const result = inspectCookies({ 'set-cookie': ['sid=abc; SameSite=None'] });
  const finding = result.flags.find(entry => entry.id === 'cookie-samesite-none-without-secure');
  assert.equal(finding.severity, 'high');
  assert.equal(finding.status, 'failed');
});

test('a __Host- cookie with a Domain is refused by the browser', () => {
  const result = inspectCookies({
    'set-cookie': ['__Host-sid=abc; Secure; Path=/; Domain=example.com'],
  });
  const finding = result.flags.find(entry => entry.id === 'cookie-prefix-violated');
  assert.equal(finding.problem, 'has-domain');
});

test('a correct __Host- cookie produces no prefix finding', () => {
  const result = inspectCookies({
    'set-cookie': ['__Host-sid=abc; Secure; Path=/; HttpOnly; SameSite=Lax'],
  });
  const found = ids(result);
  assert.ok(!found.has('cookie-prefix-violated'));
  assert.ok(!found.has('cookie-not-secure'));
  assert.ok(!found.has('cookie-no-prefixes'));
});

test('no cookies at all is not a finding', () => {
  const result = inspectCookies({});
  assert.equal(result.count, 0);
  assert.equal(result.flags.length, 0);
});

/* ------------------------------------------------------------------ *
 * The other headers
 * ------------------------------------------------------------------ */

const response = (headers, rawHeaders = []) => ({ headers, rawHeaders });

test('frame-ancestors satisfies the framing check on its own', () => {
  const withCsp = inspectMisc(response({}), {
    csp: { directives: { 'frame-ancestors': ["'none'"] } },
  });
  assert.ok(!ids(withCsp).has('no-clickjacking-protection'));

  const withNeither = inspectMisc(response({}), { csp: { directives: {} } });
  assert.ok(ids(withNeither).has('no-clickjacking-protection'));
});

test('the two framing headers disagreeing is worth a note', () => {
  const result = inspectMisc(response({ 'x-frame-options': 'DENY' }), {
    csp: { directives: { 'frame-ancestors': ["'self'"] } },
  });
  assert.ok(ids(result).has('framing-headers-disagree'));
});

test('X-Frame-Options: ALLOW-FROM is treated as no protection', () => {
  const result = inspectMisc(response({ 'x-frame-options': 'ALLOW-FROM https://example.com' }), {
    csp: { directives: {} },
  });
  assert.ok(ids(result).has('x-frame-options-allow-from'));
});

test('CORS wildcard with credentials is a failure browsers reject', () => {
  const result = inspectMisc(response({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
  }), { csp: { directives: {} } });
  assert.ok(ids(result).has('cors-wildcard-with-credentials'));
});

test('obsolete headers are named individually', () => {
  const result = inspectMisc(response({
    'x-xss-protection': '1; mode=block',
    'expect-ct': 'max-age=86400',
  }), { csp: { directives: {} } });
  const found = ids(result);
  assert.ok(found.has('obsolete-x-xss-protection'));
  assert.ok(found.has('obsolete-expect-ct'));
});

test('a version in the Server header is a note; a bare product name is not', () => {
  const withVersion = inspectMisc(response({ server: 'nginx/1.24.0' }), { csp: { directives: {} } });
  assert.ok(ids(withVersion).has('version-in-headers'));

  const withoutVersion = inspectMisc(response({ server: 'nginx' }), { csp: { directives: {} } });
  assert.ok(!ids(withoutVersion).has('version-in-headers'));
});

test('a security header sent twice is caught, and set-cookie is not', () => {
  assert.deepEqual(
    duplicatedHeaders(['X-Frame-Options', 'DENY', 'x-frame-options', 'SAMEORIGIN']),
    ['x-frame-options']);
  assert.deepEqual(
    duplicatedHeaders(['Set-Cookie', 'a=1', 'Set-Cookie', 'b=2']),
    []);
});

test('the header inventory shows the gaps, not only what is present', () => {
  const collected = collectHeaders(response({ 'x-frame-options': 'DENY', date: 'now' }));
  const xfo = collected.security.find(entry => entry.name === 'x-frame-options');
  const csp = collected.security.find(entry => entry.name === 'content-security-policy');
  assert.equal(xfo.present, true);
  assert.equal(csp.present, false);
  // Uninteresting headers stay out of the "other" list.
  assert.ok(!collected.other.some(entry => entry.name === 'date'));
});

/* ------------------------------------------------------------------ *
 * The grade
 * ------------------------------------------------------------------ */

function baseReport(overrides = {}) {
  return {
    flags: [],
    chain: { hops: {} },
    csp: {
      present: true, enforced: true, usesNonce: true, strictDynamic: false,
      directives: {}, flags: [],
    },
    hsts: {
      present: true, maxAge: 63072000, includeSubDomains: true, preload: true,
      longEnough: true, preloadList: { known: true, preloaded: true }, flags: [],
    },
    cookies: { count: 1, allSecure: true, allHttpOnly: true, cookies: [], flags: [] },
    misc: { flags: [] },
    protocols: { tls: { protocol: 'TLSv1.3' }, http2: true, flags: [] },
    headers: { present: 10, total: 13 },
    ...overrides,
  };
}

test('a site doing everything right reaches the top of the scale', () => {
  const result = grade(baseReport());
  assert.ok(['A', 'A+'].includes(result.grade), `${result.grade} (${result.score})`);
});

test('unsafe-inline costs more than any other single header', () => {
  const withInline = baseReport();
  withInline.flags = [{ id: 'csp-unsafe-inline', severity: 'critical', status: 'failed' }];

  const withoutReferrer = baseReport();
  withoutReferrer.flags = [{ id: 'no-referrer-policy', severity: 'low', status: 'missing' }];

  assert.ok(grade(withInline).score < grade(withoutReferrer).score);
  assert.ok(grade(withInline).caps.some(cap => cap.reason === 'csp-allows-inline-script'));
});

test('a report-only policy scores far below the same policy enforced', () => {
  const reportOnly = baseReport();
  reportOnly.csp = { ...reportOnly.csp, enforced: false };
  reportOnly.flags = [{ id: 'csp-report-only', severity: 'high', status: 'warning' }];

  const enforced = grade(baseReport()).components.csp.score;
  const observed = grade(reportOnly).components.csp.score;

  // The claim is the gap, not a particular number: a policy that blocks nothing
  // must not score anywhere near one that does.
  assert.ok(observed <= enforced / 2, `${observed} vs ${enforced}`);
  assert.ok(grade(reportOnly).caps.some(cap => cap.reason === 'csp-not-enforced'));
});

test('an alias certificate failure does not fail the whole site', () => {
  const alias = baseReport();
  alias.flags = [{ id: 'certificate-not-trusted-on-alias', severity: 'high', status: 'failed' }];

  const canonical = baseReport();
  canonical.flags = [{ id: 'certificate-not-trusted', severity: 'critical', status: 'failed' }];

  assert.notEqual(grade(alias).grade, 'F');
  assert.equal(grade(canonical).grade, 'F');
});

test('a site that never answered over HTTPS gets no letter', () => {
  const report = baseReport({ incomplete: ['https-did-not-answer'] });
  const result = grade(report);
  assert.equal(result.grade, '?');
  assert.equal(result.reason, 'scan-incomplete');
});

test('the bonus needs a nonce or hash, not merely a policy', () => {
  const plain = baseReport();
  plain.csp = { ...plain.csp, usesNonce: false, usesHash: false };
  assert.notEqual(grade(plain).grade, 'A+');
});
