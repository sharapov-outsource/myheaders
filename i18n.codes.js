/**
 * Every code this service can put in a report.
 *
 * Flag identifiers are read out of the source so the list cannot go stale —
 * except for the obsolete-header family, which misc.js builds from a template
 * literal and no regular expression can see. Those are listed by hand, next to
 * the table they come from.
 */

import path from 'node:path';
import { codesFrom } from '@sharapov/service-kit/check-i18n';

import { CAPS } from './server/grade.js';

/** Built as `obsolete-${code}` in misc.js, so they cannot be extracted. */
const OBSOLETE = [
  'obsolete-x-xss-protection', 'obsolete-expect-ct', 'obsolete-p3p',
  'obsolete-x-webkit-csp', 'obsolete-x-content-security-policy',
];

export default function codes(root) {
  const server = file => path.join(root, 'server', file);

  const flags = [
    'chain.js', 'csp.js', 'hsts.js', 'cookies.js', 'misc.js', 'protocols.js',
  ].flatMap(file => codesFrom(server(file), /flag\('([a-z0-9-]+)'/g));

  const all = [...flags, ...OBSOLETE];

  return {
    flag: all,
    fd: all,
    stage: ['resolve', 'chain', 'headers', 'csp', 'cookies', 'protocols', 'grade'],
    comp: ['transport', 'csp', 'headers'],
    cap: [...CAPS.map(([, , reason]) => reason), 'scan-incomplete'],
    inc: ['https-did-not-answer'],
    entry: ['http', 'https', 'http-www', 'https-www'],
    err: [
      'invalid-host', 'domain-expected', 'invalid-port', 'port-not-allowed', 'dns-failed',
      'private-address', 'unreachable', 'scan-timeout', 'stage-timeout', 'scan-failed',
      'busy', 'bad-output', 'network', 'bad-response', 'timeout', 'https-did-not-answer',
    ],
    sev: ['critical', 'high', 'medium', 'low', 'info'],
    st: ['ok', 'safe', 'warning', 'weak', 'missing', 'unknown', 'partial', 'failed', 'info', 'vulnerable'],
  };
}
