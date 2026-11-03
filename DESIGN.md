# DESIGN DIRECTION: BANKLYCS DOWNLOAD PORTAL

> Direction: Identity, personality, palette, typography, and craftsmanship standards for the Banklycs official download and documentation portal.
> Dial: ENERGY 2 / RHYTHM 2 / MOTION 2
> Filter: antislop (Strict compliance: zero em dash, zero fake claims, zero generic gradients)

---

## 1. Product Identity & Audience

- **Product**: Banklycs (ProPresenter 7 Worship Lyrics Engine & Vault)
- **Target Audience**: Church multimedia operators, projector technicians, sound engineers, worship leaders, and pastors.
- **Tone & Mood**: Taktis, presisi, reliabel, tenang, dan siap pakai panggung (stage-ready broadcast console). Bebas dari klaim berlebihan atau animasi yang mengganggu.
- **Design Metaphor**: Hardware konsol rack audio digital dan antarmuka ProPresenter 7 native dark workspace.

---

## 2. Design Dials

| Dial | Nilai | Penjelasan |
|---|---|---|
| **ENERGY** | **2 (Balanced)** | Tampilan bersih, percaya diri, berfokus pada konten teknis dan kegunaan nyata. |
| **RHYTHM** | **2 (Structured & Break)** | Bagian tersusun logis (Hero -> Live Preview Simulator -> Architecture Proof -> Download Matrix -> Quickstart -> FAQ -> Footer). |
| **MOTION** | **2 (Interactive / Purposeful)** | Animasi scroll-reveal berbasis IntersectionObserver, perpindahan slide instan dengan crossfade panggung, counter metrik dinamis, LED hardware pulse, transisi tab geser, dan feedback toast taktil. |

---

## 3. Color Palette & Contrast Tokens

Semua token warna wajib memenuhi standar WCAG 2.2 AA (kontras rasio minimal 4.5:1 untuk teks reguler dan 3.0:1 untuk teks besar).

- **Surface Primary**: `#121212` (Latar belakang utama panggung)
- **Surface Secondary**: `#181818` (Header, navbar, dan kontainer terisolasi)
- **Surface Card**: `#222222` (Permukaan kartu dan panel kontrol)
- **Surface Hover**: `#2c2c2c` (Pergeseran terang saat kursor aktif)
- **Border Subtle**: `#2e2e2e` (Garis tepi presisi 1px)
- **Border Active**: `#3e3e3e` (Garis tepi fokus)
- **Accent Brand (Pro7 Orange)**: `#f38020` (Logo, ikon folder Library, tombol sekunder)
- **Accent Action (Stage Blue)**: `#007aff` (Tombol download utama, aksi panggung, status aktif)
- **Accent Success**: `#34c759` (Indikator status ready, verifikasi checksum)
- **Text High Contrast**: `#f5f5f7` (Rasio kontras > 14:1)
- **Text Muted**: `#a1a1a6` (Rasio kontras > 6.2:1)
- **Text Dim**: `#76767b` (Rasio kontras > 4.6:1 pada surface card)

---

## 4. Typography & Numerals

- **Font Utama**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, sans-serif.
- **Font Kode / Terminal**: `"JetBrains Mono"`, `"Cascadia Code"`, `Consolas`, monospace.
- **Tabular Numerals**: Seluruh angka katalog (24.556), ukuran file (44.20 MB), latensi (<1 ms), dan nomor slide wajib menggunakan properti CSS `font-variant-numeric: tabular-nums;`.

---

## 5. Kontrak 5-State Interaktif (Interactive Contract)

Setiap tombol, tautan navigasi, dan elemen klik wajib memiliki 5 status visual yang terdefinisi jelas:
1. `default`: Border tipis 1px, latar belakang netral berbobot, teks kontras tinggi.
2. `hover`: Pergeseran kecerahan latar belakang yang nyata (+8% brightness) tanpa blur.
3. `focus-visible`: Outline tegas 2px berwarna aksen `#007aff` dengan offset 2px (memenuhi WCAG SC 2.4.7).
4. `active`: Efek tekan taktil mikro (`transform: translateY(1px);`).
5. `disabled`: Opacity 40% dan pointer-events: none.

---

## 6. Pembagian Konten & Narrative Flow

1. **Header & Navigation**: Logo Pro7 P7, status engine live, tab navigasi ke #preview, #features, #download, #guide, #faq, serta tautan ke repositori GitHub.
2. **Hero Section**: Judul konkret tanpa buzzword kosong: "24.556 Lagu Rohani & Himne Siap Tayang untuk ProPresenter 7".
3. **Interactive Simulator**: Simulator langsung pencarian lagu dan preview slide canvas 16:9 widescreen di browser pengunjung dengan data sampel riil.
4. **Perbandingan Arsitektur**: Single-file SQLite 44 MB vs 40.000 file terpisah NTFS.
5. **Download Hub**: Tombol rilis ZIP, installer senyap `START.vbs`, instruksi Git clone, dan checksum SHA-256.
6. **Panduan 3 Langkah Cepat (Quick Start)**: Jalankan -> Pilih Lagu -> Injeksi ke ProPresenter 7.
7. **FAQ Khusus**: Pertanyaan teknis riil terkait ProPresenter, Windows 10/11, dan offline readiness.
8. **Footer**: Atribusi resmi, lisensi MIT, dan tautan 3 cloud mirrors.
