# myheaders

**Русская версия — [ниже](#русская-версия).**

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

The shared package is a git dependency, so `npm install` needs `git`:

```json
"@sharapov/service-kit": "git+https://github.com/sharapov-outsource/service-kit.git#v1.4.4"
```

The URL is spelled out in full because the `github:` shorthand resolves to
`git+ssh://`, and the build has no SSH key. `npm install` writes that form into
`package-lock.json` anyway, so after changing a version rewrite it back:

```bash
sed -i '' 's|git+ssh://git@github.com/|git+https://github.com/|g' package-lock.json
GIT_SSH_COMMAND=/usr/bin/false npm ci   # fails here if any ssh URL is left
```

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

---

## Русская версия

**[myheaders.sharapov.biz](https://myheaders.sharapov.biz)** — цепочка
перенаправлений, политика безопасности контента, HSTS, куки и протоколы, о
которых сайт действительно договаривается.

Без рекламы, без регистрации, без учётных записей. Ничего из того, что вы
проверяете, не сохраняется. Лицензия MIT, двенадцать языков, свой экземпляр
поднимается одним `docker run`.

```bash
curl myheaders.sharapov.biz/example.com
```

### Чем это отличается

securityheaders.com — хороший инструмент, и рекламы там нет, так что свободной
земли здесь не лежит. Единственный способ быть полезнее — уйти глубже в тот
единственный заголовок, который по-настоящему трудно настроить правильно, и
посмотреть на те участки пути, которые перечень заголовков не покрывает.

**Политика безопасности контента, разобранная директива за директивой.** Сайт
может собрать все остальные заголовки и всё равно отдавать политику, сквозь
которую подкинутый скрипт проходит насквозь, — а перечень, который считает
заголовки, назовёт это оценкой A. Что проверяется:

- `'unsafe-inline'` в `script-src`, превращающий политику в украшение;
- nonce или хеш *рядом* с `'unsafe-inline'` — оставленный для браузеров с CSP 2
  и игнорируемый теми, у кого CSP 3, отчего политика означает разные вещи в
  зависимости от читателя, и старое прочтение — слабое;
- `data:` в `script-src` — это скрипт, который нападающий соберёт, ничего нигде
  не размещая;
- узлы с подстановочным знаком и CDN, которые исторически раздавали JSONP или
  произвольные библиотеки: разрешить такой — почти то же, что разрешить любой
  скрипт, если только не задействован `strict-dynamic`, при котором список узлов
  перестаёт действовать и находка снимается;
- отсутствие `object-src` (плагины) и `base-uri` (подкинутый `<base>`
  переписывает каждый относительный адрес, включая источники скриптов, которые
  политика так аккуратно разрешила);
- режим «только отчёт», который ничего не блокирует и который легко оставить;
- откат `script-src` на `default-src` — с указанием, откуда именно взялось
  значение, — и политика, где не задано ни то, ни другое, то есть скриптом она
  не управляет вовсе.

**Цепочка перенаправлений со всех четырёх входов.** `http://`, `https://`, с
`www` и без — это четыре разных пути, и у сайта могут быть три безупречных, а
четвёртый проведёт один переход открытым текстом. Обычная ошибка — нормализовать
в неверном порядке:

```
http://example.com  →  http://www.example.com  →  https://www.example.com
```

Первый переход идёт незашифрованным, и куки посетителя прицеплены к нему.
Поменять сначала схему на том же узле не стоит ничего и закрывает дыру. HSTS
здесь не помогает: он действует только после первого удачного визита по HTTPS —
ровно того визита, на который и нацелится нападающий в сети.

Сертификат, не проходящий проверку на псевдониме, сообщается отдельно от того,
который не проходит на канонической адресе. Непокрытое имя `www` — частый
недосмотр, в curl всё продолжает работать, и заваливать за это весь сайт было бы
неверной калибровкой.

**Наличие в списке предзагрузки HSTS, а не заявка на него.** `preload` в
заголовке — это просьба, а не состояние. Сайт может годами носить эту директиву,
так и не будучи ни разу поданным, и все причастные будут считать, что дело
сделано. Здесь проверяется список, который Chromium действительно поставляет, —
около 94 000 записей, положенных в репозиторий как данные, ровно так же, как
myssl держит свои корни доверия файлами PEM. Обновляется через
`npm run preload:fetch`. Если списка в сборке нет, отчёт так и говорит, вместо
того чтобы ответить «не предзагружен», — это было бы ложным отрицанием для
каждого предзагруженного сайта.

**Куки** — с префиксами `__Host-` и `__Secure-`, единственной защитой кук,
которую браузеры *принуждают* соблюдать, а не просто уважают. Куку `__Host-` с
`Domain` браузер отвергает начисто, и проявляется это обычно как вход, который
молча не работает. Снаружи видны только куки, установленные на странице
приземления, — отчёт об этом и говорит.

**Протоколы.** HTTP/2 — открытием рукопожатия TLS и чтением того, что выбрал
сервер. HTTP/3 — так, как он объявлен в `Alt-Svc`, и помечен именно как
объявление, потому что этот проверяльщик не говорит на QUIC и ответ «нет» был бы
выдуманным результатом. Сжатие измеряется запросом всего подряд и разбором того,
что вернулось.

### Оценка

Транспорт 35%, CSP 40%, остальные заголовки 25%. У CSP наибольший вес по
причине выше: политика, которая есть, но обходится, получает столько же, сколько
политика, которая есть, — а не столько, сколько политика, которая работает.

Когда сайт вообще не ответил по HTTPS, буквы нет — есть только пометка, что
читать было нечего.

### API

```bash
curl myheaders.sharapov.biz/example.com                  # полный отчёт
curl myheaders.sharapov.biz/api/example.com?output=yaml  # YAML
curl myheaders.sharapov.biz/api/stream/example.com       # server-sent events
curl myheaders.sharapov.biz/example.com?lang=en          # подписи на другом языке
```

```bash
curl -s myheaders.sharapov.biz/api/example.com | jq '.csp.directives'
```

### Запуск своего экземпляра

```bash
docker run -d --name myheaders -p 127.0.0.1:3028:3028 ghcr.io/sharapov-outsource/myheaders:latest
```

| Переменная | По умолчанию | Что делает |
|---|---|---|
| `PORT` | `3028` | порт прослушивания |
| `TRUST_PROXY` | `true` | брать адрес клиента из заголовков прокси. **Выключить**, когда сервис смотрит в интернет напрямую |
| `HTTP_TIMEOUT_MS` | `10000` | таймаут одного запроса |
| `HTTP_MAX_BODY` | `262144` | сколько тела страницы читать |
| `HTTP_USER_AGENT` | строка, похожая на браузер | некоторые сайты отвечают явному роботу иначе |
| `SCAN_TIMEOUT_MS` | `45000` | потолок на всю проверку |
| `METRIKA_ID` | — | счётчик аналитики; без него аналитики нет, а политика строже |
| `HSTS` | — | поставить `true` за TLS |

Контейнер только для чтения, без привилегий, ничего не пишет.

### Разработка

```bash
npm install
npm start
npm test                              # синтаксис, переводы, юнит-тесты, smoke
npm run scan -- example.com           # проверялка без веб-сервера
npm run preload:fetch                 # обновить вложенный список предзагрузки HSTS
```

Анализаторы принимают обычный объект ответа, поэтому юнит-тесты работают на
записанных наборах заголовков вообще без сети — именно это и делает практичной
проверку nonce рядом с `unsafe-inline` или куки `__Host-`, которую браузер
отвергнет.

Общий пакет подключён как git-зависимость, поэтому `npm install` требует `git`:

```json
"@sharapov/service-kit": "git+https://github.com/sharapov-outsource/service-kit.git#v1.4.4"
```

Адрес выписан полностью, потому что сокращение `github:` разворачивается в
`git+ssh://`, а у сборки нет ключа SSH. `npm install` всё равно записывает эту
форму в `package-lock.json`, так что после смены версии её надо переписать
обратно:

```bash
sed -i '' 's|git+ssh://git@github.com/|git+https://github.com/|g' package-lock.json
GIT_SSH_COMMAND=/usr/bin/false npm ci   # здесь и упадёт, если ssh-адрес остался
```

### На чём построено

**[service-kit](https://github.com/sharapov-outsource/service-kit)** — оболочка
HTTP, согласование форматов, закрытая политика, переводы и оформление.

### Остальная семья

[myip](https://myip.sharapov.biz) ·
[myssl](https://myssl.sharapov.biz) ·
[mydns](https://mydns.sharapov.biz) ·
[mymx](https://mymx.sharapov.biz) ·
myheaders

### Лицензия

MIT. См. [LICENSE](LICENSE).
