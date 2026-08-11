/**
 * The Chromium HSTS preload list, as data in the repository.
 *
 * The alternative — asking hstspreload.org at check time — would make every
 * report depend on somebody else's uptime and rate limits, and would tell them
 * every domain anybody looked up here. So the list is a file, refreshed by
 * `npm run preload:fetch` and committed, the same way myssl keeps its trust
 * stores as PEM files rather than fetching them.
 *
 * The file is optional. Without it the check reports `known: false` and the
 * report says the list is not bundled, rather than quietly answering "not
 * preloaded" — which would be a false negative for every preloaded site.
 */

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createInterface } from 'node:readline';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'hsts-preload.txt');

/**
 * Entries are held as a Set of host names, with a second Set for the ones whose
 * subdomains are included. About 150k names; roughly 20 MB in memory, loaded
 * once and shared.
 */
let index = null;
let loading = null;

async function load() {
  if (index) return index;
  if (loading) return loading;

  loading = (async () => {
    if (!existsSync(DATA)) {
      index = { known: false, hosts: null, subdomains: null, entries: 0, updated: null };
      return index;
    }

    const hosts = new Set();
    const subdomains = new Set();
    const reader = createInterface({
      input: createReadStream(DATA, 'utf8'),
      crlfDelay: Infinity,
    });

    for await (const line of reader) {
      if (!line || line.startsWith('#')) continue;
      /* One host per line. A trailing tab-separated "1" marks an entry whose
         subdomains are covered too. */
      const [host, includeSubdomains] = line.split('\t');
      const name = host.trim().toLowerCase();
      if (!name) continue;
      hosts.add(name);
      if (includeSubdomains === '1') subdomains.add(name);
    }

    index = {
      known: true,
      hosts,
      subdomains,
      entries: hosts.size,
      updated: statSync(DATA).mtime.toISOString().slice(0, 10),
    };
    return index;
  })();

  return loading;
}

/**
 * Is this name covered by the preload list?
 *
 * A name is covered when it is listed itself, or when an ancestor is listed
 * with subdomain inclusion — which is how `mail.example.com` inherits from
 * `example.com`.
 */
export async function preloadStatus(domain) {
  const list = await load();
  if (!list.known) {
    return { known: false, preloaded: null, entries: 0, updated: null };
  }

  const name = String(domain).toLowerCase().replace(/\.$/, '');
  if (list.hosts.has(name)) {
    return { known: true, preloaded: true, via: name, entries: list.entries, updated: list.updated };
  }

  const labels = name.split('.');
  for (let i = 1; i < labels.length - 1; i++) {
    const parent = labels.slice(i).join('.');
    if (list.subdomains.has(parent)) {
      return {
        known: true, preloaded: true, via: parent, inherited: true,
        entries: list.entries, updated: list.updated,
      };
    }
  }

  return { known: true, preloaded: false, entries: list.entries, updated: list.updated };
}

/** For /healthz, so it is visible whether the list is there at all. */
export async function preloadStats() {
  const list = await load();
  return { bundled: list.known, entries: list.entries, updated: list.updated };
}

/** Tests load their own fixture. */
export function resetPreloadCache() {
  index = null;
  loading = null;
}
