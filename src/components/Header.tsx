import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';
import { Icon } from './Icon';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV = [
  { hash: 'about', label: strings.nav.about },
  { hash: 'projects', label: strings.nav.projects },
  { hash: 'skills', label: strings.nav.skills },
  { hash: 'education', label: strings.nav.education },
  { hash: 'contact', label: strings.nav.contact },
] as const;

export function Brand() {
  return (
    <span className="brand">
      <span className="brand__mark" aria-hidden="true">
        D<span>S</span>
      </span>
      <span className="brand__name">{profile.brand}</span>
    </span>
  );
}

export function Header() {
  const { t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tutup menu saat pindah halaman/bagian.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label={t(strings.nav.home)}>
          <Brand />
        </Link>

        <nav className="site-nav" aria-label={t(strings.nav.primary)}>
          <ul role="list" id="site-nav-list" className="site-nav__list">
            {NAV.map((item) => (
              <li key={item.hash}>
                <Link to={{ pathname: '/', hash: `#${item.hash}` }} className="site-nav__link">
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav-list"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
            <span className="visually-hidden">{t(open ? strings.nav.close : strings.nav.menu)}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
