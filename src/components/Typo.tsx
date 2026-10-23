import { Fragment } from 'react';
import { fr } from '@/lib/format';

/**
 * Texte de titre en typographie française. Les virgules et les points sont légèrement
 * resserrés : dans les graisses très épaisses, la police les écarte trop du mot précédent.
 */
export default function Typo({ text }: { text: string }) {
  const parts = fr(text).split(/([,.](?!\d))/);
  return (
    <>
      {parts.map((part, index) =>
        part === ',' || part === '.' ? (
          <span key={index} className="punct">
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
