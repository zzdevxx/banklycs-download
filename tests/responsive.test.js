'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');

const html = read('index.html');
const app = read('app.js');
const css = read('style.css');

function ruleFor(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`(?:^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`, 'm'));
  assert.ok(match, `missing CSS rule: ${selector}`);
  return match[1];
}

function minHeightOf(selector) {
  const value = ruleFor(selector).match(/min-height:\s*(\d+)px/);
  assert.ok(value, `${selector} must declare min-height`);
  return Number(value[1]);
}

test('responsive assets are versioned for the cached live domain', () => {
  assert.ok(html.includes('href="./style.css?v=20261126-responsive"'));
  assert.ok(html.includes('src="./release.js?v=20261126-responsive"'));
  assert.ok(html.includes('src="./app.js?v=20261126-responsive"'));
});

test('mobile menu exposes every destination without hiding navigation unconditionally', () => {
  assert.match(html, /<meta\s+name="viewport"\s+content="width=device-width, initial-scale=1\.0">/);
  assert.match(html, /id="nav-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="site-nav-list"/);
  assert.match(html, /<ul class="nav-list" id="site-nav-list">/);
  assert.ok(css.includes(".site-header[data-nav-open='false'] .site-nav"));
  assert.ok(css.includes(".site-header[data-nav-open='false'] .header-actions"));
  assert.ok(!/\.site-nav\s*\{\s*display:\s*none/.test(css), 'nav must not be hidden by breakpoint alone');
  assert.ok(!/\.header-actions\s+\.btn-outline\s*\{\s*display:\s*none/.test(css));
  assert.ok(app.includes('function setupNav()'));
  assert.ok(app.includes("mobile.addEventListener('change', closeOnDesktop)"));
  assert.ok(app.includes("event.key === 'Escape' && el.siteHeader.dataset.navOpen === 'true'"));
});

test('interactive controls keep at least 44px touch targets', () => {
  for (const selector of [
    '.nav-toggle',
    '.btn',
    '.nav-link',
    '.console-input',
    '.console-clear-btn',
    '.console-tab',
    '.btn-text-xs',
    '.sim-rundown-remove',
    '.btn-copy',
    '.footer-link',
    '.faq-question'
  ]) {
    assert.ok(minHeightOf(selector) >= 44, `${selector} is below 44px`);
  }
  for (const selector of ['.nav-toggle', '.console-tab', '.btn-text-xs', '.sim-rundown-remove', '.btn-copy']) {
    const value = ruleFor(selector).match(/min-width:\s*(\d+)px/);
    assert.ok(value && Number(value[1]) >= 44, `${selector} must be at least 44px wide`);
  }
  assert.ok(!/(^|\s)height:\s*44px/m.test(ruleFor('.console-input')));
});

test('narrow and zoomed viewports cannot force the simulator to overflow', () => {
  assert.ok(css.includes('minmax(min(240px, 100%), 1fr)'));
  assert.ok(!/\.console-sidebar\s*\{\s*height:\s*420px/.test(css));
  assert.ok(css.includes('overflow-wrap: anywhere'));
  assert.ok(css.includes('@media (forced-colors: active)'));
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
});

test('faq answers expose their controlled region', () => {
  assert.ok(app.includes("question.setAttribute('aria-controls', answerId)"));
  assert.ok(app.includes("answer.classList.contains('faq-answer')"));
});
