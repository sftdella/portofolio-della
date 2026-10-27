import { profile } from '../../data/profile';
import { useLanguage } from '../../i18n/LanguageContext';
import { strings } from '../../i18n/strings';
import { Picture } from '../Picture';
import { SectionHeading } from './SectionHeading';

export function About({ index }: { index: string }) {
  const { t, lang } = useLanguage();
  const edu = profile.education[0];

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading index={index} label={t(strings.sections.about)} id="about-title">
          {profile.fullName}
        </SectionHeading>

        <div className="about__grid">
          <figure className="about__photo reveal">
            <Picture shot={{ src: profile.photo.src, alt: profile.photo.alt, ratio: 4 / 5 }} sizes="(min-width: 960px) 360px, 80vw" />
          </figure>

          <div className="about__body reveal">
            <p className="about__lead">{t(profile.summary)}</p>

            <dl className="facts">
              <div className="facts__row">
                <dt>{t(strings.about.study)}</dt>
                <dd>
                  {t(edu.degree)}, {edu.school}
                  <br />
                  <span className="muted">{t(edu.status)}</span>
                </dd>
              </div>
              <div className="facts__row">
                <dt>{t(strings.about.interests)}</dt>
                <dd>
                  <ul role="list" className="inline-list">
                    {profile.interests[lang].map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="facts__row">
                <dt>{t(strings.about.lookingFor)}</dt>
                <dd>
                  <ul role="list" className="chips">
                    {profile.roles.map((r) => (
                      <li key={r} className="chip">
                        {r}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
