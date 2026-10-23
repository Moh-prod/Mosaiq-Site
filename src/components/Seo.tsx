import Head from 'next/head';
import { site } from '@/data/site';
import { absoluteUrl } from '@/lib/seo';

type SeoProps = {
  title: string;
  description: string;
  /** Chemin de la page (ex. « /services/sites-web »), pour l'URL canonique. */
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
};

/** Balises SEO et réseaux sociaux (Open Graph, Twitter) d'une page. */
export default function Seo({ title, description, path, image = '/og-image.png', noindex, jsonLd = [] }: SeoProps) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${site.name} — ${site.tagline}`} />

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
