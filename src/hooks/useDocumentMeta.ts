import { useEffect } from 'react';

/** Mengatur judul tab dan meta description sesuai halaman & bahasa aktif. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
