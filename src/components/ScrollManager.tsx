import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Menangani scroll saat berpindah rute:
 * - URL dengan hash (mis. /#projects) → scroll ke elemen tersebut
 *   (langsung melompat bila datang dari halaman lain; halus bila di halaman yang sama)
 * - rute baru tanpa hash → kembali ke atas
 * Sekaligus mengaktifkan animasi `.reveal` untuk elemen yang masuk viewport.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;
    if (hash) {
      // Tunggu render halaman tujuan selesai.
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant' }),
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
