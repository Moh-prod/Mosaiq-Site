/**
 * Informations générales de MOSAIQ, utilisées dans tout le site
 * (en-tête, pied de page, formulaires, assistant, référencement).
 */
export const site = {
  name: 'MOSAIQ',
  url: 'https://mosaiq.company',
  domain: 'mosaiq.company',
  tagline: 'Sites web, vidéos motion-design & intelligence artificielle',
  description:
    "MOSAIQ, agence digitale basée au Mali : sites web vitrines dès 39 000 F CFA, vidéos motion-design et UGC, chatbots et automatisation par l'IA pour les entreprises.",
  country: 'Mali',
  countryCode: 'ML',
  email: 'mnituser007@gmail.com',
  phones: [
    { label: 'Téléphone principal', display: '+223 73 51 23 21', tel: '+22373512321' },
    { label: 'Téléphone secondaire', display: '+223 53 64 02 61', tel: '+22353640261' },
  ],
  whatsapp: {
    number: '22373512321',
    display: '+223 73 51 23 21',
    message: 'Bonjour MOSAIQ, je souhaite avoir des informations sur vos services.',
  },
  /**
   * Réseaux sociaux : ajoutez vos liens ici, ils s'afficheront automatiquement
   * dans le pied de page. Exemple : { name: 'Facebook', url: 'https://facebook.com/mosaiq' }
   */
  socials: [] as { name: 'Facebook' | 'Instagram' | 'TikTok' | 'LinkedIn' | 'YouTube'; url: string }[],
};
