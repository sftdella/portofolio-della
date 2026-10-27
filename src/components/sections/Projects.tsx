import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';
import { strings } from '../../i18n/strings';
import { Icon } from '../Icon';
import { Picture } from '../Picture';
import { ProjectLinks } from '../ProjectLinks';
import { SectionHeading } from './SectionHeading';

export function Projects({ index }: { index: string }) {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading index={index} label={t(strings.sections.projects)} id="projects-title">
          {t(strings.projects.intro)}
        </SectionHeading>

        <ol role="list" className="project-list">
          {projects.map((p, i) => (
            <li key={p.slug} className={`project-row reveal${i % 2 ? ' project-row--flip' : ''}`}>
              <Link to={`/projects/${p.slug}`} className="project-row__media" tabIndex={-1} aria-hidden="true">
                <Picture shot={p.cover} sizes="(min-width: 960px) 58vw, 92vw" />
              </Link>

              <div className="project-row__body">
                <p className="project-row__meta">
                  <span className="serif project-row__num">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    {t(p.kind)} · {p.period}
                  </span>
                </p>
                <h3 className="project-row__title">
                  <Link to={`/projects/${p.slug}`}>{p.name}</Link>
                </h3>
                <p className="project-row__subtitle">{t(p.subtitle)}</p>
                <span className={`status-pill status-pill--${p.status.tone}`}>{t(p.status.label)}</span>
                <p className="project-row__summary">{t(p.summary)}</p>

                <p className="project-row__label">{t(strings.projects.tech)}</p>
                <ul role="list" className="chips">
                  {p.tech.map((tech) => (
                    <li key={tech.name} className="chip">
                      {tech.name}
                    </li>
                  ))}
                </ul>

                <div className="project-row__actions">
                  <Link to={`/projects/${p.slug}`} className="btn btn--primary">
                    {t(strings.projects.caseStudy)} <Icon name="arrowRight" />
                  </Link>
                  <ProjectLinks project={p} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
