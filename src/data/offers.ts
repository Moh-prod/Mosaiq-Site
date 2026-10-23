import type { ServiceSlug } from './services';

/**
 * Forfaits affichés dans la section « Nos offres ».
 * Les prix sont en F CFA (XOF). Le contenu de chaque forfait est à ajuster librement.
 */

export type OfferId = 'site-web' | 'site-video' | 'site-video-ia' | 'pack-mosaiq';

export type Offer = {
  id: OfferId;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  /** Services inclus (sert à pré-cocher le formulaire de devis et aux pages services). */
  services: ServiceSlug[];
  highlight?: boolean;
  badge?: string;
};

export const offers: Offer[] = [
  {
    id: 'site-web',
    name: 'Site Web',
    price: 39000,
    tagline: "L'essentiel pour exister en ligne.",
    features: [
      'Site vitrine professionnel sur mesure',
      'Adapté mobile, tablette et ordinateur',
      'Boutons d\'appel et WhatsApp intégrés',
      'Formulaire de contact',
      'Référencement Google de base',
      'Mise en ligne incluse',
    ],
    services: ['sites-web'],
  },
  {
    id: 'site-video',
    name: 'Site + Vidéo',
    price: 59000,
    tagline: 'Soyez vu et faites-vous remarquer.',
    features: [
      'Tout le forfait Site Web',
      '1 vidéo promotionnelle en motion-design',
      'Formats adaptés aux réseaux sociaux',
      'Vidéo mise en avant sur votre site',
    ],
    services: ['sites-web', 'motion-design'],
  },
  {
    id: 'site-video-ia',
    name: 'Site + Vidéo + Automatisation',
    price: 105000,
    tagline: 'Gagnez du temps chaque jour.',
    features: [
      'Tout le forfait Site + Vidéo',
      'Chatbot qui répond à vos clients 24h/24',
      'Demandes de contact et de devis automatisées',
      'Configuration et prise en main incluses',
    ],
    services: ['sites-web', 'motion-design', 'integration-ia'],
  },
  {
    id: 'pack-mosaiq',
    name: 'Pack MOSAIQ',
    price: 300000,
    tagline: 'Tous nos services, pour une présence digitale complète.',
    features: [
      'Site web complet et personnalisé',
      'Vidéos motion-design et vidéos UGC',
      'Chatbot IA et automatisations sur mesure',
      'Image de marque cohérente sur tous vos supports',
      'Accompagnement prioritaire',
    ],
    services: ['sites-web', 'motion-design', 'integration-ia'],
    highlight: true,
    badge: 'Meilleure valeur',
  },
];

export const getOffer = (id: string) => offers.find((offer) => offer.id === id);
