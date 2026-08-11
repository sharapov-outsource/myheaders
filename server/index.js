/**
 * myheaders — the HTTP layer.
 *
 *   GET /                          the page
 *   GET /<domain>                  page for a domain (JSON for console clients)
 *   GET /api/<domain>              always data
 *   GET /api/stream/<domain>       the same check as server-sent events
 *   GET /healthz                   liveness probe
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createService, parseDomain, localizeReport } from '@sharapov/service-kit';

import { scan, STAGES } from './scan.js';
import { preloadStats } from './preload.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const service = await createService({
  slug: 'myheaders',
  name: 'Headers Check',
  domain: 'myheaders.sharapov.biz',
  port: 3028,
  root: ROOT,
  stages: STAGES,

  parse: raw => parseDomain(raw),
  pathFor: target => target.host,
  cacheKey: target => target.host,
  run: (target, options) => scan(target, options),

  errors: ['https-did-not-answer', 'network', 'dns-failed'],

  examples: ['github.com', 'sharapov.biz', 'developer.mozilla.org'],

  usage: {
    checks: [
      'the redirect chain from all four entry points, http and https, with and without www',
      'CSP taken apart directive by directive, including bypassable CDN hosts',
      'HSTS, and actual membership of the Chromium preload list rather than the claim',
      'cookie flags and the __Host- / __Secure- prefixes',
      'framing, sniffing, referrer, permissions and the isolation headers',
      'HTTP/2 by ALPN, HTTP/3 as advertised, and compression',
    ],
  },

  health: async () => ({ hstsPreloadList: await preloadStats() }),

  localize: (report, lang) => localizeReport(report, service.i18n, lang, (out, language) => {
    const { tCode } = service.i18n;
    if (Array.isArray(out.incomplete)) {
      out.incompleteLabels = out.incomplete.map(code => tCode(language, 'inc', code));
    }
  }),
});

await service.start();

export { service };
