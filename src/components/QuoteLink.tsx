import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import { quoteHref, selectQuote, type QuoteSelection } from '@/lib/events';

type QuoteLinkProps = QuoteSelection & {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

/**
 * Lien vers le formulaire de devis, avec offre ou service pré-sélectionné.
 * Sur l'accueil, il pré-remplit le formulaire et y fait défiler la page ;
 * ailleurs, il ouvre l'accueil directement au niveau du formulaire.
 */
export default function QuoteLink({ offer, service, className, children, onClick }: QuoteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (selectQuote({ offer, service })) event.preventDefault();
  };

  return (
    <Link href={quoteHref({ offer, service })} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
