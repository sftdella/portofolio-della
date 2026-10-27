import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';
import { Brand } from './Header';
import { Icon } from './Icon';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const links = [
    { hash: 'about', label: strings.nav.about },
    { hash: 'projects', label: strings.nav.projects },
    { hash: 'skills', label: strings.nav.skills },
    { hash: 'education', label: strings.nav.education },
    { hash: 'contact', label: strings.nav.contact },
  ];

  return (
    <footer className="site-footer on-dark">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Brand />
          <p>
            © {year} {profile.fullName}. {t(strings.footer.rights, { name: profile.displayName })}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul role="list" className="site-footer__nav">
            {links.map((l) => (
              <li key={l.hash}>
                <Link to={{ pathname: '/', hash: `#${l.hash}` }}>{t(l.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#top" className="site-footer__top">
          {t(strings.footer.top)} <Icon name="arrowUp" size={16} />
        </a>
      </div>
    </footer>
  );
}
