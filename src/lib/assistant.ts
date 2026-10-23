import { getFaq } from '@/data/faq';
import { offers } from '@/data/offers';
import { projects } from '@/data/projects';
import { getService, services, type ServiceSlug } from '@/data/services';
import { site } from '@/data/site';
import { formatPrice } from './format';

/**
 * Moteur de l'assistant virtuel MOSAIQ.
 * Il reconnaît l'intention du visiteur grâce à des mots-clés (sans service externe)
 * et répond à partir des données du site : offres, FAQ, services, réalisations.
 * Pour enrichir l'assistant, ajoutez des mots-clés ou des intentions ci-dessous.
 */

export type AssistantAction =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'external'; label: string; href: string }
  | { kind: 'whatsapp'; label: string; message?: string }
  | { kind: 'call'; label: string }
  | { kind: 'email'; label: string }
  | { kind: 'lead'; label: string };

export type AssistantReply = {
  text: string;
  actions?: AssistantAction[];
  /** Affiche les suggestions de questions sous la réponse. */
  suggestions?: boolean;
  /** Ouvre le mini-formulaire de rappel, éventuellement pré-rempli. */
  lead?: { contact?: string };
};

export const quickReplies = [
  { label: '💰 Vos tarifs', text: 'Quels sont vos tarifs ?' },
  { label: '⏱️ Les délais', text: 'Quels sont les délais ?' },
  { label: '💳 Le paiement', text: 'Comment se passent les paiements ?' },
  { label: '🛠️ La maintenance', text: 'Fournissez-vous la maintenance ?' },
  { label: '📝 Un devis', text: 'Je souhaite un devis' },
  { label: '👤 Un conseiller', text: 'Je veux parler à un conseiller' },
];

export const welcomeReply: AssistantReply = {
  text: "Bonjour 👋 Je suis l'assistant virtuel de MOSAIQ.\nPosez-moi vos questions sur nos sites web, nos vidéos, nos solutions d'IA, nos tarifs ou nos délais. Je peux aussi transmettre votre demande à l'équipe.",
  suggestions: true,
};

type IntentId =
  | 'devis'
  | 'humain'
  | 'tarifs'
  | 'delais'
  | 'paiement'
  | 'maintenance'
  | 'domaine'
  | 'realisations'
  | 'video'
  | 'ia'
  | 'site'
  | 'services'
  | 'localisation'
  | 'salutation'
  | 'merci'
  | 'aurevoir';

/**
 * Mots-clés par intention, sans accents ni majuscules.
 * « mot* » = tout mot qui commence par « mot » ; une expression de plusieurs mots compte double.
 * En cas d'égalité, l'intention placée le plus haut l'emporte.
 */
const intents: { id: IntentId; keywords: string[] }[] = [
  { id: 'tarifs', keywords: ['prix', 'tarif*', 'combien', 'cout*', 'cher', 'budget', 'forfait*', 'offre*', 'pack*', 'montant', 'fcfa', 'cfa', 'franc*', 'payer combien'] },
  { id: 'delais', keywords: ['delai*', 'combien de temps', 'quand', 'duree', 'livr*', 'rapide*', 'vite', 'semaine*', 'jours', 'temps', 'urgent'] },
  { id: 'paiement', keywords: ['paiement*', 'payer', 'paye*', 'regle*', 'orange money', 'moov', 'wave', 'virement', 'espece*', 'acompte', 'avance', 'tranche*', 'facture*', 'mobile money'] },
  { id: 'maintenance', keywords: ['maintenance', 'mise a jour', 'mises a jour', 'support', 'assistance', 'apres la livraison', 'modifier', 'modification*', 'bug*', 'panne', 'suivi', 'sauvegarde*'] },
  { id: 'domaine', keywords: ['domaine', 'nom de domaine', 'hebergement', 'heberge*', 'hebergeur', 'com', 'adresse web', 'url', 'serveur'] },
  { id: 'devis', keywords: ['devis', 'estimation', 'sur mesure', 'personnalise*', 'commander', 'commande', 'demarrer', 'projet', 'mon projet', 'proposition', 'interesse*'] },
  { id: 'video', keywords: ['video*', 'motion', 'ugc', 'animation*', 'anime*', 'pub', 'publicite*', 'tiktok', 'reels', 'instagram', 'clip*', 'montage', 'spot*'] },
  { id: 'realisations', keywords: ['realisation*', 'exemple*', 'portfolio', 'reference*', 'travaux', 'projets', 'clients', 'echantillon*', 'deja fait'] },
  { id: 'ia', keywords: ['ia', 'intelligence artificielle', 'chatbot*', 'bot', 'robot*', 'automatis*', 'automatique*', 'gpt', 'chatgpt'] },
  { id: 'site', keywords: ['site*', 'web', 'vitrine', 'internet', 'en ligne', 'page*', 'google', 'referencement', 'seo', 'landing'] },
  { id: 'services', keywords: ['service*', 'prestation*', 'proposez', 'faites quoi', 'que faites', 'activite*', 'expertise*'] },
  { id: 'humain', keywords: ['humain', 'conseiller', 'quelqu un', 'une personne', 'appel*', 'telephone', 'numero', 'joindre', 'contact*', 'parler', 'whatsapp', 'mail', 'email', 'rappel*', 'equipe'] },
  { id: 'localisation', keywords: ['ou etes', 'etes ou', 'situe*', 'base', 'bases', 'adresse', 'localisation', 'bamako', 'mali', 'bureau*', 'senegal', 'etranger', 'distance', 'pays', 'ville'] },
  { id: 'salutation', keywords: ['bonjour', 'bonsoir', 'salut', 'hello', 'coucou', 'slt', 'bjr', 'hey', 'salam', 'assalamou', 'i ni ce', 'aw ni ce', 'i ni sogoma', 'i ni tile', 'i ni wula'] },
  { id: 'merci', keywords: ['merci', 'thanks', 'super', 'parfait', 'genial', 'top', 'cool', 'ok', 'd accord', 'daccord', 'nickel'] },
  { id: 'aurevoir', keywords: ['au revoir', 'bye', 'a bientot', 'bonne journee', 'bonne soiree', 'ciao', 'a plus'] },
];

const BAMBARA_GREETING = /\b(i|aw) ni (ce|sogoma|tile|wula)\b/;
const EMAIL_RE = /[^\s@]+@[^\s@]+\.[a-z]{2,}/i;
const PHONE_RE = /\+?\d[\d\s.-]{6,}\d/;

function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreKeywords(tokens: string[], padded: string, keywords: string[]): number {
  let score = 0;
  for (const keyword of keywords) {
    if (keyword.includes(' ')) {
      if (padded.includes(` ${keyword} `)) score += 2;
    } else if (keyword.endsWith('*')) {
      const stem = keyword.slice(0, -1);
      if (tokens.some((token) => token.startsWith(stem))) score += 1;
    } else if (tokens.includes(keyword)) {
      score += 1;
    }
  }
  return score;
}

const faqAnswer = (id: string) => getFaq(id)?.answer ?? '';

const quoteAction: AssistantAction = { kind: 'link', label: 'Demander un devis', href: '/#devis' };
const whatsappAction = (message?: string): AssistantAction => ({ kind: 'whatsapp', label: 'Écrire sur WhatsApp', message });

function serviceReply(slug: ServiceSlug, extra: string, actions: AssistantAction[]): AssistantReply {
  const service = getService(slug)!;
  const price = service.startingPrice ? ` À partir de ${formatPrice(service.startingPrice)}.` : '';
  return {
    text: `${service.tagline}\n${service.description}${price}${extra}`,
    actions: [{ kind: 'link', label: `Découvrir : ${service.shortTitle}`, href: `/services/${slug}` }, ...actions],
  };
}

function replyFor(intent: IntentId): AssistantReply {
  switch (intent) {
    case 'tarifs':
      return {
        text: `Voici nos forfaits :\n${offers.map((offer) => `• ${offer.name} : ${formatPrice(offer.price)}`).join('\n')}\n\nUn besoin particulier ? Nous préparons aussi des devis personnalisés, gratuitement.`,
        actions: [{ kind: 'link', label: 'Voir le détail des offres', href: '/#offres' }, quoteAction],
      };
    case 'delais':
      return { text: faqAnswer('delais'), actions: [quoteAction] };
    case 'paiement':
      return { text: faqAnswer('paiement'), actions: [quoteAction, whatsappAction()] };
    case 'maintenance':
      return { text: faqAnswer('maintenance'), actions: [whatsappAction(), { kind: 'lead', label: 'Être recontacté' }] };
    case 'domaine':
      return {
        text: "Vous n'avez rien de technique à gérer 🙂 En option, nous réservons votre nom de domaine (ex. votre-entreprise.com), hébergeons votre site et nous occupons des renouvellements. Le tarif dépend de l'extension choisie : demandez-le dans votre devis.",
        actions: [quoteAction],
      };
    case 'site':
      return serviceReply('sites-web', '', [quoteAction]);
    case 'video':
      return serviceReply('motion-design', '\nVous voulez voir des exemples ? Écrivez-nous sur WhatsApp.', [
        whatsappAction('Bonjour MOSAIQ, je souhaite voir des exemples de vidéos motion-design.'),
      ]);
    case 'ia':
      return serviceReply('integration-ia', "\nD'ailleurs, je suis moi-même un exemple d'assistant virtuel 😉", [quoteAction]);
    case 'services':
      return {
        text: `MOSAIQ réunit 3 expertises complémentaires :\n${services
          .map((service) => `• ${service.title}${service.startingPrice ? ` (dès ${formatPrice(service.startingPrice)})` : ''}`)
          .join('\n')}\n\nLaquelle vous intéresse ?`,
        actions: services.map((service) => ({
          kind: 'link' as const,
          label: service.shortTitle,
          href: `/services/${service.slug}`,
        })),
      };
    case 'realisations': {
      const featured = projects.find((project) => project.featured) ?? projects[0];
      return {
        text: featured
          ? `Découvrez nos réalisations, dont le site de ${featured.title} (${featured.location}). D'autres projets arrivent bientôt !`
          : 'Nos réalisations arrivent très bientôt sur le site.',
        actions: [
          { kind: 'link', label: 'Voir les réalisations', href: '/#realisations' },
          ...(featured?.url ? [{ kind: 'external' as const, label: `Visiter ${featured.title}`, href: featured.url }] : []),
        ],
      };
    }
    case 'localisation':
      return {
        text: `Nous sommes basés au ${site.country} et travaillons avec des entreprises partout au Mali et en Afrique de l'Ouest. Tout peut se faire à distance : WhatsApp, appel ou e-mail.`,
        actions: [whatsappAction(), { kind: 'call', label: 'Appeler' }],
      };
    case 'devis':
      return {
        text: 'Avec plaisir ! Deux options : remplissez notre formulaire de devis (2 minutes), ou laissez-moi vos coordonnées et un conseiller vous recontacte.',
        actions: [{ kind: 'link', label: 'Remplir le formulaire', href: '/#devis' }, { kind: 'lead', label: 'Être recontacté' }, whatsappAction()],
      };
    case 'humain':
      return {
        text: "Bien sûr ! L'équipe MOSAIQ est joignable directement :",
        actions: [whatsappAction(), { kind: 'call', label: `Appeler le ${site.phones[0].display}` }, { kind: 'email', label: 'Envoyer un e-mail' }, { kind: 'lead', label: 'Être rappelé' }],
      };
    case 'salutation':
      return { text: 'Bonjour ! 😊 Comment puis-je vous aider ?', suggestions: true };
    case 'merci':
      return { text: 'Avec plaisir ! 😊 Avez-vous une autre question ?', suggestions: true };
    case 'aurevoir':
      return { text: `À très bientôt ! 👋 L'équipe MOSAIQ reste joignable sur WhatsApp au ${site.whatsapp.display}.` };
  }
}

const fallbackReply: AssistantReply = {
  text: "Je ne suis pas sûr de bien comprendre 🤔 Je peux vous renseigner sur nos tarifs, nos délais et nos services, ou vous mettre en relation avec un conseiller.",
  actions: [{ kind: 'lead', label: 'Être recontacté' }, whatsappAction()],
  suggestions: true,
};

/** Calcule la réponse de l'assistant à un message du visiteur. */
export function getAssistantReply(input: string): AssistantReply {
  const email = input.match(EMAIL_RE)?.[0];
  const phone = input.match(PHONE_RE)?.[0];
  const contact = email ?? (phone && phone.replace(/\D/g, '').length >= 8 ? phone.trim() : undefined);
  if (contact) {
    return {
      text: `Merci ! Je transmets ${email ? 'cette adresse' : 'ce numéro'} à l'équipe MOSAIQ pour qu'elle vous recontacte. Complétez simplement le petit formulaire ci-dessous 👇`,
      lead: { contact },
    };
  }

  const text = normalize(input);
  const tokens = text.split(' ');
  const padded = ` ${text} `;

  let best: { id: IntentId; score: number } | null = null;
  let greeted = false;
  for (const intent of intents) {
    const score = scoreKeywords(tokens, padded, intent.keywords);
    if (intent.id === 'salutation' && score > 0) greeted = true;
    if (score > 0 && (!best || score > best.score)) best = { id: intent.id, score };
  }

  if (!best) return fallbackReply;
  if (best.id === 'salutation' && BAMBARA_GREETING.test(text)) {
    return { text: 'I ni ce ! 😊 Bienvenue chez MOSAIQ. Comment puis-je vous aider ?', suggestions: true };
  }

  const reply = replyFor(best.id);
  if (greeted && best.id !== 'salutation') {
    return { ...reply, text: `Bonjour ! ${reply.text}` };
  }
  return reply;
}
