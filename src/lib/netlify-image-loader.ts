import type { ImageLoaderProps } from 'next/image';

/**
 * Loader d'images pour le Netlify Image CDN : chaque image est redimensionnée à la volée
 * et convertie en AVIF/WebP selon le navigateur. Activé automatiquement lors des builds Netlify.
 */
export default function netlifyImageLoader({ src, width, quality }: ImageLoaderProps): string {
  const params = new URLSearchParams({ url: src, w: String(width), q: String(quality ?? 75) });
  return `/.netlify/images?${params.toString()}`;
}
