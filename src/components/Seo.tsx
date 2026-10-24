import Head from 'next/head';
import { site } from '@/data/site';
import { absoluteUrl } from '@/lib/seo';

type SeoProps = {
  title: string;
  description: string;
  /** Chemin de la page (ex. « /services/sites-web »), pour l'URL canonique. */
  path: string;
  image?: string;
  keywords?: string[] | string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
};

/** Balises SEO et réseaux sociaux (Open Graph, Twitter) d'une page. */
export default function Seo({ title, description, path, image = '/og-image.png', keywords, noindex, jsonLd = [] }: SeoProps) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const keywordsContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsContent && <meta name="keywords" content={keywordsContent} />}
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      <meta name="author" content="MOSAIQ (Mosaiq Company)" />
      <link rel="canonical" href={url} />

      {/* Balises géographiques régionales */}
      <meta name="geo.region" content="ML" />
      <meta name="geo.placename" content="Bamako" />
      <meta name="geo.position" content="12.6392;-8.0029" />
      <meta name="ICBM" content="12.6392, -8.0029" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MOSAIQ (Mosaiq Company)" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="fr_ML" />
      <meta property="og:locale:alternate" content="fr_CI" />
      <meta property="og:locale:alternate" content="fr_SN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${site.name} — ${site.tagline}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd.map((data, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          // Échappe « < » pour qu'aucun contenu ne puisse fermer la balise <script>.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
      ))}
    </Head>
  );
}
