#!/usr/bin/env node
/**
 * The checker without the web server, for when a terminal is enough:
 *
 *   npm run scan -- example.com
 *   npm run scan -- example.com --json
 */

import { scan } from '../server/scan.js';

const args = process.argv.slice(2);
const domain = args.find(argument => !argument.startsWith('-'));
const asJson = args.includes('--json');

if (!domain) {
  console.error('usage: npm run scan -- <domain> [--json]');
  process.exit(2);
}

const report = await scan({ host: domain }, {
  onProgress: event => {
    if (asJson) return;
    process.stderr.write(`  ${event.stage}${event.done ? ' ✓' : '…'}\n`);
  },
});

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const line = (label, value) => console.log(`  ${String(label).padEnd(22)} ${value}`);

console.log(`\n${report.domain} — grade ${report.grade.grade} (${report.grade.score})\n`);
line('lands on', report.url || '—');
for (const [name, component] of Object.entries(report.grade.components)) {
  line(name, `${component.score} × ${component.weight}`);
}
for (const [entry, hops] of Object.entries(report.chain.hops || {})) {
  line(entry, hops.map(hop => hop.status || hop.error).join(' → '));
}
line('csp', report.csp.present
  ? `${report.csp.enforced ? 'enforced' : 'report-only'}, ${report.csp.directiveCount} directives` +
    `${report.csp.usesNonce || report.csp.usesHash ? ', nonce/hash' : ''}`
  : 'none');
line('hsts', report.hsts.present
  ? `max-age=${report.hsts.maxAge}${report.hsts.includeSubDomains ? ' +subdomains' : ''}` +
    `${report.hsts.preloadList?.known ? ` · listed: ${report.hsts.preloadList.preloaded}` : ''}`
  : 'none');
line('headers', `${report.headers.present}/${report.headers.total} present`);
line('cookies', String(report.cookies.count));
line('protocols', `alpn=${report.protocols.alpn} · ${report.protocols.tls?.protocol} · ` +
  `${report.protocols.compression.supported.join('/') || 'no compression'}`);

if (report.incomplete?.length) {
  console.log(`\n  incomplete: ${report.incomplete.join(', ')}`);
}

console.log('\nfindings:');
if (!report.flags.length) console.log('  none');
for (const finding of report.flags) {
  console.log(`  ${finding.severity.padEnd(8)} ${finding.id}`);
}
console.log(`\n${report.meta.queries} queries in ${report.meta.elapsedMs} ms\n`);
