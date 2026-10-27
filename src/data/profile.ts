import type { L, LList } from './types';

/**
 * Data profil. Semua isi di sini sudah dikonfirmasi pemilik.
 * Bagian yang sengaja dikosongkan (disembunyikan dari website & PDF):
 *   - experience: riwayat magang tidak ditampilkan (permintaan pemilik)
 *   - certifications: belum ada data
 *   - gpa, whatsapp, freelance: tidak ingin ditampilkan / belum ada
 * Isi array/field tersebut untuk memunculkan bagiannya kembali.
 */
export const profile = {
  brand: 'Deyla Studio',
  fullName: 'Seftia Della Fiisyatir Rodhiah',
  displayName: 'Della Rodhiah',
  photo: {
    src: '/images/profile/della',
    alt: {
      en: 'Portrait of Della Rodhiah wearing a cream hijab and a black blazer',
      id: 'Potret Della Rodhiah mengenakan hijab krem dan blazer hitam',
    } satisfies L,
  },
  headline: {
    en: 'UI/UX Designer & Web Developer',
    id: 'UI/UX Designer & Web Developer',
  } satisfies L,
  tagline: {
    en: 'Designing ideas. Building experiences.',
    id: 'Designing ideas. Building experiences.',
  } satisfies L,
  roles: ['Frontend Developer', 'Web Developer', 'UI/UX Designer', '3D / Creative Web Developer'],
  summary: {
    en: 'Final-year Informatics Engineering student at Universitas Pamulang who designs and builds for the web — from interface layouts in Figma to interactive 3D experiences in the browser with Three.js. I focus on clear interfaces, careful details, and being upfront about what a product can and can’t do yet.',
    id: 'Mahasiswa tingkat akhir Teknik Informatika di Universitas Pamulang yang merancang dan membangun untuk web — mulai dari tata letak antarmuka di Figma hingga pengalaman 3D interaktif di browser dengan Three.js. Saya fokus pada antarmuka yang jelas, detail yang rapi, dan keterbukaan tentang apa yang sudah dan belum bisa dilakukan sebuah produk.',
  } satisfies L,
  interests: {
    en: ['Interface & UX design', 'Front-end web development', 'Interactive 3D on the web'],
    id: ['Desain antarmuka & UX', 'Pengembangan front-end web', '3D interaktif di web'],
  } satisfies LList,
  education: [
    {
      school: 'Universitas Pamulang',
      degree: {
        en: 'Bachelor’s degree (S1), Informatics Engineering',
        id: 'S1 Teknik Informatika',
      } satisfies L,
      period: { en: '2022 – Expected 2027', id: '2022 – Perkiraan lulus 2027' } satisfies L,
      status: { en: 'Final year — thesis in progress', id: 'Tingkat akhir — sedang mengerjakan tugas akhir' } satisfies L,
    },
  ],
  experience: [] as { title: L; org: string; period: L; points: LList }[],
  certifications: [] as { name: string; issuer: string; year: string; kind: 'competency' | 'participation' }[],
  contact: {
    email: 'adelafisya@gmail.com',
    github: { label: 'github.com/sftdella', url: 'https://github.com/sftdella' },
    linkedin: { label: 'linkedin.com/in/sftdella', url: 'https://www.linkedin.com/in/sftdella' },
  },
};
