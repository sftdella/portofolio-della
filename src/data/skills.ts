import type { SkillGroup } from './types';

/**
 * Keterampilan yang dikonfirmasi pemilik. Tanpa persentase/level.
 * `usedIn` hanya diisi bila pemakaiannya terbukti di source code proyek unggulan
 * (slug proyek dari src/data/projects.ts).
 */
export const skills: SkillGroup[] = [
  {
    title: { en: 'Front-end', id: 'Front-end' },
    items: [
      { name: 'HTML & CSS', usedIn: ['roomcraft-3d', 'dellearn'] },
      { name: 'JavaScript', usedIn: ['roomcraft-3d', 'dellearn'] },
      { name: 'React' },
    ],
  },
  {
    title: { en: 'Back-end & database', id: 'Back-end & database' },
    items: [{ name: 'PHP' }, { name: 'Java' }, { name: 'Node.js' }, { name: 'MySQL' }, { name: 'SQLite', usedIn: ['skin-time'] }],
  },
  {
    title: { en: 'Mobile (Android)', id: 'Mobile (Android)' },
    items: [
      { name: 'Kotlin', usedIn: ['skin-time'] },
      { name: 'Jetpack Compose', usedIn: ['skin-time'] },
    ],
  },
  {
    title: { en: 'UI/UX design', id: 'Desain UI/UX' },
    items: [{ name: 'Figma', usedIn: ['dellearn'] }],
  },
  {
    title: { en: '3D on the web', id: '3D di web' },
    items: [{ name: 'Three.js', usedIn: ['roomcraft-3d'] }],
  },
  {
    title: { en: 'Tools', id: 'Tools' },
    items: [
      { name: 'VS Code' },
      { name: 'Git & GitHub', usedIn: ['roomcraft-3d', 'dellearn'] },
      { name: 'Vercel', usedIn: ['roomcraft-3d', 'dellearn'] },
    ],
  },
];
