const NARROW_NBSP = ' ';
const NBSP = ' ';

/** 39000 → « 39 000 » (séparateur insécable, identique côté serveur et navigateur). */
export function formatAmount(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, NARROW_NBSP);
}

/** 39000 → « 39 000 F CFA » */
export function formatPrice(amount: number): string {
  return `${formatAmount(amount)}${NBSP}F${NBSP}CFA`;
}

/**
 * Typographie française : espace fine insécable avant ? ! : ; » et après «,
 * pour éviter qu'un signe se retrouve seul en début de ligne.
 */
export function fr(text: string): string {
  return text.replace(/ ([?!:;»])/g, `${NARROW_NBSP}$1`).replace(/« /g, `«${NARROW_NBSP}`);
}

/** Initiales d'un nom (« Aminata Traoré » → « AT »). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}
