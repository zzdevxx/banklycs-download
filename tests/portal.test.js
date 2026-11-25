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

test('all original anchors and legal links remain', () => {
  for (const id of ['hero', 'features', 'preview', 'architecture', 'download', 'guide', 'faq']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  for (const href of ['https://zzdree.my.id/privacy', 'https://zzdree.my.id/terms', 'https://zzdree.my.id/data-deletion']) {
    assert.ok(html.includes(href));
  }
});

test('fabricated timings and fake readiness are absent', () => {
  const source = `${html}\n${app}`;
  for (const claim of ['< 20 ms', '< 1 MS', '~1 dtk', '< 2 ms', 'ProPresenter 7 Ready', 'INJECT KE PROPRESENTER']) {
    assert.ok(!source.includes(claim), `must not contain: ${claim}`);
  }
  assert.ok(!source.includes('—'));
  assert.ok(!source.includes('📋'));
});

test('installer and database expose release page plus direct download', () => {
  for (const id of [
    'dl-installer-release', 'dl-installer-direct', 'dl-db-release', 'dl-db-direct',
    'dl-installer-sha', 'dl-db-sha', 'dl-status', 'dl-source', 'copy-fallback'
  ]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.ok(app.includes('createReleaseController'));
  assert.ok(app.includes('zzdree.my.id/banklycs/download/'));
});

test('simulator uses native controls, honest simulation, and storage fallback', () => {
  assert.ok(app.includes("document.createElement('button')"));
  assert.ok(app.includes('SIMULASI BROWSER'));
  assert.ok(app.includes('salin manual'));
  assert.ok(app.includes('localStorage'));
  assert.ok(!/catch\s*\(\s*\)\s*\{\s*\/\//.test(app));
});

test('sample songs come from database-verified filenames', () => {
  for (const filename of [
    'Amazing Grace - John Newton.txt',
    'Ku Berbahagia - KJ 392.txt',
    'Aku Percaya - KJ 280.txt',
    'Kemenangan Terjadi Di Sini - GMS Live.txt',
    'Way Maker - Sinach.txt',
    'Aha do Naung Hubaen Tuhan - BE 784.txt',
    'Ada Yang Tanya - PKJ 117.txt',
    'Adakah Damai di Hatimu - NKB 13.txt'
  ]) {
    assert.ok(app.includes(filename), `must include verified sample: ${filename}`);
  }
  assert.ok(!app.includes('Sentuh Hatiku - Jason.txt'));
  assert.ok(!app.includes('Ro Ma Ho Tu Jesus - BE 179.txt'));
});

test('accessibility baseline is present', () => {
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /tabular-num/);
});
