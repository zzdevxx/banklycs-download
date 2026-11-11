# 🌐 Banklycs Download Portal (GitHub Pages)

Portal landing page resmi dan distribusi publik untuk proyek **Banklycs (ProPresenter 7 Worship Lyrics Engine & Database)**.

## 🎯 Fitur Halaman

- **Live Simulator Console**: Simulator langsung di browser untuk menguji pencarian cepat, filter kategori, dan rendering thumbnail slide panggung 16:9 widescreen dengan kode warna resmi ProPresenter 7.
- **Rundown Builder & Ekspor WA**: Fitur penyusunan daftar lagu ibadah interaktif serta ekspor format WhatsApp rapi ke clipboard.
- **Perbandingan Arsitektur**: Analisis keunggulan Single-File SQLite 61.42 MB vs 40.000 file terpisah NTFS.
- **Pusat Download (Hub)**: Tautan unduh bundle ZIP rilis resmi, file database mandiri `banklycs.db` (61.42 MB), dan perintah kloning Git.
- **Panduan Cepat (Quick Start)**: Langkah penggunaan 1-klik untuk operator proyektor dan multimedia gereja.
- **FAQ Interaktif**: Jawaban teknis terkait kompatibilitas Windows 10/11, ProPresenter 7, dan kesiapan penggunaan offline.

## 🛠️ Standar Desain (Antislop & Aksesibilitas)

Halaman ini dibangun dengan standar ketat:
- **Zero AI Slop**: Bebas dari gradien ungu-biru neon generik, tombol lonjong (pill button), atau kartu template AI.
- **5-State Interactive Contract**: Semua elemen interaktif memiliki status `default`, `hover`, `focus-visible`, `active`, dan `disabled`.
- **WCAG 2.2 AA Contrast**: Rasio kontras teks minimum 4.5:1 untuk teks normal dan 3:1 untuk teks besar.
- **Tabular Numerals**: Menggunakan `font-variant-numeric: tabular-nums` untuk angka katalog, durasi, dan ukuran berkas.
- **Zero External Runtime Dependency**: Menggunakan HTML5 murni, CSS modern, dan JavaScript vanilla tanpa library berat.

## 🚀 Menjalankan Lokal

Cukup buka file `index.html` langsung di browser, atau jalankan web server lokal ringan:

```powershell
# Menggunakan Python
python -m http.server 8080

# Buka di browser
# http://127.0.0.1:8080
```

## 📜 Lisensi

Lisensi MIT © 2026 Andreas Restuawanta Christwara ([@zzdevxx](https://github.com/zzdevxx)).
