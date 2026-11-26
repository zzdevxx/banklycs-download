# Banklycs Download Portal

Portal unduhan resmi dan simulator browser untuk proyek [Banklycs](https://github.com/zzdevxx/banklycs) (ProPresenter 7 Worship Lyrics Engine & Database).

- Portal utama: [https://zzdree.my.id/banklycs/](https://zzdree.my.id/banklycs/)
- Origin GitHub Pages: [https://zzdevxx.github.io/banklycs-download/](https://zzdevxx.github.io/banklycs-download/)
- Hub portofolio: [https://zzdree.my.id/](https://zzdree.my.id/)

## Fitur Halaman

- Live Simulator Console: simulator langsung di browser untuk mencari lagu, filter kategori, dan melihat pratinjau slide panggung 16:9 widescreen dengan kode warna ProPresenter 7.
- Rundown Builder & Ekspor WA: penyusunan daftar lagu ibadah interaktif serta ekspor format WhatsApp ke clipboard.
- Sinkronisasi Rilis Otomatis: membaca `database/db_manifest.json` dan GitHub Releases terbaru `zzdevxx/banklycs` secara progresif dengan nilai fallback terverifikasi.
- Pusat Download (Hub): tautan halaman GitHub Release dan direct download untuk installer v2.7 serta database mandiri `banklycs.db` (111.144.960 byte), dan perintah kloning Git.
- Panduan Cepat & FAQ: langkah penggunaan untuk operator proyektor, kompatibilitas Windows 10/11, ProPresenter 7, dan penggunaan offline.

## Standar Desain (Antislop & Aksesibilitas)

Halaman ini dibangun dengan standar ketat:

- Zero AI slop: tanpa gradien ungu-biru neon generik, tombol lonjong, atau kartu template AI.
- Zero em dash (R-02): seluruh teks halaman bebas karakter U+2014.
- Angka terverifikasi (R-17): setiap angka di halaman diambil ulang dari `database/banklycs.db` dan aset release terbaru sebelum dipublikasikan.
- 5-State Interactive Contract: semua elemen interaktif memiliki status `default`, `hover`, `focus-visible`, `active`, dan `disabled`.
- WCAG 2.2 AA Contrast: rasio kontras teks minimum 4.5:1 untuk teks normal dan 3:1 untuk teks besar.
- Tabular Numerals: `font-variant-numeric: tabular-nums` untuk angka katalog, durasi, dan ukuran berkas.
- Zero External Runtime Dependency: HTML5 murni, CSS modern, dan JavaScript vanilla tanpa library.
- Navigasi HP memakai menu dengan label, dapat dibuka lewat sentuhan atau keyboard, dan ditutup dengan Escape.
- Tampilan simulator menyesuaikan tinggi konten, sementara tombol dan input memiliki target sentuh minimal 44 px.

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
