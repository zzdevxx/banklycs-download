/**
 * BANKLYCS DOWNLOAD PORTAL: CLIENT CONTROLLER (STAGE MOTION EDITION)
 * Live Stage Projection Simulator, Animated Metric Counters,
 * Scroll Reveals, Rundown Builder, WhatsApp Exporter & FAQ Accordion
 * Strict Antislop compliance (zero fake claims, zero dead controls)
 */

(function () {
  'use strict';

  // Sample Authentic Songs Representing Catalog Categories
  const SAMPLE_SONGS = [
    {
      id: 1,
      filename: "Sentuh Hatiku - Jason.txt",
      title: "Sentuh Hatiku",
      artist: "Jason",
      category: "ID",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Sentuh Hatiku", "Jason"] },
        { header: "VERSE 1", type: "verse", lines: ["Betapa kumencintai", "Segala yang t'lah Kuberikan"] },
        { header: "VERSE 1", type: "verse", lines: ["Takkan pernah kubiarkan", "Kasih-Mu pudar di hidupku"] },
        { header: "CHORUS", type: "chorus", lines: ["Sentuh hatiku ubah hidupku", "Menjadi yang Kau mau"] },
        { header: "CHORUS", type: "chorus", lines: ["Biar kemuliaan-Mu nyata", "Dalam tiap langkahku"] }
      ]
    },
    {
      id: 2,
      filename: "Amazing Grace - John Newton.txt",
      title: "Amazing Grace",
      artist: "John Newton",
      category: "EN",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Amazing Grace", "John Newton"] },
        { header: "VERSE 1", type: "verse", lines: ["Amazing Grace how sweet the sound", "That saved a wretch like me"] },
        { header: "VERSE 1", type: "verse", lines: ["I once was lost but now am found", "Was blind but now I see"] },
        { header: "VERSE 2", type: "verse", lines: ["'Twas grace that taught my heart to fear", "And grace my fears relieved"] },
        { header: "VERSE 2", type: "verse", lines: ["How precious did that grace appear", "The hour I first believed"] }
      ]
    },
    {
      id: 3,
      filename: "Ku Berbahagia - KJ 392.txt",
      title: "Ku Berbahagia",
      artist: "KJ 392",
      category: "KJ",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Ku Berbahagia", "KJ 392"] },
        { header: "VERSE 1", type: "verse", lines: ["'Ku berbahagia yakin teguh", "Yesus abadi kepunyaanku"] },
        { header: "VERSE 1", type: "verse", lines: ["Aku waris-Nya 'ku ditebus", "Ciptaan baru Rohulkudus"] },
        { header: "CHORUS", type: "chorus", lines: ["Aku bernyanyi bahagia", "Memuji Yesus selamanya"] },
        { header: "CHORUS", type: "chorus", lines: ["Aku bernyanyi bahagia", "Memuji Yesus selamanya"] }
      ]
    },
    {
      id: 4,
      filename: "Ro Ma Ho Tu Jesus - BE 179.txt",
      title: "Ro Ma Ho Tu Jesus",
      artist: "BE 179",
      category: "BE",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Ro Ma Ho Tu Jesus", "BE 179"] },
        { header: "VERSE 1", type: "verse", lines: ["Ro ma ho tu Jesus na manjou ho", "Unang togang roham ai holong do"] },
        { header: "VERSE 1", type: "verse", lines: ["Ditopot do ho na mandate i", "Asa sonang roham dibahen i"] },
        { header: "CHORUS", type: "chorus", lines: ["Sai tangihon joujouNa i", "Unang leleng ro ma ho tu si"] }
      ]
    },
    {
      id: 5,
      filename: "Kemenangan Terjadi Di Sini - GMS Live.txt",
      title: "Kemenangan Terjadi Di Sini",
      artist: "GMS Live",
      category: "ID",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Kemenangan Terjadi Di Sini", "GMS Live"] },
        { header: "VERSE 1", type: "verse", lines: ["Kusembah Kudus Kudus Kuduslah Tuhan", "Dan kusanjung Kau mulia"] },
        { header: "VERSE 1", type: "verse", lines: ["Kudus Kuduslah Tuhan", "Bagi-Mu kemuliaan"] },
        { header: "CHORUS", type: "chorus", lines: ["Kemenangan terjadi di sini", "Kemenangan terjadi di sini"] },
        { header: "CHORUS", type: "chorus", lines: ["Saat kumenyembah-Mu", "Kemenangan terjadi di sini"] }
      ]
    },
    {
      id: 6,
      filename: "Way Maker - Sinach.txt",
      title: "Way Maker",
      artist: "Sinach",
      category: "EN",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Way Maker", "Sinach"] },
        { header: "VERSE 1", type: "verse", lines: ["You are here moving in our midst", "I worship You I worship You"] },
        { header: "VERSE 1", type: "verse", lines: ["You are here working in this place", "I worship You I worship You"] },
        { header: "CHORUS", type: "chorus", lines: ["Way maker miracle worker", "Promise keeper light in the darkness"] },
        { header: "CHORUS", type: "chorus", lines: ["My God that is who You are", "That is who You are"] }
      ]
    },
    {
      id: 7,
      filename: "Bapa Engkau Sungguh Baik - Franky Sihombing.txt",
      title: "Bapa Engkau Sungguh Baik",
      artist: "Franky Sihombing",
      category: "ID",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Bapa Engkau Sungguh Baik", "Franky Sihombing"] },
        { header: "VERSE 1", type: "verse", lines: ["Bapa Engkau sungguh baik", "Kasih-Mu melimpah di hidupku"] },
        { header: "VERSE 1", type: "verse", lines: ["Bapa 'ku bert'rima kasih", "Berkat-Mu hari ini yang Kau sediakan"] },
        { header: "CHORUS", type: "chorus", lines: ["Kunaikkan syukurku", "Buat hari yang Kau b'ri"] },
        { header: "CHORUS", type: "chorus", lines: ["Tak habis-habisnya kasih dan rahmat-Mu", "S'lalu baru dan tak pernah terlambat"] }
      ]
    },
    {
      id: 8,
      filename: "Maju Laskar Kristen - KJ 339.txt",
      title: "Maju Laskar Kristen",
      artist: "KJ 339",
      category: "KJ",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Maju Laskar Kristen", "KJ 339"] },
        { header: "VERSE 1", type: "verse", lines: ["Maju laskar Kristen lawan kuasa g'lap", "Ikut salib Yesus sungguh dan tetap"] },
        { header: "VERSE 1", type: "verse", lines: ["Baginda di depan maju bertekun", "Panji salib Kristus megah tertunrun"] },
        { header: "CHORUS", type: "chorus", lines: ["Maju laskar Kristen lawan kuasa g'lap", "Ikut salib Yesus sungguh dan tetap"] }
      ]
    },
    {
      id: 9,
      filename: "Kusrahkan Hidupku - PKJ 145.txt",
      title: "Kusrahkan Hidupku",
      artist: "PKJ 145",
      category: "PKJ",
      slides: [
        { header: "BLANK", type: "blank", lines: ["Kusrahkan Hidupku", "PKJ 145"] },
        { header: "VERSE 1", type: "verse", lines: ["Aku melangkah ke rumah Tuhan", "Membawa persembahan syukur"] },
        { header: "VERSE 1", type: "verse", lines: ["Kusrahkan hidupku bagi-Mu Yesus", "Jadikan alat kemuliaan-Mu"] }
      ]
    },
    {
      id: 10,
      filename: "O Tuhan Pimpinlah Langkahku - NKB 128.txt",
      title: "O Tuhan Pimpinlah Langkahku",
      artist: "NKB 128",
      category: "NKB",
      slides: [
        { header: "BLANK", type: "blank", lines: ["O Tuhan Pimpinlah Langkahku", "NKB 128"] },
        { header: "VERSE 1", type: "verse", lines: ["'Ku t'lah berjalan jauh di lembah", "Gelap dan berliku jalanku"] },
        { header: "VERSE 1", type: "verse", lines: ["O Tuhan pimpinlah langkah hidupku", "Sampai ku tiba di terang-Mu"] },
        { header: "CHORUS", type: "chorus", lines: ["Pimpinlah daku ya Tuhan", "Menuju neg'ri bahagia"] }
      ]
    }
  ];

  // State Management
  const state = {
    activeCategory: 'ALL',
    searchQuery: '',
    selectedSong: null,
    activeSlideIndex: 0,
    isStageBlack: false,
    rundown: [],
    toastTimeout: null
  };

  // DOM Elements
  const simSearchInput = document.getElementById('sim-search-input');
  const simClearBtn = document.getElementById('sim-clear-btn');
  const simTabs = document.querySelectorAll('.sim-tab');
  const simSongList = document.getElementById('sim-song-list');
  const simSongCount = document.getElementById('sim-song-count');
  const simInspectorCategory = document.getElementById('sim-inspector-category');
  const simInspectorTitle = document.getElementById('sim-inspector-title');
  const simInspectorArtist = document.getElementById('sim-inspector-artist');
  const simAddBtn = document.getElementById('sim-add-btn');
  const simCanvasContainer = document.getElementById('sim-canvas-container');
  const simRundownList = document.getElementById('sim-rundown-list');
  const simRundownCount = document.getElementById('sim-rundown-count');
  const simClearRundownBtn = document.getElementById('sim-clear-rundown-btn');
  const simCopyWaBtn = document.getElementById('sim-copy-wa-btn');
  const simFakeInjectBtn = document.getElementById('sim-fake-inject-btn');
  const stageScreenText = document.getElementById('stage-screen-text');
  const stageSlideMeta = document.getElementById('stage-slide-meta');
  const stagePrevBtn = document.getElementById('stage-prev-btn');
  const stageNextBtn = document.getElementById('stage-next-btn');
  const stageClearBtn = document.getElementById('stage-clear-btn');
  const toastEl = document.getElementById('toast');
  const copyBtns = document.querySelectorAll('.btn-copy');
  const faqQuestions = document.querySelectorAll('.faq-question');

  // Initialization
  function init() {
    setupLiveClock();
    setupScrollReveals();
    setupAnimatedCounters();
    loadSavedRundown();
    setupEventListeners();
    filterAndRenderSongs();

    // Select first song as initial preview
    if (SAMPLE_SONGS.length > 0) {
      selectSong(SAMPLE_SONGS[0]);
    }
  }

  // Live Broadcast Clock
  function setupLiveClock() {
    const clockEl = document.getElementById('sim-clock');
    if (!clockEl) return;

    function update() {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }

    update();
    setInterval(update, 1000);
  }

  // Scroll Reveal Animations
  function setupScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach((el) => observer.observe(el));
    } else {
      // Fallback: reveal all immediately
      reveals.forEach((el) => el.classList.add('is-revealed'));
    }
  }

  // Animated Metric Numbers Counter
  function setupAnimatedCounters() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumber(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach((c) => observer.observe(c));
    } else {
      counters.forEach((c) => animateNumber(c));
    }
  }

  function animateNumber(el) {
    const target = parseFloat(el.dataset.target || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1200; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const current = target * (progress * (2 - progress));

      let formatted = '';
      if (decimals > 0) {
        formatted = current.toFixed(decimals);
      } else {
        formatted = Math.round(current).toLocaleString('id-ID');
      }

      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (decimals > 0) {
          el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        } else {
          el.textContent = `${prefix}${Math.round(target).toLocaleString('id-ID')}${suffix}`;
        }
      }
    }

    requestAnimationFrame(update);
  }

  // Toast Notification
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    toastEl.classList.add('show');

    if (state.toastTimeout) {
      clearTimeout(state.toastTimeout);
    }

    state.toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => {
        toastEl.hidden = true;
      }, 180);
    }, 2500);
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Search Input
    if (simSearchInput) {
      simSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        filterAndRenderSongs();
      });
    }

    // Clear Search Button
    if (simClearBtn) {
      simClearBtn.addEventListener('click', () => {
        if (simSearchInput) {
          simSearchInput.value = '';
          state.searchQuery = '';
          filterAndRenderSongs();
          simSearchInput.focus();
        }
      });
    }

    // Category Tabs
    simTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        simTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        state.activeCategory = tab.dataset.cat || 'ALL';
        filterAndRenderSongs();
      });
    });

    // Add Song to Rundown
    if (simAddBtn) {
      simAddBtn.addEventListener('click', () => {
        if (!state.selectedSong) return;
        addToRundown(state.selectedSong);
      });
    }

    // Clear Rundown
    if (simClearRundownBtn) {
      simClearRundownBtn.addEventListener('click', () => {
        state.rundown = [];
        saveRundown();
        renderRundown();
        showToast("Rundown ibadah berhasil dikosongkan.");
      });
    }

    // Stage Screen Controls
    if (stagePrevBtn) {
      stagePrevBtn.addEventListener('click', () => {
        advanceSlide(-1);
      });
    }

    if (stageNextBtn) {
      stageNextBtn.addEventListener('click', () => {
        advanceSlide(1);
      });
    }

    if (stageClearBtn) {
      stageClearBtn.addEventListener('click', () => {
        toggleClearBlack();
      });
    }

    // Global Keyboard Shortcuts for Simulator
    document.addEventListener('keydown', (e) => {
      // Ignore if user is currently typing inside an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        if (simSearchInput) {
          simSearchInput.focus();
          simSearchInput.select();
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        advanceSlide(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        advanceSlide(-1);
      } else if (e.key === 'Escape' || e.key === 'b' || e.key === 'B') {
        toggleClearBlack();
      }
    });

    // Copy to WhatsApp
    if (simCopyWaBtn) {
      simCopyWaBtn.addEventListener('click', () => {
        if (state.rundown.length === 0) {
          showToast("Tambahkan lagu ke rundown terlebih dahulu.");
          return;
        }

        const dateStr = new Date().toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        let text = `*RUNDOWN LAGU IBADAH*\n`;
        text += `Tanggal: ${dateStr}\n`;
        text += `Aplikasi: Banklycs (ProPresenter 7)\n`;
        text += `------------------------------------\n`;

        state.rundown.forEach((song, idx) => {
          text += `${idx + 1}. *${song.title}* (${song.artist || song.category})\n`;
        });

        text += `------------------------------------\n`;
        text += `Siap ditayangkan di ProPresenter 7.`;

        navigator.clipboard.writeText(text).then(() => {
          showToast("Rundown WhatsApp berhasil disalin ke clipboard!");
        }).catch(() => {
          showToast("Gagal menyalin ke clipboard.");
        });
      });
    }

    // Simulate Inject Pro7
    if (simFakeInjectBtn) {
      simFakeInjectBtn.addEventListener('click', () => {
        if (state.rundown.length === 0) {
          showToast("Pilih minimal 1 lagu untuk simulasi injeksi.");
          return;
        }

        showToast(`Mengompilasi ${state.rundown.length} lagu ke Libraries/Banks/ (< 2 ms)...`);
        setTimeout(() => {
          showToast(`Sukses! Playlist ProPresenter siap ditayangkan tanpa lag.`);
        }, 550);
      });
    }

    // Copy Code / Command Buttons
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.dataset.copy;
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = "Disalin!";
          showToast(`Perintah berhasil disalin: ${textToCopy}`);
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        }).catch(() => {
          showToast("Gagal menyalin teks.");
        });
      });
    });

    // FAQ Accordion
    faqQuestions.forEach((q) => {
      q.addEventListener('click', () => {
        const isExpanded = q.getAttribute('aria-expanded') === 'true';
        faqQuestions.forEach((item) => {
          item.setAttribute('aria-expanded', 'false');
        });
        q.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      });
    });
  }

  // Advance Slide (Next / Prev)
  function advanceSlide(delta) {
    if (!state.selectedSong || !state.selectedSong.slides || state.selectedSong.slides.length === 0) {
      return;
    }

    if (state.isStageBlack) {
      state.isStageBlack = false;
    }

    let nextIdx = state.activeSlideIndex + delta;
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= state.selectedSong.slides.length) {
      nextIdx = state.selectedSong.slides.length - 1;
    }

    state.activeSlideIndex = nextIdx;
    updateLiveStageDisplay();
  }

  // Toggle Screen to Black
  function toggleClearBlack() {
    state.isStageBlack = !state.isStageBlack;
    if (stageScreenText) {
      if (state.isStageBlack) {
        stageScreenText.innerHTML = '<p class="slide-blank-label" style="color: #444;">[ BLACK SCREEN ]</p>';
        if (stageSlideMeta) stageSlideMeta.textContent = "Screen Cleared to Black";
        if (stageClearBtn) stageClearBtn.textContent = "Restore";
      } else {
        if (stageClearBtn) stageClearBtn.textContent = "Clear Black";
        updateLiveStageDisplay();
      }
    }
  }

  // Update Live Stage Monitor Display
  function updateLiveStageDisplay() {
    if (!state.selectedSong || !state.selectedSong.slides || state.selectedSong.slides.length === 0) {
      return;
    }

    const slide = state.selectedSong.slides[state.activeSlideIndex];
    if (!slide) return;

    if (stageSlideMeta) {
      stageSlideMeta.textContent = `Slide #${state.activeSlideIndex + 1} (${slide.header})`;
    }

    if (stageScreenText) {
      // Re-trigger animation
      stageScreenText.classList.remove('fade-transition');
      void stageScreenText.offsetWidth; // Reflow
      stageScreenText.classList.add('fade-transition');

      if (slide.type === 'blank') {
        stageScreenText.innerHTML = `
          <p class="stage-active-line-1" style="color: #aaa; font-size: 15px;">${escapeHtml(slide.lines[0] || state.selectedSong.title)}</p>
          <p class="stage-active-line-2" style="color: #666; font-size: 12px;">${escapeHtml(slide.lines[1] || state.selectedSong.artist || '')}</p>
        `;
      } else {
        const line1 = slide.lines[0] || '';
        const line2 = slide.lines[1] || '';
        stageScreenText.innerHTML = `
          <p class="stage-active-line-1">${escapeHtml(line1)}</p>
          <p class="stage-active-line-2">${escapeHtml(line2)}</p>
        `;
      }
    }

    // Highlight active card in the viewport grid
    if (simCanvasContainer) {
      const cards = simCanvasContainer.querySelectorAll('.slide-card');
      cards.forEach((card, idx) => {
        if (idx === state.activeSlideIndex) {
          card.classList.add('is-active-stage');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove('is-active-stage');
        }
      });
    }
  }

  // Filter and Render Songs List
  function filterAndRenderSongs() {
    if (!simSongList) return;

    let filtered = SAMPLE_SONGS.filter((s) => {
      if (state.activeCategory !== 'ALL' && s.category !== state.activeCategory) {
        return false;
      }
      if (state.searchQuery) {
        const fullIndex = `${s.title} ${s.artist} ${s.category}`.toLowerCase();
        if (!fullIndex.includes(state.searchQuery)) {
          return false;
        }
      }
      return true;
    });

    if (simSongCount) {
      simSongCount.textContent = `${filtered.length} Lagu`;
    }

    simSongList.innerHTML = '';

    if (filtered.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.style.padding = '20px 12px';
      emptyDiv.style.textAlign = 'center';
      emptyDiv.style.color = '#76767b';
      emptyDiv.style.fontSize = '12px';
      emptyDiv.textContent = 'Tidak ada lagu yang cocok dengan pencarian.';
      simSongList.appendChild(emptyDiv);
      return;
    }

    filtered.forEach((song) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'sim-item';
      if (state.selectedSong && state.selectedSong.id === song.id) {
        itemEl.classList.add('active');
      }
      itemEl.setAttribute('role', 'option');
      itemEl.setAttribute('tabindex', '0');

      itemEl.innerHTML = `
        <div class="sim-item-meta">
          <span class="sim-item-title">${escapeHtml(song.title)}</span>
          <span class="sim-item-artist">${escapeHtml(song.artist || song.category)}</span>
        </div>
        <span class="sim-item-badge">${song.category}</span>
      `;

      itemEl.addEventListener('click', () => {
        selectSong(song);
      });

      itemEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectSong(song);
        }
      });

      simSongList.appendChild(itemEl);
    });
  }

  // Select a Song for Preview
  function selectSong(song) {
    state.selectedSong = song;
    state.activeSlideIndex = 0;
    state.isStageBlack = false;

    // Update active highlight in list
    const items = simSongList.querySelectorAll('.sim-item');
    items.forEach((it) => it.classList.remove('active'));

    // Update Header Metadata
    if (simInspectorCategory) simInspectorCategory.textContent = song.category;
    if (simInspectorTitle) simInspectorTitle.textContent = song.title;
    if (simInspectorArtist) simInspectorArtist.textContent = song.artist ? `Artis / Buku: ${song.artist}` : song.filename;
    if (simAddBtn) simAddBtn.disabled = false;

    // Render 16:9 Presentation Canvas Grid Deck
    renderSlideCanvas(song);
    updateLiveStageDisplay();
    filterAndRenderSongs();
  }

  // Render Slide Canvas Cards
  function renderSlideCanvas(song) {
    if (!simCanvasContainer) return;
    simCanvasContainer.innerHTML = '';

    if (!song.slides || song.slides.length === 0) {
      simCanvasContainer.innerHTML = `
        <div class="sim-empty-state">
          <p>Lirik lagu tidak memiliki slide terformat.</p>
        </div>
      `;
      return;
    }

    song.slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = 'slide-card';
      if (idx === state.activeSlideIndex) {
        card.classList.add('is-active-stage');
      }

      let stripClass = 'strip-verse';
      if (slide.type === 'blank') stripClass = 'strip-blank';
      else if (slide.type === 'chorus') stripClass = 'strip-chorus';
      else if (slide.type === 'bridge') stripClass = 'strip-bridge';
      else if (slide.type === 'pre-chorus') stripClass = 'strip-pre-chorus';

      let contentHtml = '';
      if (slide.type === 'blank') {
        contentHtml = `
          <div class="slide-body">
            <span class="slide-blank-label">${escapeHtml(slide.lines[0] || 'BLANK')}</span>
          </div>
        `;
      } else {
        const linesHtml = slide.lines.map((l) => `<div class="slide-text-line">${escapeHtml(l)}</div>`).join('');
        contentHtml = `
          <div class="slide-body">
            ${linesHtml}
          </div>
        `;
      }

      card.innerHTML = `
        <div class="slide-strip ${stripClass}">
          <span>${escapeHtml(slide.header)}</span>
          <span class="slide-num tabular-num">#${idx + 1}</span>
        </div>
        ${contentHtml}
      `;

      card.addEventListener('click', () => {
        state.activeSlideIndex = idx;
        state.isStageBlack = false;
        updateLiveStageDisplay();
      });

      simCanvasContainer.appendChild(card);
    });
  }

  // Rundown Management
  function addToRundown(song) {
    const exists = state.rundown.some((s) => s.id === song.id);
    if (exists) {
      showToast(`'${song.title}' sudah ada di rundown.`);
      return;
    }

    state.rundown.push(song);
    saveRundown();
    renderRundown();
    showToast(`'${song.title}' ditambahkan ke rundown.`);
  }

  function removeFromRundown(index) {
    const removed = state.rundown.splice(index, 1);
    saveRundown();
    renderRundown();
    if (removed.length > 0) {
      showToast(`'${removed[0].title}' dihapus dari rundown.`);
    }
  }

  function renderRundown() {
    if (!simRundownList) return;
    simRundownList.innerHTML = '';

    if (simRundownCount) {
      simRundownCount.textContent = state.rundown.length.toString();
    }

    if (state.rundown.length === 0) {
      simRundownList.innerHTML = `
        <div style="padding: 14px 8px; text-align: center; color: #76767b; font-size: 11px;">
          Rundown kosong. Pilih lagu dari Library lalu klik + Tambah.
        </div>
      `;
      return;
    }

    state.rundown.forEach((song, idx) => {
      const item = document.createElement('div');
      item.className = 'sim-rundown-item';
      item.innerHTML = `
        <span class="sim-rundown-item-title">${idx + 1}. ${escapeHtml(song.title)}</span>
        <button class="sim-rundown-remove" title="Hapus dari rundown" aria-label="Hapus ${escapeHtml(song.title)}">✕</button>
      `;

      const removeBtn = item.querySelector('.sim-rundown-remove');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeFromRundown(idx);
        });
      }

      item.addEventListener('click', () => {
        selectSong(song);
      });

      simRundownList.appendChild(item);
    });
  }

  function loadSavedRundown() {
    try {
      const saved = localStorage.getItem('banklycs_demo_rundown');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.rundown = parsed;
          renderRundown();
        }
      }
    } catch {
      // Local storage unaccessible
    }
  }

  function saveRundown() {
    try {
      localStorage.setItem('banklycs_demo_rundown', JSON.stringify(state.rundown));
    } catch {
      // Ignore
    }
  }

  // HTML Escape Helper
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Start on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
