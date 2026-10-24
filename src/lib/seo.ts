import { offers } from '@/data/offers';
import type { Service } from '@/data/services';
import { site } from '@/data/site';
import { formatPrice } from './format';

/** Données structurées (schema.org) pour aider Google à comprendre le site. */

type JsonLd = Record<string, unknown>;

export const absoluteUrl = (path = '/'): string => new URL(path, site.url).toString();

const ORGANIZATION_ID = `${site.url}/#organization`;

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: site.name,
    alternateName: [
      'MOSAIQ Company',
      'Mosaiq',
      'Mosaiq Mali',
      'Agence MOSAIQ',
    ],
    url: site.url,
    logo: absoluteUrl('/icon-512.png'),
    image: absoluteUrl('/og-image.png'),
    description: site.description,
    email: site.email,
    telephone: site.phones[0].tel,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bamako',
      addressCountry: site.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '12.6392',
      longitude: '-8.0029',
    },
    areaServed: [
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: "Côte d'Ivoire" },
      { '@type': 'Country', name: 'Sénégal' },
      { '@type': 'Place', name: "Afrique de l'Ouest" },
      { '@type': 'Place', name: 'International' },
    ],
    priceRange: `${formatPrice(Math.min(...offers.map((offer) => offer.price)))} – ${formatPrice(Math.max(...offers.map((offer) => offer.price)))}`,
    contactPoint: site.phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone.tel,
      contactType: 'customer service',
      availableLanguage: ['French', 'Bambara', 'English'],
    })),
    knowsAbout: [
      'Création de sites web vitrines',
      'Sites internet pour entreprises',
      'Vidéos Motion Design',
      'Vidéos UGC pour réseaux sociaux',
      'Intelligence Artificielle',
      'Chatbots et automatisation pour entreprises',
      'Développement web Afrique',
      'Marketing digital',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Forfaits MOSAIQ',
      itemListElement: offers.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        description: offer.tagline,
        price: offer.price,
        priceCurrency: 'XOF',
      })),
    },
    ...(site.socials.length > 0 && { sameAs: site.socials.map((social) => social.url) }),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MOSAIQ Company',
    alternateName: ['MOSAIQ', 'Mosaiq Company'],
    url: site.url,
    inLanguage: ['fr', 'fr-ML', 'fr-CI'],
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function serviceJsonLd(service: Service, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.page.seoDescription,
    url: absoluteUrl(path),
    provider: { '@id': ORGANIZATION_ID },
    areaServed: [
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: "Côte d'Ivoire" },
      { '@type': 'Country', name: 'Sénégal' },
      { '@type': 'Place', name: "Afrique de l'Ouest" },
      { '@type': 'Place', name: 'International' },
    ],
    ...(service.startingPrice && {
      offers: { '@type': 'Offer', price: service.startingPrice, priceCurrency: 'XOF' },
    }),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
