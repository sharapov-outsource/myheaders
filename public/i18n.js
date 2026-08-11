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
  fd_redirect_stays_on_http: 'http:// перенаправляет на другой адрес http://, поэтому посетитель делает как минимум два незашифрованных запроса вместе со своими куками, прежде чем добраться до HTTPS. Сначала переводите на HTTPS того же хоста, потом на каноническое имя — это стоит одного лишнего перехода и закрывает щель.',

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

window.I18N = window.mergeI18N(OWN);
