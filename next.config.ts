import type { NextConfig } from 'next';

// Netlify définit NETLIFY=true pendant ses builds.
const isNetlifyBuild = process.env.NETLIFY === 'true';

const nextConfig: NextConfig = {
  // Export statique : chaque page est pré-générée en HTML dans /out (rapide, sans serveur à maintenir).
  output: 'export',
  reactStrictMode: true,
  images: isNetlifyBuild
    ? // Sur Netlify, les images passent par le Netlify Image CDN (redimensionnement + AVIF/WebP automatiques).
      { loader: 'custom', loaderFile: './src/lib/netlify-image-loader.ts' }
    : // En local, les images sont servies telles quelles.
      { unoptimized: true },
};

export default nextConfig;
