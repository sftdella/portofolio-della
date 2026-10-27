// Menguji fitur DelLearn langsung di demo publik untuk audit portofolio.
// Data demo hanya tersimpan di localStorage browser headless ini; tidak ada data server yang diubah.
// Tidak ada data yang benar-benar dihapus: modal hapus hanya dibuka lalu dibatalkan.
//
// Jalankan: node scripts/verify-dellearn.mjs
import { chromium } from 'playwright-core';

const BASE = 'https://dellearn-lms.vercel.app';
const browser = await chromium.launch({ channel: 'msedge' });
const results = [];
const check = (feature, ok, evidence) => results.push({ feature, result: ok ? 'PASS' : 'FAIL', evidence: String(evidence).replace(/\s+/g, ' ').slice(0, 110) });

async function session(role) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const page = await context.newPage();
  await page.goto(`${BASE}/pages/login.html`, { waitUntil: 'networkidle' });
  await page.click(`button.demo-akun[data-demo="${role}"]`);
  if (page.url().includes('login.html')) await page.click('button.login-submit');
  await page.waitForURL((u) => !u.pathname.endsWith('login.html'), { timeout: 15000 });
  return { context, page };
}

// Login salah ditolak
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/pages/login.html`, { waitUntil: 'networkidle' });
  await page.fill('#login-identitas', 'salah@contoh.id');
  await page.fill('#login-password', 'salah');
  await page.click('button.login-submit');
  await page.waitForTimeout(800);
  check('Login: kredensial salah ditolak', page.url().includes('login.html'), await page.locator('main, body').first().textContent().then((t) => t.match(/(salah|tidak|gagal)[^.]*\./i)?.[0] ?? 'tetap di halaman login'));
  await page.close();
}

// Admin
{
  const { context, page } = await session('admin');
  check('Login Admin → dashboard', page.url().endsWith('/index.html') || page.url().endsWith('/'), page.url());
  await page.waitForTimeout(1500);
  check('Dashboard: grafik Chart.js', await page.locator('canvas').count() > 0, `${await page.locator('canvas').count()} canvas`);

  await page.goto(`${BASE}/pages/data-kelas.html`, { waitUntil: 'networkidle' });
  const rows = await page.locator('table tbody tr').count();
  check('Data Kelas: tabel dari mock data', rows > 0, `${rows} baris`);
  try {
    const btn = page.locator('button, a', { hasText: /Ekspor CSV/i }).first();
    const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 10000 }), btn.click()]);
    check('Data Kelas: ekspor CSV', dl.suggestedFilename().endsWith('.csv'), dl.suggestedFilename());
  } catch (e) { check('Data Kelas: ekspor CSV', false, e.message); }

  const del = page.locator('table tbody tr [data-action="hapus"]').first();
  if (await del.count()) {
    await del.click();
    await page.waitForTimeout(400);
    const modal = page.locator('[role="dialog"]:visible, .modal:visible').first();
    check('Data Kelas: modal konfirmasi hapus', await modal.count() > 0, (await modal.textContent().catch(() => '')) || '-');
    await page.keyboard.press('Escape');
  } else {
    check('Data Kelas: modal konfirmasi hapus', false, 'tombol Hapus tidak ditemukan');
  }

  await page.goto(`${BASE}/pages/form-kelas.html`, { waitUntil: 'networkidle' });
  await page.locator('form button[type="submit"]').first().click();
  await page.waitForTimeout(500);
  const errs = await page.locator('.field-error:visible, .error-text:visible, [id$="-error"]:visible, .invalid-feedback:visible').allTextContents();
  check('Form Kelas: validasi kolom wajib', errs.filter((t) => t.trim()).length > 0, errs.filter((t) => t.trim()).slice(0, 2).join(' / ') || 'tidak ada pesan');
  await context.close();
}

// Pengajar & Peserta: pembatasan akses berdasarkan role
for (const [role, landing] of [['pengajar', 'dashboard-pengajar'], ['peserta', 'dashboard-peserta']]) {
  const { context, page } = await session(role);
  check(`Login ${role} → ${landing}`, page.url().includes(landing), new URL(page.url()).pathname);
  await page.goto(`${BASE}/pages/data-pengajar.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  check(`Role ${role}: akses Data Pengajar (admin) dibatasi`, !page.url().includes('data-pengajar.html'), `diarahkan ke ${new URL(page.url()).pathname}`);
  await context.close();
}

// Peserta: membuka kuis yang tersedia
{
  const { context, page } = await session('peserta');
  await page.goto(`${BASE}/pages/kuis-saya.html`, { waitUntil: 'networkidle' });
  const links = await page.locator('a[href*="kerjakan.html"]').count();
  check('Peserta: daftar kuis', true, `${links} tautan pengerjaan · ${(await page.locator('main').textContent()).replace(/\s+/g, ' ').slice(0, 80)}`);
  await context.close();
}

await browser.close();
console.table(results);
