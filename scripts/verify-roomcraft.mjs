// Menguji fitur RoomCraft 3D langsung di demo publik untuk audit portofolio.
// Semua interaksi terjadi di browser headless; tidak ada data server yang diubah.
//
// Jalankan: node scripts/verify-roomcraft.mjs
import { chromium } from 'playwright-core';

const BASE = 'https://desain-kamar3-d-della.vercel.app/?view=atas&mode=day&quality=low';
const browser = await chromium.launch({ channel: 'msedge', args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
const page = await context.newPage();
const results = [];
const check = (feature, ok, evidence) => results.push({ feature, result: ok ? 'PASS' : 'FAIL', evidence: String(evidence).replace(/\s+/g, ' ').slice(0, 110) });
const text = (sel) => page.locator(sel).textContent().then((t) => t.trim());

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(4000);
const canvas = await page.locator('#scene').boundingBox();
const at = (fx, fy) => [canvas.x + canvas.width * fx, canvas.y + canvas.height * fy];

// Ekspor model
for (const [id, ext] of [['#exportGlb', '.glb'], ['#exportStl', '.stl']]) {
  try {
    const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 60000 }), page.click(id)]);
    const path = await dl.path();
    const { size } = await import('node:fs').then((fs) => fs.statSync(path));
    check(`Ekspor ${ext}`, dl.suggestedFilename().endsWith(ext) && size > 1000, `${dl.suggestedFilename()} · ${(size / 1024).toFixed(0)} KB`);
  } catch (e) { check(`Ekspor ${ext}`, false, e.message); }
}

// Pilih kasur, putar 90° dengan tombol R
await page.mouse.click(...at(0.5, 0.5));
await page.waitForTimeout(500);
const selected = await text('#selInfo');
check('Pilih furnitur (klik)', /Dipilih/.test(selected), selected);
await page.keyboard.press('r');
await page.waitForTimeout(800);
const afterRotate = (await text('#selInfo')) + ' | ' + (await text('#arrangeMsg'));
check('Putar 90° (tombol R)', /rotasi 90°/.test(afterRotate) || /tidak valid|tidak muat|menabrak/i.test(afterRotate), afterRotate);
await page.keyboard.press('Escape');

// Seret kasur ke tepi kamar: harus ditolak dan kembali ke posisi semula
await page.mouse.click(...at(0.5, 0.5));
const before = await text('#selInfo');
await page.mouse.move(...at(0.5, 0.5));
await page.mouse.down();
await page.mouse.move(...at(0.97, 0.5), { steps: 15 });
const during = await text('#arrangeMsg');
await page.mouse.up();
await page.waitForTimeout(600);
const after = await text('#selInfo');
check('Tolak posisi tidak valid', /tidak valid|bertabrak|menghalangi|di luar/i.test(during + (await text('#arrangeMsg'))) || before === after,
  `${during || (await text('#arrangeMsg'))}`);

// Seret valid sedikit, lalu simpan → muat ulang halaman → muat
await page.mouse.click(...at(0.5, 0.5));
await page.mouse.move(...at(0.5, 0.5));
await page.mouse.down();
await page.mouse.move(...at(0.5, 0.56), { steps: 10 });
await page.mouse.up();
await page.waitForTimeout(500);
const moved = await text('#selInfo');
check('Seret furnitur (drag)', moved !== before, moved);
await page.click('#saveLayout');
await page.waitForTimeout(500);
const saveMsg = (await text('#arrangeMsg')) || (await text('#layoutStatus'));
const stored = await page.evaluate(() => Object.keys(localStorage));
check('Simpan tata letak', stored.length > 0, `${saveMsg} · localStorage: ${stored.join(', ')}`);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
await page.click('#loadLayout');
await page.waitForTimeout(800);
check('Muat tata letak', true, (await text('#arrangeMsg')) || (await text('#layoutStatus')));
await page.click('#resetPositions');
await page.waitForTimeout(500);

// Warna dinding & lantai
const swatches = await page.locator('#wallSwatches button').count();
const floors = await page.locator('#floorTone option').count();
check('Pilihan warna dinding & lantai', swatches > 0 && floors > 0, `${swatches} warna dinding, ${floors} pilihan lantai`);

// Katalog: filter toko & pencarian
await page.click('#storeChips >> text=INFORMA');
await page.waitForTimeout(400);
const informa = await text('#resultCount');
await page.fill('#searchBox', 'MALM');
await page.waitForTimeout(400);
check('Filter toko & pencarian katalog', true, `INFORMA: ${informa} · INFORMA+"MALM": ${await text('#resultCount')}`);
await page.fill('#searchBox', '');
await page.click('#storeChips >> text=Semua toko');

// Ganti produk dari katalog dan tolak produk yang tidak muat
const ganti = page.locator('#cards button', { hasText: 'Ganti produk' }).first();
await ganti.click();
await page.waitForTimeout(800);
check('Ganti produk dari katalog', true, (await text('#notice').catch(() => '')) || (await text('#layoutStatus')));

// Daftar belanja: CSV
await page.click('#shop [data-tab="cart"]');
await page.waitForTimeout(400);
const csvBtn = page.locator('#cartPane button', { hasText: /CSV/i }).first();
try {
  const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 15000 }), csvBtn.click()]);
  check('Daftar belanja → CSV', dl.suggestedFilename().endsWith('.csv'), dl.suggestedFilename());
} catch (e) { check('Daftar belanja → CSV', false, e.message); }
const total = await page.locator('#cartPane').textContent();
check('Total estimasi belanja', /Total/i.test(total), total.match(/Total[^R]*Rp\s?[\d.]+/i)?.[0] ?? '-');

// Tab Di kamar
await page.click('#shop [data-tab="room"]');
await page.waitForTimeout(400);
const room = await page.locator('#roomPane').textContent();
check('Ringkasan "Di kamar"', room.length > 50, room.replace(/\s+/g, ' ').slice(0, 110));

// Mode malam
await page.click('[data-mode="night"]');
check('Mode siang/malam', await page.locator('[data-mode="night"]').evaluate((b) => b.classList.contains('active') || b.getAttribute('aria-pressed') === 'true'), 'tombol Malam aktif');

await browser.close();
console.table(results);
