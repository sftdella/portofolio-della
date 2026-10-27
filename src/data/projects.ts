import type { Project, Shot } from './types';

/*
 * Isi studi kasus RoomCraft & DelLearn diturunkan dari audit (27 Oktober 2026):
 *  - RoomCraft 3D: README & source lokal (hanya dibaca) + pengujian fungsi di demo publik
 *    (scripts/verify-roomcraft.mjs). Portofolio mengikuti versi DEMO PUBLIK.
 *  - DelLearn: docs/PERANCANGAN.md, docs/PROGRESS.md, source lokal (hanya dibaca)
 *    + pengujian fungsi di demo publik (scripts/verify-dellearn.mjs).
 * Tidak ada angka pengguna, performa, atau hasil uji yang dikarang.
 */

const DESKTOP = 1.6; // screenshot 1440 × 900
const MOBILE = 390 / 844;

const rc = (name: string, ratio: number, en: [string, string], id: [string, string]): Shot => ({
  src: `/images/roomcraft/${name}`,
  ratio,
  alt: { en: en[0], id: id[0] },
  caption: { en: en[1], id: id[1] },
});
const dl = (name: string, ratio: number, en: [string, string], id: [string, string]): Shot => ({
  src: `/images/dellearn/${name}`,
  ratio,
  alt: { en: en[0], id: id[0] },
  caption: { en: en[1], id: id[1] },
});

const roomcraft: Project = {
  slug: 'roomcraft-3d',
  name: 'RoomCraft 3D',
  subtitle: { en: 'Interactive Bedroom Designer', id: 'Desainer Kamar Tidur Interaktif' },
  kind: { en: 'Personal project', id: 'Proyek pribadi' },
  period: '2026',
  status: { tone: 'live', label: { en: 'Live demo', id: 'Demo online' } },
  summary: {
    en: 'A browser-based 3D bedroom designer. Pick furniture from a catalogue of real products, drag it around the room, and get instant feedback on whether it fits — then turn the layout into a shopping list with estimated prices.',
    id: 'Desainer kamar tidur 3D berbasis browser. Pilih furnitur dari katalog produk nyata, geser di dalam kamar, dan langsung lihat apakah furnitur itu muat — lalu ubah tata letaknya menjadi daftar belanja dengan estimasi harga.',
  },
  demoUrl: 'https://desain-kamar3-d-della.vercel.app/',
  repoUrl: 'https://github.com/sftdella/DesainKamar3D_Della',
  cover: rc('hero-luar', 1120 / 1180,
    ['3D view of a furnished bedroom from outside, with a white wardrobe, a double bed and a wooden floor', 'Exterior view'],
    ['Tampilan 3D kamar tidur berperabot dari luar, dengan lemari putih, tempat tidur ganda, dan lantai kayu', 'Tampak luar']),
  tech: [
    { name: 'Three.js 0.170', detail: { en: 'Rendering, GTAO ambient occlusion, shadows, GLB/STL export', id: 'Rendering, ambient occlusion GTAO, bayangan, ekspor GLB/STL' } },
    { name: 'JavaScript', detail: { en: 'Application logic, no UI framework', id: 'Logika aplikasi, tanpa framework UI' } },
    { name: 'HTML & CSS', detail: { en: 'Control panels and catalogue UI', id: 'Panel kontrol dan UI katalog' } },
    { name: 'Vite 5', detail: { en: 'Dev server and production build', id: 'Server pengembangan dan build produksi' } },
    { name: 'Vercel', detail: { en: 'Hosting for the public demo', id: 'Hosting demo publik' } },
  ],
  overview: {
    en: 'RoomCraft 3D renders a furnished bedroom in real time with Three.js. Each furniture model is built in code from the dimensions listed for real products at IKEA, INFORMA and AZKO, so whatever you place in the room keeps its true size. The public demo shows a 4 × 3 m room with a 3 m ceiling.',
    id: 'RoomCraft 3D menampilkan kamar tidur berperabot secara real-time dengan Three.js. Setiap model furnitur dibuat lewat kode berdasarkan ukuran produk nyata dari IKEA, INFORMA, dan AZKO, sehingga furnitur yang diletakkan di kamar tetap berukuran asli. Demo publik menampilkan kamar 4 × 3 m dengan tinggi plafon 3 m.',
  },
  problem: {
    en: 'When furnishing a small room, product pages alone don’t tell you whether a bed, a wardrobe and a desk will actually fit together — around the door and the window — or what the whole set will cost.',
    id: 'Saat mengisi kamar kecil, halaman produk saja tidak cukup untuk mengetahui apakah tempat tidur, lemari, dan meja benar-benar muat bersama — dengan memperhitungkan pintu dan jendela — atau berapa total biayanya.',
  },
  goals: {
    en: [
      'Show the room from outside, inside and above.',
      'Use real product dimensions instead of approximate sizes.',
      'Prevent impossible layouts: collisions, a blocked door swing, a covered window.',
      'Turn a finished layout into a shopping list with an estimated total.',
    ],
    id: [
      'Menampilkan kamar dari luar, dalam, dan atas.',
      'Memakai ukuran produk asli, bukan ukuran perkiraan.',
      'Mencegah tata letak yang mustahil: tabrakan, ayunan pintu terhalang, jendela tertutup.',
      'Mengubah tata letak menjadi daftar belanja dengan estimasi total.',
    ],
  },
  targetUsers: {
    en: 'People planning to furnish a small bedroom who want to compare real products before buying. It is also my personal exploration of 3D on the web.',
    id: 'Orang yang akan mengisi kamar tidur kecil dan ingin membandingkan produk nyata sebelum membeli. Proyek ini juga eksplorasi pribadi saya tentang 3D di web.',
  },
  role: {
    en: 'Personal project — concept, interface design, 3D scene, product data, placement rules and testing.',
    id: 'Proyek pribadi — konsep, desain antarmuka, adegan 3D, data produk, aturan penempatan, dan pengujian.',
  },
  roleShort: { en: 'Concept, UI, 3D development & testing', id: 'Konsep, UI, pengembangan 3D & pengujian' },
  roleItems: {
    en: [
      'Defined the room plan and the rules for where furniture may go.',
      'Designed the control panel and the catalogue / shopping list interface.',
      'Built the 3D scene, procedural materials and day/night lighting with Three.js.',
      'Structured the product catalogue with a source and verification status for every item.',
    ],
    id: [
      'Menyusun denah kamar dan aturan penempatan furnitur.',
      'Merancang panel kontrol serta antarmuka katalog dan daftar belanja.',
      'Membangun adegan 3D, material prosedural, dan pencahayaan siang/malam dengan Three.js.',
      'Menyusun katalog produk lengkap dengan sumber dan status verifikasi setiap item.',
    ],
  },
  approach: {
    en: [
      'Describe the room in one layout configuration — size, door and window — so the plan can change without touching the 3D code.',
      'Build furniture in code from each product’s listed dimensions rather than downloading 3D models.',
      'Generate textures procedurally (wood floor, wall paint, fabric) so the app stays self-contained.',
      'Check every move against the room bounds, other furniture, the door swing and the window before accepting it.',
    ],
    id: [
      'Mendeskripsikan kamar dalam satu konfigurasi denah — ukuran, pintu, dan jendela — agar denah bisa diubah tanpa menyentuh kode 3D.',
      'Membuat furnitur lewat kode dari ukuran resmi setiap produk, bukan mengunduh model 3D.',
      'Membuat tekstur secara prosedural (lantai kayu, cat dinding, kain) agar aplikasi mandiri.',
      'Memeriksa setiap perpindahan terhadap batas kamar, furnitur lain, ayunan pintu, dan jendela sebelum diterima.',
    ],
  },
  implementation: {
    en: [
      'Three.js 0.170 renders the scene with GTAO ambient occlusion and shadows, plus a lighter quality mode for laptops with weaker graphics.',
      'Walls that block the camera hide automatically, giving a dollhouse view from outside.',
      'The catalogue is stored as JSON — 91 products in the public demo — with filters by store and category, and search by name or product code.',
      'Layouts are saved in the browser (localStorage) and encoded in the page URL so a design can be shared.',
      'The room can be exported as GLB (with materials) or STL (geometry only).',
      'Vite 5 handles the dev server and production build; the demo is hosted on Vercel.',
    ],
    id: [
      'Three.js 0.170 merender adegan dengan ambient occlusion GTAO dan bayangan, serta mode kualitas ringan untuk laptop dengan grafis lemah.',
      'Dinding yang menghalangi kamera tersembunyi otomatis sehingga kamar terlihat seperti rumah boneka dari luar.',
      'Katalog disimpan sebagai JSON — 91 produk di demo publik — dengan filter toko dan kategori, serta pencarian nama atau kode produk.',
      'Tata letak disimpan di browser (localStorage) dan dikodekan di URL halaman sehingga desain bisa dibagikan.',
      'Kamar bisa diekspor sebagai GLB (dengan material) atau STL (hanya bentuk).',
      'Vite 5 menangani server pengembangan dan build produksi; demo di-host di Vercel.',
    ],
  },
  features: [
    {
      status: 'verified',
      items: [
        { text: { en: 'Outside, inside and top-down camera views', id: 'Kamera tampak luar, dalam, dan atas' } },
        { text: { en: 'Day and night lighting modes', id: 'Mode pencahayaan siang dan malam' } },
        { text: { en: 'High and light rendering quality', id: 'Kualitas render tinggi dan ringan' } },
        { text: { en: 'Catalogue of 91 real products with store/category filters and search', id: 'Katalog 91 produk nyata dengan filter toko/kategori dan pencarian' } },
        { text: { en: 'Select and drag furniture inside the 3D room', id: 'Memilih dan menyeret furnitur di dalam kamar 3D' } },
        { text: { en: 'Invalid positions rejected with a reason (e.g. “the bed covers the window”)', id: 'Posisi tidak valid ditolak beserta alasannya (mis. “tempat tidur menutupi jendela”)' } },
        { text: { en: 'Curtain from the catalogue shown at the window', id: 'Tirai dari katalog tampil di jendela' } },
        { text: { en: 'Save and load layouts in the browser', id: 'Menyimpan dan memuat tata letak di browser' } },
        { text: { en: 'Share a design through the page URL', id: 'Berbagi desain lewat URL halaman' } },
        { text: { en: 'Shopping list with quantities, estimated total and CSV download', id: 'Daftar belanja dengan jumlah, estimasi total, dan unduhan CSV' } },
        { text: { en: 'Room summary: floor area and share of floor used', id: 'Ringkasan kamar: luas lantai dan persentase lantai terpakai' } },
        { text: { en: 'Wall colour and wood floor options', id: 'Pilihan warna dinding dan lantai kayu' } },
        { text: { en: 'Export the room as GLB and STL', id: 'Ekspor kamar ke GLB dan STL' } },
      ],
    },
    {
      status: 'needs-verification',
      items: [
        {
          text: { en: 'Rotate furniture 90° (button or R key)', id: 'Memutar furnitur 90° (tombol atau tombol R)' },
          source: {
            en: 'The control responds, but in testing every rotation was blocked by the collision check — a successful rotation still has to be confirmed.',
            id: 'Kontrolnya merespons, tetapi dalam pengujian setiap rotasi ditolak oleh pemeriksaan tabrakan — rotasi yang berhasil masih perlu dipastikan.',
          },
        },
        { text: { en: 'Swap a product for another one from the catalogue', id: 'Mengganti produk dengan produk lain dari katalog' } },
      ],
    },
    {
      status: 'in-development',
      items: [
        { text: { en: 'Open / close curtain control', id: 'Kontrol buka / tutup tirai' } },
        { text: { en: 'Updated room plan: 3 × 3 m, 2.95 m ceiling, 60 × 119 cm window on the right wall', id: 'Denah baru: 3 × 3 m, tinggi 2,95 m, jendela 60 × 119 cm di dinding kanan' } },
        { text: { en: 'Larger catalogue and custom decor items', id: 'Katalog lebih besar dan dekorasi kustom' } },
      ],
    },
  ],
  challenges: {
    en: [
      'Handling products that don’t fit: the app keeps every product at its real size and rejects the placement with a reason, rather than quietly scaling furniture down.',
      'Collision checks use each object’s footprint seen from above, not its exact shape — fast and predictable, but conservative in tight corners.',
      'Real-time rendering in the browser isn’t photorealistic; exporting to GLB lets the same room be rendered in Blender instead.',
      'Some INFORMA and AZKO product pages can’t be checked automatically, so those items are marked as unverified and left out of the price total.',
    ],
    id: [
      'Menangani produk yang tidak muat: aplikasi mempertahankan ukuran asli setiap produk dan menolak penempatan beserta alasannya, bukan diam-diam mengecilkan furnitur.',
      'Pemeriksaan tabrakan memakai jejak tampak atas setiap benda, bukan bentuk persisnya — cepat dan konsisten, tetapi konservatif di sudut sempit.',
      'Render real-time di browser belum fotorealistis; ekspor GLB memungkinkan kamar yang sama dirender di Blender.',
      'Sebagian halaman produk INFORMA dan AZKO tidak bisa diperiksa otomatis, sehingga item tersebut ditandai belum terverifikasi dan tidak dihitung dalam total harga.',
    ],
  },
  results: {
    en: [
      'A working public demo; no console errors were recorded during testing.',
      'A catalogue of 91 real products, each labelled with its data status and source.',
      'A complete layout can become a priced shopping list (CSV) or a 3D file (GLB/STL).',
    ],
    id: [
      'Demo publik yang berfungsi; tidak ada error konsol yang tercatat saat pengujian.',
      'Katalog 91 produk nyata, masing-masing dengan status data dan sumbernya.',
      'Tata letak lengkap bisa menjadi daftar belanja berharga (CSV) atau file 3D (GLB/STL).',
    ],
  },
  currentStatus: {
    en: 'Live. This case study describes the version on the public demo. A newer version — with a curtain control, an updated 3 × 3 m room plan and a larger catalogue — is in development and not yet published.',
    id: 'Online. Studi kasus ini menjelaskan versi yang ada di demo publik. Versi yang lebih baru — dengan kontrol tirai, denah 3 × 3 m, dan katalog lebih besar — sedang dikembangkan dan belum dipublikasikan.',
  },
  future: {
    en: [
      'Publish the in-development version to the live demo.',
      'Confirm and polish furniture rotation in tight spaces.',
      'More precise collision shapes instead of footprints.',
      'Photorealistic renders through the GLB → Blender workflow.',
    ],
    id: [
      'Memublikasikan versi yang sedang dikembangkan ke demo online.',
      'Memastikan dan menyempurnakan rotasi furnitur di ruang sempit.',
      'Bentuk tabrakan yang lebih presisi, bukan sekadar jejak tampak atas.',
      'Render fotorealistis melalui alur GLB → Blender.',
    ],
  },
  auditNote: {
    en: 'Features were tested directly on the public demo in October 2026. Items marked “in development” exist in local, unpublished code only.',
    id: 'Fitur diuji langsung di demo publik pada Oktober 2026. Item bertanda “dalam pengembangan” hanya ada di kode lokal yang belum dipublikasikan.',
  },
  gallery: [
    {
      title: { en: 'Room views', id: 'Tampilan kamar' },
      shots: [
        rc('tampak-luar', DESKTOP, ['Full RoomCraft interface with the exterior 3D view, control panel and catalogue', 'Exterior view with control panel and catalogue'], ['Antarmuka lengkap RoomCraft dengan tampak luar 3D, panel kontrol, dan katalog', 'Tampak luar dengan panel kontrol dan katalog']),
        rc('tampak-dalam', DESKTOP, ['Inside view of the bedroom in daylight', 'Interior view, daylight'], ['Tampak dalam kamar pada siang hari', 'Tampak dalam, siang hari']),
        rc('tampak-atas', DESKTOP, ['Top-down view of the bedroom layout', 'Top view — layout at a glance'], ['Tampak atas tata letak kamar', 'Tampak atas — tata letak sekilas']),
      ],
    },
    {
      title: { en: 'Furniture & materials', id: 'Furnitur & material' },
      shots: [
        rc('pilih-furnitur', DESKTOP, ['Bed selected in top view with its size and position shown in the panel', 'Selected furniture shows its real size and position'], ['Tempat tidur dipilih di tampak atas dengan ukuran dan posisinya di panel', 'Furnitur terpilih menampilkan ukuran asli dan posisinya']),
        rc('detail-material', DESKTOP, ['Close view of the bed, bedding fabric, nightstand and wall paint', 'Detail: procedural fabric, wood and paint materials'], ['Tampilan dekat tempat tidur, kain sprei, meja samping, dan cat dinding', 'Detail: material prosedural kain, kayu, dan cat']),
        rc('mode-malam', DESKTOP, ['Interior view at night with ceiling, bedside and desk lamps on', 'Night mode — lamps switched on'], ['Tampak dalam pada malam hari dengan lampu plafon, lampu tidur, dan lampu meja menyala', 'Mode malam — lampu menyala']),
      ],
    },
    {
      title: { en: 'Interface', id: 'Antarmuka' },
      shots: [
        rc('panel-belanja', DESKTOP, ['Shopping list tab with products, prices, quantities and subtotals', 'Shopping list with estimated prices'], ['Tab daftar belanja dengan produk, harga, jumlah, dan subtotal', 'Daftar belanja dengan estimasi harga']),
        rc('panel-di-kamar', DESKTOP, ['“In the room” tab summarising room size and floor usage', 'Room summary'], ['Tab “Di kamar” berisi ringkasan ukuran kamar dan pemakaian lantai', 'Ringkasan kamar']),
        rc('mobile', MOBILE, ['RoomCraft on a phone-sized screen with the control panel at the bottom', 'Phone layout'], ['RoomCraft di layar seukuran ponsel dengan panel kontrol di bawah', 'Tampilan ponsel']),
      ],
    },
  ],
};

const dellearn: Project = {
  slug: 'dellearn',
  name: 'DelLearn',
  subtitle: { en: 'Learning Management System', id: 'Learning Management System' },
  kind: { en: 'Academic project · Web Programming II', id: 'Proyek akademik · Pemrograman Web II' },
  period: '2026',
  status: { tone: 'progress', label: { en: 'In development', id: 'Dalam pengembangan' } },
  summary: {
    en: 'A learning management system concept for a junior high school (SMP) tutoring centre, with separate portals for admins, teachers and students. Built as a client-side prototype running on sample data.',
    id: 'Konsep learning management system untuk bimbingan belajar tingkat SMP, dengan portal terpisah untuk admin, pengajar, dan peserta. Dibangun sebagai prototipe client-side dengan data contoh.',
  },
  demoUrl: 'https://dellearn-lms.vercel.app/',
  repoUrl: 'https://github.com/sftdella/LMS_DelLearn',
  pdfShowcase: ['admin-dashboard', 'admin-data-kelas', 'admin-data-peserta', 'admin-modul', 'peserta-pertemuan', 'admin-rekap-nilai'],
  cover: dl('admin-dashboard', DESKTOP,
    ['DelLearn admin dashboard with class, teacher, student and capacity cards and an active classes table', 'Admin dashboard'],
    ['Dashboard admin DelLearn dengan kartu kelas, pengajar, peserta, kapasitas, dan tabel kelas aktif', 'Dashboard admin']),
  tech: [
    { name: 'HTML & CSS', detail: { en: 'Reusable layout, design tokens, responsive breakpoints', id: 'Layout reusable, design token, breakpoint responsif' } },
    { name: 'JavaScript', detail: { en: 'DOM rendering, validation, role-based views', id: 'Render DOM, validasi, tampilan berbasis role' } },
    { name: 'localStorage', detail: { en: 'Sample data persisted in the browser', id: 'Data contoh disimpan di browser' } },
    { name: 'Chart.js 4.4.1', detail: { en: 'Dashboard chart', id: 'Grafik dashboard' } },
    { name: 'Figma & Stitch', detail: { en: 'Wireframes and high-fidelity design', id: 'Wireframe dan desain high-fidelity' } },
    { name: 'Material Design', detail: { en: 'Design approach', id: 'Pendekatan desain' } },
    { name: 'Vercel', detail: { en: 'Hosting for the public demo', id: 'Hosting demo publik' } },
  ],
  overview: {
    en: 'DelLearn was designed for the Web Programming II course. It covers five SMP subjects and organises each class into 12 meetings, each following the same path — pretest, learning modules, interactive activities, practice questions and a quiz — plus mid- and end-of-semester try-outs. The current build runs entirely in the browser: data is sample data stored in localStorage, and login is a front-end simulation.',
    id: 'DelLearn dirancang untuk mata kuliah Pemrograman Web II. Sistem ini mencakup lima mata pelajaran SMP dan membagi setiap kelas menjadi 12 pertemuan dengan alur yang sama — pretest, modul pembelajaran, aktivitas interaktif, latihan soal, dan kuis — ditambah Try Out PTS dan PAS. Versi saat ini berjalan sepenuhnya di browser: data berupa data contoh di localStorage, dan login masih simulasi front-end.',
  },
  problem: {
    en: 'Running a tutoring programme means managing classes, students and teachers, delivering learning materials and keeping track of results. DelLearn explores how one structured web interface could support all three roles involved.',
    id: 'Menjalankan program bimbingan belajar berarti mengelola kelas, peserta, dan pengajar, menyampaikan materi, serta memantau hasil belajar. DelLearn mengeksplorasi bagaimana satu antarmuka web yang terstruktur dapat mendukung ketiga peran tersebut.',
  },
  goals: {
    en: [
      'Help admins manage classes, students and teachers.',
      'Help teachers manage materials, activities, assignments and quizzes.',
      'Give students a clear, step-by-step learning path for every meeting.',
      'Provide PTS and PAS try-outs as school exam simulations.',
      'Summarise grades so learning progress can be monitored.',
    ],
    id: [
      'Memudahkan admin mengelola kelas, peserta, dan pengajar.',
      'Memudahkan pengajar mengelola materi, aktivitas, tugas, dan kuis.',
      'Memberi peserta alur belajar yang jelas dan bertahap di setiap pertemuan.',
      'Menyediakan Try Out PTS dan PAS sebagai simulasi ujian sekolah.',
      'Merekap nilai agar perkembangan belajar dapat dipantau.',
    ],
  },
  targetUsers: {
    en: 'Admins, teachers and students of an SMP-level tutoring centre. This is a course scenario — the system is not used by a real school, and all names and grades are sample data.',
    id: 'Admin, pengajar, dan peserta bimbingan belajar tingkat SMP. Ini skenario mata kuliah — sistem tidak dipakai oleh sekolah sungguhan, dan semua nama serta nilai adalah data contoh.',
  },
  role: {
    en: 'Academic project — system design, UI design, front-end implementation and testing.',
    id: 'Proyek akademik — perancangan sistem, desain UI, implementasi front-end, dan pengujian.',
  },
  roleShort: { en: 'System design, UI design & front-end', id: 'Perancangan sistem, desain UI & front-end' },
  roleItems: {
    en: [
      'Documented the system: roles, menu structure, user flows and a conceptual ERD.',
      'Designed wireframes in Stitch and a high-fidelity UI in Figma with Material Design.',
      'Sliced the design into a reusable HTML/CSS layout and built the interactivity in JavaScript.',
      'Tested each phase in the browser before moving on, and logged the results.',
    ],
    id: [
      'Mendokumentasikan sistem: peran, struktur menu, user flow, dan ERD konseptual.',
      'Merancang wireframe di Stitch dan UI high-fidelity di Figma dengan Material Design.',
      'Mengubah desain menjadi layout HTML/CSS reusable dan membangun interaktivitas dengan JavaScript.',
      'Menguji setiap fase di browser sebelum lanjut, dan mencatat hasilnya.',
    ],
  },
  approach: {
    en: [
      'Design first: a written system design and ERD before any code.',
      'Milestones that follow the course: design → slicing & layout → components & interactivity.',
      'One source of sample data with ID-based relations, so every page shows consistent numbers.',
      'Build in small phases, each tested and confirmed before starting the next.',
    ],
    id: [
      'Desain lebih dulu: rancangan sistem tertulis dan ERD sebelum menulis kode.',
      'Milestone mengikuti mata kuliah: perancangan → slicing & layout → komponen & interaktivitas.',
      'Satu sumber data contoh dengan relasi berbasis ID, agar angka di semua halaman konsisten.',
      'Dibangun dalam fase kecil, masing-masing diuji dan dikonfirmasi sebelum lanjut.',
    ],
  },
  implementation: {
    en: [
      'Plain HTML, CSS and JavaScript — over 30 pages sharing one stylesheet and one script.',
      'Sample data for classes, students, teachers, meetings, modules and grades, related by ID and persisted in localStorage.',
      'Role-based views for Admin, Teacher and Student; pages outside a role redirect to that role’s dashboard.',
      'Chart.js 4.4.1 for the dashboard chart, with a fallback message when it can’t load.',
      'Responsive layout with a collapsible sidebar drawer, tested at 1280, 820, 500 and 375 px.',
    ],
    id: [
      'HTML, CSS, dan JavaScript murni — lebih dari 30 halaman dengan satu stylesheet dan satu script.',
      'Data contoh untuk kelas, peserta, pengajar, pertemuan, modul, dan nilai, berelasi lewat ID dan disimpan di localStorage.',
      'Tampilan berbasis role untuk Admin, Pengajar, dan Peserta; halaman di luar hak akses diarahkan ke dashboard role tersebut.',
      'Chart.js 4.4.1 untuk grafik dashboard, dengan pesan pengganti bila gagal dimuat.',
      'Layout responsif dengan sidebar laci yang bisa dibuka-tutup, diuji pada 1280, 820, 500, dan 375 px.',
    ],
  },
  features: [
    {
      status: 'verified',
      items: [
        { text: { en: 'Simulated login for Admin, Teacher and Student (demo accounts)', id: 'Login simulasi untuk Admin, Pengajar, dan Peserta (akun demo)' }, source: { en: 'Tested on the demo', id: 'Diuji di demo' } },
        { text: { en: 'Role-based access: admin pages redirect other roles', id: 'Akses berbasis role: halaman admin mengalihkan role lain' }, source: { en: 'Tested on the demo', id: 'Diuji di demo' } },
        { text: { en: 'Admin dashboard with summary cards and a Chart.js chart', id: 'Dashboard admin dengan kartu ringkasan dan grafik Chart.js' }, source: { en: 'Tested on the demo', id: 'Diuji di demo' } },
        { text: { en: 'Class table with CSV export', id: 'Tabel kelas dengan ekspor CSV' }, source: { en: 'Tested on the demo', id: 'Diuji di demo' } },
        { text: { en: 'Class form with validation messages', id: 'Form kelas dengan pesan validasi' }, source: { en: 'Tested on the demo', id: 'Diuji di demo' } },
        { text: { en: 'Delete confirmation modal explaining the impact', id: 'Modal konfirmasi hapus yang menjelaskan dampaknya' }, source: { en: 'Tested on the demo', id: 'Diuji di demo' } },
        { text: { en: 'Add / edit / delete for classes, students, teachers, meetings, modules, assignments, quizzes and try-outs', id: 'Tambah / ubah / hapus untuk kelas, peserta, pengajar, pertemuan, modul, tugas, kuis, dan try out' }, source: { en: 'Confirmed in the project log', id: 'Dikonfirmasi di catatan proyek' } },
        { text: { en: 'Sequential learning path per meeting: pretest → module → activity → practice → quiz', id: 'Alur belajar berurutan per pertemuan: pretest → modul → aktivitas → latihan → kuis' }, source: { en: 'Confirmed in the project log', id: 'Dikonfirmasi di catatan proyek' } },
        { text: { en: 'Timed quizzes and PTS/PAS try-outs for students', id: 'Kuis bertimer serta Try Out PTS/PAS untuk peserta' }, source: { en: 'Confirmed in the project log', id: 'Dikonfirmasi di catatan proyek' } },
        { text: { en: 'Assignment submission (typed answer or file) and teacher grading', id: 'Pengumpulan tugas (jawaban ketik atau file) dan penilaian oleh pengajar' }, source: { en: 'Confirmed in the project log', id: 'Dikonfirmasi di catatan proyek' } },
        { text: { en: 'Student progress monitoring for teachers and admins', id: 'Pemantauan progres peserta untuk pengajar dan admin' }, source: { en: 'Confirmed in the project log', id: 'Dikonfirmasi di catatan proyek' } },
        { text: { en: 'Grade recap with 20/20/30/30 weighting and a print view', id: 'Rekap nilai dengan bobot 20/20/30/30 dan tampilan cetak' }, source: { en: 'Confirmed in the project log', id: 'Dikonfirmasi di catatan proyek' } },
      ],
    },
    {
      status: 'in-development',
      items: [
        { text: { en: 'Full learning content for meetings 6–12 (meetings 1–5 are complete)', id: 'Konten pembelajaran lengkap untuk pertemuan 6–12 (pertemuan 1–5 sudah lengkap)' } },
        { text: { en: 'Consistent status labels between a meeting’s badge and its schedule', id: 'Konsistensi label status antara badge pertemuan dan jadwalnya' } },
        { text: { en: 'Clean-up of the design document (colour codes, Stitch screenshots)', id: 'Perapian dokumen perancangan (kode warna, screenshot Stitch)' } },
      ],
    },
  ],
  challenges: {
    en: [
      'Keeping data consistent across many pages without a backend — solved with one sample-data source and ID-based relations, so deleting a class updates every page that uses it.',
      'Being clear about limits: login and access control run in the browser only and must not be mistaken for real security.',
      'Browser storage is small, so uploaded PDFs and images are capped (1 MB and 500 KB) with a clear message when storage is full.',
      'Found during the portfolio review: on a meeting page the header badge says “Not started” while the schedule below says “Finished” — the two statuses need to come from the same rule.',
    ],
    id: [
      'Menjaga data tetap konsisten di banyak halaman tanpa backend — diselesaikan dengan satu sumber data contoh dan relasi berbasis ID, sehingga menghapus kelas ikut memperbarui semua halaman terkait.',
      'Jujur tentang batasan: login dan pembatasan akses hanya berjalan di browser dan tidak boleh dianggap sebagai keamanan sungguhan.',
      'Penyimpanan browser terbatas, sehingga unggahan PDF dan gambar dibatasi (1 MB dan 500 KB) dengan pesan yang jelas bila penyimpanan penuh.',
      'Ditemukan saat review portofolio: di halaman pertemuan, badge header bertuliskan “Belum dimulai” sementara jadwal di bawahnya “Selesai” — kedua status perlu berasal dari aturan yang sama.',
    ],
  },
  results: {
    en: [
      'A working public demo with three role-based portals.',
      'Admin and teacher management flows, the student learning path and the grade recap all run on sample data.',
      'A documented design: roles, user flows, ERD and a high-fidelity Figma design.',
    ],
    id: [
      'Demo publik yang berfungsi dengan tiga portal berbasis role.',
      'Alur pengelolaan admin dan pengajar, alur belajar peserta, serta rekap nilai berjalan dengan data contoh.',
      'Rancangan yang terdokumentasi: peran, user flow, ERD, dan desain high-fidelity di Figma.',
    ],
  },
  currentStatus: {
    en: 'In development as an academic project. It is a client-side prototype — there is no backend or database yet, and it is not used by any real school.',
    id: 'Dalam pengembangan sebagai proyek akademik. Ini prototipe client-side — belum ada backend maupun database, dan tidak dipakai oleh sekolah mana pun.',
  },
  future: {
    en: [
      'Connect to a real backend and database with secure authentication.',
      'Complete the learning content for meetings 6–12.',
      'Derive every status label from a single rule.',
      'Finish the design document.',
    ],
    id: [
      'Menghubungkan ke backend dan database sungguhan dengan autentikasi yang aman.',
      'Melengkapi konten pembelajaran pertemuan 6–12.',
      'Menurunkan semua label status dari satu aturan yang sama.',
      'Menyelesaikan dokumen perancangan.',
    ],
  },
  auditNote: {
    en: 'Features marked “tested on the demo” were checked directly on the public demo in October 2026. Others are confirmed in the project’s progress log.',
    id: 'Fitur bertanda “diuji di demo” diperiksa langsung di demo publik pada Oktober 2026. Fitur lainnya dikonfirmasi di catatan progres proyek.',
  },
  gallery: [
    {
      title: { en: 'Admin portal', id: 'Portal admin' },
      shots: [
        dl('admin-dashboard', DESKTOP, ['Admin dashboard with summary cards, active classes and upcoming try-outs', 'Admin dashboard'], ['Dashboard admin dengan kartu ringkasan, kelas aktif, dan try out mendatang', 'Dashboard admin']),
        dl('admin-data-kelas', DESKTOP, ['Class data table with search, filters and actions', 'Classes'], ['Tabel data kelas dengan pencarian, filter, dan aksi', 'Data kelas']),
        dl('admin-detail-kelas', DESKTOP, ['Class detail page for Matematika SMP Kelas 8', 'Class detail'], ['Halaman detail kelas Matematika SMP Kelas 8', 'Detail kelas']),
      ],
    },
    {
      title: { en: 'Students & teachers', id: 'Peserta & pengajar' },
      shots: [
        dl('admin-data-peserta', DESKTOP, ['Student data table', 'Students'], ['Tabel data peserta', 'Data peserta']),
        dl('admin-data-pengajar', DESKTOP, ['Teacher data table', 'Teachers'], ['Tabel data pengajar', 'Data pengajar']),
      ],
    },
    {
      title: { en: 'Learning & assessment', id: 'Pembelajaran & penilaian' },
      shots: [
        dl('admin-modul', DESKTOP, ['Learning module management page', 'Learning modules'], ['Halaman pengelolaan modul pembelajaran', 'Modul pembelajaran']),
        dl('peserta-pertemuan', DESKTOP, ['Student meeting page with a five-step progress path', 'Student meeting path'], ['Halaman pertemuan peserta dengan alur progres lima langkah', 'Alur pertemuan peserta']),
        dl('peserta-baca-modul', DESKTOP, ['Student reading a learning module', 'Reading a module'], ['Peserta membaca modul pembelajaran', 'Membaca modul']),
        dl('admin-kuis', DESKTOP, ['Quiz management page', 'Quizzes'], ['Halaman pengelolaan kuis', 'Kuis']),
        dl('admin-rekap-nilai', DESKTOP, ['Grade recap table with weighted final scores', 'Grade recap'], ['Tabel rekap nilai dengan nilai akhir berbobot', 'Rekap nilai']),
      ],
    },
    {
      title: { en: 'Access & mobile', id: 'Akses & mobile' },
      shots: [
        dl('login', DESKTOP, ['Login page with demo account shortcuts', 'Login'], ['Halaman login dengan pintasan akun demo', 'Login']),
        dl('peserta-dashboard', DESKTOP, ['Student dashboard', 'Student dashboard'], ['Dashboard peserta', 'Dashboard peserta']),
        dl('admin-dashboard-mobile', MOBILE, ['Admin dashboard on a phone-sized screen', 'Phone layout'], ['Dashboard admin di layar seukuran ponsel', 'Tampilan ponsel']),
      ],
    },
  ],
};

/*
 * Skin Time — audit 27 Oktober 2026 dari salinan lokal repository (hanya dibaca):
 * C:\Users\Della\AndroidStudioProjects\SkinTime (remote github.com/sftdella/skin-time, Git bersih).
 * Aplikasi TIDAK dijalankan saat audit (tanpa emulator); fitur diverifikasi dari source code
 * dan 6 screenshot asli di folder screenshots/ repository. Tidak ada demo/APK publik.
 */
const PHONE = 1080 / 2400;

const st = (name: string, en: [string, string], id: [string, string]): Shot => ({
  src: `/images/skintime/${name}`,
  ratio: PHONE,
  alt: { en: en[0], id: id[0] },
  caption: { en: en[1], id: id[1] },
});

// Kolase 16:10 berisi tiga screenshot asli (dibuat oleh scripts/optimize-images.mjs).
const stCover: Shot = {
  src: '/images/skintime/cover',
  ratio: 1.6,
  alt: {
    en: 'Three Skin Time screens side by side: home with weather and skincare tips, night routine checklist, and analytics',
    id: 'Tiga layar Skin Time berdampingan: beranda dengan cuaca dan saran skincare, checklist rutinitas malam, dan analytics',
  },
  caption: { en: 'Home, routine checklist and analytics', id: 'Beranda, checklist rutinitas, dan analytics' },
};

const skinTime: Project = {
  slug: 'skin-time',
  name: 'Skin Time',
  subtitle: { en: 'Skincare Routine Companion', id: 'Pendamping Rutinitas Skincare' },
  kind: { en: 'Android application', id: 'Aplikasi Android' },
  period: '2026',
  status: { tone: 'source', label: { en: 'Source on GitHub', id: 'Kode di GitHub' } },
  summary: {
    en: 'An Android app for keeping a daily skincare routine: step-by-step morning and night checklists, a calendar of completed sessions, streaks and achievements, plus weather-based skincare tips and a daily reminder.',
    id: 'Aplikasi Android untuk menjaga rutinitas skincare harian: checklist pagi dan malam langkah demi langkah, kalender sesi yang selesai, streak dan achievement, serta saran perawatan berdasarkan cuaca dan pengingat harian.',
  },
  repoUrl: 'https://github.com/sftdella/skin-time',
  cover: stCover,
  detailCover: stCover,
  showcaseNote: {
    en: 'Actual screenshots from the app, published in its GitHub repository (screenshots/ folder).',
    id: 'Screenshot asli dari aplikasi, dipublikasikan di repository GitHub-nya (folder screenshots/).',
  },
  tech: [
    { name: 'Kotlin', detail: { en: 'Application language', id: 'Bahasa pemrograman aplikasi' } },
    { name: 'Jetpack Compose', detail: { en: 'Declarative UI with Material 3', id: 'UI deklaratif dengan Material 3' } },
    { name: 'Navigation Compose', detail: { en: 'Screen navigation and bottom bar', id: 'Navigasi layar dan bottom bar' } },
    { name: 'SQLite', detail: { en: 'Local storage via SQLiteOpenHelper (steps, schedules, sessions)', id: 'Penyimpanan lokal lewat SQLiteOpenHelper (step, jadwal, sesi)' } },
    { name: 'OpenWeatherMap API', detail: { en: 'Current weather and UV index by location', id: 'Cuaca saat ini dan indeks UV berdasarkan lokasi' } },
    { name: 'AlarmManager', detail: { en: 'Daily reminder notifications, rescheduled after reboot', id: 'Notifikasi pengingat harian, dijadwalkan ulang setelah reboot' } },
  ],
  overview: {
    en: 'Skin Time helps users stick to a skincare routine. Each day they open a Morning or Night session, tick off the steps of their routine, and see their consistency grow on a calendar, a weekly chart and a set of achievements. The home screen adds local weather — temperature, humidity and UV — with simple skincare tips based on those conditions. Built natively for Android 8.0 and up.',
    id: 'Skin Time membantu pengguna konsisten menjalankan rutinitas skincare. Setiap hari pengguna membuka sesi Morning atau Night, mencentang langkah-langkah rutinitasnya, lalu melihat konsistensinya berkembang lewat kalender, grafik mingguan, dan achievement. Layar beranda menampilkan cuaca setempat — suhu, kelembapan, dan UV — beserta saran skincare sederhana sesuai kondisi tersebut. Dibangun native untuk Android 8.0 ke atas.',
  },
  problem: {
    en: 'A skincare routine only works when it is done consistently, but it is easy to skip steps, forget a session, or lose track of how regular you have been — and the right care can change with the weather.',
    id: 'Rutinitas skincare hanya bermanfaat bila dilakukan konsisten, tetapi mudah sekali melewatkan langkah, lupa satu sesi, atau tidak tahu seberapa rutin kita selama ini — padahal perawatan yang tepat bisa berubah mengikuti cuaca.',
  },
  goals: {
    en: [
      'Turn a routine into a clear, step-by-step checklist for morning and night.',
      'Remind the user at a time they choose.',
      'Make consistency visible with a calendar, streaks, a weekly chart and achievements.',
      'Suggest simple skincare tips based on today’s weather.',
    ],
    id: [
      'Mengubah rutinitas menjadi checklist pagi dan malam yang jelas dan bertahap.',
      'Mengingatkan pengguna pada jam yang dipilih sendiri.',
      'Menampilkan konsistensi lewat kalender, streak, grafik mingguan, dan achievement.',
      'Memberi saran skincare sederhana berdasarkan cuaca hari ini.',
    ],
  },
  targetUsers: {
    en: 'People who want to build and keep a daily skincare habit and prefer a simple, friendly tracker on their Android phone.',
    id: 'Orang yang ingin membangun dan menjaga kebiasaan skincare harian, dan menginginkan pencatat yang sederhana serta ramah di ponsel Android.',
  },
  role: {
    en: 'Design and Android development — interface, data model, reminders, weather integration and analytics.',
    id: 'Desain dan pengembangan Android — antarmuka, model data, pengingat, integrasi cuaca, dan analytics.',
  },
  roleShort: { en: 'UI design & Android development', id: 'Desain UI & pengembangan Android' },
  roleItems: {
    en: [
      'Designed a soft, friendly interface with a custom Material 3 theme and illustrated icons.',
      'Modelled routines, steps, schedules and sessions in a local SQLite database.',
      'Implemented daily reminders with AlarmManager and a boot receiver.',
      'Connected the OpenWeatherMap API and wrote the rules behind the skincare tips.',
      'Built the analytics screen: streak, consistency score, weekly chart and achievements.',
    ],
    id: [
      'Merancang antarmuka yang lembut dan ramah dengan tema Material 3 kustom dan ikon ilustrasi.',
      'Memodelkan rutinitas, step, jadwal, dan sesi di database SQLite lokal.',
      'Mengimplementasikan pengingat harian dengan AlarmManager dan boot receiver.',
      'Menghubungkan OpenWeatherMap API dan menyusun aturan di balik saran skincare.',
      'Membangun layar analytics: streak, skor konsistensi, grafik mingguan, dan achievement.',
    ],
  },
  approach: {
    en: [
      'Keep everything on the device: routines and history live in a local SQLite database, so the app works offline (only the weather card needs internet).',
      'Organise the app around three tabs — Home, Routine and Calendar — with Analytics one tap away.',
      'Treat a routine as a list of editable steps, so users can add, reorder or mark steps as optional instead of following a fixed template.',
    ],
    id: [
      'Semua data tetap di perangkat: rutinitas dan riwayat tersimpan di database SQLite lokal, sehingga aplikasi tetap berjalan offline (hanya kartu cuaca yang butuh internet).',
      'Menyusun aplikasi dalam tiga tab — Home, Routine, dan Calendar — dengan Analytics yang bisa dibuka sekali ketuk.',
      'Memperlakukan rutinitas sebagai daftar step yang bisa diubah, sehingga pengguna bisa menambah, mengurutkan, atau menandai step sebagai opsional, bukan mengikuti templat kaku.',
    ],
  },
  implementation: {
    en: [
      'Kotlin with Jetpack Compose and Material 3; Navigation Compose for screens and the bottom bar. Min SDK 26, target SDK 36.',
      'SQLiteOpenHelper with four tables: checklist steps, activity schedule, routine sessions and session details.',
      'Weather fetched with HttpURLConnection from OpenWeatherMap using the last known location; if the UV request fails, UV is estimated from the weather code.',
      'Reminder: an exact alarm fires a notification at the chosen time, then schedules the next day; a boot receiver restores it after a restart.',
      'Weekly chart drawn with Compose layout primitives — no chart library.',
      'The OpenWeatherMap API key is read from local.properties at build time, so it never enters the repository.',
    ],
    id: [
      'Kotlin dengan Jetpack Compose dan Material 3; Navigation Compose untuk layar dan bottom bar. Min SDK 26, target SDK 36.',
      'SQLiteOpenHelper dengan empat tabel: checklist step, jadwal aktivitas, sesi rutinitas, dan detail sesi.',
      'Cuaca diambil dengan HttpURLConnection dari OpenWeatherMap memakai lokasi terakhir yang diketahui; bila permintaan UV gagal, UV diperkirakan dari kode cuaca.',
      'Pengingat: alarm tepat waktu memicu notifikasi pada jam yang dipilih, lalu menjadwalkan hari berikutnya; boot receiver memulihkannya setelah perangkat dinyalakan ulang.',
      'Grafik mingguan digambar dengan komponen layout Compose — tanpa library grafik.',
      'API key OpenWeatherMap dibaca dari local.properties saat build, sehingga tidak pernah masuk ke repository.',
    ],
  },
  features: [
    {
      status: 'verified',
      items: [
        { text: { en: 'Morning and Night routine checklists, with optional steps', id: 'Checklist rutinitas Morning dan Night, dengan step opsional' }, source: { en: 'Code + app screenshot', id: 'Kode + screenshot aplikasi' } },
        { text: { en: 'Add a session: Morning, Night, additional activity or custom routine', id: 'Tambah sesi: Morning, Night, aktivitas tambahan, atau custom routine' }, source: { en: 'Code + app screenshot', id: 'Kode + screenshot aplikasi' } },
        { text: { en: 'Monthly calendar marking completed days, with session details per date', id: 'Kalender bulanan yang menandai hari selesai, dengan detail sesi per tanggal' }, source: { en: 'Code + app screenshot', id: 'Kode + screenshot aplikasi' } },
        { text: { en: 'Analytics: streak, active days, total sessions and a 7-day chart', id: 'Analytics: streak, hari aktif, total sesi, dan grafik 7 hari' }, source: { en: 'Code + app screenshot', id: 'Kode + screenshot aplikasi' } },
        { text: { en: 'Consistency score (“Skin Score”) based on the current streak', id: 'Skor konsistensi (“Skin Score”) berdasarkan streak saat ini' }, source: { en: 'Code + app screenshot', id: 'Kode + screenshot aplikasi' } },
        { text: { en: 'Seven achievements, e.g. Morning Hero, Night Owl, Hydration Queen', id: 'Tujuh achievement, mis. Morning Hero, Night Owl, Hydration Queen' }, source: { en: 'Code + app screenshot', id: 'Kode + screenshot aplikasi' } },
        { text: { en: 'Local weather card: temperature, humidity and UV level', id: 'Kartu cuaca setempat: suhu, kelembapan, dan level UV' }, source: { en: 'Code + app screenshot', id: 'Kode + screenshot aplikasi' } },
        { text: { en: 'Skincare tips that change with temperature, humidity and UV', id: 'Saran skincare yang menyesuaikan suhu, kelembapan, dan UV' }, source: { en: 'Code + app screenshot', id: 'Kode + screenshot aplikasi' } },
      ],
    },
    {
      status: 'needs-verification',
      items: [
        {
          text: { en: 'Daily reminder notification at a chosen time, restored after reboot', id: 'Notifikasi pengingat harian pada jam pilihan, dipulihkan setelah reboot' },
          source: { en: 'Implemented in code; not shown in the screenshots or run during this review', id: 'Ada di kode; tidak tampak di screenshot dan tidak dijalankan saat review ini' },
        },
        { text: { en: 'Manage checklist steps: add, edit, delete, reorder', id: 'Kelola step checklist: tambah, ubah, hapus, urutkan' }, source: { en: 'Implemented in code', id: 'Ada di kode' } },
        { text: { en: 'Schedule additional activities (e.g. masks) on chosen days', id: 'Jadwalkan aktivitas tambahan (mis. masker) di hari tertentu' }, source: { en: 'Implemented in code', id: 'Ada di kode' } },
      ],
    },
  ],
  challenges: {
    en: [
      'Getting a location without extra libraries: the app uses the last known location from GPS, network or passive providers, and shows a clear state when no location or permission is available.',
      'The UV request uses an older OpenWeatherMap endpoint; when it fails the app falls back to an estimate from the weather code.',
      'Found during the portfolio review: the weather icon is fixed to a sun, so a “Rain” reading still shows a sun, and the captured screen shows “UV Extreme” late at night — the icon and UV source need fixing.',
      'The “Skin Score” is a consistency score derived from the streak, not a measurement of skin condition — the label should make that clear.',
    ],
    id: [
      'Mendapatkan lokasi tanpa library tambahan: aplikasi memakai lokasi terakhir dari provider GPS, network, atau passive, dan menampilkan keadaan yang jelas bila lokasi atau izin tidak tersedia.',
      'Permintaan UV memakai endpoint OpenWeatherMap versi lama; bila gagal, aplikasi beralih ke perkiraan dari kode cuaca.',
      'Ditemukan saat review portofolio: ikon cuaca selalu matahari, sehingga kondisi “Hujan” tetap bergambar matahari, dan layar yang direkam menampilkan “UV Ekstrem” pada larut malam — ikon dan sumber data UV perlu diperbaiki.',
      '“Skin Score” adalah skor konsistensi yang dihitung dari streak, bukan ukuran kondisi kulit — labelnya perlu memperjelas hal itu.',
    ],
  },
  results: {
    en: [
      'A working Android app, shown in six screenshots captured from the app.',
      'Routines, history and analytics are stored and calculated fully on the device.',
      'Source code is public on GitHub with setup instructions; the API key stays out of the repository.',
    ],
    id: [
      'Aplikasi Android yang berfungsi, ditunjukkan oleh enam screenshot yang diambil dari aplikasi.',
      'Rutinitas, riwayat, dan analytics disimpan serta dihitung sepenuhnya di perangkat.',
      'Source code publik di GitHub beserta petunjuk instalasi; API key tidak ikut masuk repository.',
    ],
  },
  currentStatus: {
    en: 'Version 1.0 in the repository. The app is not published on Google Play and there is no public APK yet — it can be built and run from Android Studio.',
    id: 'Versi 1.0 di repository. Aplikasi belum dipublikasikan di Google Play dan belum ada APK publik — aplikasi dapat di-build dan dijalankan dari Android Studio.',
  },
  future: {
    en: [
      'Weather icons that match the actual condition, and a current UV data source.',
      'Rename “Skin Score” to make clear it measures consistency.',
      'Publish a downloadable build (APK or Google Play).',
      'Automated tests for the database and streak logic.',
    ],
    id: [
      'Ikon cuaca yang sesuai kondisi sebenarnya, dan sumber data UV yang terbaru.',
      'Mengganti nama “Skin Score” agar jelas bahwa yang diukur adalah konsistensi.',
      'Menyediakan build yang bisa diunduh (APK atau Google Play).',
      'Tes otomatis untuk logika database dan streak.',
    ],
  },
  auditNote: {
    en: 'The app was not run during this review. Features were checked against the source code and the six screenshots in the repository; items marked “implemented in code” have not been seen running.',
    id: 'Aplikasi tidak dijalankan saat review ini. Fitur diperiksa terhadap source code dan enam screenshot di repository; item bertanda “ada di kode” belum terlihat berjalan.',
  },
  gallery: [
    {
      title: { en: 'App screens', id: 'Layar aplikasi' },
      shots: [
        st('home', ['Home screen with greeting, local weather and skincare recommendations', 'Home — weather & skincare tips'], ['Layar beranda dengan sapaan, cuaca setempat, dan rekomendasi skincare', 'Beranda — cuaca & saran skincare']),
        st('add-session', ['Bottom sheet to add a Morning, Night, additional or custom session', 'Add a session'], ['Bottom sheet untuk menambah sesi Morning, Night, tambahan, atau custom', 'Tambah sesi']),
        st('routine-checklist', ['Night routine checklist with completed and optional steps', 'Routine checklist'], ['Checklist rutinitas malam dengan step selesai dan opsional', 'Checklist rutinitas']),
        st('calendar', ['Monthly calendar with a completed day and its session details', 'Calendar & session history'], ['Kalender bulanan dengan hari selesai dan detail sesinya', 'Kalender & riwayat sesi']),
        st('analytics', ['Analytics with streak, consistency score and weekly chart', 'Analytics — streak & weekly chart'], ['Analytics dengan streak, skor konsistensi, dan grafik mingguan', 'Analytics — streak & grafik mingguan']),
        st('achievements', ['Achievement badges and routine statistics', 'Achievements & statistics'], ['Lencana achievement dan statistik rutinitas', 'Achievement & statistik']),
      ],
    },
  ],
};

export const projects: Project[] = [roomcraft, dellearn, skinTime];

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
