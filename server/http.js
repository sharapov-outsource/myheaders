/**
 * One HTTP request, with the parts that matter kept rather than abstracted away.
 *
 * Node's `fetch` is not usable here for three reasons: it follows redirects and
 * this service exists to look at each hop; it will not surrender the ALPN
 * protocol, which is how HTTP/2 support is actually determined; and it refuses
 * a bad certificate rather than reporting it, when a bad certificate is exactly
 * the sort of thing a report should mention.
 *
 * So this is `http.request` with the redirect handling left off and the socket
 * details read back out.
 */

import http from 'node:http';
import https from 'node:https';
import dns from 'node:dns';
import net from 'node:net';
import { once } from 'node:events';

import { pace, isPrivateAddress, allowPrivate } from '@sharapov/service-kit';

const TIMEOUT = Number(process.env.HTTP_TIMEOUT_MS || 10000);
const MAX_BODY = Number(process.env.HTTP_MAX_BODY || 256 * 1024);

const USER_AGENT = process.env.HTTP_USER_AGENT ||
  'Mozilla/5.0 (compatible; myheaders/1.0; +https://myheaders.sharapov.biz)';

/* ------------------------------------------------------------------ *
 * The guard
 *
 * A redirect chain goes wherever the sites in it say, and a Location header
 * can name any address: `http://169.254.169.254/` is the metadata endpoint of
 * the cloud this runs in, `http://127.0.0.1:6379/` is a database on the same
 * machine. Every socket this service opens goes through the two functions
 * below, and neither a name nor a literal address inside a private network
 * gets one.
 * ------------------------------------------------------------------ */

function refusal(address) {
  return Object.assign(new Error(`refused to connect to ${address}`), { code: 'PRIVATE_ADDRESS', address });
}

/**
 * Name resolution that refuses a private answer before a connection is tried.
 *
 * Every address is checked, not only the first: a name that answers with one
 * public and one private address is refused outright, because which of the two
 * a connection ends up using is not something to leave to Happy Eyeballs. And
 * the check is part of the lookup the socket uses, so a name that answers
 * differently the second time it is asked — the rebinding trick — is judged on
 * the answer it is actually connected to.
 */
export function guardedLookup(hostname, options, callback) {
  if (typeof options === 'function') { callback = options; options = {}; }
  if (typeof options === 'number') options = { family: options };
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err);
    const inside = allowPrivate() ? null : addresses.find(entry => isPrivateAddress(entry.address));
    if (inside) return callback(refusal(inside.address));
    if (options.all) return callback(null, addresses);
    return callback(null, addresses[0].address, addresses[0].family);
  });
}

/**
 * A literal address is never resolved, so no lookup ever sees it. This is the
 * check for the address a Location header names outright; it returns the
 * address when it must be refused, and null when it may be connected to.
 */
export function privateLiteral(hostname) {
  const host = String(hostname || '').replace(/^\[|\]$/g, '');
  return net.isIP(host) && !allowPrivate() && isPrivateAddress(host) ? host : null;
}

/**
 * @param {object} options
 * @param {string} options.url
 * @param {string} [options.method]   HEAD is tempting and unreliable — many
 *                                    sites answer it differently, or not at all
 * @param {boolean} [options.body]    read some of the body
 * @returns {Promise<object>} status, headers, timing and connection details
 */
export async function request({ url, method = 'GET', readBody = false, headers = {} }) {
  const target = new URL(url);
  const literal = privateLiteral(target.hostname);
  if (literal) return { url, ok: false, error: 'private-address', address: literal, elapsedMs: 0 };

  await pace('http');

  const secure = target.protocol === 'https:';
  const agent = secure ? https : http;

  const started = Date.now();
  const requestOptions = {
    method,
    protocol: target.protocol,
    hostname: target.hostname,
    port: target.port || (secure ? 443 : 80),
    path: target.pathname + target.search,
    headers: {
      host: target.host,
      'user-agent': USER_AGENT,
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en',
      // Asked for explicitly so the answer says which of them the server does.
      'accept-encoding': 'gzip, deflate, br, zstd',
      connection: 'close',
      ...headers,
    },
    // The certificate is one of the things being reported on, so a bad one must
    // not abort the request.
    rejectUnauthorized: false,
    /* Only HTTP/1.1 is offered here, and that is not laziness. `https.request`
       speaks HTTP/1.1; if the server accepts `h2` through ALPN and then
       receives an HTTP/1.1 request, it resets the connection — every request
       to a modern site fails with ECONNRESET. Whether the site supports HTTP/2
       is answered by a separate handshake in protocols.js, which is the honest
       way to measure it anyway. */
    ALPNProtocols: secure ? ['http/1.1'] : undefined,
    /* `setHost: false` lets the Host header be written explicitly above — and
       it also stops node deriving the SNI name, which is not obvious and is
       expensive to miss: without SNI a shared host answers with its default
       certificate, `socket.authorized` comes back false, and the report accuses
       a perfectly good site of an untrusted certificate. */
    servername: secure ? target.hostname : undefined,
    setHost: false,
    lookup: guardedLookup,
  };

  return new Promise(resolve => {
    let settled = false;
    const finish = value => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };

    const timer = setTimeout(() => {
      client.destroy();
      finish({ url, ok: false, error: 'timeout', elapsedMs: Date.now() - started });
    }, TIMEOUT);

    const client = agent.request(requestOptions);

    /* The lookup refuses a private address before anything is connected; the
       address the socket actually reached is checked once more, in case
       anything ever reaches a socket without going through it. */
    client.on('socket', socket => {
      socket.once('connect', () => {
        const address = socket.remoteAddress;
        if (address && !allowPrivate() && isPrivateAddress(address)) {
          client.destroy();
          finish({ url, ok: false, error: 'private-address', address, elapsedMs: Date.now() - started });
        }
      });
    });

    client.on('error', err => {
      finish({
        url, ok: false,
        error: err.code === 'PRIVATE_ADDRESS' ? 'private-address'
          : err.code === 'ENOTFOUND' ? 'dns-failed' : (err.code || 'network'),
        address: err.address,
        detail: err.message,
        elapsedMs: Date.now() - started,
      });
    });

    client.on('response', async response => {
      const socket = response.socket;
      const tls = secure && socket.getProtocol ? {
        protocol: socket.getProtocol(),
        cipher: socket.getCipher?.()?.standardName || null,
        authorized: socket.authorized,
        authorizationError: socket.authorizationError ? String(socket.authorizationError) : null,
      } : null;

      let body = '';
      if (readBody) {
        let size = 0;
        response.on('data', chunk => {
          size += chunk.length;
          if (size <= MAX_BODY) body += chunk.toString('utf8');
          if (size > MAX_BODY) response.destroy();
        });
        await once(response, 'close').catch(() => {});
      } else {
        response.resume();
      }

      finish({
        url,
        ok: true,
        status: response.statusCode,
        statusText: response.statusMessage,
        httpVersion: response.httpVersion,
        headers: response.headers,
        rawHeaders: response.rawHeaders,
        address: socket.remoteAddress,
        tls,
        body: readBody ? body : undefined,
        elapsedMs: Date.now() - started,
      });
    });

    client.end();
  });
}

/**
 * A header that may legitimately appear more than once — `set-cookie` always
 * arrives as an array, everything else as a string or not at all.
 */
export function headerValues(headers, name) {
  const value = headers?.[name.toLowerCase()];
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

export function header(headers, name) {
  return headerValues(headers, name)[0] ?? null;
}

/**
 * The same header sent twice with different values is worth catching: browsers
 * disagree about which one wins, and for a security header that disagreement
 * decides whether the policy applies.
 */
export function duplicatedHeaders(rawHeaders = []) {
  const seen = new Map();
  for (let i = 0; i < rawHeaders.length; i += 2) {
    const name = String(rawHeaders[i]).toLowerCase();
    if (name === 'set-cookie') continue;               // repetition is correct here
    seen.set(name, (seen.get(name) || 0) + 1);
  }
  return [...seen.entries()].filter(([, count]) => count > 1).map(([name]) => name);
}
