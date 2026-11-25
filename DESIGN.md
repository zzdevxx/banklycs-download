# DESIGN DIRECTION: BANKLYCS DOWNLOAD PORTAL

> Direction: Identitas konsol ProPresenter 7 untuk portal unduhan Banklycs, dipertajam lewat audit aksesibilitas, kejujuran konten, dan fallback yang dapat dipulihkan.
> Dial: ENERGY 2 / RHYTHM 2 / MOTION 2
> Filter: antislop, Bahasa Indonesia, tanpa em dash, tanpa angka performa yang belum diukur.

---

## 1. Identitas Produk

- **Produk**: Banklycs, database lirik dan alur rundown untuk ProPresenter 7.
- **Audience**: Operator multimedia gereja, teknisi projector, sound engineer, worship leader, dan pendeta.
- **Gaya bahasa**: Padat, lugas, teknis, dan tidak menjanjikan angka yang belum diukur.
- **Visual**: Konsol siaran gelap dengan border 1 px, permukaan solid bertingkat, dan aksen oranye ProPresenter. Tombol aksi tidak memakai gradien biru generik.

---

## 2. Design Dials

| Dial | Nilai | Penjelasan |
|---|---|---|
| **ENERGY** | 2 | Berbobot dan tenang, dengan kontras tinggi untuk teks dan status. |
| **RHYTHM** | 2 | Alur tetap mengikuti struktur lama: Hero, Fitur, Simulator, Arsitektur, Download, Panduan, FAQ. |
| **MOTION** | 2 | Transisi pendek untuk hover, reveal, toast, dan perubahan state. Reduced motion menonaktifkan gerak. |

---

## 3. Token Warna dan Permukaan

| Peran | Nilai | Pemakaian |
|---|---|---|
| Canvas | `#111214`, `#17191b` | Latar dasar dan seksi bergantian |
| Panel | `#1c1f21`, `#24282a`, `#2d3235` | Kartu, toolbar, dan permukaan interaktif |
| Border | `#34393c`, `#4b5357` | Garis 1 px dan separator |
| Teks | `#f3f2ee`, `#d8d7d1`, `#a9ada8` | Primer, sekunder, pendukung |
| Oranye | `#f38020` | Identitas P7, aksi primer, fokus, dan angka penting |
| Fungsional | `#4ea8ff`, `#58c7dc`, `#65d98a`, `#ff7a6e` | Kategori, status, dan grup slide |
| Grup slide | biru, ungu, oranye, abu | VERSE, CHORUS, BRIDGE, BLANK |

Stacked glassmorphism, blurred glow, dan shimmer dihapus dari stylesheet. Identitas konsol tetap dipertahankan lewat hierarki toolbar, sidebar, canvas slide, dan status badge.

---

## 4. Interaksi dan Aksesibilitas

- Semua tombol, tautan, input, dan kartu interaktif memiliki lima state: default, hover, focus-visible, active, disabled.
- Target interaktif minimal 44 px, termasuk tab kategori, tombol hapus, tombol salin, dan tautan footer.
- Fokus keyboard memakai outline putih 2 px dengan offset dan cincin gelap penyangga.
- `skip-link` tersedia di awal dokumen.
- Angka, ukuran berkas, checksum, dan nomor slide memakai `tabular-nums`.
- `prefers-reduced-motion` menonaktifkan animasi dan scroll halus.
- `IntersectionObserver` hanya dipakai setelah JavaScript menandai root dengan kelas `js`, sehingga konten tetap tampil bila skrip gagal.

---

## 5. Simulator dan Kejujuran Konten

- Contoh lagu adalah cuplikan dari database rilis v2.6 yang diverifikasi lewat skema `songs` dan nama berkas nyata.
- Teks lirik rekaan dan nama berkas yang tidak ditemukan di database dihapus.
- Semua aksi simulator diberi label simulasi browser dan tidak mengklaim penulisan ke ProPresenter.
- Klaim waktu seperti `< 2 ms`, `< 20 ms`, `< 1 MS / LAGU`, dan `~1 dtk` dihapus.
- Teks `ProPresenter 7 Ready` tidak dipakai sebagai status simulasi browser.
- Rundown memakai tombol native. Tombol hapus adalah saudara dari tombol pilih, bukan anak di dalam tombol.
- localStorage yang diblokir atau berisi data rusak tidak menghentikan UI. Portal menampilkan pesan pemulihan dan tetap memakai rundown sesi berjalan.
- Clipboard yang ditolak browser membuka kolom teks cadangan dengan instruksi salin manual.

---

## 6. Kontrak Download

- Installer memakai rilis publik `v2.7`, berkas `Banklycs-Setup-2.7.0.exe`, `39884985` byte, SHA-256 `95190137a3b50a3347c0c986d3eb148f608924ea4f78c703f280a81df4ed5159`.
- Database memakai jalur terpisah: `database_2026-11-12_14-55-47.db`, `111144960` byte, SHA-256 `7ccf6a94b62316b3a76c56a8c0b796de7ec9c1cd4ebc96c86e47a67d2423e287`.
- Setiap aset memiliki dua tautan eksplisit: halaman GitHub Release dan direct download same-origin.
- Status metadata, sumber data, dan checksum ditampilkan dalam teks yang dapat dibaca pembaca layar.
- Jika checksum tidak tersedia, tidak cocok, atau URL aset di luar daftar izin, portal tidak mengklaim verifikasi.

---

## 7. Verifikasi

- `node --test tests/release.test.js` menguji kontrak rilis, race metadata, allowlist URL, dan checksum.
- `node --test tests/portal.test.js` menguji anchor, tautan legal, sampel terverifikasi, larangan klaim usang, dan kontrak antarmuka.
- Audit render penuh dilakukan pemilik setelah perubahan portal selesai.
