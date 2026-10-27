import { useId, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';
import { Icon } from './Icon';

type State = 'idle' | 'busy' | 'done' | 'error';

/**
 * Membuat PDF portofolio di browser (bahasa mengikuti pilihan saat ini) lalu mengunduhnya.
 * Library PDF baru dimuat saat tombol diklik agar halaman awal tetap ringan.
 */
export function DownloadPdfButton({ variant = 'wood', size }: { variant?: 'wood' | 'primary' | 'default'; size?: 'sm' }) {
  const { lang, t } = useLanguage();
  const [state, setState] = useState<State>('idle');
  const noteId = useId();

  async function handleClick() {
    if (state === 'busy') return;
    setState('busy');
    try {
      const { downloadPortfolioPdf } = await import('../pdf/generate');
      await downloadPortfolioPdf(lang);
      setState('done');
      window.setTimeout(() => setState('idle'), 3000);
    } catch (err) {
      console.error(err);
      setState('error');
    }
  }

  const cls = ['btn', variant !== 'default' && `btn--${variant}`, size && `btn--${size}`].filter(Boolean).join(' ');
  const label = state === 'busy' ? strings.pdf.preparing : state === 'done' ? strings.pdf.done : strings.pdf.download;

  return (
    <span className="pdf-action">
      <button
        type="button"
        className={cls}
        onClick={handleClick}
        aria-busy={state === 'busy'}
        aria-describedby={noteId}
        data-testid="download-pdf"
      >
        <Icon name={state === 'done' ? 'check' : 'download'} />
        {t(label)}
      </button>
      <span id={noteId} className="visually-hidden">
        {t(strings.pdf.note)}
      </span>
      <span className="pdf-action__status" role="status" aria-live="polite">
        {state === 'error' ? t(strings.pdf.error) : ''}
      </span>
    </span>
  );
}
