import { Document, Font, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { ReactNode } from 'react';

import jakarta400 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff?url';
import jakarta500 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-500-normal.woff?url';
import jakarta600 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff?url';
import jakarta700 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff?url';
import jakarta800 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff?url';
import serif400 from '@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff?url';
import serif400i from '@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff?url';

import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import type { FeatureGroup, L, Lang, Project, Shot } from '../data/types';
import { strings } from '../i18n/strings';

/* ------------------------------------------------------------------ */
/* Font & token — sama dengan website (src/styles/tokens.css)          */
/* ------------------------------------------------------------------ */
Font.register({
  family: 'Jakarta',
  fonts: [
    { src: jakarta400, fontWeight: 400 },
    { src: jakarta500, fontWeight: 500 },
    { src: jakarta600, fontWeight: 600 },
    { src: jakarta700, fontWeight: 700 },
    { src: jakarta800, fontWeight: 800 },
  ],
});
Font.register({
  family: 'Serif',
  fonts: [
    { src: serif400, fontWeight: 400 },
    { src: serif400i, fontWeight: 400, fontStyle: 'italic' },
  ],
});
// Matikan pemenggalan kata otomatis agar kata tidak terpotong aneh.
Font.registerHyphenationCallback((word) => [word]);

const C = {
  paper: '#faf7f2',
  raised: '#fffdf9',
  sand: '#f0e8dc',
  sandDeep: '#e4d7c4',
  line: '#e2d8ca',
  ink: '#26231f',
  inkSoft: '#4d4741',
  muted: '#6b6259',
  charcoal: '#2a2724',
  inverse: '#f6f1e9',
  inverseSoft: '#c9c0b4',
  wood: '#8b5a3c',
  woodDeep: '#6d4430',
  woodLight: '#c49a74',
  woodWash: '#f3e6d8',
  verified: '#35664a',
  verifiedBg: '#e3ede4',
  needs: '#8a5810',
  needsBg: '#f6e9d1',
  dev: '#3c5671',
  devBg: '#e2e9f0',
  planned: '#5c5752',
  plannedBg: '#ebe7e2',
};

const STATUS_COLORS: Record<FeatureGroup['status'], [string, string]> = {
  verified: [C.verified, C.verifiedBg],
  'needs-verification': [C.needs, C.needsBg],
  'in-development': [C.dev, C.devBg],
  planned: [C.planned, C.plannedBg],
};

const M = 44; // margin halaman (pt)

const s = StyleSheet.create({
  page: { backgroundColor: C.paper, color: C.ink, fontFamily: 'Jakarta', fontSize: 9.5, lineHeight: 1.5, paddingTop: M, paddingBottom: M + 18, paddingHorizontal: M },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 18, borderBottomWidth: 0.75, borderBottomColor: C.line },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerText: { fontSize: 7.5, fontWeight: 600, color: C.muted, letterSpacing: 1.2, textTransform: 'uppercase' },
  footer: { position: 'absolute', bottom: M - 12, left: M, right: M, flexDirection: 'row', justifyContent: 'space-between', fontSize: 7.5, color: C.muted },
  eyebrow: { fontSize: 7.5, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', color: C.muted, marginBottom: 6 },
  num: { fontFamily: 'Serif', fontSize: 15, color: C.wood },
  h1: { fontSize: 30, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1 },
  h2: { fontSize: 15, fontWeight: 700, letterSpacing: -0.3, marginBottom: 6, lineHeight: 1.25 },
  h3: { fontSize: 10.5, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 },
  subtitle: { fontFamily: 'Serif', fontStyle: 'italic', fontSize: 16, color: C.inkSoft, marginTop: 2 },
  lead: { fontSize: 11.5, lineHeight: 1.55, color: C.ink },
  body: { color: C.inkSoft },
  small: { fontSize: 8, color: C.muted },
  row: { flexDirection: 'row' },
  bullet: { flexDirection: 'row', gap: 7, marginBottom: 3.5 },
  dash: { width: 8, height: 0.75, backgroundColor: C.wood, marginTop: 6.5 },
  block: { marginBottom: 14 },
  chip: { fontSize: 7.5, fontWeight: 500, color: C.inkSoft, borderWidth: 0.75, borderColor: C.line, borderRadius: 10, paddingVertical: 2, paddingHorizontal: 7, backgroundColor: C.raised },
  pill: { fontSize: 7.5, fontWeight: 700, borderRadius: 10, paddingVertical: 2.5, paddingHorizontal: 8, alignSelf: 'flex-start' },
  link: { color: C.woodDeep, textDecoration: 'none' },
  img: { borderRadius: 5, objectFit: 'cover' },
  note: { fontSize: 8, color: C.inkSoft, backgroundColor: C.woodWash, borderLeftWidth: 2, borderLeftColor: C.woodLight, paddingVertical: 5, paddingHorizontal: 9, marginBottom: 9 },
});

/* ------------------------------------------------------------------ */
/* Teks khusus PDF                                                    */
/* ------------------------------------------------------------------ */
const P = {
  portfolio: { en: 'Portfolio', id: 'Portofolio' },
  profile: { en: 'Professional profile', id: 'Profil profesional' },
  overview: { en: 'Projects overview', id: 'Ringkasan proyek' },
  caseStudy: { en: 'Case study', id: 'Studi kasus' },
  showcase: { en: 'Visual showcase', id: 'Galeri visual' },
  implementation: { en: 'Technology & implementation', id: 'Teknologi & implementasi' },
  process: { en: 'Technology & development process', id: 'Teknologi & proses pengembangan' },
  featuresResults: { en: 'Features & results', id: 'Fitur & hasil' },
  contact: { en: 'Contact & project links', id: 'Kontak & tautan proyek' },
  page: { en: 'Page', id: 'Halaman' },
  of: { en: 'of', id: 'dari' },
  demo: { en: 'Live demo', id: 'Demo online' },
  repo: { en: 'Repository', id: 'Repositori' },
  website: { en: 'Generated from the Deyla Studio portfolio website', id: 'Dibuat dari website portofolio Deyla Studio' },
  screenshots: { en: 'Actual screenshots captured from the public demo.', id: 'Screenshot asli yang diambil dari demo publik.' },
  noDemo: { en: 'No web demo (Android app)', id: 'Tanpa demo web (aplikasi Android)' },
  links: { en: 'Project links', id: 'Tautan proyek' },
} satisfies Record<string, L>;

/** Ganti karakter yang tidak ada di subset font Latin. */
const clean = (text: string) => text.replaceAll('→', '›');

/* ------------------------------------------------------------------ */
/* Komponen kecil                                                     */
/* ------------------------------------------------------------------ */
/** Monogram "DS" — kotak dengan teks di tengah. */
function Mark({ size = 16, bg = C.charcoal, fg = C.inverse, accent = C.woodLight }: { size?: number; bg?: string; fg?: string; accent?: string }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size * 0.26, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Serif', fontSize: size * 0.56, lineHeight: 1, color: fg }}>
        D<Text style={{ fontStyle: 'italic', color: accent }}>S</Text>
      </Text>
    </View>
  );
}

interface Ctx {
  lang: Lang;
  t: (x: L) => string;
  img: (shot: Pick<Shot, 'src'>) => string;
  date: string;
}

function Frame({ ctx, section, children }: { ctx: Ctx; section: string; children: ReactNode }) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header} fixed>
        <View style={s.headerLeft}>
          <Mark />
          <Text style={s.headerText}>{profile.brand}</Text>
        </View>
        <Text style={s.headerText}>{section}</Text>
      </View>
      {children}
      <View style={s.footer} fixed>
        <Text>
          {profile.displayName} · {ctx.t(profile.headline)}
        </Text>
        <Text render={({ pageNumber, totalPages }) => `${ctx.t(P.page)} ${pageNumber} ${ctx.t(P.of)} ${totalPages}`} />
      </View>
    </Page>
  );
}

function Bullets({ items, size = 9.5 }: { items: string[]; size?: number }) {
  return (
    <View>
      {items.map((i) => (
        <View key={i} style={s.bullet} wrap={false}>
          <View style={s.dash} />
          <Text style={[s.body, { flex: 1, fontSize: size }]}>{clean(i)}</Text>
        </View>
      ))}
    </View>
  );
}

function Section({ n, title, children }: { n?: string; title: string; children: ReactNode }) {
  return (
    <View style={s.block}>
      <View style={[s.row, { alignItems: 'baseline', gap: 6, marginBottom: 5 }]}>
        {n && <Text style={[s.num, { fontSize: 11 }]}>{n}</Text>}
        <Text style={s.h3}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

/** Titik status digambar sebagai View (karakter ● tidak ada di subset font). */
function Dot({ color, filled = true, size = 5 }: { color: string; filled?: boolean; size?: number }) {
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 0.9, borderColor: color, backgroundColor: filled ? color : 'transparent' }}
    />
  );
}

function Pill({ tone, label }: { tone: Project['status']['tone']; label: string }) {
  const [fg, bg] = { live: [C.verified, C.verifiedBg], progress: [C.needs, C.needsBg], source: [C.dev, C.devBg] }[tone];
  return (
    <View style={[s.row, { alignItems: 'center', gap: 5, alignSelf: 'flex-start', backgroundColor: bg, borderRadius: 10, paddingVertical: 2.5, paddingHorizontal: 8 }]}>
      <Dot color={fg} />
      <Text style={{ color: fg, fontSize: 7.5, fontWeight: 700 }}>{label}</Text>
    </View>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <View style={[s.row, { flexWrap: 'wrap', gap: 4 }]}>
      {items.map((i) => (
        <Text key={i} style={s.chip}>
          {i}
        </Text>
      ))}
    </View>
  );
}

function ProjectTitle({ ctx, p, kicker }: { ctx: Ctx; p: Project; kicker: string }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={s.eyebrow}>{kicker}</Text>
      <Text style={s.h1}>{p.name}</Text>
      <Text style={s.subtitle}>{ctx.t(p.subtitle)}</Text>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Halaman                                                            */
/* ------------------------------------------------------------------ */
function Cover({ ctx }: { ctx: Ctx }) {
  const [roomcraft] = projects;
  return (
    <Page size="A4" style={{ backgroundColor: C.sand, fontFamily: 'Jakarta', color: C.ink, padding: M }}>
      <View style={[s.row, { justifyContent: 'space-between', alignItems: 'center' }]}>
        <View style={[s.row, { alignItems: 'center', gap: 8 }]}>
          <Mark size={26} />
          <Text style={{ fontSize: 11, fontWeight: 700 }}>{profile.brand}</Text>
        </View>
        <Text style={s.headerText}>
          {ctx.t(P.portfolio)} · {ctx.date}
        </Text>
      </View>

      <View style={[s.row, { marginTop: 56, gap: 24, alignItems: 'flex-end' }]}>
        <View style={{ flex: 1 }}>
          <Text style={s.eyebrow}>{ctx.t(P.portfolio)}</Text>
          <Text style={{ fontSize: 48, fontWeight: 800, letterSpacing: -2, lineHeight: 1.02 }}>{profile.displayName}</Text>
          <Text style={{ fontSize: 10, color: C.muted, marginTop: 8 }}>{profile.fullName}</Text>
          <Text style={{ fontSize: 14, fontWeight: 600, color: C.woodDeep, marginTop: 14 }}>{ctx.t(profile.headline)}</Text>
          <Text style={{ fontFamily: 'Serif', fontStyle: 'italic', fontSize: 24, marginTop: 6, lineHeight: 1.15 }}>{ctx.t(profile.tagline)}</Text>
        </View>
        <Image src={ctx.img({ src: '/images/profile/della-square' })} style={{ width: 118, height: 118, borderRadius: 8, objectFit: 'cover' }} />
      </View>

      <View style={{ marginTop: 30, height: 400, borderRadius: 10, overflow: 'hidden', backgroundColor: '#e9e0d2' }}>
        <Image src={ctx.img(roomcraft.cover)} style={{ width: '100%', height: 400, objectFit: 'cover', objectPosition: '50% 60%' }} />
      </View>
      <Text style={[s.small, { marginTop: 6 }]}>
        {roomcraft.name} — {ctx.t(roomcraft.cover.caption)}
      </Text>

      <View style={[s.row, { justifyContent: 'space-between', marginTop: 'auto', paddingTop: 12, borderTopWidth: 0.75, borderTopColor: C.sandDeep, fontSize: 9 }]}>
        <Link src={`mailto:${profile.contact.email}`} style={s.link}>
          {profile.contact.email}
        </Link>
        <Link src={profile.contact.github.url} style={s.link}>
          {profile.contact.github.label}
        </Link>
        <Link src={profile.contact.linkedin.url} style={s.link}>
          {profile.contact.linkedin.label}
        </Link>
      </View>
    </Page>
  );
}

function ProfilePage({ ctx }: { ctx: Ctx }) {
  const edu = profile.education[0];
  return (
    <Frame ctx={ctx} section={ctx.t(P.profile)}>
      <View style={[s.row, { gap: 22, marginBottom: 22 }]}>
        <Image src={ctx.img(profile.photo)} style={{ width: 132, height: 165, borderRadius: 8, objectFit: 'cover' }} />
        <View style={{ flex: 1 }}>
          <Text style={s.eyebrow}>{ctx.t(strings.sections.about)}</Text>
          <Text style={[s.h1, { fontSize: 24 }]}>{profile.fullName}</Text>
          <Text style={{ fontSize: 11, fontWeight: 600, color: C.woodDeep, marginTop: 4, marginBottom: 10 }}>{ctx.t(profile.headline)}</Text>
          <Text style={s.lead}>{ctx.t(profile.summary)}</Text>
        </View>
      </View>

      <View style={[s.row, { gap: 22 }]}>
        <View style={{ flex: 1 }}>
          <Section title={ctx.t(strings.sections.education)}>
            <Text style={{ fontWeight: 700, fontSize: 11 }}>{edu.school}</Text>
            <Text style={s.body}>{ctx.t(edu.degree)}</Text>
            <Text style={[s.small, { marginTop: 2 }]}>
              {ctx.t(edu.period)} · {ctx.t(edu.status)}
            </Text>
          </Section>
          <Section title={ctx.t(strings.about.interests)}>
            <Bullets items={profile.interests[ctx.lang]} />
          </Section>
          <Section title={ctx.t(strings.about.lookingFor)}>
            <Chips items={profile.roles} />
          </Section>
        </View>

        <View style={{ flex: 1.15 }}>
          <Section title={ctx.t(strings.sections.skills)}>
            {skills.map((g) => (
              <View key={g.title.en} style={{ marginBottom: 9, paddingTop: 6, borderTopWidth: 1, borderTopColor: C.ink }} wrap={false}>
                <Text style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 3 }}>{ctx.t(g.title)}</Text>
                <Text style={s.body}>{g.items.map((i) => i.name).join('  ·  ')}</Text>
              </View>
            ))}
            <Text style={[s.small, { marginTop: 2 }]}>{ctx.t(strings.skills.intro)}</Text>
          </Section>
        </View>
      </View>

      <View style={{ marginTop: 'auto', padding: 12, backgroundColor: C.sand, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', fontSize: 9 }}>
        <Link src={`mailto:${profile.contact.email}`} style={s.link}>
          {profile.contact.email}
        </Link>
        <Link src={profile.contact.github.url} style={s.link}>
          {profile.contact.github.label}
        </Link>
        <Link src={profile.contact.linkedin.url} style={s.link}>
          {profile.contact.linkedin.label}
        </Link>
      </View>
    </Frame>
  );
}

function OverviewPage({ ctx }: { ctx: Ctx }) {
  return (
    <Frame ctx={ctx} section={ctx.t(P.overview)}>
      <Text style={s.eyebrow}>{ctx.t(strings.sections.projects)}</Text>
      <Text style={[s.lead, { marginBottom: 14, maxWidth: 440 }]}>{ctx.t(strings.projects.intro)}</Text>
      {projects.map((p, i) => (
        <View key={p.slug} style={{ marginBottom: 12, paddingTop: 12, borderTopWidth: 0.75, borderTopColor: C.line }} wrap={false}>
          <View style={[s.row, { gap: 16 }]}>
            <View style={{ width: 200, backgroundColor: C.sand, borderRadius: 6, padding: 6 }}>
              <Image src={ctx.img(p.detailCover ?? p.gallery[0].shots[0])} style={[s.img, { width: '100%', height: 117 }]} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={[s.row, { alignItems: 'baseline', gap: 6 }]}>
                <Text style={s.num}>{String(i + 1).padStart(2, '0')}</Text>
                <Text style={s.small}>
                  {ctx.t(p.kind)} · {p.period}
                </Text>
              </View>
              <View style={[s.row, { alignItems: 'baseline', gap: 8, marginTop: 1, marginBottom: 4 }]}>
                <Text style={[s.h2, { fontSize: 16, marginBottom: 0 }]}>{p.name}</Text>
                <Text style={[s.subtitle, { fontSize: 11, marginTop: 0 }]}>{ctx.t(p.subtitle)}</Text>
              </View>
              <Pill tone={p.status.tone} label={ctx.t(p.status.label)} />
              <Text style={[s.body, { marginTop: 6, fontSize: 8.8 }]}>{ctx.t(p.summary)}</Text>
            </View>
          </View>
          <View style={{ marginTop: 7 }}>
            <Chips items={p.tech.map((x) => x.name)} />
          </View>
          <View style={[s.row, { gap: 16, marginTop: 6, fontSize: 8.5 }]}>
            {p.demoUrl && (
              <Link src={p.demoUrl} style={s.link}>
                {ctx.t(P.demo)}: {p.demoUrl.replace('https://', '')}
              </Link>
            )}
            <Link src={p.repoUrl} style={s.link}>
              GitHub: {p.repoUrl.replace('https://', '')}
            </Link>
          </View>
        </View>
      ))}
    </Frame>
  );
}

function CaseStudyPage({ ctx, p }: { ctx: Ctx; p: Project }) {
  const cs = strings.caseStudy;
  return (
    <Frame ctx={ctx} section={`${p.name} · ${ctx.t(P.caseStudy)}`}>
      <ProjectTitle ctx={ctx} p={p} kicker={`${ctx.t(P.caseStudy)} · ${ctx.t(p.kind)}`} />
      <View style={[s.row, { gap: 14, marginBottom: 16, paddingVertical: 10, borderTopWidth: 0.75, borderBottomWidth: 0.75, borderColor: C.line }]}>
        <View style={{ flex: 1 }}>
          <Text style={s.eyebrow}>{ctx.t(cs.year)}</Text>
          <Text style={{ fontWeight: 600 }}>{p.period}</Text>
        </View>
        <View style={{ flex: 1.3 }}>
          <Text style={s.eyebrow}>{ctx.t(cs.status)}</Text>
          <Pill tone={p.status.tone} label={ctx.t(p.status.label)} />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={s.eyebrow}>{ctx.t(cs.role)}</Text>
          <Text style={{ fontWeight: 600 }}>{ctx.t(p.role)}</Text>
        </View>
      </View>

      <Section n="01" title={ctx.t(cs.overview)}>
        <Text style={s.body}>{ctx.t(p.overview)}</Text>
      </Section>
      <View style={[s.row, { gap: 20 }]}>
        <View style={{ flex: 1 }}>
          <Section n="02" title={ctx.t(cs.problem)}>
            <Text style={s.body}>{ctx.t(p.problem)}</Text>
          </Section>
          <Section n="04" title={ctx.t(cs.users)}>
            <Text style={s.body}>{ctx.t(p.targetUsers)}</Text>
          </Section>
        </View>
        <View style={{ flex: 1 }}>
          <Section n="03" title={ctx.t(cs.goals)}>
            <Bullets items={p.goals[ctx.lang]} />
          </Section>
        </View>
      </View>
      <View style={[s.row, { gap: 20 }]}>
        <View style={{ flex: 1 }}>
          <Section n="05" title={ctx.t(cs.role)}>
            <Bullets items={p.roleItems[ctx.lang]} />
          </Section>
        </View>
        <View style={{ flex: 1 }}>
          <Section n="06" title={ctx.t(cs.approach)}>
            <Bullets items={p.approach[ctx.lang]} />
          </Section>
        </View>
      </View>
    </Frame>
  );
}

function ShowcasePage({ ctx, p, shots }: { ctx: Ctx; p: Project; shots: Shot[] }) {
  // Screenshot desktop: 2 kolom (16:10). Screenshot ponsel (potret): 3 kolom dengan rasio aslinya.
  const phones = shots.every((x) => x.ratio < 1);
  const W = phones ? 112 : (595 - M * 2 - 14) / 2;
  const ratio = phones ? shots[0].ratio : 1.6;
  return (
    <Frame ctx={ctx} section={`${p.name} · ${ctx.t(P.showcase)}`}>
      <Text style={s.eyebrow}>{ctx.t(P.showcase)}</Text>
      <Text style={[s.h2, { fontSize: 20 }]}>{p.name}</Text>
      <Text style={[s.small, { marginBottom: 14 }]}>{ctx.t(p.showcaseNote ?? P.screenshots)}</Text>
      <View style={[s.row, { flexWrap: 'wrap', gap: phones ? 26 : 14, justifyContent: phones ? 'center' : 'flex-start' }]}>
        {shots.map((shot) => (
          <View key={shot.src} style={{ width: W }} wrap={false}>
            <View style={{ borderWidth: 0.75, borderColor: C.line, borderRadius: phones ? 9 : 5, overflow: 'hidden' }}>
              <Image src={ctx.img(shot)} style={{ width: W - 1.5, height: (W - 1.5) / ratio, objectFit: 'cover' }} />
            </View>
            <Text style={[s.small, { marginTop: 4, color: C.inkSoft }]}>{ctx.t(shot.caption)}</Text>
          </View>
        ))}
      </View>
    </Frame>
  );
}

/** Kelompok "verified" selebar halaman; kelompok status lain (pendek) disusun berdampingan. */
function FeatureGroups({ ctx, groups }: { ctx: Ctx; groups: FeatureGroup[] }) {
  const filled = groups.filter((g) => g.items.length);
  const main = filled.filter((g) => g.status === 'verified');
  const rest = filled.filter((g) => g.status !== 'verified');
  return (
    <View>
      {main.map((g) => (
        <FeatureGroupBox key={g.status} ctx={ctx} g={g} />
      ))}
      {rest.length > 0 && (
        <View style={[s.row, { gap: 8 }]}>
          {rest.map((g) => (
            <View key={g.status} style={{ flex: 1 }}>
              <FeatureGroupBox ctx={ctx} g={g} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function FeatureGroupBox({ ctx, g }: { ctx: Ctx; g: FeatureGroup }) {
  const [fg, bg] = STATUS_COLORS[g.status];
  const twoCols = g.items.length > 6; // kelompok panjang ditampilkan dua kolom agar muat satu halaman
  return (
    <View style={{ marginBottom: 7, borderWidth: 0.75, borderColor: C.line, borderRadius: 5, backgroundColor: C.raised, flexGrow: 1 }} wrap={false}>
      <View style={[s.row, { justifyContent: 'space-between', alignItems: 'center', backgroundColor: bg, paddingVertical: 4, paddingHorizontal: 8, borderTopLeftRadius: 5, borderTopRightRadius: 5 }]}>
        <View style={[s.row, { alignItems: 'center', gap: 5 }]}>
          <Dot color={fg} size={6} />
          <Text style={{ color: fg, fontWeight: 700, fontSize: 8.5 }}>{ctx.t(strings.status[g.status])}</Text>
        </View>
        <Text style={{ color: fg, fontWeight: 600, fontSize: 8.5 }}>{g.items.length}</Text>
      </View>
      <View style={[{ paddingVertical: 5, paddingHorizontal: 8 }, twoCols ? { flexDirection: 'row', flexWrap: 'wrap', columnGap: 12 } : {}]}>
        {g.items.map((f) => (
          <View key={f.text.en} style={[s.row, { gap: 6, marginBottom: 2.5 }, twoCols ? { width: '48.5%' } : {}]}>
            <View style={{ paddingTop: 4 }}>
              <Dot color={fg} filled={g.status === 'verified'} size={4.5} />
            </View>
            <Text style={{ flex: 1, fontSize: 8.5, color: C.ink }}>
              {clean(ctx.t(f.text))}
              {f.source ? <Text style={{ color: C.muted, fontSize: 7.5 }}>{`  — ${ctx.t(f.source)}`}</Text> : null}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function StackTable({ ctx, p }: { ctx: Ctx; p: Project }) {
  return (
    <View style={{ borderTopWidth: 0.75, borderTopColor: C.line }}>
      {p.tech.map((x) => (
        <View key={x.name} style={[s.row, { paddingVertical: 4.5, borderBottomWidth: 0.75, borderBottomColor: C.line }]} wrap={false}>
          <Text style={{ width: 110, fontWeight: 700 }}>{x.name}</Text>
          <Text style={[s.body, { flex: 1 }]}>{x.detail ? ctx.t(x.detail) : ''}</Text>
        </View>
      ))}
    </View>
  );
}

function ImplementationPage({ ctx, p, title }: { ctx: Ctx; p: Project; title: string }) {
  const cs = strings.caseStudy;
  return (
    <Frame ctx={ctx} section={`${p.name} · ${title}`}>
      <Text style={s.eyebrow}>{title}</Text>
      <Text style={[s.h2, { fontSize: 20, marginBottom: 16 }]}>{p.name}</Text>
      <Section n="07" title={ctx.t(cs.implementation)}>
        <Bullets items={p.implementation[ctx.lang]} />
      </Section>
      <Section n="09" title={ctx.t(cs.stack)}>
        <StackTable ctx={ctx} p={p} />
      </Section>
      <Section n="10" title={ctx.t(cs.challenges)}>
        <Bullets items={p.challenges[ctx.lang]} />
      </Section>
    </Frame>
  );
}

function FeaturesPage({ ctx, p }: { ctx: Ctx; p: Project }) {
  const cs = strings.caseStudy;
  return (
    <Frame ctx={ctx} section={`${p.name} · ${ctx.t(P.featuresResults)}`}>
      <View style={[s.row, { alignItems: 'baseline', gap: 10, marginBottom: 12 }]}>
        <Text style={[s.h2, { fontSize: 20, marginBottom: 0 }]}>{p.name}</Text>
        <Text style={[s.eyebrow, { marginBottom: 0 }]}>{ctx.t(P.featuresResults)}</Text>
      </View>
      <Section n="08" title={ctx.t(cs.features)}>
        <Text style={s.note}>{ctx.t(p.auditNote)}</Text>
        <FeatureGroups ctx={ctx} groups={p.features} />
      </Section>
      <View style={[s.row, { gap: 16 }]}>
        <View style={{ flex: 1 }}>
          <Section n="11" title={ctx.t(cs.results)}>
            <Bullets items={p.results[ctx.lang]} size={8.5} />
          </Section>
        </View>
        <View style={{ flex: 1 }}>
          <Section n="12" title={ctx.t(cs.current)}>
            <Text style={[s.body, { fontSize: 8.5 }]}>{ctx.t(p.currentStatus)}</Text>
          </Section>
        </View>
        <View style={{ flex: 1 }}>
          <Section n="13" title={ctx.t(cs.future)}>
            <Bullets items={p.future[ctx.lang]} size={8.5} />
          </Section>
        </View>
      </View>
    </Frame>
  );
}

function ContactPage({ ctx }: { ctx: Ctx }) {
  const { email, github, linkedin } = profile.contact;
  const item = (label: string, href: string, text: string) => (
    <View style={{ paddingVertical: 9, borderBottomWidth: 0.75, borderBottomColor: '#4a4540' }}>
      <Text style={{ fontSize: 7.5, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: C.inverseSoft, marginBottom: 2 }}>{label}</Text>
      <Link src={href} style={{ color: C.inverse, textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>
        {text}
      </Link>
    </View>
  );
  return (
    <Page size="A4" style={{ backgroundColor: C.charcoal, color: C.inverse, fontFamily: 'Jakarta', padding: M, paddingBottom: M + 18 }}>
      <View style={[s.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }]}>
        <View style={[s.row, { alignItems: 'center', gap: 6 }]}>
          <Mark bg={C.paper} fg={C.charcoal} accent={C.wood} />
          <Text style={[s.headerText, { color: C.inverseSoft }]}>{profile.brand}</Text>
        </View>
        <Text style={[s.headerText, { color: C.inverseSoft }]}>{ctx.t(P.contact)}</Text>
      </View>

      <Text style={[s.eyebrow, { color: C.inverseSoft }]}>{ctx.t(strings.sections.contact)}</Text>
      <Text style={{ fontFamily: 'Serif', fontSize: 38, lineHeight: 1.08, maxWidth: 420 }}>{ctx.t(strings.contact.title)}</Text>
      <Text style={{ color: C.inverseSoft, fontSize: 10.5, marginTop: 14, maxWidth: 400, lineHeight: 1.55 }}>{ctx.t(strings.contact.body)}</Text>

      <View style={{ marginTop: 34 }}>
        {item(ctx.t(strings.contact.email), `mailto:${email}`, email)}
        {item('GitHub', github.url, github.label)}
        {item('LinkedIn', linkedin.url, linkedin.label)}
      </View>

      <Text style={[s.eyebrow, { color: C.inverseSoft, marginTop: 30 }]}>{ctx.t(P.links)}</Text>
      {projects.map((p) => (
        <View key={p.slug} style={[s.row, { paddingVertical: 7, borderBottomWidth: 0.75, borderBottomColor: '#4a4540', gap: 10 }]}>
          <Text style={{ width: 90, fontWeight: 700, fontSize: 10 }}>{p.name}</Text>
          {p.demoUrl ? (
            <Link src={p.demoUrl} style={{ color: C.woodLight, textDecoration: 'none', fontSize: 9, flex: 1 }}>
              {p.demoUrl.replace('https://', '')}
            </Link>
          ) : (
            <Text style={{ color: C.inverseSoft, fontSize: 9, flex: 1 }}>{ctx.t(P.noDemo)}</Text>
          )}
          <Link src={p.repoUrl} style={{ color: C.woodLight, textDecoration: 'none', fontSize: 9, flex: 1.2 }}>
            {p.repoUrl.replace('https://', '')}
          </Link>
        </View>
      ))}

      <View style={[s.footer, { color: C.inverseSoft }]} fixed>
        <Text>
          {ctx.t(P.website)} · {ctx.date}
        </Text>
        <Text render={({ pageNumber, totalPages }) => `${ctx.t(P.page)} ${pageNumber} ${ctx.t(P.of)} ${totalPages}`} />
      </View>
    </Page>
  );
}

/* ------------------------------------------------------------------ */
/* Dokumen                                                            */
/* ------------------------------------------------------------------ */
export function PortfolioDocument({ lang, origin }: { lang: Lang; origin: string }) {
  const ctx: Ctx = {
    lang,
    t: (x) => x[lang],
    img: (shot) => `${origin}${shot.src}.jpg`,
    date: new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { month: 'long', year: 'numeric' }),
  };
  const [roomcraft, dellearn, skinTime] = projects;
  /** 6 screenshot untuk halaman galeri: daftar `pdfShowcase` bila ada, selain itu 6 pertama di galeri. */
  const showcase = (p: Project) => {
    const all = p.gallery.flatMap((g) => g.shots);
    return p.pdfShowcase
      ? p.pdfShowcase.map((name) => all.find((x) => x.src.endsWith(`/${name}`))).filter((x): x is Shot => !!x)
      : all.slice(0, 6);
  };

  return (
    <Document
      title={`${profile.displayName} — ${ctx.t(P.portfolio)} (${profile.brand})`}
      author={profile.fullName}
      subject={ctx.t(profile.headline)}
      keywords="portfolio, UI/UX, web developer, RoomCraft 3D, DelLearn, Skin Time, Android"
      creator={profile.brand}
      producer={profile.brand}
      language={lang === 'id' ? 'id-ID' : 'en-GB'}
    >
      <Cover ctx={ctx} />
      <ProfilePage ctx={ctx} />
      <OverviewPage ctx={ctx} />
      <CaseStudyPage ctx={ctx} p={roomcraft} />
      <ShowcasePage ctx={ctx} p={roomcraft} shots={showcase(roomcraft)} />
      <ImplementationPage ctx={ctx} p={roomcraft} title={ctx.t(P.implementation)} />
      <FeaturesPage ctx={ctx} p={roomcraft} />
      <CaseStudyPage ctx={ctx} p={dellearn} />
      <ShowcasePage ctx={ctx} p={dellearn} shots={showcase(dellearn)} />
      <ImplementationPage ctx={ctx} p={dellearn} title={ctx.t(P.process)} />
      <FeaturesPage ctx={ctx} p={dellearn} />
      <CaseStudyPage ctx={ctx} p={skinTime} />
      <ShowcasePage ctx={ctx} p={skinTime} shots={showcase(skinTime)} />
      <ImplementationPage ctx={ctx} p={skinTime} title={ctx.t(P.process)} />
      <FeaturesPage ctx={ctx} p={skinTime} />
      <ContactPage ctx={ctx} />
    </Document>
  );
}
