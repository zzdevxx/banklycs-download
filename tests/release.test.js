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

function workerChecksum(tag, assets, overrides = {}) {
  return {
    app: overrides.app || 'banklycs',
    tag,
    source: overrides.source || 'github-release-api',
    default: overrides.default || assets[0],
    assets
  };
}

const dbApiRelease = {
  tag_name: dbFallback.tag,
  assets: [{
    name: dbFallback.asset,
    size: dbFallback.size,
    browser_download_url: `https://github.com/${project.repo}/releases/download/${dbFallback.tag}/${dbFallback.asset}`
  }]
};

const workerInstallerChecksum = workerChecksum(fallback.tag, [{
  name: fallback.asset,
  size: fallback.size,
  sha256: fallback.sha256
}]);

const workerDatabaseChecksum = workerChecksum(dbFallback.tag, [{
  name: dbFallback.asset,
  size: dbFallback.size,
  sha256: dbFallback.sha256
}], {
  default: {
    name: fallback.asset,
    size: fallback.size,
    sha256: fallback.sha256
  }
});

test('legacy checksum string and simple object stay supported', () => {
  assert.deepEqual(contract.parseChecksum(`  ${fallback.sha256}  `), { sha256: fallback.sha256 });
  const parsed = contract.parseChecksum({
    tag: fallback.tag,
    name: fallback.asset,
    sha256: fallback.sha256
  });
  assert.equal(parsed.sha256, fallback.sha256);
  assert.equal(parsed.tag, fallback.tag);
  assert.equal(parsed.name, fallback.asset);
});

test('new worker checksum schema selects the exact installer from assets and ignores default', () => {
  const payload = workerChecksum(fallback.tag, [
    { name: 'Banklycs-notes.txt', size: 32, sha256: 'a'.repeat(64) },
    { name: fallback.asset, size: fallback.size, sha256: fallback.sha256 }
  ], {
    default: { name: 'Banklycs-notes.txt', size: 32, sha256: 'a'.repeat(64) }
  });

  const parsed = contract.parseChecksum(payload, fallback.asset, 'banklycs');
  assert.equal(parsed.sha256, fallback.sha256);
  assert.equal(parsed.name, fallback.asset);
  assert.equal(parsed.size, fallback.size);
  assert.equal(parsed.tag, fallback.tag);
  assert.equal(parsed.source, 'github-release-api');

  const result = contract.resolveRelease('banklycs', apiRelease, payload);
  assert.equal(result.status, 'ready');
  assert.equal(result.source, 'snapshot');
  assert.equal(result.verified, true);
  assert.equal(result.checksumSource, 'github-release-api');
  assert.equal(result.release.asset, fallback.asset);
  assert.equal(result.release.size, fallback.size);
  assert.equal(result.release.sha256, fallback.sha256);
});

test('worker checksum selects the database asset even when default is the installer', () => {
  const parsed = contract.parseChecksum(workerDatabaseChecksum, dbFallback.asset, 'banklycs');
  assert.equal(parsed.name, dbFallback.asset);
  assert.equal(parsed.sha256, dbFallback.sha256);
  assert.equal(parsed.size, dbFallback.size);

  const result = contract.resolveRelease('banklycs', dbApiRelease, workerDatabaseChecksum, { type: 'database' });
  assert.equal(result.status, 'ready');
  assert.equal(result.source, 'snapshot');
  assert.equal(result.verified, true);
  assert.equal(result.release.tag, dbFallback.tag);
  assert.equal(result.release.asset, dbFallback.asset);
  assert.equal(result.release.sha256, dbFallback.sha256);
});

test('worker checksum rejects app, tag, name, size, hash, and duplicate ambiguity', () => {
  assert.equal(contract.parseChecksum(
    workerChecksum(fallback.tag, [{ name: fallback.asset, size: fallback.size, sha256: fallback.sha256 }], { app: 'zzluxora' }),
    fallback.asset,
    'banklycs'
  ), null);

  const tagMismatch = contract.resolveRelease('banklycs', apiRelease, workerChecksum('v2.6', [{
    name: fallback.asset,
    size: fallback.size,
    sha256: fallback.sha256
  }]));
  assert.equal(tagMismatch.source, 'fallback');
  assert.match(tagMismatch.message, /tag/i);

  assert.equal(contract.parseChecksum(workerChecksum(fallback.tag, [{
    name: 'Banklycs-Setup-2.6.0.exe',
    size: fallback.size,
    sha256: fallback.sha256
  }]), fallback.asset, 'banklycs'), null);

  const sizeMismatch = contract.resolveRelease('banklycs', apiRelease, workerChecksum(fallback.tag, [{
    name: fallback.asset,
    size: fallback.size + 1,
    sha256: fallback.sha256
  }]));
  assert.equal(sizeMismatch.source, 'fallback');
  assert.match(sizeMismatch.message, /ukuran/i);

  const hashMismatch = contract.resolveRelease('banklycs', apiRelease, workerChecksum(fallback.tag, [{
    name: fallback.asset,
    size: fallback.size,
    sha256: '0'.repeat(64)
  }]));
  assert.equal(hashMismatch.source, 'fallback');
  assert.match(hashMismatch.message, /checksum/i);

  assert.equal(contract.parseChecksum(workerChecksum(fallback.tag, [
    { name: fallback.asset, size: fallback.size, sha256: fallback.sha256 },
    { name: fallback.asset, size: fallback.size, sha256: fallback.sha256 }
  ]), fallback.asset, 'banklycs'), null);
});

test('release controller uses exact GitHub routes and reaches verified ready state', async () => {
  assert.equal(project.dbApiUrl, 'https://api.github.com/repos/zzdevxx/banklycs/releases/tags/v2.6');
  const checksumUrl = (tag) => `https://zzdree.my.id/banklycs/sha256?tag=${tag}`;

  const installerCalls = [];
  const installer = contract.createReleaseController('banklycs', {
    fetchJson(url) {
      installerCalls.push(url);
      if (url === project.apiUrl) return apiRelease;
      if (url === checksumUrl(fallback.tag)) return workerInstallerChecksum;
      throw new Error(`unexpected installer URL: ${url}`);
    },
    apply() {}
  });
  const installerResult = await installer.load();
  assert.deepEqual(installerCalls, [project.apiUrl, checksumUrl(fallback.tag)]);
  assert.equal(installerResult.status, 'ready');
  assert.equal(installerResult.source, 'snapshot');
  assert.equal(installerResult.verified, true);
  assert.equal(installerResult.release.asset, fallback.asset);

  const databaseCalls = [];
  const database = contract.createReleaseController('banklycs', {
    type: 'database',
    fetchJson(url) {
      databaseCalls.push(url);
      if (url === project.dbApiUrl) return dbApiRelease;
      if (url === checksumUrl(dbFallback.tag)) return workerDatabaseChecksum;
      throw new Error(`unexpected database URL: ${url}`);
    },
    apply() {}
  });
  const databaseResult = await database.load();
  assert.deepEqual(databaseCalls, [project.dbApiUrl, checksumUrl(dbFallback.tag)]);
  assert.equal(databaseResult.status, 'ready');
  assert.equal(databaseResult.source, 'snapshot');
  assert.equal(databaseResult.verified, true);
  assert.equal(databaseResult.release.asset, dbFallback.asset);
  assert.equal(databaseResult.release.sha256, dbFallback.sha256);
  assert.equal(databaseResult.release.size, dbFallback.size);
});

test('a newer release selects its own named checksum without claiming snapshot verification', () => {
  const tag = 'v2.8';
  const name = 'Banklycs-Setup-2.8.0.exe';
  const size = fallback.size + 1;
  const release = {
    tag_name: tag,
    assets: [{ name, size, browser_download_url: `https://github.com/${project.repo}/releases/download/${tag}/${name}` }]
  };
  const result = contract.resolveRelease('banklycs', release, workerChecksum(tag, [{
    name, size, sha256: 'a'.repeat(64)
  }]));
  assert.equal(result.status, 'ready');
  assert.equal(result.source, 'api');
  assert.equal(result.verified, false);
  assert.equal(result.release.asset, name);
});
