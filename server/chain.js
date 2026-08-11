/**
 * The redirect chain, from all four places a visitor can arrive.
 *
 * `http://example.com`, `https://example.com`, `http://www.example.com` and
 * `https://www.example.com` are four different journeys, and a site can be
 * configured so that three of them are perfect and the fourth spends a hop in
 * the clear. The usual mistake is normalising in the wrong order:
 *
 *   http://example.com  →  http://www.example.com  →  https://www.example.com
 *
 * That first hop travels unencrypted with the visitor's cookies attached, and
 * it is entirely avoidable: redirect to HTTPS on the *same* host first, then to
 * the canonical name.
 *
 *   http://example.com  →  https://example.com  →  https://www.example.com
 *
 * HSTS only helps after the first successful HTTPS visit, so this matters most
 * for exactly the people arriving for the first time.
 */

import { flag } from '@sharapov/service-kit';

import { request, header } from './http.js';

const MAX_HOPS = 10;

/** Follows redirects one at a time, keeping every hop. */
async function follow(startUrl, { readFinalBody = false } = {}) {
  const hops = [];
  const seen = new Set();
  let url = startUrl;

  for (let i = 0; i < MAX_HOPS; i++) {
    if (seen.has(url)) {
      hops.push({ url, error: 'loop' });
      return { hops, final: null, loop: true };
    }
    seen.add(url);

    const response = await request({ url, readBody: readFinalBody });
    if (!response.ok) {
      hops.push({ url, error: response.error, detail: response.detail, elapsedMs: response.elapsedMs });
      return { hops, final: null, failed: true };
    }

    const location = header(response.headers, 'location');
    const redirecting = response.status >= 300 && response.status < 400 && location;

    hops.push({
      url,
      status: response.status,
      secure: url.startsWith('https:'),
      location: location || null,
      server: header(response.headers, 'server'),
      elapsedMs: response.elapsedMs,
      certificateValid: response.tls ? response.tls.authorized : null,
      certificateError: response.tls?.authorizationError || null,
    });

    if (!redirecting) return { hops, final: response };

    try {
      url = new URL(location, url).toString();
    } catch {
      hops.push({ url: location, error: 'bad-location' });
      return { hops, final: null, failed: true };
    }
  }

  return { hops, final: null, tooManyHops: true };
}

/** `example.com` → the four ways in. */
function entryPoints(host) {
  const bare = host.replace(/^www\./, '');
  const www = host.startsWith('www.') ? host : `www.${bare}`;
  return [
    { key: 'http', url: `http://${bare}/` },
    { key: 'https', url: `https://${bare}/` },
    { key: 'http-www', url: `http://${www}/` },
    { key: 'https-www', url: `https://${www}/` },
  ];
}

export async function inspectChain(domain) {
  const flags = [];
  const incomplete = [];
  const journeys = {};

  for (const entry of entryPoints(domain)) {
    /* Only the canonical HTTPS journey needs the body, and only for the CSP
       report on inline script — the rest are about the hops themselves. */
    const readFinalBody = entry.key === 'https';
    journeys[entry.key] = await follow(entry.url, { readFinalBody });
  }

  const httpsJourney = journeys.https;
  const primary = httpsJourney.final || journeys['https-www'].final;

  if (!primary) {
    flags.push(flag('https-unreachable', 'critical', 'failed', {}));
    incomplete.push('https-did-not-answer');
  }

  for (const [key, journey] of Object.entries(journeys)) {
    if (journey.loop) flags.push(flag('redirect-loop', 'high', 'failed', { from: key }));
    if (journey.tooManyHops) flags.push(flag('too-many-redirects', 'medium', 'warning', { from: key }));
  }

  /* The plaintext entry points. */
  for (const key of ['http', 'http-www']) {
    const journey = journeys[key];
    const first = journey.hops[0];
    if (!first || first.error) {
      // Refusing port 80 outright is a legitimate choice, and a slightly
      // awkward one: a visitor typing the bare name gets a connection error
      // rather than a redirect.
      flags.push(flag('http-not-served', 'info', 'info', { from: key }));
      continue;
    }
    if (!first.location) {
      flags.push(flag('http-does-not-redirect', 'critical', 'failed', { from: key }));
      continue;
    }

    const target = safeUrl(first.location, first.url);
    if (target && target.protocol !== 'https:') {
      /* The first hop is the whole point. Redirecting to another plaintext URL
         means the visitor's request — cookies included — crosses the network
         unprotected at least twice. */
      flags.push(flag('redirect-stays-on-http', 'high', 'failed', {
        from: key, to: first.location,
      }));
    } else if (target && target.hostname !== new URL(first.url).hostname) {
      // Went to HTTPS and changed host in the same hop: correct destination,
      // and it costs nothing to do the host change on the second hop instead.
      flags.push(flag('redirect-changes-host-and-scheme', 'low', 'warning', {
        from: key, to: first.location,
      }));
    }

    if (first.status !== 301 && first.status !== 308) {
      flags.push(flag('redirect-not-permanent', 'low', 'warning', {
        from: key, status: first.status,
      }));
    }
  }

  /* Certificates, on every HTTPS hop rather than only the last.

     A failure on the canonical journey and one on an alias are different
     problems. If the site a visitor actually lands on presents a bad
     certificate, nothing else about the configuration matters. If it is the
     `www` name that is not covered — a very common oversight, since the
     redirect still works in curl and only browsers complain — the site itself
     is fine and the alias is broken. Grading both the same way would fail a
     healthy site for a mistake on a name it redirects away from. */
  const canonicalKeys = new Set(['https', journeys.https.final ? null : 'https-www'].filter(Boolean));
  for (const [key, journey] of Object.entries(journeys)) {
    for (const hop of journey.hops) {
      if (hop.certificateValid !== false) continue;
      const onCanonical = canonicalKeys.has(key);
      flags.push(flag(
        onCanonical ? 'certificate-not-trusted' : 'certificate-not-trusted-on-alias',
        onCanonical ? 'critical' : 'high',
        'failed',
        { from: key, url: hop.url, reason: hop.certificateError }));
    }
  }

  const canonical = primary ? new URL(primary.url) : null;
  const wwwFinal = journeys['https-www'].final;
  const bareFinal = journeys.https.final;
  if (wwwFinal && bareFinal) {
    const wwwEnd = lastUrl(journeys['https-www']);
    const bareEnd = lastUrl(journeys.https);
    if (wwwEnd && bareEnd && wwwEnd !== bareEnd) {
      // Both names serve content and neither redirects to the other: the same
      // pages exist at two addresses, which splits cookies, caches and links.
      flags.push(flag('www-and-bare-both-serve', 'low', 'warning',
        { www: wwwEnd, bare: bareEnd }));
    }
  }

  return {
    journeys,
    canonical: canonical ? canonical.toString() : null,
    final: primary || null,
    hops: Object.fromEntries(Object.entries(journeys).map(([key, journey]) =>
      [key, journey.hops])),
    flags,
    incomplete,
  };
}

function safeUrl(location, base) {
  try { return new URL(location, base); } catch { return null; }
}

function lastUrl(journey) {
  const hop = journey.hops[journey.hops.length - 1];
  return hop ? hop.url : null;
}
