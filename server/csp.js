/**
 * The content security policy, taken apart directive by directive.
 *
 * This is the one check on this page where being thorough is the only way to be
 * useful, because a CSP that looks strict and is not is very common. The
 * failures worth naming:
 *
 *   · `'unsafe-inline'` in `script-src`. The single most common one, and it
 *     turns the policy into decoration: an injected `<script>` runs. Nonces and
 *     hashes exist precisely so this is never needed.
 *   · a nonce or a hash *together with* `'unsafe-inline'`. In CSP 2 the
 *     `'unsafe-inline'` wins; from CSP 3 a browser that understands nonces
 *     ignores it. So the policy means different things in different browsers,
 *     which is the worst of both.
 *   · `data:` in `script-src`. `data:` URLs are same-origin-ish enough to
 *     execute and are trivially constructed by an attacker.
 *   · a wildcard host, or a CDN known to serve JSONP. `*.googleapis.com` was
 *     the canonical example: a policy allowing it can be turned into arbitrary
 *     script execution through an endpoint that echoes a caller-supplied
 *     callback name. Allowing a large CDN is close to allowing anything.
 *   · no `object-src`, no `base-uri`. `<object>` runs plugins; `<base>` rewrites
 *     every relative URL on the page, including the ones the policy allows.
 *   · report-only. A policy that reports and does not enforce protects nothing,
 *     and it is easy to forget which one is deployed.
 */

import { flag } from '@sharapov/service-kit';

import { headerValues } from './http.js';

/** Directives that fall back to `default-src` when absent. */
const FETCH_DIRECTIVES = [
  'script-src', 'style-src', 'img-src', 'connect-src', 'font-src', 'media-src',
  'object-src', 'frame-src', 'worker-src', 'manifest-src', 'child-src',
];

/**
 * CDN hosts that have historically offered JSONP or arbitrary script hosting,
 * which makes allowing them close to allowing anything. The list is short and
 * deliberately conservative — it names hosts, not organisations.
 */
const BYPASSABLE = [
  'ajax.googleapis.com', '*.googleapis.com', 'www.google.com', '*.google.com',
  'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'unpkg.com', '*.jsdelivr.net',
  'ajax.aspnetcdn.com', 'code.jquery.com', 'stackpath.bootstrapcdn.com',
];

export function parseCsp(text) {
  const directives = {};
  for (const part of String(text).split(';')) {
    const tokens = part.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) continue;
    const name = tokens[0].toLowerCase();
    // A directive repeated inside one policy: the first occurrence wins.
    if (!(name in directives)) directives[name] = tokens.slice(1);
  }
  return directives;
}

/** What actually applies to a directive once the fallback is taken into account. */
function effective(directives, name) {
  if (directives[name]) return { sources: directives[name], from: name };
  if (FETCH_DIRECTIVES.includes(name) && directives['default-src']) {
    return { sources: directives['default-src'], from: 'default-src' };
  }
  return { sources: null, from: null };
}

const has = (sources, token) => (sources || []).some(source => source.toLowerCase() === token);
const hasPrefix = (sources, prefix) =>
  (sources || []).some(source => source.toLowerCase().startsWith(prefix));

export function inspectCsp(headers) {
  const flags = [];

  const enforced = headerValues(headers, 'content-security-policy');
  const reportOnly = headerValues(headers, 'content-security-policy-report-only');

  if (!enforced.length && !reportOnly.length) {
    flags.push(flag('csp-missing', 'high', 'missing', {}));
    return { present: false, reportOnlyOnly: false, flags };
  }

  if (!enforced.length && reportOnly.length) {
    flags.push(flag('csp-report-only', 'high', 'warning', {}));
  }

  /* Two enforced policies both apply, and the effective result is the
     intersection — which is stricter than either, and almost never what was
     intended when the second one was added by a plugin. */
  if (enforced.length > 1) {
    flags.push(flag('csp-multiple-policies', 'medium', 'warning', { count: enforced.length }));
  }

  const source = enforced[0] || reportOnly[0];
  const directives = parseCsp(source);
  const scriptSrc = effective(directives, 'script-src');
  const styleSrc = effective(directives, 'style-src');
  const objectSrc = effective(directives, 'object-src');

  const analysis = {
    present: true,
    enforced: enforced.length > 0,
    reportOnly: reportOnly.length > 0,
    policy: source,
    directives,
    directiveCount: Object.keys(directives).length,
    scriptSrc: scriptSrc.sources,
    scriptSrcFrom: scriptSrc.from,
  };

  if (!directives['default-src'] && !directives['script-src']) {
    // Nothing governs script at all: the policy may set a dozen other
    // directives and still allow any script from anywhere.
    flags.push(flag('csp-no-script-src', 'critical', 'failed', {}));
  }

  const script = scriptSrc.sources;
  if (script) {
    const unsafeInline = has(script, "'unsafe-inline'");
    const nonce = hasPrefix(script, "'nonce-");
    const hash = hasPrefix(script, "'sha");
    const strictDynamic = has(script, "'strict-dynamic'");

    analysis.usesNonce = nonce;
    analysis.usesHash = hash;
    analysis.strictDynamic = strictDynamic;

    if (unsafeInline && !nonce && !hash) {
      flags.push(flag('csp-unsafe-inline', 'critical', 'failed', { directive: scriptSrc.from }));
    } else if (unsafeInline && (nonce || hash)) {
      // Kept for CSP 2 browsers and ignored by CSP 3 ones: the policy means
      // two different things depending on who is reading it.
      flags.push(flag('csp-unsafe-inline-with-nonce', 'medium', 'warning',
        { directive: scriptSrc.from }));
    }

    if (has(script, "'unsafe-eval'")) {
      flags.push(flag('csp-unsafe-eval', 'high', 'weak', { directive: scriptSrc.from }));
    }
    if (hasPrefix(script, 'data:')) {
      flags.push(flag('csp-data-in-script-src', 'high', 'failed', {}));
    }
    if (has(script, '*') || hasPrefix(script, 'https:') || hasPrefix(script, 'http:')) {
      flags.push(flag('csp-wildcard-script-src', 'critical', 'failed', {}));
    }

    const wildcardHosts = script.filter(entry => entry.includes('*') && entry !== '*');
    if (wildcardHosts.length) {
      flags.push(flag('csp-wildcard-host', 'medium', 'warning', { hosts: wildcardHosts }));
    }

    const bypassable = script.filter(entry =>
      BYPASSABLE.includes(entry.toLowerCase().replace(/^https?:\/\//, '')));
    if (bypassable.length && !strictDynamic) {
      flags.push(flag('csp-bypassable-host', 'high', 'weak', { hosts: bypassable }));
    }

    if (nonce || hash) {
      const shortNonce = script.filter(entry =>
        entry.toLowerCase().startsWith("'nonce-") && entry.length < 24);
      if (shortNonce.length) {
        flags.push(flag('csp-short-nonce', 'medium', 'weak', {}));
      }
    }
  }

  if (styleSrc.sources && has(styleSrc.sources, "'unsafe-inline'")) {
    // Real, and far less severe than the same thing in script-src: it enables
    // styling attacks and data exfiltration through selectors, not execution.
    flags.push(flag('csp-unsafe-inline-style', 'low', 'warning', {}));
  }

  if (!objectSrc.sources || !has(objectSrc.sources, "'none'")) {
    flags.push(flag('csp-object-src-not-none', 'medium', 'warning',
      { current: objectSrc.sources || null }));
  }
  if (!directives['base-uri']) {
    // Without it, an injected <base> rewrites every relative URL on the page —
    // including the script sources the policy carefully allowed.
    flags.push(flag('csp-no-base-uri', 'medium', 'warning', {}));
  }
  if (!directives['frame-ancestors']) {
    flags.push(flag('csp-no-frame-ancestors', 'medium', 'warning', {}));
  }
  if (!directives['form-action']) {
    flags.push(flag('csp-no-form-action', 'low', 'warning', {}));
  }
  if (!directives['report-uri'] && !directives['report-to']) {
    flags.push(flag('csp-no-reporting', 'low', 'warning', {}));
  }

  analysis.strict = Boolean(
    script && !has(script, "'unsafe-inline'") && !has(script, "'unsafe-eval'") &&
    !has(script, '*') && (analysis.usesNonce || analysis.usesHash ||
      script.every(entry => entry.startsWith("'") || !entry.includes('*'))));

  return { ...analysis, flags };
}
