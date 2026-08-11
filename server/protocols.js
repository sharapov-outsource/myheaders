/**
 * Which protocols the site actually negotiates, rather than which it claims.
 *
 * HTTP/2 is determined by ALPN during the TLS handshake, so the answer comes
 * from the socket the request already opened — no guessing from a header.
 *
 * HTTP/3 cannot be determined that way at all without speaking QUIC, so what is
 * reported is what the site advertises in `Alt-Svc`, and it is labelled as an
 * advertisement rather than as a measurement. Saying "HTTP/3: no" because we
 * did not implement QUIC would be inventing a finding.
 *
 * Compression is measured by asking for everything and seeing what comes back.
 */

import tls from 'node:tls';

import { flag, pace } from '@sharapov/service-kit';

import { request, header } from './http.js';

const ENCODINGS = ['zstd', 'br', 'gzip', 'deflate'];
const ALPN_TIMEOUT = Number(process.env.ALPN_TIMEOUT_MS || 8000);

/**
 * Which protocol the server picks when offered both.
 *
 * A handshake of its own, because the request that fetched the headers had to
 * offer HTTP/1.1 only — a server that accepts `h2` and is then sent an
 * HTTP/1.1 request resets the connection. So the negotiation is measured here
 * and the connection is closed without a byte of HTTP crossing it.
 */
async function negotiateAlpn(hostname, port = 443) {
  await pace('http');
  return new Promise(resolve => {
    let settled = false;
    const finish = value => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try { socket.destroy(); } catch { /* already gone */ }
      resolve(value);
    };

    const socket = tls.connect({
      host: hostname,
      port,
      servername: hostname,
      ALPNProtocols: ['h2', 'http/1.1'],
      rejectUnauthorized: false,
    });
    const timer = setTimeout(() => finish(null), ALPN_TIMEOUT);
    socket.once('secureConnect', () => finish({
      alpn: socket.alpnProtocol || null,
      protocol: socket.getProtocol(),
      cipher: socket.getCipher?.()?.standardName || null,
      authorized: socket.authorized,
    }));
    socket.once('error', () => finish(null));
  });
}

export async function inspectProtocols(url, response) {
  const flags = [];
  const headers = response?.headers || {};

  const target = new URL(url);
  const negotiated = target.protocol === 'https:'
    ? await negotiateAlpn(target.hostname, target.port || 443)
    : null;
  const alpn = negotiated?.alpn ?? null;
  const http2 = alpn === 'h2';

  const altSvc = header(headers, 'alt-svc');
  const advertisesHttp3 = Boolean(altSvc && /h3(-\d+)?=/i.test(altSvc));

  if (!http2 && response?.tls) {
    // Not a security finding; it is the single cheapest performance change
    // available to most sites, and it is invisible until somebody looks.
    flags.push(flag('no-http2', 'low', 'warning', { negotiated: alpn }));
  }
  if (!advertisesHttp3) {
    flags.push(flag('no-http3-advertised', 'info', 'info', {}));
  }

  /* Compression: what the server chose when offered everything. */
  const encoding = String(header(headers, 'content-encoding') || '').toLowerCase();

  /* Which of the others it would have used, asked one at a time. Four extra
     requests is a lot for a detail, so it only runs when the first response
     was compressed at all — a server that sends nothing compressed will not
     start now. */
  const supported = encoding ? [encoding] : [];
  if (encoding) {
    for (const candidate of ENCODINGS) {
      if (candidate === encoding) continue;
      const probe = await request({ url, headers: { 'accept-encoding': candidate } });
      if (probe.ok && String(header(probe.headers, 'content-encoding') || '')
        .toLowerCase().includes(candidate)) {
        supported.push(candidate);
      }
    }
  }

  if (!encoding) {
    flags.push(flag('no-compression', 'low', 'warning', {}));
  } else if (!supported.includes('br') && !supported.includes('zstd')) {
    flags.push(flag('only-legacy-compression', 'info', 'info', { encoding }));
  }

  const connection = negotiated || response?.tls || null;
  if (connection?.protocol && /TLSv1(\.[01])?$/.test(connection.protocol)) {
    flags.push(flag('legacy-tls', 'high', 'weak', { protocol: connection.protocol }));
  }

  return {
    alpn,
    http2,
    http3Advertised: advertisesHttp3,
    altSvc,
    // Named so nobody reads this as a measurement of HTTP/3 itself.
    http3Note: 'advertised only; QUIC is not spoken by this checker',
    httpVersion: response?.httpVersion || null,
    tls: connection,
    compression: { negotiated: encoding || null, supported },
    flags,
  };
}
