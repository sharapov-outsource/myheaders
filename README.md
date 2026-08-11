# myheaders

**[myheaders.sharapov.biz](https://myheaders.sharapov.biz)** — the redirect
chain, the content security policy, HSTS, cookies and the protocols a site
actually negotiates.

No ads, no registration, no accounts. Nothing you look up is stored. MIT licensed,
twelve languages, one `docker run` to host your own.

```bash
curl myheaders.sharapov.biz/example.com
```

---

## Where this differs

securityheaders.com is a good tool and it has no advertising, so there is no
free ground here to take. The only way to be more useful is to go further into
the one header that is genuinely hard to get right, and to look at the parts of
the journey a header checklist does not cover.

**The content security policy, taken apart directive by directive.** A site can
collect every other header and still ship a policy an injected script walks
straight through — and a checklist that counts headers calls that an A. What is
checked:

- `'unsafe-inline'` in `script-src`, which turns the policy into decoration;
- a nonce or hash sitting *beside* `'unsafe-inline'` — kept for CSP 2 browsers
  and ignored by CSP 3 ones, so the policy means two different things depending
  on the reader, and the older reading is the weak one;
- `data:` in `script-src`, which is script an attacker can build without hosting
  anything anywhere;
- wildcard hosts, and CDNs that have historically served JSONP or arbitrary
  libraries — allowing one of those is close to allowing any script, unless
  `strict-dynamic` is in play, in which case the host list stops applying and
  the finding is withdrawn;
- a missing `object-src` (plugins) and `base-uri` (an injected `<base>` rewrites
  every relative URL, including the script sources the policy carefully allowed);
- report-only, which blocks nothing and is easy to leave in place;
- `script-src` falling back to `default-src`, with the fallback named — and a
  policy that sets neither, so it governs script not at all.

**The redirect chain, from all four entry points.** `http://`, `https://`, with
and without `www`, are four different journeys, and a site can have three
perfect ones and a fourth that spends a hop in the clear. The usual mistake is
normalising in the wrong order:

```
http://example.com  →  http://www.example.com  →  https://www.example.com
```

That first hop travels unencrypted with the visitor's cookies attached. Doing
the scheme first on the same host costs nothing and closes it. HSTS does not
help here — it only applies after a first successful HTTPS visit, which is
exactly the visit an attacker on the network would target.

A certificate that fails on an alias is reported separately from one that fails
on the canonical address. The `www` name not being covered is a common
oversight, it still works in curl, and failing the whole site for it would be
miscalibrated.

**HSTS preload membership, not the claim.** `preload` in the header is a
request, not a state. A site can carry the directive for years without ever
having been submitted, and everybody involved will believe it is done. This
checks the list Chromium actually ships — 94,000-odd entries, committed to the
repository as data, the same way myssl keeps its trust stores as PEM files.
Refresh it with `npm run preload:fetch`. If the list is not bundled, the report
says so rather than answering "not preloaded", which would be a false negative
for every preloaded site.

**Cookies**, with the `__Host-` and `__Secure-` prefixes — the one cookie
protection browsers *enforce* rather than merely respect. A `__Host-` cookie
with a `Domain` is refused outright, which usually surfaces as a login that
silently does not work. Only cookies set on the landing page are visible from
outside, and the report says so.

**Protocols.** HTTP/2 by opening a TLS handshake and reading what the server
picks. HTTP/3 as advertised in `Alt-Svc` — labelled as an advertisement, because
this checker does not speak QUIC and reporting "no" would be inventing a result.
Compression measured by asking for everything and seeing what comes back.

## The grade

Transport 35%, CSP 40%, other headers 25%. CSP carries the most weight for the
reason above: a policy that is present but bypassable scores like a policy that
is present, not like one that works.

When a site never answered over HTTPS there is no letter — only a note saying
there were no headers to read.

## API

```bash
curl myheaders.sharapov.biz/example.com                  # full report
curl myheaders.sharapov.biz/api/example.com?output=yaml  # YAML
curl myheaders.sharapov.biz/api/stream/example.com       # server-sent events
curl myheaders.sharapov.biz/example.com?lang=ru          # labels in another language
```

```bash
curl -s myheaders.sharapov.biz/api/example.com | jq '.csp.directives'
```

## Running your own

```bash
docker run -d --name myheaders -p 127.0.0.1:3028:3028 ghcr.io/sharapov-outsource/myheaders:latest
```

| Variable | Default | What it does |
|---|---|---|
| `PORT` | `3028` | listen port |
| `TRUST_PROXY` | `true` | read the client address from proxy headers. Turn **off** when facing the internet directly |
| `HTTP_TIMEOUT_MS` | `10000` | per-request timeout |
| `HTTP_MAX_BODY` | `262144` | how much of a page body to read |
| `HTTP_USER_AGENT` | a browser-like string | some sites answer differently to an obvious robot |
| `SCAN_TIMEOUT_MS` | `45000` | ceiling on a whole check |
| `METRIKA_ID` | — | analytics counter; omitted, no analytics and a tighter policy |
| `HSTS` | — | set to `true` behind TLS |

The container is read-only, unprivileged and writes nothing.

## Development

```bash
npm install
npm start
npm test                              # syntax, translations, unit tests, smoke
npm run scan -- example.com           # the checker without the web server
npm run preload:fetch                 # refresh the bundled HSTS preload list
```

The analysers take a plain response object, so the unit tests work on captured
header sets with no network at all — which is what makes it practical to test a
nonce beside `unsafe-inline`, or a `__Host-` cookie a browser will refuse.

## Built on

**[service-kit](https://github.com/sharapov-outsource/service-kit)** — the HTTP
shell, content negotiation, the closed policy, translations and design system.

## The rest of the family

[myip](https://myip.sharapov.biz) ·
[myssl](https://myssl.sharapov.biz) ·
[mydns](https://mydns.sharapov.biz) ·
[mymx](https://mymx.sharapov.biz) ·
myheaders

## Licence

MIT. See [LICENSE](LICENSE).
