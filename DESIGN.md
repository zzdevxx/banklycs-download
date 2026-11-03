# DESIGN DIRECTION: BANKLYCS DOWNLOAD PORTAL

> Direction: Identity, personality, palette, typography, and craftsmanship standards for the Banklycs official download and documentation portal.
> Dial: ENERGY 2 / RHYTHM 2 / MOTION 2
> Refinements: Ringkas, to the point, frosted dark glass cards, subtle stage gradient lighting, smooth motion, and 100% ProPresenter 7 palette alignment.
> Filter: antislop (Strict compliance: zero em dash, zero fake claims, WCAG 2.2 AA contrast)

---

## 1. Product Identity & Narrative

- **Product**: Banklycs (ProPresenter 7 Worship Lyrics Engine & Vault)
- **Target Audience**: Church multimedia operators, projector technicians, sound engineers, worship leaders, and pastors.
- **Copywriting Style**: To the point, on point, padat, dan lugas. Menjelaskan solusi teknis secara ringkas tanpa kalimat bertele-tele.
- **Visual Style**: ProPresenter 7 Native Broadcast Console dengan sentuhan modern *frosted dark glass*, pencahayaan *stage spotlight*, dan mikro-interaksi responsif.

---

## 2. Design Dials

| Dial | Nilai | Penjelasan |
|---|---|---|
| **ENERGY** | **2 (Balanced & Confident)** | Visual berbobot, teks kontras tinggi, elegan, dan fokus pada kegunaan panggung. |
| **RHYTHM** | **2 (Structured)** | Alur membaca terarah: Hero -> Fitur Inti -> Simulator Pro7 -> Arsitektur -> Download -> Cara Pakai -> FAQ. |
| **MOTION** | **2 (Silky Smooth)** | Animasi scroll-reveal berbasis IntersectionObserver, hover card lift dengan spring easing, slide card activation glow, dan toast feedback. |

---

## 3. Color & Surface Tokens (ProPresenter 7 Native + Glass Depth)

- **Workspace Base**: `#161616` (Latar belakang panggung netral)
- **Sidebar & Secondary**: `#1c1c1c` (Panel samping)
- **Toolbar & Header**: `rgba(35, 35, 35, 0.88)` dengan `backdrop-filter: blur(16px)`
- **Frosted Glass Cards**: `linear-gradient(180deg, rgba(40, 40, 40, 0.75) 0%, rgba(26, 26, 26, 0.85) 100%)` dengan `backdrop-filter: blur(12px)`
- **Border Treatment**: Layered 1px `rgba(255, 255, 255, 0.08)` dan inner highlight `rgba(255, 255, 255, 0.05)`

### Aksen Panggung Pro7:
- **P7 Orange**: `#f38020` (Identitas logo P7 & kategori Library)
- **Action Blue Gradient**: `linear-gradient(180deg, #0a84ff 0%, #0066d6 100%)` (Tombol aksi utama)
- **Playlist Cyan**: `#32ade6` (Aksen rundown ibadah)
- **Status Green**: `#30d158` (Indikator status ready / online)

### Warna Grup Slide Panggung Pro7:
- **VERSE**: `#0a84ff` (Cyan / Royal Blue)
- **CHORUS**: `#bf5af2` (Magenta)
- **BRIDGE**: `#ff9f0a` (Warm Orange)
- **PRE-CHORUS**: `#5e5ce6` (Indigo)
- **BLANK**: `#48484a` (Slate Grey)

---

## 4. Standar Kualitas Anti-Slop
- **Zero Em Dash**: Bebas 100% dari karakter em dash (`—`).
- **WCAG 2.2 AA**: Rasio kontras teks tinggi (> 6:1 untuk teks sekunder, > 14:1 untuk teks utama).
- **Tabular Numerals**: Menggunakan `tabular-nums` pada seluruh angka metrik.
- **5-State Contract**: Status *default, hover, focus-visible, active, disabled* terdefinisi penuh pada semua elemen interaktif.
