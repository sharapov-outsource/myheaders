/**
 * The private-address guard, against sockets opened on this machine.
 *
 * Every other test in this directory works on captured headers; this one needs
 * a socket, because what it proves is that none gets opened. A listener on
 * 127.0.0.1 counts its connections, and each case asserts the count stayed at
 * nothing — refused before connecting, not connected and then dropped.
 */

import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import dns from 'node:dns';

import { request } from '../server/http.js';
import { inspectProtocols } from '../server/protocols.js';

let listener;
let port;
let connections = 0;

before(async () => {
  delete process.env.ALLOW_PRIVATE_TARGETS;
  listener = net.createServer(socket => {
    connections++;
    socket.end('HTTP/1.1 200 OK\r\nContent-Length: 8\r\nConnection: close\r\n\r\ninternal');
  });
  await new Promise(resolve => listener.listen(0, '127.0.0.1', resolve));
  port = listener.address().port;
});

after(() => listener.close());

beforeEach(() => { connections = 0; });

/** Makes every name resolve to the given answers for the length of `run`. */
async function resolvingTo(addresses, run) {
  const original = dns.lookup;
  dns.lookup = (host, options, callback) => callback(null, addresses);
  try {
    return await run();
  } finally {
    dns.lookup = original;
  }
}

test('an address a Location header names outright is refused before a socket exists', async () => {
  for (const url of [
    `http://127.0.0.1:${port}/latest/meta-data/`,
    `http://0x7f000001:${port}/`,               // the URL parser turns this into 127.0.0.1
    'http://169.254.169.254/latest/meta-data/',
    'http://[::1]/',
  ]) {
    const answer = await request({ url });
    assert.equal(answer.ok, false, url);
    assert.equal(answer.error, 'private-address', url);
  }
  assert.equal(connections, 0);
});

test('a name that resolves inside the network is refused at resolution', async () => {
  const inside = await resolvingTo([{ address: '127.0.0.1', family: 4 }],
    () => request({ url: `http://internal.example:${port}/` }));
  assert.equal(inside.error, 'private-address');
  assert.equal(inside.address, '127.0.0.1');

  /* One public and one private answer: refused whole, not left to chance. */
  const mixed = await resolvingTo([{ address: '93.184.216.34', family: 4 }, { address: '127.0.0.1', family: 4 }],
    () => request({ url: `http://mixed.example:${port}/` }));
  assert.equal(mixed.error, 'private-address');

  assert.equal(connections, 0);
});

test('the ALPN handshake is held to the same rule as the requests', async () => {
  const response = { headers: {} };
  await inspectProtocols(`https://127.0.0.1:${port}/`, response);
  /* The rebinding case: a name that answered publicly for the page and
     privately for the handshake. */
  await resolvingTo([{ address: '127.0.0.1', family: 4 }],
    () => inspectProtocols(`https://rebound.example:${port}/`, response));
  assert.equal(connections, 0);
});

test('with the guard lifted, as the smoke test runs, the same address is reached', async () => {
  process.env.ALLOW_PRIVATE_TARGETS = 'true';
  try {
    const answer = await request({ url: `http://127.0.0.1:${port}/` });
    assert.equal(answer.ok, true);
    assert.equal(answer.status, 200);
    assert.equal(connections, 1);
  } finally {
    delete process.env.ALLOW_PRIVATE_TARGETS;
  }
});
