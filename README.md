# Deyla Studio — Portofolio Della Rodhiah

Website portofolio dwibahasa (English / Bahasa Indonesia) milik **Seftia Della Fiisyatir Rodhiah** (Della Rodhiah), UI/UX Designer & Web Developer. Website ini menampilkan dua studi kasus, yaitu **RoomCraft 3D** dan **DelLearn LMS**, dan dapat menghasilkan **PDF portofolio** langsung dari browser.

Website ini dipakai untuk:

- melamar posisi front-end, web development, dan UI/UX,
- menawarkan jasa freelance,
- menampilkan proyek pribadi dan akademik apa adanya: apa yang sudah berjalan, apa yang masih dikembangkan, dan bagaimana setiap klaim diverifikasi.

---

## Fitur

| Fitur | Keterangan |
| --- | --- |
| Dwibahasa | Tombol **EN / ID** di header mengganti seluruh teks: navigasi, tombol, isi profil, studi kasus, label status, keterangan gambar, judul tab, dan meta description. Pilihan bahasa diingat browser. `?lang=id` di URL langsung membuka versi Indonesia. |
| Halaman utama | Hero, About, Featured Projects, Skills & Technologies, Education, dan Contact. |
| Studi kasus | `/projects/roomcraft-3d` dan `/projects/dellearn`, masing-masing dengan 14 bagian (Overview sampai Visual Showcase), daftar isi, dan tautan proyek berikutnya. |
| Status fitur | Setiap fitur proyek dikelompokkan menjadi *Implemented & verified*, *Implemented, needs verification*, *In development*, atau *Planned*, beserta sumber buktinya. |
| Galeri | Screenshot asli dari demo publik, dengan lightbox yang bisa dioperasikan lewat keyboard (← → Esc). |
| PDF portofolio | Tombol **Download portfolio PDF** membuat PDF A4 sebanyak 12 halaman dalam bahasa yang sedang dipilih. Font sama dengan website, link bisa diklik, dan ada nomor halaman. |
| Responsif | Layout khusus untuk ponsel (menu laci, tombol selebar layar, nama tampil lebih dulu), tablet, dan desktop. |
| Aksesibilitas | Skip link, fokus keyboard yang jelas, `aria-*` pada menu, pengalih bahasa, dan lightbox, teks alt dwibahasa, serta animasi yang mati otomatis bila pengguna memilih *reduced motion*. |

Bagian **Experience** dan **Certifications** sudah disiapkan tetapi saat ini **disembunyikan** karena datanya kosong (lihat [Mengubah data profil](#mengubah-data-profil)).

## Teknologi

- **React 19 + TypeScript + Vite 6**
- **react-router-dom 7** untuk halaman studi kasus
- **@react-pdf/renderer 4** untuk PDF. Library ini menghasilkan PDF vektor sungguhan, bukan screenshot halaman atau dialog cetak browser. Library baru dimuat saat tombol unduh diklik, sehingga halaman awal tetap ringan (bundle utama sekitar 105 KB gzip).
- **Fontsource**: Plus Jakarta Sans dan Instrument Serif, di-host sendiri. File font yang sama dipakai website dan PDF.
- CSS biasa dengan design token (`src/styles/tokens.css`), tanpa framework CSS.
- Dev tools: **playwright-core** (pengujian & screenshot memakai Microsoft Edge yang sudah terpasang) dan **sharp** (optimasi gambar).

## Struktur folder

```
deyla-portfolio/
├── assets-src/                 # Gambar MENTAH (sumber) — tidak ikut di-deploy
│   ├── profile/della.png
│   └── screenshots/{roomcraft,dellearn}/*.jpg
├── public/
│   ├── images/                 # Hasil `npm run images` (WebP untuk web, JPG untuk PDF)
│   └── favicon.svg
├── scripts/
│   ├── optimize-images.mjs     # assets-src → public/images
│   ├── capture-roomcraft.mjs   # ambil ulang screenshot dari demo RoomCraft
│   ├── capture-dellearn.mjs    # ambil ulang screenshot dari demo DelLearn
│   ├── verify-roomcraft.mjs    # uji fitur RoomCraft di demo publik (audit)
│   ├── verify-dellearn.mjs     # uji fitur DelLearn di demo publik (audit)
│   └── test-site.mjs           # uji end-to-end website + unduhan PDF
├── src/
│   ├── data/                   # ⇦ SEMUA KONTEN: profile.ts, projects.ts, skills.ts, types.ts
│   ├── i18n/                   # strings.ts (teks antarmuka) + LanguageContext.tsx
│   ├── components/             # Header, Footer, Gallery, Picture, DownloadPdfButton, …
│   │   └── sections/           # Hero, About, Projects, Skills, Education, Contact
│   ├── pages/                  # HomePage, CaseStudyPage, NotFoundPage
│   ├── pdf/                    # PortfolioDocument.tsx (layout PDF) + generate.ts
│   ├── hooks/                  # useDocumentMeta
│   └── styles/                 # tokens.css, base.css, layout.css, sections.css, case-study.css
├── index.html
├── vercel.json                 # rewrite SPA agar /projects/... bisa dibuka langsung
└── vite.config.ts
```

Konten dipisah dari tampilan. Untuk mengubah teks, cukup edit `src/data/` (konten) atau `src/i18n/strings.ts` (label UI). Komponen tidak perlu disentuh.

## Menjalankan secara lokal

Yang dibutuhkan: **Node.js 18+** (sudah diuji dengan Node 24.11 dan npm 11.6).

```bash
npm install        # instal dependensi
npm run dev        # server pengembangan → http://localhost:5173
```

## Build production

```bash
npm run build      # cek TypeScript + build ke folder dist/
npm run preview    # lihat hasil build → http://localhost:4173
npm run lint       # ESLint
```

## Mengubah data profil

Edit `src/data/profile.ts`. Setiap teks punya dua bahasa:

```ts
headline: { en: 'UI/UX Designer & Web Developer', id: 'UI/UX Designer & Web Developer' },
```

- **Kontak:** `contact.email`, `contact.github`, `contact.linkedin`.
- **Pendidikan:** `education[]`. IPK sengaja tidak dicantumkan.
- **Pengalaman** (saat ini disembunyikan). Isi `experience` untuk menampilkannya di website:
  ```ts
  experience: [
    {
      title: { en: 'IT Intern', id: 'Magang TI' },
      org: 'Nama Perusahaan',
      period: { en: 'Jan – Mar 2026', id: 'Jan – Mar 2026' },
      points: { en: ['…'], id: ['…'] },
    },
  ],
  ```
- **Sertifikasi** (saat ini disembunyikan). Isi `certifications` dengan `{ name, issuer, year, kind: 'competency' | 'participation' }`.
- **Keterampilan:** `src/data/skills.ts`. `usedIn` hanya diisi bila keterampilan itu benar-benar dipakai di proyek unggulan, sehingga muncul tautan "Used in RoomCraft 3D".
- **Label tombol & navigasi:** `src/i18n/strings.ts`.

> Bagian Experience dan Certifications baru tampil di **website** bila datanya diisi. PDF saat ini belum memuat kedua bagian tersebut. Tambahkan ke `ProfilePage` di `src/pdf/PortfolioDocument.tsx` bila diperlukan.

## Mengganti screenshot

Ada dua cara.

**A. Ambil ulang otomatis dari demo publik** (memakai Microsoft Edge):

```bash
npm run capture:roomcraft   # → assets-src/screenshots/roomcraft/
npm run capture:dellearn    # → assets-src/screenshots/dellearn/ (login memakai akun demo)
npm run images              # buat ulang public/images/
```

**B. Pakai gambar sendiri.** Simpan JPG/PNG di `assets-src/screenshots/<proyek>/` dengan **nama yang sama** seperti file lama, lalu jalankan `npm run images`. Usahakan rasio 16:10 (misalnya 1440 × 900), karena itulah rasio yang dipakai layout.

Foto profil: ganti `assets-src/profile/della.png`, lalu `npm run images`.

Setiap gambar menghasilkan `nama.webp` (1600 px), `nama-sm.webp` (800 px), dan `nama.jpg` (untuk PDF). Potongan khusus seperti `hero-luar` dan `detail-material` diatur di daftar `CROPS` dalam `scripts/optimize-images.mjs`.

> Jangan memakai gambar generatif atau mockup seolah-olah itu screenshot asli. Galeri menyatakan "Actual screenshots captured from the public demo".

## Menambah proyek

1. Simpan screenshot di `assets-src/screenshots/<nama-proyek>/`, lalu tambahkan nama folder itu ke perulangan `for (const project of [...])` di `scripts/optimize-images.mjs`. Jalankan `npm run images`.
2. Di `src/data/projects.ts`, buat objek `Project` baru dengan mengikuti `roomcraft` atau `dellearn`. TypeScript akan menandai field yang belum diisi. Isi `features` hanya dengan status yang benar-benar terbukti.
3. Tambahkan ke array `projects`. Kartu di beranda, halaman `/projects/<slug>`, daftar isi, galeri, dan tautan "Next project" akan muncul otomatis.
4. PDF: `PortfolioDocument` saat ini menyusun halaman untuk dua proyek secara eksplisit (fungsi `PortfolioDocument` di bagian bawah file). Tambahkan `CaseStudyPage`, `ShowcasePage`, `ImplementationPage`, dan `FeaturesPage` untuk proyek baru, lalu perbarui angka `12` di `scripts/test-site.mjs`.

## Membuat PDF

- **Dari website:** klik **Download portfolio PDF** (di hero atau bagian Contact). PDF dibuat di browser dalam bahasa yang sedang aktif, dengan nama file `Della-Rodhiah-Portfolio-EN.pdf` atau `…-ID.pdf`.
- **Untuk lampiran email:** jalankan `npm run build`, `npm run preview`, lalu `npm run test:site`. Kedua versi PDF tersimpan di `test-results/`.
- Isi PDF diambil dari `src/data/`, sama dengan website, jadi tidak perlu diedit terpisah.
- Susunan 12 halaman: sampul · profil · ringkasan proyek · RoomCraft (studi kasus, galeri, implementasi, fitur & hasil) · DelLearn (studi kasus, galeri, proses & teknologi, fitur & hasil) · kontak & tautan.
- Layout PDF ada di `src/pdf/PortfolioDocument.tsx`. Bila teks bertambah panjang, cek jumlah halaman lewat `npm run test:site`. Halaman yang meluap akan terlihat sebagai halaman ke-13.

## Pengujian

```bash
npm run build
npm run preview            # terminal 1
npm run test:site          # terminal 2
```

`test-site.mjs` memeriksa:
- error konsol di semua rute,
- tidak ada scroll horizontal di lebar 1440, 1024, 768, dan 375 px,
- semua gambar termuat,
- navigasi header, menu mobile, daftar isi, dan "Next project",
- language switcher di beranda dan studi kasus, termasuk persistensi setelah reload dan `?lang=id`,
- lightbox,
- tautan internal dan eksternal,
- halaman 404,
- unduhan PDF EN dan ID: file `%PDF`, 12 halaman, ada link yang bisa diklik.

Set `CHECK_EXTERNAL=0` untuk melewati cek tautan eksternal.

Tautan yang tidak bisa dijangkau dari jaringan tempat pengujian dicatat sebagai **SKIP**, bukan PASS. LinkedIn selalu menolak klien otomatis (kode 999), jadi tautan itu perlu dicek manual.

## Deployment ke Vercel

> Deployment belum dilakukan. Langkah-langkah di bawah ini dijalankan sendiri oleh pemilik.

1. Buat repository baru di GitHub (misalnya `sftdella/deyla-portfolio`) dan push folder ini. `node_modules`, `dist`, dan `test-results` sudah diabaikan oleh `.gitignore`.
2. Di [vercel.com](https://vercel.com), pilih **Add New → Project**, lalu impor repository tersebut.
3. Vercel mendeteksi Vite secara otomatis:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Klik **Deploy**. `vercel.json` sudah mengatur rewrite, sehingga `/projects/roomcraft-3d` bisa dibuka langsung atau di-refresh tanpa 404.
5. Setelah online, buka website, klik **Download portfolio PDF** di kedua bahasa, dan periksa hasilnya.
6. (Opsional) Hubungkan domain sendiri lewat **Settings → Domains**.

Alternatif lewat CLI: `npm i -g vercel`, lalu `vercel` (preview) dan `vercel --prod`.

## Troubleshooting

| Masalah | Solusi |
| --- | --- |
| Gambar tidak muncul | Jalankan `npm run images`. Pastikan file `-sm.webp`, `.webp`, dan `.jpg` ada di `public/images/...`. Catatan: `vite preview` mengembalikan `index.html` untuk file yang tidak ada, jadi gambar yang hilang tidak memunculkan 404. |
| `/projects/...` 404 setelah deploy | Pastikan `vercel.json` ikut ter-commit. Di hosting lain, arahkan semua rute ke `index.html` (SPA fallback). |
| PDF gagal dibuat | Lihat konsol browser. Gambar di PDF diambil dari `/images/**.jpg` di domain yang sama, jadi pastikan file JPG-nya ada. |
| PDF jadi 13 halaman atau lebih | Ada halaman yang meluap karena teks bertambah panjang. Persingkat teks di `src/data/projects.ts` atau sesuaikan layout di `src/pdf/PortfolioDocument.tsx`. |
| Karakter tampil kotak di PDF | Font PDF memakai subset Latin. Karakter seperti `→` diganti otomatis menjadi `›` oleh `clean()`. Tambahkan penggantian di sana untuk karakter lain. |
| Skrip capture/test gagal membuka browser | Skrip memakai Microsoft Edge (`channel: 'msedge'`). Di komputer tanpa Edge, ganti dengan `channel: 'chrome'` atau jalankan `npx playwright install chromium` lalu hapus opsi `channel`. |
| Screenshot RoomCraft hitam/lambat | Skrip memakai GPU (`--use-angle=d3d11`). Di mesin tanpa GPU, ganti ke `--use-angle=swiftshader` dan perpanjang batas waktunya. |
| Peringatan "chunk larger than 500 kB" | Normal untuk chunk generator PDF yang hanya dimuat saat diklik. Batasnya sudah dinaikkan di `vite.config.ts`. |

## Catatan audit & batasan konten

- Isi studi kasus berasal dari audit pada **27 Oktober 2026**: README, source lokal (hanya dibaca, tidak diubah), dokumen proyek, dan pengujian fungsi langsung di kedua demo publik (`npm run verify:roomcraft`, `npm run verify:dellearn`).
- **GitHub tidak bisa diakses dari jaringan saat audit**, sehingga isi repository online tidak dibandingkan langsung. Audit memakai salinan lokal yang remote-nya mengarah ke kedua repository tersebut.
- **RoomCraft 3D** ditampilkan sesuai **demo publik**: kamar 4 × 3 m, 91 produk. Versi lokal yang lebih baru (kontrol tirai, kamar 3 × 3 m, 100 produk) belum di-commit dan belum dipublikasikan, sehingga ditandai *In development*. Setelah versi baru di-deploy, ambil ulang screenshot dan perbarui `src/data/projects.ts`.
- **DelLearn** ditampilkan sebagai proyek akademik yang masih dikembangkan: prototipe client-side dengan data contoh, login masih simulasi, dan tidak dipakai sekolah sungguhan.
- Website ini **tidak menyalin source code** kedua proyek. Hanya screenshot, ringkasan, dan tautan ke repository asli.
- Tidak ada persentase skill, angka pengguna, atau hasil uji yang dikarang.
