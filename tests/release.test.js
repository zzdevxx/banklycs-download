'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const contract = require('../release.js');

const project = contract.PROJECTS.banklycs;
const fallback = project.fallback;
const dbFallback = project.dbFallback;
const apiRelease = {
  tag_name: fallback.tag,
  assets: [{
    name: fallback.asset,
    size: fallback.size,
    browser_download_url: `https://github.com/${project.repo}/releases/download/${fallback.tag}/${fallback.asset}`
  }]
};

test('published installer fallback snapshot is internally coherent', () => {
  const urls = contract.buildUrls('banklycs', fallback.tag, fallback.asset);
  assert.equal(fallback.sha256.length, 64);
  assert.match(fallback.sha256, /^[a-f0-9]{64}$/);
  assert.equal(urls.releasePage, `https://github.com/${project.repo}/releases/tag/${fallback.tag}`);
  assert.equal(urls.direct, `https://zzdree.my.id/banklycs/download/${fallback.asset}?tag=${fallback.tag}`);
});

test('published database fallback matches the database manifest', () => {
  assert.equal(dbFallback.asset, 'database_2026-11-12_14-55-47.db');
  assert.equal(dbFallback.size, 111144960);
  assert.equal(dbFallback.sha256, '7ccf6a94b62316b3a76c56a8c0b796de7ec9c1cd4ebc96c86e47a67d2423e287');
  const urls = contract.buildUrls('banklycs', dbFallback.tag, dbFallback.asset);
  assert.equal(urls.direct, `https://zzdree.my.id/banklycs/download/${dbFallback.asset}?tag=${dbFallback.tag}`);
});

test('API failure keeps the published fallback visible with an accessible source', () => {
  const result = contract.resolveRelease('banklycs', null, null, { reason: 'network' });
  assert.equal(result.status, 'fallback');
  assert.equal(result.source, 'fallback');
  assert.equal(result.release.asset, fallback.asset);
  assert.equal(result.verified, true);
  assert.match(result.message, /disajikan/i);
});

test('a mismatched checksum cannot claim verification', () => {
  const result = contract.resolveRelease('banklycs', apiRelease, {
    tag: fallback.tag,
    name: fallback.asset,
    sha256: '0'.repeat(64)
  });
  assert.equal(result.source, 'fallback');
  assert.equal(result.verified, true);
  assert.match(result.message, /checksum/i);
});

test('tag mismatch on checksum response falls back', () => {
  const result = contract.resolveRelease('banklycs', apiRelease, {
    tag: 'v2.6',
    name: fallback.asset,
    sha256: fallback.sha256
  });
  assert.equal(result.source, 'fallback');
  assert.match(result.message, /tag/i);
});

test('stale metadata response cannot overwrite a newer load', async () => {
  let resolveFirst;
  const firstPromise = new Promise((resolve) => { resolveFirst = resolve; });
  const applied = [];
  let call = 0;
  const controller = contract.createReleaseController('banklycs', {
    fetchJson() {
      call += 1;
      return call === 1 ? firstPromise : Promise.reject(new Error('offline'));
    },
    apply(value) { applied.push(value.status); }
  });

  const first = controller.load();
  const second = controller.load();
  const secondResult = await second;
  resolveFirst(apiRelease);
  const firstResult = await first;
  assert.equal(firstResult.stale, true);
  assert.equal(secondResult.source, 'fallback');
  assert.deepEqual(applied, ['loading', 'loading', 'fallback']);
});
