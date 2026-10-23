/**
 * Réalisations (portfolio).
 *
 * Pour ajouter un projet :
 *  1. Placez une capture d'écran dans /public/realisations/ (format 16:10, ex. 1440 × 900 px).
 *     Astuce : `npm run screenshot -- https://adresse-du-site.com nom-du-projet` la génère pour vous.
 *  2. Ajoutez une entrée dans la liste ci-dessous (le premier projet « featured » est mis en avant).
 *  3. Pour une vidéo motion-design, ajoutez `video: '/realisations/ma-video.mp4'` :
 *     elle sera lue en boucle, sans le son, comme un GIF (l'image sert alors d'affiche).
 */

export type ProjectCategory = 'site-web' | 'motion-design' | 'ia';

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  sector: string;
  location: string;
  /** Résumé court affiché au survol / en légende. */
  summary: string;
  description: string;
  deliverables: string[];
  /** Lien vers le projet en ligne. */
  url?: string;
  /** Capture d'écran (ordinateur), dans /public. */
  image: string;
  /** Capture d'écran mobile facultative (format téléphone, ex. 390 × 844 px). */
  imageMobile?: string;
  /** Vidéo facultative (mp4) pour les réalisations motion-design. */
  video?: string;
  featured?: boolean;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  'site-web': 'Site web vitrine',
  'motion-design': 'Motion-design',
  ia: 'Intelligence artificielle',
};

export const projects: Project[] = [
  {
    slug: 'cheikh-amy-immo',
    title: 'Cheikh Amy Immo & Services',
    category: 'site-web',
    sector: 'Immobilier, architecture & tourisme',
    location: 'Foundiougne, Sénégal',
    summary: 'Site vitrine pour une agence aux 5 pôles d\'expertise, dans le Sine-Saloum.',
    description:
      "Architecture, design intérieur, transactions immobilières, tourisme et sérigraphie : nous avons réuni les 5 pôles de l'agence dans un site clair et moderne. Chaque service a sa présentation détaillée, les biens disponibles sont filtrables et chaque visiteur peut demander un devis ou écrire directement sur WhatsApp.",
    deliverables: [
      'Design sur mesure, 100 % responsive',
      'Présentation détaillée des 5 pôles',
      'Catalogue de biens avec filtres',
      'Demandes de devis et contact WhatsApp',
      'Référencement local (SEO)',
    ],
    url: 'https://cheikhamy-immo.netlify.app',
    image: '/realisations/cheikh-amy-immo.webp',
    imageMobile: '/realisations/cheikh-amy-immo-mobile.webp',
    featured: true,
  },
];
