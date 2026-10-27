// Pengujian end-to-end build produksi di Microsoft Edge (headless).
//
// Pakai:  npm run build && npm run preview   (terminal 1)
//         npm run test:site                  (terminal 2)
// Opsi:   BASE_URL=http://localhost:4173  CHECK_EXTERNAL=0 (lewati cek tautan eksternal)
//
// Hasil (PDF yang diunduh, ringkasan JSON) disimpan di test-results/.
import { chromium } from 'playwright-core';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE_URL ?? 'http://localhost:4173';
const OUT = fileURLToPath(new URL('../test-results/', import.meta.url));
const CHECK_EXTERNAL = process.env.CHECK_EXTERNAL !== '0';
await mkdir(OUT, { recursive: true });

const ROUTES = ['/', '/projects/roomcraft-3d', '/projects/dellearn'];
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, laptop: { width: 1024, height: 768 }, tablet: { width: 768, height: 1024 }, mobile: { width: 375, height: 740 } };

const results = [];
/** ok: true → PASS, false → FAIL, 'skip' → SKIP (tidak bisa diuji dari lingkungan ini). */
const record = (area, check, ok, detail = '') => {
  const result = ok === 'skip' ? 'SKIP' : ok ? 'PASS' : 'FAIL';
  results.push({ area, check, result, detail: String(detail).replace(/\s+/g, ' ').slice(0, 120) });
};

const browser = await chromium.launch({ channel: 'msedge' });

async function newPage(viewport = VIEWPORTS.desktop, opts = {}) {
  const context = await browser.newContext({ viewport, acceptDownloads: true, ...opts });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return { context, page, errors };
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

// 1. Error konsol, gambar, overflow horizontal per rute & viewport
for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
  const { context, page, errors } = await newPage(vp);
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await scrollThrough(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    record('Layout', `${route} @ ${vpName} (${vp.width}px): no horizontal scroll`, overflow <= 0, `overflow ${overflow}px`);
    if (vpName === 'desktop' || vpName === 'mobile') {
      // Paksa gambar lazy dimuat, lalu tunggu semuanya selesai (berhasil atau gagal).
      const broken = await page.evaluate(async () => {
        const imgs = [...document.images];
        imgs.forEach((i) => (i.loading = 'eager'));
        await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
        return imgs.filter((i) => i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
      });
      const total = await page.evaluate(() => document.images.length);
      record('Images', `${route} @ ${vpName}: all images load`, broken.length === 0, broken.length ? broken.join(', ') : `${total} images OK`);
    }
    record('Console', `${route} @ ${vpName}: no console errors`, errors.length === 0, errors.splice(0).join(' | ') || 'none');
  }
  await context.close();
}

// 2. Navigasi header ke setiap bagian
{
  const { context, page } = await newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  for (const id of ['about', 'projects', 'skills', 'education', 'contact']) {
    await page.click(`.site-nav a[href="/#${id}"]`);
    await page.waitForTimeout(900);
    const top = await page.evaluate((i) => document.getElementById(i)?.getBoundingClientRect().top ?? 9999, id);
    record('Navigation', `Header link → #${id}`, Math.abs(top) < 140, `section top at ${Math.round(top)}px`);
  }
  // Dari halaman studi kasus kembali ke bagian di beranda
  await page.goto(BASE + '/projects/dellearn', { waitUntil: 'networkidle' });
  await page.click('.site-nav a[href="/#contact"]');
  await page.waitForTimeout(1000);
  const top = await page.evaluate(() => document.getElementById('contact')?.getBoundingClientRect().top ?? 9999);
  record('Navigation', 'Case study → header "Contact" lands on home #contact', page.url().endsWith('/#contact') && Math.abs(top) < 140, page.url());
  // Tombol studi kasus & "Proyek berikutnya"
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.click('.project-row a.btn--primary >> nth=0');
  await page.waitForURL('**/projects/roomcraft-3d');
  record('Navigation', '"Read case study" opens RoomCraft case study', true, page.url());
  await page.click('.cs-next__link');
  await page.waitForURL('**/projects/dellearn');
  record('Navigation', '"Next project" opens DelLearn', true, page.url());
  // Daftar isi studi kasus
  await page.click('.cs-toc a[href="#challenges"]');
  await page.waitForTimeout(900);
  const ctop = await page.evaluate(() => document.getElementById('challenges').getBoundingClientRect().top);
  record('Navigation', 'Case study table of contents → #challenges', Math.abs(ctop) < 140, `top ${Math.round(ctop)}px`);
  await context.close();
}

// 3. Menu mobile
{
  const { context, page } = await newPage(VIEWPORTS.mobile);
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const hiddenBefore = await page.locator('.site-nav').evaluate((n) => getComputedStyle(n).visibility);
  await page.click('.menu-toggle');
  await page.waitForTimeout(300);
  const expanded = await page.getAttribute('.menu-toggle', 'aria-expanded');
  await page.click('.site-nav a[href="/#skills"]');
  await page.waitForTimeout(900);
  const closed = await page.getAttribute('.menu-toggle', 'aria-expanded');
  record('Navigation', 'Mobile menu opens, navigates and closes', hiddenBefore === 'hidden' && expanded === 'true' && closed === 'false', `before=${hiddenBefore} open=${expanded} after=${closed}`);
  await context.close();
}

// 4. Pengalih bahasa (beranda + studi kasus + persistensi)
{
  const { context, page } = await newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const enHero = await page.textContent('.hero__role');
  const enTitle = await page.title();
  record('Language', 'Default language is English', (await page.getAttribute('html', 'lang')) === 'en' && /UI\/UX/.test(enHero), `lang=${await page.getAttribute('html', 'lang')}`);

  await page.click('.lang-switch__btn[lang="id"]');
  await page.waitForTimeout(300);
  const checks = {
    'html lang': (await page.getAttribute('html', 'lang')) === 'id',
    nav: (await page.textContent('.site-nav')).includes('Tentang') && (await page.textContent('.site-nav')).includes('Keterampilan'),
    'hero buttons': (await page.textContent('.hero__actions')).includes('Lihat proyek') && (await page.textContent('.hero__actions')).includes('Unduh PDF'),
    'about summary': (await page.textContent('.about__lead')).startsWith('Mahasiswa tingkat akhir'),
    'project summary': (await page.textContent('.project-list')).includes('Desainer kamar tidur 3D'),
    'status label': (await page.textContent('.project-list')).includes('Dalam pengembangan'),
    footer: (await page.textContent('.site-footer')).includes('Kembali ke atas'),
    'meta description': (await page.getAttribute('meta[name="description"]', 'content')).includes('Portofolio'),
  };
  for (const [k, ok] of Object.entries(checks)) record('Language', `ID on home: ${k}`, ok);

  // Teks Inggris yang tidak boleh tersisa saat mode ID (label UI)
  const body = await page.textContent('main');
  const leftovers = ['View projects', 'Read case study', 'Featured projects', 'Focus areas', 'Copy email', 'Open to roles'].filter((s) => body.includes(s));
  record('Language', 'ID on home: no English UI labels left', leftovers.length === 0, leftovers.join(', ') || 'none');

  await page.click('.project-row a.btn--primary >> nth=1');
  await page.waitForURL('**/projects/dellearn');
  const cs = await page.textContent('main');
  const csChecks = {
    'section titles': ['Gambaran proyek', 'Masalah', 'Tujuan', 'Target pengguna', 'Peran saya', 'Pendekatan', 'Implementasi', 'Fitur', 'Teknologi', 'Tantangan', 'Hasil', 'Status saat ini', 'Pengembangan berikutnya', 'Galeri visual'].every((s) => cs.includes(s)),
    content: cs.includes('Proyek akademik') && cs.includes('Admin, pengajar, dan peserta'),
    'feature status': cs.includes('Sudah dibuat & terverifikasi') && cs.includes('Dikonfirmasi di catatan proyek'),
    'gallery captions': cs.includes('Tampilan ponsel') && cs.includes('Rekap nilai'),
  };
  for (const [k, ok] of Object.entries(csChecks)) record('Language', `ID on case study: ${k}`, ok);
  const csLeft = ['Project overview', 'Target users', 'Future improvements', 'Implemented & verified', 'Tested on the demo', 'Next project'].filter((s) => cs.includes(s));
  record('Language', 'ID on case study: no English labels left', csLeft.length === 0, csLeft.join(', ') || 'none');

  await page.reload({ waitUntil: 'networkidle' });
  record('Language', 'Choice persists after reload', (await page.getAttribute('html', 'lang')) === 'id', await page.title());
  await page.click('.lang-switch__btn[lang="en"]');
  record('Language', 'Switch back to English', (await page.getAttribute('html', 'lang')) === 'en' && (await page.textContent('main')).includes('Project overview'), enTitle);
  await context.close();

  const { context: c2, page: p2 } = await newPage();
  await p2.goto(BASE + '/?lang=id', { waitUntil: 'networkidle' });
  record('Language', '?lang=id URL parameter opens Indonesian', (await p2.getAttribute('html', 'lang')) === 'id');
  await c2.close();
}

// 5. Lightbox galeri (klik, panah, Esc)
{
  const { context, page } = await newPage();
  await page.goto(BASE + '/projects/roomcraft-3d', { waitUntil: 'networkidle' });
  await page.click('.gallery__thumb >> nth=0');
  await page.waitForTimeout(300);
  const open = await page.evaluate(() => document.querySelector('dialog.lightbox')?.open);
  const first = await page.textContent('.lightbox__caption');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(200);
  const second = await page.textContent('.lightbox__caption');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const closed = await page.evaluate(() => !document.querySelector('dialog.lightbox')?.open);
  const focusBack = await page.evaluate(() => document.activeElement?.classList.contains('gallery__thumb'));
  record('Gallery', 'Lightbox opens, arrow keys move, Esc closes, focus returns', open && first !== second && closed && focusBack, `${first} → ${second}`);
  await context.close();
}

// 6. Tautan: rute internal & tautan eksternal
{
  const { context, page } = await newPage();
  const internal = new Set();
  const external = new Set();
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
    for (const h of hrefs) {
      if (h.startsWith('mailto:')) continue;
      if (h.startsWith(BASE)) internal.add(h.split('#')[0]);
      else external.add(h);
    }
  }
  for (const url of internal) {
    await page.goto(url, { waitUntil: 'networkidle' });
    const notFound = (await page.locator('.not-found').count()) > 0;
    record('Links', `Internal ${url.replace(BASE, '') || '/'}`, !notFound);
  }
  const mail = await page.goto(BASE + '/', { waitUntil: 'networkidle' }).then(() => page.$$eval('a[href^="mailto:"]', (as) => [...new Set(as.map((a) => a.href))]));
  record('Links', 'mailto links point to the confirmed email', mail.length === 1 && mail[0] === 'mailto:adelafisya@gmail.com', mail.join(', '));

  // Tautan target=_blank wajib rel="noopener"
  const unsafe = await page.$$eval('a[target="_blank"]', (as) => as.filter((a) => !a.rel.includes('noopener')).length);
  record('Links', 'All external links use rel="noopener"', unsafe === 0, `${unsafe} without noopener`);

  if (CHECK_EXTERNAL) {
    for (const url of external) {
      let status;
      try {
        const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) });
        status = res.status;
      } catch (e) {
        // Gagal terhubung (bukan status HTTP) → tidak bisa diuji dari jaringan ini.
        record('Links', `External ${url}`, 'skip', `network: ${e.cause?.code ?? e.name} — check manually`);
        continue;
      }
      if (url.includes('linkedin.com') && status === 999) {
        // LinkedIn menolak klien otomatis dengan kode 999; tautannya sendiri tidak bisa dipastikan.
        record('Links', `External ${url}`, 'skip', 'LinkedIn blocks automated requests (999) — check manually');
        continue;
      }
      record('Links', `External ${url}`, status === 200, `status ${status}`);
    }
  }
  await context.close();
}

// 7. Halaman 404
{
  const { context, page } = await newPage();
  await page.goto(BASE + '/projects/tidak-ada', { waitUntil: 'networkidle' });
  record('Routing', 'Unknown project shows 404 page', (await page.locator('.not-found').count()) === 1, await page.title());
  await context.close();
}

// 8. Unduh PDF dari tombol (EN & ID)
for (const lang of ['en', 'id']) {
  const { context, page, errors } = await newPage(VIEWPORTS.desktop);
  await page.goto(`${BASE}/?lang=${lang}`, { waitUntil: 'networkidle' });
  const started = Date.now();
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 120000 }),
    page.click('.hero__actions [data-testid="download-pdf"]'),
  ]);
  const file = `${OUT}${download.suggestedFilename()}`;
  await download.saveAs(file);
  const buf = await readFile(file);
  const head = buf.subarray(0, 5).toString();
  const pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  const uris = (buf.toString('latin1').match(/\/URI\s*\(/g) ?? []).length;
  record('PDF', `${lang.toUpperCase()}: button downloads a PDF file`, head === '%PDF-' && buf.length > 50_000,
    `${download.suggestedFilename()} · ${(buf.length / 1024).toFixed(0)} KB · ${((Date.now() - started) / 1000).toFixed(1)} s`);
  record('PDF', `${lang.toUpperCase()}: 12 A4 pages`, pages === 12, `${pages} pages`);
  record('PDF', `${lang.toUpperCase()}: clickable links`, uris >= 10, `${uris} link annotations`);
  record('PDF', `${lang.toUpperCase()}: no errors while generating`, errors.length === 0, errors.join(' | ') || 'none');
  await context.close();
}

await browser.close();

const failed = results.filter((r) => r.result === 'FAIL');
await writeFile(`${OUT}results.json`, JSON.stringify({ base: BASE, date: new Date().toISOString(), results }, null, 2));
console.table(results);
const skipped = results.filter((r) => r.result === 'SKIP');
console.log(`\nPASS ${results.length - failed.length - skipped.length} · FAIL ${failed.length} · SKIP ${skipped.length} (total ${results.length})`);
if (skipped.length) console.log('Skipped:\n' + skipped.map((f) => ` - ${f.check}: ${f.detail}`).join('\n'));
if (failed.length) {
  console.log('Failed:\n' + failed.map((f) => ` - [${f.area}] ${f.check}: ${f.detail}`).join('\n'));
  process.exitCode = 1;
}
