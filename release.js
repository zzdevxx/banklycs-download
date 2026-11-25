(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ReleaseContract = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const PROJECTS = {
    zzluxora: {
      slug: 'zzluxora',
      name: 'ZZLUXORA',
      repo: 'zzdevxx/zzluxora',
      apiUrl: 'https://api.github.com/repos/zzdevxx/zzluxora/releases/latest',
      fallback: {
        tag: 'v10.0',
        version: '10.0.0',
        asset: 'ZZLUXORA-Setup-10.0.0.exe',
        size: 80539329,
        sha256: 'c5a35679cef3dd260bf7416848f0cfa2c081f4efe07c57ea79e192fcf4397287'
      }
    },
    banklycs: {
      slug: 'banklycs',
      name: 'Banklycs',
      repo: 'zzdevxx/banklycs',
      apiUrl: 'https://api.github.com/repos/zzdevxx/banklycs/releases/latest',
      fallback: {
        tag: 'v2.7',
        version: '2.7.0',
        asset: 'Banklycs-Setup-2.7.0.exe',
        size: 39884985,
        sha256: '95190137a3b50a3347c0c986d3eb148f608924ea4f78c703f280a81df4ed5159'
      },
      dbFallback: {
        tag: 'v2.6',
        version: '2026-11-12T14:55:47Z',
        asset: 'database_2026-11-12_14-55-47.db',
        size: 111144960,
        sha256: '7ccf6a94b62316b3a76c56a8c0b796de7ec9c1cd4ebc96c86e47a67d2423e287'
      }
    }
  };

  const SHA256 = /^[a-f0-9]{64}$/i;

  function isSha256(value) {
    return typeof value === 'string' && SHA256.test(value.trim());
  }

  function buildUrls(projectKey, tag, asset) {
    const project = PROJECTS[projectKey];
    if (!project) throw new Error(`Proyek tidak dikenal: ${projectKey}`);
    const safeTag = encodeURIComponent(String(tag));
    const safeAsset = encodeURIComponent(String(asset));
    return {
      releasePage: `https://github.com/${project.repo}/releases/tag/${safeTag}`,
      assetPage: `https://github.com/${project.repo}/releases/download/${safeTag}/${safeAsset}`,
      direct: `https://zzdree.my.id/${project.slug}/download/${safeAsset}?tag=${safeTag}`,
      checksum: `https://zzdree.my.id/${project.slug}/sha256?tag=${safeTag}`
    };
  }

  function parseChecksum(payload) {
    if (typeof payload === 'string') return { sha256: payload.trim() };
    if (!payload || typeof payload !== 'object') return null;
    const digest = payload.sha256 || payload.checksum || payload.digest;
    if (typeof digest !== 'string') return null;
    return {
      sha256: digest.trim(),
      tag: payload.tag || payload.release_tag || null,
      name: payload.name || payload.asset || payload.asset_name || null
    };
  }

  function makeRelease(projectKey, snapshot, source, verified) {
    const urls = buildUrls(projectKey, snapshot.tag, snapshot.asset);
    return {
      tag: snapshot.tag,
      version: snapshot.version || String(snapshot.tag).replace(/^v/, ''),
      asset: snapshot.asset,
      size: snapshot.size,
      sha256: snapshot.sha256,
      source,
      verified,
      githubRelease: urls.releasePage,
      githubAsset: urls.assetPage,
      direct: urls.direct,
      checksumUrl: urls.checksum
    };
  }

  function fallbackResult(projectKey, snapshot, message) {
    return {
      status: 'fallback',
      source: 'fallback',
      verified: true,
      message,
      release: makeRelease(projectKey, snapshot, 'fallback', true)
    };
  }

  function resolveRelease(projectKey, apiRelease, checksumPayload, options) {
    const settings = options || {};
    const project = PROJECTS[projectKey];
    const snapshot = settings.type === 'database' ? project.dbFallback : project.fallback;
    const offline = settings.reason ? ` (${settings.reason})` : '';

    if (!apiRelease || typeof apiRelease.tag_name !== 'string' || !Array.isArray(apiRelease.assets)) {
      return fallbackResult(projectKey, snapshot, `Metadata GitHub tidak tersedia${offline}. Snapshot publik terakhir disajikan.`);
    }

    const tag = apiRelease.tag_name;
    const expectedAsset = snapshot.asset;
    const extension = expectedAsset.slice(expectedAsset.lastIndexOf('.')).toLowerCase().replace('.', '\\.');
    const extensionPattern = new RegExp(`${extension}$`, 'i');
    const asset = apiRelease.assets.find((item) => item && item.name === expectedAsset) ||
      (tag === snapshot.tag ? null : apiRelease.assets.find((item) => item && typeof item.name === 'string' && extensionPattern.test(item.name)));

    if (!asset || typeof asset.name !== 'string') {
      return fallbackResult(projectKey, snapshot, 'Aset installer tidak ditemukan pada rilis GitHub. Snapshot publik terakhir disajikan.');
    }

    const checksum = parseChecksum(checksumPayload);
    if (!checksum || !isSha256(checksum.sha256)) {
      return fallbackResult(projectKey, snapshot, 'Checksum tidak tersedia atau tidak valid. Snapshot publik terakhir disajikan.');
    }

    if (checksum.tag && checksum.tag !== tag) {
      return fallbackResult(projectKey, snapshot, 'Tag respons checksum berbeda dengan tag rilis GitHub. Snapshot publik terakhir disajikan.');
    }

    if (checksum.name && checksum.name !== asset.name) {
      return fallbackResult(projectKey, snapshot, 'Nama berkas pada checksum berbeda dengan aset GitHub. Snapshot publik terakhir disajikan.');
    }

    const urls = buildUrls(projectKey, tag, asset.name);
    if (asset.browser_download_url !== urls.assetPage) {
      return fallbackResult(projectKey, snapshot, 'URL aset GitHub di luar daftar izin. Snapshot publik terakhir disajikan.');
    }

    if (!Number.isFinite(asset.size) || asset.size <= 0) {
      return fallbackResult(projectKey, snapshot, 'Ukuran aset GitHub tidak valid. Snapshot publik terakhir disajikan.');
    }

    if (tag === snapshot.tag && checksum.sha256.toLowerCase() !== snapshot.sha256.toLowerCase()) {
      return fallbackResult(projectKey, snapshot, 'Checksum rilis berbeda dengan checksum snapshot publik. Snapshot terverifikasi disajikan.');
    }

    const exactMatch = tag === snapshot.tag &&
      asset.name === snapshot.asset &&
      asset.size === snapshot.size &&
      checksum.sha256.toLowerCase() === snapshot.sha256.toLowerCase();

    const release = makeRelease(projectKey, {
      tag,
      version: tag === snapshot.tag ? snapshot.version : tag.replace(/^v/, ''),
      asset: asset.name,
      size: asset.size,
      sha256: checksum.sha256
    }, 'api', exactMatch);

    return {
      status: 'ready',
      source: exactMatch ? 'snapshot' : 'api',
      verified: exactMatch,
      release,
      message: exactMatch
        ? 'Versi, ukuran, dan checksum cocok dengan snapshot rilis publik.'
        : 'Rilis GitHub terbaca. Checksum dari portal diterima, tetapi belum cocok dengan snapshot lokal.'
    };
  }

  function createReleaseController(projectKey, settings) {
    const options = settings || {};
    const project = PROJECTS[projectKey];
    const fetchJson = options.fetchJson;
    const apply = options.apply;
    let generation = 0;

    return {
      async load() {
        const requestId = ++generation;
        apply({ status: 'loading', source: 'loading', message: 'Memuat metadata rilis dari GitHub dan portal...' });

        let apiRelease = null;
        let failure = null;
        try {
          apiRelease = await fetchJson(project.apiUrl);
        } catch (error) {
          failure = error && error.message ? error.message : 'permintaan gagal';
        }
        if (requestId !== generation) return { stale: true };

        let checksumPayload = null;
        if (apiRelease && typeof apiRelease.tag_name === 'string') {
          const urls = buildUrls(projectKey, apiRelease.tag_name, 'placeholder');
          try {
            checksumPayload = await fetchJson(urls.checksum);
          } catch (error) {
            failure = failure || (error && error.message ? error.message : 'checksum gagal');
          }
        }
        if (requestId !== generation) return { stale: true };

        const result = resolveRelease(projectKey, apiRelease, checksumPayload, {
          type: options.type,
          reason: failure
        });
        apply(result);
        return result;
      },
      cancel() {
        generation += 1;
      }
    };
  }

  return { PROJECTS, SHA256, buildUrls, parseChecksum, isSha256, resolveRelease, createReleaseController };
});
