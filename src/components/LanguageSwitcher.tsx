import type { Lang } from '../data/types';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';

const OPTIONS: { code: Lang; short: string }[] = [
  { code: 'en', short: 'EN' },
  { code: 'id', short: 'ID' },
];

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t(strings.lang.label)}>
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          className="lang-switch__btn"
          aria-pressed={lang === o.code}
          onClick={() => setLang(o.code)}
          lang={o.code}
          title={t(strings.lang[o.code])}
        >
          <span aria-hidden="true">{o.short}</span>
          <span className="visually-hidden">{t(strings.lang[o.code])}</span>
        </button>
      ))}
    </div>
  );
}
