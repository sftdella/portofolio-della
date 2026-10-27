import { pdf } from '@react-pdf/renderer';
import { createElement } from 'react';
import type { Lang } from '../data/types';
import { PortfolioDocument } from './PortfolioDocument';

/** Nama file PDF, mis. "Della-Rodhiah-Portfolio-EN.pdf". */
export const pdfFileName = (lang: Lang) => `Della-Rodhiah-Portfolio-${lang.toUpperCase()}.pdf`;

export async function createPortfolioPdf(lang: Lang): Promise<Blob> {
  // Dokumen dibuat sebagai komponen <Document> react-pdf.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = createElement(PortfolioDocument, { lang, origin: window.location.origin }) as any;
  return pdf(doc).toBlob();
}

/** Membuat PDF di browser lalu memicu unduhan. */
export async function downloadPortfolioPdf(lang: Lang) {
  const blob = await createPortfolioPdf(lang);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = pdfFileName(lang);
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Beri waktu browser memulai unduhan sebelum URL dilepas.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
