import { site } from '@/data/site';

/** Lien WhatsApp avec message pré-rempli. */
export function whatsappLink(message: string = site.whatsapp.message): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function telLink(tel: string = site.phones[0].tel): string {
  return `tel:${tel}`;
}

export function mailtoLink(subject?: string, body?: string): string {
  const params = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean);
  return `mailto:${site.email}${params.length ? `?${params.join('&')}` : ''}`;
}
