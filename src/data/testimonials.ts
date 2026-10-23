/**
 * Témoignages clients.
 *
 * ⚠️ Les témoignages ci-dessous sont des EXEMPLES (noms et citations fictifs).
 * Remplacez-les par de vrais avis clients avant la mise en ligne publique :
 * un faux témoignage peut nuire à votre crédibilité.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Avant, nos clients ne nous trouvaient que par le bouche-à-oreille. Depuis la mise en ligne du site, nous recevons des demandes chaque semaine, directement sur WhatsApp. Un travail rapide et très professionnel.",
    name: 'Aminata Traoré',
    role: 'Gérante',
    company: 'Boutique de prêt-à-porter, Bamako',
  },
  {
    quote:
      'La vidéo motion-design de notre lancement a été partagée partout. Nos clients l\'ont adorée et les commandes ont suivi. Nous referons appel à MOSAIQ sans hésiter.',
    name: 'Ibrahim Keïta',
    role: 'Fondateur',
    company: 'Entreprise agroalimentaire',
  },
  {
    quote:
      'Le chatbot répond à nos clients le soir et le week-end. Nous ne ratons plus aucune demande de réservation. Une équipe à l\'écoute, du début à la fin.',
    name: 'Mariam Coulibaly',
    role: 'Directrice',
    company: 'Résidence hôtelière, Ségou',
  },
];
