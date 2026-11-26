/* Editable case-study site. Vanilla JS, no build step.
 * Data lives in app/data/content.json on the backend (see app/server.py). */
(function () {
  'use strict';

  const S = {
    c: null,            // content (settings, blocks, library, notes)
    savedJSON: '',      // last saved state, for the "unsaved" indicator
    edit: false,
    undo: [], redo: [],
    q: '', level: null,
    saving: false,
    view: null,         // 'home' | 'doc'
    docCache: {},
  };
  const FONTS = { serif: 'var(--serif)', sans: 'var(--sans)', mono: 'var(--mono)' };
  const DENSITY = { compact: 0.6, comfortable: 1, spacious: 1.4 };
  const app = document.getElementById('app');

  // ---------- small helpers ----------
  function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    if (props) for (const k in props) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else if (v === true) e.setAttribute(k, '');
      else e.setAttribute(k, v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      e.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    return e;
  }
  const uid = () => Math.random().toString(16).slice(2, 12);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const fmtSize = (b) => b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
  const encPath = (p) => p.split('/').map(encodeURIComponent).join('/');

  async function api(method, path, body, raw, extraHeaders) {
    const opts = { method, headers: Object.assign({}, extraHeaders) };
    if (method !== 'GET') opts.headers['X-Case-Study'] = '1';
    if (body !== undefined) {
      if (raw) { opts.body = body; opts.headers['Content-Type'] = 'application/octet-stream'; }
      else { opts.body = JSON.stringify(body); opts.headers['Content-Type'] = 'application/json'; }
    }
    const r = await fetch(path, opts);
    // The server tags the content with a version; saves must quote the one they're based on.
    const v = r.headers.get('X-Version');
    if (v) S.version = v;
    const t = await r.json().catch(() => ({}));
    if (!r.ok) {
      const err = new Error(t.error || r.statusText);
      err.conflict = !!t.conflict;
      throw err;
    }
    return t;
  }

  let toastTimer;
  function toast(msg) {
    document.querySelectorAll('.toast').forEach((t) => t.remove());
    const t = h('div', { class: 'toast', role: 'status' }, msg);
    document.body.append(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.remove(), 2400);
  }

  // ---------- sanitising rich text ----------
  const ALLOWED = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'S', 'A', 'P', 'BR', 'UL', 'OL', 'LI', 'H3', 'H4',
    'BLOCKQUOTE', 'CODE', 'PRE', 'SUB', 'SUP', 'HR', 'DIV', 'SPAN']);
  const DROP = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'TEMPLATE', 'SVG', 'MATH', 'FORM', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON']);
  function cleanNode(node) {
    for (const ch of [...node.childNodes]) {
      if (ch.nodeType === 1) {
        if (DROP.has(ch.tagName)) { ch.remove(); continue; }
        cleanNode(ch);
        if (!ALLOWED.has(ch.tagName)) { ch.replaceWith(...ch.childNodes); continue; }
        const href = ch.tagName === 'A' ? (ch.getAttribute('href') || '').trim() : '';
        for (const a of [...ch.attributes]) ch.removeAttribute(a.name);
        if (href && /^(https?:|mailto:|#|\/)/i.test(href)) {
          ch.setAttribute('href', href);
          if (/^https?:/i.test(href)) { ch.setAttribute('target', '_blank'); ch.setAttribute('rel', 'noopener'); }
        }
      } else if (ch.nodeType !== 3) ch.remove();
    }
  }
  function sanitize(html) {
    const doc = new DOMParser().parseFromString('<body>' + (html || '') + '</body>', 'text/html');
    cleanNode(doc.body);
    return doc.body.innerHTML;
  }
  const safeUrl = (u) => (/^(https?:|mailto:|#|\/)/i.test((u || '').trim()) ? u.trim() : '');

  // ---------- state changes, undo, save ----------
  const isDirty = () => JSON.stringify(S.c) !== S.savedJSON;
  function checkpoint(before) {
    S.undo.push(before || JSON.stringify(S.c));
    if (S.undo.length > 200) S.undo.shift();
    S.redo = [];
  }
  let autosaveTimer;
  function changed() {
    updateSaveUI();
    if (S.c.settings.autosave) {
      clearTimeout(autosaveTimer);
      autosaveTimer = setTimeout(() => isDirty() && save(true), 1500);
    }
  }
  function mutate(fn, opts) {
    checkpoint();
    fn();
    changed();
    if (!opts || opts.render !== false) render();
  }
  function undo() {
    if (!S.undo.length) return;
    S.redo.push(JSON.stringify(S.c));
    S.c = JSON.parse(S.undo.pop());
    applySettings(); render(); changed();
  }
  function redo() {
    if (!S.redo.length) return;
    S.undo.push(JSON.stringify(S.c));
    S.c = JSON.parse(S.redo.pop());
    applySettings(); render(); changed();
  }
  async function save(quiet, force) {
    if (S.saving) return;
    S.saving = true; updateSaveUI();
    try {
      document.activeElement && document.activeElement.blur && document.activeElement.isContentEditable && document.activeElement.blur();
      const headers = { 'X-Base-Version': S.version || '' };
      if (force) headers['X-Force'] = '1';
      const res = await api('PUT', '/api/content', S.c, false, headers);
      S.version = res.version;
      S.c.savedAt = res.savedAt;
      S.savedJSON = JSON.stringify(S.c);
      if (!quiet) toast('Saved');
    } catch (e) {
      if (e.conflict) conflictModal();
      else toast('Save failed: ' + e.message);
    } finally {
      S.saving = false; updateSaveUI();
    }
  }
  function conflictModal() {
    clearTimeout(autosaveTimer);
    if (document.querySelector('.modal[data-conflict]')) return;
    const close = modal('Changed somewhere else', [
      h('p', {}, 'The site was saved from another tab, or updated on disk, after this page loaded. Saving now would overwrite those changes.'),
      h('p', { class: 'muted' }, 'Safest: download your version first, then load the latest and redo your edits there.'),
    ], [
      ['Download my version', () => { exportJSON(); return false; }],
      ['Load latest (lose my unsaved edits)', () => { S.savedJSON = JSON.stringify(S.c); location.reload(); }],
      ['Overwrite anyway', () => { confirmBox('Replace the newer version with yours? The newer one is kept in revision history.', 'Overwrite', () => save(false, true)); }, true],
    ]);
    const box = document.querySelectorAll('.modal');
    if (box.length) box[box.length - 1].setAttribute('data-conflict', '');
    return close;
  }
  function updateSaveUI() {
    const dirty = isDirty();
    document.querySelectorAll('[data-save]').forEach((b) => {
      b.disabled = !dirty || S.saving;
      b.innerHTML = '';
      b.append(...(S.saving ? ['Saving…'] : dirty ? [h('span', { class: 'dirty-dot' }), 'Save'] : ['Saved']));
    });
    document.querySelectorAll('[data-undo]').forEach((b) => { b.disabled = !S.undo.length; });
    document.querySelectorAll('[data-redo]').forEach((b) => { b.disabled = !S.redo.length; });
  }

  // ---------- settings → CSS ----------
  function themeOverride() { try { return localStorage.getItem('cs-theme'); } catch (e) { return null; } }
  function applySettings() {
    const s = S.c.settings, r = document.documentElement, st = r.style;
    st.setProperty('--base', (s.baseSize || 16) + 'px');
    st.setProperty('--width', (s.width || 1080) + 'px');
    st.setProperty('--radius', (s.radius || 0) + 'px');
    st.setProperty('--pad', DENSITY[s.density] || 1);
    st.setProperty('--head', FONTS[s.headingFont] || FONTS.serif);
    st.setProperty('--body', FONTS[s.bodyFont] || FONTS.sans);
    st.setProperty('--img-gray', s.grayscaleImages === false ? 0 : 1);
    if (s.accent) {
      st.setProperty('--accent', s.accent);
      const n = parseInt(s.accent.slice(1), 16), lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
      st.setProperty('--on-accent', lum > 0.6 ? '#000' : '#fff');
    } else { st.removeProperty('--accent'); st.removeProperty('--on-accent'); }
    const mode = themeOverride() || s.themeMode || 'auto';
    if (mode === 'light' || mode === 'dark') r.setAttribute('data-theme', mode); else r.removeAttribute('data-theme');
    document.title = s.siteTitle || 'Case study';
  }
  function cycleTheme() {
    const order = ['auto', 'light', 'dark'];
    const cur = themeOverride() || S.c.settings.themeMode || 'auto';
    const next = order[(order.indexOf(cur) + 1) % 3];
    try { localStorage.setItem('cs-theme', next); } catch (e) { /* private mode */ }
    applySettings();
    toast('Theme: ' + next);
  }

  // ---------- editable fields ----------
  function ed(obj, key, tag, cls, ph, opts) {
    const e = h(tag || 'span', { class: cls || null });
    e.textContent = obj[key] || '';
    if (!S.edit) return e;
    e.contentEditable = 'plaintext-only';
    if (e.contentEditable !== 'plaintext-only') e.contentEditable = 'true';
    e.dataset.ph = ph || 'Type here…';
    e.spellcheck = true;
    let before = null;
    e.addEventListener('focus', () => { before = JSON.stringify(S.c); });
    e.addEventListener('input', () => {
      if (before) { checkpoint(before); before = null; }
      obj[key] = e.innerText.replace(/\n+$/, '');
      changed();
      if (opts && opts.onInput) opts.onInput();
    });
    e.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' && !(opts && opts.multiline)) { ev.preventDefault(); e.blur(); }
    });
    e.addEventListener('paste', (ev) => {
      ev.preventDefault();
      document.execCommand('insertText', false, (ev.clipboardData || window.clipboardData).getData('text/plain'));
    });
    return e;
  }

  const rtbar = document.getElementById('rtbar');
  let rtTarget = null;
  const RT = [
    ['B', 'Bold', () => document.execCommand('bold')],
    ['I', 'Italic', () => document.execCommand('italic')],
    ['U', 'Underline', () => document.execCommand('underline')],
    ['H', 'Heading', () => document.execCommand('formatBlock', false, 'h3')],
    ['¶', 'Paragraph', () => document.execCommand('formatBlock', false, 'p')],
    ['•', 'Bullet list', () => document.execCommand('insertUnorderedList')],
    ['1.', 'Numbered list', () => document.execCommand('insertOrderedList')],
    ['❝', 'Quote', () => document.execCommand('formatBlock', false, 'blockquote')],
    ['🔗', 'Link', () => linkPrompt()],
    ['⌫', 'Clear formatting', () => document.execCommand('removeFormat')],
  ];
  RT.forEach(([label, title, fn]) => {
    const b = h('button', { type: 'button', title, 'aria-label': title }, label);
    b.addEventListener('mousedown', (ev) => { ev.preventDefault(); fn(); rtTarget && rtTarget.dispatchEvent(new Event('input')); });
    rtbar.append(b);
  });
  function placeRT() {
    if (!rtTarget) return;
    const r = rtTarget.getBoundingClientRect();
    rtbar.style.left = Math.max(8, Math.min(r.left, innerWidth - rtbar.offsetWidth - 8)) + 'px';
    rtbar.style.top = Math.max(60, r.top - 40) + 'px';
  }
  addEventListener('scroll', placeRT, { passive: true });
  function linkPrompt() {
    const sel = getSelection();
    const range = sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
    const target = rtTarget;
    const input = h('input', { type: 'url', placeholder: 'https://… or #section' });
    modal('Add link', [h('div', { class: 'field' }, h('label', {}, 'Link address'), input)], [
      ['Cancel', null],
      ['Add link', () => {
        const url = safeUrl(input.value);
        if (!url || !range || !target) return;
        target.focus();
        sel.removeAllRanges(); sel.addRange(range);
        document.execCommand('createLink', false, url);
        target.dispatchEvent(new Event('input'));
      }, true],
    ]);
    setTimeout(() => input.focus(), 30);
  }

  function rich(obj, key, cls, ph) {
    const e = h('div', { class: 'rich ' + (cls || '') });
    e.innerHTML = sanitize(obj[key]);
    if (!S.edit) return e;
    e.contentEditable = 'true';
    e.dataset.ph = ph || 'Write here…';
    let before = null;
    e.addEventListener('focus', () => { before = JSON.stringify(S.c); rtTarget = e; rtbar.classList.add('show'); placeRT(); });
    e.addEventListener('blur', () => {
      obj[key] = sanitize(e.innerHTML);
      setTimeout(() => { if (rtTarget === e && document.activeElement !== e) { rtbar.classList.remove('show'); rtTarget = null; } }, 150);
    });
    e.addEventListener('input', () => {
      if (before) { checkpoint(before); before = null; }
      obj[key] = e.innerHTML;
      changed();
    });
    e.addEventListener('paste', (ev) => {
      ev.preventDefault();
      const cd = ev.clipboardData;
      const html = cd.getData('text/html');
      if (html) document.execCommand('insertHTML', false, sanitize(html));
      else document.execCommand('insertText', false, cd.getData('text/plain'));
    });
    return e;
  }

  // ---------- modal / drawer ----------
  function modal(title, body, buttons) {
    const scrim = h('div', { class: 'scrim' });
    const box = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title });
    const close = () => { scrim.remove(); box.remove(); document.removeEventListener('keydown', esc); };
    const esc = (ev) => { if (ev.key === 'Escape') close(); };
    document.addEventListener('keydown', esc);
    scrim.addEventListener('click', close);
    box.append(h('header', {}, h('h3', {}, title), h('button', { class: 'btn icon', 'aria-label': 'Close', onclick: close }, '✕')));
    box.append(...[].concat(body));
    if (buttons && buttons.length) {
      box.append(h('footer', {}, buttons.map(([label, fn, primary]) =>
        h('button', { class: 'btn' + (primary ? ' primary' : ''), onclick: () => { if (fn && fn() === false) return; close(); } }, label))));
    }
    document.body.append(scrim, box);
    return close;
  }
  function field(label, input, help) {
    return h('div', { class: 'field' }, h('label', {}, label), input, help ? h('small', {}, help) : null);
  }
  function confirmBox(msg, okLabel, fn) {
    modal('Are you sure?', [h('p', {}, msg)], [['Cancel', null], [okLabel, fn, true]]);
  }

  // ---------- list controls ----------
  function move(arr, i, d) { const j = i + d; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; }
  function mini(arr, i, extras, label) {
    const what = label || 'item';
    return h('span', { class: 'mini' },
      (extras || []),
      h('button', { title: 'Move up', 'aria-label': 'Move ' + what + ' up', onclick: () => mutate(() => move(arr, i, -1)) }, '↑'),
      h('button', { title: 'Move down', 'aria-label': 'Move ' + what + ' down', onclick: () => mutate(() => move(arr, i, 1)) }, '↓'),
      h('button', { title: 'Delete', 'aria-label': 'Delete ' + what, onclick: () => mutate(() => arr.splice(i, 1)) }, '✕'));
  }
  function addBtn(label, fn) {
    return h('div', { class: 'add-row' }, h('button', { class: 'btn small', onclick: () => mutate(fn) }, '+ ' + label));
  }
  function tagToggles(obj) {
    obj.tags = obj.tags || [];
    if (!S.edit) return obj.tags.map((t) => h('span', { class: 'tag' + (t === 'HL' ? ' tag-hl' : '') }, t));
    return ['SL', 'HL'].map((t) => {
      const on = obj.tags.includes(t);
      return h('button', {
        class: 'tag' + (t === 'HL' ? ' tag-hl' : '') + (on ? '' : ' off'), title: 'Toggle ' + t,
        onclick: () => mutate(() => { obj.tags = on ? obj.tags.filter((x) => x !== t) : ['SL', 'HL'].filter((x) => x === t || obj.tags.includes(x)); }),
      }, t);
    });
  }
  function hrefEditor(obj, key, title) {
    return h('button', {
      title: title || 'Edit link', 'aria-label': title || 'Edit link', onclick: () => {
        const input = h('input', { type: 'text', value: obj[key] || '', placeholder: 'https://…, #sec:folder, or a file path' });
        modal(title || 'Edit link', [field('Link address', input, 'Web address, a section anchor like #sec:papers/04_GANs_HL, or a project file path like official/case_study_booklet_2027.pdf')],
          [['Cancel', null], ['Save', () => mutate(() => { obj[key] = input.value.trim(); }), true]]);
        setTimeout(() => input.focus(), 30);
      },
    }, '🔗');
  }
  // A link target can be a web URL, an in-page anchor, or a project file.
  function resolveHref(href) {
    href = (href || '').trim();
    if (!href) return null;
    if (/^(https?:|mailto:|#)/i.test(href)) return href;
    if (/\.(md|txt)$/i.test(href)) return '#/doc/' + encodeURIComponent(href);
    return '/files/' + encPath(href.replace(/^\/+/, ''));
  }
  function link(href, kids, cls) {
    const url = resolveHref(href);
    if (!url) return h('span', { class: cls || null }, kids);
    const ext = /^https?:/i.test(url) || (url.startsWith('/files/') && S.c.settings.pdfNewTab);
    return h('a', { href: url, class: cls || null, target: ext ? '_blank' : null, rel: ext ? 'noopener' : null }, kids);
  }

  // ---------- blocks ----------
  const BLOCK_TYPES = {
    text: ['Text', 'Rich text with headings, lists and links', () => ({ title: 'New section', subtitle: '', html: '<p>Write something…</p>', columns: 1 })],
    facts: ['Facts', 'A grid of big numbers or short facts', () => ({ title: 'Key facts', subtitle: '', note: '', items: [{ id: uid(), big: '42', small: 'What this number means' }] })],
    cards: ['Cards', 'Numbered cards with tags and links', () => ({ title: 'Cards', subtitle: '', items: [{ id: uid(), num: '1', tags: [], inverted: false, title: 'Card title', text: 'Card text', links: [] }] })],
    glossary: ['Glossary', 'Terms with definitions, in groups', () => ({ title: 'Glossary', subtitle: '', groups: [{ id: uid(), title: 'Terms', tags: [], terms: [{ id: uid(), term: 'Term', href: '', def: 'Definition' }] }] })],
    links: ['Link list', 'A list of links with descriptions', () => ({ title: 'Links', subtitle: '', items: [{ id: uid(), label: 'Example link', href: 'https://', description: '' }] })],
    callout: ['Callout', 'A highlighted note or quote', () => ({ html: '<p>Something important…</p>' })],
    image: ['Image', 'An uploaded image or one from the web', () => ({ src: '', alt: '', caption: '' })],
    hero: ['Big title', 'A large heading with intro text', () => ({ kicker: 'Kicker', title: 'Big title', lede: 'Intro text' })],
    divider: ['Divider', 'A thick horizontal rule', () => ({})],
    buttons: ['Buttons', 'A row of big link buttons', () => ({ items: [{ id: uid(), label: 'Button', href: '', primary: true }] })],
    library: ['Library', 'The searchable list of every file', () => ({ title: 'Library', subtitle: '' })],
  };

  function secHead(b, autoSub) {
    if (!S.edit && !b.title && !b.subtitle && !autoSub) return null;
    return h('h2', { class: 'sec' }, ed(b, 'title', 'span', null, 'Section title'),
      S.edit || b.subtitle ? ed(b, 'subtitle', 'span', 'sub', 'Subtitle') : h('span', { class: 'sub' }, autoSub || ''));
  }

  const RENDER = {
    hero(b) {
      return h('div', { class: 'hero' },
        S.edit || b.kicker ? ed(b, 'kicker', 'p', 'kicker', 'Kicker text') : null,
        ed(b, 'title', 'h1', null, 'Big title'),
        S.edit || b.lede ? ed(b, 'lede', 'p', 'lede', 'Intro paragraph', { multiline: true }) : null);
    },
    text(b) {
      return [secHead(b), rich(b, 'html', b.columns > 1 ? 'cols-' + b.columns : '')];
    },
    facts(b) {
      return [secHead(b),
        h('div', { class: 'grid facts' }, b.items.map((f, i) => h('div', { class: 'fact' },
          ed(f, 'big', 'b', 'big', 'Big text'), ed(f, 'small', 'span', 'small', 'Small text', { multiline: true }),
          h('span', { class: 'corner' }, mini(b.items, i, null, 'fact'))))),
        addBtn('Add fact', () => b.items.push({ id: uid(), big: 'New', small: 'Description' })),
        S.edit || b.note ? ed(b, 'note', 'p', 'note', 'Optional note under the grid', { multiline: true }) : null];
    },
    cards(b) {
      return [secHead(b),
        h('div', { class: 'grid cards' }, b.items.map((c, i) => h('div', { class: 'card' + (c.inverted ? ' inv' : '') },
          h('span', { class: 'corner' }, mini(b.items, i, [
            h('button', { title: 'Invert colours', 'aria-label': 'Invert card colours', class: c.inverted ? 'on' : '', onclick: () => mutate(() => { c.inverted = !c.inverted; }) }, '◐')], 'card')),
          ed(c, 'num', 'div', 'num', '#'),
          h('div', {}, tagToggles(c)),
          ed(c, 'title', 'h3', null, 'Card title', { multiline: true }),
          ed(c, 'text', 'p', null, 'Card text', { multiline: true }),
          h('div', { class: 'links' }, (c.links || []).map((l, li) => S.edit
            ? h('div', {}, ed(l, 'label', 'span', null, 'Link text'), ' ', h('span', { class: 'mini' }, hrefEditor(l, 'href'),
              h('button', { title: 'Remove link', 'aria-label': 'Remove link', onclick: () => mutate(() => c.links.splice(li, 1)) }, '✕')))
            : link(l.href, [l.label, ' →'])),
          S.edit ? h('div', { class: 'add-row' }, h('button', { class: 'btn small', onclick: () => mutate(() => { c.links = c.links || []; c.links.push({ label: 'New link', href: '' }); }) }, '+ link')) : null)))),
        addBtn('Add card', () => b.items.push({ id: uid(), num: String(b.items.length + 1), tags: [], inverted: false, title: 'Card title', text: 'Card text', links: [] }))];
    },
    glossary(b) {
      return [secHead(b),
        h('div', { class: 'gloss' }, b.groups.map((g, gi) => h('div', { class: 'gloss-group' },
          h('h4', {}, tagToggles(g), ed(g, 'title', 'span', null, 'Group title'), ' ', mini(b.groups, gi, null, 'group')),
          g.terms.map((t, ti) => h('div', { class: 'term' },
            S.edit ? ed(t, 'term', 'span', 't', 'Term') : link(t.href, t.term, 't'),
            ' ', mini(g.terms, ti, [hrefEditor(t, 'href', 'Link this term')], 'term'),
            ed(t, 'def', 'p', null, 'Definition', { multiline: true }))),
          addBtn('Add term', () => g.terms.push({ id: uid(), term: 'New term', href: '', def: '' }))))),
        addBtn('Add group', () => b.groups.push({ id: uid(), title: 'New group', tags: [], terms: [] }))];
    },
    links(b) {
      return [secHead(b),
        h('ul', { class: 'linklist' }, b.items.map((l, i) => h('li', {},
          S.edit ? ed(l, 'label', 'b', null, 'Link text') : link(l.href, h('b', {}, l.label)),
          ' ', mini(b.items, i, [hrefEditor(l, 'href')], 'link'),
          S.edit || l.description ? ed(l, 'description', 'span', 'd', 'Description (optional)', { multiline: true }) : null))),
        addBtn('Add link', () => b.items.push({ id: uid(), label: 'New link', href: '', description: '' }))];
    },
    callout(b) { return rich(b, 'html', 'callout', 'Callout text'); },
    divider() { return h('hr', { class: 'divider' }); },
    buttons(b) {
      return h('div', { class: 'cta-row' },
        b.items.map((it, i) => S.edit
          ? h('span', { class: 'cta-edit' },
            h('span', { class: 'cta' + (it.primary ? ' primary' : '') }, ed(it, 'label', 'span', null, 'Button text')),
            mini(b.items, i, [
              hrefEditor(it, 'href', 'Button link'),
              h('button', { title: 'Highlight this button', 'aria-label': 'Toggle highlighted style', class: it.primary ? 'on' : '', onclick: () => mutate(() => { it.primary = !it.primary; }) }, '★'),
            ], 'button'))
          : link(it.href, it.label, 'cta' + (it.primary ? ' primary' : ''))),
        S.edit ? h('button', { class: 'btn small', onclick: () => mutate(() => b.items.push({ id: uid(), label: 'New button', href: '', primary: false })) }, '+ button') : null);
    },
    image(b) {
      const src = b.src ? (/^https?:/i.test(b.src) ? b.src : '/files/' + encPath(b.src)) : '';
      return h('div', { class: 'imgblk' }, h('figure', {},
        src ? h('img', { src, alt: b.alt || '' }) : h('div', { class: 'placeholder-box' }, S.edit ? 'No image yet: use the buttons below' : ''),
        S.edit || b.caption ? ed(b, 'caption', 'figcaption', null, 'Caption (optional)') : null),
      S.edit ? h('div', { class: 'btnrow' },
        h('button', { class: 'btn small', onclick: () => pickFiles('image/*', false, async ([f]) => { const r = await upload(f); mutate(() => { b.src = r.path; }); }) }, 'Upload image'),
        h('button', { class: 'btn small', onclick: () => blockSettings(b) }, 'Image URL / alt text')) : null);
    },
    library: renderLibrary,
  };

  function blockSettings(b) {
    const nav = h('input', { type: 'text', value: b.nav || '', placeholder: 'Leave empty to hide from the top bar' });
    const style = h('select', {}, ['plain', 'boxed', 'inverted'].map((v) => h('option', { value: v, selected: (b.style || 'plain') === v }, v)));
    const width = h('select', {}, ['full', 'narrow'].map((v) => h('option', { value: v, selected: (b.width || 'full') === v }, v)));
    const body = [field('Top bar link', nav, 'Text for this block’s link in the top navigation'), field('Style', style), field('Width', width)];
    let cols, src, alt;
    if (b.type === 'text') {
      cols = h('select', {}, [1, 2, 3].map((v) => h('option', { value: v, selected: (b.columns || 1) == v }, v + (v === 1 ? ' column' : ' columns'))));
      body.push(field('Columns', cols));
    }
    if (b.type === 'image') {
      src = h('input', { type: 'text', value: b.src || '', placeholder: 'https://… or uploads/picture.png' });
      alt = h('input', { type: 'text', value: b.alt || '' });
      body.push(field('Image address', src), field('Alt text', alt, 'Describes the image for screen readers'));
    }
    modal('Block settings · ' + BLOCK_TYPES[b.type][0], body, [['Cancel', null], ['Apply', () => mutate(() => {
      b.nav = nav.value.trim(); b.style = style.value; b.width = width.value;
      if (cols) b.columns = +cols.value;
      if (src) { b.src = src.value.trim(); b.alt = alt.value; }
    }), true]]);
  }

  function blockShell(b, i) {
    const blocks = S.c.blocks;
    const cls = ['blk', 'type-' + b.type, 'style-' + (b.style || 'plain'), 'width-' + (b.width || 'full'), b.hidden ? 'hidden-blk' : ''].join(' ');
    const el = h('section', { class: cls, id: 'b-' + b.id });
    if (S.edit) {
      el.append(h('div', { class: 'blk-tools' },
        h('span', { class: 'lbl' }, BLOCK_TYPES[b.type] ? BLOCK_TYPES[b.type][0] : b.type),
        h('button', { class: 'btn small', title: 'Move up', onclick: () => mutate(() => move(blocks, i, -1)) }, '↑'),
        h('button', { class: 'btn small', title: 'Move down', onclick: () => mutate(() => move(blocks, i, 1)) }, '↓'),
        b.type !== 'library' ? h('button', { class: 'btn small', title: 'Duplicate', onclick: () => mutate(() => blocks.splice(i + 1, 0, Object.assign(clone(b), { id: uid() }))) }, '⧉') : null,
        h('button', { class: 'btn small', title: b.hidden ? 'Show block' : 'Hide block', onclick: () => mutate(() => { b.hidden = !b.hidden; }) }, b.hidden ? 'Show' : 'Hide'),
        h('button', { class: 'btn small', title: 'Block settings', onclick: () => blockSettings(b) }, '⚙'),
        h('button', { class: 'btn small danger', title: 'Delete block', onclick: () => confirmBox('Delete this ' + (BLOCK_TYPES[b.type] || [b.type])[0].toLowerCase() + ' block? You can undo this.', 'Delete', () => mutate(() => blocks.splice(i, 1))) }, '✕')));
    }
    const r = RENDER[b.type];
    el.append(...[].concat(r ? r(b) : h('p', {}, 'Unknown block type: ' + b.type)).filter(Boolean));
    return el;
  }

  function adder(index) {
    return h('div', { class: 'adder' }, h('button', { class: 'btn small', onclick: () => addBlockModal(index) }, '+ Add block'));
  }
  function addBlockModal(index) {
    const hasLib = S.c.blocks.some((b) => b.type === 'library');
    let close;
    const grid = h('div', { class: 'typegrid' }, Object.entries(BLOCK_TYPES).map(([type, [name, desc, make]]) =>
      h('button', {
        disabled: type === 'library' && hasLib ? true : null,
        onclick: () => { close(); mutate(() => S.c.blocks.splice(index, 0, Object.assign({ id: uid(), type, nav: '', hidden: false }, make()))); },
      }, h('b', {}, name), h('span', {}, type === 'library' && hasLib ? 'Already on the page' : desc))));
    close = modal('Add a block', [grid], []);
  }

  // ---------- library ----------
  function allItems() { return S.c.library.flatMap((s) => s.items.map((it) => ({ it, s }))); }
  function itemHref(it) {
    if (it.url) return { href: it.url, ext: true };
    if (!it.path) return { href: null };
    if (it.kind === 'md' || it.kind === 'txt') return { href: '#/doc/' + encodeURIComponent(it.path), ext: false };
    return { href: '/files/' + encPath(it.path), ext: !!S.c.settings.pdfNewTab };
  }
  function itemMeta(it) {
    const parts = [];
    if (it.by) parts.push(it.by + ' · ');
    parts.push(h('span', { class: 'fmt' }, (it.kind || 'file').toUpperCase()), ' ');
    if (it.words) parts.push(it.words.toLocaleString() + ' words');
    else if (it.size) parts.push(fmtSize(it.size));
    else if (it.url) parts.push(new URL(it.url, location.href).hostname.replace(/^www\./, ''));
    if (it.pdfUrl) parts.push(' · ', h('a', { href: it.pdfUrl, target: '_blank', rel: 'noopener' }, 'PDF ↗'));
    if (it.source && it.path) parts.push(' · ', h('a', { href: it.source, target: '_blank', rel: 'noopener' }, 'original ↗'));
    return parts;
  }

  function itemEl(it, sec, ii, virtual) {
    if (it.hidden && !S.edit) return null;
    const { href, ext } = itemHref(it);
    const title = S.edit && !virtual ? ed(it, 'title', 'span', 't', 'Item title')
      : href ? h('a', { class: 't', href, target: ext ? '_blank' : null, rel: ext ? 'noopener' : null }, it.title) : h('span', { class: 't' }, it.title);
    const controls = S.edit && !virtual ? mini(sec.items, ii, [
      h('button', { title: 'Star', 'aria-label': 'Star item', class: it.starred ? 'on' : '', onclick: () => mutate(() => { it.starred = !it.starred; }) }, '★'),
      h('button', { title: it.hidden ? 'Show item' : 'Hide item', 'aria-label': 'Toggle item visibility', class: it.hidden ? 'on' : '', onclick: () => mutate(() => { it.hidden = !it.hidden; }) }, '◌'),
      href ? h('a', { href, target: '_blank', rel: 'noopener', title: 'Open', 'aria-label': 'Open item' }, h('button', { tabindex: '-1' }, '↗')) : null,
      h('button', { title: 'Move to another section', 'aria-label': 'Move item to another section', onclick: () => moveItemModal(it, sec) }, '⇄'),
      h('button', { title: 'Edit details', 'aria-label': 'Edit item details', onclick: () => itemModal(it) }, '⚙'),
    ], 'item') : null;
    const showDesc = it.description || (S.edit && !virtual);
    return h('li', { class: 'item' + (it.hidden ? ' hidden-item' : ''), 'data-q': (it.title + ' ' + (it.by || '') + ' ' + (it.description || '')).toLowerCase() },
      h('div', { class: 'row' },
        h('span', {}, it.starred ? h('span', { class: 'star', title: 'Starred' }, '★') : null, title, ' ', controls),
        S.c.settings.showMeta !== false ? h('span', { class: 'm' }, itemMeta(it)) : null),
      showDesc ? (S.edit && !virtual ? ed(it, 'description', 'div', 'desc', 'Add a description…', { multiline: true }) : h('div', { class: 'desc' }, it.description)) : null);
  }

  function itemModal(it) {
    const f = {
      title: h('input', { type: 'text', value: it.title || '' }),
      by: h('input', { type: 'text', value: it.by || '' }),
      description: h('textarea', {}, it.description || ''),
      url: h('input', { type: 'text', value: it.url || '', placeholder: 'https://…' }),
      path: h('input', { type: 'text', value: it.path || '', placeholder: 'folder/file.pdf' }),
      pdfUrl: h('input', { type: 'text', value: it.pdfUrl || '', placeholder: 'Optional direct PDF link' }),
      source: h('input', { type: 'text', value: it.source || '', placeholder: 'Optional original page' }),
    };
    modal('Edit item', [
      field('Title', f.title), field('Author / source', f.by), field('Description', f.description, 'Shown under the title in the library and at the top of the reader'),
      field('Web link', f.url, 'Use this OR a file path'), field('File path in the project', f.path),
      field('PDF link', f.pdfUrl), field('Original page', f.source),
    ], [['Cancel', null], ['Save', () => mutate(() => {
      for (const k in f) { const v = f[k].value.trim(); if (v) it[k] = v; else delete it[k]; }
      it.title = it.title || 'Untitled';
      it.description = it.description || '';
      if (it.path) it.kind = (it.path.split('.').pop() || 'file').toLowerCase();
      else if (it.url) it.kind = 'link';
    }), true]]);
  }

  function moveItemModal(it, from) {
    const sel = h('select', {}, S.c.library.map((s, i) => h('option', { value: i, selected: s === from }, s.title)));
    modal('Move item', [field('Section', sel)], [['Cancel', null], ['Move', () => mutate(() => {
      const to = S.c.library[+sel.value];
      if (to === from) return;
      from.items.splice(from.items.indexOf(it), 1);
      to.items.push(it);
    }), true]]);
  }

  function pickFiles(accept, multiple, cb) {
    const inp = h('input', { type: 'file', accept: accept || null, multiple: multiple || null, style: 'display:none' });
    inp.addEventListener('change', () => { cb([...inp.files]); inp.remove(); });
    document.body.append(inp);
    inp.click();
  }
  async function upload(file) {
    toast('Uploading ' + file.name + '…');
    return api('POST', '/api/upload?name=' + encodeURIComponent(file.name), file, true);
  }

  function addItemModal(sec) {
    const tabs = ['Web link', 'Upload files', 'Files already on disk'];
    let tab = 0, close;
    const pane = h('div');
    const bar = h('div', { class: 'tabs', role: 'tablist' });
    function draw() {
      bar.innerHTML = '';
      tabs.forEach((t, i) => bar.append(h('button', { class: i === tab ? 'on' : '', role: 'tab', onclick: () => { tab = i; draw(); } }, t)));
      pane.innerHTML = '';
      if (tab === 0) {
        const t = h('input', { type: 'text', placeholder: 'Title' }), u = h('input', { type: 'url', placeholder: 'https://…' });
        const by = h('input', { type: 'text', placeholder: 'Optional' }), d = h('textarea', { placeholder: 'Optional' });
        pane.append(field('Title', t), field('Link', u), field('Author / source', by), field('Description', d),
          h('footer', {}, h('button', { class: 'btn primary', onclick: () => {
            const url = safeUrl(u.value);
            if (!url) return toast('Enter a web address starting with https://');
            close();
            mutate(() => sec.items.push({ id: uid(), title: t.value.trim() || url, by: by.value.trim(), kind: 'link', url, description: d.value.trim(), starred: false, hidden: false }));
          } }, 'Add link')));
      } else if (tab === 1) {
        const status = h('p', { class: 'muted' }, 'Files are copied into the project’s uploads/ folder.');
        pane.append(status, h('button', { class: 'btn primary', onclick: () => pickFiles(null, true, async (files) => {
          const added = [];
          for (const f of files) {
            status.textContent = 'Uploading ' + f.name + '…';
            try {
              const r = await upload(f);
              added.push({ id: uid(), title: f.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '), by: '', path: r.path, kind: r.kind, size: r.size, description: '', starred: false, hidden: false });
            } catch (e) { toast(f.name + ': ' + e.message); }
          }
          if (added.length) { close(); mutate(() => sec.items.push(...added)); toast('Added ' + added.length + ' file' + (added.length > 1 ? 's' : '')); }
          else status.textContent = 'Nothing was uploaded.';
        }) }, 'Choose files…'));
      } else {
        const list = h('div', { class: 'scanlist' }, h('div', {}, 'Scanning…'));
        pane.append(h('p', { class: 'muted' }, 'Files in the project folder that aren’t in the library yet.'), list);
        api('GET', '/api/scan').then(({ files }) => {
          list.innerHTML = '';
          if (!files.length) return list.append(h('div', {}, 'Every file is already listed.'));
          files.forEach((f) => list.append(h('div', {}, h('span', {}, f.path + ' · ' + fmtSize(f.size)),
            h('button', { class: 'btn small', onclick: (ev) => {
              ev.target.disabled = true; ev.target.textContent = 'Added';
              mutate(() => sec.items.push({ id: uid(), title: f.path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '), by: '', path: f.path, kind: f.kind, size: f.size, description: '', starred: false, hidden: false }));
            } }, 'Add'))));
        }).catch((e) => { list.innerHTML = ''; list.append(h('div', {}, 'Scan failed: ' + e.message)); });
      }
    }
    draw();
    close = modal('Add to “' + sec.title + '”', [bar, pane], []);
  }

  function libSection(sec, si) {
    if (sec.hidden && !S.edit) return null;
    const lib = S.c.library;
    const visible = sec.items.filter((it) => !it.hidden || S.edit).length;
    return h('section', { class: 'lib' + (sec.hidden ? ' hidden-sec' : ''), id: 's-' + sec.id, 'data-tags': (sec.tags || []).join(' ') },
      h('div', { class: 'lib-head' },
        ed(sec, 'title', 'h3', null, 'Section title'),
        tagToggles(sec),
        h('span', { class: 'count' }, visible),
        S.edit ? mini(lib, si, [
          h('button', { title: 'Add item', 'aria-label': 'Add item to section', onclick: () => addItemModal(sec) }, '+'),
          h('button', { title: sec.hidden ? 'Show section' : 'Hide section', 'aria-label': 'Toggle section visibility', class: sec.hidden ? 'on' : '', onclick: () => mutate(() => { sec.hidden = !sec.hidden; }) }, '◌'),
        ], 'section') : null),
      S.edit || sec.blurb ? ed(sec, 'blurb', 'p', 'blurb', 'Describe this section…', { multiline: true }) : null,
      h('ul', {}, sec.items.map((it, ii) => itemEl(it, sec, ii))),
      S.edit ? h('div', { class: 'add-row' }, h('button', { class: 'btn small', onclick: () => addItemModal(sec) }, '+ Add item')) : null);
  }

  function renderLibrary(b) {
    if (S.level == null) S.level = S.c.settings.defaultLevel || 'all';
    const lib = S.c.library;
    const total = allItems().filter(({ it, s }) => S.edit || (!it.hidden && !s.hidden)).length;
    const starred = allItems().filter(({ it, s }) => it.starred && (S.edit || (!it.hidden && !s.hidden)));
    const search = h('input', { type: 'search', value: S.q, placeholder: 'Search titles, authors and descriptions…', 'aria-label': 'Search the library' });
    search.addEventListener('input', () => { S.q = search.value; filterLib(); });
    const seg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Level filter' }, [['all', 'All'], ['sl', 'SL view'], ['hl', 'HL view']].map(([v, l]) =>
      h('button', { 'aria-pressed': String(S.level === v), onclick: () => { S.level = v; seg.querySelectorAll('button').forEach((x, i) => x.setAttribute('aria-pressed', String(['all', 'sl', 'hl'][i] === v))); filterLib(); } }, l)));
    const showToc = S.c.settings.showToc !== false;
    const toc = showToc ? h('nav', { class: 'toc', 'aria-label': 'Library sections' },
      starred.length && S.c.settings.showStarredSection !== false ? h('a', { href: '#s-starred' }, '★ Starred', h('span', {}, starred.length)) : null,
      lib.filter((s) => S.edit || !s.hidden).map((s) => h('a', { href: '#s-' + s.id, 'data-for': 's-' + s.id }, s.title, h('span', {}, s.items.filter((i) => S.edit || !i.hidden).length)))) : null;
    const secs = h('div', { id: 'libsecs' },
      starred.length && S.c.settings.showStarredSection !== false ? h('section', { class: 'lib', id: 's-starred', 'data-tags': '' },
        h('div', { class: 'lib-head' }, h('h3', {}, '★ Starred'), h('span', { class: 'count' }, starred.length)),
        h('ul', {}, starred.map(({ it, s }) => itemEl(it, s, 0, true)))) : null,
      lib.map((s, si) => libSection(s, si)),
      h('p', { class: 'empty-msg hidden', id: 'libempty' }, 'Nothing matches that search.'),
      S.edit ? h('div', { class: 'add-row' }, h('button', { class: 'btn', onclick: () => mutate(() => lib.push({ id: uid(), title: 'New section', blurb: '', tags: [], hidden: false, items: [] })) }, '+ Add section')) : null);
    setTimeout(filterLib, 0);
    return [secHead(b, total + ' items'), h('div', { class: 'tools' }, search, seg), h('div', { class: 'layout' + (showToc ? '' : ' no-toc') }, toc, secs)];
  }

  function filterLib() {
    const root = document.getElementById('libsecs');
    if (!root) return;
    const term = S.q.trim().toLowerCase();
    let any = false;
    root.querySelectorAll('.lib').forEach((s) => {
      const tags = (s.dataset.tags || '').split(' ').filter(Boolean);
      const levelOk = S.level === 'all' || !tags.length || tags.includes(S.level.toUpperCase());
      let shown = 0;
      s.querySelectorAll('.item').forEach((it) => {
        const ok = levelOk && (!term || it.dataset.q.includes(term));
        it.classList.toggle('hidden', !ok);
        if (ok) shown++;
      });
      const hide = shown === 0 && !(S.edit && !term && levelOk);
      s.classList.toggle('hidden', hide);
      const a = document.querySelector('.toc a[href="#' + s.id + '"]');
      if (a) a.classList.toggle('hidden', hide);
      if (!hide) any = true;
    });
    const empty = document.getElementById('libempty');
    if (empty) empty.classList.toggle('hidden', any);
  }

  // ---------- top bar ----------
  function topbar(docMode) {
    const s = S.c.settings;
    const navs = docMode ? [] : S.c.blocks.filter((b) => b.nav && (!b.hidden || S.edit)).map((b) => h('a', { class: 'navlink', href: '#b-' + b.id }, b.nav));
    const dirty = isDirty();
    return h('header', { class: 'bar' },
      h('a', { class: 'brand', href: '#' }, docMode ? '← ' + (s.brand || s.siteTitle) : (s.brand || s.siteTitle)),
      h('nav', {}, navs,
        s.topButtonLabel && s.topButtonHref ? link(s.topButtonHref, s.topButtonLabel, 'btn topcta') : null,
        S.edit || dirty ? [
          h('button', { class: 'btn icon', 'data-undo': '', title: 'Undo (⌘Z)', 'aria-label': 'Undo', onclick: undo }, '↶'),
          h('button', { class: 'btn icon', 'data-redo': '', title: 'Redo (⇧⌘Z)', 'aria-label': 'Redo', onclick: redo }, '↷'),
          h('button', { class: 'btn primary', 'data-save': '', title: 'Save (⌘S)', onclick: () => save() }, 'Save'),
        ] : null,
        S.edit ? h('button', { class: 'btn', title: 'Site settings', onclick: openSettings }, '⚙ Settings') : null,
        h('button', { class: 'btn' + (S.edit ? ' on' : ''), title: 'Toggle edit mode (E)', onclick: toggleEdit }, S.edit ? 'Done' : '✎ Edit'),
        h('button', { class: 'btn icon', title: 'Theme: auto / light / dark', 'aria-label': 'Change theme', onclick: cycleTheme }, '◐')));
  }
  function toggleEdit() {
    S.edit = !S.edit;
    document.body.classList.toggle('editing', S.edit);
    rtbar.classList.remove('show');
    render();
  }

  // ---------- settings drawer ----------
  function openSettings() {
    const s = S.c.settings;
    const scrim = h('div', { class: 'scrim' });
    const dr = h('aside', { class: 'drawer', role: 'dialog', 'aria-label': 'Site settings' });
    const close = () => { scrim.remove(); dr.remove(); document.removeEventListener('keydown', esc); };
    const esc = (ev) => { if (ev.key === 'Escape') close(); };
    document.addEventListener('keydown', esc);
    scrim.addEventListener('click', close);
    let before = null;
    const bind = (key, input, conv, rerender) => {
      input.addEventListener('focus', () => { before = JSON.stringify(S.c); });
      input.addEventListener(input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'input', () => {
        checkpoint(before || JSON.stringify(S.c)); before = null;
        s[key] = conv ? conv(input) : input.value;
        applySettings(); changed();
        if (rerender) render();
      });
      return input;
    };
    const text = (key, rer) => bind(key, h('input', { type: 'text', value: s[key] || '' }), null, rer);
    const select = (key, opts, rer) => bind(key, h('select', {}, opts.map(([v, l]) => h('option', { value: v, selected: String(s[key]) === String(v) }, l))), null, rer);
    const range = (key, min, max, step, unit) => {
      const out = h('small', {}, (s[key] || min) + unit);
      const inp = bind(key, h('input', { type: 'range', min, max, step, value: s[key] || min }), (i) => { out.textContent = i.value + unit; return +i.value; });
      return [inp, out];
    };
    const check = (key, label, rer, dflt) => h('div', { class: 'field row' }, h('label', {}, label),
      bind(key, h('input', { type: 'checkbox', checked: (s[key] === undefined ? dflt !== false : s[key]) ? true : null }), (i) => i.checked, rer));
    const accent = bind('accent', h('input', { type: 'color', value: s.accent || '#000000' }));
    const fonts = [['serif', 'Serif'], ['sans', 'Sans-serif'], ['mono', 'Monospace']];
    const revs = h('div', { class: 'revs' }, h('div', {}, 'Loading…'));

    dr.append(
      h('header', {}, h('h3', {}, 'Settings'), h('button', { class: 'btn icon', 'aria-label': 'Close settings', onclick: close }, '✕')),
      h('h4', {}, 'Site'),
      field('Browser tab title', text('siteTitle')),
      field('Top bar name', text('brand', true)),
      field('Top bar button text', text('topButtonLabel', true), 'Shown on every page, including documents. Leave empty to hide it.'),
      field('Top bar button link', text('topButtonHref', true), 'A project file (e.g. question_bank/02_question_bank.md), a web address, or #b-… for a block.'),
      field('Footer text', bind('footer', h('textarea', {}, s.footer || ''), null, true)),
      h('h4', {}, 'Appearance'),
      field('Default theme', select('themeMode', [['auto', 'Match system'], ['light', 'Light (white)'], ['dark', 'Dark (black)']]),
        'The ◐ button overrides this on this browser only.'),
      h('div', { class: 'field' }, h('label', {}, 'Accent colour'), h('div', { class: 'btnrow' }, accent,
        h('button', { class: 'btn small', onclick: () => mutate(() => { s.accent = ''; applySettings(); }) }, 'None (black & white)')),
      h('small', {}, 'Used for link underlines, highlights and callout bars.')),
      field('Heading font', select('headingFont', fonts)),
      field('Body font', select('bodyFont', fonts)),
      field('Text size', range('baseSize', 13, 21, 1, 'px')),
      field('Page width', range('width', 720, 1480, 20, 'px')),
      field('Corner rounding', range('radius', 0, 16, 1, 'px')),
      field('Spacing', select('density', [['compact', 'Compact'], ['comfortable', 'Comfortable'], ['spacious', 'Spacious']])),
      check('grayscaleImages', 'Grayscale images in documents', false, true),
      h('h4', {}, 'Library'),
      check('showToc', 'Show section list beside the library', true),
      check('showMeta', 'Show author, type and size', true),
      check('showStarredSection', 'Show ★ Starred section', true),
      check('pdfNewTab', 'Open files in a new tab', true),
      field('Default level filter', select('defaultLevel', [['all', 'All'], ['sl', 'SL'], ['hl', 'HL']])),
      h('h4', {}, 'Reader'),
      check('showNotes', 'Show my notes panel beside documents', true),
      h('h4', {}, 'Saving'),
      check('autosave', 'Autosave changes', false, false),
      h('h4', {}, 'Data'),
      h('div', { class: 'btnrow' },
        h('button', { class: 'btn small', onclick: exportJSON }, 'Export JSON'),
        h('button', { class: 'btn small', onclick: importJSON }, 'Import JSON'),
        h('button', { class: 'btn small danger', onclick: () => confirmBox('Replace everything with the original site? Your current version is kept in revisions.', 'Reset', () => restore('seed')) }, 'Reset to original')),
      h('h4', {}, 'Revisions (saved automatically on every save)'),
      revs);
    document.body.append(scrim, dr);
    api('GET', '/api/history').then(({ history }) => {
      revs.innerHTML = '';
      if (!history.length) return revs.append(h('div', {}, 'No revisions yet: they appear after you save.'));
      history.slice(0, 40).forEach((r) => {
        const m = r.name.match(/^(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})-(.*)\.json$/);
        const label = m ? `${m[1]}-${m[2]}-${m[3]} ${m[4]}:${m[5]}:${m[6]} · ${m[7].replace(/-\d+$/, '')}` : r.name;
        revs.append(h('div', {}, h('span', {}, label), h('button', { class: 'btn small', onclick: () => confirmBox('Restore this revision? Your current version is kept in revisions too.', 'Restore', () => restore(r.name)) }, 'Restore')));
      });
    }).catch(() => { revs.innerHTML = ''; revs.append(h('div', {}, 'Could not load revisions.')); });
  }

  async function restore(name) {
    try {
      const c = await api('POST', '/api/restore', { name });
      S.c = c; S.savedJSON = JSON.stringify(c); S.undo = []; S.redo = [];
      document.querySelectorAll('.drawer, .scrim').forEach((e) => e.remove());
      applySettings(); render(); toast('Restored');
    } catch (e) { toast('Restore failed: ' + e.message); }
  }
  function exportJSON() {
    const blob = new Blob([JSON.stringify(S.c, null, 1)], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: 'case-study-site-' + new Date().toISOString().slice(0, 10) + '.json' });
    document.body.append(a); a.click(); a.remove();
  }
  function importJSON() {
    pickFiles('application/json,.json', false, async ([f]) => {
      try {
        const c = JSON.parse(await f.text());
        if (!c || !c.settings || !Array.isArray(c.blocks) || !Array.isArray(c.library)) throw new Error('not a site file');
        mutate(() => { S.c = c; });
        applySettings(); render();
        toast('Imported: press Save to keep it');
      } catch (e) { toast('Import failed: ' + e.message); }
    });
  }

  // ---------- document reader ----------
  let mathjaxLoading = null;
  function loadMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) return Promise.resolve();
    if (!mathjaxLoading) mathjaxLoading = new Promise((res) => {
      window.MathJax = { startup: { ready: () => { window.MathJax.startup.defaultReady(); res(); } } };
      document.head.append(h('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js', async: true, onerror: () => res() }));
    });
    return mathjaxLoading;
  }
  async function renderDoc(path) {
    const found = allItems().find(({ it }) => it.path === path);
    const it = found ? found.it : { title: path.split('/').pop(), path, description: '' };
    const showNotes = S.c.settings.showNotes !== false;
    const article = h('article', { class: 'doc' }, h('p', { class: 'muted mono' }, 'Loading…'));
    const notesVal = (S.c.notes || {})[path] || '';
    let notes = null;
    if (showNotes) {
      const ta = h('textarea', { 'aria-label': 'My notes on this document', placeholder: 'Your notes on this document. Saved with the site.' }, notesVal);
      let before = null;
      ta.addEventListener('focus', () => { before = JSON.stringify(S.c); });
      ta.addEventListener('input', () => {
        if (before) { checkpoint(before); before = null; }
        S.c.notes = S.c.notes || {};
        if (ta.value) S.c.notes[path] = ta.value; else delete S.c.notes[path];
        changed();
      });
      notes = h('aside', { class: 'notes' }, h('h4', {}, 'My notes'), ta,
        h('div', { class: 'btnrow' }, h('button', { class: 'btn small primary', 'data-save': '', onclick: () => save() }, 'Save')));
    }
    app.replaceChildren(topbar(true), h('div', { class: 'doc-wrap' + (showNotes ? '' : ' no-notes') }, article, notes));
    updateSaveUI();
    let doc = S.docCache[path];
    try {
      if (!doc) doc = S.docCache[path] = await api('GET', '/api/doc?path=' + encodeURIComponent(path));
    } catch (e) {
      article.replaceChildren(h('p', {}, 'Could not open this document: ' + e.message));
      return;
    }
    if (S.view !== 'doc' || decodeURIComponent(location.hash.slice(6)) !== path) return;
    const body = h('div', { html: doc.html });
    article.replaceChildren(...[
      found && S.edit ? ed(it, 'title', 'h1', 'doc-title', 'Title') : h('h1', { class: 'doc-title' }, it.title || doc.title || path),
      h('div', { class: 'doc-meta' },
        it.by ? h('span', {}, it.by) : null,
        (it.source || doc.source) ? h('a', { href: it.source || doc.source, target: '_blank', rel: 'noopener' }, 'Original page ↗') : null,
        h('a', { href: '/files/' + encPath(path), target: '_blank', rel: 'noopener' }, 'Raw file')),
      found && (S.edit || it.description) ? (S.edit ? ed(it, 'description', 'div', 'doc-desc', 'Add a description of this document…', { multiline: true }) : h('div', { class: 'doc-desc' }, it.description)) : null,
      body].filter(Boolean));
    if (doc.math) loadMathJax().then(() => window.MathJax && window.MathJax.typesetPromise && window.MathJax.typesetPromise([body]).catch(() => {}));
    scrollTo(0, 0);
  }

  // ---------- routing & render ----------
  function render() {
    const hash = location.hash;
    if (hash.startsWith('#/doc/')) {
      S.view = 'doc';
      return renderDoc(decodeURIComponent(hash.slice(6)));
    }
    const y = S.view === 'home' ? scrollY : 0;
    S.view = 'home';
    const wrap = h('div', { class: 'wrap' });
    if (S.edit) wrap.append(adder(0));
    S.c.blocks.forEach((b, i) => {
      if (b.hidden && !S.edit) return;
      wrap.append(blockShell(b, i));
      if (S.edit) wrap.append(adder(i + 1));
    });
    wrap.append(S.edit ? ed(S.c.settings, 'footer', 'footer', 'foot', 'Footer text', { multiline: true }) : h('footer', { class: 'foot' }, S.c.settings.footer || ''));
    app.replaceChildren(topbar(false), wrap);
    updateSaveUI();
    scrollTo(0, y);
  }
  function scrollToAnchor(hash) {
    let id = hash.slice(1);
    if (id.startsWith('sec:')) {
      const key = id.slice(4);
      const sec = S.c.library.find((s) => s.folder === key || s.id === key || s.title === key);
      if (!sec) return;
      id = 's-' + sec.id;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // In-page anchors shouldn't trigger the hash router; scroll instead.
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#' || href.startsWith('#/')) return;
    ev.preventDefault();
    if (S.view !== 'home') { history.pushState(null, '', '#'); render(); }
    scrollToAnchor(href);
  });
  // Links inside editable text shouldn't navigate while editing.
  document.addEventListener('click', (ev) => {
    if (S.edit && ev.target.closest('[contenteditable] a, a [contenteditable]')) ev.preventDefault();
  }, true);
  addEventListener('hashchange', () => {
    if (location.hash.startsWith('#/doc/') || S.view !== 'home') render();
  });
  addEventListener('keydown', (ev) => {
    const mod = ev.metaKey || ev.ctrlKey;
    const inField = ev.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName);
    if (mod && ev.key.toLowerCase() === 's') { ev.preventDefault(); if (isDirty()) save(); return; }
    if (mod && ev.key.toLowerCase() === 'z' && !inField) { ev.preventDefault(); ev.shiftKey ? redo() : undo(); return; }
    if (!mod && !inField && ev.key === 'e' && !document.querySelector('.modal, .drawer')) toggleEdit();
  });
  addEventListener('beforeunload', (ev) => { if (S.c && isDirty()) { ev.preventDefault(); ev.returnValue = ''; } });

  // ---------- boot ----------
  api('GET', '/api/content').then((c) => {
    S.c = c;
    S.c.notes = S.c.notes || {};
    S.savedJSON = JSON.stringify(S.c);
    applySettings();
    render();
  }).catch((e) => {
    app.replaceChildren(h('div', { class: 'wrap' }, h('h1', {}, 'Could not load the site'), h('p', {}, e.message),
      h('p', {}, 'Is the backend running? Start it with: python3 -I app/server.py')));
  });
})();
