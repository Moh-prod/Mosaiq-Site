/**
 * Questions fréquentes (section FAQ de l'accueil).
 * L'assistant virtuel réutilise aussi ces réponses : une seule source à tenir à jour.
 * ⚠️ Vérifiez les délais et modalités de paiement : ce sont des propositions à adapter.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    id: 'delais',
    question: 'Quels sont les délais de réalisation ?',
    answer:
      "Cela dépend du projet. À titre indicatif : quelques jours pour une vidéo, une semaine pour un site vitrine, une fois vos contenus reçus (logo, textes, photos). Le délai exact est indiqué dans votre devis.",
  },
  {
    id: 'paiement',
    question: 'Comment se passent les paiements ?',
    answer:
      'Simplement : un acompte au lancement du projet, puis le solde à la livraison. Vous pouvez régler par Orange Money, Wave, carte bancaire ou en crypto.',
  },
  {
    id: 'maintenance',
    question: 'Fournissez-vous la maintenance ?',
    answer:
      'Oui. Après la mise en ligne, nous restons à vos côtés : corrections, mises à jour de contenu, sauvegardes et assistance. Un suivi régulier peut être prévu selon vos besoins.',
  },
  {
    id: 'technique',
    question: "Je ne suis pas à l'aise avec la technique, est-ce un problème ?",
    answer:
      "Pas du tout ! Nom de domaine, hébergement, mise en ligne, configuration : on s'occupe de tout et on vous explique l'essentiel, simplement.",
  },
  {
    id: 'distance',
    question: 'Travaillez-vous en dehors du Mali ?',
    answer:
      "Oui ! Tout se gère facilement à distance, par WhatsApp, appel ou visioconférence. Nous accompagnons des entreprises au Mali (Bamako, etc.), en Côte d'Ivoire (Abidjan), au Sénégal et partout en Afrique de l'Ouest comme à l'international.",
  },
  {
    id: 'propriete',
    question: 'Serai-je propriétaire de mon site et de mes vidéos ?',
    answer:
      'Oui. Une fois le projet réglé, le site, les vidéos et les contenus créés pour vous vous appartiennent.',
  },
  {
    id: 'evolution',
    question: 'Puis-je commencer petit et évoluer ensuite ?',
    answer:
      "Bien sûr. Commencez par l'offre Site Web, puis ajoutez une vidéo ou un chatbot quand vous êtes prêt : tout est conçu pour évoluer avec votre entreprise.",
  },
];

export const getFaq = (id: string) => faqs.find((item) => item.id === id);
