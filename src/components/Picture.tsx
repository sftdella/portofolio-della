import type { Shot } from '../data/types';
import { useLanguage } from '../i18n/LanguageContext';

interface PictureProps {
  shot: Pick<Shot, 'src' | 'alt' | 'ratio'>;
  /** Atribut `sizes` untuk memilih -sm.webp (800 px) atau .webp (1600 px). */
  sizes?: string;
  className?: string;
  eager?: boolean;
}

/** Gambar responsif: WebP 800/1600 px dengan fallback JPG, rasio tetap agar layout tidak bergeser. */
export function Picture({ shot, sizes = '100vw', className, eager = false }: PictureProps) {
  const { t } = useLanguage();
  const width = 1600;
  const height = Math.round(width / shot.ratio);
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${shot.src}-sm.webp 800w, ${shot.src}.webp 1600w`} sizes={sizes} />
      <img
        src={`${shot.src}.jpg`}
        alt={t(shot.alt)}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : undefined}
        style={{ aspectRatio: String(shot.ratio) }}
      />
    </picture>
  );
}
