import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project, Shot } from '../data/types';
import { useLanguage } from '../i18n/LanguageContext';
import { strings } from '../i18n/strings';
import { Icon } from './Icon';
import { Picture } from './Picture';

/** Galeri screenshot per kelompok + lightbox (<dialog>) dengan navigasi panah & Esc. */
export function Gallery({ groups }: { groups: Project['gallery'] }) {
  const { t } = useLanguage();
  const all: Shot[] = groups.flatMap((g) => g.shots);
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = (shot: Shot, el: HTMLElement) => {
    openerRef.current = el;
    setCurrent(all.indexOf(shot));
  };
  const close = useCallback(() => setCurrent(null), []);
  const step = useCallback((d: number) => setCurrent((i) => (i === null ? i : (i + d + all.length) % all.length)), [all.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) {
      dialog.close();
      openerRef.current?.focus();
    }
  }, [current]);

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, step]);

  const shot = current !== null ? all[current] : null;

  return (
    <div className="gallery">
      {groups.map((g) => (
        <section key={g.title.en} className="gallery__group" aria-label={t(g.title)}>
          <h3 className="gallery__title">{t(g.title)}</h3>
          <ul role="list" className="gallery__grid">
            {g.shots.map((s) => (
              <li key={s.src} className={`gallery__item${s.ratio < 1 ? ' gallery__item--tall' : ''}`}>
                <figure>
                  <button type="button" className="gallery__thumb" onClick={(e) => open(s, e.currentTarget)}>
                    <Picture shot={s} sizes="(min-width: 960px) 30vw, (min-width: 600px) 45vw, 92vw" />
                    <span className="gallery__zoom" aria-hidden="true">
                      <Icon name="expand" size={16} />
                    </span>
                    <span className="visually-hidden">
                      {t(strings.gallery.open)}: {t(s.caption)}
                    </span>
                  </button>
                  <figcaption>{t(s.caption)}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={shot ? t(shot.caption) : undefined}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        {shot && (
          <div className="lightbox__inner">
            <div className="lightbox__bar">
              <p className="lightbox__caption">
                {t(shot.caption)}
                <span className="muted">
                  {' · '}
                  {t(strings.gallery.counter, { n: (current ?? 0) + 1, total: all.length })}
                </span>
              </p>
              <button type="button" className="icon-btn" onClick={close} autoFocus>
                <Icon name="close" size={20} />
                <span className="visually-hidden">{t(strings.gallery.close)}</span>
              </button>
            </div>
            <div className="lightbox__stage">
              <button type="button" className="icon-btn lightbox__nav" onClick={() => step(-1)}>
                <Icon name="chevronLeft" size={22} />
                <span className="visually-hidden">{t(strings.gallery.prev)}</span>
              </button>
              <img
                key={shot.src}
                src={`${shot.src}.webp`}
                alt={t(shot.alt)}
                className={shot.ratio < 1 ? 'is-tall' : undefined}
              />
              <button type="button" className="icon-btn lightbox__nav" onClick={() => step(1)}>
                <Icon name="chevronRight" size={22} />
                <span className="visually-hidden">{t(strings.gallery.next)}</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
