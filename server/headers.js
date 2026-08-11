/**
 * The response headers as a plain list, for the reader who wants to see them
 * rather than read a verdict about them.
 *
 * Two lists: the ones that carry a security decision, in a fixed order so the
 * gaps are visible, and everything else the server sent.
 */

const SECURITY_HEADERS = [
  'strict-transport-security',
  'content-security-policy',
  'content-security-policy-report-only',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
  'cross-origin-opener-policy',
  'cross-origin-embedder-policy',
  'cross-origin-resource-policy',
  'access-control-allow-origin',
  'report-to',
  'nel',
];

/** Headers that are noise in a report about security. */
const UNINTERESTING = new Set([
  'date', 'content-length', 'connection', 'keep-alive', 'transfer-encoding',
  'accept-ranges', 'age', 'etag', 'last-modified', 'vary', 'content-type',
]);

export function collectHeaders(response) {
  const headers = response?.headers || {};

  const security = SECURITY_HEADERS.map(name => ({
    name,
    value: Array.isArray(headers[name]) ? headers[name].join(' , ') : (headers[name] ?? null),
    present: headers[name] !== undefined,
  }));

  const other = Object.entries(headers)
    .filter(([name]) => !SECURITY_HEADERS.includes(name) && !UNINTERESTING.has(name))
    .map(([name, value]) => ({
      name,
      value: Array.isArray(value) ? value.join(' , ') : String(value),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    security,
    other,
    present: security.filter(entry => entry.present).length,
    total: SECURITY_HEADERS.length,
  };
}

export { SECURITY_HEADERS };
