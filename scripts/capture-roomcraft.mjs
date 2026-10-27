// Mengambil screenshot aktual dari demo publik RoomCraft 3D
// (https://desain-kamar3-d-della.vercel.app). Hanya membaca demo; tidak mengubah apa pun.
//
// Jalankan: node scripts/capture-roomcraft.mjs
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const BASE = 'https://desain-kamar3-d-della.vercel.app/';
// Hasil mentah; jalankan `npm run images` setelahnya untuk membuat versi web & PDF.
const OUT = fileURLToPath(new URL('../assets-src/screenshots/roomcraft/', import.meta.url));
await mkdir(OUT, { recursive: true });

// WebGL memakai GPU asli lewat ANGLE/D3D11; renderer perangkat lunak terlalu lambat untuk adegan ini.
const browser = await chromium.launch({
  channel: 'msedge',
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'],
});
const report = [];

async function open(query, viewport = { width: 1440, height: 900 }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1.5 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(BASE + query, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(6000); // tekstur prosedural, AO, dan bayangan
  return { page, context, errors };
}

async function shot({ page, context, errors }, name, extra = {}) {
  await page.screenshot({ path: `${OUT}${name}.jpg`, type: 'jpeg', quality: 86, timeout: 120000, ...extra });
  report.push({
    name,
    url: page.url().replace(BASE, '/'),
    sub: await page.locator('.sub').textContent().catch(() => '-'),
    status: (await page.locator('#layoutStatus').textContent().catch(() => '')) || '-',
    errors: errors.join(' | ') || '-',
  });
  await context.close();
}

await shot(await open('?view=luar&mode=day&quality=high'), 'tampak-luar');
await shot(await open('?view=dalam&mode=day&quality=high'), 'tampak-dalam');
await shot(await open('?view=atas&mode=day&quality=high'), 'tampak-atas');
await shot(await open('?view=dalam&mode=night&quality=high'), 'mode-malam');

// Tab "Di kamar" dan "Belanja" pada panel kanan.
for (const tab of ['room', 'cart']) {
  const s = await open('?view=luar&mode=day&quality=high');
  await s.page.click(`#shop [data-tab="${tab}"]`);
  await s.page.waitForTimeout(800);
  await shot(s, tab === 'room' ? 'panel-di-kamar' : 'panel-belanja');
}

// Memilih furnitur di tampak atas untuk menampilkan penanda posisi (klik di area kasur).
{
  const s = await open('?view=atas&mode=day&quality=high');
  const box = await s.page.locator('#scene').boundingBox();
  await s.page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await s.page.waitForTimeout(1200);
  report.push({ name: '(seleksi)', url: '', sub: '', status: await s.page.locator('#selInfo').textContent(), errors: '' });
  await shot(s, 'pilih-furnitur');
}

await shot(await open('?view=luar&mode=day&quality=low', { width: 390, height: 844 }), 'mobile');

await browser.close();
console.table(report);
