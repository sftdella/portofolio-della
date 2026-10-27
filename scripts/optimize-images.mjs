// Mengubah gambar mentah di assets-src/ menjadi aset siap pakai di public/images/.
//
// Untuk setiap screenshot dihasilkan:
//   <nama>.webp      lebar maks. 1600 px  (website, layar besar)
//   <nama>-sm.webp   lebar maks. 800 px   (website, layar kecil)
//   <nama>.jpg       lebar maks. 1600 px  (PDF — react-pdf tidak mendukung WebP)
//
// CROPS membuat potongan area 3D tanpa panel UI untuk hero dan sampul PDF.
// Koordinat dalam piksel gambar mentah (2160 × 1350, deviceScaleFactor 1.5).
//
// Jalankan: npm run images
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const SRC = path.join(root, 'assets-src');
const OUT = path.join(root, 'public', 'images');

const CROPS = [
  // [proyek, sumber, nama hasil, { left, top, width, height }]
  ['roomcraft', 'tampak-luar', 'hero-luar', { left: 430, top: 90, width: 1120, height: 1180 }],
  ['roomcraft', 'tampak-dalam', 'detail-material', { left: 420, top: 560, width: 1136, height: 710 }],
];

async function emit(input, dir, name) {
  await mkdir(dir, { recursive: true });
  const base = path.join(dir, name);
  await Promise.all([
    input.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${base}.webp`),
    input.clone().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${base}-sm.webp`),
    input.clone().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}.jpg`),
  ]);
  return name;
}

const done = [];
for (const project of ['roomcraft', 'dellearn', 'skintime']) {
  const dir = path.join(SRC, 'screenshots', project);
  for (const file of (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
    done.push(`${project}/${await emit(sharp(path.join(dir, file)), path.join(OUT, project), path.parse(file).name)}`);
  }
}

for (const [project, source, name, region] of CROPS) {
  const input = sharp(path.join(SRC, 'screenshots', project, `${source}.jpg`)).extract(region);
  done.push(`${project}/${await emit(input, path.join(OUT, project), name)}`);
}

// Sampul Skin Time (16:10): tiga screenshot ASLI dari repository aplikasi, disusun
// berdampingan di atas latar beige. Isi layar tidak diubah — hanya diperkecil & diberi sudut bulat.
{
  const W = 1600, H = 1000, phoneH = 880, phoneW = Math.round(phoneH * (1080 / 2400)), gap = 56;
  const radius = 34;
  const mask = Buffer.from(`<svg width="${phoneW}" height="${phoneH}"><rect width="${phoneW}" height="${phoneH}" rx="${radius}" ry="${radius}"/></svg>`);
  const border = Buffer.from(`<svg width="${phoneW}" height="${phoneH}"><rect x="1" y="1" width="${phoneW - 2}" height="${phoneH - 2}" rx="${radius}" ry="${radius}" fill="none" stroke="#cdbfac" stroke-width="2"/></svg>`);
  const phone = async (name) =>
    sharp(path.join(SRC, 'screenshots', 'skintime', `${name}.png`))
      .resize(phoneW, phoneH)
      .composite([{ input: mask, blend: 'dest-in' }, { input: border }])
      .png()
      .toBuffer();
  const names = ['home', 'routine-checklist', 'analytics'];
  const left = Math.round((W - (phoneW * 3 + gap * 2)) / 2);
  const layers = await Promise.all(
    names.map(async (n, i) => ({ input: await phone(n), left: left + i * (phoneW + gap), top: Math.round((H - phoneH) / 2) })),
  );
  const cover = sharp({ create: { width: W, height: H, channels: 3, background: '#f0e8dc' } }).composite(layers).png();
  done.push(`skintime/${await emit(sharp(await cover.toBuffer()), path.join(OUT, 'skintime'), 'cover')}`);
}

// Foto profil: potongan potret 4:5, ditambah versi persegi untuk sampul PDF.
const photo = path.join(SRC, 'profile', 'della.png');
await mkdir(path.join(OUT, 'profile'), { recursive: true });
await sharp(photo).resize(880, 1100, { fit: 'cover', position: 'north' }).webp({ quality: 82 }).toFile(path.join(OUT, 'profile', 'della.webp'));
await sharp(photo).resize(480, 600, { fit: 'cover', position: 'north' }).webp({ quality: 80 }).toFile(path.join(OUT, 'profile', 'della-sm.webp'));
await sharp(photo).resize(880, 1100, { fit: 'cover', position: 'north' }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, 'profile', 'della.jpg'));
await sharp(photo).extract({ left: 143, top: 300, width: 800, height: 800 }).resize(600, 600).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, 'profile', 'della-square.jpg'));
done.push('profile/della(.webp|-sm.webp|.jpg|-square.jpg)');

// Gambar Open Graph untuk pratinjau tautan (1200 × 630).
await sharp(path.join(SRC, 'screenshots', 'roomcraft', 'tampak-luar.jpg'))
  .extract({ left: 380, top: 180, width: 1240, height: 651 })
  .resize(1200, 630)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, 'og-image.jpg'));
done.push('og-image.jpg');

console.log(`${done.length} aset dibuat:\n  ${done.join('\n  ')}`);
