import { Link } from 'react-router-dom';
import { getProject } from '../../data/projects';
import { skills } from '../../data/skills';
import { useLanguage } from '../../i18n/LanguageContext';
import { strings } from '../../i18n/strings';
import { SectionHeading } from './SectionHeading';

export function Skills({ index }: { index: string }) {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading index={index} label={t(strings.sections.skills)} id="skills-title">
          {t(strings.skills.intro)}
        </SectionHeading>

        <div className="skills__grid">
          {skills.map((group) => (
            <section key={group.title.en} className="skill-group reveal" aria-label={t(group.title)}>
              <h3 className="skill-group__title">{t(group.title)}</h3>
              <ul role="list" className="skill-group__list">
                {group.items.map((item) => (
                  <li key={item.name} className="skill">
                    <span className="skill__name">{item.name}</span>
                    {item.usedIn && (
                      <span className="skill__used">
                        {t(strings.skills.usedIn)}{' '}
                        {item.usedIn.map((slug, i) => {
                          const p = getProject(slug);
                          return p ? (
                            <span key={slug}>
                              {i > 0 && ', '}
                              <Link to={`/projects/${slug}`}>{p.name}</Link>
                            </span>
                          ) : null;
                        })}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
