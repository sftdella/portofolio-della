import type { FeatureGroup } from '../data/types';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';

/** Daftar fitur dikelompokkan per status audit. Kelompok kosong tidak ditampilkan. */
export function FeatureStatusList({ groups }: { groups: FeatureGroup[] }) {
  const { t } = useLanguage();
  return (
    <div className="features">
      {groups
        .filter((g) => g.items.length > 0)
        .map((g) => (
          <section key={g.status} className={`feature-group feature-group--${g.status}`}>
            <h4 className="feature-group__title">
              <span className="feature-group__dot" aria-hidden="true" />
              {t(strings.status[g.status])}
              <span className="feature-group__count">{g.items.length}</span>
            </h4>
            <ul className="feature-group__list">
              {g.items.map((f) => (
                <li key={f.text.en}>
                  {t(f.text)}
                  {f.source && <span className="feature-group__source">{t(f.source)}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
