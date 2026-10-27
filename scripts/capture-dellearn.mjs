// Mengambil screenshot aktual dari demo publik DelLearn (https://dellearn-lms.vercel.app).
// Login memakai akun demo yang memang disediakan di halaman login; sesi hanya tersimpan
// di localStorage browser headless ini, tidak ada data server yang diubah.
//
// Jalankan: node scripts/capture-dellearn.mjs
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const BASE = 'https://dellearn-lms.vercel.app';
// Hasil mentah; jalankan `npm run images` setelahnya untuk membuat versi web & PDF.
const OUT = fileURLToPath(new URL('../assets-src/screenshots/dellearn/', import.meta.url));
await mkdir(OUT, { recursive: true });

const SHOTS = {
  admin: [
    ['index.html', 'admin-dashboard'],
    ['pages/data-kelas.html', 'admin-data-kelas'],
    ['pages/detail-kelas.html?id=1', 'admin-detail-kelas'],
    ['pages/data-peserta.html', 'admin-data-peserta'],
    ['pages/data-pengajar.html', 'admin-data-pengajar'],
    ['pages/modul.html', 'admin-modul'],
    ['pages/kuis.html', 'admin-kuis'],
    ['pages/rekap-nilai.html', 'admin-rekap-nilai'],
  ],
  peserta: [
    ['pages/dashboard-peserta.html', 'peserta-dashboard'],
    ['pages/nilai-saya.html', 'peserta-nilai'],
  ],
};

// Halaman peserta yang butuh ID dibuka dengan mengklik tautan aslinya, bukan menebak ID.
const FOLLOW = [
  ['pages/kelas-saya.html', 'a[href*="pertemuan-saya.html?id="]', 'peserta-pertemuan'],
  ['pages/kelas-saya.html', 'a[href*="pertemuan-saya.html?id="]', 'a[href*="baca-modul.html?id="]', 'peserta-baca-modul'],
];

const browser = await chromium.launch({ channel: 'msedge' });
const report = [];

async function login(context, role) {
  const page = await context.newPage();
  await page.goto(`${BASE}/pages/login.html`, { waitUntil: 'networkidle' });
  await page.click(`button.demo-akun[data-demo="${role}"]`);
  // Tombol akun demo mengisi form; kirim bila belum otomatis berpindah halaman.
  if (page.url().includes('login.html')) {
    await page.click('button.login-submit');
  }
  await page.waitForURL((u) => !u.pathname.endsWith('login.html'), { timeout: 15000 });
  await page.close();
}

async function capture(context, path, name, viewport) {
  const page = await context.newPage();
  await page.setViewportSize(viewport);
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200); // animasi Chart.js
  const landed = new URL(page.url()).pathname;
  await page.screenshot({ path: `${OUT}${name}.jpg`, type: 'jpeg', quality: 85 });
  report.push({ name, path, landed, title: await page.title(), errors });
  await page.close();
}

for (const [role, shots] of Object.entries(SHOTS)) {
  const context = await browser.newContext({ deviceScaleFactor: 1.5 });
  await login(context, role);
  for (const [path, name] of shots) {
    await capture(context, path, name, { width: 1440, height: 900 });
  }
  if (role === 'admin') {
    await capture(context, 'index.html', 'admin-dashboard-mobile', { width: 390, height: 844 });
  }
  if (role === 'peserta') {
    for (const step of FOLLOW) {
      const [start, ...selectors] = step.slice(0, -1);
      const name = step.at(-1);
      const page = await context.newPage();
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE}/${start}`, { waitUntil: 'networkidle' });
      for (const sel of selectors) {
        const href = await page.locator(sel).first().getAttribute('href');
        await page.goto(new URL(href, page.url()).href, { waitUntil: 'networkidle' });
      }
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${OUT}${name}.jpg`, type: 'jpeg', quality: 85 });
      report.push({ name, path: new URL(page.url()).pathname + new URL(page.url()).search, landed: '-', title: await page.title(), errors: [] });
      await page.close();
    }
  }
  await context.close();
}

const ctx = await browser.newContext({ deviceScaleFactor: 1.5 });
await capture(ctx, 'pages/login.html', 'login', { width: 1440, height: 900 });
await browser.close();

console.table(report.map((r) => ({ ...r, errors: r.errors.join(' | ') || '-' })));
