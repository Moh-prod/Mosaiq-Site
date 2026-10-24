/**
 * Les 3 services de MOSAIQ.
 * Ce fichier alimente la section « Nos services » de l'accueil ET les pages
 * dédiées /services/sites-web, /services/motion-design et /services/integration-ia.
 */

export type ServiceSlug = 'sites-web' | 'motion-design' | 'integration-ia';
export type ServiceIcon = 'globe' | 'clapperboard' | 'bot';
export type Tone = 'indigo' | 'orange' | 'gold';
export type FeatureIcon =
  | 'palette'
  | 'smartphone'
  | 'search'
  | 'phone'
  | 'gauge'
  | 'globe'
  | 'clapperboard'
  | 'video'
  | 'pen'
  | 'layers'
  | 'captions'
  | 'monitor'
  | 'bot'
  | 'messages'
  | 'inbox'
  | 'workflow'
  | 'languages'
  | 'graduation'
  | 'eye'
  | 'shield'
  | 'clock'
  | 'trending';

export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: ServiceSlug;
  icon: ServiceIcon;
  tone: Tone;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  benefits: string[];
  linkLabel: string;
  /** Prix d'appel affiché (« À partir de… »), en F CFA. */
  startingPrice?: number;
  /** Catégorie de réalisations à afficher sur la page du service. */
  projectCategory: 'site-web' | 'motion-design' | 'ia';
  page: {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    h1: string;
    intro: string;
    highlights: { icon: FeatureIcon; title: string; text: string }[];
    features: { icon: FeatureIcon; title: string; text: string }[];
    idealFor: string[];
    faqs: ServiceFaq[];
    cta: { title: string; text: string };
  };
};

export const services: Service[] = [
  {
    slug: 'sites-web',
    icon: 'globe',
    tone: 'indigo',
    title: 'Création de sites web vitrines',
    shortTitle: 'Sites web',
    tagline: 'Un site professionnel qui inspire confiance et transforme vos visiteurs en clients.',
    description:
      "Aujourd'hui, vos clients vous cherchent d'abord sur internet. Nous créons un site vitrine moderne, rapide et parfaitement lisible sur mobile, qui présente votre activité avec clarté et donne envie de vous contacter.",
    benefits: [
      "Design sur mesure, à l'image de votre marque",
      'Parfait sur mobile, tablette et ordinateur',
      'Pensé pour être trouvé sur Google',
      'Appel, WhatsApp et formulaire en un clic',
    ],
    linkLabel: 'Voir des exemples de sites pro',
    startingPrice: 39000,
    projectCategory: 'site-web',
    page: {
      seoTitle: "Création de site web vitrine · Mali & Afrique de l'Ouest dès 39 000 F CFA | MOSAIQ (Mosaic Company)",
      seoDescription:
        "Site vitrine professionnel, rapide et adapté au mobile pour votre entreprise au Mali, en Côte d'Ivoire et en Afrique de l'Ouest. Design sur mesure, référencement Google, WhatsApp intégré. Dès 39 000 F CFA.",
      eyebrow: 'Création de sites web vitrines',
      h1: 'Un site web professionnel qui vous apporte des clients',
      intro:
        'Votre site vitrine, c\'est votre meilleur commercial : disponible 24h/24, il présente votre activité et reçoit des demandes même quand votre boutique est fermée. MOSAIQ le conçoit sur mesure, moderne, rapide et pensé pour le mobile.',
      highlights: [
        {
          icon: 'search',
          title: 'Soyez trouvé',
          text: "Vos clients cherchent sur Google avant d'acheter. Sans site, c'est votre concurrent qu'ils trouvent.",
        },
        {
          icon: 'shield',
          title: 'Inspirez confiance',
          text: 'Un site soigné rassure immédiatement et donne une image sérieuse à votre entreprise.',
        },
        {
          icon: 'clock',
          title: 'Travaillez 24h/24',
          text: 'Votre site présente vos services et collecte des demandes, même la nuit et le week-end.',
        },
      ],
      features: [
        {
          icon: 'palette',
          title: 'Design sur mesure',
          text: 'Vos couleurs, votre logo, votre ton : un site qui vous ressemble, pas un modèle générique.',
        },
        {
          icon: 'smartphone',
          title: '100 % responsive',
          text: "Un affichage parfait sur smartphone, là où se trouvent la majorité de vos clients.",
        },
        {
          icon: 'search',
          title: 'Référencement Google',
          text: 'Structure, balises et vitesse optimisées pour apparaître dans les recherches locales.',
        },
        {
          icon: 'phone',
          title: 'Contact en un clic',
          text: 'Boutons d\'appel, WhatsApp et formulaire pour transformer chaque visite en demande.',
        },
        {
          icon: 'gauge',
          title: 'Rapide et sécurisé',
          text: 'Hébergement moderne, HTTPS et chargement rapide, même avec une connexion mobile.',
        },
        {
          icon: 'globe',
          title: 'Domaine & hébergement',
          text: 'Pas technicien ? En option, nous réservons votre adresse web et gérons tout pour vous.',
        },
      ],
      idealFor: [
        'Commerces & boutiques',
        'Restaurants & hôtels',
        'Immobilier & BTP',
        'Cliniques & cabinets',
        'Écoles & formations',
        'ONG & associations',
        'Artisans & PME',
        'Consultants & indépendants',
      ],
      faqs: [
        {
          question: 'Combien coûte un site vitrine ?',
          answer:
            'Notre offre Site Web démarre à 39 000 F CFA. Pour un projet plus complet, nous établissons un devis personnalisé, gratuit et sans engagement.',
        },
        {
          question: 'Puis-je avoir mon propre nom de domaine (.com, .ml…) ?',
          answer:
            "Oui. En option, nous réservons et configurons votre nom de domaine ainsi que l'hébergement : vous n'avez rien de technique à gérer.",
        },
        {
          question: 'Pourrai-je faire modifier mon site après la livraison ?',
          answer:
            'Oui. Nous restons disponibles après la mise en ligne pour faire évoluer votre site : nouveaux textes, photos, sections ou services.',
        },
        {
          question: 'Que dois-je fournir pour commencer ?',
          answer:
            "Votre logo si vous en avez un, quelques photos et les informations clés sur votre activité. Nous vous guidons pour tout le reste.",
        },
      ],
      cta: {
        title: 'Prêt à avoir un site qui travaille pour vous ?',
        text: 'Décrivez votre activité en quelques lignes : nous vous répondons avec une proposition claire et un devis gratuit.',
      },
    },
  },
  {
    slug: 'motion-design',
    icon: 'clapperboard',
    tone: 'orange',
    title: 'Vidéos motion-design & UGC',
    shortTitle: 'Vidéos',
    tagline: "Des vidéos qui arrêtent le défilement et donnent envie d'acheter.",
    description:
      "Sur les réseaux sociaux, tout se joue en quelques secondes. Nos vidéos motion-design et UGC présentent votre offre de façon claire, dynamique et mémorable : idéales pour vos publicités, vos lancements et votre site.",
    benefits: [
      'Vidéos promotionnelles animées (motion-design)',
      'Vidéos UGC authentiques qui inspirent confiance',
      'Formats TikTok, Reels, Facebook et statuts WhatsApp',
      'Du script au montage final, on gère tout',
    ],
    linkLabel: 'Voir des échantillons de vidéos',
    projectCategory: 'motion-design',
    page: {
      seoTitle: "Vidéo motion-design & UGC · Mali, Côte d'Ivoire & Afrique de l'Ouest | MOSAIQ (Mosaic Company)",
      seoDescription:
        "Vidéos promotionnelles en motion-design et UGC pour TikTok, Instagram, Facebook et WhatsApp au Mali, Côte d'Ivoire et Afrique de l'Ouest. Captez l'attention et boostez vos ventes. MOSAIQ.",
      eyebrow: 'Vidéos motion-design & UGC',
      h1: "Des vidéos qui captent l'attention et font vendre",
      intro:
        "Motion-design animé ou vidéos UGC au style « avis client » : MOSAIQ transforme votre message en vidéos courtes, percutantes et adaptées à chaque réseau social.",
      highlights: [
        {
          icon: 'eye',
          title: "Captez l'attention",
          text: "Le mouvement attire l'œil : une vidéo arrête le défilement bien mieux qu'une simple image.",
        },
        {
          icon: 'messages',
          title: 'Expliquez simplement',
          text: 'En quelques secondes, votre offre devient claire, même quand elle est technique.',
        },
        {
          icon: 'trending',
          title: 'Vendez davantage',
          text: 'Les vidéos UGC montrent votre produit en situation réelle, comme une recommandation entre amis.',
        },
      ],
      features: [
        {
          icon: 'clapperboard',
          title: 'Motion-design promotionnel',
          text: 'Animations, textes dynamiques et transitions modernes pour présenter votre marque.',
        },
        {
          icon: 'video',
          title: 'Vidéos UGC',
          text: 'Des contenus authentiques, au format « avis client », très efficaces en publicité.',
        },
        {
          icon: 'pen',
          title: 'Script & storyboard',
          text: 'Nous écrivons le message et validons le déroulé avec vous avant la production.',
        },
        {
          icon: 'layers',
          title: 'Formats réseaux sociaux',
          text: 'Vertical, carré ou horizontal : chaque vidéo est adaptée à TikTok, Instagram, Facebook et WhatsApp.',
        },
        {
          icon: 'captions',
          title: 'Sous-titres & musique',
          text: 'Des vidéos compréhensibles même sans le son, avec une ambiance sonore adaptée.',
        },
        {
          icon: 'monitor',
          title: 'Intégration à votre site',
          text: 'Mettez votre vidéo en avant sur votre site et dans vos campagnes publicitaires.',
        },
      ],
      idealFor: [
        'Lancement de produit',
        'Publicités Facebook & TikTok',
        "Présentation d'entreprise",
        'Promotions & événements',
        'Restaurants & mode',
        'Immobilier',
        'Applications & services',
        'Recrutement',
      ],
      faqs: [
        {
          question: 'Quelle différence entre motion-design et UGC ?',
          answer:
            "Le motion-design est une vidéo animée (textes, formes, illustrations), idéale pour expliquer et présenter. L'UGC reprend le style d'un client qui parle de votre produit face caméra : un format très efficace en publicité sur les réseaux sociaux.",
        },
        {
          question: 'Quelle durée pour une vidéo ?',
          answer:
            "Le plus souvent entre 15 et 60 secondes, le format idéal pour les réseaux sociaux. Nous adaptons la durée à votre objectif et au réseau visé.",
        },
        {
          question: 'Puis-je voir des exemples ?',
          answer:
            'Oui ! Écrivez-nous sur WhatsApp : nous vous envoyons des exemples adaptés à votre secteur.',
        },
        {
          question: 'Dois-je fournir des images ou des vidéos ?',
          answer:
            "Ce n'est pas obligatoire. Votre logo et des photos de vos produits sont un plus, mais nous pouvons créer la vidéo à partir de votre message.",
        },
      ],
      cta: {
        title: 'Une vidéo pour votre prochain lancement ?',
        text: 'Expliquez-nous votre objectif : nous vous proposons une idée de vidéo et un devis gratuit.',
      },
    },
  },
  {
    slug: 'integration-ia',
    icon: 'bot',
    tone: 'gold',
    title: "Intégration d'IA : chatbots & automatisation",
    shortTitle: 'Intelligence artificielle',
    tagline: 'Un assistant qui répond à vos clients 24h/24 et des tâches qui se font toutes seules.',
    description:
      'Vos clients posent toujours les mêmes questions ? Vous perdez du temps sur des tâches répétitives ? Nous intégrons des chatbots et des automatisations qui travaillent pour vous, jour et nuit.',
    benefits: [
      'Chatbot sur votre site et vos réseaux',
      'Réponses instantanées, 24h/24 et 7j/7',
      'Demandes, devis et rendez-vous collectés automatiquement',
      'Tâches répétitives automatisées',
    ],
    linkLabel: 'Découvrir nos chatbots IA',
    projectCategory: 'ia',
    page: {
      seoTitle: "Chatbot IA & automatisation pour entreprises · Mali & Afrique de l'Ouest | MOSAIQ (Mosaic Company)",
      seoDescription:
        "Intégrez un chatbot IA disponible 24h/24 et automatisez vos processus au Mali, en Côte d'Ivoire et en Afrique de l'Ouest. MOSAIQ (Mosaic Company).",
      eyebrow: "Intégration d'intelligence artificielle",
      h1: "L'intelligence artificielle au service de votre entreprise",
      intro:
        "Des chatbots qui répondent à vos clients à toute heure, des automatisations qui éliminent les tâches répétitives : MOSAIQ met l'IA à la portée des entreprises, simplement et sans jargon.",
      highlights: [
        {
          icon: 'clock',
          title: 'Disponible 24h/24',
          text: 'Votre assistant répond instantanément, le soir, le week-end et les jours fériés.',
        },
        {
          icon: 'inbox',
          title: 'Aucune demande perdue',
          text: 'Chaque message est enregistré et vous est transmis : vous rappelez au bon moment.',
        },
        {
          icon: 'workflow',
          title: 'Du temps gagné',
          text: 'Les tâches répétitives se font seules : vous vous concentrez sur votre métier.',
        },
      ],
      features: [
        {
          icon: 'bot',
          title: 'Chatbot pour votre site',
          text: 'Un assistant qui connaît vos services, vos prix et vos horaires, et guide vos visiteurs.',
        },
        {
          icon: 'messages',
          title: 'Réseaux & messageries',
          text: 'Réponses automatiques sur vos canaux de discussion, selon vos besoins et vos outils.',
        },
        {
          icon: 'inbox',
          title: 'Collecte des demandes',
          text: 'Devis, réservations, rendez-vous : les informations arrivent directement chez vous.',
        },
        {
          icon: 'workflow',
          title: 'Automatisation des tâches',
          text: 'Relances, confirmations, tableaux de suivi : on automatise ce qui vous fait perdre du temps.',
        },
        {
          icon: 'languages',
          title: 'Adapté à vos clients',
          text: 'Un assistant qui parle comme vous, en français, avec le vocabulaire de votre métier.',
        },
        {
          icon: 'graduation',
          title: 'Prise en main incluse',
          text: 'Nous vous montrons comment suivre les échanges et faire évoluer votre assistant.',
        },
      ],
      idealFor: [
        'Service client',
        'Prise de rendez-vous',
        'Hôtels & restaurants',
        'Commerce en ligne',
        'Écoles & inscriptions',
        'Immobilier',
        'Cliniques',
        'Agences & services',
      ],
      faqs: [
        {
          question: 'Est-ce compliqué à mettre en place ?',
          answer:
            "Non : nous nous occupons de tout, de la configuration à la mise en ligne, et nous vous montrons comment l'utiliser au quotidien.",
        },
        {
          question: 'Le chatbot peut-il répondre en français ?',
          answer:
            'Oui. Il répond en français et peut être adapté au vocabulaire et aux questions fréquentes de vos clients.',
        },
        {
          question: 'Que se passe-t-il si le chatbot ne sait pas répondre ?',
          answer:
            'Il propose au client de laisser ses coordonnées ou de vous écrire sur WhatsApp : la demande n\'est jamais perdue.',
        },
        {
          question: 'Puis-je tester avant ?',
          answer:
            "Oui ! Essayez l'assistant MOSAIQ en bas à droite de cette page : c'est un aperçu de ce que nous pouvons créer pour votre entreprise.",
        },
      ],
      cta: {
        title: "Et si vos clients avaient une réponse à toute heure ?",
        text: 'Parlez-nous de vos questions clients et de vos tâches répétitives : nous vous proposons une solution sur mesure.',
      },
    },
  },
];

/** Version allégée (sans le contenu de la page dédiée) pour l'accueil et les liens. */
export type ServiceSummary = Omit<Service, 'page'>;

export const toSummary = ({ page: _page, ...summary }: Service): ServiceSummary => summary;

export const getService = (slug: string) => services.find((service) => service.slug === slug);
