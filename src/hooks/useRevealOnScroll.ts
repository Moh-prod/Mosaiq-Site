import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Fait apparaître en douceur les éléments marqués `data-reveal` lorsqu'ils entrent à l'écran.
 * Un attribut (et non une classe) est utilisé pour que React ne l'efface pas lors d'un nouveau rendu.
 */
export function useRevealOnScroll(): void {
  const { asPath } = useRouter();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.setAttribute('data-revealed', ''));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [asPath]);
}
