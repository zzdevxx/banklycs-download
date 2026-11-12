# Banklycs Download Portal (GitHub Pages)

Landing page resmi dan distribusi publik untuk proyek Banklycs (ProPresenter 7 Worship Lyrics Engine & Database).

## Fitur Halaman

- Live Simulator Console: simulator langsung di browser untuk mencari lagu, filter kategori, dan melihat pratinjau slide panggung 16:9 widescreen dengan kode warna resmi ProPresenter 7.
- Rundown Builder & Ekspor WA: penyusunan daftar lagu ibadah interaktif serta ekspor format WhatsApp ke clipboard.
- Perbandingan Arsitektur: mengapa satu file SQLite lebih stabil untuk laptop ibadah dibanding puluhan ribu file terpisah.
- Pusat Download (Hub): tautan unduh installer rilis resmi, file database mandiri `banklycs.db` (106 MB), dan perintah kloning Git.
- Panduan Cepat: langkah penggunaan untuk operator proyektor dan multimedia gereja.
- FAQ: jawaban teknis soal kompatibilitas Windows 10/11, ProPresenter 7, dan penggunaan offline.

## Standar Desain (Antislop & Aksesibilitas)

Halaman ini dibangun dengan standar ketat:

- Zero AI slop: tanpa gradien ungu-biru neon generik, tombol lonjong, atau kartu template AI.
- Zero em dash (R-02): seluruh teks halaman bebas karakter `—`.
- Angka terverifikasi (R-17): setiap angka di halaman diambil ulang dari `database/banklycs.db` dan aset release terbaru sebelum dipublikasikan.
- 5-State Interactive Contract: semua elemen interaktif memiliki status `default`, `hover`, `focus-visible`, `active`, dan `disabled`.
- WCAG 2.2 AA Contrast: rasio kontras teks minimum 4.5:1 untuk teks normal dan 3:1 untuk teks besar.
- Tabular Numerals: `font-variant-numeric: tabular-nums` untuk angka katalog, durasi, dan ukuran berkas.
- Zero External Runtime Dependency: HTML5 murni, CSS modern, dan JavaScript vanilla tanpa library.

## Menjalankan Lokal

Buka file `index.html` langsung di browser, atau jalankan web server lokal:

```powershell
# Menggunakan Python
python -m http.server 8080

# Buka di browser
# http://127.0.0.1:8080
```

## Lisensi

Lisensi MIT © 2026 Andreas Restuawanta Christwara ([@zzdevxx](https://github.com/zzdevxx)).
