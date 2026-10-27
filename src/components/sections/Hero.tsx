import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { useLanguage } from '../../i18n/LanguageContext';
import { strings } from '../../i18n/strings';
import { DownloadPdfButton } from '../DownloadPdfButton';
import { Icon } from '../Icon';
import { Picture } from '../Picture';

export function Hero() {
  const { t } = useLanguage();
  const [roomcraft, dellearn] = projects;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">
            {profile.brand} · {t(strings.hero.eyebrow)}
          </p>
          <h1 id="hero-title" className="hero__name">
            {profile.displayName}
          </h1>
          <p className="hero__role">{t(profile.headline)}</p>
          <p className="hero__tagline serif">{t(profile.tagline)}</p>
          <p className="hero__summary">{t(profile.summary)}</p>
          <div className="hero__actions">
            <Link to={{ pathname: '/', hash: '#projects' }} className="btn btn--primary">
              {t(strings.hero.viewProjects)} <Icon name="arrowRight" />
            </Link>
            <DownloadPdfButton variant="wood" />
            <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn--ghost">
              {t(strings.hero.contact)}
            </Link>
          </div>
        </div>

        <div className="hero__visual" aria-label={t(strings.nav.projects)} role="group">
          <Link to={`/projects/${roomcraft.slug}`} className="hero__main">
            <Picture shot={roomcraft.cover} sizes="(min-width: 960px) 46vw, 92vw" eager />
            <span className="hero__caption">
              {t(strings.hero.visualCaption)} <Icon name="arrowUpRight" size={14} />
            </span>
          </Link>
          <Link to={`/projects/${dellearn.slug}`} className="hero__secondary">
            <Picture shot={dellearn.cover} sizes="(min-width: 960px) 22vw, 50vw" eager />
            <span className="hero__caption">
              {t(strings.hero.secondCaption)} <Icon name="arrowUpRight" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
