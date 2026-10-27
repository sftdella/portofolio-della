import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FeatureStatusList } from '../components/FeatureStatusList';
import { Gallery } from '../components/Gallery';
import { Icon } from '../components/Icon';
import { Picture } from '../components/Picture';
import { ProjectLinks } from '../components/ProjectLinks';
import { getProject, projects } from '../data/projects';
import type { L } from '../data/types';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';
import { NotFoundPage } from './NotFoundPage';

const cs = strings.caseStudy;

/** Urutan bagian studi kasus — dipakai untuk isi halaman dan daftar "Di halaman ini". */
const SECTIONS: { id: string; label: L }[] = [
  { id: 'overview', label: cs.overview },
  { id: 'problem', label: cs.problem },
  { id: 'goals', label: cs.goals },
  { id: 'users', label: cs.users },
  { id: 'role', label: cs.role },
  { id: 'approach', label: cs.approach },
  { id: 'implementation', label: cs.implementation },
  { id: 'features', label: cs.features },
  { id: 'stack', label: cs.stack },
  { id: 'challenges', label: cs.challenges },
  { id: 'results', label: cs.results },
  { id: 'status', label: cs.current },
  { id: 'future', label: cs.future },
  { id: 'showcase', label: cs.showcase },
];

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="cs-block reveal" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="cs-block__title">
        <span className="serif cs-block__num">{String(n).padStart(2, '0')}</span>
        {title}
      </h2>
      <div className="cs-block__body">{children}</div>
    </section>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { t, lang } = useLanguage();
  useDocumentMeta(
    project ? `${project.name} — ${t(project.subtitle)} · Deyla Studio` : t(cs.notFound),
    project ? t(project.summary) : '',
  );

  if (!project) return <NotFoundPage />;

  const p = project;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const list = (items: string[]) => (
    <ul className="cs-list">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
  const n = (id: string) => SECTIONS.findIndex((s) => s.id === id) + 1;
  const title = (id: string) => t(SECTIONS.find((s) => s.id === id)!.label);

  return (
    <article className="case-study">
      <header className="cs-hero">
        <div className="container">
          <Link to={{ pathname: '/', hash: '#projects' }} className="cs-hero__back">
            <Icon name="arrowLeft" size={16} /> {t(cs.back)}
          </Link>
          <p className="eyebrow">{t(p.kind)}</p>
          <h1 className="cs-hero__title">{p.name}</h1>
          <p className="cs-hero__subtitle serif">{t(p.subtitle)}</p>
          <p className="cs-hero__summary">{t(p.summary)}</p>

          <dl className="cs-meta">
            <div>
              <dt>{t(cs.type)}</dt>
              <dd>{t(p.kind)}</dd>
            </div>
            <div>
              <dt>{t(cs.year)}</dt>
              <dd>{p.period}</dd>
            </div>
            <div>
              <dt>{t(cs.status)}</dt>
              <dd>
                <span className={`status-pill status-pill--${p.status.tone}`}>{t(p.status.label)}</span>
              </dd>
            </div>
            <div>
              <dt>{t(cs.role)}</dt>
              <dd>{t(p.roleShort)}</dd>
            </div>
          </dl>

          <div className="cs-hero__actions">
            <ProjectLinks project={p} />
          </div>

          <figure className="cs-hero__media">
            <Picture shot={p.gallery[0].shots[0]} sizes="(min-width: 1240px) 1200px, 96vw" eager />
          </figure>
        </div>
      </header>

      <div className="container cs-layout">
        <nav className="cs-toc" aria-label={t(cs.contents)}>
          <p className="cs-toc__title">{t(cs.contents)}</p>
          <ol role="list">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span className="serif">{String(i + 1).padStart(2, '0')}</span> {t(s.label)}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="cs-content">
          <Block id="overview" n={n('overview')} title={title('overview')}>
            <p className="cs-lead">{t(p.overview)}</p>
          </Block>
          <Block id="problem" n={n('problem')} title={title('problem')}>
            <p>{t(p.problem)}</p>
          </Block>
          <Block id="goals" n={n('goals')} title={title('goals')}>
            {list(p.goals[lang])}
          </Block>
          <Block id="users" n={n('users')} title={title('users')}>
            <p>{t(p.targetUsers)}</p>
          </Block>
          <Block id="role" n={n('role')} title={title('role')}>
            <p>{t(p.role)}</p>
            {list(p.roleItems[lang])}
          </Block>
          <Block id="approach" n={n('approach')} title={title('approach')}>
            {list(p.approach[lang])}
          </Block>
          <Block id="implementation" n={n('implementation')} title={title('implementation')}>
            {list(p.implementation[lang])}
          </Block>
          <Block id="features" n={n('features')} title={title('features')}>
            <p className="cs-note">{t(p.auditNote)}</p>
            <FeatureStatusList groups={p.features} />
          </Block>
          <Block id="stack" n={n('stack')} title={title('stack')}>
            <dl className="stack-list">
              {p.tech.map((tech) => (
                <div key={tech.name} className="stack-list__row">
                  <dt>{tech.name}</dt>
                  <dd>{tech.detail ? t(tech.detail) : ''}</dd>
                </div>
              ))}
            </dl>
          </Block>
          <Block id="challenges" n={n('challenges')} title={title('challenges')}>
            {list(p.challenges[lang])}
          </Block>
          <Block id="results" n={n('results')} title={title('results')}>
            {list(p.results[lang])}
          </Block>
          <Block id="status" n={n('status')} title={title('status')}>
            <p>
              <span className={`status-pill status-pill--${p.status.tone}`}>{t(p.status.label)}</span>
            </p>
            <p>{t(p.currentStatus)}</p>
          </Block>
          <Block id="future" n={n('future')} title={title('future')}>
            {list(p.future[lang])}
          </Block>
        </div>
      </div>

      <section id="showcase" className="cs-showcase" aria-labelledby="showcase-h">
        <div className="container">
          <h2 id="showcase-h" className="cs-block__title">
            <span className="serif cs-block__num">{String(n('showcase')).padStart(2, '0')}</span>
            {title('showcase')}
          </h2>
          <p className="cs-note">{t(cs.showcaseNote)}</p>
          <Gallery groups={p.gallery} />
        </div>
      </section>

      <nav className="cs-next" aria-label={t(cs.next)}>
        <div className="container">
          <Link to={`/projects/${next.slug}`} className="cs-next__link">
            <span className="eyebrow">{t(cs.next)}</span>
            <span className="cs-next__name">
              {next.name} <Icon name="arrowRight" size={28} />
            </span>
            <span className="muted">{t(next.subtitle)}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
