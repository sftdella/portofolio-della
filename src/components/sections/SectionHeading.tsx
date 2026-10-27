import type { ReactNode } from 'react';

/** Judul bagian bergaya editorial: nomor + label + judul. */
export function SectionHeading({ index, label, id, children }: { index: string; label: string; id: string; children?: ReactNode }) {
  return (
    <header className="section-heading reveal">
      <p className="section-heading__label">
        <span className="section-heading__index serif">{index}</span>
        <span>{label}</span>
      </p>
      {children && (
        <h2 id={id} className="section-heading__title">
          {children}
        </h2>
      )}
    </header>
  );
}
