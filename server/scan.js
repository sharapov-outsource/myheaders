/**
 * The header check.
 *
 * The redirect chain comes first and everything else reads the response it
 * ended at, because a header set on a redirect is not the header a visitor
 * gets — and reporting the intermediate one is how a site with a perfect
 * landing page and a bare redirector gets graded on the wrong document.
 */

import { withDeadline, incomplete as collectIncomplete, sortFlags } from '@sharapov/service-kit';

import { inspectChain } from './chain.js';
import { collectHeaders } from './headers.js';
import { inspectCsp } from './csp.js';
import { inspectHsts } from './hsts.js';
import { inspectCookies } from './cookies.js';
import { inspectMisc } from './misc.js';
import { inspectProtocols } from './protocols.js';
import { grade } from './grade.js';

export const STAGES = ['resolve', 'chain', 'headers', 'csp', 'cookies', 'protocols', 'grade'];

const SCAN_TIMEOUT = Number(process.env.SCAN_TIMEOUT_MS || 45000);

export async function scan(target, options = {}) {
  return withDeadline(run(target, options), SCAN_TIMEOUT);
}

async function run(target, { onProgress = () => {} } = {}) {
  const domain = target.host;
  const started = Date.now();
  const progress = (stage, extra = {}) =>
    onProgress({ stage, elapsedMs: Date.now() - started, ...extra });

  /* ---------------- the journey ---------------- */
  progress('resolve');
  progress('chain');
  const chain = await inspectChain(domain);
  progress('chain', { done: true, hops: chain.hops?.https?.length ?? 0 });

  const final = chain.final;
  if (!final) {
    const flags = sortFlags(chain.flags);
    return assemble({
      domain, started, chain,
      headers: { security: [], other: [], present: 0, total: 0 },
      csp: { present: false, flags: [] },
      hsts: { present: false, flags: [] },
      cookies: { cookies: [], count: 0, flags: [] },
      misc: { flags: [] },
      protocols: { flags: [] },
      flags,
      incomplete: collectIncomplete(['https-did-not-answer', ...(chain.incomplete || [])]),
    });
  }

  /* ---------------- what the visitor actually receives ---------------- */
  progress('headers');
  const headers = collectHeaders(final);

  progress('csp');
  const csp = inspectCsp(final.headers);

  /* An HSTS header on the plaintext response is ignored by browsers, and worth
     naming when it is the only place it appears. */
  const httpHop = chain.hops?.http?.[0];
  const hsts = await inspectHsts(final.headers, domain, {
    overHttp: Boolean(httpHop && !httpHop.secure && httpHop.status && !final.headers?.[
      'strict-transport-security']),
  });
  progress('csp', { done: true, present: csp.present });

  progress('cookies');
  const cookies = inspectCookies(final.headers, { secureOrigin: final.url.startsWith('https:') });
  const misc = inspectMisc(final, { csp });
  progress('cookies', { done: true, count: cookies.count });

  progress('protocols');
  const protocols = await inspectProtocols(final.url, final);
  progress('protocols', { done: true, http2: protocols.http2 });

  const flags = sortFlags([
    ...chain.flags, ...csp.flags, ...hsts.flags, ...cookies.flags,
    ...misc.flags, ...protocols.flags,
  ]);

  const report = assemble({
    domain, started, chain, headers, csp, hsts, cookies, misc, protocols, flags,
    incomplete: collectIncomplete(chain.incomplete || []),
  });

  progress('grade', { grade: report.grade.grade });
  return report;
}

function assemble({
  domain, started, chain, headers, csp, hsts, cookies, misc, protocols, flags, incomplete,
}) {
  const partial = {
    domain,
    url: chain.canonical,
    chain: { hops: chain.hops, canonical: chain.canonical },
    headers,
    csp,
    hsts,
    cookies,
    misc,
    protocols,
    flags,
    incomplete: incomplete?.length ? incomplete : undefined,
  };

  return {
    ...partial,
    grade: grade(partial),
    meta: {
      elapsedMs: Date.now() - started,
      requests: Object.values(chain.hops || {}).reduce((sum, hops) => sum + hops.length, 0),
      cached: false,
      generatedAt: new Date().toISOString(),
      engine: 'myheaders/1.0',
    },
  };
}
