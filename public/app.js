/**
 * myheaders client.
 *
 * A check takes a few seconds and around fifty queries, so the page opens an
 * event stream and fills the progress bar as the stages go by, then renders the
 * report when it arrives. Switching language repaints from the report already
 * in memory — no second check, and no second fifty queries at somebody else's
 * nameservers.
 */
'use strict';

const byId = id => document.getElementById(id);
const DASH = '—';

/* ================================================================== *
 * Language
 * ================================================================== */

const I18N = window.I18N;
const RTL = new Set(window.RTL_LANGS || []);
const STORAGE_KEY = 'myheaders-lang';

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && I18N[saved]) return saved;
  } catch { /* localStorage may be unavailable */ }

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  for (const raw of candidates) {
    const tag = String(raw).toLowerCase();
    if (I18N[tag]) return tag;
    const base = tag.split('-')[0];
    if (I18N[base]) return base;
  }
  return 'en';
}

let LANG = detectLang();
const locale = () => (window.LANG_LOCALES?.[LANG]) || LANG;

function t(key, vars) {
  const dict = I18N[LANG] || I18N.en;
  let value = dict[key] ?? I18N.en[key] ?? key;
  if (vars) for (const [name, replacement] of Object.entries(vars)) {
    value = value.split('{' + name + '}').join(replacement);
  }
  return value;
}

/** Translation for a dashed code such as "lame-delegation", or the code itself. */
function tCode(prefix, code) {
  if (!code && code !== 0) return undefined;
  const key = prefix + '_' + String(code).replace(/[-.]/g, '_');
  const dict = I18N[LANG] || I18N.en;
  return dict[key] ?? I18N.en[key] ?? String(code).replace(/-/g, ' ');
}

/* ================================================================== *
 * Rendering helpers
 * ================================================================== */

function set(id, value, state) {
  const node = byId(id);
  if (!node) return;
  const empty = value === undefined || value === null || value === '' ||
    (Array.isArray(value) && !value.length) ||
    (typeof value === 'number' && Number.isNaN(value));
  node.className = 'v' + (empty ? ' muted' : state ? ' ' + state : '');
  node.textContent = empty ? DASH : (Array.isArray(value) ? value.join(', ') : String(value));
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Yes/no with the colour that matches which answer is the good one. */
function flagRow(id, value, { goodIfTrue = true } = {}) {
  if (value === undefined || value === null) { set(id, t('v_unknown'), 'muted'); return; }
  set(id, value ? t('v_yes') : t('v_no'), value === goodIfTrue ? 'ok' : 'bad');
}

function tag(text, kind) {
  const element = document.createElement('span');
  element.className = 'tag' + (kind ? ' ' + kind : '');
  element.textContent = text;
  return element;
}

function skeletons() {
  document.querySelectorAll('#report .v').forEach(node => {
    node.className = 'v skeleton';
    node.textContent = '';
  });
  ['grade-caps', 'grade-warnings', 'chain-body', 'csp-body', 'cookie-body',
    'header-body', 'other-body', 'flag-list'].forEach(id => {
    const node = byId(id);
    if (node) node.innerHTML = '';
  });
  ['bar-transport', 'bar-csp', 'bar-headers'].forEach(id => {
    const node = byId(id);
    if (node) node.style.width = '0';
  });
}

function toast(message) {
  const element = byId('toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => element.classList.remove('show'), 1900);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(t('toast_copied'));
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); toast(t('toast_copied')); }
    catch { toast(t('toast_copy_fail')); }
    area.remove();
  }
}

/* ================================================================== *
 * State
 * ================================================================== */

let REPORT = null;
let LAST_ERROR = null;
let TARGET = null;
let STREAM = null;

const STAGES = ['resolve', 'chain', 'headers', 'csp', 'cookies', 'protocols', 'grade'];

/* ================================================================== *
 * Running a check
 * ================================================================== */

function setProgress(stage) {
  const box = byId('progress');
  box.hidden = false;
  const index = Math.max(0, STAGES.indexOf(stage));
  byId('progress-fill').style.width = Math.round(((index + 1) / STAGES.length) * 100) + '%';
  byId('progress-label').textContent = tCode('stage', stage);
}

function checking(on) {
  byId('btn-scan').disabled = on;
  byId('btn-rescan').disabled = on;
  if (!on) byId('progress').hidden = true;
}

function startCheck(domain, { refresh = false } = {}) {
  if (!domain) return;
  TARGET = domain;
  REPORT = null;
  LAST_ERROR = null;

  if (STREAM) { STREAM.close(); STREAM = null; }

  byId('empty').hidden = true;
  byId('report').hidden = false;
  byId('alerts').innerHTML = '';
  byId('search-host').value = domain;
  byId('hero-host').textContent = domain;
  byId('hero-meta').innerHTML = '';
  byId('grade-badge').className = 'grade-badge pending';
  byId('grade-badge').textContent = '·';
  skeletons();
  checking(true);
  setProgress('resolve');
  updateSeoMeta();

  const url = `/api/stream/${encodeURIComponent(domain)}?lang=${encodeURIComponent(LANG)}${
    refresh ? '&refresh=1' : ''}`;
  const stream = new EventSource(url);
  STREAM = stream;

  stream.addEventListener('progress', event => {
    try { setProgress(JSON.parse(event.data).stage); }
    catch { /* a malformed frame is not worth breaking the check over */ }
  });

  stream.addEventListener('report', event => {
    try { REPORT = JSON.parse(event.data); }
    catch { LAST_ERROR = { error: 'bad-response' }; }
    stream.close();
    STREAM = null;
    checking(false);
    render();
  });

  stream.addEventListener('failed', event => {
    try { LAST_ERROR = JSON.parse(event.data); }
    catch { LAST_ERROR = { error: 'scan-failed' }; }
    stream.close();
    STREAM = null;
    checking(false);
    render();
  });

  stream.onerror = () => {
    if (REPORT || LAST_ERROR) return;
    stream.close();
    STREAM = null;
    LAST_ERROR = { error: 'network' };
    checking(false);
    render();
  };
}

/* ================================================================== *
 * Rendering the report
 * ================================================================== */

const GRADE_CLASS = grade => {
  if (!grade || grade === '?') return 'g-unknown';
  return 'g-' + grade[0].toLowerCase();
};

function renderGrade(report) {
  const badge = byId('grade-badge');
  badge.className = 'grade-badge ' + GRADE_CLASS(report.grade.grade);
  badge.textContent = report.grade.grade;

  for (const key of ['transport', 'csp', 'headers']) {
    const component = report.grade.components?.[key];
    byId('bar-' + key).style.width = (component?.score ?? 0) + '%';
    set('score-' + key, component ? component.score : undefined);
  }
  set('score-total', report.grade.score);
  set('meta-url', report.url);
  set('meta-requests', report.meta?.requests);
  set('meta-elapsed', report.meta?.elapsedMs ? report.meta.elapsedMs + ' ms' : undefined);

  const caps = byId('grade-caps');
  caps.innerHTML = '';
  for (const cap of report.grade.caps || []) {
    caps.appendChild(tag(`${cap.grade} · ${cap.label || tCode('cap', cap.reason)}`, 'bad'));
  }
  if (report.grade.reason) {
    caps.appendChild(tag(report.grade.reasonLabel || tCode('cap', report.grade.reason), 'warn'));
  }

  const warnings = byId('grade-warnings');
  warnings.innerHTML = '';
  (report.grade.warningLabels || report.grade.warnings || []).forEach(label =>
    warnings.appendChild(tag(label, 'warn')));
}

function renderChain(report) {
  const body = byId('chain-body');
  body.innerHTML = '';
  for (const [entry, hops] of Object.entries(report.chain?.hops || {})) {
    hops.forEach((hop, index) => {
      const row = document.createElement('tr');
      const status = hop.error ? hop.error : hop.status;
      const kind = hop.error ? 'weak'
        : hop.status >= 400 ? 'weak'
        : hop.status >= 300 ? 'legacy'
        : 'good';
      row.innerHTML =
        `<td class="mono">${index === 0 ? esc(tCode('entry', entry)) : ''}</td>` +
        `<td class="${kind}">${esc(String(status))}</td>` +
        `<td class="chain-cell">${index ? '<span class="arrow">→ </span>' : ''}${esc(hop.url)}</td>` +
        `<td class="num">${hop.elapsedMs != null ? hop.elapsedMs + ' ms' : DASH}</td>`;
      body.appendChild(row);
    });
  }
}

function renderCsp(report) {
  const csp = report.csp || {};
  set('csp-present', csp.present ? t('v_present') : t('v_absent'), csp.present ? 'ok' : 'bad');
  flagRow('csp-enforced', csp.present ? Boolean(csp.enforced) : null);
  set('csp-count', csp.directiveCount);
  flagRow('csp-nonce', csp.present ? Boolean(csp.usesNonce || csp.usesHash) : null);
  flagRow('csp-strict-dynamic', csp.present ? Boolean(csp.strictDynamic) : null);

  byId('csp-raw').textContent = csp.scriptSrc
    ? csp.scriptSrc.join(' ')
    : (csp.policy || DASH);

  const body = byId('csp-body');
  body.innerHTML = '';
  for (const [directive, sources] of Object.entries(csp.directives || {})) {
    const risky = /'unsafe-inline'|'unsafe-eval'|^\*$|data:/.test(sources.join(' ')) &&
      /script|default/.test(directive);
    const row = document.createElement('tr');
    row.innerHTML =
      `<td class="mono">${esc(directive)}</td>` +
      `<td class="mono${risky ? ' weak' : ''}">${esc(sources.join(' ') || "''")}</td>`;
    body.appendChild(row);
  }
}

function renderHsts(report) {
  const hsts = report.hsts || {};
  set('hsts-present', hsts.present ? t('v_present') : t('v_absent'), hsts.present ? 'ok' : 'bad');
  set('hsts-maxage', hsts.maxAge != null
    ? t('v_seconds_days', { n: Math.round(hsts.maxAge / 86400) })
    : undefined, hsts.longEnough ? 'ok' : hsts.present ? 'warn' : undefined);
  flagRow('hsts-sub', hsts.present ? Boolean(hsts.includeSubDomains) : null);
  flagRow('hsts-directive', hsts.present ? Boolean(hsts.preload) : null);

  const list = hsts.preloadList || {};
  if (!list.known) set('hsts-listed', t('v_not_bundled'), 'muted');
  else set('hsts-listed', list.preloaded ? t('v_yes') : t('v_no'), list.preloaded ? 'ok' : 'warn');

  flagRow('hsts-eligible', hsts.present ? Boolean(hsts.eligibleForPreload) : null);
}

function renderCookies(report) {
  const cookies = report.cookies || {};
  set('c-count', cookies.count, cookies.count ? undefined : 'muted');
  flagRow('c-secure', cookies.count ? Boolean(cookies.allSecure) : null);
  flagRow('c-httponly', cookies.count ? Boolean(cookies.allHttpOnly) : null);

  const body = byId('cookie-body');
  body.innerHTML = '';
  for (const cookie of cookies.cookies || []) {
    const yes = value => value
      ? `<span class="good">${esc(t('v_yes'))}</span>`
      : `<span class="weak">${esc(t('v_no'))}</span>`;
    const row = document.createElement('tr');
    row.innerHTML =
      `<td class="mono">${esc(cookie.name)}</td>` +
      `<td>${yes(cookie.secure)}</td>` +
      `<td>${yes(cookie.httpOnly)}</td>` +
      `<td class="mono">${esc(cookie.sameSite || DASH)}</td>`;
    body.appendChild(row);
  }
}

function renderHeaders(report) {
  const headers = report.headers || {};
  set('h-present', `${headers.present ?? 0} / ${headers.total ?? 0}`,
    (headers.present ?? 0) >= 8 ? 'ok' : (headers.present ?? 0) >= 4 ? 'warn' : 'bad');

  const body = byId('header-body');
  body.innerHTML = '';
  for (const entry of headers.security || []) {
    const row = document.createElement('tr');
    row.innerHTML =
      `<td class="mono">${esc(entry.name)}</td>` +
      `<td class="mono${entry.present ? '' : ' absent'}">${
        esc(entry.present ? entry.value : t('v_absent'))}</td>`;
    body.appendChild(row);
  }

  const other = byId('other-body');
  other.innerHTML = '';
  for (const entry of headers.other || []) {
    const row = document.createElement('tr');
    row.innerHTML =
      `<td class="mono">${esc(entry.name)}</td>` +
      `<td class="mono">${esc(entry.value)}</td>`;
    other.appendChild(row);
  }
}

function renderProtocols(report) {
  const protocols = report.protocols || {};
  set('p-alpn', protocols.alpn);
  flagRow('p-http2', protocols.alpn ? Boolean(protocols.http2) : null);
  flagRow('p-http3', Boolean(protocols.http3Advertised));
  set('p-tls', protocols.tls?.protocol,
    /TLSv1\.[23]/.test(protocols.tls?.protocol || '') ? 'ok' : 'warn');
  set('p-compression', protocols.compression?.supported?.length
    ? protocols.compression.supported.join(', ')
    : undefined,
    protocols.compression?.negotiated ? 'ok' : 'warn');
}

function renderFlags(report) {
  const list = byId('flag-list');
  list.innerHTML = '';
  const flags = report.flags || [];
  if (!flags.length) {
    list.innerHTML = `<div class="empty-note">${esc(t('v_none'))}</div>`;
    return;
  }
  for (const finding of flags) {
    const where = finding.cookie || finding.header || finding.directive ||
      (finding.from ? tCode('entry', finding.from) : null);
    const item = document.createElement('div');
    item.className = 'finding';
    item.innerHTML =
      `<span class="sev sev-${esc(finding.severity)}">${
        esc(finding.severityLabel || tCode('sev', finding.severity))}</span>` +
      '<div class="body">' +
      `<div class="title">${esc(finding.name || tCode('flag', finding.id))}` +
      `${where ? ` <span class="where">${esc(where)}</span>` : ''}</div>` +
      `<div class="desc">${esc(finding.description || tCode('fd', finding.id))}</div>` +
      '</div>' +
      `<span class="state">${esc(finding.statusLabel || tCode('st', finding.status))}</span>`;
    list.appendChild(item);
  }
}

function renderAlerts(report) {
  const alerts = byId('alerts');
  alerts.innerHTML = '';
  if (!report?.incomplete?.length) return;

  const box = document.createElement('div');
  box.className = 'alert warn';
  const reasons = report.incompleteLabels || report.incomplete.map(code => tCode('inc', code));
  box.innerHTML =
    '<div class="alert-body">' +
    `<div class="alert-title">${esc(t('incomplete_title'))}</div>` +
    `<div>${esc(t('incomplete_body'))}</div>` +
    `<ul>${reasons.map(reason => `<li>${esc(reason)}</li>`).join('')}</ul>` +
    '</div>';
  alerts.appendChild(box);
}

function renderError() {
  const alerts = byId('alerts');
  alerts.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'alert bad';
  const code = LAST_ERROR?.error || 'scan-failed';
  box.innerHTML = `<div class="alert-body"><div class="alert-title">${
    esc(LAST_ERROR?.message || tCode('err', code))}</div></div>`;
  alerts.appendChild(box);
  byId('grade-badge').className = 'grade-badge pending';
  byId('grade-badge').textContent = '·';
}

function render() {
  applyStaticText();
  if (LAST_ERROR) {
    renderError();
    return;
  }
  if (!REPORT) return;

  renderAlerts(REPORT);
  renderGrade(REPORT);
  renderChain(REPORT);
  renderCsp(REPORT);
  renderHsts(REPORT);
  renderCookies(REPORT);
  renderHeaders(REPORT);
  renderProtocols(REPORT);
  renderFlags(REPORT);

  const meta = byId('hero-meta');
  meta.innerHTML = '';
  const chips = [
    [REPORT.csp?.present ? (REPORT.csp.enforced ? 'CSP' : 'CSP report-only') : null,
      REPORT.csp?.enforced ? 'ok' : 'warn'],
    [REPORT.hsts?.present ? 'HSTS' : null, REPORT.hsts?.longEnough ? 'ok' : 'warn'],
    [REPORT.protocols?.http2 ? 'HTTP/2' : null, 'ok'],
    [REPORT.hsts?.preloadList?.preloaded ? 'preloaded' : null, 'ok'],
  ];
  for (const [text, kind] of chips) {
    if (!text) continue;
    const chip = document.createElement('span');
    chip.className = 'chip' + (kind ? ' ' + kind : '');
    chip.textContent = text;
    meta.appendChild(chip);
  }

  byId('raw-json').textContent = JSON.stringify(REPORT, null, 2);
  labelTableCells();
}

/**
 * Copies each column heading onto the cells beneath it.
 *
 * On a phone a table has no room to be read across, so the stylesheet turns
 * every row into a short list — and a value on its own line needs to say
 * which column it came from. Run after the tables are filled, and after the
 * headings themselves have been translated.
 */
function labelTableCells() {
  for (const table of document.querySelectorAll('.table')) {
    const heads = [...(table.tHead?.rows[0]?.cells || [])].map(cell => cell.textContent.trim());
    if (!heads.length) continue;
    // Two columns are a label beside its value already; only a wider table
    // gains anything from being taken apart on a narrow screen.
    table.classList.toggle('stacks', heads.length > 2);
    for (const body of table.tBodies) {
      for (const row of body.rows) {
        let column = 0;
        for (const cell of row.cells) {
          // A cell spanning columns answers to no single heading.
          if (cell.colSpan === 1 && heads[column]) cell.dataset.label = heads[column];
          else delete cell.dataset.label;
          column += cell.colSpan;
        }
      }
    }
  }
}

/* ================================================================== *
 * Static text, language switching, SEO
 * ================================================================== */

function applyStaticText() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = RTL.has(LANG) ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });
  byId('search-host').placeholder = t('ph_host');
  byId('search-host').setAttribute('aria-label', t('hero_label'));
  byId('lang').setAttribute('aria-label', t('lang_aria'));
  byId('api-hint').innerHTML = t('api_hint', {
    origin: location.origin, example: 'example.com',
  });
  if (!TARGET) byId('hero-host').textContent = t('no_target');
  if (!REPORT && !LAST_ERROR) {
    byId('grade-badge').textContent = '·';
  }
}

function updateSeoMeta() {
  const title = TARGET ? `${TARGET} — ${t('title_short')}` : t('title');
  document.title = title;
  for (const [id, value] of [
    ['meta-description', t('subtitle')], ['og-title', title], ['twitter-title', title],
    ['og-description', t('subtitle')], ['twitter-description', t('subtitle')],
  ]) {
    const node = byId(id);
    if (node) node.setAttribute('content', value);
  }
  const canonical = byId('link-canonical');
  if (canonical) canonical.href = location.origin + (TARGET ? '/' + encodeURIComponent(TARGET) : '/');
}

function buildLanguageSelect() {
  const select = byId('lang');
  select.innerHTML = '';
  for (const code of Object.keys(I18N)) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = window.LANG_NAMES?.[code] || code;
    if (code === LANG) option.selected = true;
    select.appendChild(option);
  }
  select.addEventListener('change', () => {
    LANG = select.value;
    try { localStorage.setItem(STORAGE_KEY, LANG); } catch { /* private mode */ }
    render();
    updateSeoMeta();
  });
}

function buildExamples() {
  const box = byId('examples');
  box.innerHTML = '';
  for (const domain of ['github.com', 'sharapov.biz', 'developer.mozilla.org']) {
    const button = document.createElement('button');
    button.textContent = domain;
    button.addEventListener('click', () => go(domain));
    box.appendChild(button);
  }
}

/* ================================================================== *
 * Wiring
 * ================================================================== */

function go(domain) {
  const clean = String(domain || '').trim().toLowerCase();
  if (!clean) return;
  history.pushState({ domain: clean }, '', '/' + encodeURIComponent(clean));
  startCheck(clean);
}

byId('search-form').addEventListener('submit', event => {
  event.preventDefault();
  go(byId('search-host').value);
});

byId('btn-rescan').addEventListener('click', () => {
  if (TARGET) startCheck(TARGET, { refresh: true });
});

byId('btn-copy-json').addEventListener('click', () => {
  if (REPORT) copyText(JSON.stringify(REPORT, null, 2));
});

byId('btn-save-json').addEventListener('click', () => {
  if (!REPORT) return;
  const blob = new Blob([JSON.stringify(REPORT, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `myheaders-${REPORT.domain}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

window.addEventListener('popstate', () => {
  const path = decodeURIComponent(location.pathname.replace(/^\//, ''));
  if (path) startCheck(path);
});

buildLanguageSelect();
buildExamples();
applyStaticText();
updateSeoMeta();

const initial = decodeURIComponent(location.pathname.replace(/^\//, ''));
if (initial) startCheck(initial);
