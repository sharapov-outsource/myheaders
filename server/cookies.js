/**
 * Cookies, as the response sets them.
 *
 * Only cookies set on the landing page are visible from here — a session cookie
 * issued after login is not, and the report says so rather than implying the
 * list is complete.
 *
 * The prefixes are the part most worth knowing about, because they are the only
 * cookie protection a browser actually enforces rather than merely respects.
 * `__Host-` is refused unless the cookie is Secure, has no Domain, and has
 * Path=/. That makes it impossible for a subdomain to overwrite it, which is
 * the one thing `Secure` and `HttpOnly` between them cannot prevent.
 */

import { flag } from '@sharapov/service-kit';

import { headerValues } from './http.js';

export function parseSetCookie(value) {
  const parts = String(value).split(';');
  const [name, ...rest] = parts[0].split('=');
  const attributes = {};
  for (const part of parts.slice(1)) {
    const index = part.indexOf('=');
    const key = (index < 0 ? part : part.slice(0, index)).trim().toLowerCase();
    const attributeValue = index < 0 ? true : part.slice(index + 1).trim();
    if (key) attributes[key] = attributeValue;
  }
  return {
    name: name.trim(),
    valueLength: rest.join('=').length,
    secure: 'secure' in attributes,
    httpOnly: 'httponly' in attributes,
    sameSite: typeof attributes.samesite === 'string' ? attributes.samesite.toLowerCase() : null,
    domain: typeof attributes.domain === 'string' ? attributes.domain : null,
    path: typeof attributes.path === 'string' ? attributes.path : null,
    expires: typeof attributes.expires === 'string' ? attributes.expires : null,
    maxAge: attributes['max-age'] !== undefined ? Number(attributes['max-age']) : null,
    partitioned: 'partitioned' in attributes,
  };
}

/** `__Host-` and `__Secure-` carry requirements a browser enforces. */
function prefixProblem(cookie) {
  if (cookie.name.startsWith('__Host-')) {
    if (!cookie.secure) return 'not-secure';
    if (cookie.domain) return 'has-domain';
    if (cookie.path !== '/') return 'wrong-path';
    return null;
  }
  if (cookie.name.startsWith('__Secure-') && !cookie.secure) return 'not-secure';
  return null;
}

export function inspectCookies(headers, { secureOrigin = true } = {}) {
  const flags = [];
  const raw = headerValues(headers, 'set-cookie');
  const cookies = raw.map(parseSetCookie);

  if (!cookies.length) {
    return { cookies: [], count: 0, note: 'no cookies on the landing page', flags };
  }

  for (const cookie of cookies) {
    if (secureOrigin && !cookie.secure) {
      // Without Secure the cookie is sent over plain HTTP too, which is how a
      // session survives HTTPS everywhere and still leaks.
      flags.push(flag('cookie-not-secure', 'high', 'weak', { cookie: cookie.name }));
    }
    if (!cookie.httpOnly) {
      // Not always wrong — some cookies are read by script on purpose — so it
      // is a warning rather than a failure.
      flags.push(flag('cookie-not-httponly', 'medium', 'warning', { cookie: cookie.name }));
    }
    if (!cookie.sameSite) {
      // Browsers now default to Lax, but the default is not the same as saying
      // so, and the ones that need None must say it explicitly to work at all.
      flags.push(flag('cookie-no-samesite', 'low', 'warning', { cookie: cookie.name }));
    } else if (cookie.sameSite === 'none' && !cookie.secure) {
      // SameSite=None without Secure is rejected outright by every current
      // browser, so this cookie simply does not exist for visitors.
      flags.push(flag('cookie-samesite-none-without-secure', 'high', 'failed',
        { cookie: cookie.name }));
    }

    const problem = prefixProblem(cookie);
    if (problem) {
      // The browser refuses the cookie entirely, which usually shows up as a
      // login that silently does not work.
      flags.push(flag('cookie-prefix-violated', 'high', 'failed',
        { cookie: cookie.name, problem }));
    }

    if (cookie.maxAge !== null && cookie.maxAge > 34560000) {
      flags.push(flag('cookie-very-long-lived', 'low', 'warning',
        { cookie: cookie.name, maxAge: cookie.maxAge }));
    }
  }

  const protectedByPrefix = cookies.filter(cookie => /^__(Host|Secure)-/.test(cookie.name));
  if (cookies.length && !protectedByPrefix.length) {
    flags.push(flag('cookie-no-prefixes', 'info', 'info', {}));
  }

  return {
    cookies,
    count: cookies.length,
    allSecure: cookies.every(cookie => cookie.secure),
    allHttpOnly: cookies.every(cookie => cookie.httpOnly),
    flags,
  };
}
