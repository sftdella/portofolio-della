export type Lang = 'en' | 'id';

/** Teks dwibahasa. Setiap teks yang tampil di website/PDF wajib punya kedua bahasa. */
export type L = Record<Lang, string>;
export type LList = Record<Lang, string[]>;

/**
 * Status fitur hasil audit:
 * - verified: diuji langsung di demo publik, atau dikonfirmasi pemilik di catatan proyek (lihat `source`)
 * - needs-verification: kodenya ada, tetapi hasil kerjanya belum terbukti dalam pengujian
 * - in-development: sedang dikerjakan / belum dipublikasikan
 * - planned: direncanakan, belum dikerjakan
 */
export type FeatureStatus = 'verified' | 'needs-verification' | 'in-development' | 'planned';

export interface Feature {
  text: L;
  /** Asal bukti, mis. "diuji di demo" atau "dikonfirmasi di PROGRESS.md". */
  source?: L;
}

export interface FeatureGroup {
  status: FeatureStatus;
  items: Feature[];
}

/** Path gambar tanpa ekstensi, mis. "/images/roomcraft/tampak-luar".
 *  Website memakai `.webp` dan `-sm.webp`, PDF memakai `.jpg` (dibuat oleh `npm run images`). */
export interface Shot {
  src: string;
  alt: L;
  caption: L;
  /** Rasio lebar/tinggi gambar, untuk mencegah layout bergeser saat dimuat. */
  ratio: number;
}

export interface TechItem {
  name: string;
  detail?: L;
}

export interface Project {
  slug: string;
  name: string;
  subtitle: L;
  kind: L;
  period: string;
  status: { tone: 'live' | 'progress'; label: L };
  summary: L;
  demoUrl: string;
  repoUrl: string;
  cover: Shot;
  /** Gambar tambahan di kartu proyek (opsional). */
  coverAlt?: Shot;
  tech: TechItem[];
  overview: L;
  problem: L;
  goals: LList;
  targetUsers: L;
  role: L;
  /** Ringkasan peran untuk baris meta (beberapa kata). */
  roleShort: L;
  roleItems: LList;
  approach: LList;
  implementation: LList;
  features: FeatureGroup[];
  challenges: LList;
  results: LList;
  currentStatus: L;
  future: LList;
  /** Bagaimana isi studi kasus ini diverifikasi. */
  auditNote: L;
  gallery: { title: L; shots: Shot[] }[];
}

export interface SkillGroup {
  title: L;
  items: { name: string; usedIn?: string[] }[];
}
