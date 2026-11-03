# DESIGN DIRECTION: BANKLYCS DOWNLOAD PORTAL

> Direction: Identity, personality, palette, typography, and craftsmanship standards for the Banklycs official download and documentation portal.
> Dial: ENERGY 2 / RHYTHM 2 / MOTION 1
> Filter: antislop (Strict compliance: zero em dash, zero fake claims, zero generic gradients)

---

## 1. Product Identity & Audience

- **Product**: Banklycs (ProPresenter 7 Worship Lyrics Engine & Vault)
- **Target Audience**: Church multimedia operators, projector technicians, sound engineers, worship leaders, and pastors.
- **Tone & Mood**: Taktis, presisi, reliabel, tenang, dan siap pakai panggung. Selaras 100% dengan antarmuka native ProPresenter 7 dark theme.
- **Design Metaphor**: Kloning presisi antarmuka ProPresenter 7 broadcast workstation (`#161616` / `#1c1c1c` / `#232323`).

---

## 2. Design Dials

| Dial | Nilai | Penjelasan |
|---|---|---|
| **ENERGY** | **2 (Balanced)** | Tampilan bersih, percaya diri, berfokus pada konten teknis dan kegunaan nyata. |
| **RHYTHM** | **2 (Structured & Break)** | Bagian tersusun logis (Hero -> Live Simulator Pro7 -> Keunggulan -> Arsitektur -> Download -> Cara Pakai -> FAQ -> Footer). |
| **MOTION** | **1 (Calm & Functional)** | Transisi halus dan cepat (120ms ease-out) untuk hover, seleksi, dan feedback status. Tanpa efek berlebihan yang memperlambat sistem. |

---

## 3. Color Palette & Contrast Tokens (ProPresenter 7 Native)

Menggunakan token warna resmi dari tema gelap ProPresenter 7 yang dipakai pada software Banklycs:

- **Surface Primary (Workspace)**: `#161616` (Latar belakang utama kanvas)
- **Surface Secondary (Window / Header)**: `#232323` (Toolbar dan header jendela)
- **Surface Sidebar**: `#1c1c1c` (Sidebar library dan playlist rundown)
- **Surface Card**: `#222222` (Permukaan kartu fitur dan panel kontrol)
- **Surface Elevated / Hover**: `#2c2c2c` (Pergeseran terang saat kursor aktif)
- **Border Subtle**: `#2a2a2a` (Garis tepi pemisah halus 1px)
- **Border Strong**: `#383838` (Garis tepi kartu dan kontrol)
- **Border Focus**: `#007aff` (Garis tepi fokus aksesibilitas)

### Aksen Panggung Pro7:
- **P7 Orange**: `#f38020` (Identitas logo P7 & folder Library)
- **Action Blue**: `#007aff` (Tombol aksi utama, tab aktif, dan status terpilih)
- **Playlist Cyan**: `#32ade6` (Aksen daftar rundown ibadah)
- **Status Ready**: `#30d158` (Indikator status ready / online)

### Warna Grup Slide Panggung:
- **VERSE**: `#0a84ff` (Cyan / Royal Blue)
- **CHORUS**: `#bf5af2` (Magenta)
- **BRIDGE**: `#ff9f0a` (Warm Orange)
- **PRE-CHORUS**: `#5e5ce6` (Indigo)
- **BLANK**: `#48484a` (Slate Grey)

### Tipografi:
- **Teks Utama**: `rgba(255, 255, 255, 0.95)` (Kontras tinggi > 14:1)
- **Teks Sekunder**: `rgba(255, 255, 255, 0.65)` (Kontras > 6:1)
- **Teks Muted**: `#8e8e93` (Kontras > 4.5:1)
- **Tabular Numerals**: Seluruh angka dan metrik menggunakan `font-variant-numeric: tabular-nums;`.

---

## 4. Kontrak 5-State Interaktif

Setiap tombol dan elemen interaktif memiliki 5 status visual yang terdefinisi jelas:
1. `default`: Border tipis 1px, latar belakang netral berbobot, teks kontras tinggi.
2. `hover`: Pergeseran kecerahan latar belakang yang nyata (+8% brightness).
3. `focus-visible`: Outline tegas 2px berwarna aksen `#007aff` dengan offset 2px.
4. `active`: Efek tekan taktil mikro (`transform: translateY(1px);`).
5. `disabled`: Opacity 40% dan pointer-events: none.
