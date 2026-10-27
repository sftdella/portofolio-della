import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLanguage } from '../i18n/LanguageContext';

const text = {
  title: { en: 'Page not found', id: 'Halaman tidak ditemukan' },
  body: { en: 'The page you were looking for doesn’t exist or has moved.', id: 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.' },
  home: { en: 'Back to home', id: 'Kembali ke beranda' },
};

export function NotFoundPage() {
  const { t } = useLanguage();
  useDocumentMeta(`404 — ${t(text.title)} · Deyla Studio`, t(text.body));
  return (
    <section className="not-found container">
      <p className="serif not-found__code">404</p>
      <h1>{t(text.title)}</h1>
      <p className="muted">{t(text.body)}</p>
      <Link to="/" className="btn btn--primary">
        <Icon name="arrowLeft" /> {t(text.home)}
      </Link>
    </section>
  );
}
