(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const STORAGE_KEY = 'banklycs_demo_rundown';
  const DIRECT_BASE = 'https://zzdree.my.id/banklycs/download/';

  // Cuplikan ini disalin dari kolom content database rilis v2.6, bukan teks rekaan.
  const SAMPLE_SONGS = [
    {
      id: 'amazing-grace',
      filename: 'Amazing Grace - John Newton.txt',
      title: 'Amazing Grace',
      artist: 'John Newton',
      category: 'EN',
      slides: [
        { header: 'BLANK', type: 'blank', lines: ['Amazing Grace - John Newton'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Amazing grace how sweet the sound', 'That saved a wretch like me'] },
        { header: 'VERSE 1', type: 'verse', lines: ['I once was lost, but now am found', 'Was blind but now I see'] },
        { header: 'VERSE 2', type: 'verse', lines: ['Twas grace that taught my heart to fear', 'And grace my fears relieved'] },
        { header: 'VERSE 2', type: 'verse', lines: ['How precious did that grace appear', 'The hour I first believed'] }
      ]
    },
    {
      id: 'ku-berbahagia',
      filename: 'Ku Berbahagia - KJ 392.txt',
      title: 'Ku Berbahagia',
      artist: 'KJ 392',
      category: 'KJ',
      slides: [
        { header: 'BLANK', type: 'blank', lines: ['Ku Berbahagia - KJ 392'] },
        { header: 'VERSE 1', type: 'verse', lines: ["'Ku berbahagia, yakin teguh", 'Yesus aba-di kepunyaanku!'] },
        { header: 'VERSE 1', type: 'verse', lines: ["Aku warisNya, 'ku ditebus", 'Ciptaan baru Rohul kudus.'] },
        { header: 'CHORUS', type: 'chorus', lines: ['Aku bernyanyi bahagia', 'Memuji Yesus selamanya'] },
        { header: 'CHORUS', type: 'chorus', lines: ['Aku bernyanyi bahagia', 'Memuji Yesus selamanya.'] }
      ]
    },
    {
      id: 'aku-percaya',
      filename: 'Aku Percaya - KJ 280.txt',
      title: 'Aku Percaya',
      artist: 'KJ 280',
      category: 'KJ',
      slides: [
        { header: 'BLANK', type: 'blank', lines: ['Aku Percaya - KJ 280'] },
        { header: 'VERSE', type: 'verse', lines: ['Aku percaya Allah yang kekal', 'Pencipta langit bumi semesta'] },
        { header: 'VERSE', type: 'verse', lines: ['Bapa yang maha pengasih dan adil', 'Memelihara hidup umatNya'] },
        { header: 'CHORUS', type: 'chorus', lines: ['Aku percaya pada Yesus Kristus', 'Penebus dosa umat manusia'] },
        { header: 'CHORUS', type: 'chorus', lines: ['Oleh Roh Kudus kita disatukan', 'Dalam pengharapan yang kekal'] }
      ]
    },
    {
      id: 'kemenangan',
      filename: 'Kemenangan Terjadi Di Sini - GMS Live.txt',
      title: 'Kemenangan Terjadi Di Sini',
      artist: 'GMS Live',
      category: 'ID',
      slides: [
        { header: 'BLANK', type: 'blank', lines: ['Kemenangan Terjadi Di Sini - GMS Live'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Kumenyembah dalam kudus hadiratMu', 'Hampiri tahta kasih karuniaMu Bapa'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Kekuatanku hanya dalam hadiratMu', 'Yesusku hanya Kaulah segalanya.'] },
        { header: 'CHORUS', type: 'chorus', lines: ['Kuyakin Kau hadir di sini', 'Kurasakan kuasa yang tak terbatas'] },
        { header: 'CHORUS', type: 'chorus', lines: ['Kuyakin Kau nyata di sini', 'Kemenangan terjadi disini.'] },
        { header: 'BRIDGE', type: 'bridge', lines: ['Segnap jiwaku memujiMu', 'Sungguh besar Kau Yesusku'] }
      ]
    },
    {
      id: 'way-maker',
      filename: 'Way Maker - Sinach.txt',
      title: 'Way Maker',
      artist: 'Sinach',
      category: 'ID',
      slides: [
        { header: 'BLANK', type: 'blank', lines: ['Way Maker - Sinach'] },
        { header: 'VERSE 1', type: 'verse', lines: ['You are here, moving in our midst', 'I worship you I worship you'] },
        { header: 'CHORUS', type: 'chorus', lines: ['You are Way Maker, Miracle Worker', 'Promise Keeper, Light in the darkness'] },
        { header: 'CHORUS', type: 'chorus', lines: ['My God, that is who You are'] }
      ]
    },
    {
      id: 'aha-do',
      filename: 'Aha do Naung Hubaen Tuhan - BE 784.txt',
      title: 'Aha do Naung Hubaen Tuhan',
      artist: 'BE 784',
      category: 'BE',
      slides: [
        { header: 'BLANK', type: 'blank', lines: ['Aha do Naung Hubaen Tuhan - BE 784'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Aha do naung hubaen Tuhan', 'Aha do naung hubaen Tuhan'] },
        { header: 'VERSE 2', type: 'verse', lines: ['Dia ma bahenonku Tuhan', 'Dia ma bahenonku Tuhan'] }
      ]
    },
    {
      id: 'ada-yang-tanya',
      filename: 'Ada Yang Tanya - PKJ 117.txt',
      title: 'Ada Yang Tanya',
      artist: 'PKJ 117',
      category: 'PKJ',
      slides: [
        { header: 'BLANK', type: 'blank', lines: ['Ada Yang Tanya - PKJ 117'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Ada yang tanya kepadaku.', 'Siapa Yesus yang jadi junjunganku.'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Dia Jurus\'lamat dan Tuhanku', 'artinya kub\'ritahukan kepadamu'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Dia segalanya bagi diriku', 'Dia segalanya dalam hidupku.'] }
      ]
    },
    {
      id: 'adakah-damai',
      filename: 'Adakah Damai di Hatimu - NKB 13.txt',
      title: 'Adakah Damai di Hatimu',
      artist: 'NKB 13',
      category: 'NKB',
      slides: [
        { header: 'BLANK', type: 'blank', lines: ['Adakah Damai di Hatimu - NKB 13'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Adakah damai di hatimu', 'Kala badai hidup menderu?'] },
        { header: 'VERSE 1', type: 'verse', lines: ['Datanglah pada Yesus Tuhan', 'Dia b\'ri kelegaan jiwa'] },
        { header: 'CHORUS', type: 'chorus', lines: ['Damai Yesus melampaui akal', 'Menjaga hati dan pikiranmu'] }
      ]
    }
  ];

  const state = {
    activeCategory: 'ALL',
    searchQuery: '',
    selectedSong: null,
    activeSlideIndex: 0,
    rundown: [],
    toastTimeout: null,
    toastHideTimeout: null,
    storageNotice: '',
    storageWarningShown: false
  };

  const releaseState = {
    installer: null,
    database: null
  };

  const el = {
    search: document.getElementById('sim-search-input'),
    clearSearch: document.getElementById('sim-clear-btn'),
    tabs: document.querySelectorAll('.console-tab'),
    songs: document.getElementById('sim-song-list'),
    songCount: document.getElementById('sim-song-count'),
    inspectorCategory: document.getElementById('sim-inspector-category'),
    inspectorTitle: document.getElementById('sim-inspector-title'),
    inspectorArtist: document.getElementById('sim-inspector-artist'),
    add: document.getElementById('sim-add-btn'),
    canvas: document.getElementById('sim-canvas-container'),
    rundown: document.getElementById('sim-rundown-list'),
    rundownCount: document.getElementById('sim-rundown-count'),
    clearRundown: document.getElementById('sim-clear-rundown-btn'),
    copyWa: document.getElementById('sim-copy-wa-btn'),
    simulateInject: document.getElementById('sim-fake-inject-btn'),
    toast: document.getElementById('toast'),
    copyFallback: document.getElementById('copy-fallback'),
    copyButtons: document.querySelectorAll('.btn-copy'),
    faqQuestions: document.querySelectorAll('.faq-question')
  };

  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function showToast(message) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.hidden = false;
    el.toast.classList.add('show');

    if (state.toastTimeout) clearTimeout(state.toastTimeout);
    if (state.toastHideTimeout) clearTimeout(state.toastHideTimeout);

    state.toastTimeout = setTimeout(() => {
      el.toast.classList.remove('show');
      state.toastHideTimeout = setTimeout(() => {
        el.toast.hidden = true;
      }, 150);
    }, 2600);
  }

  function formatBytes(value) {
    if (!Number.isFinite(Number(value))) return 'tidak tersedia';
    return `${new Intl.NumberFormat('id-ID').format(Number(value))} byte`;
  }

  function sourceLabel(result, prefix) {
    if (!result) return `${prefix}: menunggu metadata`;
    if (result.status === 'loading') return `${prefix}: menunggu metadata`;
    if (result.source === 'fallback') return `${prefix}: snapshot rilis publik terverifikasi`;
    if (result.verified) return `${prefix}: GitHub API dan portal, checksum cocok`;
    return `${prefix}: GitHub API, checksum belum cocok dengan snapshot`;
  }

  function resultMessage(result, prefix) {
    if (!result) return `${prefix}: menunggu metadata`;
    if (result.status === 'loading') return `${prefix}: ${result.message}`;
    return `${prefix}: ${result.message}`;
  }

  function renderReleaseStatus() {
    const status = document.getElementById('dl-status');
    const source = document.getElementById('dl-source');
    if (!status || !source) return;

    status.textContent = [
      resultMessage(releaseState.installer, 'Installer'),
      resultMessage(releaseState.database, 'Database')
    ].join(' | ');
    source.textContent = [
      sourceLabel(releaseState.installer, 'Installer'),
      sourceLabel(releaseState.database, 'Database')
    ].join(' | ');
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function setHref(id, value, allowedPrefix) {
    const node = document.getElementById(id);
    if (!node || typeof value !== 'string') return;
    if (allowedPrefix && !value.startsWith(allowedPrefix)) return;
    node.href = value;
  }

  function applyRelease(result) {
    releaseState.installer = result;
    renderReleaseStatus();
    const release = result.release;
    if (!release) return;

    setText('dl-installer-version', `Versi rilis: ${release.tag}`);
    setText('dl-installer-asset', `Berkas: ${release.asset}`);
    setText('dl-installer-size', `Ukuran: ${formatBytes(release.size)}`);
    setText('dl-installer-sha', `SHA-256: ${release.sha256}`);
    setHref('dl-installer-release', release.githubRelease, 'https://github.com/zzdevxx/banklycs/releases/tag/');
    setHref('dl-installer-direct', release.direct, DIRECT_BASE);
    setText('dl-step1-exe', release.asset);
  }

  function applyDatabaseRelease(result) {
    releaseState.database = result;
    renderReleaseStatus();
    const release = result.release;
    if (!release) return;

    setText('dl-db-size', `Ukuran: ${formatBytes(release.size)}`);
    setText('dl-db-version', `Manifest: ${release.version}`);
    setText('dl-db-asset', `Berkas: ${release.asset}`);
    setText('dl-db-sha', `SHA-256: ${release.sha256}`);
    setHref('dl-db-release', release.githubRelease, 'https://github.com/zzdevxx/banklycs/releases/tag/');
    setHref('dl-db-direct', release.direct, DIRECT_BASE);
  }

  async function fetchJson(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  function initRelease() {
    const contract = window.ReleaseContract;
    if (!contract || typeof contract.createReleaseController !== 'function') {
      applyRelease({
        status: 'fallback',
        source: 'fallback',
        verified: false,
        message: 'Kontrak metadata tidak dimuat. Nilai statis rilis publik tetap ditampilkan.'
      });
      applyDatabaseRelease({
        status: 'fallback',
        source: 'fallback',
        verified: false,
        message: 'Kontrak metadata tidak dimuat. Nilai statis database tetap ditampilkan.'
      });
      return;
    }

    contract.createReleaseController('banklycs', { fetchJson, apply: applyRelease }).load();
    contract.createReleaseController('banklycs', {
      fetchJson,
      apply: applyDatabaseRelease,
      type: 'database'
    }).load();
  }

  function setupScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window) || reducedMotion()) {
      reveals.forEach((node) => node.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        activeObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    reveals.forEach((node) => observer.observe(node));
  }

  function setupAnimatedCounters() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window) || reducedMotion()) {
      counters.forEach((node) => {
        node.textContent = Number(node.dataset.target || 0).toLocaleString('id-ID');
      });
      return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateNumber(entry.target);
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach((node) => observer.observe(node));
  }

  function animateNumber(node) {
    const target = Number(node.dataset.target || 0);
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(target * (progress * (2 - progress)));
      node.textContent = current.toLocaleString('id-ID');
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        node.textContent = target.toLocaleString('id-ID');
      }
    }

    requestAnimationFrame(update);
  }

  function loadSavedRundown() {
    let saved;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      state.storageNotice = `Penyimpanan lokal diblokir (${error.message}). Simulator tetap bekerja tanpa rundown tersimpan.`;
      return;
    }

    if (!saved) return;

    let parsed;
    try {
      parsed = JSON.parse(saved);
    } catch (error) {
      state.storageNotice = `Rundown lokal rusak (${error.message}). Simulator memakai rundown kosong.`;
      return;
    }

    if (!Array.isArray(parsed)) {
      state.storageNotice = 'Format rundown lokal tidak dikenal. Simulator memakai rundown kosong.';
      return;
    }

    const seen = new Set();
    state.rundown = parsed.reduce((items, entry) => {
      const id = entry && typeof entry === 'object' ? entry.id : null;
      const song = SAMPLE_SONGS.find((item) => item.id === id);
      if (!song || seen.has(song.id)) return items;
      seen.add(song.id);
      items.push(song);
      return items;
    }, []);
  }

  function saveRundown() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.rundown.map((song) => ({ id: song.id }))));
      state.storageNotice = '';
      state.storageWarningShown = false;
    } catch (error) {
      state.storageNotice = `Rundown tidak disimpan di browser (${error.message}).`;
      if (!state.storageWarningShown) {
        showToast(state.storageNotice);
        state.storageWarningShown = true;
      }
    }
  }

  function renderSongs() {
    if (!el.songs) return;

    const filtered = SAMPLE_SONGS.filter((song) => {
      if (state.activeCategory !== 'ALL' && song.category !== state.activeCategory) return false;
      const haystack = `${song.title} ${song.artist} ${song.category} ${song.filename}`.toLowerCase();
      return !state.searchQuery || haystack.includes(state.searchQuery);
    });

    if (el.songCount) el.songCount.textContent = `${filtered.length} lagu`;
    el.songs.replaceChildren();

    if (!filtered.length) {
      const empty = document.createElement('p');
      empty.className = 'sim-empty';
      empty.textContent = 'Tidak ada lagu yang cocok dengan pencarian.';
      el.songs.appendChild(empty);
      return;
    }

    filtered.forEach((song) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'sim-item';
      item.setAttribute('aria-pressed', String(Boolean(state.selectedSong && state.selectedSong.id === song.id)));

      const meta = document.createElement('span');
      meta.className = 'sim-item-meta';

      const title = document.createElement('span');
      title.className = 'sim-item-title';
      title.textContent = song.title;

      const artist = document.createElement('span');
      artist.className = 'sim-item-artist';
      artist.textContent = song.artist;

      const badge = document.createElement('span');
      badge.className = 'sim-item-badge';
      badge.textContent = song.category;

      meta.append(title, artist);
      item.append(meta, badge);
      item.addEventListener('click', () => selectSong(song));
      el.songs.appendChild(item);
    });
  }

  function renderSlideCanvas() {
    if (!el.canvas) return;
    el.canvas.replaceChildren();
    const song = state.selectedSong;

    if (!song || !song.slides.length) {
      const empty = document.createElement('p');
      empty.className = 'canvas-empty-state';
      empty.textContent = 'Pilih lagu dari Library untuk melihat pratinjau slide.';
      el.canvas.appendChild(empty);
      return;
    }

    song.slides.forEach((slide, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'slide-card';
      if (index === state.activeSlideIndex) card.classList.add('active-slide');
      card.setAttribute('aria-pressed', String(index === state.activeSlideIndex));

      const strip = document.createElement('span');
      strip.className = `slide-strip strip-${slide.type}`;
      const heading = document.createElement('span');
      heading.textContent = slide.header;
      const number = document.createElement('span');
      number.className = 'slide-num tabular-num';
      number.textContent = `#${index + 1}`;
      strip.append(heading, number);

      const body = document.createElement('span');
      body.className = 'slide-body';
      if (slide.type === 'blank') {
        const label = document.createElement('span');
        label.className = 'slide-blank-label';
        label.textContent = slide.lines[0] || 'BLANK';
        body.appendChild(label);
      } else {
        slide.lines.forEach((line) => {
          const text = document.createElement('span');
          text.className = 'slide-text-line';
          text.textContent = line;
          body.appendChild(text);
        });
      }

      card.append(strip, body);
      card.addEventListener('click', () => {
        state.activeSlideIndex = index;
        el.canvas.querySelectorAll('.slide-card').forEach((node, nodeIndex) => {
          const active = nodeIndex === index;
          node.classList.toggle('active-slide', active);
          node.setAttribute('aria-pressed', String(active));
        });
      });
      el.canvas.appendChild(card);
    });
  }

  function renderRundown() {
    if (!el.rundown) return;
    el.rundown.replaceChildren();
    if (el.rundownCount) el.rundownCount.textContent = String(state.rundown.length);

    if (!state.rundown.length) {
      const empty = document.createElement('p');
      empty.className = 'sim-empty';
      empty.textContent = 'Rundown kosong. Pilih lagu dari Library lalu tambahkan.';
      el.rundown.appendChild(empty);
      return;
    }

    state.rundown.forEach((song, index) => {
      const row = document.createElement('div');
      row.className = 'rundown-row';

      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'sim-rundown-item';
      const title = document.createElement('span');
      title.className = 'sim-rundown-item-title';
      title.textContent = `${index + 1}. ${song.title}`;
      item.appendChild(title);
      item.addEventListener('click', () => selectSong(song));

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'sim-rundown-remove';
      remove.textContent = 'Hapus';
      remove.setAttribute('aria-label', `Hapus ${song.title} dari rundown`);
      remove.addEventListener('click', () => removeFromRundown(index));

      row.append(item, remove);
      el.rundown.appendChild(row);
    });
  }

  function selectSong(song) {
    state.selectedSong = song;
    state.activeSlideIndex = 0;
    if (el.inspectorCategory) el.inspectorCategory.textContent = song.category;
    if (el.inspectorTitle) el.inspectorTitle.textContent = song.title;
    if (el.inspectorArtist) el.inspectorArtist.textContent = `Artis / buku: ${song.artist} | Sampel database: ${song.filename}`;
    if (el.add) el.add.disabled = false;
    renderSongs();
    renderSlideCanvas();
  }

  function addToRundown(song) {
    if (state.rundown.some((item) => item.id === song.id)) {
      showToast(`${song.title} sudah ada di rundown.`);
      return;
    }
    state.rundown.push(song);
    saveRundown();
    renderRundown();
    showToast(`${song.title} ditambahkan ke rundown simulasi.`);
  }

  function removeFromRundown(index) {
    const removed = state.rundown.splice(index, 1);
    saveRundown();
    renderRundown();
    if (removed.length) showToast(`${removed[0].title} dihapus dari rundown simulasi.`);
  }

  async function copyWithFallback(text, successMessage) {
    let copied = false;
    let clipboardError = '';

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (error) {
        clipboardError = error && error.message ? ` (${error.message})` : '';
      }
    }

    if (copied) {
      showToast(successMessage);
      return true;
    }

    if (!el.copyFallback) {
      showToast(`Clipboard tidak tersedia${clipboardError}. Kolom cadangan tidak ditemukan.`);
      return false;
    }

    el.copyFallback.hidden = false;
    el.copyFallback.value = text;
    el.copyFallback.focus();
    el.copyFallback.select();
    showToast(`Clipboard tidak tersedia${clipboardError}. Teks dipilih di kolom cadangan, salin manual dengan Ctrl+C.`);
    return false;
  }

  function buildRundownText() {
    const date = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const lines = [
      '*RUNDOWN LAGU IBADAH*',
      `Tanggal: ${date}`,
      'Sumber: SIMULASI BROWSER Banklycs',
      'Tidak ada perubahan pada ProPresenter.',
      '------------------------------------'
    ];
    state.rundown.forEach((song, index) => {
      lines.push(`${index + 1}. *${song.title}* (${song.artist})`);
    });
    lines.push('------------------------------------');
    lines.push('Susunan ini siap disalin ke WhatsApp.');
    return lines.join('\n');
  }

  function setupEvents() {
    if (el.search) {
      el.search.addEventListener('input', (event) => {
        state.searchQuery = event.target.value.trim().toLowerCase();
        renderSongs();
      });
    }

    if (el.clearSearch) {
      el.clearSearch.addEventListener('click', () => {
        if (!el.search) return;
        el.search.value = '';
        state.searchQuery = '';
        renderSongs();
        el.search.focus();
      });
    }

    el.tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        el.tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle('active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        state.activeCategory = tab.dataset.cat || 'ALL';
        renderSongs();
      });
    });

    if (el.add) {
      el.add.addEventListener('click', () => {
        if (state.selectedSong) addToRundown(state.selectedSong);
      });
    }

    if (el.clearRundown) {
      el.clearRundown.addEventListener('click', () => {
        state.rundown = [];
        saveRundown();
        renderRundown();
        showToast('Rundown simulasi dikosongkan.');
      });
    }

    if (el.copyWa) {
      el.copyWa.addEventListener('click', () => {
        if (!state.rundown.length) {
          showToast('Tambahkan lagu ke rundown terlebih dahulu.');
          return;
        }
        copyWithFallback(buildRundownText(), 'Rundown berhasil disalin ke clipboard.');
      });
    }

    if (el.simulateInject) {
      el.simulateInject.addEventListener('click', () => {
        if (!state.rundown.length) {
          showToast('Tambahkan lagu ke rundown untuk menjalankan simulasi.');
          return;
        }
        showToast(`Simulasi selesai: ${state.rundown.length} lagu diproses di browser. Tidak ada perubahan pada ProPresenter.`);
      });
    }

    el.copyButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const text = button.dataset.copy;
        if (!text) return;
        const original = button.textContent;
        const copied = await copyWithFallback(text, 'Perintah berhasil disalin ke clipboard.');
        if (!copied) return;
        button.textContent = 'Disalin';
        setTimeout(() => {
          button.textContent = original;
        }, 1800);
      });
    });

    el.faqQuestions.forEach((question) => {
      question.addEventListener('click', () => {
        const expanded = question.getAttribute('aria-expanded') === 'true';
        el.faqQuestions.forEach((item) => item.setAttribute('aria-expanded', 'false'));
        question.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    });

    document.addEventListener('keydown', (event) => {
      const tag = event.target && event.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        if (event.key === 'Escape') event.target.blur();
        return;
      }
      if (event.key === '/' && el.search) {
        event.preventDefault();
        el.search.focus();
        el.search.select();
      }
    });
  }

  function init() {
    setupScrollReveals();
    setupAnimatedCounters();
    loadSavedRundown();
    setupEvents();
    renderSongs();
    renderRundown();
    if (SAMPLE_SONGS.length) selectSong(SAMPLE_SONGS[0]);
    if (state.storageNotice && !state.storageWarningShown) {
      showToast(state.storageNotice);
      state.storageWarningShown = true;
    }
    initRelease();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
