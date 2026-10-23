/**
 * Petits événements globaux pour faire communiquer des sections éloignées
 * (ex. un bouton de la FAQ qui ouvre l'assistant, une offre qui pré-remplit le devis).
 */

const OPEN_CHAT = 'mosaiq:open-chat';
const SELECT_QUOTE = 'mosaiq:select-quote';

export type QuoteSelection = { offer?: string; service?: string };

export function openChat(): void {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT));
}

export function onOpenChat(handler: () => void): () => void {
  window.addEventListener(OPEN_CHAT, handler);
  return () => window.removeEventListener(OPEN_CHAT, handler);
}

/**
 * Pré-remplit le formulaire de devis puis fait défiler jusqu'à lui.
 * Retourne false si le formulaire n'est pas sur la page (il faut alors naviguer vers l'accueil).
 */
export function selectQuote(selection: QuoteSelection): boolean {
  const section = document.getElementById('devis');
  if (!section) return false;
  window.dispatchEvent(new CustomEvent<QuoteSelection>(SELECT_QUOTE, { detail: selection }));
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

export function onSelectQuote(handler: (selection: QuoteSelection) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<QuoteSelection>).detail);
  window.addEventListener(SELECT_QUOTE, listener);
  return () => window.removeEventListener(SELECT_QUOTE, listener);
}

/** URL du formulaire de devis avec pré-sélection (utilisable depuis n'importe quelle page). */
export function quoteHref(selection: QuoteSelection = {}): string {
  const params = new URLSearchParams();
  if (selection.offer) params.set('offre', selection.offer);
  if (selection.service) params.set('service', selection.service);
  const query = params.toString();
  return `/${query ? `?${query}` : ''}#devis`;
}
