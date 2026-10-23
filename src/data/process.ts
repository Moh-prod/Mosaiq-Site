/** Les étapes d'un projet avec MOSAIQ (section « Notre processus »). */

export type ProcessStep = {
  icon: 'messages' | 'pen' | 'rocket' | 'headset';
  title: string;
  text: string;
};

export const processSteps: ProcessStep[] = [
  {
    icon: 'messages',
    title: 'Échange & devis',
    text: 'Vous nous présentez votre projet par WhatsApp, appel ou formulaire. Nous vous conseillons et vous envoyons un devis clair, sans engagement.',
  },
  {
    icon: 'pen',
    title: 'Conception',
    text: 'Maquette du site, script de la vidéo ou scénario du chatbot : vous validez la direction avant le lancement de la production.',
  },
  {
    icon: 'rocket',
    title: 'Réalisation',
    text: "Nous développons, animons et configurons. Vous suivez l'avancement et demandez les ajustements nécessaires.",
  },
  {
    icon: 'headset',
    title: 'Livraison & suivi',
    text: 'Mise en ligne, prise en main et accompagnement après la livraison : nous restons à vos côtés.',
  },
];
