/* myheaders — the words that are this service's own.
 *
 * The shared vocabulary lives in the service kit and is translated into all
 * twelve languages there. A language block missing here falls back to English;
 * `npm run check:i18n` reports which, and fails on one that is half-finished.
 * mydns/public/i18n.js has a completed Russian block to work from. */
'use strict';

var OWN = {};

OWN.en = {
  title: 'Headers Check — CSP, HSTS, cookies and the redirect chain',
  title_short: 'Headers Check',
  h1: 'Headers Check',
  subtitle: 'The redirect chain from all four entry points, the content security policy taken apart directive by directive, and HSTS preload membership rather than the claim',
  ph_host: 'example.com',
  hero_label: 'Site being checked',
  empty_hint: 'Enter a domain name. The check follows the redirect chain from http and https, with and without www, then reads the headers of the page a visitor actually lands on. The content security policy is taken apart directive by directive, because that is the header that is hard to get right.',

  /* ---- stages ---- */
  stage_resolve: 'resolving',
  stage_chain: 'following the redirects',
  stage_headers: 'reading the headers',
  stage_csp: 'taking the policy apart',
  stage_cookies: 'checking the cookies',
  stage_protocols: 'negotiating protocols',
  stage_grade: 'grading',

  /* ---- cards ---- */
  card_grade: 'Grade breakdown',
  card_chain: 'How visitors arrive',
  card_csp: 'Content security policy',
  card_csp_directives: 'Directives',
  card_hsts: 'HSTS',
  card_cookies: 'Cookies',
  card_headers: 'Security headers',
  card_protocols: 'Protocols',
  card_other: 'Other headers',

  /* ---- grade components ---- */
  comp_transport: 'Transport',
  comp_csp: 'Content security policy',
  comp_headers: 'Other headers',

  /* ---- row labels ---- */
  k_canonical: 'Lands on',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'http:// with www',
  k_entry_https_www: 'https:// with www',
  k_csp_present: 'Policy',
  k_csp_enforced: 'Enforced',
  k_csp_directives: 'Directives set',
  k_csp_nonce: 'Uses nonces or hashes',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'Header',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'preload directive',
  k_hsts_preloaded: 'In the Chromium list',
  k_hsts_eligible: 'Eligible for preloading',
  k_cookie_count: 'Cookies set',
  k_cookies_secure: 'All Secure',
  k_cookies_httponly: 'All HttpOnly',
  k_headers_present: 'Present',
  k_alpn: 'Negotiated (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 advertised',
  k_compression: 'Compression',
  k_tls_protocol: 'TLS version',
  k_requests: 'Requests made',

  /* ---- table headings ---- */
  th_entry: 'Entry point',
  th_step: 'Step',
  th_status: 'Status',
  th_url: 'URL',
  th_time: 'Time',
  th_header: 'Header',
  th_value: 'Value',
  th_directive: 'Directive',
  th_sources: 'Sources',
  th_cookie: 'Cookie',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  /* ---- values ---- */
  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'list not bundled',
  v_seconds_days: '{n} days',
  v_hops: '{n} hops',

  /* ---- notes ---- */
  note_chain: 'The first hop from http:// is the one that matters: a redirect to another plaintext URL sends the request, cookies and all, across the network unprotected. Redirect to HTTPS on the same host first, then to the canonical name.',
  note_csp: 'A policy that allows inline script stops nothing an injected script would do. Nonces and hashes exist so that is never necessary — and a policy carrying both a nonce and unsafe-inline means two different things in two generations of browser.',
  note_hsts: 'The preload directive is a request, not a state. A site can carry it for years without ever having been submitted, so what is reported here is membership of the list Chromium actually ships.',
  note_cookies: 'Only cookies set on the landing page are visible from outside; a session cookie issued after login is not. The __Host- prefix is the one protection a browser enforces rather than merely respects.',
  note_protocols: 'HTTP/2 is measured by opening a TLS handshake and reading what the server picks. HTTP/3 is reported as advertised in Alt-Svc — this checker does not speak QUIC, and saying "no" would be inventing a result.',

  /* ---- errors specific to this service ---- */
  err_https_did_not_answer: 'The site did not answer over HTTPS.',

  /* ---- what was not established ---- */
  inc_https_did_not_answer: 'the site did not answer over HTTPS, so there were no headers to read',

  /* ---- grade caps ---- */
  cap_https_does_not_work: 'HTTPS does not work',
  cap_certificate_not_trusted: 'the certificate does not validate',
  cap_certificate_not_trusted_on_alias: 'an alias presents a certificate that does not cover it',
  cap_http_is_served_as_is: 'plain HTTP is served rather than redirected',
  cap_csp_allows_inline_script: 'the policy allows inline script',
  cap_csp_allows_any_script: 'the policy allows script from anywhere',
  cap_csp_does_not_govern_script: 'the policy does not govern script at all',
  cap_first_hop_in_the_clear: 'the first redirect stays on plain HTTP',
  cap_cookie_rejected_by_browsers: 'a cookie browsers will refuse',
  cap_cors_misconfigured: 'CORS is configured in a way browsers reject',
  cap_no_csp: 'no content security policy',
  cap_no_hsts: 'no HSTS',
  cap_no_framing_protection: 'nothing prevents framing',
  cap_csp_not_enforced: 'the policy is report-only',
  cap_cookie_without_secure: 'a cookie without Secure',
  cap_csp_allows_data_urls: 'the policy allows data: script',
  cap_obsolete_tls: 'an obsolete TLS version',
  cap_scan_incomplete: 'the check was incomplete, so no grade was given',

  /* ---- findings: the chain ---- */
  flag_https_unreachable: 'The site does not answer over HTTPS',
  fd_https_unreachable: 'Neither the bare name nor www responded on port 443. Everything below depends on there being a page to read headers from.',

  flag_redirect_loop: 'The redirects loop',
  fd_redirect_loop: 'One of the entry points sends visitors round in a circle. Browsers give up after a dozen hops and show an error.',

  flag_too_many_redirects: 'A long chain of redirects',
  fd_too_many_redirects: 'More hops than any of them needs. Each one is a round trip before the page starts loading.',

  flag_http_not_served: 'Plain HTTP is not served at all',
  fd_http_not_served: 'Port 80 refuses connections. A legitimate choice, and a slightly awkward one: someone typing the bare name gets a connection error rather than being redirected.',

  flag_http_does_not_redirect: 'Plain HTTP serves the site instead of redirecting',
  fd_http_does_not_redirect: 'The unencrypted address returns a page rather than sending visitors to HTTPS. Anything they send — and everything they read — is visible to the network.',

  flag_redirect_stays_on_http: 'The first redirect stays on plain HTTP',
  fd_redirect_stays_on_http: 'http:// redirects to another http:// address, so the visitor makes at least two unencrypted requests with their cookies attached before reaching HTTPS. Redirect to HTTPS on the same host first, then to the canonical name — it costs one extra hop and closes the gap.',

  flag_redirect_changes_host_and_scheme: 'The first redirect changes host and scheme at once',
  fd_redirect_changes_host_and_scheme: 'Correct destination, and doing the scheme first on the same host is marginally safer against a redirect that gets tampered with. A small point.',

  flag_redirect_not_permanent: 'The redirect is not permanent',
  fd_redirect_not_permanent: 'A 302 or 307 tells browsers not to remember it, so every visit repeats the unencrypted hop. Use 301 or 308.',

  flag_certificate_not_trusted: 'The certificate does not validate',
  fd_certificate_not_trusted: 'The certificate on the address visitors land on is expired, self-signed, or does not cover the name. Browsers show a full-page warning.',

  flag_certificate_not_trusted_on_alias: 'An alias presents a certificate that does not cover it',
  fd_certificate_not_trusted_on_alias: 'The canonical address is fine and another name — usually www — is not covered by the certificate. curl and the redirect still work, so this survives testing and only browsers complain.',

  flag_www_and_bare_both_serve: 'www and the bare name both serve the site',
  fd_www_and_bare_both_serve: 'Neither redirects to the other, so the same pages exist at two addresses. That splits cookies, caches and inbound links.',

  /* ---- findings: CSP ---- */
  flag_csp_missing: 'No content security policy',
  fd_csp_missing: 'Nothing constrains where script may be loaded from or whether inline script may run. CSP is the only header that limits the damage of an injection rather than trying to prevent one.',

  flag_csp_report_only: 'The policy is report-only',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only reports violations and blocks nothing. It is the right way to test a policy, and it is easy to leave in place once testing is over.',

  flag_csp_multiple_policies: 'More than one policy is enforced',
  fd_csp_multiple_policies: 'Every enforced policy applies, and the result is the intersection — stricter than either. Almost never what was intended when the second one arrived with a plugin.',

  flag_csp_no_script_src: 'The policy does not govern script',
  fd_csp_no_script_src: 'Neither script-src nor default-src is set, so script may be loaded from anywhere. The policy may set a dozen other directives and still allow exactly what it was meant to prevent.',

  flag_csp_unsafe_inline: 'The policy allows inline script',
  fd_csp_unsafe_inline: 'With unsafe-inline an injected <script> runs, which is the attack CSP exists to stop. Nonces and hashes exist precisely so this is never necessary.',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline alongside a nonce or hash',
  fd_csp_unsafe_inline_with_nonce: 'A browser that understands nonces ignores unsafe-inline; one that does not, obeys it. The policy therefore means two different things depending on the reader — and the older reading is the weak one. Once nonces are in place, remove it.',

  flag_csp_unsafe_eval: 'The policy allows eval',
  fd_csp_unsafe_eval: 'unsafe-eval re-opens string-to-code execution, which is how a good deal of injected script actually runs. Usually a framework requirement worth revisiting.',

  flag_csp_data_in_script_src: 'The policy allows data: script',
  fd_csp_data_in_script_src: 'A data: URL is script an attacker can construct without hosting anything anywhere. Allowing the scheme in script-src defeats the source list.',

  flag_csp_wildcard_script_src: 'The policy allows script from anywhere',
  fd_csp_wildcard_script_src: 'script-src includes *, https: or http:, which permits any origin. The policy is decorative.',

  flag_csp_wildcard_host: 'The policy allows a wildcard host',
  fd_csp_wildcard_host: 'A pattern like *.example.com trusts every subdomain, including any that gets taken over or handed to a third party.',

  flag_csp_bypassable_host: 'The policy allows a CDN that can be turned against it',
  fd_csp_bypassable_host: 'Some large CDNs host arbitrary libraries or offer JSONP endpoints that echo a caller-supplied callback name. Allowing one is close to allowing any script. strict-dynamic, or pinning specific paths, closes it.',

  flag_csp_short_nonce: 'The nonce is short',
  fd_csp_short_nonce: 'A nonce must be unguessable and freshly generated per response. A short one can be guessed; a reused one is worse than none.',

  flag_csp_unsafe_inline_style: 'The policy allows inline styles',
  fd_csp_unsafe_inline_style: 'Much less severe than the same thing for script — it enables styling attacks and some data exfiltration through selectors, not code execution.',

  flag_csp_object_src_not_none: 'object-src is not none',
  fd_csp_object_src_not_none: '<object> and <embed> run plugin content and are a well-worn route around a script policy. Almost no site needs them; object-src \'none\' costs nothing.',

  flag_csp_no_base_uri: 'No base-uri directive',
  fd_csp_no_base_uri: 'Without it, an injected <base> tag rewrites every relative URL on the page — including the script sources the policy carefully allowed.',

  flag_csp_no_frame_ancestors: 'No frame-ancestors directive',
  fd_csp_no_frame_ancestors: 'frame-ancestors is the modern replacement for X-Frame-Options and the only one that can name more than a single origin.',

  flag_csp_no_form_action: 'No form-action directive',
  fd_csp_no_form_action: 'Without it, an injected form can post credentials to another origin.',

  flag_csp_no_reporting: 'The policy reports nowhere',
  fd_csp_no_reporting: 'Without report-uri or report-to, violations are silent — so a policy that is quietly breaking the site, or quietly being violated, looks exactly like one that is working.',

  /* ---- findings: HSTS ---- */
  flag_hsts_missing: 'No HSTS header',
  fd_hsts_missing: 'Without Strict-Transport-Security a browser will try plain HTTP first whenever a visitor types the bare name, and that request can be intercepted before any redirect is seen.',

  flag_hsts_sent_over_http: 'HSTS is sent over plain HTTP',
  fd_hsts_sent_over_http: 'RFC 6797 §8.1 says browsers ignore the header on an unencrypted response. Harmless, and usually a sign it was added to the wrong server block.',

  flag_hsts_no_max_age: 'The HSTS header has no max-age',
  fd_hsts_no_max_age: 'max-age is required. Without it the header does nothing at all.',

  flag_hsts_max_age_zero: 'HSTS is switched off by max-age=0',
  fd_hsts_max_age_zero: 'This is the correct way to withdraw HSTS, and indistinguishable from outside from a mistake.',

  flag_hsts_max_age_short: 'The HSTS lifetime is short',
  fd_hsts_max_age_short: 'Under a year. A short window is right while rolling HSTS out and is below what preloading requires.',

  flag_hsts_no_subdomains: 'HSTS does not cover subdomains',
  fd_hsts_no_subdomains: 'Without includeSubDomains a subdomain can still be reached over plain HTTP — and a subdomain is where cookies get set from.',

  flag_hsts_preload_claimed_not_listed: 'The preload directive is there and the site is not in the list',
  fd_hsts_preload_claimed_not_listed: 'preload is a request to be added, not a state. This site carries it and does not appear in the list Chromium ships, which usually means nobody ever submitted it — while everybody involved assumes it is done.',

  flag_hsts_listed_without_directive: 'In the preload list without the directive',
  fd_hsts_listed_without_directive: 'The site is preloaded and no longer asks to be. That is how a site gets dropped at the next list refresh.',

  flag_hsts_preload_not_eligible: 'The header does not meet the preload requirements',
  fd_hsts_preload_not_eligible: 'Preloading needs max-age of at least a year plus includeSubDomains, alongside the preload directive.',

  flag_hsts_preload_list_not_bundled: 'The preload list is not bundled with this deployment',
  fd_hsts_preload_list_not_bundled: 'Membership could not be checked, so it is reported as unknown rather than guessed at. Run npm run preload:fetch to add it.',

  /* ---- findings: cookies ---- */
  flag_cookie_not_secure: 'A cookie is set without Secure',
  fd_cookie_not_secure: 'Without Secure the cookie is attached to plain HTTP requests too — which is how a session survives HTTPS everywhere and still leaks on the one request that did not get there.',

  flag_cookie_not_httponly: 'A cookie is readable by script',
  fd_cookie_not_httponly: 'Without HttpOnly an injected script can read the cookie. Some cookies are read by the site\'s own script on purpose, so this is a question rather than a verdict.',

  flag_cookie_no_samesite: 'A cookie does not state a SameSite policy',
  fd_cookie_no_samesite: 'Browsers now default to Lax, which is not the same as saying so — and a cookie that genuinely needs None must say it explicitly or stop working.',

  flag_cookie_samesite_none_without_secure: 'SameSite=None without Secure',
  fd_cookie_samesite_none_without_secure: 'Every current browser rejects this combination outright, so the cookie is not set at all. It usually shows up as a login that silently does not work.',

  flag_cookie_prefix_violated: 'A cookie prefix is used without meeting its conditions',
  fd_cookie_prefix_violated: '__Host- requires Secure, no Domain and Path=/; __Secure- requires Secure. A browser refuses a cookie that breaks the rule, so the cookie simply does not exist for visitors.',

  flag_cookie_very_long_lived: 'A cookie lives for more than a year',
  fd_cookie_very_long_lived: 'A long-lived cookie is a long-lived credential if it identifies anybody.',

  flag_cookie_no_prefixes: 'No cookie uses __Host- or __Secure-',
  fd_cookie_no_prefixes: 'The prefixes are the one cookie protection browsers enforce rather than respect: __Host- makes it impossible for a subdomain to overwrite the cookie, which Secure and HttpOnly cannot do.',

  /* ---- findings: other headers ---- */
  flag_no_clickjacking_protection: 'Nothing prevents the site being framed',
  fd_no_clickjacking_protection: 'Neither X-Frame-Options nor a frame-ancestors directive. The page can be loaded invisibly inside another site and clicked through.',

  flag_framing_headers_disagree: 'The two framing headers say different things',
  fd_framing_headers_disagree: 'X-Frame-Options and frame-ancestors do not match. Browsers prefer frame-ancestors, so the stricter-looking header may not be the one that applies.',

  flag_x_frame_options_allow_from: 'X-Frame-Options uses ALLOW-FROM',
  fd_x_frame_options_allow_from: 'ALLOW-FROM was never implemented in Chrome and has been removed from Firefox, so in practice it provides no protection. frame-ancestors is the replacement.',

  flag_no_nosniff: 'No X-Content-Type-Options',
  fd_no_nosniff: 'Without nosniff a browser may guess a response is script when it was served as something else — which turns an upload endpoint into a script host.',

  flag_nosniff_malformed: 'X-Content-Type-Options has an unexpected value',
  fd_nosniff_malformed: 'The only value browsers act on is "nosniff". Anything else is ignored.',

  flag_no_referrer_policy: 'No Referrer-Policy',
  fd_no_referrer_policy: 'Browsers default to strict-origin-when-cross-origin, which is reasonable — stating it removes the dependency on that default.',

  flag_referrer_policy_leaky: 'The referrer policy sends more than it needs to',
  fd_referrer_policy_leaky: 'The full URL, including any identifier in the path or query, is sent to other sites. unsafe-url is the worst of these.',

  flag_no_permissions_policy: 'No Permissions-Policy',
  fd_no_permissions_policy: 'Camera, microphone, geolocation and the rest are available to the page and to anything embedded in it. Denying what is not used is one header.',

  flag_feature_policy_superseded: 'Feature-Policy is set without Permissions-Policy',
  fd_feature_policy_superseded: 'Feature-Policy was renamed. Current browsers read Permissions-Policy only.',

  flag_no_coop: 'No Cross-Origin-Opener-Policy',
  fd_no_coop: 'COOP severs the window reference between the page and anything it opens, which closes a family of cross-window attacks and is a prerequisite for cross-origin isolation.',

  flag_no_corp: 'No Cross-Origin-Resource-Policy',
  fd_no_corp: 'CORP lets a response refuse to be embedded by other sites. Most useful on resources rather than on documents.',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection is still set',
  fd_obsolete_x_xss_protection: 'The auditor it controlled was removed from browsers years ago — and while it existed it introduced vulnerabilities of its own. The header now does nothing.',

  flag_obsolete_expect_ct: 'Expect-CT is still set',
  fd_obsolete_expect_ct: 'Retired in 2021: Certificate Transparency is now required of all certificates, so the header has nothing left to enforce.',

  flag_obsolete_p3p: 'P3P is still set',
  fd_obsolete_p3p: 'A privacy policy language from 2002 that only Internet Explorer ever read. Nothing has looked at it in a decade.',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP is still set',
  fd_obsolete_x_webkit_csp: 'A prefixed CSP header from before the standard settled. No current browser reads it.',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy is still set',
  fd_obsolete_x_content_security_policy: 'The old Firefox prefix, obsolete since Firefox 23.',

  flag_version_in_headers: 'The headers name the software and its version',
  fd_version_in_headers: 'Hiding it stops nobody determined, and it does hand a scanner a filter for hosts running a version with a known bug. The header is free to remove.',

  flag_duplicate_security_header: 'A security header is sent more than once',
  fd_duplicate_security_header: 'Browsers disagree about which copy wins, so for a security header that disagreement decides whether the policy applies. Usually two layers each adding their own.',

  flag_cors_wildcard: 'CORS allows any origin',
  fd_cors_wildcard: 'Access-Control-Allow-Origin is *. Correct for a public API, and worth a second look on anything that answers differently depending on who is asking.',

  flag_cors_wildcard_with_credentials: 'CORS allows any origin with credentials',
  fd_cors_wildcard_with_credentials: 'Browsers reject this combination outright, so the endpoint is broken as well as over-permissive. Name the origins explicitly.',

  /* ---- findings: protocols ---- */
  flag_no_http2: 'HTTP/2 is not negotiated',
  fd_no_http2: 'The server picked HTTP/1.1 when offered both. HTTP/2 is usually the cheapest performance change available, and it is invisible until somebody looks.',

  flag_no_http3_advertised: 'HTTP/3 is not advertised',
  fd_no_http3_advertised: 'No Alt-Svc header offering h3. Not a fault — and worth knowing, since HTTP/3 mostly helps on the mobile networks where it is hardest to test.',

  flag_no_compression: 'The response is not compressed',
  fd_no_compression: 'Nothing was compressed although gzip, br and zstd were all offered. On HTML that is usually a large, free saving.',

  flag_only_legacy_compression: 'Only gzip or deflate is offered',
  fd_only_legacy_compression: 'Brotli and zstd compress text noticeably better and are supported by every current browser.',

  flag_legacy_tls: 'An obsolete TLS version is negotiated',
  fd_legacy_tls: 'TLS 1.0 and 1.1 have been deprecated since RFC 8996 and are refused by current browsers.',
};

OWN.ru = {
  title: 'Проверка заголовков — CSP, HSTS, куки и цепочка редиректов',
  title_short: 'Проверка заголовков',
  h1: 'Проверка заголовков',
  subtitle: 'Цепочка редиректов со всех четырёх точек входа, политика безопасности контента, разобранная по директивам, и настоящее членство в списке предзагрузки HSTS вместо заявки на него',
  ph_host: 'example.com',
  hero_label: 'Проверяемый сайт',
  empty_hint: 'Введите доменное имя. Проверка проходит цепочку редиректов от http и https, с www и без, а затем читает заголовки той страницы, на которую посетитель в итоге попадает. Политика безопасности контента разбирается по директивам — потому что именно этот заголовок трудно составить правильно.',

  /* ---- этапы ---- */
  stage_resolve: 'разрешение имени',
  stage_chain: 'проход по редиректам',
  stage_headers: 'чтение заголовков',
  stage_csp: 'разбор политики',
  stage_cookies: 'проверка кук',
  stage_protocols: 'согласование протоколов',
  stage_grade: 'выставление оценки',

  /* ---- карточки ---- */
  card_grade: 'Из чего сложилась оценка',
  card_chain: 'Как попадают посетители',
  card_csp: 'Политика безопасности контента',
  card_csp_directives: 'Директивы',
  card_hsts: 'HSTS',
  card_cookies: 'Куки',
  card_headers: 'Заголовки безопасности',
  card_protocols: 'Протоколы',
  card_other: 'Остальные заголовки',

  /* ---- составляющие оценки ---- */
  comp_transport: 'Транспорт',
  comp_csp: 'Политика безопасности контента',
  comp_headers: 'Остальные заголовки',

  /* ---- подписи строк ---- */
  k_canonical: 'Приводит на',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'http:// с www',
  k_entry_https_www: 'https:// с www',
  k_csp_present: 'Политика',
  k_csp_enforced: 'Применяется',
  k_csp_directives: 'Задано директив',
  k_csp_nonce: 'Использует nonce или хеши',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'Заголовок',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'Директива preload',
  k_hsts_preloaded: 'В списке Chromium',
  k_hsts_eligible: 'Годится для предзагрузки',
  k_cookie_count: 'Ставится кук',
  k_cookies_secure: 'Все с Secure',
  k_cookies_httponly: 'Все с HttpOnly',
  k_headers_present: 'Присутствует',
  k_alpn: 'Согласовано (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 объявлен',
  k_compression: 'Сжатие',
  k_tls_protocol: 'Версия TLS',
  k_requests: 'Сделано запросов',

  /* ---- заголовки таблиц ---- */
  th_entry: 'Точка входа',
  th_step: 'Шаг',
  th_status: 'Код',
  th_url: 'Адрес',
  th_time: 'Время',
  th_header: 'Заголовок',
  th_value: 'Значение',
  th_directive: 'Директива',
  th_sources: 'Источники',
  th_cookie: 'Кука',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  /* ---- значения ---- */
  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'список не поставляется',
  v_seconds_days: '{n} дн.',
  v_hops: 'переходов: {n}',

  /* ---- пояснения ---- */
  note_chain: 'Важен первый переход с http://: редирект на другой адрес без шифрования отправляет запрос вместе с куками по открытой сети. Сначала переводите на HTTPS того же хоста, и только потом на каноническое имя.',
  note_csp: 'Политика, разрешающая инлайновые скрипты, не мешает внедрённому скрипту ничем. Nonce и хеши существуют ровно для того, чтобы этого не требовалось, — а политика, где рядом стоят nonce и unsafe-inline, означает разные вещи в двух поколениях браузеров.',
  note_hsts: 'Директива preload — это заявка, а не состояние. Сайт может носить её годами, ни разу не будучи отправленным в список, поэтому здесь показано членство в том списке, который Chromium действительно поставляет.',
  note_cookies: 'Снаружи видны только куки, которые ставятся на посадочной странице; сессионная кука, выдаваемая после входа, — нет. Префикс __Host- — единственная защита кук, которую браузер именно принуждает соблюдать, а не просто уважает.',
  note_protocols: 'HTTP/2 измеряется рукопожатием TLS: смотрим, что выберет сервер. HTTP/3 показан так, как он объявлен в Alt-Svc, — этот сервис не говорит по QUIC, и ответ «нет» был бы выдуманным.',

  /* ---- ошибки этого сервиса ---- */
  err_https_did_not_answer: 'Сайт не ответил по HTTPS.',

  /* ---- чего не удалось установить ---- */
  inc_https_did_not_answer: 'сайт не ответил по HTTPS, поэтому читать заголовки было негде',

  /* ---- ограничители оценки ---- */
  cap_https_does_not_work: 'HTTPS не работает',
  cap_certificate_not_trusted: 'сертификат не проходит проверку',
  cap_certificate_not_trusted_on_alias: 'псевдоним предъявляет сертификат, который его не покрывает',
  cap_http_is_served_as_is: 'по обычному HTTP отдаётся сайт, а не редирект',
  cap_csp_allows_inline_script: 'политика разрешает инлайновые скрипты',
  cap_csp_allows_any_script: 'политика разрешает скрипты откуда угодно',
  cap_csp_does_not_govern_script: 'политика вообще не управляет скриптами',
  cap_first_hop_in_the_clear: 'первый редирект остаётся на открытом HTTP',
  cap_cookie_rejected_by_browsers: 'кука, которую браузеры откажутся принять',
  cap_cors_misconfigured: 'CORS настроен так, что браузеры его отвергают',
  cap_no_csp: 'нет политики безопасности контента',
  cap_no_hsts: 'нет HSTS',
  cap_no_framing_protection: 'ничто не мешает встроить сайт во фрейм',
  cap_csp_not_enforced: 'политика только в режиме отчётов',
  cap_cookie_without_secure: 'кука без Secure',
  cap_csp_allows_data_urls: 'политика разрешает скрипты из data:',
  cap_obsolete_tls: 'устаревшая версия TLS',
  cap_scan_incomplete: 'проверка неполная, поэтому оценка не выставлена',

  /* ---- находки: цепочка ---- */
  flag_https_unreachable: 'Сайт не отвечает по HTTPS',
  fd_https_unreachable: 'Ни голое имя, ни www не ответили на порту 443. Всё, что ниже, зависит от того, есть ли страница, у которой можно прочитать заголовки.',

  flag_redirect_loop: 'Редиректы зациклены',
  fd_redirect_loop: 'Одна из точек входа водит посетителя по кругу. Браузеры сдаются после десятка переходов и показывают ошибку.',

  flag_too_many_redirects: 'Длинная цепочка редиректов',
  fd_too_many_redirects: 'Переходов больше, чем нужно любому из них. Каждый — это ещё один круг по сети до того, как страница начнёт загружаться.',

  flag_http_not_served: 'Обычный HTTP не обслуживается вовсе',
  fd_http_not_served: 'Порт 80 отклоняет соединения. Решение допустимое и слегка неудобное: тот, кто набрал голое имя, получит ошибку соединения вместо редиректа.',

  flag_http_does_not_redirect: 'По обычному HTTP отдаётся сайт вместо редиректа',
  fd_http_does_not_redirect: 'Незашифрованный адрес возвращает страницу, а не отправляет посетителя на HTTPS. Всё, что он отправит, и всё, что он прочитает, видно сети.',

  flag_redirect_stays_on_http: 'Первый редирект остаётся на открытом HTTP',
  fd_redirect_stays_on_http: 'http:// перенаправляет на другой адрес http://, поэтому посетитель делает как минимум два незашифрованных запроса вместе со своими куками, прежде чем добраться до HTTPS. Сначала переводите на HTTPS того же хоста, потом на каноническое имя — это стоит одного лишнего перехода и закрывает брешь.',

  flag_redirect_changes_host_and_scheme: 'Первый редирект меняет и хост, и схему сразу',
  fd_redirect_changes_host_and_scheme: 'Пункт назначения верный, и сменить сначала схему на том же хосте чуть безопаснее против подменённого редиректа. Мелочь.',

  flag_redirect_not_permanent: 'Редирект не постоянный',
  fd_redirect_not_permanent: '302 или 307 говорят браузеру не запоминать переход, поэтому незашифрованный шаг повторяется при каждом визите. Используйте 301 или 308.',

  flag_certificate_not_trusted: 'Сертификат не проходит проверку',
  fd_certificate_not_trusted: 'Сертификат на адресе, куда попадают посетители, истёк, самоподписан или не покрывает это имя. Браузеры показывают предупреждение во весь экран.',

  flag_certificate_not_trusted_on_alias: 'Псевдоним предъявляет сертификат, который его не покрывает',
  fd_certificate_not_trusted_on_alias: 'Канонический адрес в порядке, а другое имя — обычно www — сертификатом не покрыто. curl и редирект при этом работают, поэтому такое переживает тестирование, и жалуются только браузеры.',

  flag_www_and_bare_both_serve: 'И www, и голое имя отдают сайт',
  fd_www_and_bare_both_serve: 'Ни одно не перенаправляет на другое, поэтому одни и те же страницы существуют по двум адресам. Это разделяет куки, кэши и входящие ссылки.',

  /* ---- находки: CSP ---- */
  flag_csp_missing: 'Нет политики безопасности контента',
  fd_csp_missing: 'Ничто не ограничивает, откуда можно грузить скрипты и можно ли выполнять инлайновые. CSP — единственный заголовок, который ограничивает ущерб от внедрения, а не пытается его предотвратить.',

  flag_csp_report_only: 'Политика только в режиме отчётов',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only сообщает о нарушениях и не блокирует ничего. Это правильный способ обкатать политику и очень лёгкий способ забыть её переключить, когда обкатка закончилась.',

  flag_csp_multiple_policies: 'Применяется больше одной политики',
  fd_csp_multiple_policies: 'Действуют все применяемые политики, и результат — их пересечение, строже любой из них. Почти никогда не то, чего хотели, когда вторая приехала вместе с плагином.',

  flag_csp_no_script_src: 'Политика не управляет скриптами',
  fd_csp_no_script_src: 'Не заданы ни script-src, ни default-src, поэтому скрипты можно грузить откуда угодно. Политика может задавать дюжину других директив и всё равно разрешать ровно то, что должна была запретить.',

  flag_csp_unsafe_inline: 'Политика разрешает инлайновые скрипты',
  fd_csp_unsafe_inline: 'С unsafe-inline внедрённый <script> выполняется — а это ровно та атака, ради которой CSP и существует. Nonce и хеши придуманы именно для того, чтобы этого никогда не требовалось.',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline рядом с nonce или хешем',
  fd_csp_unsafe_inline_with_nonce: 'Браузер, понимающий nonce, игнорирует unsafe-inline; не понимающий — подчиняется ему. Политика поэтому означает разные вещи в зависимости от читателя, и старое прочтение — слабое. Когда nonce на месте, unsafe-inline пора убрать.',

  flag_csp_unsafe_eval: 'Политика разрешает eval',
  fd_csp_unsafe_eval: 'unsafe-eval снова открывает выполнение кода из строки, а именно так и запускается изрядная часть внедрённых скриптов. Обычно это требование фреймворка, к которому стоит вернуться.',

  flag_csp_data_in_script_src: 'Политика разрешает скрипты из data:',
  fd_csp_data_in_script_src: 'data:-адрес — это скрипт, который атакующий составляет сам, ничего нигде не размещая. Разрешение этой схемы в script-src обесценивает весь список источников.',

  flag_csp_wildcard_script_src: 'Политика разрешает скрипты откуда угодно',
  fd_csp_wildcard_script_src: 'В script-src есть *, https: или http:, что допускает любой источник. Политика декоративна.',

  flag_csp_wildcard_host: 'Политика разрешает хост с подстановкой',
  fd_csp_wildcard_host: 'Шаблон вроде *.example.com доверяет каждому поддомену, включая тот, который угонят или отдадут третьей стороне.',

  flag_csp_bypassable_host: 'Политика разрешает CDN, которым её можно обойти',
  fd_csp_bypassable_host: 'Часть крупных CDN раздаёт произвольные библиотеки или предоставляет JSONP-эндпоинты, повторяющие имя колбэка из запроса. Разрешить такой хост — почти то же, что разрешить любой скрипт. Закрывается через strict-dynamic или указанием конкретных путей.',

  flag_csp_short_nonce: 'Короткий nonce',
  fd_csp_short_nonce: 'Nonce обязан быть неугадываемым и генерироваться заново на каждый ответ. Короткий можно угадать; переиспользованный хуже, чем никакого.',

  flag_csp_unsafe_inline_style: 'Политика разрешает инлайновые стили',
  fd_csp_unsafe_inline_style: 'Куда менее серьёзно, чем то же самое для скриптов: это открывает атаки через оформление и часть утечек данных через селекторы, но не выполнение кода.',

  flag_csp_object_src_not_none: 'object-src не равен none',
  fd_csp_object_src_not_none: '<object> и <embed> запускают плагинное содержимое и служат хорошо протоптанным обходом политики скриптов. Почти никому они не нужны, а object-src \'none\' ничего не стоит.',

  flag_csp_no_base_uri: 'Нет директивы base-uri',
  fd_csp_no_base_uri: 'Без неё внедрённый тег <base> переписывает все относительные адреса на странице — включая источники скриптов, которые политика так тщательно разрешала.',

  flag_csp_no_frame_ancestors: 'Нет директивы frame-ancestors',
  fd_csp_no_frame_ancestors: 'frame-ancestors — современная замена X-Frame-Options и единственная из двух, которая умеет перечислить больше одного источника.',

  flag_csp_no_form_action: 'Нет директивы form-action',
  fd_csp_no_form_action: 'Без неё внедрённая форма может отправить учётные данные на чужой источник.',

  flag_csp_no_reporting: 'Политика никуда не отчитывается',
  fd_csp_no_reporting: 'Без report-uri или report-to нарушения происходят молча — поэтому политика, которая тихо ломает сайт, и политика, которую тихо нарушают, выглядят ровно так же, как работающая.',

  /* ---- находки: HSTS ---- */
  flag_hsts_missing: 'Нет заголовка HSTS',
  fd_hsts_missing: 'Без Strict-Transport-Security браузер сначала попробует обычный HTTP всякий раз, когда посетитель набирает голое имя, и этот запрос можно перехватить до того, как он увидит редирект.',

  flag_hsts_sent_over_http: 'HSTS отдаётся по обычному HTTP',
  fd_hsts_sent_over_http: 'RFC 6797 §8.1 предписывает браузерам игнорировать заголовок на незашифрованном ответе. Безвредно и обычно означает, что его добавили не в тот блок конфигурации.',

  flag_hsts_no_max_age: 'В заголовке HSTS нет max-age',
  fd_hsts_no_max_age: 'max-age обязателен. Без него заголовок не делает ничего.',

  flag_hsts_max_age_zero: 'HSTS отключён через max-age=0',
  fd_hsts_max_age_zero: 'Это правильный способ отозвать HSTS и снаружи неотличим от ошибки.',

  flag_hsts_max_age_short: 'Короткий срок действия HSTS',
  fd_hsts_max_age_short: 'Меньше года. Короткое окно уместно, пока HSTS внедряется, и оно ниже того, что требуется для предзагрузки.',

  flag_hsts_no_subdomains: 'HSTS не покрывает поддомены',
  fd_hsts_no_subdomains: 'Без includeSubDomains до поддомена по-прежнему можно дойти по обычному HTTP — а именно с поддомена и ставятся куки.',

  flag_hsts_preload_claimed_not_listed: 'Директива preload есть, а сайта в списке нет',
  fd_hsts_preload_claimed_not_listed: 'preload — это заявка на добавление, а не состояние. Сайт её носит и при этом отсутствует в списке, который поставляет Chromium, — обычно это значит, что заявку никто так и не отправил, пока все причастные считают дело сделанным.',

  flag_hsts_listed_without_directive: 'В списке предзагрузки без директивы',
  fd_hsts_listed_without_directive: 'Сайт предзагружен и больше об этом не просит. Именно так его и выкинут при следующем обновлении списка.',

  flag_hsts_preload_not_eligible: 'Заголовок не удовлетворяет требованиям предзагрузки',
  fd_hsts_preload_not_eligible: 'Для предзагрузки нужен max-age не меньше года и includeSubDomains — вдобавок к самой директиве preload.',

  flag_hsts_preload_list_not_bundled: 'В этой установке список предзагрузки отсутствует',
  fd_hsts_preload_list_not_bundled: 'Проверить членство не удалось, поэтому оно показано как неизвестное, а не угадано. Добавляется командой npm run preload:fetch.',

  /* ---- находки: куки ---- */
  flag_cookie_not_secure: 'Кука ставится без Secure',
  fd_cookie_not_secure: 'Без Secure кука прикрепляется и к обычным HTTP-запросам — а именно так сессия переживает «HTTPS везде» и всё равно утекает на том единственном запросе, который туда не попал.',

  flag_cookie_not_httponly: 'Куку может прочитать скрипт',
  fd_cookie_not_httponly: 'Без HttpOnly внедрённый скрипт может прочитать куку. Часть кук читается собственным скриптом сайта намеренно, поэтому это вопрос, а не приговор.',

  flag_cookie_no_samesite: 'У куки не задана политика SameSite',
  fd_cookie_no_samesite: 'Браузеры теперь по умолчанию считают её Lax, но умолчание — это не то же самое, что явно сказанное; а куке, которой действительно нужен None, придётся сказать это прямо, иначе она перестанет работать.',

  flag_cookie_samesite_none_without_secure: 'SameSite=None без Secure',
  fd_cookie_samesite_none_without_secure: 'Любой современный браузер отвергает это сочетание целиком, поэтому кука не ставится вовсе. Обычно проявляется как вход, который молча не работает.',

  flag_cookie_prefix_violated: 'Префикс куки использован без соблюдения его условий',
  fd_cookie_prefix_violated: '__Host- требует Secure, отсутствия Domain и Path=/; __Secure- требует Secure. Браузер отвергает куку, нарушающую правило, поэтому для посетителей её просто не существует.',

  flag_cookie_very_long_lived: 'Кука живёт больше года',
  fd_cookie_very_long_lived: 'Долгоживущая кука — это долгоживущий пропуск, если она кого-то опознаёт.',

  flag_cookie_no_prefixes: 'Ни одна кука не использует __Host- или __Secure-',
  fd_cookie_no_prefixes: 'Префиксы — единственная защита кук, которую браузеры принуждают соблюдать, а не просто уважают: __Host- делает невозможной перезапись куки с поддомена, чего Secure и HttpOnly вместе не умеют.',

  /* ---- находки: остальные заголовки ---- */
  flag_no_clickjacking_protection: 'Ничто не мешает встроить сайт во фрейм',
  fd_no_clickjacking_protection: 'Нет ни X-Frame-Options, ни директивы frame-ancestors. Страницу можно незаметно загрузить внутрь чужого сайта и прокликать.',

  flag_framing_headers_disagree: 'Два заголовка о фреймах говорят разное',
  fd_framing_headers_disagree: 'X-Frame-Options и frame-ancestors не совпадают. Браузеры предпочитают frame-ancestors, так что более строгий на вид заголовок может оказаться не тем, который действует.',

  flag_x_frame_options_allow_from: 'X-Frame-Options использует ALLOW-FROM',
  fd_x_frame_options_allow_from: 'ALLOW-FROM никогда не был реализован в Chrome и удалён из Firefox, поэтому на практике не защищает ни от чего. Замена — frame-ancestors.',

  flag_no_nosniff: 'Нет X-Content-Type-Options',
  fd_no_nosniff: 'Без nosniff браузер может решить, что ответ — это скрипт, хотя он отдавался как что-то другое; так эндпоинт загрузки файлов превращается в хостинг скриптов.',

  flag_nosniff_malformed: 'У X-Content-Type-Options неожиданное значение',
  fd_nosniff_malformed: 'Единственное значение, на которое браузеры реагируют, — «nosniff». Всё остальное игнорируется.',

  flag_no_referrer_policy: 'Нет Referrer-Policy',
  fd_no_referrer_policy: 'Браузеры по умолчанию используют strict-origin-when-cross-origin, и это разумно, — а явное указание снимает зависимость от умолчания.',

  flag_referrer_policy_leaky: 'Политика реферера отдаёт больше, чем нужно',
  fd_referrer_policy_leaky: 'На чужие сайты уходит полный адрес, включая любой идентификатор в пути или в параметрах. Хуже всех здесь unsafe-url.',

  flag_no_permissions_policy: 'Нет Permissions-Policy',
  fd_no_permissions_policy: 'Камера, микрофон, геолокация и всё остальное доступны странице и всему, что в неё встроено. Запретить неиспользуемое — это один заголовок.',

  flag_feature_policy_superseded: 'Feature-Policy задан без Permissions-Policy',
  fd_feature_policy_superseded: 'Feature-Policy переименовали. Современные браузеры читают только Permissions-Policy.',

  flag_no_coop: 'Нет Cross-Origin-Opener-Policy',
  fd_no_coop: 'COOP разрывает связь между окном страницы и тем, что она открывает, что закрывает целое семейство межоконных атак и является предпосылкой для кросс-origin изоляции.',

  flag_no_corp: 'Нет Cross-Origin-Resource-Policy',
  fd_no_corp: 'CORP позволяет ответу отказаться от встраивания на чужих сайтах. Полезнее на ресурсах, чем на документах.',

  flag_obsolete_x_xss_protection: 'До сих пор задан X-XSS-Protection',
  fd_obsolete_x_xss_protection: 'Аудитор, которым он управлял, удалён из браузеров много лет назад — и пока он существовал, сам порождал уязвимости. Сейчас заголовок не делает ничего.',

  flag_obsolete_expect_ct: 'До сих пор задан Expect-CT',
  fd_obsolete_expect_ct: 'Выведен из обращения в 2021 году: прозрачность сертификатов теперь обязательна для всех сертификатов, так что заголовку нечего требовать.',

  flag_obsolete_p3p: 'До сих пор задан P3P',
  fd_obsolete_p3p: 'Язык описания политики приватности из 2002 года, который читал только Internet Explorer. За десятилетие в него никто не заглядывал.',

  flag_obsolete_x_webkit_csp: 'До сих пор задан X-WebKit-CSP',
  fd_obsolete_x_webkit_csp: 'Префиксный заголовок CSP из времён до того, как стандарт устоялся. Ни один современный браузер его не читает.',

  flag_obsolete_x_content_security_policy: 'До сих пор задан X-Content-Security-Policy',
  fd_obsolete_x_content_security_policy: 'Старый префикс Firefox, устаревший с Firefox 23.',

  flag_version_in_headers: 'В заголовках названы программа и её версия',
  fd_version_in_headers: 'Спрятать их не помешает тому, кто взялся всерьёз, — но это выдаёт сканеру фильтр для поиска хостов с версией, где есть известная ошибка. Убрать заголовок ничего не стоит.',

  flag_duplicate_security_header: 'Заголовок безопасности отдан больше одного раза',
  fd_duplicate_security_header: 'Браузеры расходятся в том, какая копия побеждает, и для заголовка безопасности от этого расхождения зависит, действует политика или нет. Обычно это два слоя, каждый из которых добавляет свой.',

  flag_cors_wildcard: 'CORS разрешает любой источник',
  fd_cors_wildcard: 'Access-Control-Allow-Origin равен *. Для публичного API это верно, а на всём, что отвечает по-разному в зависимости от того, кто спрашивает, стоит посмотреть ещё раз.',

  flag_cors_wildcard_with_credentials: 'CORS разрешает любой источник вместе с учётными данными',
  fd_cors_wildcard_with_credentials: 'Браузеры отвергают это сочетание целиком, поэтому эндпоинт не только слишком открыт, но ещё и сломан. Источники нужно перечислить явно.',

  /* ---- находки: протоколы ---- */
  flag_no_http2: 'HTTP/2 не согласуется',
  fd_no_http2: 'Сервер выбрал HTTP/1.1, когда ему предложили оба. HTTP/2 — обычно самое дешёвое улучшение производительности из доступных, и его отсутствие не видно, пока не посмотришь.',

  flag_no_http3_advertised: 'HTTP/3 не объявлен',
  fd_no_http3_advertised: 'Заголовка Alt-Svc с h3 нет. Не ошибка — и знать полезно, потому что HTTP/3 больше всего помогает в мобильных сетях, где его труднее всего проверить.',

  flag_no_compression: 'Ответ не сжимается',
  fd_no_compression: 'Ничего не сжато, хотя предлагались и gzip, и br, и zstd. На HTML это обычно крупная и бесплатная экономия.',

  flag_only_legacy_compression: 'Предлагается только gzip или deflate',
  fd_only_legacy_compression: 'Brotli и zstd заметно лучше жмут текст и поддерживаются всеми современными браузерами.',

  flag_legacy_tls: 'Согласуется устаревшая версия TLS',
  fd_legacy_tls: 'TLS 1.0 и 1.1 объявлены устаревшими в RFC 8996 и отвергаются современными браузерами.',
};

OWN.es = {
  title: 'Comprobación de cabeceras — CSP, HSTS, cookies y la cadena de redirecciones',
  title_short: 'Comprobación de cabeceras',
  h1: 'Comprobación de cabeceras',
  subtitle: 'La cadena de redirecciones desde las cuatro entradas, la política de seguridad de contenido desmontada directiva por directiva, y la pertenencia real a la lista de precarga de HSTS en lugar de la declaración',
  ph_host: 'example.com',
  hero_label: 'Sitio comprobado',
  empty_hint: 'Introduzca un nombre de dominio. La comprobación sigue la cadena de redirecciones desde http y https, con y sin www, y luego lee las cabeceras de la página en la que un visitante acaba realmente. La política de seguridad de contenido se desmonta directiva por directiva, porque esa es la cabecera difícil de acertar.',

  stage_resolve: 'resolviendo el nombre',
  stage_chain: 'siguiendo las redirecciones',
  stage_headers: 'leyendo las cabeceras',
  stage_csp: 'desmontando la política',
  stage_cookies: 'comprobando las cookies',
  stage_protocols: 'negociando protocolos',
  stage_grade: 'calificando',

  card_grade: 'Desglose de la nota',
  card_chain: 'Cómo llegan los visitantes',
  card_csp: 'Política de seguridad de contenido',
  card_csp_directives: 'Directivas',
  card_hsts: 'HSTS',
  card_cookies: 'Cookies',
  card_headers: 'Cabeceras de seguridad',
  card_protocols: 'Protocolos',
  card_other: 'Otras cabeceras',

  comp_transport: 'Transporte',
  comp_csp: 'Política de seguridad de contenido',
  comp_headers: 'Otras cabeceras',

  k_canonical: 'Acaba en',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'http:// con www',
  k_entry_https_www: 'https:// con www',
  k_csp_present: 'Política',
  k_csp_enforced: 'Se aplica',
  k_csp_directives: 'Directivas definidas',
  k_csp_nonce: 'Usa nonces o hashes',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'Cabecera',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'Directiva preload',
  k_hsts_preloaded: 'En la lista de Chromium',
  k_hsts_eligible: 'Apta para la precarga',
  k_cookie_count: 'Cookies establecidas',
  k_cookies_secure: 'Todas con Secure',
  k_cookies_httponly: 'Todas con HttpOnly',
  k_headers_present: 'Presentes',
  k_alpn: 'Negociado (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 anunciado',
  k_compression: 'Compresión',
  k_tls_protocol: 'Versión de TLS',
  k_requests: 'Peticiones realizadas',

  th_entry: 'Punto de entrada',
  th_step: 'Paso',
  th_status: 'Código',
  th_url: 'Dirección',
  th_time: 'Tiempo',
  th_header: 'Cabecera',
  th_value: 'Valor',
  th_directive: 'Directiva',
  th_sources: 'Orígenes',
  th_cookie: 'Cookie',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'la lista no viene incluida',
  v_seconds_days: '{n} días',
  v_hops: '{n} saltos',

  note_chain: 'Lo que importa es el primer salto desde http://: una redirección a otra dirección sin cifrar envía la petición, con sus cookies incluidas, a través de una red desprotegida. Redirija primero a HTTPS en el mismo host y solo después al nombre canónico.',
  note_csp: 'Una política que permite script en línea no detiene nada de lo que haría un script inyectado. Los nonces y los hashes existen precisamente para que eso nunca sea necesario — y una política que lleva a la vez un nonce y unsafe-inline significa dos cosas distintas en dos generaciones de navegadores.',
  note_hsts: 'La directiva preload es una solicitud, no un estado. Un sitio puede llevarla durante años sin haber sido enviado nunca, así que lo que se muestra aquí es la pertenencia a la lista que Chromium realmente distribuye.',
  note_cookies: 'Desde fuera solo se ven las cookies que se establecen en la página de aterrizaje; una cookie de sesión emitida tras iniciar sesión, no. El prefijo __Host- es la única protección de cookies que un navegador impone en lugar de limitarse a respetarla.',
  note_protocols: 'HTTP/2 se mide abriendo un saludo TLS y viendo qué elige el servidor. HTTP/3 se informa tal como se anuncia en Alt-Svc: este comprobador no habla QUIC, y responder «no» sería inventarse un resultado.',

  err_https_did_not_answer: 'El sitio no respondió por HTTPS.',

  inc_https_did_not_answer: 'el sitio no respondió por HTTPS, así que no había cabeceras que leer',

  cap_https_does_not_work: 'HTTPS no funciona',
  cap_certificate_not_trusted: 'el certificado no valida',
  cap_certificate_not_trusted_on_alias: 'un alias presenta un certificado que no lo cubre',
  cap_http_is_served_as_is: 'se sirve HTTP sin cifrar en vez de redirigir',
  cap_csp_allows_inline_script: 'la política permite script en línea',
  cap_csp_allows_any_script: 'la política permite script de cualquier origen',
  cap_csp_does_not_govern_script: 'la política no gobierna el script en absoluto',
  cap_first_hop_in_the_clear: 'la primera redirección se queda en HTTP sin cifrar',
  cap_cookie_rejected_by_browsers: 'una cookie que los navegadores rechazarán',
  cap_cors_misconfigured: 'CORS está configurado de una forma que los navegadores rechazan',
  cap_no_csp: 'sin política de seguridad de contenido',
  cap_no_hsts: 'sin HSTS',
  cap_no_framing_protection: 'nada impide que el sitio se incruste en un marco',
  cap_csp_not_enforced: 'la política es solo de informe',
  cap_cookie_without_secure: 'una cookie sin Secure',
  cap_csp_allows_data_urls: 'la política permite script en data:',
  cap_obsolete_tls: 'una versión obsoleta de TLS',
  cap_scan_incomplete: 'la comprobación quedó incompleta, así que no se otorgó nota',

  flag_https_unreachable: 'El sitio no responde por HTTPS',
  fd_https_unreachable: 'Ni el nombre a secas ni www respondieron en el puerto 443. Todo lo que sigue depende de que haya una página cuyas cabeceras leer.',

  flag_redirect_loop: 'Las redirecciones forman un bucle',
  fd_redirect_loop: 'Una de las entradas envía a los visitantes en círculo. Los navegadores se rinden tras una docena de saltos y muestran un error.',

  flag_too_many_redirects: 'Una cadena larga de redirecciones',
  fd_too_many_redirects: 'Más saltos de los que ninguna de ellas necesita. Cada uno es una ida y vuelta antes de que la página empiece a cargar.',

  flag_http_not_served: 'No se sirve HTTP sin cifrar en absoluto',
  fd_http_not_served: 'El puerto 80 rechaza las conexiones. Una elección legítima, y ligeramente incómoda: quien escriba el nombre a secas obtiene un error de conexión en lugar de una redirección.',

  flag_http_does_not_redirect: 'HTTP sin cifrar sirve el sitio en vez de redirigir',
  fd_http_does_not_redirect: 'La dirección sin cifrar devuelve una página en lugar de enviar a los visitantes a HTTPS. Todo lo que envíen — y todo lo que lean — queda a la vista de la red.',

  flag_redirect_stays_on_http: 'La primera redirección se queda en HTTP sin cifrar',
  fd_redirect_stays_on_http: 'http:// redirige a otra dirección http://, así que el visitante hace al menos dos peticiones sin cifrar con sus cookies adjuntas antes de llegar a HTTPS. Redirija primero a HTTPS en el mismo host y luego al nombre canónico: cuesta un salto más y cierra la brecha.',

  flag_redirect_changes_host_and_scheme: 'La primera redirección cambia host y esquema a la vez',
  fd_redirect_changes_host_and_scheme: 'El destino es correcto, y cambiar primero el esquema en el mismo host es algo más seguro frente a una redirección manipulada. Un detalle menor.',

  flag_redirect_not_permanent: 'La redirección no es permanente',
  fd_redirect_not_permanent: 'Un 302 o un 307 indican al navegador que no la recuerde, así que cada visita repite el salto sin cifrar. Use 301 o 308.',

  flag_certificate_not_trusted: 'El certificado no valida',
  fd_certificate_not_trusted: 'El certificado de la dirección en la que aterrizan los visitantes está caducado, es autofirmado o no cubre el nombre. Los navegadores muestran una advertencia a pantalla completa.',

  flag_certificate_not_trusted_on_alias: 'Un alias presenta un certificado que no lo cubre',
  fd_certificate_not_trusted_on_alias: 'La dirección canónica está bien y otro nombre — normalmente www — no está cubierto por el certificado. curl y la redirección siguen funcionando, así que esto sobrevive a las pruebas y solo se quejan los navegadores.',

  flag_www_and_bare_both_serve: 'www y el nombre a secas sirven ambos el sitio',
  fd_www_and_bare_both_serve: 'Ninguno redirige al otro, así que las mismas páginas existen en dos direcciones. Eso divide cookies, cachés y enlaces entrantes.',

  flag_csp_missing: 'Sin política de seguridad de contenido',
  fd_csp_missing: 'Nada limita de dónde puede cargarse el script ni si puede ejecutarse script en línea. CSP es la única cabecera que limita el daño de una inyección en lugar de intentar impedirla.',

  flag_csp_report_only: 'La política es solo de informe',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only informa de las infracciones y no bloquea nada. Es la forma correcta de probar una política, y es fácil dejarla puesta cuando las pruebas terminan.',

  flag_csp_multiple_policies: 'Se aplica más de una política',
  fd_csp_multiple_policies: 'Todas las políticas aplicadas cuentan, y el resultado es la intersección — más estricta que cualquiera de ellas. Casi nunca es lo que se pretendía cuando la segunda llegó con un plugin.',

  flag_csp_no_script_src: 'La política no gobierna el script',
  fd_csp_no_script_src: 'No se define ni script-src ni default-src, así que puede cargarse script desde cualquier sitio. La política puede fijar una docena de directivas más y aun así permitir exactamente lo que debía impedir.',

  flag_csp_unsafe_inline: 'La política permite script en línea',
  fd_csp_unsafe_inline: 'Con unsafe-inline, un <script> inyectado se ejecuta, que es justo el ataque que CSP existe para detener. Los nonces y los hashes existen precisamente para que esto nunca haga falta.',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline junto a un nonce o un hash',
  fd_csp_unsafe_inline_with_nonce: 'Un navegador que entiende nonces ignora unsafe-inline; uno que no, lo obedece. La política significa por tanto dos cosas distintas según quién la lea — y la lectura antigua es la débil. Una vez que los nonces están en su sitio, quítelo.',

  flag_csp_unsafe_eval: 'La política permite eval',
  fd_csp_unsafe_eval: 'unsafe-eval vuelve a abrir la ejecución de código desde una cadena, que es como se ejecuta buena parte del script inyectado. Suele ser un requisito de algún framework que conviene revisar.',

  flag_csp_data_in_script_src: 'La política permite script en data:',
  fd_csp_data_in_script_src: 'Una URL data: es script que un atacante puede construir sin alojar nada en ninguna parte. Permitir ese esquema en script-src anula la lista de orígenes.',

  flag_csp_wildcard_script_src: 'La política permite script de cualquier origen',
  fd_csp_wildcard_script_src: 'script-src incluye *, https: o http:, lo que admite cualquier origen. La política es decorativa.',

  flag_csp_wildcard_host: 'La política permite un host con comodín',
  fd_csp_wildcard_host: 'Un patrón como *.example.com confía en todos los subdominios, incluido cualquiera que se pierda o se ceda a un tercero.',

  flag_csp_bypassable_host: 'La política permite una CDN que puede volverse en su contra',
  fd_csp_bypassable_host: 'Algunas CDN grandes alojan bibliotecas arbitrarias u ofrecen endpoints JSONP que devuelven el nombre de callback que se les pase. Permitir una de ellas es casi permitir cualquier script. strict-dynamic, o fijar rutas concretas, lo cierra.',

  flag_csp_short_nonce: 'El nonce es corto',
  fd_csp_short_nonce: 'Un nonce debe ser imposible de adivinar y generarse de nuevo en cada respuesta. Uno corto se adivina; uno reutilizado es peor que ninguno.',

  flag_csp_unsafe_inline_style: 'La política permite estilos en línea',
  fd_csp_unsafe_inline_style: 'Mucho menos grave que lo mismo para el script: habilita ataques de estilo y cierta exfiltración de datos mediante selectores, no ejecución de código.',

  flag_csp_object_src_not_none: 'object-src no es none',
  fd_csp_object_src_not_none: '<object> y <embed> ejecutan contenido de complementos y son un rodeo bien conocido para saltarse una política de script. Casi ningún sitio los necesita; object-src \'none\' no cuesta nada.',

  flag_csp_no_base_uri: 'Sin directiva base-uri',
  fd_csp_no_base_uri: 'Sin ella, una etiqueta <base> inyectada reescribe todas las URL relativas de la página — incluidos los orígenes de script que la política permitía con tanto cuidado.',

  flag_csp_no_frame_ancestors: 'Sin directiva frame-ancestors',
  fd_csp_no_frame_ancestors: 'frame-ancestors es el sustituto moderno de X-Frame-Options y el único que puede nombrar más de un origen.',

  flag_csp_no_form_action: 'Sin directiva form-action',
  fd_csp_no_form_action: 'Sin ella, un formulario inyectado puede enviar credenciales a otro origen.',

  flag_csp_no_reporting: 'La política no informa a ninguna parte',
  fd_csp_no_reporting: 'Sin report-uri ni report-to, las infracciones son silenciosas — de modo que una política que está rompiendo el sitio en silencio, o que se está infringiendo en silencio, se parece exactamente a una que funciona.',

  flag_hsts_missing: 'Sin cabecera HSTS',
  fd_hsts_missing: 'Sin Strict-Transport-Security, un navegador probará primero HTTP sin cifrar cada vez que un visitante escriba el nombre a secas, y esa petición puede interceptarse antes de que vea redirección alguna.',

  flag_hsts_sent_over_http: 'HSTS se envía por HTTP sin cifrar',
  fd_hsts_sent_over_http: 'El RFC 6797 §8.1 dice que los navegadores ignoran la cabecera en una respuesta sin cifrar. Es inofensivo, y suele indicar que se añadió al bloque de servidor equivocado.',

  flag_hsts_no_max_age: 'La cabecera HSTS no tiene max-age',
  fd_hsts_no_max_age: 'max-age es obligatorio. Sin él la cabecera no hace nada en absoluto.',

  flag_hsts_max_age_zero: 'HSTS está desactivado con max-age=0',
  fd_hsts_max_age_zero: 'Esta es la forma correcta de retirar HSTS, e indistinguible desde fuera de un error.',

  flag_hsts_max_age_short: 'La vida de HSTS es corta',
  fd_hsts_max_age_short: 'Menos de un año. Una ventana corta está bien mientras se despliega HSTS y queda por debajo de lo que exige la precarga.',

  flag_hsts_no_subdomains: 'HSTS no cubre los subdominios',
  fd_hsts_no_subdomains: 'Sin includeSubDomains, todavía se puede llegar a un subdominio por HTTP sin cifrar — y un subdominio es desde donde se establecen las cookies.',

  flag_hsts_preload_claimed_not_listed: 'Lleva la directiva preload y el sitio no está en la lista',
  fd_hsts_preload_claimed_not_listed: 'preload es una solicitud de inclusión, no un estado. Este sitio la lleva y no aparece en la lista que distribuye Chromium, lo que suele significar que nadie llegó a enviarlo — mientras todos los implicados dan la cosa por hecha.',

  flag_hsts_listed_without_directive: 'En la lista de precarga sin la directiva',
  fd_hsts_listed_without_directive: 'El sitio está precargado y ya no lo pide. Así es como un sitio se cae de la lista en la siguiente actualización.',

  flag_hsts_preload_not_eligible: 'La cabecera no cumple los requisitos de precarga',
  fd_hsts_preload_not_eligible: 'Precargar exige un max-age de al menos un año más includeSubDomains, junto con la directiva preload.',

  flag_hsts_preload_list_not_bundled: 'La lista de precarga no viene con esta instalación',
  fd_hsts_preload_list_not_bundled: 'No se pudo comprobar la pertenencia, así que se informa como desconocida en lugar de suponerla. Ejecute npm run preload:fetch para añadirla.',

  flag_cookie_not_secure: 'Una cookie se establece sin Secure',
  fd_cookie_not_secure: 'Sin Secure, la cookie se adjunta también a las peticiones HTTP sin cifrar — que es como una sesión sobrevive a «HTTPS en todas partes» y aun así se filtra en la única petición que no llegó allí.',

  flag_cookie_not_httponly: 'Una cookie es legible por script',
  fd_cookie_not_httponly: 'Sin HttpOnly, un script inyectado puede leer la cookie. Algunas cookies las lee el propio script del sitio a propósito, así que esto es una pregunta más que un veredicto.',

  flag_cookie_no_samesite: 'Una cookie no declara política SameSite',
  fd_cookie_no_samesite: 'Los navegadores ahora usan Lax por defecto, lo cual no es lo mismo que decirlo — y una cookie que realmente necesita None debe declararlo explícitamente o dejará de funcionar.',

  flag_cookie_samesite_none_without_secure: 'SameSite=None sin Secure',
  fd_cookie_samesite_none_without_secure: 'Todo navegador actual rechaza esta combinación de plano, así que la cookie no se establece en absoluto. Suele manifestarse como un inicio de sesión que sencillamente no funciona.',

  flag_cookie_prefix_violated: 'Se usa un prefijo de cookie sin cumplir sus condiciones',
  fd_cookie_prefix_violated: '__Host- exige Secure, sin Domain y con Path=/; __Secure- exige Secure. Un navegador rechaza la cookie que rompe la regla, así que para los visitantes esa cookie sencillamente no existe.',

  flag_cookie_very_long_lived: 'Una cookie vive más de un año',
  fd_cookie_very_long_lived: 'Una cookie de larga vida es una credencial de larga vida si identifica a alguien.',

  flag_cookie_no_prefixes: 'Ninguna cookie usa __Host- ni __Secure-',
  fd_cookie_no_prefixes: 'Los prefijos son la única protección de cookies que los navegadores imponen en lugar de limitarse a respetar: __Host- hace imposible que un subdominio sobrescriba la cookie, cosa que Secure y HttpOnly juntos no pueden.',

  flag_no_clickjacking_protection: 'Nada impide que el sitio se incruste en un marco',
  fd_no_clickjacking_protection: 'Ni X-Frame-Options ni una directiva frame-ancestors. La página puede cargarse de forma invisible dentro de otro sitio y recibir clics.',

  flag_framing_headers_disagree: 'Las dos cabeceras de marcos dicen cosas distintas',
  fd_framing_headers_disagree: 'X-Frame-Options y frame-ancestors no coinciden. Los navegadores prefieren frame-ancestors, así que la cabecera que parece más estricta puede no ser la que se aplica.',

  flag_x_frame_options_allow_from: 'X-Frame-Options usa ALLOW-FROM',
  fd_x_frame_options_allow_from: 'ALLOW-FROM nunca se implementó en Chrome y se ha retirado de Firefox, así que en la práctica no protege de nada. frame-ancestors es el sustituto.',

  flag_no_nosniff: 'Sin X-Content-Type-Options',
  fd_no_nosniff: 'Sin nosniff, un navegador puede adivinar que una respuesta es script cuando se sirvió como otra cosa — lo que convierte un endpoint de subida en un alojamiento de scripts.',

  flag_nosniff_malformed: 'X-Content-Type-Options tiene un valor inesperado',
  fd_nosniff_malformed: 'El único valor con el que los navegadores actúan es «nosniff». Cualquier otro se ignora.',

  flag_no_referrer_policy: 'Sin Referrer-Policy',
  fd_no_referrer_policy: 'Los navegadores usan strict-origin-when-cross-origin por defecto, lo cual es razonable — declararlo elimina la dependencia de ese valor por defecto.',

  flag_referrer_policy_leaky: 'La política de referente envía más de lo necesario',
  fd_referrer_policy_leaky: 'La URL completa, incluido cualquier identificador en la ruta o en la consulta, se envía a otros sitios. unsafe-url es el peor de estos casos.',

  flag_no_permissions_policy: 'Sin Permissions-Policy',
  fd_no_permissions_policy: 'Cámara, micrófono, geolocalización y lo demás quedan disponibles para la página y para todo lo que incruste. Denegar lo que no se usa es una sola cabecera.',

  flag_feature_policy_superseded: 'Feature-Policy está puesta sin Permissions-Policy',
  fd_feature_policy_superseded: 'Feature-Policy se renombró. Los navegadores actuales solo leen Permissions-Policy.',

  flag_no_coop: 'Sin Cross-Origin-Opener-Policy',
  fd_no_coop: 'COOP corta la referencia de ventana entre la página y lo que abre, lo que cierra toda una familia de ataques entre ventanas y es requisito previo para el aislamiento entre orígenes.',

  flag_no_corp: 'Sin Cross-Origin-Resource-Policy',
  fd_no_corp: 'CORP permite que una respuesta se niegue a ser incrustada por otros sitios. Es más útil en recursos que en documentos.',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection sigue puesta',
  fd_obsolete_x_xss_protection: 'El auditor que controlaba se retiró de los navegadores hace años — y mientras existió introdujo vulnerabilidades propias. La cabecera ya no hace nada.',

  flag_obsolete_expect_ct: 'Expect-CT sigue puesta',
  fd_obsolete_expect_ct: 'Retirada en 2021: la transparencia de certificados es ya obligatoria para todos los certificados, así que a la cabecera no le queda nada que exigir.',

  flag_obsolete_p3p: 'P3P sigue puesta',
  fd_obsolete_p3p: 'Un lenguaje de política de privacidad de 2002 que solo leyó Internet Explorer. Nada lo ha mirado en una década.',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP sigue puesta',
  fd_obsolete_x_webkit_csp: 'Una cabecera CSP con prefijo de antes de que el estándar se asentara. Ningún navegador actual la lee.',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy sigue puesta',
  fd_obsolete_x_content_security_policy: 'El viejo prefijo de Firefox, obsoleto desde Firefox 23.',

  flag_version_in_headers: 'Las cabeceras nombran el software y su versión',
  fd_version_in_headers: 'Ocultarlo no detiene a nadie decidido, y sí le da a un escáner un filtro para hosts con una versión que tiene un fallo conocido. Quitar la cabecera es gratis.',

  flag_duplicate_security_header: 'Una cabecera de seguridad se envía más de una vez',
  fd_duplicate_security_header: 'Los navegadores discrepan sobre cuál copia gana, y para una cabecera de seguridad esa discrepancia decide si la política se aplica. Suelen ser dos capas que añaden cada una la suya.',

  flag_cors_wildcard: 'CORS permite cualquier origen',
  fd_cors_wildcard: 'Access-Control-Allow-Origin es *. Correcto para una API pública, y digno de una segunda mirada en cualquier cosa que responda distinto según quién pregunte.',

  flag_cors_wildcard_with_credentials: 'CORS permite cualquier origen con credenciales',
  fd_cors_wildcard_with_credentials: 'Los navegadores rechazan esta combinación de plano, así que el endpoint está roto además de ser demasiado permisivo. Nombre los orígenes explícitamente.',

  flag_no_http2: 'No se negocia HTTP/2',
  fd_no_http2: 'El servidor eligió HTTP/1.1 cuando se le ofrecieron ambos. HTTP/2 suele ser la mejora de rendimiento más barata disponible, y es invisible hasta que alguien mira.',

  flag_no_http3_advertised: 'No se anuncia HTTP/3',
  fd_no_http3_advertised: 'No hay cabecera Alt-Svc que ofrezca h3. No es un fallo — y conviene saberlo, ya que HTTP/3 ayuda sobre todo en las redes móviles, que son las más difíciles de probar.',

  flag_no_compression: 'La respuesta no se comprime',
  fd_no_compression: 'No se comprimió nada aunque se ofrecieron gzip, br y zstd. En HTML eso suele ser un ahorro grande y gratuito.',

  flag_only_legacy_compression: 'Solo se ofrece gzip o deflate',
  fd_only_legacy_compression: 'Brotli y zstd comprimen texto bastante mejor y los admiten todos los navegadores actuales.',

  flag_legacy_tls: 'Se negocia una versión obsoleta de TLS',
  fd_legacy_tls: 'TLS 1.0 y 1.1 están obsoletos desde el RFC 8996 y los navegadores actuales los rechazan.',
};

OWN.pt = {
  title: 'Verificação de cabeçalhos — CSP, HSTS, cookies e a cadeia de redirecionamentos',
  title_short: 'Verificação de cabeçalhos',
  h1: 'Verificação de cabeçalhos',
  subtitle: 'A cadeia de redirecionamentos a partir das quatro entradas, a política de segurança de conteúdo desmontada diretiva por diretiva, e a participação real na lista de pré-carregamento do HSTS em vez da alegação',
  ph_host: 'example.com',
  hero_label: 'Site verificado',
  empty_hint: 'Digite um nome de domínio. A verificação segue a cadeia de redirecionamentos a partir de http e https, com e sem www, e depois lê os cabeçalhos da página em que o visitante realmente cai. A política de segurança de conteúdo é desmontada diretiva por diretiva, porque é esse o cabeçalho difícil de acertar.',

  stage_resolve: 'resolvendo o nome',
  stage_chain: 'seguindo os redirecionamentos',
  stage_headers: 'lendo os cabeçalhos',
  stage_csp: 'desmontando a política',
  stage_cookies: 'verificando os cookies',
  stage_protocols: 'negociando protocolos',
  stage_grade: 'atribuindo a nota',

  card_grade: 'Composição da nota',
  card_chain: 'Como os visitantes chegam',
  card_csp: 'Política de segurança de conteúdo',
  card_csp_directives: 'Diretivas',
  card_hsts: 'HSTS',
  card_cookies: 'Cookies',
  card_headers: 'Cabeçalhos de segurança',
  card_protocols: 'Protocolos',
  card_other: 'Outros cabeçalhos',

  comp_transport: 'Transporte',
  comp_csp: 'Política de segurança de conteúdo',
  comp_headers: 'Outros cabeçalhos',

  k_canonical: 'Termina em',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'http:// com www',
  k_entry_https_www: 'https:// com www',
  k_csp_present: 'Política',
  k_csp_enforced: 'É aplicada',
  k_csp_directives: 'Diretivas definidas',
  k_csp_nonce: 'Usa nonces ou hashes',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'Cabeçalho',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'Diretiva preload',
  k_hsts_preloaded: 'Na lista do Chromium',
  k_hsts_eligible: 'Apto ao pré-carregamento',
  k_cookie_count: 'Cookies definidos',
  k_cookies_secure: 'Todos com Secure',
  k_cookies_httponly: 'Todos com HttpOnly',
  k_headers_present: 'Presentes',
  k_alpn: 'Negociado (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 anunciado',
  k_compression: 'Compressão',
  k_tls_protocol: 'Versão do TLS',
  k_requests: 'Requisições feitas',

  th_entry: 'Ponto de entrada',
  th_step: 'Passo',
  th_status: 'Código',
  th_url: 'Endereço',
  th_time: 'Tempo',
  th_header: 'Cabeçalho',
  th_value: 'Valor',
  th_directive: 'Diretiva',
  th_sources: 'Origens',
  th_cookie: 'Cookie',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'a lista não vem incluída',
  v_seconds_days: '{n} dias',
  v_hops: '{n} saltos',

  note_chain: 'O que importa é o primeiro salto a partir de http://: um redirecionamento para outro endereço sem criptografia envia a requisição, cookies e tudo, por uma rede desprotegida. Redirecione primeiro para HTTPS no mesmo host e só depois para o nome canônico.',
  note_csp: 'Uma política que permite script embutido não impede nada do que um script injetado faria. Nonces e hashes existem justamente para que isso nunca seja necessário — e uma política que carrega ao mesmo tempo um nonce e unsafe-inline significa duas coisas diferentes em duas gerações de navegadores.',
  note_hsts: 'A diretiva preload é um pedido, não um estado. Um site pode carregá-la por anos sem nunca ter sido submetido, então o que se mostra aqui é a participação na lista que o Chromium de fato distribui.',
  note_cookies: 'De fora só se enxergam os cookies definidos na página de entrada; um cookie de sessão emitido após o login, não. O prefixo __Host- é a única proteção de cookie que um navegador impõe em vez de apenas respeitar.',
  note_protocols: 'O HTTP/2 é medido abrindo um handshake TLS e vendo o que o servidor escolhe. O HTTP/3 é relatado conforme anunciado em Alt-Svc — este verificador não fala QUIC, e dizer “não” seria inventar um resultado.',

  err_https_did_not_answer: 'O site não respondeu por HTTPS.',

  inc_https_did_not_answer: 'o site não respondeu por HTTPS, então não havia cabeçalhos para ler',

  cap_https_does_not_work: 'o HTTPS não funciona',
  cap_certificate_not_trusted: 'o certificado não valida',
  cap_certificate_not_trusted_on_alias: 'um alias apresenta um certificado que não o cobre',
  cap_http_is_served_as_is: 'o HTTP puro é servido em vez de redirecionar',
  cap_csp_allows_inline_script: 'a política permite script embutido',
  cap_csp_allows_any_script: 'a política permite script de qualquer origem',
  cap_csp_does_not_govern_script: 'a política não governa o script de forma alguma',
  cap_first_hop_in_the_clear: 'o primeiro redirecionamento fica em HTTP puro',
  cap_cookie_rejected_by_browsers: 'um cookie que os navegadores vão recusar',
  cap_cors_misconfigured: 'o CORS está configurado de um jeito que os navegadores rejeitam',
  cap_no_csp: 'sem política de segurança de conteúdo',
  cap_no_hsts: 'sem HSTS',
  cap_no_framing_protection: 'nada impede o site de ser embutido num quadro',
  cap_csp_not_enforced: 'a política é apenas de relatório',
  cap_cookie_without_secure: 'um cookie sem Secure',
  cap_csp_allows_data_urls: 'a política permite script em data:',
  cap_obsolete_tls: 'uma versão obsoleta de TLS',
  cap_scan_incomplete: 'a verificação ficou incompleta, então nenhuma nota foi dada',

  flag_https_unreachable: 'O site não responde por HTTPS',
  fd_https_unreachable: 'Nem o nome puro nem o www responderam na porta 443. Tudo o que vem abaixo depende de haver uma página cujos cabeçalhos ler.',

  flag_redirect_loop: 'Os redirecionamentos entram em laço',
  fd_redirect_loop: 'Uma das entradas manda os visitantes em círculo. Os navegadores desistem depois de uma dúzia de saltos e mostram um erro.',

  flag_too_many_redirects: 'Uma cadeia longa de redirecionamentos',
  fd_too_many_redirects: 'Mais saltos do que qualquer um deles precisa. Cada um é uma ida e volta antes de a página começar a carregar.',

  flag_http_not_served: 'O HTTP puro não é servido de forma alguma',
  fd_http_not_served: 'A porta 80 recusa conexões. Uma escolha legítima e um tanto desconfortável: quem digitar o nome puro recebe um erro de conexão em vez de ser redirecionado.',

  flag_http_does_not_redirect: 'O HTTP puro serve o site em vez de redirecionar',
  fd_http_does_not_redirect: 'O endereço sem criptografia devolve uma página em vez de mandar os visitantes para HTTPS. Tudo o que eles enviarem — e tudo o que lerem — fica visível para a rede.',

  flag_redirect_stays_on_http: 'O primeiro redirecionamento fica em HTTP puro',
  fd_redirect_stays_on_http: 'http:// redireciona para outro endereço http://, então o visitante faz ao menos duas requisições sem criptografia com os cookies anexados antes de chegar ao HTTPS. Redirecione primeiro para HTTPS no mesmo host e depois para o nome canônico — custa um salto a mais e fecha a brecha.',

  flag_redirect_changes_host_and_scheme: 'O primeiro redirecionamento muda host e esquema de uma vez',
  fd_redirect_changes_host_and_scheme: 'O destino está correto, e trocar primeiro o esquema no mesmo host é marginalmente mais seguro contra um redirecionamento adulterado. Um detalhe pequeno.',

  flag_redirect_not_permanent: 'O redirecionamento não é permanente',
  fd_redirect_not_permanent: 'Um 302 ou 307 diz ao navegador para não lembrar dele, então cada visita repete o salto sem criptografia. Use 301 ou 308.',

  flag_certificate_not_trusted: 'O certificado não valida',
  fd_certificate_not_trusted: 'O certificado do endereço em que os visitantes caem está vencido, é autoassinado ou não cobre o nome. Os navegadores mostram um aviso em tela cheia.',

  flag_certificate_not_trusted_on_alias: 'Um alias apresenta um certificado que não o cobre',
  fd_certificate_not_trusted_on_alias: 'O endereço canônico está bem e outro nome — geralmente www — não é coberto pelo certificado. O curl e o redirecionamento continuam funcionando, então isso sobrevive aos testes e só os navegadores reclamam.',

  flag_www_and_bare_both_serve: 'www e o nome puro servem ambos o site',
  fd_www_and_bare_both_serve: 'Nenhum redireciona para o outro, então as mesmas páginas existem em dois endereços. Isso divide cookies, caches e links de entrada.',

  flag_csp_missing: 'Sem política de segurança de conteúdo',
  fd_csp_missing: 'Nada limita de onde o script pode ser carregado nem se script embutido pode rodar. A CSP é o único cabeçalho que limita o estrago de uma injeção em vez de tentar impedi-la.',

  flag_csp_report_only: 'A política é apenas de relatório',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only relata violações e não bloqueia nada. É a forma certa de testar uma política, e é fácil deixá-la ali depois que os testes acabam.',

  flag_csp_multiple_policies: 'Mais de uma política é aplicada',
  fd_csp_multiple_policies: 'Todas as políticas aplicadas valem, e o resultado é a interseção — mais estrita do que qualquer uma delas. Quase nunca é o que se pretendia quando a segunda chegou junto com um plugin.',

  flag_csp_no_script_src: 'A política não governa o script',
  fd_csp_no_script_src: 'Não há script-src nem default-src, então script pode ser carregado de qualquer lugar. A política pode definir uma dúzia de outras diretivas e ainda assim permitir exatamente o que deveria impedir.',

  flag_csp_unsafe_inline: 'A política permite script embutido',
  fd_csp_unsafe_inline: 'Com unsafe-inline, um <script> injetado roda, que é justamente o ataque que a CSP existe para deter. Nonces e hashes existem exatamente para que isso nunca seja preciso.',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline ao lado de um nonce ou hash',
  fd_csp_unsafe_inline_with_nonce: 'Um navegador que entende nonces ignora unsafe-inline; um que não entende, obedece. A política, portanto, significa duas coisas diferentes conforme quem lê — e a leitura antiga é a fraca. Uma vez que os nonces estejam no lugar, remova-o.',

  flag_csp_unsafe_eval: 'A política permite eval',
  fd_csp_unsafe_eval: 'unsafe-eval reabre a execução de código a partir de texto, que é como boa parte do script injetado de fato roda. Costuma ser exigência de algum framework que vale revisitar.',

  flag_csp_data_in_script_src: 'A política permite script em data:',
  fd_csp_data_in_script_src: 'Uma URL data: é script que um atacante consegue construir sem hospedar nada em lugar nenhum. Permitir esse esquema em script-src anula a lista de origens.',

  flag_csp_wildcard_script_src: 'A política permite script de qualquer origem',
  fd_csp_wildcard_script_src: 'script-src inclui *, https: ou http:, o que permite qualquer origem. A política é decorativa.',

  flag_csp_wildcard_host: 'A política permite um host com curinga',
  fd_csp_wildcard_host: 'Um padrão como *.example.com confia em todo subdomínio, inclusive em qualquer um que venha a ser tomado ou entregue a terceiros.',

  flag_csp_bypassable_host: 'A política permite uma CDN que pode ser virada contra ela',
  fd_csp_bypassable_host: 'Algumas CDNs grandes hospedam bibliotecas arbitrárias ou oferecem endpoints JSONP que devolvem o nome de callback fornecido por quem chama. Permitir uma delas é quase permitir qualquer script. strict-dynamic, ou fixar caminhos específicos, fecha isso.',

  flag_csp_short_nonce: 'O nonce é curto',
  fd_csp_short_nonce: 'Um nonce precisa ser impossível de adivinhar e gerado de novo a cada resposta. Um curto se adivinha; um reutilizado é pior do que nenhum.',

  flag_csp_unsafe_inline_style: 'A política permite estilos embutidos',
  fd_csp_unsafe_inline_style: 'Bem menos grave do que o mesmo para script — habilita ataques de estilo e alguma exfiltração de dados por seletores, não execução de código.',

  flag_csp_object_src_not_none: 'object-src não é none',
  fd_csp_object_src_not_none: '<object> e <embed> executam conteúdo de plugin e são um desvio bem conhecido em torno de uma política de script. Quase nenhum site precisa deles; object-src \'none\' não custa nada.',

  flag_csp_no_base_uri: 'Sem diretiva base-uri',
  fd_csp_no_base_uri: 'Sem ela, uma tag <base> injetada reescreve todas as URLs relativas da página — inclusive as origens de script que a política permitiu com tanto cuidado.',

  flag_csp_no_frame_ancestors: 'Sem diretiva frame-ancestors',
  fd_csp_no_frame_ancestors: 'frame-ancestors é a substituta moderna do X-Frame-Options e a única capaz de nomear mais de uma origem.',

  flag_csp_no_form_action: 'Sem diretiva form-action',
  fd_csp_no_form_action: 'Sem ela, um formulário injetado pode enviar credenciais para outra origem.',

  flag_csp_no_reporting: 'A política não relata para lugar nenhum',
  fd_csp_no_reporting: 'Sem report-uri ou report-to, as violações são silenciosas — então uma política que está quebrando o site em silêncio, ou que está sendo violada em silêncio, é idêntica a uma que funciona.',

  flag_hsts_missing: 'Sem cabeçalho HSTS',
  fd_hsts_missing: 'Sem Strict-Transport-Security, o navegador tentará primeiro HTTP puro toda vez que um visitante digitar o nome puro, e essa requisição pode ser interceptada antes que ele veja qualquer redirecionamento.',

  flag_hsts_sent_over_http: 'O HSTS é enviado por HTTP puro',
  fd_hsts_sent_over_http: 'O RFC 6797 §8.1 diz que os navegadores ignoram o cabeçalho numa resposta sem criptografia. É inofensivo e costuma ser sinal de que foi acrescentado ao bloco de servidor errado.',

  flag_hsts_no_max_age: 'O cabeçalho HSTS não tem max-age',
  fd_hsts_no_max_age: 'max-age é obrigatório. Sem ele, o cabeçalho não faz absolutamente nada.',

  flag_hsts_max_age_zero: 'O HSTS está desligado por max-age=0',
  fd_hsts_max_age_zero: 'Essa é a forma correta de retirar o HSTS, e indistinguível de fora de um engano.',

  flag_hsts_max_age_short: 'O tempo de vida do HSTS é curto',
  fd_hsts_max_age_short: 'Menos de um ano. Uma janela curta é adequada enquanto o HSTS está sendo implantado e fica abaixo do que o pré-carregamento exige.',

  flag_hsts_no_subdomains: 'O HSTS não cobre os subdomínios',
  fd_hsts_no_subdomains: 'Sem includeSubDomains, ainda dá para alcançar um subdomínio por HTTP puro — e é de um subdomínio que os cookies costumam ser definidos.',

  flag_hsts_preload_claimed_not_listed: 'A diretiva preload está lá e o site não está na lista',
  fd_hsts_preload_claimed_not_listed: 'preload é um pedido de inclusão, não um estado. Este site a carrega e não aparece na lista que o Chromium distribui, o que geralmente significa que ninguém chegou a submetê-lo — enquanto todos os envolvidos dão o assunto por resolvido.',

  flag_hsts_listed_without_directive: 'Na lista de pré-carregamento sem a diretiva',
  fd_hsts_listed_without_directive: 'O site está pré-carregado e já não pede para estar. É assim que um site cai fora na próxima atualização da lista.',

  flag_hsts_preload_not_eligible: 'O cabeçalho não atende aos requisitos de pré-carregamento',
  fd_hsts_preload_not_eligible: 'Pré-carregar exige max-age de pelo menos um ano mais includeSubDomains, além da própria diretiva preload.',

  flag_hsts_preload_list_not_bundled: 'A lista de pré-carregamento não veio com esta instalação',
  fd_hsts_preload_list_not_bundled: 'Não foi possível conferir a participação, então ela é relatada como desconhecida em vez de adivinhada. Rode npm run preload:fetch para incluí-la.',

  flag_cookie_not_secure: 'Um cookie é definido sem Secure',
  fd_cookie_not_secure: 'Sem Secure, o cookie também é anexado a requisições HTTP puras — que é como uma sessão sobrevive ao “HTTPS em todo lugar” e ainda assim vaza naquela única requisição que não chegou lá.',

  flag_cookie_not_httponly: 'Um cookie pode ser lido por script',
  fd_cookie_not_httponly: 'Sem HttpOnly, um script injetado consegue ler o cookie. Alguns cookies são lidos de propósito pelo próprio script do site, então isto é uma pergunta e não um veredito.',

  flag_cookie_no_samesite: 'Um cookie não declara política SameSite',
  fd_cookie_no_samesite: 'Os navegadores hoje usam Lax por padrão, o que não é o mesmo que declarar — e um cookie que realmente precisa de None tem de dizê-lo explicitamente, ou para de funcionar.',

  flag_cookie_samesite_none_without_secure: 'SameSite=None sem Secure',
  fd_cookie_samesite_none_without_secure: 'Todo navegador atual rejeita essa combinação de saída, então o cookie simplesmente não é definido. Costuma aparecer como um login que silenciosamente não funciona.',

  flag_cookie_prefix_violated: 'Um prefixo de cookie é usado sem cumprir suas condições',
  fd_cookie_prefix_violated: '__Host- exige Secure, sem Domain e com Path=/; __Secure- exige Secure. O navegador recusa o cookie que quebra a regra, então para os visitantes esse cookie simplesmente não existe.',

  flag_cookie_very_long_lived: 'Um cookie vive mais de um ano',
  fd_cookie_very_long_lived: 'Um cookie de vida longa é uma credencial de vida longa, se identificar alguém.',

  flag_cookie_no_prefixes: 'Nenhum cookie usa __Host- ou __Secure-',
  fd_cookie_no_prefixes: 'Os prefixos são a única proteção de cookie que os navegadores impõem em vez de apenas respeitar: __Host- torna impossível que um subdomínio sobrescreva o cookie, o que Secure e HttpOnly juntos não conseguem.',

  flag_no_clickjacking_protection: 'Nada impede o site de ser embutido num quadro',
  fd_no_clickjacking_protection: 'Nem X-Frame-Options nem uma diretiva frame-ancestors. A página pode ser carregada invisivelmente dentro de outro site e receber cliques.',

  flag_framing_headers_disagree: 'Os dois cabeçalhos de quadro dizem coisas diferentes',
  fd_framing_headers_disagree: 'X-Frame-Options e frame-ancestors não batem. Os navegadores preferem frame-ancestors, então o cabeçalho que parece mais estrito pode não ser o que vale.',

  flag_x_frame_options_allow_from: 'X-Frame-Options usa ALLOW-FROM',
  fd_x_frame_options_allow_from: 'ALLOW-FROM nunca foi implementado no Chrome e foi removido do Firefox, então na prática não protege de nada. frame-ancestors é a substituta.',

  flag_no_nosniff: 'Sem X-Content-Type-Options',
  fd_no_nosniff: 'Sem nosniff, um navegador pode adivinhar que uma resposta é script quando ela foi servida como outra coisa — o que transforma um endpoint de upload num hospedeiro de scripts.',

  flag_nosniff_malformed: 'X-Content-Type-Options tem um valor inesperado',
  fd_nosniff_malformed: 'O único valor com que os navegadores agem é “nosniff”. Qualquer outro é ignorado.',

  flag_no_referrer_policy: 'Sem Referrer-Policy',
  fd_no_referrer_policy: 'Os navegadores usam strict-origin-when-cross-origin por padrão, o que é razoável — declarar isso remove a dependência desse padrão.',

  flag_referrer_policy_leaky: 'A política de referenciador envia mais do que precisa',
  fd_referrer_policy_leaky: 'A URL inteira, incluindo qualquer identificador no caminho ou na consulta, é enviada a outros sites. unsafe-url é o pior desses casos.',

  flag_no_permissions_policy: 'Sem Permissions-Policy',
  fd_no_permissions_policy: 'Câmera, microfone, geolocalização e o resto ficam disponíveis para a página e para tudo o que ela embutir. Negar o que não se usa é um cabeçalho só.',

  flag_feature_policy_superseded: 'Feature-Policy está definida sem Permissions-Policy',
  fd_feature_policy_superseded: 'Feature-Policy foi renomeada. Os navegadores atuais só leem Permissions-Policy.',

  flag_no_coop: 'Sem Cross-Origin-Opener-Policy',
  fd_no_coop: 'A COOP corta a referência de janela entre a página e o que ela abre, o que fecha uma família inteira de ataques entre janelas e é pré-requisito para o isolamento entre origens.',

  flag_no_corp: 'Sem Cross-Origin-Resource-Policy',
  fd_no_corp: 'A CORP permite que uma resposta se recuse a ser embutida por outros sites. É mais útil em recursos do que em documentos.',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection ainda está definida',
  fd_obsolete_x_xss_protection: 'O auditor que ela controlava foi removido dos navegadores anos atrás — e, enquanto existiu, introduziu vulnerabilidades próprias. O cabeçalho hoje não faz nada.',

  flag_obsolete_expect_ct: 'Expect-CT ainda está definida',
  fd_obsolete_expect_ct: 'Aposentada em 2021: a transparência de certificados já é exigida de todos os certificados, então ao cabeçalho não sobrou nada a exigir.',

  flag_obsolete_p3p: 'P3P ainda está definida',
  fd_obsolete_p3p: 'Uma linguagem de política de privacidade de 2002 que só o Internet Explorer leu. Nada olha para ela há uma década.',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP ainda está definida',
  fd_obsolete_x_webkit_csp: 'Um cabeçalho CSP com prefixo, de antes de o padrão se firmar. Nenhum navegador atual o lê.',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy ainda está definida',
  fd_obsolete_x_content_security_policy: 'O antigo prefixo do Firefox, obsoleto desde o Firefox 23.',

  flag_version_in_headers: 'Os cabeçalhos nomeiam o software e a versão',
  fd_version_in_headers: 'Esconder isso não detém ninguém determinado, e de fato entrega a um scanner um filtro para hosts com uma versão que tem falha conhecida. Remover o cabeçalho é de graça.',

  flag_duplicate_security_header: 'Um cabeçalho de segurança é enviado mais de uma vez',
  fd_duplicate_security_header: 'Os navegadores discordam sobre qual cópia vence, e para um cabeçalho de segurança essa discordância decide se a política vale. Normalmente são duas camadas, cada uma acrescentando a sua.',

  flag_cors_wildcard: 'O CORS permite qualquer origem',
  fd_cors_wildcard: 'Access-Control-Allow-Origin é *. Correto para uma API pública, e digno de uma segunda olhada em qualquer coisa que responda diferente conforme quem pergunta.',

  flag_cors_wildcard_with_credentials: 'O CORS permite qualquer origem com credenciais',
  fd_cors_wildcard_with_credentials: 'Os navegadores rejeitam essa combinação de saída, então o endpoint está quebrado além de permissivo demais. Nomeie as origens explicitamente.',

  flag_no_http2: 'O HTTP/2 não é negociado',
  fd_no_http2: 'O servidor escolheu HTTP/1.1 quando lhe ofereceram os dois. O HTTP/2 costuma ser a melhoria de desempenho mais barata disponível, e é invisível até alguém olhar.',

  flag_no_http3_advertised: 'O HTTP/3 não é anunciado',
  fd_no_http3_advertised: 'Não há cabeçalho Alt-Svc oferecendo h3. Não é uma falha — e vale saber, já que o HTTP/3 ajuda principalmente nas redes móveis, que são as mais difíceis de testar.',

  flag_no_compression: 'A resposta não é comprimida',
  fd_no_compression: 'Nada foi comprimido embora gzip, br e zstd tenham sido todos oferecidos. Em HTML isso costuma ser uma economia grande e gratuita.',

  flag_only_legacy_compression: 'Só gzip ou deflate é oferecido',
  fd_only_legacy_compression: 'Brotli e zstd comprimem texto sensivelmente melhor e são suportados por todos os navegadores atuais.',

  flag_legacy_tls: 'Uma versão obsoleta de TLS é negociada',
  fd_legacy_tls: 'TLS 1.0 e 1.1 estão obsoletos desde o RFC 8996 e são recusados pelos navegadores atuais.',
};

OWN.fr = {
  title: 'Vérification des en-têtes — CSP, HSTS, cookies et la chaîne de redirections',
  title_short: 'Vérification des en-têtes',
  h1: 'Vérification des en-têtes',
  subtitle: 'La chaîne de redirections depuis les quatre entrées, la politique de sécurité du contenu démontée directive par directive, et l’appartenance réelle à la liste de préchargement HSTS plutôt que la prétention',
  ph_host: 'example.com',
  hero_label: 'Site vérifié',
  empty_hint: 'Saisissez un nom de domaine. La vérification suit la chaîne de redirections depuis http et https, avec et sans www, puis lit les en-têtes de la page où un visiteur atterrit réellement. La politique de sécurité du contenu est démontée directive par directive, car c’est l’en-tête difficile à régler correctement.',

  stage_resolve: 'résolution du nom',
  stage_chain: 'suivi des redirections',
  stage_headers: 'lecture des en-têtes',
  stage_csp: 'démontage de la politique',
  stage_cookies: 'contrôle des cookies',
  stage_protocols: 'négociation des protocoles',
  stage_grade: 'notation',

  card_grade: 'Composition de la note',
  card_chain: 'Comment les visiteurs arrivent',
  card_csp: 'Politique de sécurité du contenu',
  card_csp_directives: 'Directives',
  card_hsts: 'HSTS',
  card_cookies: 'Cookies',
  card_headers: 'En-têtes de sécurité',
  card_protocols: 'Protocoles',
  card_other: 'Autres en-têtes',

  comp_transport: 'Transport',
  comp_csp: 'Politique de sécurité du contenu',
  comp_headers: 'Autres en-têtes',

  k_canonical: 'Aboutit à',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'http:// avec www',
  k_entry_https_www: 'https:// avec www',
  k_csp_present: 'Politique',
  k_csp_enforced: 'Appliquée',
  k_csp_directives: 'Directives définies',
  k_csp_nonce: 'Utilise nonces ou empreintes',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'En-tête',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'Directive preload',
  k_hsts_preloaded: 'Dans la liste Chromium',
  k_hsts_eligible: 'Éligible au préchargement',
  k_cookie_count: 'Cookies posés',
  k_cookies_secure: 'Tous en Secure',
  k_cookies_httponly: 'Tous en HttpOnly',
  k_headers_present: 'Présents',
  k_alpn: 'Négocié (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 annoncé',
  k_compression: 'Compression',
  k_tls_protocol: 'Version de TLS',
  k_requests: 'Requêtes effectuées',

  th_entry: 'Point d’entrée',
  th_step: 'Étape',
  th_status: 'Code',
  th_url: 'Adresse',
  th_time: 'Temps',
  th_header: 'En-tête',
  th_value: 'Valeur',
  th_directive: 'Directive',
  th_sources: 'Sources',
  th_cookie: 'Cookie',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'liste non fournie',
  v_seconds_days: '{n} jours',
  v_hops: '{n} sauts',

  note_chain: 'Ce qui compte, c’est le premier saut depuis http:// : une redirection vers une autre adresse en clair envoie la requête, cookies compris, à travers un réseau non protégé. Redirigez d’abord vers HTTPS sur le même hôte, puis seulement vers le nom canonique.',
  note_csp: 'Une politique qui autorise le script en ligne n’arrête rien de ce que ferait un script injecté. Les nonces et les empreintes existent précisément pour que cela ne soit jamais nécessaire — et une politique portant à la fois un nonce et unsafe-inline signifie deux choses différentes dans deux générations de navigateurs.',
  note_hsts: 'La directive preload est une demande, pas un état. Un site peut la porter des années sans avoir jamais été soumis ; ce qui est affiché ici est donc l’appartenance à la liste que Chromium distribue réellement.',
  note_cookies: 'De l’extérieur, on ne voit que les cookies posés sur la page d’atterrissage, pas un cookie de session émis après connexion. Le préfixe __Host- est la seule protection de cookie qu’un navigateur impose au lieu de simplement la respecter.',
  note_protocols: 'HTTP/2 est mesuré en ouvrant une poignée de main TLS et en observant ce que le serveur choisit. HTTP/3 est rapporté tel qu’annoncé dans Alt-Svc : ce vérificateur ne parle pas QUIC, et répondre « non » reviendrait à inventer un résultat.',

  err_https_did_not_answer: 'Le site n’a pas répondu en HTTPS.',

  inc_https_did_not_answer: 'le site n’a pas répondu en HTTPS, il n’y avait donc aucun en-tête à lire',

  cap_https_does_not_work: 'HTTPS ne fonctionne pas',
  cap_certificate_not_trusted: 'le certificat ne valide pas',
  cap_certificate_not_trusted_on_alias: 'un alias présente un certificat qui ne le couvre pas',
  cap_http_is_served_as_is: 'le HTTP en clair est servi au lieu de rediriger',
  cap_csp_allows_inline_script: 'la politique autorise le script en ligne',
  cap_csp_allows_any_script: 'la politique autorise le script de n’importe quelle origine',
  cap_csp_does_not_govern_script: 'la politique ne régit pas le script du tout',
  cap_first_hop_in_the_clear: 'la première redirection reste en HTTP en clair',
  cap_cookie_rejected_by_browsers: 'un cookie que les navigateurs refuseront',
  cap_cors_misconfigured: 'CORS est configuré d’une façon que les navigateurs rejettent',
  cap_no_csp: 'pas de politique de sécurité du contenu',
  cap_no_hsts: 'pas de HSTS',
  cap_no_framing_protection: 'rien n’empêche le site d’être encadré',
  cap_csp_not_enforced: 'la politique est en mode rapport seulement',
  cap_cookie_without_secure: 'un cookie sans Secure',
  cap_csp_allows_data_urls: 'la politique autorise le script en data:',
  cap_obsolete_tls: 'une version obsolète de TLS',
  cap_scan_incomplete: 'la vérification est restée incomplète, aucune note n’a donc été attribuée',

  flag_https_unreachable: 'Le site ne répond pas en HTTPS',
  fd_https_unreachable: 'Ni le nom nu ni www n’ont répondu sur le port 443. Tout ce qui suit dépend de l’existence d’une page dont lire les en-têtes.',

  flag_redirect_loop: 'Les redirections bouclent',
  fd_redirect_loop: 'L’une des entrées envoie les visiteurs en rond. Les navigateurs abandonnent après une douzaine de sauts et affichent une erreur.',

  flag_too_many_redirects: 'Une longue chaîne de redirections',
  fd_too_many_redirects: 'Plus de sauts qu’aucune d’entre elles n’en a besoin. Chacun est un aller-retour avant même que la page commence à charger.',

  flag_http_not_served: 'Le HTTP en clair n’est pas servi du tout',
  fd_http_not_served: 'Le port 80 refuse les connexions. Un choix légitime, et légèrement inconfortable : celui qui tape le nom nu obtient une erreur de connexion au lieu d’une redirection.',

  flag_http_does_not_redirect: 'Le HTTP en clair sert le site au lieu de rediriger',
  fd_http_does_not_redirect: 'L’adresse non chiffrée renvoie une page au lieu d’envoyer les visiteurs vers HTTPS. Tout ce qu’ils envoient — et tout ce qu’ils lisent — est visible du réseau.',

  flag_redirect_stays_on_http: 'La première redirection reste en HTTP en clair',
  fd_redirect_stays_on_http: 'http:// redirige vers une autre adresse http://, si bien que le visiteur effectue au moins deux requêtes en clair, cookies attachés, avant d’arriver en HTTPS. Redirigez d’abord vers HTTPS sur le même hôte, puis vers le nom canonique : cela coûte un saut de plus et referme la brèche.',

  flag_redirect_changes_host_and_scheme: 'La première redirection change d’hôte et de schéma d’un coup',
  fd_redirect_changes_host_and_scheme: 'La destination est correcte, et changer d’abord le schéma sur le même hôte est marginalement plus sûr face à une redirection falsifiée. Un détail mineur.',

  flag_redirect_not_permanent: 'La redirection n’est pas permanente',
  fd_redirect_not_permanent: 'Un 302 ou un 307 dit au navigateur de ne pas la retenir ; chaque visite refait donc le saut en clair. Utilisez 301 ou 308.',

  flag_certificate_not_trusted: 'Le certificat ne valide pas',
  fd_certificate_not_trusted: 'Le certificat de l’adresse où atterrissent les visiteurs est expiré, auto-signé ou ne couvre pas le nom. Les navigateurs affichent un avertissement plein écran.',

  flag_certificate_not_trusted_on_alias: 'Un alias présente un certificat qui ne le couvre pas',
  fd_certificate_not_trusted_on_alias: 'L’adresse canonique va bien et un autre nom — le plus souvent www — n’est pas couvert par le certificat. curl et la redirection continuent de fonctionner, si bien que cela survit aux tests et que seuls les navigateurs protestent.',

  flag_www_and_bare_both_serve: 'www et le nom nu servent tous deux le site',
  fd_www_and_bare_both_serve: 'Aucun ne redirige vers l’autre : les mêmes pages existent donc à deux adresses. Cela partage en deux les cookies, les caches et les liens entrants.',

  flag_csp_missing: 'Pas de politique de sécurité du contenu',
  fd_csp_missing: 'Rien ne limite d’où le script peut être chargé ni si le script en ligne peut s’exécuter. La CSP est le seul en-tête qui limite les dégâts d’une injection au lieu d’essayer de l’empêcher.',

  flag_csp_report_only: 'La politique est en mode rapport seulement',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only signale les violations et ne bloque rien. C’est la bonne façon de tester une politique, et il est facile de l’y laisser une fois les tests terminés.',

  flag_csp_multiple_policies: 'Plus d’une politique est appliquée',
  fd_csp_multiple_policies: 'Toutes les politiques appliquées comptent, et le résultat est leur intersection — plus stricte que chacune d’elles. Ce n’est presque jamais l’intention quand la seconde est arrivée avec un greffon.',

  flag_csp_no_script_src: 'La politique ne régit pas le script',
  fd_csp_no_script_src: 'Ni script-src ni default-src ne sont définis : le script peut donc être chargé de partout. La politique peut fixer une douzaine d’autres directives et autoriser malgré tout exactement ce qu’elle devait empêcher.',

  flag_csp_unsafe_inline: 'La politique autorise le script en ligne',
  fd_csp_unsafe_inline: 'Avec unsafe-inline, un <script> injecté s’exécute — précisément l’attaque que la CSP existe pour arrêter. Les nonces et les empreintes existent justement pour que cela ne soit jamais nécessaire.',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline à côté d’un nonce ou d’une empreinte',
  fd_csp_unsafe_inline_with_nonce: 'Un navigateur qui comprend les nonces ignore unsafe-inline ; un qui ne les comprend pas lui obéit. La politique signifie donc deux choses différentes selon le lecteur — et la lecture ancienne est la faible. Une fois les nonces en place, retirez-le.',

  flag_csp_unsafe_eval: 'La politique autorise eval',
  fd_csp_unsafe_eval: 'unsafe-eval rouvre l’exécution de code depuis une chaîne, c’est-à-dire la façon dont s’exécute une bonne part du script injecté. C’est en général l’exigence d’un cadriciel qu’il vaut la peine de réexaminer.',

  flag_csp_data_in_script_src: 'La politique autorise le script en data:',
  fd_csp_data_in_script_src: 'Une URL data: est du script qu’un attaquant peut fabriquer sans rien héberger nulle part. Autoriser ce schéma dans script-src annule la liste des origines.',

  flag_csp_wildcard_script_src: 'La politique autorise le script de n’importe quelle origine',
  fd_csp_wildcard_script_src: 'script-src comprend *, https: ou http:, ce qui admet toute origine. La politique est décorative.',

  flag_csp_wildcard_host: 'La politique autorise un hôte avec joker',
  fd_csp_wildcard_host: 'Un motif comme *.example.com fait confiance à tous les sous-domaines, y compris à ceux qui viendraient à être perdus ou confiés à un tiers.',

  flag_csp_bypassable_host: 'La politique autorise un CDN qui peut être retourné contre elle',
  fd_csp_bypassable_host: 'Certains grands CDN hébergent des bibliothèques arbitraires ou proposent des points d’accès JSONP qui renvoient le nom de rappel fourni par l’appelant. En autoriser un revient presque à autoriser n’importe quel script. strict-dynamic, ou l’épinglage de chemins précis, referme cela.',

  flag_csp_short_nonce: 'Le nonce est court',
  fd_csp_short_nonce: 'Un nonce doit être impossible à deviner et régénéré à chaque réponse. Un nonce court se devine ; un nonce réutilisé est pire que pas de nonce du tout.',

  flag_csp_unsafe_inline_style: 'La politique autorise les styles en ligne',
  fd_csp_unsafe_inline_style: 'Bien moins grave que la même chose pour le script : cela ouvre la voie à des attaques par style et à une certaine exfiltration de données par sélecteurs, pas à l’exécution de code.',

  flag_csp_object_src_not_none: 'object-src n’est pas none',
  fd_csp_object_src_not_none: '<object> et <embed> exécutent du contenu de greffon et constituent un contournement bien connu d’une politique de script. Presque aucun site n’en a besoin ; object-src \'none\' ne coûte rien.',

  flag_csp_no_base_uri: 'Pas de directive base-uri',
  fd_csp_no_base_uri: 'Sans elle, une balise <base> injectée réécrit toutes les URL relatives de la page — y compris les sources de script que la politique autorisait si soigneusement.',

  flag_csp_no_frame_ancestors: 'Pas de directive frame-ancestors',
  fd_csp_no_frame_ancestors: 'frame-ancestors remplace X-Frame-Options et reste la seule à pouvoir nommer plus d’une origine.',

  flag_csp_no_form_action: 'Pas de directive form-action',
  fd_csp_no_form_action: 'Sans elle, un formulaire injecté peut envoyer des identifiants vers une autre origine.',

  flag_csp_no_reporting: 'La politique ne rapporte nulle part',
  fd_csp_no_reporting: 'Sans report-uri ni report-to, les violations sont silencieuses — de sorte qu’une politique qui casse le site en silence, ou qui est violée en silence, ressemble exactement à une politique qui marche.',

  flag_hsts_missing: 'Pas d’en-tête HSTS',
  fd_hsts_missing: 'Sans Strict-Transport-Security, un navigateur essaiera d’abord le HTTP en clair chaque fois qu’un visiteur tape le nom nu, et cette requête peut être interceptée avant qu’il ne voie la moindre redirection.',

  flag_hsts_sent_over_http: 'HSTS est envoyé en HTTP en clair',
  fd_hsts_sent_over_http: 'Le RFC 6797 §8.1 précise que les navigateurs ignorent l’en-tête dans une réponse non chiffrée. C’est sans danger, et cela signale d’ordinaire un ajout dans le mauvais bloc de serveur.',

  flag_hsts_no_max_age: 'L’en-tête HSTS n’a pas de max-age',
  fd_hsts_no_max_age: 'max-age est obligatoire. Sans lui, l’en-tête ne fait absolument rien.',

  flag_hsts_max_age_zero: 'HSTS est désactivé par max-age=0',
  fd_hsts_max_age_zero: 'C’est la bonne façon de retirer HSTS, et c’est indiscernable de l’extérieur d’une erreur.',

  flag_hsts_max_age_short: 'La durée de vie HSTS est courte',
  fd_hsts_max_age_short: 'Moins d’un an. Une fenêtre courte est appropriée pendant le déploiement de HSTS et reste en deçà de ce qu’exige le préchargement.',

  flag_hsts_no_subdomains: 'HSTS ne couvre pas les sous-domaines',
  fd_hsts_no_subdomains: 'Sans includeSubDomains, on peut encore atteindre un sous-domaine en HTTP en clair — et c’est depuis un sous-domaine que les cookies sont posés.',

  flag_hsts_preload_claimed_not_listed: 'La directive preload est là et le site n’est pas dans la liste',
  fd_hsts_preload_claimed_not_listed: 'preload est une demande d’inscription, pas un état. Ce site la porte et ne figure pas dans la liste distribuée par Chromium, ce qui signifie d’ordinaire que personne n’a jamais soumis la demande — tandis que tous les intéressés considèrent l’affaire réglée.',

  flag_hsts_listed_without_directive: 'Dans la liste de préchargement sans la directive',
  fd_hsts_listed_without_directive: 'Le site est préchargé et ne le demande plus. C’est ainsi qu’un site sort de la liste à la mise à jour suivante.',

  flag_hsts_preload_not_eligible: 'L’en-tête ne satisfait pas aux exigences du préchargement',
  fd_hsts_preload_not_eligible: 'Le préchargement exige un max-age d’au moins un an et includeSubDomains, en plus de la directive preload elle-même.',

  flag_hsts_preload_list_not_bundled: 'La liste de préchargement n’accompagne pas cette installation',
  fd_hsts_preload_list_not_bundled: 'L’appartenance n’a pas pu être vérifiée ; elle est donc rapportée comme inconnue plutôt que devinée. Lancez npm run preload:fetch pour l’ajouter.',

  flag_cookie_not_secure: 'Un cookie est posé sans Secure',
  fd_cookie_not_secure: 'Sans Secure, le cookie est aussi joint aux requêtes HTTP en clair — c’est ainsi qu’une session survit au « HTTPS partout » et fuit malgré tout dans l’unique requête qui n’y est pas arrivée.',

  flag_cookie_not_httponly: 'Un cookie est lisible par script',
  fd_cookie_not_httponly: 'Sans HttpOnly, un script injecté peut lire le cookie. Certains cookies sont lus exprès par le script du site, si bien qu’il s’agit ici d’une question plutôt que d’un verdict.',

  flag_cookie_no_samesite: 'Un cookie ne déclare pas de politique SameSite',
  fd_cookie_no_samesite: 'Les navigateurs appliquent désormais Lax par défaut, ce qui n’est pas la même chose que de le déclarer — et un cookie qui a réellement besoin de None doit le dire explicitement, sinon il cesse de fonctionner.',

  flag_cookie_samesite_none_without_secure: 'SameSite=None sans Secure',
  fd_cookie_samesite_none_without_secure: 'Tout navigateur actuel rejette cette combinaison d’emblée : le cookie n’est donc pas posé du tout. Cela se manifeste en général par une connexion qui, sans un mot, ne marche pas.',

  flag_cookie_prefix_violated: 'Un préfixe de cookie est employé sans en respecter les conditions',
  fd_cookie_prefix_violated: '__Host- exige Secure, aucun Domain et Path=/ ; __Secure- exige Secure. Un navigateur refuse le cookie qui enfreint la règle : pour les visiteurs, ce cookie n’existe tout simplement pas.',

  flag_cookie_very_long_lived: 'Un cookie vit plus d’un an',
  fd_cookie_very_long_lived: 'Un cookie de longue durée est un identifiant de longue durée, s’il désigne quelqu’un.',

  flag_cookie_no_prefixes: 'Aucun cookie n’utilise __Host- ni __Secure-',
  fd_cookie_no_prefixes: 'Les préfixes sont la seule protection de cookie que les navigateurs imposent au lieu de simplement la respecter : __Host- rend impossible l’écrasement du cookie par un sous-domaine, ce que Secure et HttpOnly réunis ne peuvent pas faire.',

  flag_no_clickjacking_protection: 'Rien n’empêche le site d’être encadré',
  fd_no_clickjacking_protection: 'Ni X-Frame-Options ni directive frame-ancestors. La page peut être chargée de façon invisible à l’intérieur d’un autre site et y recevoir des clics.',

  flag_framing_headers_disagree: 'Les deux en-têtes d’encadrement disent des choses différentes',
  fd_framing_headers_disagree: 'X-Frame-Options et frame-ancestors ne concordent pas. Les navigateurs préfèrent frame-ancestors : l’en-tête qui paraît le plus strict n’est peut-être pas celui qui s’applique.',

  flag_x_frame_options_allow_from: 'X-Frame-Options utilise ALLOW-FROM',
  fd_x_frame_options_allow_from: 'ALLOW-FROM n’a jamais été implémenté dans Chrome et a été retiré de Firefox : en pratique, il ne protège de rien. frame-ancestors le remplace.',

  flag_no_nosniff: 'Pas de X-Content-Type-Options',
  fd_no_nosniff: 'Sans nosniff, un navigateur peut deviner qu’une réponse est du script alors qu’elle a été servie comme autre chose — ce qui transforme un point de téléversement en hébergeur de scripts.',

  flag_nosniff_malformed: 'X-Content-Type-Options a une valeur inattendue',
  fd_nosniff_malformed: 'La seule valeur sur laquelle les navigateurs agissent est « nosniff ». Toute autre est ignorée.',

  flag_no_referrer_policy: 'Pas de Referrer-Policy',
  fd_no_referrer_policy: 'Les navigateurs appliquent strict-origin-when-cross-origin par défaut, ce qui est raisonnable — le déclarer supprime la dépendance à ce défaut.',

  flag_referrer_policy_leaky: 'La politique de référent envoie plus que nécessaire',
  fd_referrer_policy_leaky: 'L’URL complète, y compris tout identifiant dans le chemin ou la requête, est envoyée à d’autres sites. unsafe-url est le pire de ces cas.',

  flag_no_permissions_policy: 'Pas de Permissions-Policy',
  fd_no_permissions_policy: 'Caméra, micro, géolocalisation et le reste restent disponibles pour la page et pour tout ce qu’elle intègre. Refuser ce qu’on n’utilise pas tient en un seul en-tête.',

  flag_feature_policy_superseded: 'Feature-Policy est définie sans Permissions-Policy',
  fd_feature_policy_superseded: 'Feature-Policy a été renommée. Les navigateurs actuels ne lisent que Permissions-Policy.',

  flag_no_coop: 'Pas de Cross-Origin-Opener-Policy',
  fd_no_coop: 'COOP coupe la référence de fenêtre entre la page et ce qu’elle ouvre, ce qui referme toute une famille d’attaques entre fenêtres et conditionne l’isolement inter-origines.',

  flag_no_corp: 'Pas de Cross-Origin-Resource-Policy',
  fd_no_corp: 'CORP permet à une réponse de refuser d’être intégrée par d’autres sites. C’est plus utile sur des ressources que sur des documents.',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection est toujours définie',
  fd_obsolete_x_xss_protection: 'L’auditeur qu’elle pilotait a été retiré des navigateurs il y a des années — et tant qu’il a existé, il a introduit ses propres vulnérabilités. L’en-tête ne fait plus rien.',

  flag_obsolete_expect_ct: 'Expect-CT est toujours définie',
  fd_obsolete_expect_ct: 'Retirée en 2021 : la transparence des certificats est désormais exigée pour tous les certificats, il ne reste donc rien à exiger à cet en-tête.',

  flag_obsolete_p3p: 'P3P est toujours définie',
  fd_obsolete_p3p: 'Un langage de politique de confidentialité de 2002 que seul Internet Explorer lisait. Plus rien ne le regarde depuis une décennie.',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP est toujours définie',
  fd_obsolete_x_webkit_csp: 'Un en-tête CSP préfixé, antérieur à la stabilisation de la norme. Aucun navigateur actuel ne le lit.',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy est toujours définie',
  fd_obsolete_x_content_security_policy: 'L’ancien préfixe de Firefox, obsolète depuis Firefox 23.',

  flag_version_in_headers: 'Les en-têtes nomment le logiciel et sa version',
  fd_version_in_headers: 'Le cacher n’arrête personne de déterminé, et cela donne bel et bien à un scanner un filtre pour repérer les hôtes dont la version a une faille connue. Retirer l’en-tête ne coûte rien.',

  flag_duplicate_security_header: 'Un en-tête de sécurité est envoyé plus d’une fois',
  fd_duplicate_security_header: 'Les navigateurs ne s’accordent pas sur la copie qui l’emporte, et pour un en-tête de sécurité ce désaccord décide si la politique s’applique. Il s’agit d’ordinaire de deux couches qui ajoutent chacune la sienne.',

  flag_cors_wildcard: 'CORS autorise n’importe quelle origine',
  fd_cors_wildcard: 'Access-Control-Allow-Origin vaut *. Correct pour une API publique, et à regarder deux fois sur tout ce qui répond différemment selon le demandeur.',

  flag_cors_wildcard_with_credentials: 'CORS autorise n’importe quelle origine avec identifiants',
  fd_cors_wildcard_with_credentials: 'Les navigateurs rejettent cette combinaison d’emblée : le point d’accès est donc à la fois cassé et trop permissif. Nommez les origines explicitement.',

  flag_no_http2: 'HTTP/2 n’est pas négocié',
  fd_no_http2: 'Le serveur a choisi HTTP/1.1 alors que les deux lui étaient proposés. HTTP/2 est souvent l’amélioration de performance la moins chère disponible, et elle reste invisible tant que personne ne regarde.',

  flag_no_http3_advertised: 'HTTP/3 n’est pas annoncé',
  fd_no_http3_advertised: 'Aucun en-tête Alt-Svc ne propose h3. Ce n’est pas un défaut — et cela vaut d’être su, puisque HTTP/3 aide surtout sur les réseaux mobiles, les plus difficiles à tester.',

  flag_no_compression: 'La réponse n’est pas compressée',
  fd_no_compression: 'Rien n’a été compressé alors que gzip, br et zstd étaient tous proposés. Sur du HTML, c’est en général une économie importante et gratuite.',

  flag_only_legacy_compression: 'Seul gzip ou deflate est proposé',
  fd_only_legacy_compression: 'Brotli et zstd compressent le texte nettement mieux et sont pris en charge par tous les navigateurs actuels.',

  flag_legacy_tls: 'Une version obsolète de TLS est négociée',
  fd_legacy_tls: 'TLS 1.0 et 1.1 sont obsolètes depuis le RFC 8996 et refusés par les navigateurs actuels.',
};

OWN.de = {
  title: 'Header-Prüfung — CSP, HSTS, Cookies und die Weiterleitungskette',
  title_short: 'Header-Prüfung',
  h1: 'Header-Prüfung',
  subtitle: 'Die Weiterleitungskette von allen vier Einstiegen, die Content-Security-Policy Direktive für Direktive zerlegt, und die tatsächliche Mitgliedschaft in der HSTS-Preload-Liste statt der bloßen Behauptung',
  ph_host: 'example.com',
  hero_label: 'Geprüfte Website',
  empty_hint: 'Geben Sie einen Domainnamen ein. Die Prüfung folgt der Weiterleitungskette von http und https, mit und ohne www, und liest dann die Header der Seite, auf der ein Besucher tatsächlich landet. Die Content-Security-Policy wird Direktive für Direktive zerlegt, denn das ist der Header, den man schwer richtig hinbekommt.',

  stage_resolve: 'Name wird aufgelöst',
  stage_chain: 'Weiterleitungen werden verfolgt',
  stage_headers: 'Header werden gelesen',
  stage_csp: 'Policy wird zerlegt',
  stage_cookies: 'Cookies werden geprüft',
  stage_protocols: 'Protokolle werden ausgehandelt',
  stage_grade: 'Bewertung',

  card_grade: 'Zusammensetzung der Note',
  card_chain: 'Wie Besucher ankommen',
  card_csp: 'Content-Security-Policy',
  card_csp_directives: 'Direktiven',
  card_hsts: 'HSTS',
  card_cookies: 'Cookies',
  card_headers: 'Sicherheits-Header',
  card_protocols: 'Protokolle',
  card_other: 'Weitere Header',

  comp_transport: 'Transport',
  comp_csp: 'Content-Security-Policy',
  comp_headers: 'Weitere Header',

  k_canonical: 'Landet auf',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'http:// mit www',
  k_entry_https_www: 'https:// mit www',
  k_csp_present: 'Policy',
  k_csp_enforced: 'Wird durchgesetzt',
  k_csp_directives: 'Gesetzte Direktiven',
  k_csp_nonce: 'Nutzt Nonces oder Hashes',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'Header',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'preload-Direktive',
  k_hsts_preloaded: 'In der Chromium-Liste',
  k_hsts_eligible: 'Preload-fähig',
  k_cookie_count: 'Gesetzte Cookies',
  k_cookies_secure: 'Alle mit Secure',
  k_cookies_httponly: 'Alle mit HttpOnly',
  k_headers_present: 'Vorhanden',
  k_alpn: 'Ausgehandelt (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 angekündigt',
  k_compression: 'Kompression',
  k_tls_protocol: 'TLS-Version',
  k_requests: 'Gestellte Anfragen',

  th_entry: 'Einstiegspunkt',
  th_step: 'Schritt',
  th_status: 'Code',
  th_url: 'Adresse',
  th_time: 'Zeit',
  th_header: 'Header',
  th_value: 'Wert',
  th_directive: 'Direktive',
  th_sources: 'Quellen',
  th_cookie: 'Cookie',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'Liste nicht mitgeliefert',
  v_seconds_days: '{n} Tage',
  v_hops: '{n} Sprünge',

  note_chain: 'Entscheidend ist der erste Sprung von http:// aus: eine Weiterleitung auf eine weitere unverschlüsselte Adresse schickt die Anfrage samt Cookies über ein ungeschütztes Netz. Leiten Sie zuerst auf HTTPS beim selben Host weiter und erst danach auf den kanonischen Namen.',
  note_csp: 'Eine Policy, die Inline-Skript erlaubt, hält nichts von dem auf, was ein eingeschleustes Skript täte. Nonces und Hashes gibt es genau dafür, dass das nie nötig ist — und eine Policy, die zugleich einen Nonce und unsafe-inline trägt, bedeutet in zwei Browser-Generationen zwei verschiedene Dinge.',
  note_hsts: 'Die preload-Direktive ist ein Antrag, kein Zustand. Eine Website kann sie jahrelang tragen, ohne je eingereicht worden zu sein; gezeigt wird hier deshalb die Mitgliedschaft in der Liste, die Chromium tatsächlich ausliefert.',
  note_cookies: 'Von außen sieht man nur die Cookies, die auf der Landeseite gesetzt werden — nicht ein Sitzungs-Cookie, das nach der Anmeldung ausgestellt wird. Das Präfix __Host- ist der einzige Cookie-Schutz, den ein Browser erzwingt, statt ihn bloß zu respektieren.',
  note_protocols: 'HTTP/2 wird gemessen, indem ein TLS-Handshake geöffnet und beobachtet wird, was der Server wählt. HTTP/3 wird so berichtet, wie es in Alt-Svc angekündigt ist: dieser Prüfer spricht kein QUIC, und ein „nein“ wäre ein erfundenes Ergebnis.',

  err_https_did_not_answer: 'Die Website hat über HTTPS nicht geantwortet.',

  inc_https_did_not_answer: 'die Website hat über HTTPS nicht geantwortet, es gab also keine Header zu lesen',

  cap_https_does_not_work: 'HTTPS funktioniert nicht',
  cap_certificate_not_trusted: 'das Zertifikat validiert nicht',
  cap_certificate_not_trusted_on_alias: 'ein Alias zeigt ein Zertifikat, das ihn nicht abdeckt',
  cap_http_is_served_as_is: 'unverschlüsseltes HTTP wird ausgeliefert statt weiterzuleiten',
  cap_csp_allows_inline_script: 'die Policy erlaubt Inline-Skript',
  cap_csp_allows_any_script: 'die Policy erlaubt Skript von jeder Herkunft',
  cap_csp_does_not_govern_script: 'die Policy regelt Skript überhaupt nicht',
  cap_first_hop_in_the_clear: 'die erste Weiterleitung bleibt unverschlüsselt',
  cap_cookie_rejected_by_browsers: 'ein Cookie, das Browser ablehnen werden',
  cap_cors_misconfigured: 'CORS ist so eingestellt, dass Browser es zurückweisen',
  cap_no_csp: 'keine Content-Security-Policy',
  cap_no_hsts: 'kein HSTS',
  cap_no_framing_protection: 'nichts hindert die Website daran, eingerahmt zu werden',
  cap_csp_not_enforced: 'die Policy meldet nur',
  cap_cookie_without_secure: 'ein Cookie ohne Secure',
  cap_csp_allows_data_urls: 'die Policy erlaubt Skript aus data:',
  cap_obsolete_tls: 'eine veraltete TLS-Version',
  cap_scan_incomplete: 'die Prüfung blieb unvollständig, deshalb wurde keine Note vergeben',

  flag_https_unreachable: 'Die Website antwortet nicht über HTTPS',
  fd_https_unreachable: 'Weder der nackte Name noch www haben auf Port 443 geantwortet. Alles Weitere hängt davon ab, dass es eine Seite gibt, deren Header man lesen kann.',

  flag_redirect_loop: 'Die Weiterleitungen laufen im Kreis',
  fd_redirect_loop: 'Einer der Einstiege schickt Besucher im Kreis herum. Browser geben nach einem Dutzend Sprüngen auf und zeigen einen Fehler.',

  flag_too_many_redirects: 'Eine lange Weiterleitungskette',
  fd_too_many_redirects: 'Mehr Sprünge, als irgendeiner von ihnen braucht. Jeder ist eine Rundreise, bevor die Seite überhaupt zu laden beginnt.',

  flag_http_not_served: 'Unverschlüsseltes HTTP wird gar nicht ausgeliefert',
  fd_http_not_served: 'Port 80 lehnt Verbindungen ab. Eine legitime und leicht unbequeme Entscheidung: wer den nackten Namen eintippt, bekommt einen Verbindungsfehler statt einer Weiterleitung.',

  flag_http_does_not_redirect: 'Unverschlüsseltes HTTP liefert die Website aus, statt weiterzuleiten',
  fd_http_does_not_redirect: 'Die unverschlüsselte Adresse gibt eine Seite zurück, statt Besucher zu HTTPS zu schicken. Alles, was sie senden — und alles, was sie lesen — liegt für das Netz offen.',

  flag_redirect_stays_on_http: 'Die erste Weiterleitung bleibt unverschlüsselt',
  fd_redirect_stays_on_http: 'http:// leitet auf eine weitere http://-Adresse weiter, der Besucher stellt also mindestens zwei unverschlüsselte Anfragen samt angehängter Cookies, bevor er bei HTTPS ankommt. Leiten Sie zuerst auf HTTPS beim selben Host und dann auf den kanonischen Namen: das kostet einen Sprung mehr und schließt die Lücke.',

  flag_redirect_changes_host_and_scheme: 'Die erste Weiterleitung ändert Host und Schema zugleich',
  fd_redirect_changes_host_and_scheme: 'Das Ziel stimmt, und zuerst beim selben Host das Schema zu wechseln, ist gegenüber einer manipulierten Weiterleitung geringfügig sicherer. Eine Kleinigkeit.',

  flag_redirect_not_permanent: 'Die Weiterleitung ist nicht dauerhaft',
  fd_redirect_not_permanent: 'Ein 302 oder 307 sagt dem Browser, er solle sie nicht merken — jeder Besuch wiederholt also den unverschlüsselten Sprung. Verwenden Sie 301 oder 308.',

  flag_certificate_not_trusted: 'Das Zertifikat validiert nicht',
  fd_certificate_not_trusted: 'Das Zertifikat der Adresse, auf der Besucher landen, ist abgelaufen, selbstsigniert oder deckt den Namen nicht ab. Browser zeigen eine bildschirmfüllende Warnung.',

  flag_certificate_not_trusted_on_alias: 'Ein Alias zeigt ein Zertifikat, das ihn nicht abdeckt',
  fd_certificate_not_trusted_on_alias: 'Die kanonische Adresse ist in Ordnung, und ein anderer Name — meist www — wird vom Zertifikat nicht abgedeckt. curl und die Weiterleitung funktionieren weiter, das überlebt also Tests, und nur Browser beschweren sich.',

  flag_www_and_bare_both_serve: 'www und der nackte Name liefern beide die Website aus',
  fd_www_and_bare_both_serve: 'Keiner leitet auf den anderen weiter, dieselben Seiten existieren also unter zwei Adressen. Das teilt Cookies, Caches und eingehende Links.',

  flag_csp_missing: 'Keine Content-Security-Policy',
  fd_csp_missing: 'Nichts beschränkt, woher Skript geladen werden darf oder ob Inline-Skript laufen darf. CSP ist der einzige Header, der den Schaden einer Einschleusung begrenzt, statt sie zu verhindern zu versuchen.',

  flag_csp_report_only: 'Die Policy meldet nur',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only meldet Verstöße und blockiert nichts. So testet man eine Policy richtig — und lässt sie leicht stehen, wenn das Testen vorbei ist.',

  flag_csp_multiple_policies: 'Mehr als eine Policy wird durchgesetzt',
  fd_csp_multiple_policies: 'Jede durchgesetzte Policy zählt, und das Ergebnis ist die Schnittmenge — strenger als jede einzelne. Das ist fast nie die Absicht, wenn die zweite mit einem Plugin hereinkam.',

  flag_csp_no_script_src: 'Die Policy regelt Skript nicht',
  fd_csp_no_script_src: 'Weder script-src noch default-src ist gesetzt, Skript darf also von überall geladen werden. Die Policy kann ein Dutzend weitere Direktiven setzen und trotzdem genau das erlauben, was sie verhindern sollte.',

  flag_csp_unsafe_inline: 'Die Policy erlaubt Inline-Skript',
  fd_csp_unsafe_inline: 'Mit unsafe-inline läuft ein eingeschleustes <script> — genau der Angriff, den CSP aufhalten soll. Nonces und Hashes gibt es genau dafür, dass das nie nötig ist.',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline neben einem Nonce oder Hash',
  fd_csp_unsafe_inline_with_nonce: 'Ein Browser, der Nonces versteht, ignoriert unsafe-inline; einer, der sie nicht versteht, befolgt es. Die Policy bedeutet damit je nach Leser zwei verschiedene Dinge — und die alte Lesart ist die schwache. Sobald die Nonces stehen, nehmen Sie es heraus.',

  flag_csp_unsafe_eval: 'Die Policy erlaubt eval',
  fd_csp_unsafe_eval: 'unsafe-eval öffnet die Codeausführung aus einer Zeichenkette wieder — genau so läuft ein guter Teil des eingeschleusten Skripts. Meist ist es die Forderung eines Frameworks, die einen zweiten Blick verdient.',

  flag_csp_data_in_script_src: 'Die Policy erlaubt Skript aus data:',
  fd_csp_data_in_script_src: 'Eine data:-URL ist Skript, das ein Angreifer bauen kann, ohne irgendwo etwas zu hosten. Dieses Schema in script-src zu erlauben, hebt die Herkunftsliste auf.',

  flag_csp_wildcard_script_src: 'Die Policy erlaubt Skript von jeder Herkunft',
  fd_csp_wildcard_script_src: 'script-src enthält *, https: oder http: und lässt damit jede Herkunft zu. Die Policy ist Dekoration.',

  flag_csp_wildcard_host: 'Die Policy erlaubt einen Host mit Platzhalter',
  fd_csp_wildcard_host: 'Ein Muster wie *.example.com vertraut jeder Subdomain — auch jeder, die verlorengeht oder an Dritte übergeben wird.',

  flag_csp_bypassable_host: 'Die Policy erlaubt ein CDN, das sich gegen sie wenden lässt',
  fd_csp_bypassable_host: 'Manche großen CDNs hosten beliebige Bibliotheken oder bieten JSONP-Endpunkte, die den vom Aufrufer übergebenen Callback-Namen zurückgeben. Eines davon zu erlauben, heißt fast, jedes Skript zu erlauben. strict-dynamic oder das Festnageln konkreter Pfade schließt das.',

  flag_csp_short_nonce: 'Der Nonce ist kurz',
  fd_csp_short_nonce: 'Ein Nonce muss unerratbar sein und für jede Antwort neu erzeugt werden. Ein kurzer wird erraten; ein wiederverwendeter ist schlimmer als gar keiner.',

  flag_csp_unsafe_inline_style: 'Die Policy erlaubt Inline-Stile',
  fd_csp_unsafe_inline_style: 'Weit weniger schwerwiegend als dasselbe beim Skript: es ermöglicht Stil-Angriffe und eine gewisse Datenabschöpfung über Selektoren, keine Codeausführung.',

  flag_csp_object_src_not_none: 'object-src ist nicht none',
  fd_csp_object_src_not_none: '<object> und <embed> führen Plugin-Inhalte aus und sind ein bekannter Umweg um eine Skript-Policy. Fast keine Website braucht sie; object-src \'none\' kostet nichts.',

  flag_csp_no_base_uri: 'Keine base-uri-Direktive',
  fd_csp_no_base_uri: 'Ohne sie schreibt ein eingeschleustes <base>-Tag jede relative URL der Seite um — auch die Skriptquellen, die die Policy so sorgfältig erlaubt hat.',

  flag_csp_no_frame_ancestors: 'Keine frame-ancestors-Direktive',
  fd_csp_no_frame_ancestors: 'frame-ancestors ist der moderne Ersatz für X-Frame-Options und das Einzige, was mehr als eine Herkunft benennen kann.',

  flag_csp_no_form_action: 'Keine form-action-Direktive',
  fd_csp_no_form_action: 'Ohne sie kann ein eingeschleustes Formular Zugangsdaten an eine andere Herkunft schicken.',

  flag_csp_no_reporting: 'Die Policy meldet nirgendwohin',
  fd_csp_no_reporting: 'Ohne report-uri oder report-to sind Verstöße stumm — eine Policy, die die Website stumm kaputtmacht oder stumm verletzt wird, sieht damit genauso aus wie eine, die funktioniert.',

  flag_hsts_missing: 'Kein HSTS-Header',
  fd_hsts_missing: 'Ohne Strict-Transport-Security probiert ein Browser jedes Mal zuerst unverschlüsseltes HTTP, wenn ein Besucher den nackten Namen tippt, und diese Anfrage lässt sich abfangen, bevor er überhaupt eine Weiterleitung sieht.',

  flag_hsts_sent_over_http: 'HSTS wird über unverschlüsseltes HTTP gesendet',
  fd_hsts_sent_over_http: 'RFC 6797 §8.1 hält fest, dass Browser den Header in einer unverschlüsselten Antwort ignorieren. Harmlos — und meist ein Zeichen dafür, dass er im falschen Server-Block gelandet ist.',

  flag_hsts_no_max_age: 'Der HSTS-Header hat kein max-age',
  fd_hsts_no_max_age: 'max-age ist Pflicht. Ohne es tut der Header überhaupt nichts.',

  flag_hsts_max_age_zero: 'HSTS ist mit max-age=0 abgeschaltet',
  fd_hsts_max_age_zero: 'So nimmt man HSTS korrekt zurück — und von außen ist es von einem Versehen nicht zu unterscheiden.',

  flag_hsts_max_age_short: 'Die HSTS-Lebensdauer ist kurz',
  fd_hsts_max_age_short: 'Weniger als ein Jahr. Ein kurzes Fenster ist während der Einführung von HSTS angemessen und bleibt unter dem, was Preload verlangt.',

  flag_hsts_no_subdomains: 'HSTS deckt die Subdomains nicht ab',
  fd_hsts_no_subdomains: 'Ohne includeSubDomains ist eine Subdomain weiterhin über unverschlüsseltes HTTP erreichbar — und von einer Subdomain aus werden Cookies gesetzt.',

  flag_hsts_preload_claimed_not_listed: 'Die preload-Direktive steht da, die Website ist nicht gelistet',
  fd_hsts_preload_claimed_not_listed: 'preload ist ein Aufnahmeantrag, kein Zustand. Diese Website trägt ihn und steht nicht in der Liste, die Chromium ausliefert — meist heißt das, dass niemand sie je eingereicht hat, während alle Beteiligten die Sache für erledigt halten.',

  flag_hsts_listed_without_directive: 'In der Preload-Liste ohne die Direktive',
  fd_hsts_listed_without_directive: 'Die Website ist vorgeladen und bittet nicht mehr darum. Genau so fällt eine Website beim nächsten Listen-Update wieder heraus.',

  flag_hsts_preload_not_eligible: 'Der Header erfüllt die Preload-Anforderungen nicht',
  fd_hsts_preload_not_eligible: 'Preload verlangt ein max-age von mindestens einem Jahr plus includeSubDomains, zusätzlich zur preload-Direktive selbst.',

  flag_hsts_preload_list_not_bundled: 'Die Preload-Liste liegt dieser Installation nicht bei',
  fd_hsts_preload_list_not_bundled: 'Die Mitgliedschaft konnte nicht geprüft werden und wird deshalb als unbekannt gemeldet statt geraten. Führen Sie npm run preload:fetch aus, um sie zu ergänzen.',

  flag_cookie_not_secure: 'Ein Cookie wird ohne Secure gesetzt',
  fd_cookie_not_secure: 'Ohne Secure wird das Cookie auch an unverschlüsselte HTTP-Anfragen angehängt — so überlebt eine Sitzung „HTTPS überall“ und tritt trotzdem bei der einen Anfrage aus, die dort nicht angekommen ist.',

  flag_cookie_not_httponly: 'Ein Cookie ist für Skript lesbar',
  fd_cookie_not_httponly: 'Ohne HttpOnly kann ein eingeschleustes Skript das Cookie lesen. Manche Cookies liest das eigene Skript der Website absichtlich, das hier ist also eher eine Frage als ein Urteil.',

  flag_cookie_no_samesite: 'Ein Cookie erklärt keine SameSite-Regel',
  fd_cookie_no_samesite: 'Browser setzen inzwischen Lax als Standard, was nicht dasselbe ist, wie es zu erklären — und ein Cookie, das wirklich None braucht, muss es ausdrücklich sagen, sonst hört es auf zu funktionieren.',

  flag_cookie_samesite_none_without_secure: 'SameSite=None ohne Secure',
  fd_cookie_samesite_none_without_secure: 'Jeder aktuelle Browser lehnt diese Kombination rundweg ab, das Cookie wird also gar nicht gesetzt. Meist zeigt sich das als eine Anmeldung, die stillschweigend nicht funktioniert.',

  flag_cookie_prefix_violated: 'Ein Cookie-Präfix wird ohne Erfüllung seiner Bedingungen verwendet',
  fd_cookie_prefix_violated: '__Host- verlangt Secure, kein Domain und Path=/; __Secure- verlangt Secure. Ein Browser weist das Cookie zurück, das die Regel bricht — für Besucher existiert dieses Cookie also schlicht nicht.',

  flag_cookie_very_long_lived: 'Ein Cookie lebt länger als ein Jahr',
  fd_cookie_very_long_lived: 'Ein langlebiges Cookie ist ein langlebiges Zugangsmerkmal, wenn es jemanden identifiziert.',

  flag_cookie_no_prefixes: 'Kein Cookie nutzt __Host- oder __Secure-',
  fd_cookie_no_prefixes: 'Die Präfixe sind der einzige Cookie-Schutz, den Browser erzwingen, statt ihn bloß zu respektieren: __Host- macht es einer Subdomain unmöglich, das Cookie zu überschreiben — was Secure und HttpOnly zusammen nicht leisten.',

  flag_no_clickjacking_protection: 'Nichts hindert die Website daran, eingerahmt zu werden',
  fd_no_clickjacking_protection: 'Weder X-Frame-Options noch eine frame-ancestors-Direktive. Die Seite lässt sich unsichtbar in eine andere Website laden und dort anklicken.',

  flag_framing_headers_disagree: 'Die beiden Rahmen-Header sagen Unterschiedliches',
  fd_framing_headers_disagree: 'X-Frame-Options und frame-ancestors stimmen nicht überein. Browser bevorzugen frame-ancestors, der strenger aussehende Header ist also womöglich nicht der geltende.',

  flag_x_frame_options_allow_from: 'X-Frame-Options nutzt ALLOW-FROM',
  fd_x_frame_options_allow_from: 'ALLOW-FROM wurde in Chrome nie umgesetzt und aus Firefox entfernt, es schützt also praktisch vor nichts. frame-ancestors ist der Ersatz.',

  flag_no_nosniff: 'Kein X-Content-Type-Options',
  fd_no_nosniff: 'Ohne nosniff kann ein Browser raten, eine Antwort sei Skript, obwohl sie als etwas anderes ausgeliefert wurde — womit aus einem Upload-Endpunkt ein Skript-Hoster wird.',

  flag_nosniff_malformed: 'X-Content-Type-Options hat einen unerwarteten Wert',
  fd_nosniff_malformed: 'Der einzige Wert, auf den Browser reagieren, ist „nosniff“. Jeder andere wird ignoriert.',

  flag_no_referrer_policy: 'Keine Referrer-Policy',
  fd_no_referrer_policy: 'Browser verwenden standardmäßig strict-origin-when-cross-origin, was vernünftig ist — es zu erklären, nimmt die Abhängigkeit von diesem Standard.',

  flag_referrer_policy_leaky: 'Die Referrer-Regel sendet mehr als nötig',
  fd_referrer_policy_leaky: 'Die vollständige URL, samt jeder Kennung im Pfad oder in der Abfrage, geht an andere Websites. unsafe-url ist der schlimmste dieser Fälle.',

  flag_no_permissions_policy: 'Keine Permissions-Policy',
  fd_no_permissions_policy: 'Kamera, Mikrofon, Standort und der Rest bleiben für die Seite und alles, was sie einbettet, verfügbar. Zu verweigern, was man nicht nutzt, ist ein einziger Header.',

  flag_feature_policy_superseded: 'Feature-Policy ist gesetzt, Permissions-Policy nicht',
  fd_feature_policy_superseded: 'Feature-Policy wurde umbenannt. Aktuelle Browser lesen nur Permissions-Policy.',

  flag_no_coop: 'Keine Cross-Origin-Opener-Policy',
  fd_no_coop: 'COOP kappt die Fensterreferenz zwischen der Seite und dem, was sie öffnet; das schließt eine ganze Familie von Angriffen zwischen Fenstern und ist Voraussetzung für die herkunftsübergreifende Isolierung.',

  flag_no_corp: 'Keine Cross-Origin-Resource-Policy',
  fd_no_corp: 'CORP erlaubt einer Antwort, sich der Einbettung durch andere Websites zu verweigern. Bei Ressourcen nützlicher als bei Dokumenten.',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection ist noch gesetzt',
  fd_obsolete_x_xss_protection: 'Der Prüfer, den er steuerte, wurde vor Jahren aus den Browsern entfernt — und solange es ihn gab, brachte er eigene Schwachstellen mit. Der Header tut heute nichts mehr.',

  flag_obsolete_expect_ct: 'Expect-CT ist noch gesetzt',
  fd_obsolete_expect_ct: '2021 zurückgezogen: Certificate Transparency wird inzwischen für alle Zertifikate verlangt, dem Header bleibt also nichts mehr zu verlangen.',

  flag_obsolete_p3p: 'P3P ist noch gesetzt',
  fd_obsolete_p3p: 'Eine Datenschutz-Policy-Sprache von 2002, die nur der Internet Explorer las. Seit einem Jahrzehnt schaut nichts mehr darauf.',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP ist noch gesetzt',
  fd_obsolete_x_webkit_csp: 'Ein präfigierter CSP-Header aus der Zeit, bevor der Standard stand. Kein aktueller Browser liest ihn.',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy ist noch gesetzt',
  fd_obsolete_x_content_security_policy: 'Das alte Firefox-Präfix, seit Firefox 23 überholt.',

  flag_version_in_headers: 'Die Header nennen Software und Version',
  fd_version_in_headers: 'Es zu verbergen hält niemanden Entschlossenen auf — es gibt einem Scanner aber sehr wohl ein Filterkriterium für Hosts mit einer Version, die eine bekannte Lücke hat. Den Header zu entfernen kostet nichts.',

  flag_duplicate_security_header: 'Ein Sicherheits-Header wird mehr als einmal gesendet',
  fd_duplicate_security_header: 'Browser sind sich uneins, welche Kopie gewinnt, und bei einem Sicherheits-Header entscheidet diese Uneinigkeit, ob die Policy gilt. Meist sind es zwei Schichten, von denen jede ihre eigene ergänzt.',

  flag_cors_wildcard: 'CORS erlaubt jede Herkunft',
  fd_cors_wildcard: 'Access-Control-Allow-Origin ist *. Für eine öffentliche API richtig — und bei allem, was je nach Fragendem anders antwortet, einen zweiten Blick wert.',

  flag_cors_wildcard_with_credentials: 'CORS erlaubt jede Herkunft mit Zugangsdaten',
  fd_cors_wildcard_with_credentials: 'Browser lehnen diese Kombination rundweg ab, der Endpunkt ist also kaputt und zugleich zu freizügig. Benennen Sie die Herkünfte ausdrücklich.',

  flag_no_http2: 'HTTP/2 wird nicht ausgehandelt',
  fd_no_http2: 'Der Server wählte HTTP/1.1, obwohl ihm beides angeboten wurde. HTTP/2 ist oft die billigste verfügbare Leistungsverbesserung — und unsichtbar, bis jemand nachsieht.',

  flag_no_http3_advertised: 'HTTP/3 wird nicht angekündigt',
  fd_no_http3_advertised: 'Kein Alt-Svc-Header bietet h3 an. Kein Mangel — und wissenswert, denn HTTP/3 hilft vor allem in Mobilfunknetzen, die sich am schwersten testen lassen.',

  flag_no_compression: 'Die Antwort wird nicht komprimiert',
  fd_no_compression: 'Nichts wurde komprimiert, obwohl gzip, br und zstd alle angeboten wurden. Bei HTML ist das meist eine große und kostenlose Ersparnis.',

  flag_only_legacy_compression: 'Nur gzip oder deflate wird angeboten',
  fd_only_legacy_compression: 'Brotli und zstd komprimieren Text spürbar besser und werden von allen aktuellen Browsern unterstützt.',

  flag_legacy_tls: 'Eine veraltete TLS-Version wird ausgehandelt',
  fd_legacy_tls: 'TLS 1.0 und 1.1 sind seit RFC 8996 überholt und werden von aktuellen Browsern abgelehnt.',
};

OWN.uk = {
  title: 'Перевірка заголовків — CSP, HSTS, куки та ланцюжок перенаправлень',
  title_short: 'Перевірка заголовків',
  h1: 'Перевірка заголовків',
  subtitle: 'Ланцюжок перенаправлень з усіх чотирьох входів, політика безпеки вмісту, розібрана директива за директивою, і справжня наявність у списку попереднього завантаження HSTS замість самої лише заявки',
  ph_host: 'example.com',
  hero_label: 'Перевірений сайт',
  empty_hint: 'Введіть доменне ім’я. Перевірка проходить ланцюжком перенаправлень з http і https, з www та без нього, а потім читає заголовки тієї сторінки, на яку відвідувач справді потрапляє. Політику безпеки вмісту розібрано директива за директивою, бо саме цей заголовок важко налаштувати правильно.',

  stage_resolve: 'розв’язуємо ім’я',
  stage_chain: 'йдемо за перенаправленнями',
  stage_headers: 'читаємо заголовки',
  stage_csp: 'розбираємо політику',
  stage_cookies: 'перевіряємо куки',
  stage_protocols: 'узгоджуємо протоколи',
  stage_grade: 'виставляємо оцінку',

  card_grade: 'З чого склалася оцінка',
  card_chain: 'Як приходять відвідувачі',
  card_csp: 'Політика безпеки вмісту',
  card_csp_directives: 'Директиви',
  card_hsts: 'HSTS',
  card_cookies: 'Куки',
  card_headers: 'Заголовки безпеки',
  card_protocols: 'Протоколи',
  card_other: 'Інші заголовки',

  comp_transport: 'Транспорт',
  comp_csp: 'Політика безпеки вмісту',
  comp_headers: 'Інші заголовки',

  k_canonical: 'Зрештою відкривається',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'http:// з www',
  k_entry_https_www: 'https:// з www',
  k_csp_present: 'Політика',
  k_csp_enforced: 'Застосовується',
  k_csp_directives: 'Задані директиви',
  k_csp_nonce: 'Використовує nonce або геші',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'Заголовок',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'Директива preload',
  k_hsts_preloaded: 'У списку Chromium',
  k_hsts_eligible: 'Придатний до preload',
  k_cookie_count: 'Установлено кук',
  k_cookies_secure: 'Усі з Secure',
  k_cookies_httponly: 'Усі з HttpOnly',
  k_headers_present: 'Наявні',
  k_alpn: 'Узгоджено (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 оголошено',
  k_compression: 'Стиснення',
  k_tls_protocol: 'Версія TLS',
  k_requests: 'Зроблено запитів',

  th_entry: 'Точка входу',
  th_step: 'Крок',
  th_status: 'Код',
  th_url: 'Адреса',
  th_time: 'Час',
  th_header: 'Заголовок',
  th_value: 'Значення',
  th_directive: 'Директива',
  th_sources: 'Джерела',
  th_cookie: 'Кука',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'список не вкладено',
  v_seconds_days: '{n} дн.',
  v_hops: '{n} переходів',

  note_chain: 'Важить перший перехід з http://: перенаправлення на ще одну незашифровану адресу відправляє запит разом із куками через незахищену мережу. Перенаправляйте спершу на HTTPS того самого вузла і лише потім на канонічне ім’я.',
  note_csp: 'Політика, яка дозволяє вбудований скрипт, не спиняє нічого з того, що зробив би підкинутий скрипт. Nonce та геші існують саме для того, щоб цього ніколи не потребувалося, — а політика, що несе водночас nonce і unsafe-inline, означає різні речі для двох поколінь браузерів.',
  note_hsts: 'Директива preload — це заявка, а не стан. Сайт може роками її нести, так ніколи й не подавши заявки, тож тут показано наявність у списку, який Chromium справді постачає.',
  note_cookies: 'Ззовні видно лише ті куки, які встановлює сторінка входу, а не сесійну куку, видану після входу в обліковий запис. Префікс __Host- — єдиний захист кук, який браузер саме примушує виконувати, а не просто шанує.',
  note_protocols: 'HTTP/2 вимірюється відкриттям рукостискання TLS і спостереженням за вибором сервера. HTTP/3 звітується так, як його оголошено в Alt-Svc: цей перевіряч не говорить QUIC, і відповідь «ні» була б вигаданим результатом.',

  err_https_did_not_answer: 'Сайт не відповів по HTTPS.',

  inc_https_did_not_answer: 'сайт не відповів по HTTPS, тож заголовків не було що читати',

  cap_https_does_not_work: 'HTTPS не працює',
  cap_certificate_not_trusted: 'сертифікат не проходить перевірку',
  cap_certificate_not_trusted_on_alias: 'псевдонім показує сертифікат, який його не покриває',
  cap_http_is_served_as_is: 'незашифрований HTTP віддається замість перенаправлення',
  cap_csp_allows_inline_script: 'політика дозволяє вбудований скрипт',
  cap_csp_allows_any_script: 'політика дозволяє скрипт із будь-якого джерела',
  cap_csp_does_not_govern_script: 'політика взагалі не керує скриптом',
  cap_first_hop_in_the_clear: 'перше перенаправлення лишається незашифрованим',
  cap_cookie_rejected_by_browsers: 'кука, яку браузери відхилять',
  cap_cors_misconfigured: 'CORS налаштовано так, що браузери це відкидають',
  cap_no_csp: 'немає політики безпеки вмісту',
  cap_no_hsts: 'немає HSTS',
  cap_no_framing_protection: 'ніщо не заважає вбудувати сайт у фрейм',
  cap_csp_not_enforced: 'політика лише звітує',
  cap_cookie_without_secure: 'кука без Secure',
  cap_csp_allows_data_urls: 'політика дозволяє скрипт у data:',
  cap_obsolete_tls: 'застаріла версія TLS',
  cap_scan_incomplete: 'перевірка лишилася неповною, тож оцінки не виставлено',

  flag_https_unreachable: 'Сайт не відповідає по HTTPS',
  fd_https_unreachable: 'Ані голе ім’я, ані www не відповіли на порту 443. Усе подальше залежить від того, чи є сторінка, заголовки якої можна прочитати.',

  flag_redirect_loop: 'Перенаправлення замикаються в кільце',
  fd_redirect_loop: 'Один із входів водить відвідувачів по колу. Браузери здаються після десятка переходів і показують помилку.',

  flag_too_many_redirects: 'Довгий ланцюжок перенаправлень',
  fd_too_many_redirects: 'Переходів більше, ніж потрібно будь-якому з них. Кожен — це похід туди й назад, перш ніж сторінка почне завантажуватись.',

  flag_http_not_served: 'Незашифрований HTTP взагалі не віддається',
  fd_http_not_served: 'Порт 80 відхиляє з’єднання. Законний і трохи незручний вибір: той, хто набере голе ім’я, отримає помилку з’єднання замість перенаправлення.',

  flag_http_does_not_redirect: 'Незашифрований HTTP віддає сайт замість перенаправлення',
  fd_http_does_not_redirect: 'Незашифрована адреса повертає сторінку замість того, щоб відправити відвідувачів на HTTPS. Усе, що вони надішлють, — і все, що прочитають, — відкрите для мережі.',

  flag_redirect_stays_on_http: 'Перше перенаправлення лишається на незашифрованому HTTP',
  fd_redirect_stays_on_http: 'http:// перенаправляє на ще одну адресу http://, тож відвідувач робить щонайменше два незашифровані запити з прикріпленими куками, перш ніж дістатися HTTPS. Перенаправляйте спершу на HTTPS того самого вузла, а тоді на канонічне ім’я: це коштує одного зайвого переходу і закриває цю прогалину.',

  flag_redirect_changes_host_and_scheme: 'Перше перенаправлення міняє і вузол, і схему одразу',
  fd_redirect_changes_host_and_scheme: 'Місце призначення правильне, а зміна спершу схеми на тому самому вузлі трохи стійкіша до підміненого перенаправлення. Дрібниця.',

  flag_redirect_not_permanent: 'Перенаправлення не постійне',
  fd_redirect_not_permanent: '302 або 307 каже браузеру не запам’ятовувати його, тож кожен візит повторює незашифрований перехід. Використовуйте 301 або 308.',

  flag_certificate_not_trusted: 'Сертифікат не проходить перевірку',
  fd_certificate_not_trusted: 'Сертифікат адреси, на яку потрапляють відвідувачі, прострочений, самопідписаний або не покриває це ім’я. Браузери показують попередження на весь екран.',

  flag_certificate_not_trusted_on_alias: 'Псевдонім показує сертифікат, який його не покриває',
  fd_certificate_not_trusted_on_alias: 'Канонічна адреса гаразд, а інше ім’я — зазвичай www — сертифікатом не покрите. curl і перенаправлення й далі працюють, тож це переживає перевірки, і скаржаться лише браузери.',

  flag_www_and_bare_both_serve: 'І www, і голе ім’я віддають сайт',
  fd_www_and_bare_both_serve: 'Жодне не перенаправляє на інше, тож ті самі сторінки існують за двома адресами. Це ділить навпіл куки, кеші та вхідні посилання.',

  flag_csp_missing: 'Немає політики безпеки вмісту',
  fd_csp_missing: 'Ніщо не обмежує, звідки можна завантажувати скрипт і чи може виконуватися вбудований скрипт. CSP — єдиний заголовок, який обмежує шкоду від впровадження, а не намагається його не допустити.',

  flag_csp_report_only: 'Політика лише звітує',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only повідомляє про порушення й нічого не блокує. Так політику правильно випробовувати — і легко лишити після того, як випробування скінчились.',

  flag_csp_multiple_policies: 'Застосовується більш ніж одна політика',
  fd_csp_multiple_policies: 'Кожна застосована політика має силу, а результат — їх перетин, суворіший за будь-яку з них. Це майже ніколи не задум, коли друга прийшла разом із плагіном.',

  flag_csp_no_script_src: 'Політика не керує скриптом',
  fd_csp_no_script_src: 'Не задано ані script-src, ані default-src, тож скрипт можна завантажити звідки завгодно. Політика може задавати ще десяток директив і все одно дозволяти саме те, що мала спинити.',

  flag_csp_unsafe_inline: 'Політика дозволяє вбудований скрипт',
  fd_csp_unsafe_inline: 'З unsafe-inline підкинутий <script> виконується — саме та атака, заради спинення якої CSP і існує. Nonce та геші існують саме для того, щоб цього ніколи не потребувалося.',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline поряд із nonce або гешем',
  fd_csp_unsafe_inline_with_nonce: 'Браузер, який розуміє nonce, ігнорує unsafe-inline; той, що не розуміє, кориться йому. Тож політика означає різні речі залежно від того, хто читає, — і стародавнє прочитання слабке. Коли nonce уже на місці, приберіть його.',

  flag_csp_unsafe_eval: 'Політика дозволяє eval',
  fd_csp_unsafe_eval: 'unsafe-eval знову відкриває виконання коду з рядка — саме так і працює чимала частина підкинутого скрипту. Зазвичай це вимога якогось фреймворку, до якої варто повернутися.',

  flag_csp_data_in_script_src: 'Політика дозволяє скрипт у data:',
  fd_csp_data_in_script_src: 'URL data: — це скрипт, який нападник може скласти, не розміщуючи нічого ніде. Дозвіл цієї схеми в script-src зводить нанівець перелік джерел.',

  flag_csp_wildcard_script_src: 'Політика дозволяє скрипт із будь-якого джерела',
  fd_csp_wildcard_script_src: 'script-src містить *, https: або http:, що допускає будь-яке джерело. Політика декоративна.',

  flag_csp_wildcard_host: 'Політика дозволяє вузол із символом підстановки',
  fd_csp_wildcard_host: 'Шаблон на кшталт *.example.com довіряє кожному піддомену, зокрема будь-якому втраченому чи відданому третій стороні.',

  flag_csp_bypassable_host: 'Політика дозволяє CDN, який можна обернути проти неї',
  fd_csp_bypassable_host: 'Деякі великі CDN розміщують довільні бібліотеки або надають точки JSONP, що повертають передане викликачем ім’я зворотного виклику. Дозволити одну з них — це майже дозволити будь-який скрипт. strict-dynamic або закріплення конкретних шляхів це закриває.',

  flag_csp_short_nonce: 'Nonce короткий',
  fd_csp_short_nonce: 'Nonce має бути неможливим для вгадування і створюватися заново для кожної відповіді. Короткий вгадують; повторно вжитий гірший за жоден.',

  flag_csp_unsafe_inline_style: 'Політика дозволяє вбудовані стилі',
  fd_csp_unsafe_inline_style: 'Значно менш поважно, ніж те саме для скрипту: це відкриває атаки через стилі та певне витягання даних селекторами, але не виконання коду.',

  flag_csp_object_src_not_none: 'object-src не none',
  fd_csp_object_src_not_none: '<object> та <embed> виконують вміст плагінів і є добре відомим обходом політики щодо скрипту. Майже жодному сайту вони не потрібні; object-src \'none\' нічого не коштує.',

  flag_csp_no_base_uri: 'Немає директиви base-uri',
  fd_csp_no_base_uri: 'Без неї підкинутий тег <base> переписує кожну відносну адресу на сторінці — зокрема й джерела скриптів, які політика так дбайливо дозволила.',

  flag_csp_no_frame_ancestors: 'Немає директиви frame-ancestors',
  fd_csp_no_frame_ancestors: 'frame-ancestors — сучасна заміна X-Frame-Options і єдине, що може назвати більш ніж одне джерело.',

  flag_csp_no_form_action: 'Немає директиви form-action',
  fd_csp_no_form_action: 'Без неї підкинута форма може надіслати облікові дані до іншого джерела.',

  flag_csp_no_reporting: 'Політика нікуди не звітує',
  fd_csp_no_reporting: 'Без report-uri чи report-to порушення мовчазні — тож політика, що мовчки ламає сайт або яку мовчки порушують, виглядає точнісінько як та, що працює.',

  flag_hsts_missing: 'Немає заголовка HSTS',
  fd_hsts_missing: 'Без Strict-Transport-Security браузер щоразу спершу спробує незашифрований HTTP, коли відвідувач набере голе ім’я, і цей запит можна перехопити ще до того, як він побачить бодай якесь перенаправлення.',

  flag_hsts_sent_over_http: 'HSTS надсилається незашифрованим HTTP',
  fd_hsts_sent_over_http: 'RFC 6797 §8.1 каже, що браузери ігнорують цей заголовок у незашифрованій відповіді. Це нешкідливо і зазвичай означає, що його додали не до того блока сервера.',

  flag_hsts_no_max_age: 'У заголовку HSTS немає max-age',
  fd_hsts_no_max_age: 'max-age обов’язковий. Без нього заголовок не робить геть нічого.',

  flag_hsts_max_age_zero: 'HSTS вимкнено через max-age=0',
  fd_hsts_max_age_zero: 'Саме так HSTS правильно згортають, і ззовні це не відрізнити від помилки.',

  flag_hsts_max_age_short: 'Час життя HSTS короткий',
  fd_hsts_max_age_short: 'Менше року. Коротке вікно доречне, поки HSTS розгортають, і воно нижче за те, чого вимагає preload.',

  flag_hsts_no_subdomains: 'HSTS не покриває піддомени',
  fd_hsts_no_subdomains: 'Без includeSubDomains до піддомену досі можна дістатися незашифрованим HTTP — а куки встановлюють саме з піддомену.',

  flag_hsts_preload_claimed_not_listed: 'Директива preload є, а сайту в списку немає',
  fd_hsts_preload_claimed_not_listed: 'preload — це заявка на внесення, а не стан. Цей сайт її несе і не з’являється у списку, який постачає Chromium: зазвичай це означає, що заявки так ніхто й не подав, — тим часом як усі причетні вважають справу зробленою.',

  flag_hsts_listed_without_directive: 'У списку preload без директиви',
  fd_hsts_listed_without_directive: 'Сайт попередньо завантажено, і він уже про це не просить. Саме так сайт випадає зі списку при наступному оновленні.',

  flag_hsts_preload_not_eligible: 'Заголовок не відповідає вимогам preload',
  fd_hsts_preload_not_eligible: 'Попереднє завантаження вимагає max-age щонайменше на рік плюс includeSubDomains, на додачу до самої директиви preload.',

  flag_hsts_preload_list_not_bundled: 'Список preload не постачається з цією збіркою',
  fd_hsts_preload_list_not_bundled: 'Наявність у списку перевірити не вдалося, тож її подано як невідому, а не вгадану. Виконайте npm run preload:fetch, щоб її додати.',

  flag_cookie_not_secure: 'Куку встановлено без Secure',
  fd_cookie_not_secure: 'Без Secure куку прикріплюють і до незашифрованих запитів HTTP — саме так сесія переживає «HTTPS усюди» і все одно витікає в тому єдиному запиті, що туди не дістався.',

  flag_cookie_not_httponly: 'Куку може прочитати скрипт',
  fd_cookie_not_httponly: 'Без HttpOnly підкинутий скрипт може прочитати куку. Деякі куки навмисне читає власний скрипт сайту, тож це радше питання, ніж вирок.',

  flag_cookie_no_samesite: 'Кука не оголошує політики SameSite',
  fd_cookie_no_samesite: 'Браузери тепер типово беруть Lax, що не те саме, що оголосити це, — а кука, якій справді потрібне None, мусить сказати це явно, інакше перестане працювати.',

  flag_cookie_samesite_none_without_secure: 'SameSite=None без Secure',
  fd_cookie_samesite_none_without_secure: 'Кожен сучасний браузер відхиляє це поєднання відразу, тож куку не встановлено взагалі. Зазвичай це виглядає як вхід, який мовчки не працює.',

  flag_cookie_prefix_violated: 'Префікс куки вжито без виконання його умов',
  fd_cookie_prefix_violated: '__Host- вимагає Secure, жодного Domain і Path=/; __Secure- вимагає Secure. Браузер відхиляє куку, що порушує правило, тож для відвідувачів такої куки просто не існує.',

  flag_cookie_very_long_lived: 'Кука живе понад рік',
  fd_cookie_very_long_lived: 'Довговічна кука — це довговічні облікові дані, якщо вона когось ідентифікує.',

  flag_cookie_no_prefixes: 'Жодна кука не вживає __Host- чи __Secure-',
  fd_cookie_no_prefixes: 'Префікси — єдиний захист кук, який браузери примушують виконувати, а не просто шанують: __Host- унеможливлює перезапис куки з піддомену, чого Secure і HttpOnly разом не досягають.',

  flag_no_clickjacking_protection: 'Ніщо не заважає вбудувати сайт у фрейм',
  fd_no_clickjacking_protection: 'Ані X-Frame-Options, ані директиви frame-ancestors. Сторінку можна невидимо завантажити всередині іншого сайту й ловити на ній кліки.',

  flag_framing_headers_disagree: 'Два заголовки про фрейми кажуть різне',
  fd_framing_headers_disagree: 'X-Frame-Options і frame-ancestors не збігаються. Браузери віддають перевагу frame-ancestors, тож суворіший на вигляд заголовок може виявитися не тим, що діє.',

  flag_x_frame_options_allow_from: 'X-Frame-Options використовує ALLOW-FROM',
  fd_x_frame_options_allow_from: 'ALLOW-FROM ніколи не реалізували в Chrome і прибрали з Firefox, тож на практиці він ні від чого не захищає. Заміна — frame-ancestors.',

  flag_no_nosniff: 'Немає X-Content-Type-Options',
  fd_no_nosniff: 'Без nosniff браузер може вгадати, що відповідь — це скрипт, хоч її віддали як щось інше, і тоді точка завантаження файлів стає майданчиком для скриптів.',

  flag_nosniff_malformed: 'X-Content-Type-Options має несподіване значення',
  fd_nosniff_malformed: 'Єдине значення, на яке браузери зважають, — «nosniff». Будь-яке інше ігнорують.',

  flag_no_referrer_policy: 'Немає Referrer-Policy',
  fd_no_referrer_policy: 'Браузери типово беруть strict-origin-when-cross-origin, що розумно, — оголошення цього знімає залежність від такого типового значення.',

  flag_referrer_policy_leaky: 'Політика реферера надсилає більше, ніж треба',
  fd_referrer_policy_leaky: 'Повну адресу, разом із будь-яким ідентифікатором у шляху чи запиті, надсилають іншим сайтам. unsafe-url — найгірший із таких випадків.',

  flag_no_permissions_policy: 'Немає Permissions-Policy',
  fd_no_permissions_policy: 'Камера, мікрофон, геолокація і решта лишаються доступними сторінці й усьому, що вона вбудовує. Заборонити те, чим не користуються, — це один заголовок.',

  flag_feature_policy_superseded: 'Feature-Policy задано без Permissions-Policy',
  fd_feature_policy_superseded: 'Feature-Policy перейменували. Сучасні браузери читають лише Permissions-Policy.',

  flag_no_coop: 'Немає Cross-Origin-Opener-Policy',
  fd_no_coop: 'COOP розриває віконне посилання між сторінкою й тим, що вона відкриває; це закриває цілу родину атак між вікнами і є передумовою міжджерельної ізоляції.',

  flag_no_corp: 'Немає Cross-Origin-Resource-Policy',
  fd_no_corp: 'CORP дозволяє відповіді відмовитися бути вбудованою іншими сайтами. На ресурсах корисніша, ніж на документах.',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection досі задано',
  fd_obsolete_x_xss_protection: 'Аудитор, яким він керував, багато років тому прибрали з браузерів — а поки він існував, приносив власні вразливості. Тепер цей заголовок не робить нічого.',

  flag_obsolete_expect_ct: 'Expect-CT досі задано',
  fd_obsolete_expect_ct: 'Скасовано 2021 року: прозорість сертифікатів тепер вимагається від усіх сертифікатів, тож заголовку вже нема чого вимагати.',

  flag_obsolete_p3p: 'P3P досі задано',
  fd_obsolete_p3p: 'Мова політик приватності 2002 року, яку читав лише Internet Explorer. Уже десятиліття ніщо на неї не дивиться.',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP досі задано',
  fd_obsolete_x_webkit_csp: 'Заголовок CSP із префіксом, з часів, коли стандарт ще не усталився. Жоден сучасний браузер його не читає.',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy досі задано',
  fd_obsolete_x_content_security_policy: 'Старий префікс Firefox, застарілий від Firefox 23.',

  flag_version_in_headers: 'Заголовки називають програму та версію',
  fd_version_in_headers: 'Приховування нікого рішучого не спинить, зате справді дає сканеру ознаку для добору вузлів із версією, у якій є відома вада. Прибрати заголовок нічого не коштує.',

  flag_duplicate_security_header: 'Заголовок безпеки надсилається більш ніж один раз',
  fd_duplicate_security_header: 'Браузери не згодні між собою, яка копія перемагає, а для заголовка безпеки ця незгода вирішує, чи діє політика. Зазвичай це два шари, кожен із яких додає свій.',

  flag_cors_wildcard: 'CORS дозволяє будь-яке джерело',
  fd_cors_wildcard: 'Access-Control-Allow-Origin дорівнює *. Для відкритого API це правильно, а для всього, що відповідає по-різному залежно від того, хто питає, варте другого погляду.',

  flag_cors_wildcard_with_credentials: 'CORS дозволяє будь-яке джерело з обліковими даними',
  fd_cors_wildcard_with_credentials: 'Браузери відхиляють це поєднання відразу, тож точка доступу і зламана, і надто дозвільна. Назвіть джерела явно.',

  flag_no_http2: 'HTTP/2 не узгоджується',
  fd_no_http2: 'Сервер обрав HTTP/1.1, хоча йому запропонували обидва. HTTP/2 часто є найдешевшим доступним поліпшенням швидкодії — і воно невидиме, поки хтось не подивиться.',

  flag_no_http3_advertised: 'HTTP/3 не оголошено',
  fd_no_http3_advertised: 'Немає заголовка Alt-Svc, який пропонував би h3. Це не вада — і про це варто знати, адже HTTP/3 допомагає передусім у мобільних мережах, які найважче випробувати.',

  flag_no_compression: 'Відповідь не стискається',
  fd_no_compression: 'Нічого не стиснуто, хоча запропоновано і gzip, і br, і zstd. На HTML це зазвичай велика й безкоштовна економія.',

  flag_only_legacy_compression: 'Пропонується лише gzip або deflate',
  fd_only_legacy_compression: 'Brotli та zstd стискають текст помітно краще й підтримуються всіма сучасними браузерами.',

  flag_legacy_tls: 'Узгоджується застаріла версія TLS',
  fd_legacy_tls: 'TLS 1.0 і 1.1 застаріли згідно з RFC 8996, і сучасні браузери їх відхиляють.',
};

OWN.tr = {
  title: 'Başlık denetimi — CSP, HSTS, çerezler ve yönlendirme zinciri',
  title_short: 'Başlık denetimi',
  h1: 'Başlık denetimi',
  subtitle: 'Dört girişin tümünden yönlendirme zinciri, içerik güvenliği politikasının direktif direktif sökülmesi ve HSTS ön yükleme listesinde iddia değil gerçek üyelik',
  ph_host: 'example.com',
  hero_label: 'Denetlenen site',
  empty_hint: 'Bir alan adı girin. Denetim, http ve https’ten, www’li ve www’siz olarak yönlendirme zincirini izler, sonra ziyaretçinin gerçekten indiği sayfanın başlıklarını okur. İçerik güvenliği politikası direktif direktif sökülür, çünkü doğru kurulması zor olan başlık odur.',

  stage_resolve: 'ad çözümleniyor',
  stage_chain: 'yönlendirmeler izleniyor',
  stage_headers: 'başlıklar okunuyor',
  stage_csp: 'politika sökülüyor',
  stage_cookies: 'çerezler denetleniyor',
  stage_protocols: 'protokoller uzlaşılıyor',
  stage_grade: 'not veriliyor',

  card_grade: 'Notun dağılımı',
  card_chain: 'Ziyaretçiler nasıl geliyor',
  card_csp: 'İçerik güvenliği politikası',
  card_csp_directives: 'Direktifler',
  card_hsts: 'HSTS',
  card_cookies: 'Çerezler',
  card_headers: 'Güvenlik başlıkları',
  card_protocols: 'Protokoller',
  card_other: 'Diğer başlıklar',

  comp_transport: 'Taşıma',
  comp_csp: 'İçerik güvenliği politikası',
  comp_headers: 'Diğer başlıklar',

  k_canonical: 'Sonunda açılan',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'www ile http://',
  k_entry_https_www: 'www ile https://',
  k_csp_present: 'Politika',
  k_csp_enforced: 'Uygulanıyor',
  k_csp_directives: 'Tanımlı direktifler',
  k_csp_nonce: 'Nonce veya özet kullanıyor',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'Başlık',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'preload direktifi',
  k_hsts_preloaded: 'Chromium listesinde',
  k_hsts_eligible: 'Ön yüklemeye uygun',
  k_cookie_count: 'Kurulan çerez',
  k_cookies_secure: 'Hepsi Secure',
  k_cookies_httponly: 'Hepsi HttpOnly',
  k_headers_present: 'Mevcut',
  k_alpn: 'Uzlaşılan (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 duyuruluyor',
  k_compression: 'Sıkıştırma',
  k_tls_protocol: 'TLS sürümü',
  k_requests: 'Yapılan istek',

  th_entry: 'Giriş noktası',
  th_step: 'Adım',
  th_status: 'Kod',
  th_url: 'Adres',
  th_time: 'Süre',
  th_header: 'Başlık',
  th_value: 'Değer',
  th_directive: 'Direktif',
  th_sources: 'Kaynaklar',
  th_cookie: 'Çerez',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'liste birlikte gelmiyor',
  v_seconds_days: '{n} gün',
  v_hops: '{n} sıçrama',

  note_chain: 'Önemli olan http://’den atılan ilk adımdır: bir başka şifresiz adrese yönlendirme, isteği çerezleriyle birlikte korumasız bir ağdan geçirir. Önce aynı sunucuda HTTPS’e, ancak ondan sonra kanonik ada yönlendirin.',
  note_csp: 'Satır içi betiğe izin veren bir politika, enjekte edilmiş bir betiğin yapacağı hiçbir şeyi durdurmaz. Nonce ve özetler tam da buna hiç gerek kalmasın diye vardır — hem nonce hem unsafe-inline taşıyan bir politika ise iki tarayıcı kuşağında iki ayrı anlama gelir.',
  note_hsts: 'preload direktifi bir başvurudur, bir durum değil. Bir site onu yıllarca taşıyıp hiç başvurmamış olabilir; burada gösterilen, Chromium’un gerçekten dağıttığı listedeki üyeliktir.',
  note_cookies: 'Dışarıdan yalnızca iniş sayfasında kurulan çerezler görülür; oturum açtıktan sonra verilen bir oturum çerezi görülmez. __Host- öneki, bir tarayıcının yalnızca saygı göstermek yerine zorunlu kıldığı tek çerez korumasıdır.',
  note_protocols: 'HTTP/2, bir TLS el sıkışması açılıp sunucunun ne seçtiğine bakılarak ölçülür. HTTP/3 ise Alt-Svc’de duyurulduğu biçimde bildirilir: bu denetleyici QUIC konuşmaz ve “hayır” demek uydurma bir sonuç olurdu.',

  err_https_did_not_answer: 'Site HTTPS üzerinden yanıt vermedi.',

  inc_https_did_not_answer: 'site HTTPS üzerinden yanıt vermedi, dolayısıyla okunacak başlık yoktu',

  cap_https_does_not_work: 'HTTPS çalışmıyor',
  cap_certificate_not_trusted: 'sertifika doğrulanmıyor',
  cap_certificate_not_trusted_on_alias: 'bir takma ad, kendisini kapsamayan bir sertifika sunuyor',
  cap_http_is_served_as_is: 'yönlendirmek yerine şifresiz HTTP sunuluyor',
  cap_csp_allows_inline_script: 'politika satır içi betiğe izin veriyor',
  cap_csp_allows_any_script: 'politika her kaynaktan betiğe izin veriyor',
  cap_csp_does_not_govern_script: 'politika betiği hiç yönetmiyor',
  cap_first_hop_in_the_clear: 'ilk yönlendirme şifresiz kalıyor',
  cap_cookie_rejected_by_browsers: 'tarayıcıların reddedeceği bir çerez',
  cap_cors_misconfigured: 'CORS, tarayıcıların reddettiği biçimde ayarlanmış',
  cap_no_csp: 'içerik güvenliği politikası yok',
  cap_no_hsts: 'HSTS yok',
  cap_no_framing_protection: 'sitenin çerçeveye alınmasını engelleyen bir şey yok',
  cap_csp_not_enforced: 'politika yalnızca rapor ediyor',
  cap_cookie_without_secure: 'Secure’suz bir çerez',
  cap_csp_allows_data_urls: 'politika data: içinde betiğe izin veriyor',
  cap_obsolete_tls: 'eskimiş bir TLS sürümü',
  cap_scan_incomplete: 'denetim eksik kaldı, bu yüzden not verilmedi',

  flag_https_unreachable: 'Site HTTPS üzerinden yanıt vermiyor',
  fd_https_unreachable: 'Ne çıplak ad ne de www 443 numaralı kapıda yanıt verdi. Bundan sonraki her şey, başlıkları okunacak bir sayfanın varlığına bağlı.',

  flag_redirect_loop: 'Yönlendirmeler döngüye giriyor',
  fd_redirect_loop: 'Girişlerden biri ziyaretçileri daire çizdiriyor. Tarayıcılar bir düzine sıçramadan sonra vazgeçip hata gösterir.',

  flag_too_many_redirects: 'Uzun bir yönlendirme zinciri',
  fd_too_many_redirects: 'Hiçbirinin ihtiyaç duymadığı kadar çok sıçrama. Her biri, sayfa yüklenmeye başlamadan önce bir gidiş dönüş demek.',

  flag_http_not_served: 'Şifresiz HTTP hiç sunulmuyor',
  fd_http_not_served: '80 numaralı kapı bağlantıları reddediyor. Meşru ve biraz da rahatsız edici bir tercih: çıplak adı yazan kişi yönlendirme yerine bağlantı hatası alır.',

  flag_http_does_not_redirect: 'Şifresiz HTTP, yönlendirmek yerine siteyi sunuyor',
  fd_http_does_not_redirect: 'Şifresiz adres, ziyaretçileri HTTPS’e göndermek yerine bir sayfa döndürüyor. Gönderdikleri her şey — ve okudukları her şey — ağa açık.',

  flag_redirect_stays_on_http: 'İlk yönlendirme şifresiz HTTP’de kalıyor',
  fd_redirect_stays_on_http: 'http:// bir başka http:// adresine yönlendiriyor; ziyaretçi HTTPS’e varmadan önce çerezleri iliştirilmiş en az iki şifresiz istek yapıyor. Önce aynı sunucuda HTTPS’e, sonra kanonik ada yönlendirin: bir sıçrama daha eder ve açığı kapatır.',

  flag_redirect_changes_host_and_scheme: 'İlk yönlendirme sunucu ile şemayı aynı anda değiştiriyor',
  fd_redirect_changes_host_and_scheme: 'Varış yeri doğru; şemayı önce aynı sunucuda değiştirmek ise kurcalanmış bir yönlendirmeye karşı az da olsa daha güvenli. Küçük bir ayrıntı.',

  flag_redirect_not_permanent: 'Yönlendirme kalıcı değil',
  fd_redirect_not_permanent: '302 ya da 307, tarayıcıya bunu hatırlamamasını söyler; böylece her ziyaret şifresiz sıçramayı yeniden yapar. 301 veya 308 kullanın.',

  flag_certificate_not_trusted: 'Sertifika doğrulanmıyor',
  fd_certificate_not_trusted: 'Ziyaretçilerin indiği adresin sertifikası süresi dolmuş, kendinden imzalı ya da adı kapsamıyor. Tarayıcılar tam ekran uyarı gösterir.',

  flag_certificate_not_trusted_on_alias: 'Bir takma ad, kendisini kapsamayan bir sertifika sunuyor',
  fd_certificate_not_trusted_on_alias: 'Kanonik adres yolunda ve başka bir ad — çoğunlukla www — sertifikanın kapsamı dışında. curl ve yönlendirme çalışmaya devam ettiği için bu, testlerden sağ çıkar; yalnızca tarayıcılar şikâyet eder.',

  flag_www_and_bare_both_serve: 'www ve çıplak ad ikisi de siteyi sunuyor',
  fd_www_and_bare_both_serve: 'Hiçbiri diğerine yönlendirmiyor, aynı sayfalar iki adreste birden var. Bu, çerezleri, önbellekleri ve gelen bağlantıları ikiye böler.',

  flag_csp_missing: 'İçerik güvenliği politikası yok',
  fd_csp_missing: 'Betiğin nereden yüklenebileceğini ya da satır içi betiğin çalışıp çalışamayacağını sınırlayan hiçbir şey yok. CSP, bir enjeksiyonu önlemeye çalışmak yerine zararını sınırlayan tek başlıktır.',

  flag_csp_report_only: 'Politika yalnızca rapor ediyor',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only ihlalleri bildirir, hiçbir şeyi engellemez. Bir politikayı denemenin doğru yolu budur — ve denemeler bitince orada unutulması kolaydır.',

  flag_csp_multiple_policies: 'Birden fazla politika uygulanıyor',
  fd_csp_multiple_policies: 'Uygulanan her politika geçerlidir ve sonuç, hepsinin kesişimidir — herhangi birinden daha katı. İkincisi bir eklentiyle geldiğinde bu neredeyse hiç amaçlanan şey değildir.',

  flag_csp_no_script_src: 'Politika betiği yönetmiyor',
  fd_csp_no_script_src: 'Ne script-src ne default-src tanımlı; betik her yerden yüklenebilir. Politika bir düzine başka direktif tanımlasa da tam olarak engellemesi gereken şeye izin veriyor olabilir.',

  flag_csp_unsafe_inline: 'Politika satır içi betiğe izin veriyor',
  fd_csp_unsafe_inline: 'unsafe-inline varsa enjekte edilmiş bir <script> çalışır — CSP’nin durdurmak için var olduğu saldırının ta kendisi. Nonce ve özetler tam da buna hiç gerek kalmasın diye vardır.',

  flag_csp_unsafe_inline_with_nonce: 'Bir nonce ya da özetin yanında unsafe-inline',
  fd_csp_unsafe_inline_with_nonce: 'Nonce anlayan bir tarayıcı unsafe-inline’ı yok sayar; anlamayan ona uyar. Böylece politika, okuyana göre iki ayrı anlama gelir — ve eski okuma zayıf olanıdır. Nonce’lar yerleştiğinde onu kaldırın.',

  flag_csp_unsafe_eval: 'Politika eval’a izin veriyor',
  fd_csp_unsafe_eval: 'unsafe-eval, kodun bir metinden çalıştırılmasını yeniden açar; enjekte edilmiş betiğin önemli bir bölümü tam da böyle çalışır. Genellikle yeniden gözden geçirmeye değer bir çatı gereksinimidir.',

  flag_csp_data_in_script_src: 'Politika data: içinde betiğe izin veriyor',
  fd_csp_data_in_script_src: 'Bir data: adresi, saldırganın hiçbir yerde bir şey barındırmadan kurabileceği betiktir. Bu şemaya script-src içinde izin vermek, kaynak listesini geçersiz kılar.',

  flag_csp_wildcard_script_src: 'Politika her kaynaktan betiğe izin veriyor',
  fd_csp_wildcard_script_src: 'script-src içinde *, https: ya da http: var; bu her kaynağı kabul eder. Politika süstür.',

  flag_csp_wildcard_host: 'Politika joker karakterli bir sunucuya izin veriyor',
  fd_csp_wildcard_host: '*.example.com gibi bir kalıp her alt alan adına güvenir — elden çıkan ya da üçüncü bir tarafa devredilen her biri dâhil.',

  flag_csp_bypassable_host: 'Politika, kendisine karşı çevrilebilecek bir CDN’ye izin veriyor',
  fd_csp_bypassable_host: 'Bazı büyük CDN’ler keyfî kitaplıklar barındırır ya da çağıranın verdiği geri çağırma adını döndüren JSONP uç noktaları sunar. Bunlardan birine izin vermek, neredeyse her betiğe izin vermektir. strict-dynamic ya da belirli yolların sabitlenmesi bunu kapatır.',

  flag_csp_short_nonce: 'Nonce kısa',
  fd_csp_short_nonce: 'Bir nonce tahmin edilemez olmalı ve her yanıt için yeniden üretilmelidir. Kısa olan tahmin edilir; yeniden kullanılan ise hiç olmamasından kötüdür.',

  flag_csp_unsafe_inline_style: 'Politika satır içi biçemlere izin veriyor',
  fd_csp_unsafe_inline_style: 'Betikteki aynı durumdan çok daha hafif: biçem yoluyla saldırıları ve seçicilerle bir miktar veri sızdırmayı mümkün kılar, kod çalıştırmayı değil.',

  flag_csp_object_src_not_none: 'object-src none değil',
  fd_csp_object_src_not_none: '<object> ve <embed> eklenti içeriği çalıştırır ve bir betik politikasının iyi bilinen bir dolambacıdır. Neredeyse hiçbir sitenin bunlara ihtiyacı yok; object-src \'none\' bedavadır.',

  flag_csp_no_base_uri: 'base-uri direktifi yok',
  fd_csp_no_base_uri: 'O olmadan, enjekte edilmiş bir <base> etiketi sayfadaki her göreli adresi yeniden yazar — politikanın özenle izin verdiği betik kaynakları dâhil.',

  flag_csp_no_frame_ancestors: 'frame-ancestors direktifi yok',
  fd_csp_no_frame_ancestors: 'frame-ancestors, X-Frame-Options’ın çağdaş yerine geçenidir ve birden fazla kaynağı adlandırabilen tek yoldur.',

  flag_csp_no_form_action: 'form-action direktifi yok',
  fd_csp_no_form_action: 'O olmadan, enjekte edilmiş bir form kimlik bilgilerini başka bir kaynağa gönderebilir.',

  flag_csp_no_reporting: 'Politika hiçbir yere rapor etmiyor',
  fd_csp_no_reporting: 'report-uri ya da report-to olmadan ihlaller sessizdir — böylece siteyi sessizce bozan ya da sessizce ihlal edilen bir politika, işleyen bir politikayla birebir aynı görünür.',

  flag_hsts_missing: 'HSTS başlığı yok',
  fd_hsts_missing: 'Strict-Transport-Security olmadan, bir ziyaretçi çıplak adı her yazdığında tarayıcı önce şifresiz HTTP’yi dener ve bu istek, o daha herhangi bir yönlendirme görmeden araya girilerek yakalanabilir.',

  flag_hsts_sent_over_http: 'HSTS şifresiz HTTP üzerinden gönderiliyor',
  fd_hsts_sent_over_http: 'RFC 6797 §8.1, tarayıcıların bu başlığı şifresiz bir yanıtta yok saydığını söyler. Zararsızdır ve genellikle yanlış sunucu bloğuna eklendiğinin işaretidir.',

  flag_hsts_no_max_age: 'HSTS başlığında max-age yok',
  fd_hsts_no_max_age: 'max-age zorunludur. O olmadan başlık hiçbir şey yapmaz.',

  flag_hsts_max_age_zero: 'HSTS max-age=0 ile kapatılmış',
  fd_hsts_max_age_zero: 'HSTS’i geri almanın doğru yolu budur ve dışarıdan bir yanlışlıktan ayırt edilemez.',

  flag_hsts_max_age_short: 'HSTS ömrü kısa',
  fd_hsts_max_age_short: 'Bir yıldan az. HSTS devreye alınırken kısa bir pencere yerindedir ve ön yüklemenin istediğinin altında kalır.',

  flag_hsts_no_subdomains: 'HSTS alt alan adlarını kapsamıyor',
  fd_hsts_no_subdomains: 'includeSubDomains olmadan bir alt alan adına hâlâ şifresiz HTTP ile erişilebilir — ve çerezler tam da bir alt alan adından kurulur.',

  flag_hsts_preload_claimed_not_listed: 'preload direktifi var, site listede yok',
  fd_hsts_preload_claimed_not_listed: 'preload bir kayıt başvurusudur, bir durum değil. Bu site onu taşıyor ve Chromium’un dağıttığı listede görünmüyor; bu genellikle kimsenin başvuruyu hiç yapmadığı anlamına gelir — herkes konuyu halledilmiş sayarken.',

  flag_hsts_listed_without_directive: 'Ön yükleme listesinde, direktif olmadan',
  fd_hsts_listed_without_directive: 'Site ön yüklenmiş durumda ve artık bunu istemiyor. Bir sitenin bir sonraki liste güncellemesinde düşmesi tam da böyle olur.',

  flag_hsts_preload_not_eligible: 'Başlık ön yükleme koşullarını karşılamıyor',
  fd_hsts_preload_not_eligible: 'Ön yükleme, preload direktifinin yanı sıra en az bir yıllık max-age ve includeSubDomains ister.',

  flag_hsts_preload_list_not_bundled: 'Ön yükleme listesi bu kurulumla gelmiyor',
  fd_hsts_preload_list_not_bundled: 'Üyelik denetlenemedi, bu yüzden tahmin edilmek yerine bilinmiyor olarak bildiriliyor. Eklemek için npm run preload:fetch çalıştırın.',

  flag_cookie_not_secure: 'Bir çerez Secure olmadan kuruluyor',
  fd_cookie_not_secure: 'Secure olmadan çerez şifresiz HTTP isteklerine de iliştirilir — bir oturumun “her yerde HTTPS”i atlatıp yine de oraya varamayan o tek istekte sızması böyle olur.',

  flag_cookie_not_httponly: 'Bir çerez betikten okunabiliyor',
  fd_cookie_not_httponly: 'HttpOnly olmadan, enjekte edilmiş bir betik çerezi okuyabilir. Bazı çerezleri sitenin kendi betiği bilerek okur, dolayısıyla bu bir hükümden çok bir sorudur.',

  flag_cookie_no_samesite: 'Bir çerez SameSite politikası bildirmiyor',
  fd_cookie_no_samesite: 'Tarayıcılar artık öntanımlı olarak Lax uygular; bu, onu bildirmekle aynı şey değildir — ve gerçekten None’a ihtiyacı olan bir çerez bunu açıkça söylemeli, yoksa çalışmayı bırakır.',

  flag_cookie_samesite_none_without_secure: 'Secure olmadan SameSite=None',
  fd_cookie_samesite_none_without_secure: 'Güncel her tarayıcı bu birleşimi doğrudan reddeder, yani çerez hiç kurulmaz. Genellikle sessizce çalışmayan bir oturum açma olarak görünür.',

  flag_cookie_prefix_violated: 'Bir çerez öneki koşulları karşılanmadan kullanılıyor',
  fd_cookie_prefix_violated: '__Host- Secure, Domain’siz ve Path=/ ister; __Secure- Secure ister. Tarayıcı kuralı çiğneyen çerezi reddeder, yani ziyaretçiler için o çerez hiç yoktur.',

  flag_cookie_very_long_lived: 'Bir çerez bir yıldan uzun yaşıyor',
  fd_cookie_very_long_lived: 'Uzun ömürlü bir çerez, birini tanımlıyorsa uzun ömürlü bir kimlik bilgisidir.',

  flag_cookie_no_prefixes: 'Hiçbir çerez __Host- ya da __Secure- kullanmıyor',
  fd_cookie_no_prefixes: 'Önekler, tarayıcıların yalnızca saygı göstermek yerine zorunlu kıldığı tek çerez korumasıdır: __Host-, bir alt alan adının çerezin üzerine yazmasını olanaksız kılar — Secure ile HttpOnly birlikte bunu başaramaz.',

  flag_no_clickjacking_protection: 'Sitenin çerçeveye alınmasını engelleyen bir şey yok',
  fd_no_clickjacking_protection: 'Ne X-Frame-Options ne de bir frame-ancestors direktifi var. Sayfa başka bir sitenin içine görünmez biçimde yüklenip tıklamaları toplayabilir.',

  flag_framing_headers_disagree: 'İki çerçeveleme başlığı farklı şeyler söylüyor',
  fd_framing_headers_disagree: 'X-Frame-Options ile frame-ancestors uyuşmuyor. Tarayıcılar frame-ancestors’ı yeğler, dolayısıyla daha katı görünen başlık geçerli olan olmayabilir.',

  flag_x_frame_options_allow_from: 'X-Frame-Options ALLOW-FROM kullanıyor',
  fd_x_frame_options_allow_from: 'ALLOW-FROM Chrome’da hiç gerçeklenmedi ve Firefox’tan kaldırıldı; pratikte hiçbir şeyden korumaz. Yerine geçen frame-ancestors’tır.',

  flag_no_nosniff: 'X-Content-Type-Options yok',
  fd_no_nosniff: 'nosniff olmadan tarayıcı, başka bir şey olarak sunulmuş bir yanıtın betik olduğunu tahmin edebilir — bu da bir yükleme uç noktasını betik barındırıcısına çevirir.',

  flag_nosniff_malformed: 'X-Content-Type-Options beklenmedik bir değer taşıyor',
  fd_nosniff_malformed: 'Tarayıcıların işlem yaptığı tek değer “nosniff”tir. Diğer her şey yok sayılır.',

  flag_no_referrer_policy: 'Referrer-Policy yok',
  fd_no_referrer_policy: 'Tarayıcılar öntanımlı olarak strict-origin-when-cross-origin uygular; bu makuldür — bunu bildirmek, o öntanıma bağımlılığı ortadan kaldırır.',

  flag_referrer_policy_leaky: 'Yönlendiren politikası gerekenden fazlasını gönderiyor',
  fd_referrer_policy_leaky: 'Yoldaki ya da sorgudaki her tanımlayıcı dâhil olmak üzere adresin tamamı başka sitelere gönderilir. unsafe-url bunların en kötüsüdür.',

  flag_no_permissions_policy: 'Permissions-Policy yok',
  fd_no_permissions_policy: 'Kamera, mikrofon, konum ve gerisi sayfaya ve gömdüğü her şeye açık kalır. Kullanılmayanı reddetmek tek bir başlıktır.',

  flag_feature_policy_superseded: 'Permissions-Policy olmadan Feature-Policy tanımlı',
  fd_feature_policy_superseded: 'Feature-Policy yeniden adlandırıldı. Güncel tarayıcılar yalnızca Permissions-Policy’yi okur.',

  flag_no_coop: 'Cross-Origin-Opener-Policy yok',
  fd_no_coop: 'COOP, sayfa ile açtığı şey arasındaki pencere başvurusunu keser; bu, pencereler arası saldırıların bütün bir ailesini kapatır ve kaynaklar arası yalıtımın ön koşuludur.',

  flag_no_corp: 'Cross-Origin-Resource-Policy yok',
  fd_no_corp: 'CORP, bir yanıtın başka siteler tarafından gömülmeyi reddetmesine olanak verir. Belgelerden çok kaynaklarda işe yarar.',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection hâlâ tanımlı',
  fd_obsolete_x_xss_protection: 'Denetlediği denetleyici yıllar önce tarayıcılardan kaldırıldı — ve var olduğu sürece kendi açıklarını getirdi. Başlık artık hiçbir şey yapmıyor.',

  flag_obsolete_expect_ct: 'Expect-CT hâlâ tanımlı',
  fd_obsolete_expect_ct: '2021’de geri çekildi: sertifika şeffaflığı artık tüm sertifikalardan isteniyor, dolayısıyla başlığın isteyecek bir şeyi kalmadı.',

  flag_obsolete_p3p: 'P3P hâlâ tanımlı',
  fd_obsolete_p3p: 'Yalnızca Internet Explorer’ın okuduğu, 2002’den kalma bir gizlilik politikası dili. On yıldır hiçbir şey ona bakmıyor.',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP hâlâ tanımlı',
  fd_obsolete_x_webkit_csp: 'Standart oturmadan önceki, önekli bir CSP başlığı. Güncel hiçbir tarayıcı onu okumaz.',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy hâlâ tanımlı',
  fd_obsolete_x_content_security_policy: 'Eski Firefox öneki; Firefox 23’ten beri geçersiz.',

  flag_version_in_headers: 'Başlıklar yazılımı ve sürümü adlandırıyor',
  fd_version_in_headers: 'Gizlemek kararlı hiç kimseyi durdurmaz, ama bir tarayıcıya bilinen bir açığı olan sürümdeki sunucuları süzmek için ölçüt verir. Başlığı kaldırmak bedavadır.',

  flag_duplicate_security_header: 'Bir güvenlik başlığı birden fazla kez gönderiliyor',
  fd_duplicate_security_header: 'Tarayıcılar hangi kopyanın kazandığı konusunda ayrışır ve bir güvenlik başlığı için bu ayrışma, politikanın geçerli olup olmadığını belirler. Genellikle her biri kendininkini ekleyen iki katmandır.',

  flag_cors_wildcard: 'CORS her kaynağa izin veriyor',
  fd_cors_wildcard: 'Access-Control-Allow-Origin *. Açık bir API için doğru; soranın kim olduğuna göre farklı yanıt veren her şeyde ikinci bir bakışa değer.',

  flag_cors_wildcard_with_credentials: 'CORS kimlik bilgileriyle her kaynağa izin veriyor',
  fd_cors_wildcard_with_credentials: 'Tarayıcılar bu birleşimi doğrudan reddeder; uç nokta hem bozuk hem fazla izin verici. Kaynakları açıkça adlandırın.',

  flag_no_http2: 'HTTP/2 uzlaşılmıyor',
  fd_no_http2: 'Sunucuya ikisi de sunulduğu hâlde HTTP/1.1’i seçti. HTTP/2 çoğu zaman elde edilebilecek en ucuz başarım iyileştirmesidir ve biri bakana kadar görünmezdir.',

  flag_no_http3_advertised: 'HTTP/3 duyurulmuyor',
  fd_no_http3_advertised: 'h3 sunan bir Alt-Svc başlığı yok. Bir kusur değil — ve bilmeye değer, çünkü HTTP/3 en çok, sınanması en zor olan mobil ağlarda işe yarar.',

  flag_no_compression: 'Yanıt sıkıştırılmıyor',
  fd_no_compression: 'gzip, br ve zstd’nin üçü de sunulduğu hâlde hiçbir şey sıkıştırılmadı. HTML’de bu genellikle büyük ve bedava bir kazançtır.',

  flag_only_legacy_compression: 'Yalnızca gzip ya da deflate sunuluyor',
  fd_only_legacy_compression: 'Brotli ve zstd metni gözle görülür biçimde daha iyi sıkıştırır ve güncel tüm tarayıcılarca desteklenir.',

  flag_legacy_tls: 'Eskimiş bir TLS sürümü uzlaşılıyor',
  fd_legacy_tls: 'TLS 1.0 ve 1.1, RFC 8996 ile geçersiz sayıldı ve güncel tarayıcılarca reddedilir.',
};

OWN.zh = {
  title: '响应头检查 — CSP、HSTS、Cookie 与跳转链',
  title_short: '响应头检查',
  h1: '响应头检查',
  subtitle: '从四个入口出发的跳转链、逐条拆解的内容安全策略，以及 HSTS 预加载列表中的真实收录情况，而不是页面自己的声称',
  ph_host: 'example.com',
  hero_label: '受检站点',
  empty_hint: '输入一个域名。检查会从 http 和 https、带 www 和不带 www 四个入口跟随跳转链，然后读取访客真正落地的那个页面的响应头。内容安全策略会逐条拆解，因为它正是最难配置正确的那个头。',

  stage_resolve: '解析域名',
  stage_chain: '跟随跳转',
  stage_headers: '读取响应头',
  stage_csp: '拆解策略',
  stage_cookies: '检查 Cookie',
  stage_protocols: '协商协议',
  stage_grade: '评分',

  card_grade: '评分构成',
  card_chain: '访客如何抵达',
  card_csp: '内容安全策略',
  card_csp_directives: '指令',
  card_hsts: 'HSTS',
  card_cookies: 'Cookie',
  card_headers: '安全响应头',
  card_protocols: '协议',
  card_other: '其他响应头',

  comp_transport: '传输',
  comp_csp: '内容安全策略',
  comp_headers: '其他响应头',

  k_canonical: '最终落到',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: '带 www 的 http://',
  k_entry_https_www: '带 www 的 https://',
  k_csp_present: '策略',
  k_csp_enforced: '强制执行',
  k_csp_directives: '已设置的指令',
  k_csp_nonce: '使用 nonce 或哈希',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: '响应头',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'preload 指令',
  k_hsts_preloaded: '在 Chromium 列表中',
  k_hsts_eligible: '符合预加载条件',
  k_cookie_count: '设置的 Cookie',
  k_cookies_secure: '全部带 Secure',
  k_cookies_httponly: '全部带 HttpOnly',
  k_headers_present: '已存在',
  k_alpn: '协商结果（ALPN）',
  k_http2: 'HTTP/2',
  k_http3: '已公告 HTTP/3',
  k_compression: '压缩',
  k_tls_protocol: 'TLS 版本',
  k_requests: '发出的请求',

  th_entry: '入口',
  th_step: '步骤',
  th_status: '状态码',
  th_url: '地址',
  th_time: '耗时',
  th_header: '响应头',
  th_value: '值',
  th_directive: '指令',
  th_sources: '来源',
  th_cookie: 'Cookie',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: '未随附该列表',
  v_seconds_days: '{n} 天',
  v_hops: '{n} 跳',

  note_chain: '关键在于从 http:// 出发的第一跳：跳到另一个明文地址，会让请求连同 Cookie 一起穿过不受保护的网络。请先在同一主机上跳到 HTTPS，之后再跳到规范域名。',
  note_csp: '允许内联脚本的策略，拦不住注入脚本会做的任何事。nonce 和哈希的存在，正是为了让这种做法永远没有必要 — 而同时带着 nonce 和 unsafe-inline 的策略，在两代浏览器眼里是两回事。',
  note_hsts: 'preload 指令是一份申请，不是一种状态。一个站点可以带着它好几年却从未提交过，所以这里显示的是它在 Chromium 实际分发的那份列表中的收录情况。',
  note_cookies: '从外部只看得到落地页设置的 Cookie，看不到登录之后才签发的会话 Cookie。__Host- 前缀是浏览器真正强制执行、而非仅仅尊重的唯一一项 Cookie 保护。',
  note_protocols: 'HTTP/2 的判定方式是开启一次 TLS 握手，看服务器选择什么。HTTP/3 则按 Alt-Svc 中公告的内容如实报告：本检查器不会说 QUIC，回答“否”等于编造结论。',

  err_https_did_not_answer: '站点未通过 HTTPS 作出响应。',

  inc_https_did_not_answer: '站点未通过 HTTPS 作出响应，因此没有响应头可读',

  cap_https_does_not_work: 'HTTPS 不可用',
  cap_certificate_not_trusted: '证书无法通过校验',
  cap_certificate_not_trusted_on_alias: '某个别名出示的证书并不覆盖它',
  cap_http_is_served_as_is: '直接以明文 HTTP 提供站点而非跳转',
  cap_csp_allows_inline_script: '策略允许内联脚本',
  cap_csp_allows_any_script: '策略允许任意来源的脚本',
  cap_csp_does_not_govern_script: '策略根本没有管住脚本',
  cap_first_hop_in_the_clear: '第一次跳转仍停留在明文 HTTP',
  cap_cookie_rejected_by_browsers: '一个会被浏览器拒绝的 Cookie',
  cap_cors_misconfigured: 'CORS 的配置方式会被浏览器拒绝',
  cap_no_csp: '没有内容安全策略',
  cap_no_hsts: '没有 HSTS',
  cap_no_framing_protection: '没有任何东西阻止站点被嵌入框架',
  cap_csp_not_enforced: '策略只上报不拦截',
  cap_cookie_without_secure: '有 Cookie 没有 Secure',
  cap_csp_allows_data_urls: '策略允许 data: 中的脚本',
  cap_obsolete_tls: '过时的 TLS 版本',
  cap_scan_incomplete: '检查未能完成，因此没有给出评分',

  flag_https_unreachable: '站点不通过 HTTPS 响应',
  fd_https_unreachable: '裸域名和 www 在 443 端口上都没有响应。后面的一切都取决于是否存在一个可供读取响应头的页面。',

  flag_redirect_loop: '跳转形成了死循环',
  fd_redirect_loop: '其中一个入口把访客带着兜圈子。浏览器在十来跳之后就会放弃并显示错误。',

  flag_too_many_redirects: '跳转链过长',
  fd_too_many_redirects: '跳数超过其中任何一步的实际需要。页面还没开始加载，每一跳都已经是一次往返。',

  flag_http_not_served: '根本不提供明文 HTTP',
  fd_http_not_served: '80 端口拒绝连接。这是一个正当而略显别扭的选择：输入裸域名的人得到的是连接错误，而不是一次跳转。',

  flag_http_does_not_redirect: '明文 HTTP 直接提供站点而非跳转',
  fd_http_does_not_redirect: '未加密的地址返回的是页面，而不是把访客送往 HTTPS。他们发送的一切 — 以及读到的一切 — 对网络都是敞开的。',

  flag_redirect_stays_on_http: '第一次跳转仍停留在明文 HTTP',
  fd_redirect_stays_on_http: 'http:// 跳向了另一个 http:// 地址，于是访客在抵达 HTTPS 之前至少发出两次带着 Cookie 的明文请求。请先在同一主机上跳到 HTTPS，再跳到规范域名：多花一跳，堵住这个缺口。',

  flag_redirect_changes_host_and_scheme: '第一次跳转同时更换了主机和协议',
  fd_redirect_changes_host_and_scheme: '目的地是对的，而先在同一主机上换协议，面对被篡改的跳转时会稍微稳妥一些。属于细节。',

  flag_redirect_not_permanent: '跳转不是永久性的',
  fd_redirect_not_permanent: '302 或 307 等于告诉浏览器不必记住它，于是每次访问都要重走一遍明文那一跳。请改用 301 或 308。',

  flag_certificate_not_trusted: '证书无法通过校验',
  fd_certificate_not_trusted: '访客最终落地的那个地址，其证书已过期、为自签名，或者并不覆盖该域名。浏览器会显示整屏警告。',

  flag_certificate_not_trusted_on_alias: '某个别名出示的证书并不覆盖它',
  fd_certificate_not_trusted_on_alias: '规范地址没有问题，另一个域名 — 通常是 www — 不在证书覆盖范围内。curl 和跳转照常工作，所以这个问题能从测试中幸存下来，只有浏览器会抱怨。',

  flag_www_and_bare_both_serve: 'www 和裸域名都在提供站点',
  fd_www_and_bare_both_serve: '两者互不跳转，同样的页面因此存在于两个地址。这会把 Cookie、缓存和外链一分为二。',

  flag_csp_missing: '没有内容安全策略',
  fd_csp_missing: '没有任何东西限制脚本可以从哪里加载，也不限制内联脚本能否运行。CSP 是唯一一个限制注入危害、而不是试图阻止注入发生的响应头。',

  flag_csp_report_only: '策略只上报不拦截',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only 只报告违规，什么都不拦。这是测试策略的正确方式，也很容易在测试结束后被留在原处。',

  flag_csp_multiple_policies: '同时强制执行了多条策略',
  fd_csp_multiple_policies: '每一条被强制执行的策略都算数，最终结果是它们的交集 — 比其中任何一条都严。当第二条是随某个插件一起来的时候，这几乎从来不是本意。',

  flag_csp_no_script_src: '策略没有管住脚本',
  fd_csp_no_script_src: '既没有 script-src 也没有 default-src，脚本因此可以从任何地方加载。策略可以设满十几条别的指令，却依然放行了它本该拦下的东西。',

  flag_csp_unsafe_inline: '策略允许内联脚本',
  fd_csp_unsafe_inline: '有了 unsafe-inline，注入的 <script> 就会运行 — 而这正是 CSP 存在的目的所要阻止的攻击。nonce 和哈希的存在，正是为了让这种做法永远没有必要。',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline 与 nonce 或哈希并存',
  fd_csp_unsafe_inline_with_nonce: '懂 nonce 的浏览器会忽略 unsafe-inline，不懂的则会照办。于是这条策略对不同的读者意味着两件事 — 而旧的那种理解正是弱的一种。nonce 就位之后，把它删掉。',

  flag_csp_unsafe_eval: '策略允许 eval',
  fd_csp_unsafe_eval: 'unsafe-eval 重新打开了从字符串执行代码的通道，而相当一部分注入脚本正是这样跑起来的。它通常源于某个框架的要求，值得重新审视。',

  flag_csp_data_in_script_src: '策略允许 data: 中的脚本',
  fd_csp_data_in_script_src: 'data: URL 就是攻击者无需在任何地方托管即可自行构造的脚本。在 script-src 中放行这个协议，等于作废了整份来源清单。',

  flag_csp_wildcard_script_src: '策略允许任意来源的脚本',
  fd_csp_wildcard_script_src: 'script-src 中包含 *、https: 或 http:，等于接纳任何来源。这条策略只是装饰。',

  flag_csp_wildcard_host: '策略允许了带通配符的主机',
  fd_csp_wildcard_host: '*.example.com 这样的写法信任每一个子域，包括任何日后失守或交给第三方的子域。',

  flag_csp_bypassable_host: '策略允许了一个可被反过来利用的 CDN',
  fd_csp_bypassable_host: '一些大型 CDN 托管任意库，或提供会原样回显调用方所传回调名的 JSONP 接口。放行其中之一，几乎等同于放行任何脚本。strict-dynamic，或把路径钉死，可以堵住它。',

  flag_csp_short_nonce: 'nonce 太短',
  fd_csp_short_nonce: 'nonce 必须无法猜测，并且每个响应都要重新生成。短的会被猜到；重复使用的比没有更糟。',

  flag_csp_unsafe_inline_style: '策略允许内联样式',
  fd_csp_unsafe_inline_style: '比脚本上的同类问题轻得多：它带来的是样式类攻击和借助选择器的少量数据外泄，而不是代码执行。',

  flag_csp_object_src_not_none: 'object-src 不是 none',
  fd_csp_object_src_not_none: '<object> 与 <embed> 会执行插件内容，是绕开脚本策略的著名捷径。几乎没有站点需要它们；object-src \'none\' 不花任何代价。',

  flag_csp_no_base_uri: '没有 base-uri 指令',
  fd_csp_no_base_uri: '缺了它，一个注入的 <base> 标签就能改写页面上所有相对地址 — 包括策略费尽心思才放行的那些脚本来源。',

  flag_csp_no_frame_ancestors: '没有 frame-ancestors 指令',
  fd_csp_no_frame_ancestors: 'frame-ancestors 是 X-Frame-Options 的现代替代品，也是唯一能列出多个来源的手段。',

  flag_csp_no_form_action: '没有 form-action 指令',
  fd_csp_no_form_action: '缺了它，一个注入的表单就能把凭据提交到别的来源去。',

  flag_csp_no_reporting: '策略没有向任何地方上报',
  fd_csp_no_reporting: '没有 report-uri 或 report-to，违规就是无声的 — 于是一条正在悄悄弄坏站点、或者正在被悄悄违反的策略，看上去和一条运转良好的策略一模一样。',

  flag_hsts_missing: '没有 HSTS 响应头',
  fd_hsts_missing: '没有 Strict-Transport-Security，访客每次输入裸域名，浏览器都会先试明文 HTTP，而这个请求可能在他看到任何跳转之前就被截走。',

  flag_hsts_sent_over_http: 'HSTS 通过明文 HTTP 发送',
  fd_hsts_sent_over_http: 'RFC 6797 §8.1 规定浏览器会忽略未加密响应中的该响应头。这没有危害，通常说明它被加到了错误的 server 块里。',

  flag_hsts_no_max_age: 'HSTS 响应头没有 max-age',
  fd_hsts_no_max_age: 'max-age 是必需的。没有它，这个响应头什么也不做。',

  flag_hsts_max_age_zero: 'HSTS 被 max-age=0 关闭',
  fd_hsts_max_age_zero: '这是撤下 HSTS 的正确做法，而从外部看，它与一次失误毫无分别。',

  flag_hsts_max_age_short: 'HSTS 有效期偏短',
  fd_hsts_max_age_short: '不足一年。在 HSTS 上线过程中，短窗口是合适的，同时也达不到预加载的门槛。',

  flag_hsts_no_subdomains: 'HSTS 不覆盖子域',
  fd_hsts_no_subdomains: '没有 includeSubDomains，子域依然可以通过明文 HTTP 访问 — 而 Cookie 正是从子域设置的。',

  flag_hsts_preload_claimed_not_listed: '带着 preload 指令，站点却不在列表中',
  fd_hsts_preload_claimed_not_listed: 'preload 是一份收录申请，不是一种状态。这个站点带着它，却没有出现在 Chromium 分发的列表里，通常意味着根本没人提交过 — 而所有相关的人都当这件事已经办妥。',

  flag_hsts_listed_without_directive: '已在预加载列表中却没有该指令',
  fd_hsts_listed_without_directive: '站点已被预加载，却不再请求预加载。列表下次更新时，站点正是这样掉出去的。',

  flag_hsts_preload_not_eligible: '该响应头不满足预加载要求',
  fd_hsts_preload_not_eligible: '预加载要求 max-age 至少一年并带 includeSubDomains，此外还要有 preload 指令本身。',

  flag_hsts_preload_list_not_bundled: '本次安装未随附预加载列表',
  fd_hsts_preload_list_not_bundled: '无法核对收录情况，因此如实报告为未知，而不是靠猜。运行 npm run preload:fetch 即可补上。',

  flag_cookie_not_secure: '有 Cookie 在设置时没有 Secure',
  fd_cookie_not_secure: '没有 Secure，这个 Cookie 也会被附加到明文 HTTP 请求上 — 一个会话正是这样在“全站 HTTPS”中幸存下来，却依然从那唯一一个没走到 HTTPS 的请求里泄露出去。',

  flag_cookie_not_httponly: '有 Cookie 可被脚本读取',
  fd_cookie_not_httponly: '没有 HttpOnly，注入的脚本就能读到这个 Cookie。有些 Cookie 本来就是给站点自己的脚本读的，所以这更像一个问题而不是一个判决。',

  flag_cookie_no_samesite: '有 Cookie 未声明 SameSite 策略',
  fd_cookie_no_samesite: '浏览器如今默认按 Lax 处理，但这与明确声明并不是一回事 — 而真正需要 None 的 Cookie 必须写明，否则就会失效。',

  flag_cookie_samesite_none_without_secure: 'SameSite=None 却没有 Secure',
  fd_cookie_samesite_none_without_secure: '所有现代浏览器都会直接拒绝这个组合，于是该 Cookie 根本没被设置。它通常表现为一次悄无声息就是登不上去的登录。',

  flag_cookie_prefix_violated: '使用了 Cookie 前缀却不满足其条件',
  fd_cookie_prefix_violated: '__Host- 要求 Secure、不带 Domain 且 Path=/；__Secure- 要求 Secure。浏览器会拒绝违反规则的那个 Cookie，所以对访客来说它根本不存在。',

  flag_cookie_very_long_lived: '有 Cookie 的存活期超过一年',
  fd_cookie_very_long_lived: '长寿的 Cookie，如果能标识某个人，就是长寿的凭据。',

  flag_cookie_no_prefixes: '没有任何 Cookie 使用 __Host- 或 __Secure-',
  fd_cookie_no_prefixes: '前缀是浏览器真正强制执行、而非仅仅尊重的唯一一项 Cookie 保护：__Host- 让子域无法覆盖该 Cookie，而这是 Secure 和 HttpOnly 加在一起也做不到的。',

  flag_no_clickjacking_protection: '没有任何东西阻止站点被嵌入框架',
  fd_no_clickjacking_protection: '既没有 X-Frame-Options，也没有 frame-ancestors 指令。页面可以被隐形加载进别的站点里，并在那里接收点击。',

  flag_framing_headers_disagree: '两个框架相关的响应头说法不一致',
  fd_framing_headers_disagree: 'X-Frame-Options 与 frame-ancestors 对不上。浏览器优先采用 frame-ancestors，所以看起来更严的那个头未必是实际生效的那个。',

  flag_x_frame_options_allow_from: 'X-Frame-Options 使用了 ALLOW-FROM',
  fd_x_frame_options_allow_from: 'ALLOW-FROM 在 Chrome 中从未实现，也已从 Firefox 移除，因此实际上什么都防不住。替代品是 frame-ancestors。',

  flag_no_nosniff: '没有 X-Content-Type-Options',
  fd_no_nosniff: '没有 nosniff，浏览器可能把一个按别的类型提供的响应猜成脚本 — 于是一个上传接口就变成了脚本托管点。',

  flag_nosniff_malformed: 'X-Content-Type-Options 的取值意外',
  fd_nosniff_malformed: '浏览器唯一会据以行动的取值是“nosniff”。其余一律忽略。',

  flag_no_referrer_policy: '没有 Referrer-Policy',
  fd_no_referrer_policy: '浏览器默认采用 strict-origin-when-cross-origin，这是合理的 — 明确声明可以摆脱对这个默认值的依赖。',

  flag_referrer_policy_leaky: '来源页策略发送的信息超出必要',
  fd_referrer_policy_leaky: '完整地址，连同路径或查询串中的任何标识符，都会发送给别的站点。unsafe-url 是其中最糟的一种。',

  flag_no_permissions_policy: '没有 Permissions-Policy',
  fd_no_permissions_policy: '摄像头、麦克风、定位等等，对本页以及它嵌入的一切都仍然可用。把用不到的一概禁掉，只需要一个响应头。',

  flag_feature_policy_superseded: '设置了 Feature-Policy 却没有 Permissions-Policy',
  fd_feature_policy_superseded: 'Feature-Policy 已经改名。现代浏览器只读 Permissions-Policy。',

  flag_no_coop: '没有 Cross-Origin-Opener-Policy',
  fd_no_coop: 'COOP 切断页面与它所打开窗口之间的窗口引用，由此关掉一整类跨窗口攻击，也是跨源隔离的前提。',

  flag_no_corp: '没有 Cross-Origin-Resource-Policy',
  fd_no_corp: 'CORP 让一个响应可以拒绝被其他站点嵌入。它在资源上比在文档上更有用。',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection 仍在设置',
  fd_obsolete_x_xss_protection: '它所控制的那个审计器多年前就已从浏览器中移除 — 而在它存在的那段时间里，它自己还引入过漏洞。这个响应头如今什么也不做。',

  flag_obsolete_expect_ct: 'Expect-CT 仍在设置',
  fd_obsolete_expect_ct: '2021 年已废止：证书透明度如今对所有证书都是强制要求，这个响应头已经没有什么可要求的了。',

  flag_obsolete_p3p: 'P3P 仍在设置',
  fd_obsolete_p3p: '一种 2002 年的隐私策略语言，只有 Internet Explorer 读过它。十年来再没有任何东西看过它一眼。',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP 仍在设置',
  fd_obsolete_x_webkit_csp: '标准定稿之前的带前缀 CSP 响应头。现代浏览器一概不读。',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy 仍在设置',
  fd_obsolete_x_content_security_policy: 'Firefox 的旧前缀，自 Firefox 23 起已作废。',

  flag_version_in_headers: '响应头报出了软件名称和版本',
  fd_version_in_headers: '藏起来拦不住任何铁了心的人，但它确实给了扫描器一个筛选条件，用来挑出版本存在已知漏洞的主机。去掉这个响应头不花任何代价。',

  flag_duplicate_security_header: '某个安全响应头被发送了不止一次',
  fd_duplicate_security_header: '浏览器对哪一份副本生效意见不一，而对安全响应头来说，这种分歧决定了策略到底算不算数。通常是两层各自加了一份。',

  flag_cors_wildcard: 'CORS 允许任意来源',
  fd_cors_wildcard: 'Access-Control-Allow-Origin 是 *。对公开 API 来说这没错；对任何会因提问者不同而给出不同答案的东西，则值得再看一眼。',

  flag_cors_wildcard_with_credentials: 'CORS 允许任意来源并携带凭据',
  fd_cors_wildcard_with_credentials: '浏览器会直接拒绝这个组合，所以这个接口既坏掉了又过于宽松。请明确列出来源。',

  flag_no_http2: '未协商出 HTTP/2',
  fd_no_http2: '两者都摆在面前时，服务器选了 HTTP/1.1。HTTP/2 往往是眼下最廉价的性能改进，而且在有人去看之前它一直是隐形的。',

  flag_no_http3_advertised: '未公告 HTTP/3',
  fd_no_http3_advertised: '没有提供 h3 的 Alt-Svc 响应头。这不算缺陷 — 但值得知道，因为 HTTP/3 帮助最大的正是最难测试的移动网络。',

  flag_no_compression: '响应未被压缩',
  fd_no_compression: 'gzip、br 和 zstd 都已提供，却什么都没压缩。对 HTML 而言，这通常是一笔可观且免费的节省。',

  flag_only_legacy_compression: '只提供 gzip 或 deflate',
  fd_only_legacy_compression: 'Brotli 和 zstd 压缩文本明显更好，且所有现代浏览器都支持。',

  flag_legacy_tls: '协商出了过时的 TLS 版本',
  fd_legacy_tls: 'TLS 1.0 与 1.1 已被 RFC 8996 废止，现代浏览器一律拒绝。',
};

OWN.ja = {
  title: 'ヘッダー検査 — CSP、HSTS、Cookie、リダイレクトの連鎖',
  title_short: 'ヘッダー検査',
  h1: 'ヘッダー検査',
  subtitle: '四つの入口すべてから辿るリダイレクトの連鎖、ディレクティブ単位で分解したコンテンツセキュリティポリシー、そして自己申告ではなく HSTS プリロードリストへの実際の登録状況',
  ph_host: 'example.com',
  hero_label: '検査したサイト',
  empty_hint: 'ドメイン名を入力してください。検査は http と https から、www ありと www なしでリダイレクトの連鎖を辿り、訪問者が実際に辿り着くページのヘッダーを読みます。コンテンツセキュリティポリシーはディレクティブ単位で分解します。正しく設定するのがいちばん難しいヘッダーだからです。',

  stage_resolve: '名前を解決中',
  stage_chain: 'リダイレクトを追跡中',
  stage_headers: 'ヘッダーを読み取り中',
  stage_csp: 'ポリシーを分解中',
  stage_cookies: 'Cookie を検査中',
  stage_protocols: 'プロトコルを交渉中',
  stage_grade: '採点中',

  card_grade: '評価の内訳',
  card_chain: '訪問者はどう辿り着くか',
  card_csp: 'コンテンツセキュリティポリシー',
  card_csp_directives: 'ディレクティブ',
  card_hsts: 'HSTS',
  card_cookies: 'Cookie',
  card_headers: 'セキュリティヘッダー',
  card_protocols: 'プロトコル',
  card_other: 'その他のヘッダー',

  comp_transport: '通信路',
  comp_csp: 'コンテンツセキュリティポリシー',
  comp_headers: 'その他のヘッダー',

  k_canonical: '最終的な到達先',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'www 付き http://',
  k_entry_https_www: 'www 付き https://',
  k_csp_present: 'ポリシー',
  k_csp_enforced: '強制適用',
  k_csp_directives: '設定済みディレクティブ',
  k_csp_nonce: 'nonce またはハッシュを使用',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'ヘッダー',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'preload ディレクティブ',
  k_hsts_preloaded: 'Chromium のリストに掲載',
  k_hsts_eligible: 'プリロードの要件を満たす',
  k_cookie_count: '設定された Cookie',
  k_cookies_secure: 'すべて Secure 付き',
  k_cookies_httponly: 'すべて HttpOnly 付き',
  k_headers_present: '存在',
  k_alpn: '交渉結果（ALPN）',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 を告知',
  k_compression: '圧縮',
  k_tls_protocol: 'TLS のバージョン',
  k_requests: '送信したリクエスト',

  th_entry: '入口',
  th_step: '手順',
  th_status: 'コード',
  th_url: 'アドレス',
  th_time: '所要時間',
  th_header: 'ヘッダー',
  th_value: '値',
  th_directive: 'ディレクティブ',
  th_sources: 'ソース',
  th_cookie: 'Cookie',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'リストが同梱されていません',
  v_seconds_days: '{n} 日',
  v_hops: '{n} ホップ',

  note_chain: '肝心なのは http:// からの最初の一歩です。もう一つの平文アドレスへのリダイレクトは、リクエストを Cookie ごと保護されていないネットワークに流します。まず同じホスト上で HTTPS へ転送し、その後で正規名へ向けてください。',
  note_csp: 'インラインスクリプトを許すポリシーは、注入されたスクリプトのすることを何ひとつ止められません。nonce とハッシュは、まさにそれが決して必要にならないように存在します — そして nonce と unsafe-inline を同時に載せたポリシーは、二世代のブラウザで二つの別々の意味になります。',
  note_hsts: 'preload ディレクティブは申請であって状態ではありません。サイトは一度も申請しないまま何年もそれを掲げていられるので、ここに示すのは Chromium が実際に配布しているリストへの登録状況です。',
  note_cookies: '外から見えるのは着地ページで設定される Cookie だけで、ログイン後に発行されるセッション Cookie は見えません。__Host- 接頭辞は、ブラウザが単に尊重するのではなく強制する唯一の Cookie 保護です。',
  note_protocols: 'HTTP/2 は TLS ハンドシェイクを開いてサーバーが何を選ぶかを見て判定します。HTTP/3 は Alt-Svc での告知どおりに報告します。この検査器は QUIC を話さないので、「なし」と答えるのは結果の捏造になります。',

  err_https_did_not_answer: 'サイトが HTTPS で応答しませんでした。',

  inc_https_did_not_answer: 'サイトが HTTPS で応答せず、読むべきヘッダーがありませんでした',

  cap_https_does_not_work: 'HTTPS が機能していない',
  cap_certificate_not_trusted: '証明書が検証を通らない',
  cap_certificate_not_trusted_on_alias: '別名が、それを含まない証明書を提示している',
  cap_http_is_served_as_is: 'リダイレクトせず平文 HTTP をそのまま配信している',
  cap_csp_allows_inline_script: 'ポリシーがインラインスクリプトを許している',
  cap_csp_allows_any_script: 'ポリシーが任意のオリジンからのスクリプトを許している',
  cap_csp_does_not_govern_script: 'ポリシーがスクリプトをまったく統制していない',
  cap_first_hop_in_the_clear: '最初のリダイレクトが平文 HTTP のまま',
  cap_cookie_rejected_by_browsers: 'ブラウザに拒否される Cookie',
  cap_cors_misconfigured: 'CORS がブラウザに拒否される形で設定されている',
  cap_no_csp: 'コンテンツセキュリティポリシーがない',
  cap_no_hsts: 'HSTS がない',
  cap_no_framing_protection: 'サイトをフレームに埋め込むのを妨げるものがない',
  cap_csp_not_enforced: 'ポリシーが報告のみ',
  cap_cookie_without_secure: 'Secure のない Cookie',
  cap_csp_allows_data_urls: 'ポリシーが data: 内のスクリプトを許している',
  cap_obsolete_tls: '旧式の TLS バージョン',
  cap_scan_incomplete: '検査が不完全に終わったため、評価は付けていません',

  flag_https_unreachable: 'サイトが HTTPS で応答しない',
  fd_https_unreachable: '裸のドメインも www も 443 番ポートで応答しませんでした。以下のすべては、ヘッダーを読めるページが存在することを前提にしています。',

  flag_redirect_loop: 'リダイレクトが循環している',
  fd_redirect_loop: '入口の一つが訪問者を堂々巡りさせています。ブラウザは十数ホップで諦めてエラーを表示します。',

  flag_too_many_redirects: 'リダイレクトの連鎖が長い',
  fd_too_many_redirects: 'どの経路にも必要のないほどホップが多い。ページが読み込みを始める前に、一つひとつが往復になります。',

  flag_http_not_served: '平文 HTTP をまったく配信していない',
  fd_http_not_served: '80 番ポートが接続を拒否しています。正当で、いくらか居心地の悪い選択です。裸のドメインを打った人は、リダイレクトではなく接続エラーを受け取ります。',

  flag_http_does_not_redirect: '平文 HTTP がリダイレクトせずサイトを配信している',
  fd_http_does_not_redirect: '暗号化されていないアドレスが、訪問者を HTTPS へ送る代わりにページを返しています。送るものも読むものも、すべてネットワークから丸見えです。',

  flag_redirect_stays_on_http: '最初のリダイレクトが平文 HTTP のまま',
  fd_redirect_stays_on_http: 'http:// が別の http:// アドレスへ転送しているため、訪問者は HTTPS に着く前に Cookie を付けた平文リクエストを少なくとも二回送ります。まず同じホスト上で HTTPS へ、続いて正規名へ転送してください。ホップが一つ増えるだけで、この隙間はふさがります。',

  flag_redirect_changes_host_and_scheme: '最初のリダイレクトがホストとスキームを同時に変えている',
  fd_redirect_changes_host_and_scheme: '行き先は正しく、同じホスト上でまずスキームを変える方が、改竄されたリダイレクトに対してわずかに安全です。細かい点です。',

  flag_redirect_not_permanent: 'リダイレクトが恒久的でない',
  fd_redirect_not_permanent: '302 や 307 はブラウザに覚えなくてよいと伝えるので、訪問のたびに平文のホップを繰り返します。301 か 308 を使ってください。',

  flag_certificate_not_trusted: '証明書が検証を通らない',
  fd_certificate_not_trusted: '訪問者が辿り着くアドレスの証明書が、期限切れか自己署名か、あるいはその名前を含んでいません。ブラウザは全画面の警告を表示します。',

  flag_certificate_not_trusted_on_alias: '別名が、それを含まない証明書を提示している',
  fd_certificate_not_trusted_on_alias: '正規のアドレスは問題なく、別の名前 — たいていは www — が証明書の対象外です。curl もリダイレクトも動き続けるので、これはテストを生き延び、文句を言うのはブラウザだけになります。',

  flag_www_and_bare_both_serve: 'www と裸のドメインの両方がサイトを配信している',
  fd_www_and_bare_both_serve: 'どちらも他方へ転送していないので、同じページが二つのアドレスに存在します。Cookie もキャッシュも被リンクも二分されます。',

  flag_csp_missing: 'コンテンツセキュリティポリシーがない',
  fd_csp_missing: 'スクリプトをどこから読み込めるかも、インラインスクリプトを実行してよいかも、何も制限していません。CSP は、注入を防ごうとするのではなく、その被害を限定する唯一のヘッダーです。',

  flag_csp_report_only: 'ポリシーが報告のみ',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only は違反を報告するだけで何も遮断しません。ポリシーを試すやり方としては正しく、試験が終わった後もそのまま残りがちです。',

  flag_csp_multiple_policies: '複数のポリシーが強制適用されている',
  fd_csp_multiple_policies: '強制適用されたポリシーはすべて効き、結果はその積 — どれ一つより厳しくなります。二つ目がプラグインと一緒に入ってきた場合、それが意図であることはまずありません。',

  flag_csp_no_script_src: 'ポリシーがスクリプトを統制していない',
  fd_csp_no_script_src: 'script-src も default-src も設定されておらず、スクリプトはどこからでも読み込めます。他に十数個のディレクティブを設定していても、止めるべきものをそのまま許していることになります。',

  flag_csp_unsafe_inline: 'ポリシーがインラインスクリプトを許している',
  fd_csp_unsafe_inline: 'unsafe-inline があると、注入された <script> が実行されます — まさに CSP が止めるために存在する攻撃です。nonce とハッシュは、これが決して必要にならないように存在します。',

  flag_csp_unsafe_inline_with_nonce: 'nonce やハッシュと並んだ unsafe-inline',
  fd_csp_unsafe_inline_with_nonce: 'nonce を解するブラウザは unsafe-inline を無視し、解さないブラウザはそれに従います。つまりこのポリシーは読み手によって二つの意味になり、古い読み方の方が弱い側です。nonce が整ったら取り除いてください。',

  flag_csp_unsafe_eval: 'ポリシーが eval を許している',
  fd_csp_unsafe_eval: 'unsafe-eval は文字列からのコード実行を再び開きます。注入されたスクリプトのかなりの部分は、まさにそうやって動きます。たいていは見直す価値のあるフレームワーク側の要求です。',

  flag_csp_data_in_script_src: 'ポリシーが data: 内のスクリプトを許している',
  fd_csp_data_in_script_src: 'data: URL は、攻撃者がどこにも何も置かずに組み立てられるスクリプトです。script-src でこのスキームを許すと、オリジンの一覧が無意味になります。',

  flag_csp_wildcard_script_src: 'ポリシーが任意のオリジンからのスクリプトを許している',
  fd_csp_wildcard_script_src: 'script-src に *、https:、http: のいずれかが含まれ、どのオリジンも受け入れます。ポリシーは飾りです。',

  flag_csp_wildcard_host: 'ポリシーがワイルドカードのホストを許している',
  fd_csp_wildcard_host: '*.example.com のような書き方は、失われたり第三者に渡ったりするものも含め、すべてのサブドメインを信頼します。',

  flag_csp_bypassable_host: 'ポリシーが、逆手に取られうる CDN を許している',
  fd_csp_bypassable_host: '大手 CDN の中には任意のライブラリを置けるものや、呼び出し側が渡したコールバック名をそのまま返す JSONP エンドポイントを備えるものがあります。その一つを許すことは、ほぼ任意のスクリプトを許すことです。strict-dynamic か、特定のパスへの固定でふさげます。',

  flag_csp_short_nonce: 'nonce が短い',
  fd_csp_short_nonce: 'nonce は推測不可能で、応答ごとに作り直さねばなりません。短ければ推測され、使い回せば無いより悪くなります。',

  flag_csp_unsafe_inline_style: 'ポリシーがインラインスタイルを許している',
  fd_csp_unsafe_inline_style: 'スクリプトの同じ問題よりはるかに軽い話です。スタイル経由の攻撃やセレクタによる多少のデータ流出は可能になりますが、コード実行は起きません。',

  flag_csp_object_src_not_none: 'object-src が none でない',
  fd_csp_object_src_not_none: '<object> と <embed> はプラグインの内容を実行し、スクリプトポリシーを迂回する手口としてよく知られています。必要とするサイトはほとんどありません。object-src \'none\' は何の代償もありません。',

  flag_csp_no_base_uri: 'base-uri ディレクティブがない',
  fd_csp_no_base_uri: 'これがないと、注入された <base> タグがページ上のすべての相対 URL を書き換えます — ポリシーが苦心して許可したスクリプトの取得元も含めて。',

  flag_csp_no_frame_ancestors: 'frame-ancestors ディレクティブがない',
  fd_csp_no_frame_ancestors: 'frame-ancestors は X-Frame-Options の現代的な後継で、複数のオリジンを挙げられる唯一の手段です。',

  flag_csp_no_form_action: 'form-action ディレクティブがない',
  fd_csp_no_form_action: 'これがないと、注入されたフォームが資格情報を別のオリジンへ送信できます。',

  flag_csp_no_reporting: 'ポリシーがどこにも報告していない',
  fd_csp_no_reporting: 'report-uri も report-to もなければ違反は無言です — つまり、黙ってサイトを壊しているポリシーや、黙って破られているポリシーが、うまく動いているものとまったく同じに見えます。',

  flag_hsts_missing: 'HSTS ヘッダーがない',
  fd_hsts_missing: 'Strict-Transport-Security がないと、訪問者が裸のドメインを打つたびにブラウザはまず平文 HTTP を試し、そのリクエストは彼がリダイレクトを目にする前に横取りされ得ます。',

  flag_hsts_sent_over_http: 'HSTS が平文 HTTP で送られている',
  fd_hsts_sent_over_http: 'RFC 6797 §8.1 は、暗号化されていない応答のこのヘッダーをブラウザが無視すると定めています。無害であり、たいていは誤ったサーバーブロックに書かれた印です。',

  flag_hsts_no_max_age: 'HSTS ヘッダーに max-age がない',
  fd_hsts_no_max_age: 'max-age は必須です。これがなければヘッダーは何もしません。',

  flag_hsts_max_age_zero: 'HSTS が max-age=0 で無効化されている',
  fd_hsts_max_age_zero: 'HSTS を取り下げる正しい方法であり、外からは手違いと見分けがつきません。',

  flag_hsts_max_age_short: 'HSTS の有効期間が短い',
  fd_hsts_max_age_short: '一年未満です。HSTS を導入している最中なら短い窓は適切で、プリロードが求める水準には届きません。',

  flag_hsts_no_subdomains: 'HSTS がサブドメインを覆っていない',
  fd_hsts_no_subdomains: 'includeSubDomains がなければ、サブドメインには依然として平文 HTTP で到達できます — そして Cookie はまさにサブドメインから設定されます。',

  flag_hsts_preload_claimed_not_listed: 'preload ディレクティブがあるのにリストに載っていない',
  fd_hsts_preload_claimed_not_listed: 'preload は登録の申請であって状態ではありません。このサイトはそれを掲げていながら Chromium が配布するリストに現れません。たいていは誰も申請しなかったということです — 関係者全員は片付いたものと思っているのに。',

  flag_hsts_listed_without_directive: 'プリロードリストに載っているがディレクティブがない',
  fd_hsts_listed_without_directive: 'サイトはプリロード済みで、もう申請していません。次のリスト更新でサイトが外れるのは、まさにこうしてです。',

  flag_hsts_preload_not_eligible: 'ヘッダーがプリロードの要件を満たしていない',
  fd_hsts_preload_not_eligible: 'プリロードには、preload ディレクティブ自体に加えて、少なくとも一年の max-age と includeSubDomains が必要です。',

  flag_hsts_preload_list_not_bundled: 'この構成にはプリロードリストが同梱されていない',
  fd_hsts_preload_list_not_bundled: '登録状況を確認できなかったため、推測せず不明として報告しています。npm run preload:fetch を実行すれば追加できます。',

  flag_cookie_not_secure: 'Secure なしで設定されている Cookie がある',
  fd_cookie_not_secure: 'Secure がないと、その Cookie は平文 HTTP リクエストにも付きます — セッションが「全面 HTTPS」を生き延びながら、そこへ辿り着けなかったただ一つのリクエストから漏れるのは、こうしてです。',

  flag_cookie_not_httponly: 'スクリプトから読める Cookie がある',
  fd_cookie_not_httponly: 'HttpOnly がなければ、注入されたスクリプトがその Cookie を読めます。サイト自身のスクリプトが意図して読む Cookie もあるので、これは判決というより問いかけです。',

  flag_cookie_no_samesite: 'SameSite を宣言していない Cookie がある',
  fd_cookie_no_samesite: 'ブラウザは今では既定で Lax を適用しますが、それは宣言することと同じではありません — そして本当に None が必要な Cookie は明示しなければ動かなくなります。',

  flag_cookie_samesite_none_without_secure: 'Secure なしの SameSite=None',
  fd_cookie_samesite_none_without_secure: '現行のブラウザはこの組み合わせを一律に拒むので、Cookie はそもそも設定されません。たいていは、何も言わずにただ通らないログインとして現れます。',

  flag_cookie_prefix_violated: '条件を満たさないまま Cookie 接頭辞が使われている',
  fd_cookie_prefix_violated: '__Host- は Secure、Domain なし、Path=/ を要求し、__Secure- は Secure を要求します。ブラウザは規則を破った Cookie を拒むので、訪問者にとってその Cookie は存在しません。',

  flag_cookie_very_long_lived: '一年を超えて生きる Cookie がある',
  fd_cookie_very_long_lived: '長寿の Cookie は、誰かを特定できるのであれば長寿の資格情報です。',

  flag_cookie_no_prefixes: '__Host- も __Secure- も使っている Cookie がない',
  fd_cookie_no_prefixes: '接頭辞は、ブラウザが単に尊重するのではなく強制する唯一の Cookie 保護です。__Host- はサブドメインからの上書きを不可能にします — Secure と HttpOnly を合わせても達せない芸当です。',

  flag_no_clickjacking_protection: 'サイトをフレームに埋め込むのを妨げるものがない',
  fd_no_clickjacking_protection: 'X-Frame-Options も frame-ancestors ディレクティブもありません。ページは他のサイトの中に見えない形で読み込まれ、そこでクリックを受け取れます。',

  flag_framing_headers_disagree: '二つのフレーム関連ヘッダーが違うことを言っている',
  fd_framing_headers_disagree: 'X-Frame-Options と frame-ancestors が食い違っています。ブラウザは frame-ancestors を優先するので、厳しく見える方が実際に効いている方とは限りません。',

  flag_x_frame_options_allow_from: 'X-Frame-Options が ALLOW-FROM を使っている',
  fd_x_frame_options_allow_from: 'ALLOW-FROM は Chrome では実装されず、Firefox からも削除されたので、実質何も守りません。後継は frame-ancestors です。',

  flag_no_nosniff: 'X-Content-Type-Options がない',
  fd_no_nosniff: 'nosniff がないと、別のものとして配信された応答をブラウザがスクリプトだと推測しかねません — アップロード用のエンドポイントがスクリプトの置き場に変わります。',

  flag_nosniff_malformed: 'X-Content-Type-Options の値が想定外',
  fd_nosniff_malformed: 'ブラウザが従う値は「nosniff」だけです。それ以外は無視されます。',

  flag_no_referrer_policy: 'Referrer-Policy がない',
  fd_no_referrer_policy: 'ブラウザは既定で strict-origin-when-cross-origin を適用します。妥当ですが、明示すればその既定値への依存がなくなります。',

  flag_referrer_policy_leaky: 'リファラーポリシーが必要以上に送っている',
  fd_referrer_policy_leaky: 'パスやクエリに含まれる識別子もろとも、URL 全体が他のサイトへ送られます。unsafe-url はその最悪の形です。',

  flag_no_permissions_policy: 'Permissions-Policy がない',
  fd_no_permissions_policy: 'カメラ、マイク、位置情報などが、ページと、ページが埋め込むすべてに使える状態のままです。使わないものを拒むのはヘッダー一つで済みます。',

  flag_feature_policy_superseded: 'Permissions-Policy がないまま Feature-Policy が設定されている',
  fd_feature_policy_superseded: 'Feature-Policy は改名されました。現行のブラウザは Permissions-Policy しか読みません。',

  flag_no_coop: 'Cross-Origin-Opener-Policy がない',
  fd_no_coop: 'COOP はページと、ページが開いたものとの間のウィンドウ参照を断ちます。これによりウィンドウ間攻撃の一族が丸ごと閉じ、クロスオリジン分離の前提にもなります。',

  flag_no_corp: 'Cross-Origin-Resource-Policy がない',
  fd_no_corp: 'CORP は、応答が他サイトからの埋め込みを拒めるようにします。文書よりもリソースで役に立ちます。',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection がまだ設定されている',
  fd_obsolete_x_xss_protection: 'これが制御していた監査機構は何年も前にブラウザから外されました — しかも存在した間、それ自身が脆弱性を持ち込みました。今このヘッダーは何もしません。',

  flag_obsolete_expect_ct: 'Expect-CT がまだ設定されている',
  fd_obsolete_expect_ct: '2021 年に撤回されました。証明書の透明性は今やすべての証明書に必須なので、このヘッダーに要求すべきことは残っていません。',

  flag_obsolete_p3p: 'P3P がまだ設定されている',
  fd_obsolete_p3p: '2002 年のプライバシーポリシー記述言語で、読んだのは Internet Explorer だけでした。この十年、何ひとつ目を向けていません。',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP がまだ設定されている',
  fd_obsolete_x_webkit_csp: '規格が固まる前の、接頭辞付き CSP ヘッダーです。現行のブラウザは読みません。',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy がまだ設定されている',
  fd_obsolete_x_content_security_policy: 'Firefox の古い接頭辞で、Firefox 23 以降は廃れています。',

  flag_version_in_headers: 'ヘッダーがソフトウェア名とバージョンを名乗っている',
  fd_version_in_headers: '隠しても本気の相手は止まりませんが、既知の欠陥を持つバージョンのホストを絞り込む手掛かりをスキャナに与えるのは確かです。ヘッダーを外すのは無料です。',

  flag_duplicate_security_header: 'セキュリティヘッダーが二回以上送られている',
  fd_duplicate_security_header: 'どの複製が勝つかでブラウザの見解が割れ、セキュリティヘッダーの場合その食い違いがポリシーの有効・無効を決めます。たいていは二つの層がそれぞれ自前のものを足しています。',

  flag_cors_wildcard: 'CORS が任意のオリジンを許している',
  fd_cors_wildcard: 'Access-Control-Allow-Origin が * です。公開 API なら正しく、誰が尋ねるかで答えが変わるものならもう一度見る価値があります。',

  flag_cors_wildcard_with_credentials: 'CORS が資格情報付きで任意のオリジンを許している',
  fd_cors_wildcard_with_credentials: 'ブラウザはこの組み合わせを一律に拒むので、このエンドポイントは緩すぎるうえに壊れています。オリジンを明示してください。',

  flag_no_http2: 'HTTP/2 が交渉されていない',
  fd_no_http2: '両方を提示したのにサーバーは HTTP/1.1 を選びました。HTTP/2 はたいてい最も安上がりな性能改善であり、誰かが見るまで目に見えません。',

  flag_no_http3_advertised: 'HTTP/3 を告知していない',
  fd_no_http3_advertised: 'h3 を提示する Alt-Svc ヘッダーがありません。欠陥ではありませんが、HTTP/3 が最も効くのは最も試験しにくいモバイル回線なので、知っておく価値はあります。',

  flag_no_compression: '応答が圧縮されていない',
  fd_no_compression: 'gzip も br も zstd もすべて提示したのに、何も圧縮されませんでした。HTML では通常、大きくて無料の節約になります。',

  flag_only_legacy_compression: 'gzip か deflate しか提示されない',
  fd_only_legacy_compression: 'Brotli と zstd はテキストを目に見えてよく縮め、現行のブラウザはすべて対応しています。',

  flag_legacy_tls: '旧式の TLS バージョンが交渉されている',
  fd_legacy_tls: 'TLS 1.0 と 1.1 は RFC 8996 で廃止され、現行のブラウザは受け付けません。',
};

OWN.hi = {
  title: 'हेडर जाँच — CSP, HSTS, कुकियाँ और पुनर्निर्देशन की शृंखला',
  title_short: 'हेडर जाँच',
  h1: 'हेडर जाँच',
  subtitle: 'चारों प्रवेश-बिंदुओं से पुनर्निर्देशन की शृंखला, कंटेंट सिक्योरिटी पॉलिसी निर्देश-दर-निर्देश खोलकर, और HSTS प्रीलोड सूची में दावे के बजाय वास्तविक उपस्थिति',
  ph_host: 'example.com',
  hero_label: 'जाँची गई साइट',
  empty_hint: 'एक डोमेन नाम दर्ज करें। जाँच http और https से, www के साथ और बिना, पुनर्निर्देशन की शृंखला का अनुसरण करती है और फिर उस पृष्ठ के हेडर पढ़ती है जहाँ आगंतुक वास्तव में पहुँचता है। कंटेंट सिक्योरिटी पॉलिसी को निर्देश-दर-निर्देश खोला जाता है, क्योंकि उसे ठीक बैठाना ही सबसे कठिन है।',

  stage_resolve: 'नाम हल किया जा रहा है',
  stage_chain: 'पुनर्निर्देशनों का अनुसरण',
  stage_headers: 'हेडर पढ़े जा रहे हैं',
  stage_csp: 'पॉलिसी खोली जा रही है',
  stage_cookies: 'कुकियाँ जाँची जा रही हैं',
  stage_protocols: 'प्रोटोकॉल तय किए जा रहे हैं',
  stage_grade: 'श्रेणी दी जा रही है',

  card_grade: 'श्रेणी का ब्योरा',
  card_chain: 'आगंतुक कैसे पहुँचते हैं',
  card_csp: 'कंटेंट सिक्योरिटी पॉलिसी',
  card_csp_directives: 'निर्देश',
  card_hsts: 'HSTS',
  card_cookies: 'कुकियाँ',
  card_headers: 'सुरक्षा हेडर',
  card_protocols: 'प्रोटोकॉल',
  card_other: 'अन्य हेडर',

  comp_transport: 'परिवहन',
  comp_csp: 'कंटेंट सिक्योरिटी पॉलिसी',
  comp_headers: 'अन्य हेडर',

  k_canonical: 'अंततः खुलता है',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'www के साथ http://',
  k_entry_https_www: 'www के साथ https://',
  k_csp_present: 'पॉलिसी',
  k_csp_enforced: 'लागू है',
  k_csp_directives: 'निर्धारित निर्देश',
  k_csp_nonce: 'nonce या हैश प्रयोग',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'हेडर',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'preload निर्देश',
  k_hsts_preloaded: 'Chromium की सूची में',
  k_hsts_eligible: 'प्रीलोड के योग्य',
  k_cookie_count: 'सेट की गई कुकियाँ',
  k_cookies_secure: 'सभी Secure के साथ',
  k_cookies_httponly: 'सभी HttpOnly के साथ',
  k_headers_present: 'मौजूद',
  k_alpn: 'तय हुआ (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'HTTP/3 की घोषणा',
  k_compression: 'संपीड़न',
  k_tls_protocol: 'TLS संस्करण',
  k_requests: 'भेजे गए अनुरोध',

  th_entry: 'प्रवेश-बिंदु',
  th_step: 'चरण',
  th_status: 'कोड',
  th_url: 'पता',
  th_time: 'समय',
  th_header: 'हेडर',
  th_value: 'मान',
  th_directive: 'निर्देश',
  th_sources: 'स्रोत',
  th_cookie: 'कुकी',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'सूची साथ नहीं आई',
  v_seconds_days: '{n} दिन',
  v_hops: '{n} पड़ाव',

  note_chain: 'निर्णायक बात http:// से पहला पड़ाव है: किसी और अनएन्क्रिप्टेड पते पर पुनर्निर्देशन अनुरोध को, कुकियों समेत, असुरक्षित नेटवर्क से गुज़ार देता है। पहले उसी होस्ट पर HTTPS पर भेजें और उसके बाद ही प्रामाणिक नाम पर।',
  note_csp: 'इनलाइन स्क्रिप्ट की अनुमति देने वाली पॉलिसी वह कुछ भी नहीं रोकती जो कोई घुसाई गई स्क्रिप्ट करेगी। nonce और हैश इसीलिए हैं कि ऐसी ज़रूरत कभी न पड़े — और जिस पॉलिसी में nonce और unsafe-inline दोनों हों, उसका अर्थ ब्राउज़रों की दो पीढ़ियों में दो अलग-अलग होता है।',
  note_hsts: 'preload निर्देश एक आवेदन है, कोई स्थिति नहीं। कोई साइट उसे वर्षों तक रखे रह सकती है और कभी आवेदन ही न किया हो, इसलिए यहाँ वही दिखाया गया है कि वह उस सूची में है या नहीं जो Chromium वास्तव में बाँटता है।',
  note_cookies: 'बाहर से केवल वही कुकियाँ दिखती हैं जो आगमन-पृष्ठ पर सेट होती हैं; लॉगिन के बाद जारी होने वाली सत्र-कुकी नहीं। __Host- उपसर्ग कुकी का इकलौता ऐसा संरक्षण है जिसे ब्राउज़र केवल मानता नहीं, बाध्य करता है।',
  note_protocols: 'HTTP/2 इस तरह मापा जाता है कि एक TLS हैंडशेक खोलकर देखा जाए कि सर्वर क्या चुनता है। HTTP/3 वैसे ही बताया जाता है जैसा Alt-Svc में घोषित है: यह जाँचकर्ता QUIC नहीं बोलता, और “नहीं” कहना गढ़ा हुआ परिणाम होता।',

  err_https_did_not_answer: 'साइट ने HTTPS पर उत्तर नहीं दिया।',

  inc_https_did_not_answer: 'साइट ने HTTPS पर उत्तर नहीं दिया, इसलिए पढ़ने को कोई हेडर ही नहीं था',

  cap_https_does_not_work: 'HTTPS काम नहीं करता',
  cap_certificate_not_trusted: 'प्रमाणपत्र सत्यापित नहीं होता',
  cap_certificate_not_trusted_on_alias: 'एक उपनाम ऐसा प्रमाणपत्र दिखाता है जो उसे नहीं ढकता',
  cap_http_is_served_as_is: 'पुनर्निर्देशित करने के बजाय अनएन्क्रिप्टेड HTTP परोसा जाता है',
  cap_csp_allows_inline_script: 'पॉलिसी इनलाइन स्क्रिप्ट की अनुमति देती है',
  cap_csp_allows_any_script: 'पॉलिसी किसी भी स्रोत से स्क्रिप्ट की अनुमति देती है',
  cap_csp_does_not_govern_script: 'पॉलिसी स्क्रिप्ट पर कोई नियंत्रण ही नहीं रखती',
  cap_first_hop_in_the_clear: 'पहला पुनर्निर्देशन अनएन्क्रिप्टेड HTTP पर ही रहता है',
  cap_cookie_rejected_by_browsers: 'एक कुकी जिसे ब्राउज़र अस्वीकार कर देंगे',
  cap_cors_misconfigured: 'CORS ऐसे विन्यस्त है जिसे ब्राउज़र ठुकरा देते हैं',
  cap_no_csp: 'कोई कंटेंट सिक्योरिटी पॉलिसी नहीं',
  cap_no_hsts: 'कोई HSTS नहीं',
  cap_no_framing_protection: 'साइट को फ़्रेम में डालने से कुछ भी नहीं रोकता',
  cap_csp_not_enforced: 'पॉलिसी केवल रिपोर्ट करती है',
  cap_cookie_without_secure: 'Secure के बिना एक कुकी',
  cap_csp_allows_data_urls: 'पॉलिसी data: में स्क्रिप्ट की अनुमति देती है',
  cap_obsolete_tls: 'TLS का पुराना संस्करण',
  cap_scan_incomplete: 'जाँच अधूरी रह गई, इसलिए कोई श्रेणी नहीं दी गई',

  flag_https_unreachable: 'साइट HTTPS पर उत्तर नहीं देती',
  fd_https_unreachable: 'न सादे नाम ने, न www ने पोर्ट 443 पर उत्तर दिया। आगे की हर बात इस पर टिकी है कि कोई पृष्ठ हो जिसके हेडर पढ़े जा सकें।',

  flag_redirect_loop: 'पुनर्निर्देशन चक्र में फँस जाते हैं',
  fd_redirect_loop: 'कोई एक प्रवेश-बिंदु आगंतुकों को गोल-गोल घुमाता है। ब्राउज़र दर्जन भर पड़ावों के बाद हार मानकर त्रुटि दिखा देते हैं।',

  flag_too_many_redirects: 'पुनर्निर्देशनों की लंबी शृंखला',
  fd_too_many_redirects: 'उतने पड़ाव जितने किसी को भी नहीं चाहिए। पृष्ठ के लदना शुरू होने से पहले ही हर पड़ाव एक आना-जाना है।',

  flag_http_not_served: 'अनएन्क्रिप्टेड HTTP परोसा ही नहीं जाता',
  fd_http_not_served: 'पोर्ट 80 कनेक्शन ठुकरा देता है। यह एक जायज़ और थोड़ा असुविधाजनक चुनाव है: जो सादा नाम टाइप करेगा उसे पुनर्निर्देशन के बजाय कनेक्शन त्रुटि मिलेगी।',

  flag_http_does_not_redirect: 'अनएन्क्रिप्टेड HTTP पुनर्निर्देशित करने के बजाय साइट परोसता है',
  fd_http_does_not_redirect: 'बिना एन्क्रिप्शन वाला पता आगंतुकों को HTTPS पर भेजने के बजाय पृष्ठ लौटाता है। वे जो कुछ भेजते हैं — और जो कुछ पढ़ते हैं — सब नेटवर्क के सामने खुला है।',

  flag_redirect_stays_on_http: 'पहला पुनर्निर्देशन अनएन्क्रिप्टेड HTTP पर ही रहता है',
  fd_redirect_stays_on_http: 'http:// एक और http:// पते पर भेजता है, इसलिए आगंतुक HTTPS तक पहुँचने से पहले कम-से-कम दो अनएन्क्रिप्टेड अनुरोध करता है, कुकियाँ साथ लगी हुई। पहले उसी होस्ट पर HTTPS पर भेजें, फिर प्रामाणिक नाम पर: एक पड़ाव अधिक लगेगा और यह दरार बंद हो जाएगी।',

  flag_redirect_changes_host_and_scheme: 'पहला पुनर्निर्देशन होस्ट और योजना दोनों एक साथ बदल देता है',
  fd_redirect_changes_host_and_scheme: 'गंतव्य सही है, और पहले उसी होस्ट पर योजना बदलना छेड़े गए पुनर्निर्देशन के सामने थोड़ा-सा अधिक सुरक्षित है। छोटी-सी बात।',

  flag_redirect_not_permanent: 'पुनर्निर्देशन स्थायी नहीं है',
  fd_redirect_not_permanent: '302 या 307 ब्राउज़र से कहता है कि इसे याद न रखे, सो हर बार आना उसी अनएन्क्रिप्टेड पड़ाव को दोहराता है। 301 या 308 का प्रयोग करें।',

  flag_certificate_not_trusted: 'प्रमाणपत्र सत्यापित नहीं होता',
  fd_certificate_not_trusted: 'जिस पते पर आगंतुक पहुँचते हैं उसका प्रमाणपत्र समय-समाप्त है, स्वयं-हस्ताक्षरित है, या उस नाम को नहीं ढकता। ब्राउज़र पूरे परदे की चेतावनी दिखाते हैं।',

  flag_certificate_not_trusted_on_alias: 'एक उपनाम ऐसा प्रमाणपत्र दिखाता है जो उसे नहीं ढकता',
  fd_certificate_not_trusted_on_alias: 'प्रामाणिक पता ठीक है और कोई दूसरा नाम — प्रायः www — प्रमाणपत्र के दायरे से बाहर है। curl और पुनर्निर्देशन चलते रहते हैं, इसलिए यह परीक्षणों से बच निकलता है और शिकायत केवल ब्राउज़र करते हैं।',

  flag_www_and_bare_both_serve: 'www और सादा नाम, दोनों साइट परोसते हैं',
  fd_www_and_bare_both_serve: 'कोई भी दूसरे पर नहीं भेजता, सो वही पृष्ठ दो पतों पर मौजूद हैं। इससे कुकियाँ, कैश और आने वाली कड़ियाँ बँट जाती हैं।',

  flag_csp_missing: 'कोई कंटेंट सिक्योरिटी पॉलिसी नहीं',
  fd_csp_missing: 'कुछ भी सीमित नहीं करता कि स्क्रिप्ट कहाँ से लदे या इनलाइन स्क्रिप्ट चल सके या नहीं। CSP इकलौता ऐसा हेडर है जो घुसपैठ रोकने की कोशिश करने के बजाय उसके नुक़सान को सीमित करता है।',

  flag_csp_report_only: 'पॉलिसी केवल रिपोर्ट करती है',
  fd_csp_report_only: 'Content-Security-Policy-Report-Only उल्लंघन बताती है, रोकती कुछ नहीं। पॉलिसी परखने का यही सही तरीक़ा है, और परख ख़त्म होने पर उसे वहीं छोड़ देना आसान है।',

  flag_csp_multiple_policies: 'एक से अधिक पॉलिसी लागू हैं',
  fd_csp_multiple_policies: 'लागू हर पॉलिसी गिनी जाती है, और परिणाम उनका प्रतिच्छेद होता है — किसी भी एक से अधिक कठोर। जब दूसरी किसी प्लगिन के साथ आई हो, तो यह लगभग कभी इरादा नहीं होता।',

  flag_csp_no_script_src: 'पॉलिसी स्क्रिप्ट पर नियंत्रण नहीं रखती',
  fd_csp_no_script_src: 'न script-src है न default-src, सो स्क्रिप्ट कहीं से भी लद सकती है। पॉलिसी दर्जन भर और निर्देश तय कर सकती है और फिर भी ठीक वही अनुमत रखती है जिसे रोकना था।',

  flag_csp_unsafe_inline: 'पॉलिसी इनलाइन स्क्रिप्ट की अनुमति देती है',
  fd_csp_unsafe_inline: 'unsafe-inline के साथ घुसाया गया <script> चल जाता है — ठीक वही हमला जिसे रोकने के लिए CSP है। nonce और हैश इसीलिए हैं कि ऐसी ज़रूरत कभी न पड़े।',

  flag_csp_unsafe_inline_with_nonce: 'nonce या हैश के साथ-साथ unsafe-inline',
  fd_csp_unsafe_inline_with_nonce: 'जो ब्राउज़र nonce समझता है वह unsafe-inline को अनदेखा कर देता है; जो नहीं समझता वह उसका पालन करता है। सो पॉलिसी पढ़ने वाले के अनुसार दो अलग अर्थ रखती है — और पुराना पाठ ही कमज़ोर वाला है। nonce जम जाने पर इसे हटा दें।',

  flag_csp_unsafe_eval: 'पॉलिसी eval की अनुमति देती है',
  fd_csp_unsafe_eval: 'unsafe-eval किसी स्ट्रिंग से कोड चलाने का रास्ता फिर खोल देता है, और घुसाई गई स्क्रिप्ट का बड़ा हिस्सा ठीक इसी तरह चलता है। प्रायः यह किसी फ़्रेमवर्क की माँग होती है, जिस पर दोबारा सोचना बनता है।',

  flag_csp_data_in_script_src: 'पॉलिसी data: में स्क्रिप्ट की अनुमति देती है',
  fd_csp_data_in_script_src: 'data: पता वह स्क्रिप्ट है जिसे हमलावर कहीं कुछ रखे बिना ही गढ़ सकता है। script-src में इस योजना की अनुमति स्रोतों की पूरी सूची को व्यर्थ कर देती है।',

  flag_csp_wildcard_script_src: 'पॉलिसी किसी भी स्रोत से स्क्रिप्ट की अनुमति देती है',
  fd_csp_wildcard_script_src: 'script-src में *, https: या http: है, जो हर स्रोत को स्वीकार कर लेता है। पॉलिसी सजावट भर है।',

  flag_csp_wildcard_host: 'पॉलिसी वाइल्डकार्ड वाले होस्ट की अनुमति देती है',
  fd_csp_wildcard_host: '*.example.com जैसा नमूना हर उपडोमेन पर भरोसा करता है — उन पर भी जो हाथ से निकल जाएँ या किसी तीसरे को सौंप दिए जाएँ।',

  flag_csp_bypassable_host: 'पॉलिसी ऐसे CDN की अनुमति देती है जिसे उसी के विरुद्ध मोड़ा जा सकता है',
  fd_csp_bypassable_host: 'कुछ बड़े CDN कोई भी लाइब्रेरी रखते हैं या ऐसे JSONP छोर देते हैं जो पुकारने वाले का दिया कॉलबैक नाम ज्यों का त्यों लौटा देते हैं। उनमें से एक की अनुमति देना लगभग किसी भी स्क्रिप्ट की अनुमति देना है। strict-dynamic, या निश्चित पथ बाँध देना, इसे बंद कर देता है।',

  flag_csp_short_nonce: 'nonce छोटा है',
  fd_csp_short_nonce: 'nonce का अनुमान लगाना असंभव होना चाहिए और हर उत्तर के लिए वह नया बनना चाहिए। छोटा अनुमान में आ जाता है; दोबारा इस्तेमाल किया हुआ न होने से भी बुरा है।',

  flag_csp_unsafe_inline_style: 'पॉलिसी इनलाइन शैलियों की अनुमति देती है',
  fd_csp_unsafe_inline_style: 'स्क्रिप्ट वाली इसी बात से कहीं हल्का मामला: इससे शैली के ज़रिये हमले और चयनकों से थोड़ा डेटा बाहर ले जाना संभव होता है, कोड चलाना नहीं।',

  flag_csp_object_src_not_none: 'object-src none नहीं है',
  fd_csp_object_src_not_none: '<object> और <embed> प्लगिन की सामग्री चलाते हैं और स्क्रिप्ट-पॉलिसी के इर्द-गिर्द जाना-पहचाना चक्कर हैं। लगभग किसी साइट को इनकी ज़रूरत नहीं; object-src \'none\' मुफ़्त है।',

  flag_csp_no_base_uri: 'base-uri निर्देश नहीं है',
  fd_csp_no_base_uri: 'इसके बिना घुसाया गया <base> टैग पृष्ठ के हर सापेक्ष पते को फिर से लिख देता है — उन स्क्रिप्ट-स्रोतों समेत जिन्हें पॉलिसी ने इतनी सावधानी से अनुमत किया था।',

  flag_csp_no_frame_ancestors: 'frame-ancestors निर्देश नहीं है',
  fd_csp_no_frame_ancestors: 'frame-ancestors X-Frame-Options का आधुनिक उत्तराधिकारी है और इकलौता तरीक़ा जिससे एक से अधिक स्रोत गिनाए जा सकें।',

  flag_csp_no_form_action: 'form-action निर्देश नहीं है',
  fd_csp_no_form_action: 'इसके बिना घुसाया गया फ़ॉर्म साख किसी दूसरे स्रोत को भेज सकता है।',

  flag_csp_no_reporting: 'पॉलिसी कहीं रिपोर्ट नहीं करती',
  fd_csp_no_reporting: 'report-uri या report-to के बिना उल्लंघन चुपचाप होते हैं — सो जो पॉलिसी चुपचाप साइट तोड़ रही हो, या चुपचाप तोड़ी जा रही हो, वह बिलकुल उसी जैसी दिखती है जो ठीक चल रही है।',

  flag_hsts_missing: 'कोई HSTS हेडर नहीं',
  fd_hsts_missing: 'Strict-Transport-Security के बिना, जब भी कोई आगंतुक सादा नाम टाइप करेगा, ब्राउज़र पहले अनएन्क्रिप्टेड HTTP आज़माएगा, और वह अनुरोध उसके किसी भी पुनर्निर्देशन को देखने से पहले ही बीच में पकड़ा जा सकता है।',

  flag_hsts_sent_over_http: 'HSTS अनएन्क्रिप्टेड HTTP पर भेजा जाता है',
  fd_hsts_sent_over_http: 'RFC 6797 §8.1 कहता है कि ब्राउज़र बिना एन्क्रिप्शन वाले उत्तर में इस हेडर को अनदेखा करते हैं। यह हानिरहित है और प्रायः इसका संकेत कि इसे ग़लत सर्वर-खंड में जोड़ा गया।',

  flag_hsts_no_max_age: 'HSTS हेडर में max-age नहीं है',
  fd_hsts_no_max_age: 'max-age अनिवार्य है। उसके बिना हेडर कुछ भी नहीं करता।',

  flag_hsts_max_age_zero: 'HSTS max-age=0 से बंद है',
  fd_hsts_max_age_zero: 'HSTS वापस लेने का यही सही तरीक़ा है, और बाहर से यह किसी चूक से अलग नहीं दिखता।',

  flag_hsts_max_age_short: 'HSTS की अवधि छोटी है',
  fd_hsts_max_age_short: 'एक वर्ष से कम। HSTS चढ़ाते समय छोटी खिड़की उचित है और प्रीलोड की माँग से नीचे रहती है।',

  flag_hsts_no_subdomains: 'HSTS उपडोमेन नहीं ढकता',
  fd_hsts_no_subdomains: 'includeSubDomains के बिना किसी उपडोमेन तक अब भी अनएन्क्रिप्टेड HTTP से पहुँचा जा सकता है — और कुकियाँ उपडोमेन से ही सेट होती हैं।',

  flag_hsts_preload_claimed_not_listed: 'preload निर्देश है और साइट सूची में नहीं',
  fd_hsts_preload_claimed_not_listed: 'preload शामिल होने का आवेदन है, कोई स्थिति नहीं। यह साइट उसे रखे हुए है और Chromium की बाँटी सूची में नहीं दिखती, जिसका प्रायः अर्थ है कि आवेदन कभी किया ही नहीं गया — जबकि सब संबंधित लोग इसे निपटा हुआ मान रहे हैं।',

  flag_hsts_listed_without_directive: 'प्रीलोड सूची में है, पर निर्देश नहीं',
  fd_hsts_listed_without_directive: 'साइट प्रीलोड हो चुकी है और अब माँग नहीं रही। सूची के अगले नवीनीकरण पर साइट ठीक इसी तरह बाहर हो जाती है।',

  flag_hsts_preload_not_eligible: 'हेडर प्रीलोड की शर्तें पूरी नहीं करता',
  fd_hsts_preload_not_eligible: 'प्रीलोड के लिए preload निर्देश के अलावा कम-से-कम एक वर्ष का max-age और includeSubDomains चाहिए।',

  flag_hsts_preload_list_not_bundled: 'इस संस्थापन के साथ प्रीलोड सूची नहीं आई',
  fd_hsts_preload_list_not_bundled: 'उपस्थिति जाँची नहीं जा सकी, इसलिए अनुमान लगाने के बजाय उसे अज्ञात बताया गया है। जोड़ने के लिए npm run preload:fetch चलाएँ।',

  flag_cookie_not_secure: 'एक कुकी Secure के बिना सेट होती है',
  fd_cookie_not_secure: 'Secure के बिना वह कुकी अनएन्क्रिप्टेड HTTP अनुरोधों के साथ भी जुड़ती है — कोई सत्र “हर जगह HTTPS” से बच निकलकर भी उसी इकलौते अनुरोध से रिस जाता है जो वहाँ तक नहीं पहुँचा।',

  flag_cookie_not_httponly: 'एक कुकी स्क्रिप्ट से पढ़ी जा सकती है',
  fd_cookie_not_httponly: 'HttpOnly के बिना घुसाई गई स्क्रिप्ट उस कुकी को पढ़ सकती है। कुछ कुकियाँ साइट की अपनी स्क्रिप्ट जानबूझकर पढ़ती है, इसलिए यह फ़ैसले से अधिक एक सवाल है।',

  flag_cookie_no_samesite: 'एक कुकी SameSite नीति घोषित नहीं करती',
  fd_cookie_no_samesite: 'ब्राउज़र अब चूक-रूप में Lax लगाते हैं, जो उसे घोषित करने के बराबर नहीं — और जिस कुकी को सचमुच None चाहिए उसे यह स्पष्ट कहना होगा, वरना वह काम करना बंद कर देगी।',

  flag_cookie_samesite_none_without_secure: 'Secure के बिना SameSite=None',
  fd_cookie_samesite_none_without_secure: 'हर मौजूदा ब्राउज़र इस मेल को सिरे से ठुकरा देता है, सो कुकी सेट होती ही नहीं। यह प्रायः ऐसे लॉगिन के रूप में सामने आता है जो चुपचाप बस चलता नहीं।',

  flag_cookie_prefix_violated: 'कुकी का उपसर्ग उसकी शर्तें पूरी किए बिना प्रयुक्त है',
  fd_cookie_prefix_violated: '__Host- के लिए Secure, कोई Domain नहीं और Path=/ चाहिए; __Secure- के लिए Secure चाहिए। नियम तोड़ने वाली कुकी को ब्राउज़र ठुकरा देता है, सो आगंतुकों के लिए वह कुकी है ही नहीं।',

  flag_cookie_very_long_lived: 'एक कुकी एक वर्ष से अधिक जीती है',
  fd_cookie_very_long_lived: 'लंबी उम्र वाली कुकी, यदि वह किसी की पहचान कराती है, तो लंबी उम्र वाली साख है।',

  flag_cookie_no_prefixes: 'कोई कुकी __Host- या __Secure- नहीं इस्तेमाल करती',
  fd_cookie_no_prefixes: 'उपसर्ग कुकी का इकलौता ऐसा संरक्षण हैं जिन्हें ब्राउज़र केवल मानते नहीं, बाध्य करते हैं: __Host- किसी उपडोमेन के लिए उस कुकी को ऊपर से लिखना असंभव कर देता है, जो Secure और HttpOnly मिलकर भी नहीं कर पाते।',

  flag_no_clickjacking_protection: 'साइट को फ़्रेम में डालने से कुछ भी नहीं रोकता',
  fd_no_clickjacking_protection: 'न X-Frame-Options, न कोई frame-ancestors निर्देश। पृष्ठ को किसी दूसरी साइट के भीतर अदृश्य रूप से लादकर वहाँ क्लिक बटोरे जा सकते हैं।',

  flag_framing_headers_disagree: 'फ़्रेम वाले दोनों हेडर अलग-अलग बात कहते हैं',
  fd_framing_headers_disagree: 'X-Frame-Options और frame-ancestors आपस में नहीं मिलते। ब्राउज़र frame-ancestors को तरजीह देते हैं, सो जो हेडर अधिक कठोर दिखता है ज़रूरी नहीं कि वही लागू हो।',

  flag_x_frame_options_allow_from: 'X-Frame-Options में ALLOW-FROM है',
  fd_x_frame_options_allow_from: 'ALLOW-FROM Chrome में कभी लागू ही नहीं हुआ और Firefox से हटा दिया गया, सो व्यवहार में वह किसी चीज़ से नहीं बचाता। उत्तराधिकारी frame-ancestors है।',

  flag_no_nosniff: 'X-Content-Type-Options नहीं है',
  fd_no_nosniff: 'nosniff के बिना ब्राउज़र किसी ऐसे उत्तर को स्क्रिप्ट मान सकता है जो और किसी रूप में परोसा गया था — और तब अपलोड का छोर स्क्रिप्ट रखने की जगह बन जाता है।',

  flag_nosniff_malformed: 'X-Content-Type-Options का मान अप्रत्याशित है',
  fd_nosniff_malformed: 'ब्राउज़र इकलौते जिस मान पर अमल करते हैं वह है “nosniff”। बाक़ी सब अनदेखा।',

  flag_no_referrer_policy: 'Referrer-Policy नहीं है',
  fd_no_referrer_policy: 'ब्राउज़र चूक-रूप में strict-origin-when-cross-origin लगाते हैं, जो समझदारी है — उसे घोषित कर देने से उस चूक-मान पर निर्भरता हट जाती है।',

  flag_referrer_policy_leaky: 'रेफ़रर नीति ज़रूरत से अधिक भेजती है',
  fd_referrer_policy_leaky: 'पूरा पता, पथ या प्रश्न-भाग में मौजूद हर पहचानकर्ता समेत, दूसरी साइटों को भेजा जाता है। unsafe-url इनमें सबसे बुरा है।',

  flag_no_permissions_policy: 'Permissions-Policy नहीं है',
  fd_no_permissions_policy: 'कैमरा, माइक्रोफ़ोन, स्थान और बाक़ी सब पृष्ठ के लिए और उसमें जड़ी हर चीज़ के लिए उपलब्ध बने रहते हैं। जो काम में नहीं आता उसे मना करना एक ही हेडर की बात है।',

  flag_feature_policy_superseded: 'Permissions-Policy के बिना Feature-Policy लगी है',
  fd_feature_policy_superseded: 'Feature-Policy का नाम बदल चुका है। मौजूदा ब्राउज़र केवल Permissions-Policy पढ़ते हैं।',

  flag_no_coop: 'Cross-Origin-Opener-Policy नहीं है',
  fd_no_coop: 'COOP पृष्ठ और उसके खोले हुए के बीच का विंडो-संदर्भ काट देता है, जिससे विंडो-दर-विंडो हमलों का पूरा कुनबा बंद हो जाता है, और यह क्रॉस-ऑरिजिन अलगाव की पूर्वशर्त भी है।',

  flag_no_corp: 'Cross-Origin-Resource-Policy नहीं है',
  fd_no_corp: 'CORP किसी उत्तर को यह अधिकार देता है कि वह दूसरी साइटों में जड़े जाने से इनकार कर दे। दस्तावेज़ों की तुलना में संसाधनों पर अधिक काम का है।',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection अब भी लगी है',
  fd_obsolete_x_xss_protection: 'जिस जाँचकर्ता को यह चलाती थी उसे वर्षों पहले ब्राउज़रों से हटा दिया गया — और जब तक वह रहा, अपनी ही कमज़ोरियाँ लेकर आया। अब यह हेडर कुछ नहीं करता।',

  flag_obsolete_expect_ct: 'Expect-CT अब भी लगी है',
  fd_obsolete_expect_ct: '2021 में वापस ले ली गई: प्रमाणपत्र पारदर्शिता अब सभी प्रमाणपत्रों के लिए अनिवार्य है, सो इस हेडर के पास माँगने को कुछ बचा ही नहीं।',

  flag_obsolete_p3p: 'P3P अब भी लगी है',
  fd_obsolete_p3p: '2002 की एक निजता-नीति भाषा जिसे केवल Internet Explorer पढ़ता था। एक दशक से कुछ भी उसकी ओर नहीं देखता।',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP अब भी लगी है',
  fd_obsolete_x_webkit_csp: 'मानक के जमने से पहले का उपसर्ग वाला CSP हेडर। कोई मौजूदा ब्राउज़र इसे नहीं पढ़ता।',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy अब भी लगी है',
  fd_obsolete_x_content_security_policy: 'Firefox का पुराना उपसर्ग, Firefox 23 से पुराना पड़ चुका।',

  flag_version_in_headers: 'हेडर सॉफ़्टवेयर और संस्करण बता देते हैं',
  fd_version_in_headers: 'छिपाने से कोई ठाना हुआ व्यक्ति नहीं रुकेगा, पर यह स्कैनर को ऐसी छननी ज़रूर दे देता है जिससे वह उस संस्करण वाले होस्ट चुन ले जिसमें ज्ञात दोष है। हेडर हटाना मुफ़्त है।',

  flag_duplicate_security_header: 'कोई सुरक्षा हेडर एक से अधिक बार भेजा जाता है',
  fd_duplicate_security_header: 'कौन-सी प्रति जीतेगी, इस पर ब्राउज़र आपस में असहमत हैं, और सुरक्षा हेडर के मामले में यही असहमति तय करती है कि पॉलिसी लागू है या नहीं। प्रायः यह दो परतें होती हैं जिनमें से हर एक अपनी जोड़ देती है।',

  flag_cors_wildcard: 'CORS किसी भी स्रोत की अनुमति देता है',
  fd_cors_wildcard: 'Access-Control-Allow-Origin * है। सार्वजनिक API के लिए यह सही है, और ऐसी हर चीज़ के लिए दोबारा देखने योग्य जो पूछने वाले के अनुसार अलग उत्तर देती हो।',

  flag_cors_wildcard_with_credentials: 'CORS साख के साथ किसी भी स्रोत की अनुमति देता है',
  fd_cors_wildcard_with_credentials: 'ब्राउज़र इस मेल को सिरे से ठुकरा देते हैं, सो यह छोर ढीला होने के साथ-साथ टूटा हुआ भी है। स्रोतों के नाम स्पष्ट रूप से गिनाएँ।',

  flag_no_http2: 'HTTP/2 तय नहीं होता',
  fd_no_http2: 'दोनों प्रस्तुत करने पर सर्वर ने HTTP/1.1 चुना। HTTP/2 प्रायः उपलब्ध सबसे सस्ता प्रदर्शन-सुधार है, और जब तक कोई देखे नहीं, वह अदृश्य रहता है।',

  flag_no_http3_advertised: 'HTTP/3 की घोषणा नहीं है',
  fd_no_http3_advertised: 'h3 देने वाला कोई Alt-Svc हेडर नहीं। यह कोई दोष नहीं — और जानने योग्य है, क्योंकि HTTP/3 सबसे अधिक मोबाइल नेटवर्कों पर काम आता है, जिन्हें परखना सबसे कठिन है।',

  flag_no_compression: 'उत्तर संपीड़ित नहीं होता',
  fd_no_compression: 'gzip, br और zstd तीनों प्रस्तुत करने पर भी कुछ संपीड़ित नहीं हुआ। HTML पर यह प्रायः बड़ी और मुफ़्त बचत होती है।',

  flag_only_legacy_compression: 'केवल gzip या deflate प्रस्तुत है',
  fd_only_legacy_compression: 'Brotli और zstd पाठ को स्पष्ट रूप से बेहतर सिकोड़ते हैं और सभी मौजूदा ब्राउज़र उन्हें समझते हैं।',

  flag_legacy_tls: 'TLS का पुराना संस्करण तय होता है',
  fd_legacy_tls: 'TLS 1.0 और 1.1 RFC 8996 से पुराने पड़ चुके हैं और मौजूदा ब्राउज़र उन्हें ठुकरा देते हैं।',
};

OWN.ar = {
  title: 'فحص الترويسات — CSP وHSTS والكوكيز وسلسلة التحويلات',
  title_short: 'فحص الترويسات',
  h1: 'فحص الترويسات',
  subtitle: 'سلسلة التحويلات من المداخل الأربعة جميعها، وسياسة أمان المحتوى مفكَّكة توجيهًا توجيهًا، والعضوية الفعلية في قائمة التحميل المسبق لـ HSTS بدل مجرد الادعاء',
  ph_host: 'example.com',
  hero_label: 'الموقع المفحوص',
  empty_hint: 'أدخل اسم نطاق. يتتبع الفحص سلسلة التحويلات من http ومن https، مع www وبدونها، ثم يقرأ ترويسات الصفحة التي يصل إليها الزائر فعلًا. وتُفكَّك سياسة أمان المحتوى توجيهًا توجيهًا، لأنها الترويسة التي يصعب ضبطها على الوجه الصحيح.',

  stage_resolve: 'يُحلّ الاسم',
  stage_chain: 'تُتتبَّع التحويلات',
  stage_headers: 'تُقرأ الترويسات',
  stage_csp: 'تُفكَّك السياسة',
  stage_cookies: 'تُفحص الكوكيز',
  stage_protocols: 'يُتفاوض على البروتوكولات',
  stage_grade: 'يُحتسب التقدير',

  card_grade: 'تفصيل التقدير',
  card_chain: 'كيف يصل الزوار',
  card_csp: 'سياسة أمان المحتوى',
  card_csp_directives: 'التوجيهات',
  card_hsts: 'HSTS',
  card_cookies: 'الكوكيز',
  card_headers: 'ترويسات الأمان',
  card_protocols: 'البروتوكولات',
  card_other: 'ترويسات أخرى',

  comp_transport: 'النقل',
  comp_csp: 'سياسة أمان المحتوى',
  comp_headers: 'ترويسات أخرى',

  k_canonical: 'ينتهي إلى',
  k_entry_http: 'http://',
  k_entry_https: 'https://',
  k_entry_http_www: 'http:// مع www',
  k_entry_https_www: 'https:// مع www',
  k_csp_present: 'السياسة',
  k_csp_enforced: 'مُطبَّقة',
  k_csp_directives: 'التوجيهات المضبوطة',
  k_csp_nonce: 'تستعمل nonce أو بصمات',
  k_csp_strict_dynamic: 'strict-dynamic',
  k_csp_script_src: 'script-src',
  k_hsts_present: 'الترويسة',
  k_hsts_maxage: 'max-age',
  k_hsts_subdomains: 'includeSubDomains',
  k_hsts_preload_directive: 'توجيه preload',
  k_hsts_preloaded: 'في قائمة Chromium',
  k_hsts_eligible: 'مؤهَّل للتحميل المسبق',
  k_cookie_count: 'الكوكيز المضبوطة',
  k_cookies_secure: 'كلها بـ Secure',
  k_cookies_httponly: 'كلها بـ HttpOnly',
  k_headers_present: 'موجودة',
  k_alpn: 'المتفاوَض عليه (ALPN)',
  k_http2: 'HTTP/2',
  k_http3: 'إعلان HTTP/3',
  k_compression: 'الضغط',
  k_tls_protocol: 'إصدار TLS',
  k_requests: 'الطلبات المرسلة',

  th_entry: 'نقطة الدخول',
  th_step: 'الخطوة',
  th_status: 'الرمز',
  th_url: 'العنوان',
  th_time: 'الزمن',
  th_header: 'الترويسة',
  th_value: 'القيمة',
  th_directive: 'التوجيه',
  th_sources: 'المصادر',
  th_cookie: 'الكوكي',
  th_secure: 'Secure',
  th_httponly: 'HttpOnly',
  th_samesite: 'SameSite',

  entry_http: 'http://',
  entry_https: 'https://',
  entry_http_www: 'http:// www',
  entry_https_www: 'https:// www',
  v_not_bundled: 'القائمة غير مرفقة',
  v_seconds_days: '{n} يومًا',
  v_hops: '{n} قفزات',

  note_chain: 'المهم هو القفزة الأولى من http://: التحويل إلى عنوان آخر غير مشفَّر يمرّر الطلب، بكوكيزه، عبر شبكة غير محمية. حوّل أولًا إلى HTTPS على المضيف نفسه، وبعدها فقط إلى الاسم المعياري.',
  note_csp: 'السياسة التي تسمح بالسكربت المضمَّن لا توقف شيئًا مما يفعله سكربت مدسوس. وُجدت الـ nonce والبصمات تحديدًا كي لا يحتاج أحد إلى ذلك أبدًا — وسياسة تحمل nonce وunsafe-inline معًا تعني شيئين مختلفين في جيلين من المتصفحات.',
  note_hsts: 'توجيه preload طلبُ إدراج لا حالة قائمة. قد يحمله موقع سنوات دون أن يُقدَّم قط، ولذلك يُعرض هنا وجوده في القائمة التي يوزّعها Chromium فعلًا.',
  note_cookies: 'لا يُرى من الخارج إلا الكوكيز التي تُضبط في صفحة الوصول، لا كوكي جلسة تُصدَر بعد تسجيل الدخول. وبادئة __Host- هي الحماية الوحيدة للكوكيز التي يفرضها المتصفح بدل أن يحترمها فحسب.',
  note_protocols: 'يُقاس HTTP/2 بفتح مصافحة TLS ومراقبة ما يختاره الخادم. أما HTTP/3 فيُبلَّغ عنه كما هو معلن في Alt-Svc: هذا الفاحص لا يتحدث QUIC، وقول «لا» سيكون اختلاق نتيجة.',

  err_https_did_not_answer: 'لم يستجب الموقع عبر HTTPS.',

  inc_https_did_not_answer: 'لم يستجب الموقع عبر HTTPS، فلم تكن هناك ترويسات تُقرأ',

  cap_https_does_not_work: 'HTTPS لا يعمل',
  cap_certificate_not_trusted: 'الشهادة لا تجتاز التحقق',
  cap_certificate_not_trusted_on_alias: 'اسم بديل يقدّم شهادة لا تغطيه',
  cap_http_is_served_as_is: 'يُقدَّم HTTP غير المشفَّر بدل التحويل',
  cap_csp_allows_inline_script: 'السياسة تسمح بالسكربت المضمَّن',
  cap_csp_allows_any_script: 'السياسة تسمح بسكربت من أي أصل',
  cap_csp_does_not_govern_script: 'السياسة لا تحكم السكربت أصلًا',
  cap_first_hop_in_the_clear: 'التحويل الأول يبقى على HTTP غير مشفَّر',
  cap_cookie_rejected_by_browsers: 'كوكي سترفضه المتصفحات',
  cap_cors_misconfigured: 'CORS مضبوط بصورة ترفضها المتصفحات',
  cap_no_csp: 'لا سياسة أمان محتوى',
  cap_no_hsts: 'لا HSTS',
  cap_no_framing_protection: 'لا شيء يمنع تضمين الموقع في إطار',
  cap_csp_not_enforced: 'السياسة للإبلاغ فقط',
  cap_cookie_without_secure: 'كوكي بلا Secure',
  cap_csp_allows_data_urls: 'السياسة تسمح بسكربت في data:',
  cap_obsolete_tls: 'إصدار TLS مهجور',
  cap_scan_incomplete: 'بقي الفحص ناقصًا، فلم يُمنح تقدير',

  flag_https_unreachable: 'الموقع لا يستجيب عبر HTTPS',
  fd_https_unreachable: 'لم يستجب الاسم المجرد ولا www على المنفذ 443. وكل ما يلي متوقف على وجود صفحة تُقرأ ترويساتها.',

  flag_redirect_loop: 'التحويلات تدور في حلقة',
  fd_redirect_loop: 'أحد المداخل يدور بالزوار في دائرة. تستسلم المتصفحات بعد نحو اثنتي عشرة قفزة وتعرض خطأ.',

  flag_too_many_redirects: 'سلسلة تحويلات طويلة',
  fd_too_many_redirects: 'قفزات أكثر مما يحتاجه أيٌّ منها. كل قفزة ذهاب وإياب قبل أن تبدأ الصفحة بالتحميل أصلًا.',

  flag_http_not_served: 'لا يُقدَّم HTTP غير المشفَّر إطلاقًا',
  fd_http_not_served: 'المنفذ 80 يرفض الاتصالات. خيار مشروع ومربك بعض الشيء: من يكتب الاسم المجرد يحصل على خطأ اتصال بدل تحويل.',

  flag_http_does_not_redirect: 'HTTP غير المشفَّر يقدّم الموقع بدل التحويل',
  fd_http_does_not_redirect: 'العنوان غير المشفَّر يعيد صفحة بدل أن يرسل الزوار إلى HTTPS. فكل ما يرسلونه — وكل ما يقرؤونه — مكشوف للشبكة.',

  flag_redirect_stays_on_http: 'التحويل الأول يبقى على HTTP غير مشفَّر',
  fd_redirect_stays_on_http: 'يحوّل http:// إلى عنوان http:// آخر، فيرسل الزائر طلبين غير مشفَّرين على الأقل بكوكيزهما قبل أن يبلغ HTTPS. حوّل أولًا إلى HTTPS على المضيف نفسه ثم إلى الاسم المعياري: تكلفتها قفزة إضافية وتسدّ هذه الثغرة.',

  flag_redirect_changes_host_and_scheme: 'التحويل الأول يغيّر المضيف والمخطط معًا',
  fd_redirect_changes_host_and_scheme: 'الوجهة صحيحة، وتغيير المخطط أولًا على المضيف نفسه أسلم قليلًا في وجه تحويل مُتلاعَب به. تفصيل صغير.',

  flag_redirect_not_permanent: 'التحويل غير دائم',
  fd_redirect_not_permanent: 'يقول 302 أو 307 للمتصفح ألّا يتذكره، فتعيد كل زيارة القفزة غير المشفَّرة. استعمل 301 أو 308.',

  flag_certificate_not_trusted: 'الشهادة لا تجتاز التحقق',
  fd_certificate_not_trusted: 'شهادة العنوان الذي يصل إليه الزوار منتهية الصلاحية أو موقَّعة ذاتيًا أو لا تغطي الاسم. تعرض المتصفحات تحذيرًا يملأ الشاشة.',

  flag_certificate_not_trusted_on_alias: 'اسم بديل يقدّم شهادة لا تغطيه',
  fd_certificate_not_trusted_on_alias: 'العنوان المعياري سليم، واسم آخر — www عادةً — خارج تغطية الشهادة. ويظل curl والتحويل يعملان، فينجو هذا من الاختبارات ولا يشتكي منه إلا المتصفحات.',

  flag_www_and_bare_both_serve: 'www والاسم المجرد كلاهما يقدّم الموقع',
  fd_www_and_bare_both_serve: 'لا يحوّل أحدهما إلى الآخر، فالصفحات نفسها موجودة على عنوانين. وهذا يشطر الكوكيز والذواكر المؤقتة والروابط الواردة.',

  flag_csp_missing: 'لا سياسة أمان محتوى',
  fd_csp_missing: 'لا شيء يقيّد من أين يُحمَّل السكربت ولا إن كان السكربت المضمَّن يستطيع العمل. وCSP هي الترويسة الوحيدة التي تحدّ من ضرر الحقن بدل أن تحاول منعه.',

  flag_csp_report_only: 'السياسة للإبلاغ فقط',
  fd_csp_report_only: 'تبلّغ Content-Security-Policy-Report-Only عن المخالفات ولا تمنع شيئًا. هذه هي الطريقة الصحيحة لتجريب سياسة، ومن السهل تركها بعد انتهاء التجريب.',

  flag_csp_multiple_policies: 'أكثر من سياسة واحدة مطبَّقة',
  fd_csp_multiple_policies: 'كل سياسة مطبَّقة نافذة، والنتيجة تقاطعها — أشد من أيٍّ منها. ونادرًا ما يكون هذا هو المقصود حين تأتي الثانية مع إضافة برمجية.',

  flag_csp_no_script_src: 'السياسة لا تحكم السكربت',
  fd_csp_no_script_src: 'لا script-src ولا default-src مضبوطة، فالسكربت يمكن تحميله من أي مكان. وقد تضبط السياسة عشرات التوجيهات الأخرى وتظل تسمح بالضبط بما كان عليها منعه.',

  flag_csp_unsafe_inline: 'السياسة تسمح بالسكربت المضمَّن',
  fd_csp_unsafe_inline: 'مع unsafe-inline يعمل أي <script> مدسوس — وهو بعينه الهجوم الذي وُجدت CSP لإيقافه. وُجدت الـ nonce والبصمات تحديدًا كي لا يُحتاج إلى ذلك أبدًا.',

  flag_csp_unsafe_inline_with_nonce: 'unsafe-inline إلى جانب nonce أو بصمة',
  fd_csp_unsafe_inline_with_nonce: 'المتصفح الذي يفهم الـ nonce يتجاهل unsafe-inline، والذي لا يفهمها يطيعها. فالسياسة تعني إذن شيئين مختلفين بحسب القارئ — والقراءة القديمة هي الضعيفة. وما إن تستقر الـ nonce، احذفها.',

  flag_csp_unsafe_eval: 'السياسة تسمح بـ eval',
  fd_csp_unsafe_eval: 'يعيد unsafe-eval فتح تنفيذ الشيفرة من نص، وهكذا يعمل جزء كبير من السكربت المدسوس. وغالبًا ما يكون مطلبًا لإطار عمل يستحق إعادة النظر.',

  flag_csp_data_in_script_src: 'السياسة تسمح بسكربت في data:',
  fd_csp_data_in_script_src: 'عنوان data: سكربتٌ يستطيع المهاجم تركيبه دون استضافة شيء في أي مكان. والسماح بهذا المخطط في script-src يُبطل قائمة الأصول كلها.',

  flag_csp_wildcard_script_src: 'السياسة تسمح بسكربت من أي أصل',
  fd_csp_wildcard_script_src: 'يتضمن script-src الرمز * أو https: أو http:، وهو ما يقبل أي أصل. السياسة زينة.',

  flag_csp_wildcard_host: 'السياسة تسمح بمضيف بحرف بدل',
  fd_csp_wildcard_host: 'نمط مثل *.example.com يثق بكل نطاق فرعي، بما فيه أي نطاق يضيع أو يُسلَّم إلى طرف ثالث.',

  flag_csp_bypassable_host: 'السياسة تسمح بشبكة توصيل يمكن قلبها عليها',
  fd_csp_bypassable_host: 'بعض شبكات التوصيل الكبرى تستضيف مكتبات كيفما اتفق أو تتيح نقاط JSONP تعيد اسم الاستدعاء الذي يمرره الطالب. والسماح بواحدة منها يكاد يكون سماحًا بأي سكربت. ويسدّ ذلك strict-dynamic أو تثبيت مسارات بعينها.',

  flag_csp_short_nonce: 'الـ nonce قصيرة',
  fd_csp_short_nonce: 'يجب أن تكون الـ nonce غير قابلة للتخمين وأن تُولَّد من جديد مع كل استجابة. القصيرة تُخمَّن، والمعاد استعمالها أسوأ من عدمها.',

  flag_csp_unsafe_inline_style: 'السياسة تسمح بالأنماط المضمَّنة',
  fd_csp_unsafe_inline_style: 'أهون بكثير من نظيرها في السكربت: تتيح هجمات عبر الأنماط وقدرًا من تسريب البيانات بالمحدِّدات، لا تنفيذ شيفرة.',

  flag_csp_object_src_not_none: 'object-src ليست none',
  fd_csp_object_src_not_none: 'ينفّذ <object> و<embed> محتوى الإضافات، وهما التفاف معروف حول سياسة السكربت. ولا يكاد موقع يحتاجهما؛ وobject-src \'none\' بلا تكلفة.',

  flag_csp_no_base_uri: 'لا توجيه base-uri',
  fd_csp_no_base_uri: 'بدونه يعيد وسم <base> مدسوس كتابة كل عنوان نسبي في الصفحة — بما في ذلك مصادر السكربت التي سمحت بها السياسة بكل هذه العناية.',

  flag_csp_no_frame_ancestors: 'لا توجيه frame-ancestors',
  fd_csp_no_frame_ancestors: 'frame-ancestors هو البديل الحديث لـ X-Frame-Options، والوحيد الذي يستطيع تسمية أكثر من أصل.',

  flag_csp_no_form_action: 'لا توجيه form-action',
  fd_csp_no_form_action: 'بدونه يستطيع نموذج مدسوس إرسال بيانات الاعتماد إلى أصل آخر.',

  flag_csp_no_reporting: 'السياسة لا تبلّغ أي جهة',
  fd_csp_no_reporting: 'بلا report-uri أو report-to تكون المخالفات صامتة — فتبدو السياسة التي تكسر الموقع بصمت، أو التي تُخترق بصمت، مطابقة تمامًا لسياسة تعمل كما ينبغي.',

  flag_hsts_missing: 'لا ترويسة HSTS',
  fd_hsts_missing: 'بلا Strict-Transport-Security سيجرّب المتصفح HTTP غير المشفَّر أولًا في كل مرة يكتب فيها زائر الاسم المجرد، وهذا الطلب يمكن اعتراضه قبل أن يرى أي تحويل.',

  flag_hsts_sent_over_http: 'تُرسَل HSTS عبر HTTP غير مشفَّر',
  fd_hsts_sent_over_http: 'ينص RFC 6797 §8.1 على أن المتصفحات تتجاهل الترويسة في استجابة غير مشفَّرة. الأمر غير ضار، ويدل عادةً على أنها أُضيفت إلى كتلة الخادم الخطأ.',

  flag_hsts_no_max_age: 'ترويسة HSTS بلا max-age',
  fd_hsts_no_max_age: 'max-age إلزامي. وبدونه لا تفعل الترويسة شيئًا البتة.',

  flag_hsts_max_age_zero: 'HSTS مُعطَّلة بـ max-age=0',
  fd_hsts_max_age_zero: 'هذه هي الطريقة الصحيحة لسحب HSTS، ولا يمكن تمييزها من الخارج عن الخطأ غير المقصود.',

  flag_hsts_max_age_short: 'عمر HSTS قصير',
  fd_hsts_max_age_short: 'أقل من سنة. النافذة القصيرة مناسبة أثناء طرح HSTS، وهي دون ما يشترطه التحميل المسبق.',

  flag_hsts_no_subdomains: 'HSTS لا تغطي النطاقات الفرعية',
  fd_hsts_no_subdomains: 'بلا includeSubDomains لا يزال الوصول إلى نطاق فرعي ممكنًا عبر HTTP غير مشفَّر — ومن النطاق الفرعي تُضبط الكوكيز.',

  flag_hsts_preload_claimed_not_listed: 'توجيه preload موجود والموقع ليس في القائمة',
  fd_hsts_preload_claimed_not_listed: 'preload طلبُ إدراج لا حالة قائمة. هذا الموقع يحمله ولا يظهر في القائمة التي يوزّعها Chromium، وهذا يعني عادةً أن أحدًا لم يقدّم الطلب قط — بينما يحسب كل المعنيين الأمر منتهيًا.',

  flag_hsts_listed_without_directive: 'في قائمة التحميل المسبق بلا التوجيه',
  fd_hsts_listed_without_directive: 'الموقع محمَّل مسبقًا ولم يعد يطلب ذلك. وهكذا بالضبط يسقط موقع من القائمة عند التحديث التالي.',

  flag_hsts_preload_not_eligible: 'الترويسة لا تستوفي شروط التحميل المسبق',
  fd_hsts_preload_not_eligible: 'يشترط التحميل المسبق max-age لسنة على الأقل مع includeSubDomains، إضافةً إلى توجيه preload نفسه.',

  flag_hsts_preload_list_not_bundled: 'قائمة التحميل المسبق غير مرفقة بهذا التركيب',
  fd_hsts_preload_list_not_bundled: 'تعذّر التحقق من العضوية، فأُبلغ عنها مجهولةً بدل تخمينها. شغّل npm run preload:fetch لإضافتها.',

  flag_cookie_not_secure: 'كوكي تُضبط بلا Secure',
  fd_cookie_not_secure: 'بلا Secure تُرفق الكوكي بطلبات HTTP غير المشفَّرة أيضًا — وهكذا تنجو جلسة من «HTTPS في كل مكان» ثم تتسرب مع ذلك في الطلب الوحيد الذي لم يبلغه.',

  flag_cookie_not_httponly: 'كوكي يمكن للسكربت قراءتها',
  fd_cookie_not_httponly: 'بلا HttpOnly يستطيع سكربت مدسوس قراءة الكوكي. وبعض الكوكيز يقرؤها سكربت الموقع نفسه عن قصد، فهذا سؤال أكثر منه حكمًا.',

  flag_cookie_no_samesite: 'كوكي لا تعلن سياسة SameSite',
  fd_cookie_no_samesite: 'تعتمد المتصفحات اليوم Lax افتراضيًا، وهذا غير إعلانها — والكوكي التي تحتاج None فعلًا عليها أن تقولها صراحةً وإلا توقفت عن العمل.',

  flag_cookie_samesite_none_without_secure: 'SameSite=None بلا Secure',
  fd_cookie_samesite_none_without_secure: 'يرفض كل متصفح حديث هذا الجمع رفضًا تامًا، فلا تُضبط الكوكي إطلاقًا. ويظهر ذلك عادةً على هيئة تسجيل دخول لا يعمل بلا أي بيان.',

  flag_cookie_prefix_violated: 'بادئة كوكي مستعملة دون استيفاء شروطها',
  fd_cookie_prefix_violated: 'تشترط __Host- وجود Secure وغياب Domain وPath=/؛ وتشترط __Secure- وجود Secure. ويرفض المتصفح الكوكي التي تخالف القاعدة، فهي بالنسبة إلى الزوار غير موجودة أصلًا.',

  flag_cookie_very_long_lived: 'كوكي تعيش أكثر من سنة',
  fd_cookie_very_long_lived: 'الكوكي الطويلة العمر بيانُ اعتماد طويل العمر، إن كانت تعرّف شخصًا.',

  flag_cookie_no_prefixes: 'لا كوكي تستعمل __Host- أو __Secure-',
  fd_cookie_no_prefixes: 'البوادئ هي الحماية الوحيدة للكوكيز التي تفرضها المتصفحات بدل أن تحترمها فحسب: تجعل __Host- من المستحيل على نطاق فرعي أن يكتب فوق الكوكي، وهو ما لا يبلغه Secure وHttpOnly مجتمعين.',

  flag_no_clickjacking_protection: 'لا شيء يمنع تضمين الموقع في إطار',
  fd_no_clickjacking_protection: 'لا X-Frame-Options ولا توجيه frame-ancestors. ويمكن تحميل الصفحة خفيةً داخل موقع آخر والتقاط النقرات عليها.',

  flag_framing_headers_disagree: 'ترويستا الإطار تقولان أمرين مختلفين',
  fd_framing_headers_disagree: 'X-Frame-Options وframe-ancestors غير متطابقتين. وتفضّل المتصفحات frame-ancestors، فالترويسة التي تبدو أشد قد لا تكون النافذة.',

  flag_x_frame_options_allow_from: 'X-Frame-Options تستعمل ALLOW-FROM',
  fd_x_frame_options_allow_from: 'لم تُنفَّذ ALLOW-FROM في Chrome قط وأُزيلت من Firefox، فهي عمليًا لا تحمي من شيء. والبديل هو frame-ancestors.',

  flag_no_nosniff: 'لا X-Content-Type-Options',
  fd_no_nosniff: 'بلا nosniff قد يخمّن المتصفح أن استجابةً ما سكربت وهي قُدِّمت بنوع آخر — فتتحول نقطة رفع الملفات إلى مستضيف سكربتات.',

  flag_nosniff_malformed: 'قيمة X-Content-Type-Options غير متوقعة',
  fd_nosniff_malformed: 'القيمة الوحيدة التي تتصرف المتصفحات بناءً عليها هي «nosniff». وما عداها يُتجاهل.',

  flag_no_referrer_policy: 'لا Referrer-Policy',
  fd_no_referrer_policy: 'تعتمد المتصفحات strict-origin-when-cross-origin افتراضيًا، وهو معقول — وإعلانه يزيل الاعتماد على ذلك الافتراض.',

  flag_referrer_policy_leaky: 'سياسة المُحيل ترسل أكثر مما يلزم',
  fd_referrer_policy_leaky: 'يُرسَل العنوان كاملًا، بما فيه أي معرّف في المسار أو الاستعلام، إلى مواقع أخرى. وunsafe-url أسوأ هذه الحالات.',

  flag_no_permissions_policy: 'لا Permissions-Policy',
  fd_no_permissions_policy: 'تبقى الكاميرا والميكروفون والموقع الجغرافي وسائرها متاحة للصفحة ولكل ما تضمّنه. ومنع ما لا يُستعمل ترويسة واحدة لا غير.',

  flag_feature_policy_superseded: 'Feature-Policy مضبوطة بلا Permissions-Policy',
  fd_feature_policy_superseded: 'أُعيدت تسمية Feature-Policy. والمتصفحات الحديثة لا تقرأ إلا Permissions-Policy.',

  flag_no_coop: 'لا Cross-Origin-Opener-Policy',
  fd_no_coop: 'تقطع COOP مرجع النافذة بين الصفحة وما تفتحه، وهو ما يغلق عائلة كاملة من الهجمات بين النوافذ، وهي شرط مسبق للعزل بين الأصول.',

  flag_no_corp: 'لا Cross-Origin-Resource-Policy',
  fd_no_corp: 'تتيح CORP للاستجابة أن ترفض تضمينها في مواقع أخرى. وهي أنفع على الموارد منها على المستندات.',

  flag_obsolete_x_xss_protection: 'X-XSS-Protection لا تزال مضبوطة',
  fd_obsolete_x_xss_protection: 'أُزيل المدقّق الذي كانت تتحكم به من المتصفحات قبل سنوات — وما دام موجودًا كان يجلب ثغرات خاصة به. والترويسة اليوم لا تفعل شيئًا.',

  flag_obsolete_expect_ct: 'Expect-CT لا تزال مضبوطة',
  fd_obsolete_expect_ct: 'سُحبت سنة 2021: شفافية الشهادات مطلوبة اليوم من كل الشهادات، فلم يبق للترويسة ما تطلبه.',

  flag_obsolete_p3p: 'P3P لا تزال مضبوطة',
  fd_obsolete_p3p: 'لغة سياسة خصوصية من سنة 2002 لم يقرأها إلا Internet Explorer. ولم ينظر إليها شيء منذ عقد.',

  flag_obsolete_x_webkit_csp: 'X-WebKit-CSP لا تزال مضبوطة',
  fd_obsolete_x_webkit_csp: 'ترويسة CSP ببادئة، من قبل استقرار المعيار. ولا يقرؤها متصفح حديث.',

  flag_obsolete_x_content_security_policy: 'X-Content-Security-Policy لا تزال مضبوطة',
  fd_obsolete_x_content_security_policy: 'بادئة Firefox القديمة، مهجورة منذ Firefox 23.',

  flag_version_in_headers: 'الترويسات تسمّي البرنامج وإصداره',
  fd_version_in_headers: 'إخفاؤه لا يوقف عازمًا، لكنه يمنح الماسح فعلًا معيارًا لتصفية المضيفات ذات الإصدار الذي فيه ثغرة معروفة. وحذف الترويسة بلا تكلفة.',

  flag_duplicate_security_header: 'ترويسة أمان تُرسَل أكثر من مرة',
  fd_duplicate_security_header: 'تختلف المتصفحات في أي نسخة تغلب، ومع ترويسة أمان يقرّر هذا الاختلاف إن كانت السياسة نافذة أم لا. وهما عادةً طبقتان تضيف كل منهما نسختها.',

  flag_cors_wildcard: 'CORS يسمح بأي أصل',
  fd_cors_wildcard: 'قيمة Access-Control-Allow-Origin هي *. وهذا صحيح لواجهة برمجية عامة، وجدير بنظرة ثانية في كل ما يجيب إجابات مختلفة بحسب السائل.',

  flag_cors_wildcard_with_credentials: 'CORS يسمح بأي أصل مع بيانات الاعتماد',
  fd_cors_wildcard_with_credentials: 'ترفض المتصفحات هذا الجمع رفضًا تامًا، فالنقطة معطوبة ومفرطة التساهل معًا. سمِّ الأصول صراحةً.',

  flag_no_http2: 'لا يُتفاوض على HTTP/2',
  fd_no_http2: 'اختار الخادم HTTP/1.1 وقد عُرض عليه الاثنان. وHTTP/2 غالبًا أرخص تحسين أداء متاح، ويبقى غير مرئي حتى ينظر أحد.',

  flag_no_http3_advertised: 'لا إعلان لـ HTTP/3',
  fd_no_http3_advertised: 'لا ترويسة Alt-Svc تعرض h3. وليس هذا عيبًا — لكنه جدير بالمعرفة، إذ ينفع HTTP/3 قبل كل شيء في شبكات الهاتف، وهي أصعب ما يُختبر.',

  flag_no_compression: 'الاستجابة غير مضغوطة',
  fd_no_compression: 'لم يُضغط شيء رغم عرض gzip وbr وzstd جميعًا. وفي HTML يكون هذا عادةً توفيرًا كبيرًا ومجانيًا.',

  flag_only_legacy_compression: 'لا يُعرض إلا gzip أو deflate',
  fd_only_legacy_compression: 'يضغط Brotli وzstd النص أفضل بوضوح، وتدعمهما كل المتصفحات الحديثة.',

  flag_legacy_tls: 'يُتفاوض على إصدار TLS مهجور',
  fd_legacy_tls: 'هُجر TLS 1.0 و1.1 بموجب RFC 8996 وترفضهما المتصفحات الحديثة.',
};

window.I18N = window.mergeI18N(OWN);
