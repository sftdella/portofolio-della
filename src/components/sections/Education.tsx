import { profile } from '../../data/profile';
import { useLanguage } from '../../i18n/LanguageContext';
import { strings } from '../../i18n/strings';
import { SectionHeading } from './SectionHeading';

/** Pendidikan, ditambah Pengalaman & Sertifikasi bila datanya diisi di src/data/profile.ts. */
export function Education({ index }: { index: string }) {
  const { t, lang } = useLanguage();
  const hasExperience = profile.experience.length > 0;
  const hasCerts = profile.certifications.length > 0;

  return (
    <section id="education" className="section education" aria-label={t(strings.sections.education)}>
      <div className="container">
        <SectionHeading index={index} label={t(strings.sections.education)} id="education-title" />

        <div className="timeline">
          {profile.education.map((e) => (
            <article key={e.school} className="timeline__item reveal">
              <p className="timeline__period">{t(e.period)}</p>
              <div>
                <h3 className="timeline__title">
                  {e.school}
                </h3>
                <p className="timeline__sub">{t(e.degree)}</p>
                <p className="muted">{t(e.status)}</p>
              </div>
            </article>
          ))}
        </div>

        {hasExperience && (
          <>
            <h3 className="subsection-title">{t(strings.sections.experience)}</h3>
            <div className="timeline">
              {profile.experience.map((x) => (
                <article key={x.org + x.period.en} className="timeline__item reveal">
                  <p className="timeline__period">{t(x.period)}</p>
                  <div>
                    <h4 className="timeline__title">{t(x.title)}</h4>
                    <p className="timeline__sub">{x.org}</p>
                    <ul>
                      {x.points[lang].map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {hasCerts && (
          <>
            <h3 className="subsection-title">{t(strings.sections.certifications)}</h3>
            <ul role="list" className="timeline">
              {profile.certifications.map((c) => (
                <li key={c.name} className="timeline__item reveal">
                  <p className="timeline__period">{c.year}</p>
                  <div>
                    <p className="timeline__title">{c.name}</p>
                    <p className="timeline__sub">{c.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
